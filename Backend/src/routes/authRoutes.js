const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegisterInput, validateLoginInput } = require('../validators/authValidator');

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/logout', protect, logout);

module.exports = router;
