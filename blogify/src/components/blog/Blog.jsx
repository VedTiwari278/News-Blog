"use client";

import { BASE_URL } from "@/constant";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Blog() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all_blogs"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/blog/get-blogs/`);

      return res?.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (error) return <p className="text-center mt-10">Error loading blogs</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 p-6 space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs?.data?.data.map((blog) => (
          <Link
            key={blog?.slug}
            href={`/blog/${blog.slug}`}
            className="block overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            <div className="w-full aspect-4/3 overflow-hidden">
              <img
                src={blog?.mainImage}
                alt={blog?.title}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog?.title}</h2>

              <p className="text-gray-700 mb-4 wrap-break-word line-clamp-1">{blog?.summary}</p>

              <span className="text-blue-600 font-semibold hover:underline">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
