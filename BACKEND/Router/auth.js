const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const auth = require("../model/Users");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

// Register route with avatar upload
router.post("/register", upload.single("avatar"), async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const file = req.file;
    console.log("Avtar :", file);

    if (!firstName || !lastName || !username || !email || !password || !role) {
      return res
        .status(400)
        .json({ msg: "All required fields must be filled" });
    }

    // Check existing user
    if (await auth.findOne({ email })) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    if (await auth.findOne({ username })) {
      return res.status(400).json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarUrl = req.file ? req.file.path : null;

    const newUser = new auth({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
      avatar: avatarUrl,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await auth.findOne({ email });
    // console.log("User ka data : ", user);

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        username: user.username,
        avatar: user.avatar,
      },
      "ghjklsakjdhgfgwehf",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

module.exports = router;
