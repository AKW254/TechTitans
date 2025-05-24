import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  if (!res) {
    throw new Error("Response object (res) is required to set a cookie.");
  }

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate authentication token.");
  }
};

export default generateToken;
