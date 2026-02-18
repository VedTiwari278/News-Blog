"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constant";
import RecentBlogs from "./RecentBlogs";
import { FaClock, FaWatchmanMonitoring } from "react-icons/fa";

function SingleBlog({ slug }) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["single-blog", slug],
    queryFn: async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blog/get-blog/${slug}`);
        return res?.data?.data ?? null;
      } catch (err) {
        throw err;
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500 border-solid mx-auto mb-6"></div>
          <p className="text-gray-700 text-xl font-medium">
            Loading your blog post...
          </p>
        </div>
      </div>
    );
  }

  // If error or no data → show full-width error (you can customize)
  if (error || !data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {error ? "Failed to load blog" : "Blog not found"}
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            {error?.message ||
              "The post you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <a
              href="/blog"
              className="px-8 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Back to Blogs
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-10 mx-auto sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <main className="lg:col-span-8 xl:col-span-9 order-1">
            <article className="bg-white rounded-2xl shadow-sm p-6 lg:p-10">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                {data.title ?? "Untitled Post"}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-blue-600 mb-10 text-base">
                {data.author?.name && <span>By {data?.author?.name}</span>}
                {(data.author?.name || data.createdAt) && (
                  <span className="hidden sm:inline">•</span>
                )}
                {data.createdAt && (
                  <time dateTime={data.createdAt}>
                    {new Date(data.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
                {data?.readTime || (
                  <>
                   <FaClock/> <span>{data?.readTime||"5"} min read</span>
                  </>
                )}
              </div>

              {/* Main Image */}
              {data.mainImage && (
                <figure className="mb-10">
                  <img
                    src={data.mainImage}
                    alt={data.title || "Main blog image"}
                    className="w-full h-64 sm:h-96 lg:h-[480px] object-cover rounded-xl shadow-xl"
                    loading="eager"
                  />
                </figure>
              )}

              {/* Summary */}
              {data.summary && (
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-10 font-medium">
                  {data.summary}
                </p>
              )}

              {/* Category + Tags */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                {data.category && (
                  <span className="inline-flex items-center px-5 py-2 bg-blue-50 text-blue-700 font-medium rounded-full text-sm">
                    {data.category}
                  </span>
                )}

                {data.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, index) => (
                      <span
                        key={tag || index}
                        className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {data.featuredImage && (
                <figure className="mb-12">
                  <img
                    src={data.featuredImage}
                    alt="Featured visual"
                    className="w-full rounded-2xl shadow-xl object-cover max-h-[520px]"
                  />
                </figure>
              )}

              {/* Content */}
              <div
                className="
                  prose 
                  prose-lg 
                  sm:prose-xl 
                  max-w-none 
                  prose-headings:font-bold 
                  prose-headings:text-gray-900 
                  prose-a:text-blue-600 
                  prose-a:no-underline 
                  hover:prose-a:underline 
                  prose-blockquote:border-l-4 
                  prose-blockquote:border-blue-500 
                  prose-blockquote:pl-5 
                  prose-blockquote:italic 
                  prose-blockquote:text-gray-700 
                  prose-img:rounded-xl 
                  prose-img:shadow-lg
                  text-gray-800
                "
                dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
              />

              {/* Keywords */}
              {data.keywords?.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.keywords.map((keyword, i) => (
                      <span
                        key={keyword || i}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Keywords */}
              {data.tags?.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {data.tags.map((tag, i) => (
                      <span
                        key={tag || i}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar - Recent Blogs (right side) */}
          <aside className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1  lg:top-8 h-fit">
            <div className="bg-white  shadow-sm p-6 lg:p-8">
              <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
                Recent Posts
              </h2>
              <RecentBlogs />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
