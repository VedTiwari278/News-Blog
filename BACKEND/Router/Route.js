const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../Controller/Controller");

// // ✅ Disk Storage Setup for Multer
// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Make sure 'uploads/' folder exists in your project root
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// const upload = multer({ storage: diskStorage });

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post(
  "/admin/add-post",
  authMiddleware,
  upload.single("image"),
  controller.addpost
);
// ... rest of your routes

/* ========= POST ROUTES ========= */
router.post(
  "/admin/add-post",
  authMiddleware,
  upload.single("image"),
  controller.addpost
);
router.post("/admin/add-category", authMiddleware, controller.addCategory);

/* ========= GET ROUTES ========= */
router.get("/admin/get-categories", authMiddleware, controller.getCategories);
router.get("/admin/get-posts", authMiddleware, controller.getPost);
router.get("/admin/edit-category/:id", authMiddleware, controller.editCategory);
router.get("/admin/get-users", authMiddleware, controller.getUsers);
router.get("/admin/get-user/:id", authMiddleware, controller.getUserByID);
router.get("/admin/get-post/:id", authMiddleware, controller.getPostById);

/* ========= PUT ROUTES ========= */
router.put(
  "/admin/update-category/:id",
  authMiddleware,
  controller.updateCategory
);
router.put("/admin/update-user/:id", authMiddleware, controller.updateUser);
router.put("/admin/update-post/:id", authMiddleware, controller.UpdatePost);

/* ========= DELETE ROUTES ========= */
router.delete(
  "/admin/delete-category/:id",
  authMiddleware,
  controller.deleteCategory
);
router.delete("/admin/delete-post/:id", authMiddleware, controller.deletePost);
router.delete("/admin/delete-user/:id", authMiddleware, controller.deleteUser);

module.exports = router;
