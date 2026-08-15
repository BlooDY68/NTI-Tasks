const mongoose = require('mongoose');

/**
 * Educational Callout (Session 11):
 * Cart model maintains a 1-to-1 relationship with User and 1-to-many embedded document array for cart items referencing Products.
 */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to ensure totalPrice is always accurate
cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
