const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

dotenv.config();

const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

connectDB();

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Body Parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Development vs Production Middleware
if (environment === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
} else {
  app.use(compression());
}

// API Routes
app.use("/api/users", apiLimiter, userRoutes);
app.use("/api/posts", apiLimiter, postRoutes);

// Serve static files for uploads
if (environment === "production") {
  const __dirname = path.resolve();
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
      maxAge: 31557600000, // 1 year cache
      setHeaders: (res, path) => {
        res.set("Cross-Origin-Resource-Policy", "same-site"); // Allow same-site requests
      },
    })
  );
  // SPA Fallback
  app.get("*", (req, res) => {
    res.set("Cache-Control", "public, max-age=604800"); // 1 week cache
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
      setHeaders: (res, path) => {
        res.set("Cross-Origin-Resource-Policy", "same-site"); // Allow same-site requests
      },
    })
  );
  app.get("/", (req, res) => {
    res.json({
      status: "API Running",
      environment,
      timestamp: new Date().toISOString(),
    });
  });
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Startup
const server = app.listen(port, () => {
  console.log(`Server running in ${environment} mode on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
