export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://news-blog-8wof.vercel.app/api/v1"
    : "http://localhost:8000/api/v1";
