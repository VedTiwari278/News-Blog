// app/page.js
import React from "react";
import Link from "next/link";
import HomePage from "@/components/Home/HomePage";
// import { blogs } from "../data/blogs";

export const metadata = {
  title: "Blogify - Insights, Tips, and Guides",
  description:
    "Explore Blogify for articles, guides, and tips on a wide range of topics to improve knowledge and skills.",
  alternates: { canonical: "https://yourblog.com/" },
  openGraph: {
    title: "Blogify - Insights, Tips, and Guides",
    description:
      "Explore Blogify for articles, guides, and tips on a wide range of topics to improve knowledge and skills.",
    url: "https://yourblog.com/",
    siteName: "Blogify",
    images: [
      {
        url: "https://yourblog.com/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Blogify - Articles and Guides",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogify - Insights, Tips, and Guides",
    description:
      "Explore Blogify for articles, guides, and tips on a wide range of topics to improve knowledge and skills.",
    images: ["https://yourblog.com/og-home.jpg"],
  },
};

export default function Page() {
  return (
    <div className="">
      <HomePage />
    </div>
  );
}
