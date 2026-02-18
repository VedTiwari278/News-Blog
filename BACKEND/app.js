import express from "express";
import cors from "cors";
import morgan from "morgan";
import { limiter } from "./ratelimiter/index.js";
import { VERSION } from "./config/index.js";
import authRouter from "./Router/auth.routes.js";
import errorHandler from "./middleware/errormiddleware.js";
import { blogRouter } from "./Router/blog.routes.js";

const app = express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:3000",
      "https://news-blog-8wof.vercel.app",
      "https://news-blog-n7tv.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(`/api/${VERSION}/auth/`, authRouter);
app.use(`/api/${VERSION}/blog/`, blogRouter);

app.use(errorHandler);
export default app;
