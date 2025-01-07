const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (Object.keys(req.body).length) {
    console.log("Request Body:", req.body);
  }
  next();
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

// Start the server and log routes
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`User API: http://localhost:${port}/api/users`);
  console.log(`Post API: http://localhost:${port}/api/posts`);
});
