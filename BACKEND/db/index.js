import mongoose from "mongoose";
import { DB_NAME, MONGO_URI, NODE_ENV } from "../config/index.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.clear();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${DB_NAME}`);
    console.log(`Env: ${NODE_ENV}`);
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1);
  }
};
