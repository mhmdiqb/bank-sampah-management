const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * Rate Limiting untuk mencegah brute force & abuse.
 * - General limiter: untuk semua endpoint
 * - Auth limiter: lebih ketat untuk endpoint login/register
 */
const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.authMax,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

module.exports = { generalLimiter, authLimiter };
