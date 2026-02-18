import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  login,
  refreshToken,
  registerUser,
} from "../Controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/refresh", refreshToken);
authRouter.post("/login", login);
authRouter.post("/register", registerUser);
authRouter.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
