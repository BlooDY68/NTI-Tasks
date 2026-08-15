const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get logged in user profile
// @route   GET /api/users/profile
// @access  Protected
const getProfile = async (req, res) => {
  return ApiResponse.success(res, 'User profile fetched successfully', {
    user: req.user
  });
};

// @desc    Update logged in user profile
// @route   PATCH /api/users/profile
// @access  Protected
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email.toLowerCase();
    
    if (req.file) {
      user.profileImage = `/uploads/users/${req.file.filename}`;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return ApiResponse.success(res, 'Profile updated successfully', {
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    return ApiResponse.success(res, 'Users retrieved successfully', {
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Admin
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }
    return ApiResponse.success(res, 'User retrieved successfully', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PATCH /api/users/:id/role
// @access  Admin
const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role || !['Admin', 'Customer'].includes(role)) {
      return ApiResponse.error(res, 'Role must be either Admin or Customer', 400);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    user.role = role;
    await user.save();

    return ApiResponse.success(res, 'User role updated successfully', { user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    await User.findByIdAndDelete(req.params.id);
    return ApiResponse.success(res, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
};
