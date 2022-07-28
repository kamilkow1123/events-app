import mongoose, { Mongoose } from "mongoose";

export const connectDB = async () => {
  try {
    const conn: Mongoose = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connectDB", error);
    process.exit(1);
  }
};
