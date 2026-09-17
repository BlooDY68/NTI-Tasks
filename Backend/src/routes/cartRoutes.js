const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('Customer'));

router.get('/', getCart);
router.post('/items', addToCart);
router.patch('/items/:productId', updateCartItemQuantity);
router.delete('/items/:productId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;
