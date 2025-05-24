import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protect } from "../middleware/auth.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// Ensure "uploads/" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer upload middleware
const upload = multer({ storage });

// Routes
router.post("/create", protect, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", protect, upload.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
