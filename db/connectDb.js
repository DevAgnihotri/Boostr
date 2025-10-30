
import mongoose from "mongoose";

const connectDb = async () => {
        try {
            // The MongoDB Node.js driver (v4+) no longer requires these options
            // Remove deprecated options to avoid runtime warnings.
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
            
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }

  export default connectDb;