// src/pages/api/comments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { ConnectionStates, Types } from 'mongoose';
import { ObjectId } from 'mongodb';

// Define proper response types
interface CommentData {
    _id: string;
    name: string;
    email: string;
    message: string;
    parentId?: string;
    createdAt: string;
    replies?: CommentData[];
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    hasMore: boolean;
}

type SuccessResponse = {
    success: true;
    data: CommentData | CommentData[];
    pagination?: PaginationData;
}

type ErrorResponse = {
    success: false;
    error: string;
}

type ResponseData = SuccessResponse | ErrorResponse;

// Request body type
interface CommentRequestBody {
    name?: string;
    email?: string;
    message?: string;
    parentId?: string;
}

const MONGO_MONGODB_URI = process.env.MONGO_MONGODB_URI!;

// Simple connection helper
async function connectDB() {
    if (mongoose.connection.readyState >= ConnectionStates.connected) {
        return;
    }
    return mongoose.connect(MONGO_MONGODB_URI);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await connectDB();

        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database not connected');
        }

        const commentsCollection = db.collection('comments');

        // GET - Fetch comments with pagination
        if (req.method === 'GET') {
            try {
                const { page = '1', limit = '10' } = req.query;
                const pageNum = parseInt(page as string);
                const limitNum = parseInt(limit as string);
                const skip = (pageNum - 1) * limitNum;

                // Fetch parent comments (comments without parentId)
                const rawParentComments = await commentsCollection
                    .find({ parentId: { $exists: false } })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNum)
                    .toArray();

                // Get parent IDs
                const parentIds = rawParentComments.map(doc => doc._id.toString());

                // Fetch all replies for these parent comments
                const rawReplies = await commentsCollection
                    .find({
                        parentId: { $in: parentIds }
                    })
                    .sort({ createdAt: 1 })
                    .toArray();

                // Group replies by parentId
                const repliesMap = new Map<string, CommentData[]>();
                rawReplies.forEach(reply => {
                    const parentId = reply.parentId as string;
                    if (!repliesMap.has(parentId)) {
                        repliesMap.set(parentId, []);
                    }
                    repliesMap.get(parentId)!.push({
                        _id: reply._id.toString(),
                        name: reply.name as string,
                        email: (reply.email as string) || '',
                        message: reply.message as string,
                        parentId: reply.parentId as string,
                        createdAt: new Date(reply.createdAt as Date).toISOString()
                    });
                });

                // Transform parent comments with their replies
                const transformedComments: CommentData[] = rawParentComments.map((doc) => ({
                    _id: doc._id.toString(),
                    name: doc.name as string,
                    email: (doc.email as string) || '',
                    message: doc.message as string,
                    createdAt: new Date(doc.createdAt as Date).toISOString(),
                    replies: repliesMap.get(doc._id.toString()) ?? []
                }));

                // Get total count for pagination
                const totalComments = await commentsCollection.countDocuments({
                    parentId: { $exists: false }
                });
                const totalPages = Math.ceil(totalComments / limitNum);

                return res.status(200).json({
                    success: true,
                    data: transformedComments,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalComments,
                        hasMore: pageNum < totalPages
                    }
                });
            } catch (error) {
                console.error('GET Error:', error);
                return res.status(400).json({
                    success: false,
                    error: 'Failed to fetch comments'
                });
            }
        }

        // POST - Create comment or reply
        if (req.method === 'POST') {
            try {
                const body = req.body as CommentRequestBody;
                const { name, email, message, parentId } = body;

                // Validate required fields
                if (!name?.trim() || !message?.trim()) {
                    return res.status(400).json({
                        success: false,
                        error: 'Name and message are required'
                    });
                }

                // Validate length
                if (name.trim().length > 100) {
                    return res.status(400).json({
                        success: false,
                        error: 'Name cannot exceed 100 characters'
                    });
                }

                if (message.trim().length > 1000) {
                    return res.status(400).json({
                        success: false,
                        error: 'Message cannot exceed 1000 characters'
                    });
                }

                // If parentId is provided, validate it exists
                if (parentId) {
                    try {
                        // MENGGUNAKAN Types.ObjectId bawaan mongoose untuk findOne
                        const parentComment = await commentsCollection.findOne({
                            _id: new Types.ObjectId(parentId)
                        });

                        if (!parentComment) {
                            return res.status(404).json({
                                success: false,
                                error: 'Parent comment not found'
                            });
                        }

                        // Prevent nested replies (only allow 1 level)
                        if (parentComment.parentId) {
                            return res.status(400).json({
                                success: false,
                                error: 'Cannot reply to a reply'
                            });
                        }
                    } catch (error) {
                        return res.status(400).json({
                            success: false,
                            error: 'Invalid parent comment ID'
                        });
                    }
                }

                // Create new comment/reply
                type NewComment = {
                    name: string;
                    email: string;
                    message: string;
                    createdAt: Date;
                    parentId?: string;
                };

                const newComment: NewComment = {
                    name: name.trim(),
                    email: email?.trim() ?? '',
                    message: message.trim(),
                    createdAt: new Date(),
                };

                // Add parentId if this is a reply
                if (parentId) {
                    newComment.parentId = parentId;
                }

                const result = await commentsCollection.insertOne(newComment);

                const commentData: CommentData = {
                    _id: result.insertedId.toString(),
                    name: newComment.name,
                    email: newComment.email,
                    message: newComment.message,
                    createdAt: newComment.createdAt.toISOString(),
                    ...(parentId && { parentId })
                };

                return res.status(201).json({
                    success: true,
                    data: commentData
                });
            } catch (error) {
                console.error('POST Error:', error);
                const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                return res.status(400).json({
                    success: false,
                    error: errorMessage
                });
            }
        }

        // Method not allowed
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });

    } catch (error) {
        console.error('Connection Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Database connection failed'
        });
    }
}

// Optional: DELETE endpoint
// src/pages/api/comments/[id].ts
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose, { ConnectionStates } from 'mongoose';
import { ObjectId } from 'mongodb';

const MONGO_MONGODB_URI = process.env.MONGO_MONGODB_URI!;

async function connectDB() {
    if (mongoose.connection.readyState >= ConnectionStates.connected) {
        return;
    }
    return mongoose.connect(MONGO_MONGODB_URI);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Invalid comment ID'
        });
    }

    try {
        await connectDB();
        
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database not connected');
        }
        
        const commentsCollection = db.collection('comments');

        if (req.method === 'DELETE') {
            try {
                const comment = await commentsCollection.findOne({ 
                    _id: new ObjectId(id) 
                });

                if (!comment) {
                    return res.status(404).json({
                        success: false,
                        error: 'Comment not found'
                    });
                }

                // Delete comment and all its replies
                await commentsCollection.deleteMany({
                    $or: [
                        { _id: new ObjectId(id) },
                        { parentId: id }
                    ]
                });

                return res.status(200).json({
                    success: true,
                    message: 'Comment and its replies deleted successfully'
                });
            } catch (error) {
                console.error('DELETE Error:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to delete comment'
                });
            }
        }

        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
        
    } catch (error) {
        console.error('Connection Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Database connection failed'
        });
    }
}
*/