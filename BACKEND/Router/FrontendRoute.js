const express = require("express");
const Frontendrouter = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const controller = require("../Controller/Controller");

Frontendrouter.get("/getSingle/:id", controller.getSingle);
Frontendrouter.get("/search", controller.SearchTerm);

Frontendrouter.get("/getAllPost", controller.AllPost);

Frontendrouter.get(
  "/getAllPostById/:id",

  controller.AllPostBYid
);

Frontendrouter.get(
  "/get-category",

  controller.getHeaderCategory
);

Frontendrouter.post("/api/posts/:postId/like", controller.likePost);


module.exports = Frontendrouter;
