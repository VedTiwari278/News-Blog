const Post = require("../model/post");
const User = require("../model/Users");
const Category = require("../model/category");
const fs = require("fs");
const path = require("path");
// const Post = require("../models/Post"); // adjust path if needed

const cloudinary = require("../config/cloudinary");
// const Post = require("../models/Post");

// const Post = require("../models/Post");

exports.addpost = async (req, res) => {
  try {
    console.log("📦 Incoming Data:", req.body);
    console.log("🖼️ Uploaded File:", req.file);

    const user = req.user;
    const { title, description, category } = req.body;

    let imageUrl = "";

    if (req.file && req.file.path) {
      imageUrl = req.file.path; // ✅ Cloudinary gives the full URL in path
    }

    const newPost = new Post({
      title,
      description,
      author: user.id,
      category,
      image: imageUrl,
    });

    await newPost.save();

    res.status(201).send({
      message: "✅ Post added successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("❌ Error adding post:", error);
    res.status(500).send({
      message: "❌ Failed to add post",
      error: error.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  // console.log(req.body);

  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).send({ message: "Category name is required" });
    }

    const newCategory = new Category({ categoryName });
    await newCategory.save();

    res.status(201).send({
      message: "✅ Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("❌ Error adding category:", error);

    if (error.code === 11000) {
      return res.status(400).send({ message: "⚠️ Category already exists" });
    }

    res
      .status(500)
      .send({ message: "❌ Failed to add category", error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  const data = await Category.find();
  // console.log(data);
  res.status(200).send({ data });
};

exports.getPost = async (req, res) => {
  try {
    // console.log("Someone hit me");

    const user = req.user;
    // console.log("Logged-in User:", user);

    let posts;

    if (user.role === "admin") {
      // Admin gets all posts
      posts = await Post.find()
        .populate("category", "categoryName")
        .populate("author", "username");
    } else {
      // Non-admin user gets only their own posts
      posts = await Post.find({ author: user.id })
        .populate("category", "categoryName")
        .populate("author", "username");
    }

    // console.log("Fetched Posts:", posts);

    res.status(200).send({ data: posts });
  } catch (error) {
    // console.error("Error in getPost:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.editCategory = async (req, res) => {
  const id = req.params.id;
  const data = await Category.findById(id);
  res.status(200).send({ data: data });
};

exports.getUserByID = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  const data = await User.findById(id);
  res.status(200).send({ data: data });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { FirstName, LastName, username, Role } = req.body;
  // console.log(id, "The new data", data);

  try {
    const data = await User.findByIdAndUpdate(
      id,
      { FirstName, LastName, username, Role },
      { new: true }
    );
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: "Update failed", message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const newd = req.body;
  // console.log(id, "The new data", newd);

  try {
    const data = await Category.findByIdAndUpdate(id, newd, { new: true });
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: "Update failed", message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  await Post.deleteMany({ category: id });
  const data = await Category.findByIdAndDelete(id);
  res.status(200).send({ data: data });
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    // 🔍 Step 1: Find the post first
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    // 🗑️ Step 2: Delete image from uploads folder
    const imagePath = path.join(__dirname, "../uploads", post.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("❌ Error deleting image:", err.message);
      } else {
        console.log("🧹 Image deleted successfully:", post.image);
      }
    });

    // 🧹 Step 3: Delete post from DB
    const data = await Post.findByIdAndDelete(id);
    res.status(200).send({ data: data, message: "Post and image deleted" });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  await Post.deleteMany({ author: id });
  const data = await User.findByIdAndDelete(id);
  res.status(200).send({ data: data });
};

// exports.addUser = async (req, res) => {
//   // console.log(req.body);
//   const { FirstName, LastName, username, Password, Role } = req.body;

//   try {
//     const newUser = new User({
//       FirstName,
//       LastName,
//       username,
//       Password,
//       Role,
//     });

//     await newUser.save(); // Save to DB

//     res.status(200).json({ message: "User added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

exports.getUsers = async (req, res) => {
  const data = await User.find();
  // console.log(data);

  res.status(200).send({ data: data });
};

exports.getPostById = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  const data = await Post.findById(id).populate("category", "categoryName");

  // console.log(data);

  res.status(200).send({ data: data });
};

exports.UpdatePost = async (req, res) => {
  const id = req.params.id;
  const { Title, Description, Category } = req.body;

  // console.log("🛠 Updating Post ID:", id);
  // console.log("📦 New Data:", { Title, Description, Category });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title: Title, description: Description, category: Category },
      { new: true } // return updated document
    );

    if (!updatedPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    res
      .status(200)
      .send({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    res.status(500).send({ error: "Update failed", message: error.message });
  }
};

// Frontend ka code niche hai

exports.getHeaderCategory = async (req, res) => {
  const data = await Category.find();
  // console.log(data);
  res.status(200).send({ data: data });
};

exports.AllPost = async (req, res) => {
  const data = await Post.find()
    .populate("category", "categoryName")
    .populate("author", "username");
  // console.log(data);

  res.status(200).send({ data: data });
};

exports.AllPostBYid = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  const data = await Post.find({ category: id })
    .populate("category", "categoryName")
    .populate("author", "username");

  res.status(200).send({ data: data });
};

exports.getSingle = async (req, res) => {
  const id = req.params.id;
  const data = await Post.findById(id).populate("category", "categoryName");

  res.status(200).send({ data: data });
};

exports.SearchTerm = async (req, res) => {
  const term = req.query.term;

  try {
    const results = await Post.find({
      $or: [
        { title: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
      ],
    })
      .populate("category", "categoryName")
      .populate("author", "username");

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("❌ Search Error:", error);
    res.status(500).json({ success: false, message: "Search failed" });
  }
};
