import mongoose from 'mongoose';

const MONGO_MONGODB_URI = process.env.MONGO_MONGODB_URI;

if (!MONGO_MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_MONGODB_URI environment variable inside .env.local'
  );
}

const uri: string = MONGO_MONGODB_URI;

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global type
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

// Initialize cached connection
const cached: CachedConnection = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;