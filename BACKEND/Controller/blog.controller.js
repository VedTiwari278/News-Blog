import { Blog } from "../model/blog.model.js";
import ApiResponse from "../utils/response/ApiResponse.js";
import { getPaginatedValue } from "../utils/pagination.js";
import {
  createBlogService,
  findAllBlogs,
  findBySlug,
  GetRecentBlog,
} from "../services/blog.services.js";
import ApiError from "../utils/response/ApiError.js";
import mongoose from "mongoose";

export const createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    const author = req.user.id;

    const blog = await createBlogService({
      ...blogData,
      files: req.files,
      author,
    });

    return res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully",
    });
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    next(err);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { currentPage, pageLimit, skip } = getPaginatedValue(page, limit);

    const { blogs, total } = await findAllBlogs({ skip, limit: pageLimit });

    return res.send(
      new ApiResponse(
        200,
        {
          success: true,
          data: blogs,
          pagination: {
            currentPage,
            pageLimit,
            totalPages: Math.ceil(total / pageLimit),
            total,
          },
        },
        "Blogs fetched Successfully",
      ),
    );
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid blog ID"));
    }
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      // Blog not found
      return next(new ApiError(404, "Blog Not Found"));
    }

    // Success response
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Blog deleted successfully"));
  } catch (err) {
    // Pass error to global error handler
    next(err);
  }
};

export async function getBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    console.log(slug);

    if (!slug) {
      throw new ApiError(400, "No Slug Found");
    }
    const blog = await findBySlug(slug);
    if (!blog) {
      throw new ApiError(404, "No Blog Found");
    }
    res.send(new ApiResponse(200, blog, "Slugged Blog Found Successfully"));
  } catch (error) {
    return next(error);
  }
}

export async function getRecentBlog(req, res, next) {
  try {
    const { limit = 5 } = req.query;

    const blog = await GetRecentBlog(limit);
    if (!blog) {
      throw new ApiError(404, "No Blog Found");
    }
    res.send(new ApiResponse(200, blog, "Recent Blogs Found Successfully"));
  } catch (error) {
    return next(error);
  }
}
