import Blog from "@/components/blog/Blog";

export const metadata = {
  title: "Blog - Blogify",
  description:
    "Explore curated blogs, guides, and tips to boost your knowledge. Read articles on personal growth, writing, SEO, and more.",
  alternates: { canonical: "https://yourblog.com/blog" },
  openGraph: {
    title: "Blog - Blogify",
    description:
      "Explore curated blogs, guides, and tips to boost your knowledge. Read articles on personal growth, writing, SEO, and more.",
    url: "https://yourblog.com/blog",
    siteName: "Blogify",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Blogify Blog Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Blogify",
    description:
      "Explore curated blogs, guides, and tips to boost your knowledge. Read articles on personal growth, writing, SEO, and more.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1170&auto=format&fit=crop",
    ],
  },
};
export default function BlogPage() {
  return <Blog />;
}
