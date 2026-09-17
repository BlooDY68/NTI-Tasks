const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { validateProductInput } = require('../validators/productValidator');

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post(
  '/',
  protect,
  authorize('Admin'),
  upload.single('image'),
  validateProductInput,
  createProduct
);

router.patch(
  '/:id',
  protect,
  authorize('Admin'),
  upload.single('image'),
  updateProduct
);

router.delete('/:id', protect, authorize('Admin'), deleteProduct);

module.exports = router;
