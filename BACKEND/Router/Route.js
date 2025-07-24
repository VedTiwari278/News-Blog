const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const authMiddleware = require("../middleware/authMiddleware");

const controller = require("../Controller/Controller"); // replace with actual file path

// AUTHENTICATION

// Multer setup

// Multer disk storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Ensure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

// // const upload = multer({ storage: storage });
// // or diskStorage
// const upload = multer({ storage: storage });

// Route using multer middleware

router.post(
  "/admin/add-post",
  authMiddleware,
  upload.single("image"),
  controller.addpost
);

router.post("/admin/add-category", authMiddleware, controller.addCategory);

router.get("/admin/get-categories", authMiddleware, controller.getCategories);
router.get("/admin/get-posts", authMiddleware, controller.getPost);
router.get("/admin/edit-category/:id", authMiddleware, controller.editCategory);
router.put(
  "/admin/update-category/:id",
  authMiddleware,
  controller.updateCategory
);
router.delete(
  "/admin/delete-category/:id",
  authMiddleware,
  controller.deleteCategory
);

router.delete("/admin/delete-post/:id", authMiddleware, controller.deletePost);
// router.post("/admin/add-user", authMiddleware, controller.addUser);
router.get("/admin/get-users", authMiddleware, controller.getUsers);
router.delete("/admin/delete-user/:id", authMiddleware, controller.deleteUser);
router.get("/admin/get-user/:id", authMiddleware, controller.getUserByID);
router.put("/admin/update-user/:id", authMiddleware, controller.updateUser);

router.get("/admin/get-post/:id", authMiddleware, controller.getPostById);
router.put("/admin/update-post/:id", authMiddleware, controller.UpdatePost);
// router.get("/getSingle/:id", controller.getSingle);
// router.get("/search", controller.SearchTerm);

// /admin/update-post/${id}

// router.get("/get-category", controller.getHeaderCategory);

// router.get("/getAllPost", controller.AllPost);

// router.get("/getAllPostById/:id", controller.AllPostBYid);
module.exports = router;
