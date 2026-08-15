const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * Educational Callout (Session 10 & RBAC):
 * Protect middleware ensures the request has a valid token.
 * Authorize('Admin') middleware restricts access strictly to users with the Admin role.
 */

// Profile routes (Customer or Admin)
router.get('/profile', protect, getProfile);
router.patch('/profile', protect, updateProfile);

// Admin-only User management routes
router.get('/', protect, authorize('Admin'), getAllUsers);
router.get('/:id', protect, authorize('Admin'), getUserById);
router.patch('/:id/role', protect, authorize('Admin'), updateUserRole);
router.delete('/:id', protect, authorize('Admin'), deleteUser);

module.exports = router;
