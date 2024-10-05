const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth'); // Middleware to check if user is authenticated

// Create a new post (protected route)
router.post('/', authMiddleware, postController.createPost);

// Get all posts (public route)
router.get('/', postController.getAllPosts);

// Get a single post by ID (public route)
router.get('/:id', postController.getPostById);

// Update a post (protected route)
router.put('/:id', authMiddleware, postController.updatePost);

// Delete a post (protected route)
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
