const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");

const protect = asyncHandler(async (req, res, next) => {
  // 1. Validate token presence and format
  const token = req.cookies.jwt;

  if (!token || typeof token !== "string") {
    return res.status(401).json({
      success: false,
      message: "Not authorized - No valid token provided",
    });
  }

  try {
    // 2. Verify token with enhanced security options
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"], // Specify allowed algorithms
      maxAge: process.env.JWT_EXPIRES_IN, // Validate against token expiration
    });

    // 3. Validate token structure
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
    }

    // 4. Get fresh user data with cache check
    const currentUser = await User.findById(decoded.userId).select("-password");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists",
      });
    }

    // 5. Add security headers and attach user to request
    res.set("Cache-Control", "no-store");
    req.user = currentUser;

    // 6. Continue to protected route
    next();
  } catch (error) {
    // 7. Handle specific JWT errors
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Session expired - Please log in again"
        : "Not authorized - Invalid token";

    return res.status(401).json({
      success: false,
      message: errorMessage,
      errorCode: error.name, // Helpful for debugging
    });
  }
});

module.exports = { protect };
