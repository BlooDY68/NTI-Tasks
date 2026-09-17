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

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  return ApiResponse.success(res, 'ECU Summer 2026 E-Commerce API is running smoothly!', {
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
