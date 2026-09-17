const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return ApiResponse.error(res, 'User with this email already exists', 409);
    }

    let profileImage = '/uploads/users/default-avatar.png';
    if (req.file) {
      profileImage = `/uploads/users/${req.file.filename}`;
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'Customer',
      profileImage
    });

    return ApiResponse.success(
      res,
      'User registered successfully',
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
          createdAt: user.createdAt
        }
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.password !== password) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    return ApiResponse.success(res, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return ApiResponse.success(res, 'Logged out successfully');
};

module.exports = {
  register,
  login,
  logout
};
