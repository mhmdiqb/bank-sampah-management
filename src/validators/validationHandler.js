const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/apiResponse');

/**
 * Middleware untuk handle validation result.
 * Why: Sentralisasi logika validation, controller tinggal pakai.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 400, 'Validation failed', errors.array());
  }
  next();
};

module.exports = { validate };
