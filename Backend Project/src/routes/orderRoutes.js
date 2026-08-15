const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { validateCreateOrderInput } = require('../validators/orderValidator');

/**
 * Educational Callout (Session 10 & 11):
 * Order routes combine Customer order processing and Admin system-wide order management.
 */

// Customer routes
router.post('/', protect, authorize('Customer'), validateCreateOrderInput, createOrder);
router.get('/my-orders', protect, authorize('Customer'), getMyOrders);

// Admin-only routes
router.get('/', protect, authorize('Admin'), getAllOrders);
router.patch('/:id/status', protect, authorize('Admin'), updateOrderStatus);
router.delete('/:id', protect, authorize('Admin'), deleteOrder);

// Common route (Customer views own order, Admin views any order)
router.get('/:id', protect, getOrderById);

module.exports = router;
