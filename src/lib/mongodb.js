import mongoose from "mongoose";

const dburl = process.env.NEXT_PUBLIC_API_URL;
let cached = global.mongoose;
if (!dburl) {
  throw new Error("please insert your mongodb url");
}
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached database connection ✅");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(dburl, {}).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
