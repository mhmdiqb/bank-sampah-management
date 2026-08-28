const config = require('../config');
const logger = require('../utils/logger');
const ApiResponse = require('../utils/apiResponse');

/**
 * Global error handler.
 * Why: Mencegah stack trace bocor ke client di production.
 * Hanya kembalikan pesan generic, log detail di server.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
    return ApiResponse.error(res, 400, 'Validation error', errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 401, 'Invalid token');
  }

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Jangan expose error detail di production
  if (config.app.env === 'production' && statusCode === 500) {
    message = 'Internal server error';
  }

  return ApiResponse.error(res, statusCode, message);
};

module.exports = errorHandler;
