const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Simplified storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileDestination = "./media"; // Use 'uploads' for simplicity
    if (!fs.existsSync(fileDestination)) {
      fs.mkdirSync(fileDestination, { recursive: true }); // Ensure the folder exists
    }
    cb(null, fileDestination);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); // Use timestamp for uniqueness
    const extname = path.extname(file.originalname); // File extension
    const filename = `${uniqueSuffix}${extname}`; // Simplified filename
    cb(null, filename);
  },
});

// File filter to validate image types
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|jfif)$/i)) {
    return cb(new Error("Invalid file type"), false);
  }
  cb(null, true);
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000000, // 2 MB file size limit
  },
});

module.exports = upload;
