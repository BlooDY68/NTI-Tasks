const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = 'uploads';

    const url = req.baseUrl || req.originalUrl || '';

    if (url.includes('products') || url.includes('courses')) {
      dest = 'uploads/products';
    } else if (url.includes('users') || url.includes('auth')) {
      dest = 'uploads/users';
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || `.${file.mimetype.split('/')[1]}`;
    const url = req.baseUrl || req.originalUrl || '';

    let prefix = 'file';
    if (url.includes('products') || url.includes('courses')) {
      prefix = 'product';
    } else if (url.includes('users') || url.includes('auth')) {
      prefix = 'user';
    }

    const uniqueFilename = `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueFilename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, JPG, PNG, and WEBP image files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;
