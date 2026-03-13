import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI: string = String(process.env.MONGO_URI);
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
