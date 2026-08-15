/**
 * Educational Callout (Session 10 & 11):
 * REST APIs must return predictable, standard JSON formats across all endpoints.
 * This utility standardizes success and error response envelopes.
 */

class ApiResponse {
  static success(res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      ...(data !== null && { data })
    });
  }

  static error(res, message = 'An error occurred', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors !== null && { errors })
    });
  }
}

module.exports = ApiResponse;
