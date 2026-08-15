const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * Educational Callout (Session 10 & 11):
 * Category management endpoints: Public reads, Admin-restricted writes.
 */
router.get('/', getCategories);
router.get('/:id', getCategoryById);

router.post('/', protect, authorize('Admin'), createCategory);
router.patch('/:id', protect, authorize('Admin'), updateCategory);
router.delete('/:id', protect, authorize('Admin'), deleteCategory);

module.exports = router;
