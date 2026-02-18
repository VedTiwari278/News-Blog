import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blog/get-blog/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data?.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading Blog...</div>;
  if (!blog)
    return <div className="text-center mt-20 text-xl">Blog Not Found</div>;

  return (
    <div className="mx-auto shadow-black shadow-md p-2  mb-10 space-y-8">
      <h1 className="text-md md:text-lg  font-bold text-center text-gray-900">{blog.title}</h1>

      {/* Author & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-sm space-y-2 sm:space-y-0">
        <p>By {blog.author?.name || "Admin"}</p>
        <p>Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
        <p>Category: {blog.category}</p>
      </div>

      {/* Main Image */}
      {blog.mainImage && (
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      )}

      {/* Blog Content */}
      <div
        className="prose prose-lg max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Featured Image */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt="Featured"
          className="w-full h-72 object-cover rounded-xl shadow-md"
        />
      )}

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-black text-white rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Keywords */}
      {blog.keywords?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
