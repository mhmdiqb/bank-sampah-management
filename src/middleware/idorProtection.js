const ApiResponse = require('../utils/apiResponse');

/**
 * IDOR (Insecure Direct Object Reference) protection.
 * Why: Mencegah user mengakses resource milik user lain.
 *
 * Untuk role non-admin, kita tambahkan filter where user_id = req.user.id
 * di service layer. Middleware ini membantu di level route.
 */
const preventIDOR = (resourceOwnerField = 'nasabah_id') => {
  return (req, res, next) => {
    if (req.user.role === 'admin') return next();

    // Inject ownership filter ke req untuk digunakan service
    req.ownershipFilter = {
      field: resourceOwnerField,
      userId: req.user.id,
    };
    next();
  };
};

module.exports = { preventIDOR };
