const multer = require('multer');
const path = require('path');

// storage settings - files temporarily memory mein rakhenge (disk pe save nahi karenge)
const storage = multer.memoryStorage();

// sirf PDF aur DOCX allow karo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;