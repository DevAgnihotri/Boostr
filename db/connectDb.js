
import mongoose from "mongoose";

const connectDb = async () => {
    // Support multiple common environment variable names for robustness
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGO_URI;

    if (!uri) {
        // Clear, actionable error when env var is missing
        const msg = 'Missing MongoDB connection string. Set MONGO_URI (or MONGODB_URI) in your environment.';
        console.error(msg);
        // Throw instead of exiting the process to avoid killing serverless functions
        throw new Error(msg);
    }

    try {
        // The MongoDB Node.js driver (v4+) no longer requires many options
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        // Log and rethrow so the caller can decide how to handle failures
        console.error('MongoDB connection error:', error?.message || error);
        throw error;
    }
};

export default connectDb;