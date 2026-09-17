const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiResponse = require('../utils/apiResponse');

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price stock image brand category'
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }

    return ApiResponse.success(res, 'Cart retrieved successfully', { cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return ApiResponse.error(res, 'Product ID is required', 400);
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) {
      return ApiResponse.error(res, 'Quantity must be at least 1', 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }

    if (product.stock < qty) {
      return ApiResponse.error(
        res,
        `Requested quantity (${qty}) exceeds available stock (${product.stock})`,
        400
      );
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      const newQuantity = cart.items[itemIndex].quantity + qty;
      if (product.stock < newQuantity) {
        return ApiResponse.error(
          res,
          `Cannot add item. Total requested in cart (${newQuantity}) exceeds available stock (${product.stock})`,
          400
        );
      }
      cart.items[itemIndex].quantity = newQuantity;
      cart.items[itemIndex].price = product.price;
    } else {
      cart.items.push({
        product: productId,
        quantity: qty,
        price: product.price
      });
    }

    await cart.save();
    const populatedCart = await cart.populate('items.product', 'name price stock image brand category');

    return ApiResponse.success(res, 'Item added to cart successfully', { cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) {
      return ApiResponse.error(res, 'Quantity must be at least 1', 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }

    if (product.stock < qty) {
      return ApiResponse.error(
        res,
        `Requested quantity (${qty}) exceeds available stock (${product.stock})`,
        400
      );
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return ApiResponse.error(res, 'Cart not found', 404);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return ApiResponse.error(res, 'Item not found in cart', 404);
    }

    cart.items[itemIndex].quantity = qty;
    cart.items[itemIndex].price = product.price;

    await cart.save();
    const populatedCart = await cart.populate('items.product', 'name price stock image brand category');

    return ApiResponse.success(res, 'Cart item updated successfully', { cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return ApiResponse.error(res, 'Cart not found', 404);
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    const populatedCart = await cart.populate('items.product', 'name price stock image brand category');

    return ApiResponse.success(res, 'Item removed from cart successfully', { cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    return ApiResponse.success(res, 'Cart cleared successfully', { cart });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
};
