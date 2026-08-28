const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

/**
 * Authentication middleware.
 * Why: Memverifikasi JWT dari header Authorization dan attach user ke req.
 * Token berisi id user; kita query database untuk data terbaru
 * (misal user di-deactivate, token otomatis tidak valid).
 */
const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 401, 'Authentication required. Please provide a valid token.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findByPk(decoded.id);

    if (!user || !user.isActive) {
      return ApiResponse.error(res, 401, 'User not found or inactive.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.error(res, 401, 'Token expired. Please login again.');
    }
    return ApiResponse.error(res, 401, 'Invalid token.');
  }
});

module.exports = { authenticate };
