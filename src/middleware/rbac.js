const ApiResponse = require('../utils/apiResponse');

/**
 * Role-Based Access Control middleware.
 * Why: Setiap endpoint butuh role tertentu. Middleware ini menerima
 * array of roles yang diizinkan, sehingga permission terpusat & reusable.
 *
 * Contoh: authorize('admin', 'petugas') - endpoint bisa diakses admin & petugas
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 401, 'Authentication required.');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, 403, 'Access denied. Insufficient permissions.');
    }

    next();
  };
};

module.exports = { authorize };
