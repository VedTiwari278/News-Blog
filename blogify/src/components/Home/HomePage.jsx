// app/page.js
"use client";

import { BASE_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  // ✅ Fetch function
  const fetchRecentBlogs = async () => {
    const { data } = await axios.get(`${BASE_URL}/blog/recent-blogs`,{
      withCredentials:true
    });
    return data;
  };

  // ✅ TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["recent_blogs"],
    queryFn: fetchRecentBlogs,
    staleTime: 5 * 60 * 1000,

    // 🔥 stop repeated refetching
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // ✅ Slides from API
  const slides = data?.data || [];

  // ✅ Slider controls
  const nextSlide = () => {
    if (!slides.length) return;
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!slides.length) return;
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // ✅ Auto slide
  React.useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // ✅ Loading & Error UI
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Failed to load</p>;

  return (
    <main className="max-w-7xl font-[cursive] mx-auto p-6 space-y-16">
      {/* Hero Section */}
      <section>
        <h2 className="text-3xl text-black font-semibold mb-6 text-center">
          Highlights
        </h2>

        <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-64 md:h-96 relative flex items-center justify-center"
              >
                <img
                  src={slide?.mainImage}
                  alt={slide?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-10 text-center mx-4 p-4 md:p-6 bg-black/50 rounded-lg">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                    {slide?.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          href="/blog"
          className="px-8 py-3 bg-gray-950 text-white font-semibold rounded-full hover:bg-gray-700"
        >
          Start Reading
        </Link>
      </div>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 shadow hover:shadow-md">
          <h3 className="text-xl font-bold mb-2">Curated Articles</h3>
          <p>Handpicked articles to help you learn and grow.</p>
        </div>

        <div className="p-6 shadow hover:shadow-md">
          <h3 className="text-xl font-bold mb-2">Tips & Guides</h3>
          <p>Practical guides to improve knowledge quickly.</p>
        </div>

        <div className="p-6 shadow hover:shadow-md">
          <h3 className="text-xl font-bold mb-2">Insights</h3>
          <p>Deep insights on trending topics.</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center py-12 bg-gray-200">
        <h2 className="text-3xl font-bold mb-4">Start Exploring</h2>

        <p className="mb-6 text-4xl md:text-6xl">Human stories & ideas</p>

        <Link
          href="/blog"
          className="px-8 py-3 bg-gray-950 text-white font-semibold rounded"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
