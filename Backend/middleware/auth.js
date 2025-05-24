import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

export const protect = asyncHandler(async (req, res, next) => {
  // Debugging: Log received cookies
  console.log("Cookies Received: ", req.cookies);

  // Extract token from cookies using key "jwt"
  const token = req.cookies.jwt;
  console.log("Token Received: ", token);

  if (!token || typeof token !== "string") {
    return res.status(401).json({
      success: false,
      message: "Not authorized - No valid token provided",
    });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
