"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BASE_URL } from "@/constant";

function RecentBlogs() {
  const {
    data: posts,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/blog/recent-blogs`);
      return res?.data?.data?.data ?? res?.data?.data ?? res?.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Loading skeleton
  if (isLoading || isFetching) {
    return (
      <div className="space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 bg-gray-200 rounded w-5/6" />
              <div className="h-3.5 bg-gray-200 rounded w-1/3" />
              <div className="h-3.5 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 text-sm">
        Failed to load recent posts
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        No recent posts available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.slice(0, 6).map((post, index) => (
        <Link
          key={post.id || post.slug || index}
          href={`/blog/${post.slug}`}
          className="group flex gap-3 hover:bg-gray-50 rounded-lg transition-colors p-2 -mx-2"
        >
          {/* Thumbnail */}
          <div className="shrink-0">
            {post?.mainImage ? (
              <img
                src={post.mainImage}
                alt={post.title || ""}
                className="w-12 md:w-20 h-12 md:h-20 object-cover rounded-md border border-gray-200"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-blog.jpg"; // ← add fallback image in public/
                  e.currentTarget.classList.add("opacity-70");
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                <span className="text-gray-400 text-xs">No img</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <h3 className="text-[15px] font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                {post.title || "Untitled Post"}
              </h3>

              {post.createdAt && (
                <span className="text-xs text-gray-500 whitespace-nowrap mt-0.5 sm:mt-0">
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {post.summary ||
                post.excerpt ||
                "Read more about this service..."}
            </p>

            {/* Category (optional - small badge) */}
            {post.category && (
              <span className="mt-1.5 inline-block text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                {post.category}
              </span>
            )}
          </div>
        </Link>
      ))}

      <div className="pt-2 text-center">
        <Link
          href="/blog"
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Recent Posts →
        </Link>
      </div>
    </div>
  );
}

export default RecentBlogs;
