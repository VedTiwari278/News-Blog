import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_MONGO_URI
    : process.env.MONGO_URI;

export const PORT = process.env.PORT;
export const VERSION = process.env.VERSION;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const NODE_ENV = process.env.NODE_ENV;
export const DB_NAME =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB
    : process.env.DEV_DB;

// Auth Stuff
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
