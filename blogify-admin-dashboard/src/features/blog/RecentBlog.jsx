import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function RecentBlog() {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blog/recent-blogs?limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecentBlogs(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBlogs();
  }, [token]);

  if (loading)
    return (
      <div className="text-center mt-10 text-xl">Loading Recent Blogs...</div>
    );
  if (recentBlogs.length === 0)
    return (
      <div className="text-center mt-10 text-xl">No Recent Blogs Found</div>
    );

 return (
  <div className=" rounded-lg shadow-sm p-4">
    <h2 className="text-xl font-semibold mb-4 text-center">
      Recent Posts
    </h2>

    <div className="flex flex-col gap-3">
      {recentBlogs.map((blog) => (
        <div
          key={blog._id}
          className="flex gap-3 border-b pb-3 last:border-b-0"
        >
          <img
            src={blog.mainImage || "/fallback.png"}
            alt={blog.title}
            className="w-16 h-16 object-cover rounded-md"
          />

          <div className="flex-1">
            <Link
              to={`/dashboard/blogs/${blog.slug}`}
              className="text-sm font-semibold hover:underline line-clamp-1"
            >
              {blog.title}
            </Link>

            <p className="text-xs text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <p className="text-xs text-gray-600 line-clamp-2">
              {blog.summary}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default RecentBlog;
