import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../../utils/pagination";
import { FiTrash2 } from "react-icons/fi"; // ✅ Feather Trash Icon

function AllBlogs() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["AllBlogs", page],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/blog/get-blogs?page=${page}&limit=6`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const blogs = data?.data?.data || [];
  const pagination = data?.data?.pagination || {};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${BASE_URL}/blog/delete-blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      queryClient.invalidateQueries(["AllBlogs", page]); 
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (isError)
    return <h1 className="text-center mt-10">Error loading blogs</h1>;

  return (
    <div className="min-h-screen text-black px-6 py-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-4xl font-bold">All Blogs</h1>

        <button
          onClick={() => navigate("create-blog")}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex justify-between items-start gap-4">
                <img
                  src={blog.mainImage || "/fallback.png"}
                  alt={blog.title}
                  className="h-24 w-24 object-cover rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog?.title || "Untitled Blog"}
                  </h2>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {blog?.summary || "No summary available."}
                  </p>
                </div>

                {/* Delete Icon */}
                <button
                  onClick={() => handleDelete(blog?._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Delete Blog"
                >
                  <FiTrash2 size={22} />
                </button>
              </div>

              <Link
                to={blog?.slug || "#"}
                className="mt-4 text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-500 col-span-full">
            No blogs found
          </h2>
        )}
      </div>

      <Pagination page={page} setPage={setPage} pagination={pagination} />
    </div>
  );
}

export default AllBlogs;
