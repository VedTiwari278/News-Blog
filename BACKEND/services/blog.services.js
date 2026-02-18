import { Blog } from "../model/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

// Multer setup
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createBlogService = async (blogData) => {
  const { title, category, summary, content, tags, keywords, author } =
    blogData;

  const mainFile = blogData.files?.mainImage?.[0];
  const featuredFile = blogData.files?.featuredImage?.[0];

  const uploadToCloud = (file) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blogs" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
      stream.end(file.buffer);
    });

  const mainUpload = mainFile ? await uploadToCloud(mainFile) : null;
  const featuredUpload = featuredFile
    ? await uploadToCloud(featuredFile)
    : null;

  const blog = await Blog.create({
    title,
    category,
    summary,
    content,
    tags,
    keywords,
    mainImage: mainUpload?.secure_url || null,
    featuredImage: featuredUpload?.secure_url || null,
    author,
  });

  return blog;
};

/**
 * Service to fetch all blogs with author populated, skip & limit for pagination
 */
export const findAllBlogs = async ({ skip = 0, limit = 10 } = {}) => {
  const total = await Blog.countDocuments();

  const blogs = await Blog.find()
    .populate("author", "name email") // populate author
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }) // latest first
    .select("-__v"); // remove __v

  return { blogs, total };
};

export const findBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug })
    .populate("author", "name email")
    .select("-__v");
  return blog;
};

export const GetRecentBlog = async (limit) => {
  const blog = await Blog.find()
    .limit(limit)
    .sort({ createdAt:-1 })
    .select("-__v -content -tags -keywords -createdAt -updatedAt -author -summary -_id" );
  return blog;
};
