const { Saldo, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get saldo. Nasabah hanya bisa lihat saldonya sendiri (IDOR protection).
 */
const getSaldo = async (userId, requester) => {
  // IDOR: nasabah hanya bisa akses saldo sendiri
  if (requester.role === 'nasabah' && requester.id !== userId) {
    throw new ApiError(403, 'You can only access your own balance');
  }

  let saldo = await Saldo.findOne({ where: { userId } });
  if (!saldo) {
    // Auto-create saldo 0 untuk user yang belum punya
    saldo = await Saldo.create({ userId, balance: 0 });
  }

  const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email'] });

  return {
    user,
    balance: parseFloat(saldo.balance),
  };
};

module.exports = { getSaldo };
