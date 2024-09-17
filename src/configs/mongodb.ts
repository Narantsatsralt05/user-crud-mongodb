import mongoose from "mongoose";
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI ?? "";

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error(error);
  }
};
