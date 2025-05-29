import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

connectDB();

const app = express();
app.set("trust proxy", 1);

// Security Middleware
if (environment === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
}
app.use(mongoSanitize());
app.use(hpp());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: true },
});

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin:
    environment === "production"
      ? process.env.CORS_ORIGIN_PRODUCTION?.split(",") || []
      : [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3002",
          
        ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Development vs Production Middleware
if (environment === "development") {
  app.use(morgan("dev"));
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
} else {
  app.use(compression());
}

// API Routes
app.use("/api/users", apiLimiter, userRoutes);

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  message: "Too many login attempts, please try again later.",
});
app.use("/api/users/login", loginLimiter);
app.use("/api/posts", apiLimiter, postRoutes);

// Serve static files for uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: environment === "production" ? 31557600000 : 0,
    setHeaders: (_res, _path) => {
      _res.set(
        "Cross-Origin-Resource-Policy",
        environment === "production" ? "same-site" : "cross-origin"
      );
      if (environment !== "production") {
        _res.set("Cache-Control", "no-store, must-revalidate");
      }
    },
  })
);

// Serve frontend in production
if (environment === "production") {
  // Serve static frontend build
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // SPA Fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  // Development fallback route
  app.get("/", (_req, res) => {
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

// Global unhandledRejection handler
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
