const ApiResponse = require('../utils/apiResponse');

/**
 * Educational Callout (Session 10 & 11):
 * Centralized error handler processing Mongoose validation errors, invalid ObjectIds,
 * MongoDB duplicate keys, and Multer file upload errors.
 */

const notFoundHandler = (req, res, next) => {
  return ApiResponse.error(res, `Endpoint Not Found - ${req.originalUrl}`, 404);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Mongoose Invalid ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = `Invalid ID format: '${err.value}' is not a valid ObjectId`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((val) => val.message);
  }

  // MongoDB Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for field '${field}'. Please use another value.`;
  }

  // Multer Upload Errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File size exceeds maximum limit of 5MB';
  }

  return ApiResponse.error(res, message, statusCode, errors);
};

module.exports = {
  notFoundHandler,
  errorHandler
};
