// src/lib/dbConnect.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("MONGODB_URI from env:", process.env.MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached = (global as typeof globalThis & { mongoose: CachedMongoose }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose: CachedMongoose }).mongoose = { 
    conn: null, 
    promise: null 
  };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;