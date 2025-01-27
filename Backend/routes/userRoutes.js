const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

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
  .get(protect, getUserProfile) // GET /api/users/profile
  .put(protect, updateUserProfile); // PUT /api/users/profile

module.exports = router;
