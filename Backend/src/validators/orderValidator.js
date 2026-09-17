const ApiResponse = require('../utils/apiResponse');

const validateCreateOrderInput = (req, res, next) => {
  const { shippingAddress } = req.body;
  const errors = [];

  if (!shippingAddress) {
    errors.push('Shipping address is required');
  } else {
    if (!shippingAddress.street || shippingAddress.street.trim() === '') {
      errors.push('Shipping street is required');
    }
    if (!shippingAddress.city || shippingAddress.city.trim() === '') {
      errors.push('Shipping city is required');
    }
    if (!shippingAddress.country || shippingAddress.country.trim() === '') {
      errors.push('Shipping country is required');
    }
  }

  if (errors.length > 0) {
    return ApiResponse.error(res, 'Validation error', 400, errors);
  }

  next();
};

module.exports = {
  validateCreateOrderInput
};
