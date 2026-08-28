/**
 * Custom error class dengan statusCode.
 * Why: Agar service bisa throw error dengan HTTP status code,
 * yang kemudian di-handle oleh global error handler middleware.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
