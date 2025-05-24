import express from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  register,
  logout,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: "Too many attempts, please try again later",
});

// Public routes
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);

// Protected routes
router
  .route("/profile")
  .put(protect, updateUserProfile); // PUT /api/users/profile

export default router;
