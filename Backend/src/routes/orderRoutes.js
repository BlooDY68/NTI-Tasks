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

router.post('/', protect, authorize('Customer'), validateCreateOrderInput, createOrder);
router.get('/my-orders', protect, authorize('Customer'), getMyOrders);

router.get('/', protect, authorize('Admin'), getAllOrders);
router.patch('/:id/status', protect, authorize('Admin'), updateOrderStatus);
router.delete('/:id', protect, authorize('Admin'), deleteOrder);

router.get('/:id', protect, getOrderById);

module.exports = router;
