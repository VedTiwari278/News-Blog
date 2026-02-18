import rateLimit from "express-rate-limit";

// Limit each IP to 100 requests per 15 minutes
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests, please try again later.",
});
