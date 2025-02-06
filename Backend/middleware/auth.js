const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");

const protect = asyncHandler(async (req, res, next) => {
  // Debugging: Log received cookies
  console.log("Cookies Received: ", req.cookies);

  // Extract token from cookies
  const token = req.cookies.jwt;
  console.log("Token Received: ", token);

  if (!token || typeof token !== "string") {
    return res.status(401).json({
      success: false,
      message: "Not authorized - No valid token provided",
    });
  }

  try {
    // Verify JWT without using `maxAge` in verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging: Log decoded token
    console.log("Decoded Token: ", decoded);

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
    }

    // Fetch the user, excluding the password field
    const currentUser = await User.findById(decoded.userId).select("-password");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists",
      });
    }

    // Security headers
    res.set("Cache-Control", "no-store");

    // Attach user to request
    req.user = currentUser;

    // Move to next middleware/route
    next();
  } catch (error) {
    console.error("JWT Verification Error: ", error);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired - Please log in again"
          : "Not authorized - Invalid token",
      errorCode: error.name,
    });
  }
});

module.exports = { protect };
