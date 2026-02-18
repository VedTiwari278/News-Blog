import express from "express";
import upload from "../config/multer.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getBySlug,
  getRecentBlog,
} from "../Controller/blog.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const blogRouter = express.Router();

blogRouter.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  createBlog,
);

blogRouter.delete("/delete-blog/:id", authMiddleware, deleteBlog);
blogRouter.get("/get-blogs", getBlogs);
blogRouter.get("/get-blog/:slug", getBySlug);
blogRouter.get("/recent-blogs", getRecentBlog);
