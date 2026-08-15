const express = require('express');
const cors = require('cors');
const path = require('path');
const ApiResponse = require('./utils/apiResponse');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

/**
 * Educational Callout (Session 10 & 12):
 * Express apps process requests via a pipeline of middleware functions.
 * - express.json(): Parses incoming JSON request bodies (Session 10).
 * - express.static(): Serves static assets like uploaded images directly from the filesystem (Session 12).
 */
const app = express();

// Security & Parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files Statically (Session 12)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

// Mount Modular API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  return ApiResponse.success(res, 'ECU Summer 2026 E-Commerce API is running smoothly!', {
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

// Centralized Error Handling Pipeline (Session 10 & 11)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;


