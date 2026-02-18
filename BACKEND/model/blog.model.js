import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    category: String,
    summary: String,
    content: String,
    tags: [String],
    keywords: [String],
    mainImage: String,
    featuredImage: String,
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
