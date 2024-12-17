// multerConfig.js
const multer = require("multer");
const path = require("path");

// Set up file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|webp|jpg|png|gif/; // Accept only image files
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."));
  }
};

// Set up multer middleware
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
