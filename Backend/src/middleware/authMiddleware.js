const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'] || req.headers.authorization;

    if (!userId) {
      return ApiResponse.error(res, 'Authentication required. Please provide x-user-id in request headers.', 401);
    }

    const cleanUserId = userId.replace('Bearer ', '').trim();

    const user = await User.findById(cleanUserId);
    if (!user) {
      return ApiResponse.error(res, 'User not found. Invalid authentication credentials.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 'Authentication error', 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Forbidden: Role '${req.user ? req.user.role : 'Guest'}' is not authorized to perform this action`,
        403
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
