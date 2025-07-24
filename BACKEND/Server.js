const DB_PATH =
  "mongodb+srv://ved:ved@airbnb.hp2nr.mongodb.net/News-Blog?retryWrites=true&w=majority&appName=airbnb";

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./Router/Route");
const authMiddleware = require("./middleware/authMiddleware");
const FrontendRoute = require("./Router/FrontendRoute");

const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173", // Ya jo frontend port hai
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Auth route

app.use("/uploads", express.static("uploads"));



app.use(FrontendRoute);
app.use("/auth", require("./Router/auth"));
app.use(authMiddleware); 
app.use(router);



mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Error while connecting MongoDB:", err);
  });
