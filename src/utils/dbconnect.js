import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = {}

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Database connection failed!", error);
        process.exit(1);
    }
};

export default dbConnect;
