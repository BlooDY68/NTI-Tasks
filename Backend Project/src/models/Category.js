const mongoose = require('mongoose');

/**
 * Educational Callout (Session 11):
 * Category model serves as a referenced document in relational queries via Mongoose ObjectId references.
 */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
