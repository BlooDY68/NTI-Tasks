const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create new order from user's active cart
// @route   POST /api/orders
// @access  Protected (Customer)
const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return ApiResponse.error(res, 'Your cart is empty. Cannot create an order.', 400);
    }

    // Verify stock availability for all items first
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return ApiResponse.error(
          res,
          `Product '${item.product.name}' no longer exists`,
          404
        );
      }

      if (product.stock < item.quantity) {
        return ApiResponse.error(
          res,
          `Insufficient stock for product '${product.name}'. Available: ${product.stock}, Requested: ${item.quantity}`,
          400
        );
      }
    }

    // Deduct stock for each product
    const orderProducts = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();

      orderProducts.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.price
      });
    }

    // Create order document
    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice: cart.totalPrice,
      shippingAddress
    });

    // Clear cart after successful order creation
    cart.items = [];
    await cart.save();

    return ApiResponse.success(res, 'Order created successfully', { order }, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's order history
// @route   GET /api/orders/my-orders
// @access  Protected (Customer)
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return ApiResponse.success(res, 'Your orders retrieved successfully', {
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Protected (Customer / Admin)
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('products.product', 'name brand image');

    if (!order) {
      return ApiResponse.error(res, 'Order not found', 404);
    }

    // Ensure customer can only view their own order
    if (req.user.role !== 'Admin' && order.user._id.toString() !== req.user._id.toString()) {
      return ApiResponse.error(res, 'Not authorized to view this order', 403);
    }

    return ApiResponse.success(res, 'Order retrieved successfully', { order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all system orders
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return ApiResponse.success(res, 'All system orders retrieved successfully', {
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

    if (!status || !allowedStatuses.includes(status)) {
      return ApiResponse.error(
        res,
        `Status must be one of: ${allowedStatuses.join(', ')}`,
        400
      );
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return ApiResponse.error(res, 'Order not found', 404);
    }

    // If changing status to 'cancelled' and it was not previously cancelled, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();

    return ApiResponse.success(res, 'Order status updated successfully', { order });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete or cancel order
// @route   DELETE /api/orders/:id
// @access  Admin
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return ApiResponse.error(res, 'Order not found', 404);
    }

    // Restore stock if order was not already cancelled
    if (order.status !== 'cancelled') {
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    await Order.findByIdAndDelete(req.params.id);
    return ApiResponse.success(res, 'Order deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
