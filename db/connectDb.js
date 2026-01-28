
import mongoose from "mongoose";

const connectDb = async () => {
    // Support multiple common environment variable names for robustness
    const uri = process.env.MONGO_URI;

    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        // Log and rethrow so the caller can decide how to handle failures
        console.error('MongoDB connection error:', error);
    }
};

export default connectDb;