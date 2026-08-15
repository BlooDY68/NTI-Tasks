const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegisterInput, validateLoginInput } = require('../validators/authValidator');

/**
 * Educational Callout (Session 10):
 * Express Router acts as a mini-application, mapping incoming endpoints to specific controller handlers.
 */
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/logout', protect, logout);

module.exports = router;
