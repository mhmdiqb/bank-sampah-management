const { User, TransaksiSetor, PenarikanSaldo, JenisSampah, Saldo } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

/**
 * Dashboard statistics. Berbeda tergantung role.
 */
const getStats = async (user) => {
  if (user.role === 'admin') {
    const [totalUsers, totalNasabah, totalPetugas, totalJenisSampah, totalTransaksi, totalPenarikan, totalSaldoResult] = await Promise.all([
      User.count(),
      User.count({ where: { role: 'nasabah' } }),
      User.count({ where: { role: 'petugas' } }),
      JenisSampah.count({ where: { isActive: true } }),
      TransaksiSetor.count(),
      PenarikanSaldo.count({ where: { status: 'pending' } }),
      Saldo.findOne({
        attributes: [[fn('SUM', col('balance')), 'total']],
      }),
    ]);

    return {
      role: 'admin',
      totalUsers,
      totalNasabah,
      totalPetugas,
      totalJenisSampah,
      totalTransaksi,
      penarikanPending: totalPenarikan,
      totalSaldoNasabah: parseFloat(totalSaldoResult?.get('total') || 0),
    };
  }

  if (user.role === 'petugas') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [transaksiHariIni, totalTransaksi] = await Promise.all([
      TransaksiSetor.count({ where: { petugasId: user.id, createdAt: { [Op.gte]: today } } }),
      TransaksiSetor.count({ where: { petugasId: user.id } }),
    ]);

    return {
      role: 'petugas',
      transaksiHariIni,
      totalTransaksi,
    };
  }

  // Nasabah
  const saldo = await Saldo.findOne({ where: { userId: user.id } });
  const [totalSetor, totalPenarikan] = await Promise.all([
    TransaksiSetor.count({ where: { nasabahId: user.id } }),
    PenarikanSaldo.count({ where: { nasabahId: user.id } }),
  ]);

  return {
    role: 'nasabah',
    balance: parseFloat(saldo?.balance || 0),
    totalSetor,
    totalPenarikan,
  };
};

module.exports = { getStats };
