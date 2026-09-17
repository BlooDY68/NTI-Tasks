const mongoose = require('mongoose');
const ApiResponse = require('../utils/apiResponse');

const validateProductInput = (req, res, next) => {
  const { name, description, price, category, brand, stock } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Product name is required');
  }

  if (!description || description.trim() === '') {
    errors.push('Product description is required');
  }

  if (price === undefined || price === null || isNaN(price) || Number(price) < 0) {
    errors.push('Price must be a positive number');
  }

  if (!category || !mongoose.Types.ObjectId.isValid(category)) {
    errors.push('Valid category ID is required');
  }

  if (!brand || brand.trim() === '') {
    errors.push('Product brand is required');
  }

  if (stock === undefined || stock === null || isNaN(stock) || Number(stock) < 0) {
    errors.push('Stock must be a non-negative integer');
  }

  if (errors.length > 0) {
    return ApiResponse.error(res, 'Validation error', 400, errors);
  }

  next();
};

module.exports = {
  validateProductInput
};
