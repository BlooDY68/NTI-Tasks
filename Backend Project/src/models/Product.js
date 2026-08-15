const mongoose = require('mongoose');

/**
 * Educational Callout (Session 11):
 * Mongoose ObjectId references establish normalized relationships between MongoDB documents.
 * Here, `category` links each Product to a document in the 'Category' collection.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required']
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    image: {
      type: String,
      default: '/uploads/products/default-product.png'
    }
  },
  {
    timestamps: true
  }
);

// Add text index for search support
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
