// src/types/index.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  favicon?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'mobile' | 'cms' | 'ai' | 'gis';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  period: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
  parentId?: string;
  replies?: Comment[];
}

// API Response Types
export interface CommentAPIResponse {
  _id: string;
  name: string;
  email?: string;
  message: string;
  parentId?: string;
  createdAt: string;
  replies?: CommentAPIResponse[];
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalComments: number;
  hasMore: boolean;
}

export interface FetchCommentsResponse {
  success: boolean;
  data?: CommentAPIResponse[];
  pagination?: PaginationData;
  error?: string;
}

export interface PostCommentResponse {
  success: boolean;
  data?: CommentAPIResponse;
  error?: string;
}

export interface CommentFormData {
  name: string;
  email: string;
  message: string;
}

export type ReplyFormData = Record<string, {
    name: string;
    email: string;
    message: string;
  }>;

export interface MessageState {
  text: string;
  type: 'success' | 'error' | '';
}

export interface LoadingState {
  isLoading: boolean;
  isSubmitting: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data?: T[];
  pagination?: PaginationData;
  error?: string;
}

export type {
  // Re-export for convenience
  CommentAPIResponse as ApiComment,
  CommentFormData as FormComment,
};

export function isFetchCommentsResponse(data: unknown): data is FetchCommentsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    typeof (data as FetchCommentsResponse).success === 'boolean'
  );
}

export function isPostCommentResponse(data: unknown): data is PostCommentResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    typeof (data as PostCommentResponse).success === 'boolean'
  );
}

export function isValidComment(comment: unknown): comment is Comment {
  return (
    typeof comment === 'object' &&
    comment !== null &&
    'id' in comment &&
    'name' in comment &&
    'message' in comment &&
    typeof (comment as Comment).id === 'string' &&
    typeof (comment as Comment).name === 'string' &&
    typeof (comment as Comment).message === 'string'
  );
}