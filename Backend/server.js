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
  max: 500, // Limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

// Body Parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
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

// Production Frontend Serving
if (environment === "production") {
  const __dirname = path.resolve();

  // Static assets
  app.use(
    express.static(path.join(__dirname, "/frontend/dist"), {
      maxAge: 31557600000, // 1 year cache
    })
  );

  // SPA Fallback
  app.get("*", (req, res) => {
    res.set("Cache-Control", "public, max-age=604800");
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
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
  console.log(`
 ████████╗██╗████████╗ █████╗ ███╗   ██╗     ████████╗███████╗ ██████╗██╗  ██╗
╚══██╔══╝██║╚══██╔══╝██╔══██╗████╗  ██║     ╚══██╔══╝██╔════╝██╔════╝██║  ██║ 
   ██║   ██║   ██║   ███████║██╔██╗ ██║        ██║   █████╗  ██║     ███████║
   ██║   ██║   ██║   ██╔══██║██║╚██╗██║        ██║   ██╔══╝  ██║     ██╔══██║
   ██║   ██║   ██║   ██║  ██║██║ ╚████║        ██║   ███████╗╚██████╗██║  ██║
   ╚═╝   ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝        ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
 
  `);
  console.log(`Server running in ${environment} mode on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
