const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("../model/Users"); // replace with your actual model path

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    console.log(req.body);

    //   // Check required fields
    if (!firstName || !lastName || !username || !email || !password || !role) {
      // console.log("All Good");

      return res
        .status(400)
        .json({ msg: "All required fields must be filled" });
    }

    // Check if email or username already exists
    const existingEmail = await auth.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const existingUsername = await auth.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ msg: "username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new auth({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// module.exports = router;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await auth.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  // console.log(user.role);

  // Match password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      "ghjklsakjdhgfgwehf",
      {
        expiresIn: "7d",
      }
    );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
