const { sequelize, TransaksiSetor, JenisSampah, User, Saldo } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create transaksi setor sampah.
 * Alur:
 * 1. Validasi nasabah exists & is role nasabah
 * 2. Validasi jenis sampah exists & active
 * 3. Ambil harga jenis sampah saat ini (snapshot harga)
 * 4. Hitung total: weight * pricePerKg
 * 5. Simpan transaksi
 * 6. Update saldo nasabah (increment)
 * 7. Semua dalam transaction untuk atomicity
 */
const createTransaksi = async ({ nasabahId, jenisSampahId, weightKg, notes }, petugasId) => {
  return await sequelize.transaction(async (t) => {
    // Validasi nasabah
    const nasabah = await User.findByPk(nasabahId, { transaction: t });
    if (!nasabah || nasabah.role !== 'nasabah') {
      throw new ApiError(400, 'Invalid nasabah');
    }

    // Validasi jenis sampah
    const jenisSampah = await JenisSampah.findByPk(jenisSampahId, { transaction: t });
    if (!jenisSampah || !jenisSampah.isActive) {
      throw new ApiError(400, 'Jenis sampah not found or inactive');
    }

    // Hitung total
    const pricePerKg = parseFloat(jenisSampah.pricePerKg);
    const weight = parseFloat(weightKg);
    const totalPrice = weight * pricePerKg;

    // Buat transaksi
    const transaksi = await TransaksiSetor.create(
      {
        nasabahId,
        petugasId,
        jenisSampahId,
        weightKg: weight,
        pricePerKg,
        totalPrice,
        notes,
      },
      { transaction: t }
    );

    // Update saldo nasabah
    const [saldo, created] = await Saldo.findOrCreate({
      where: { userId: nasabahId },
      defaults: { balance: 0 },
      transaction: t,
    });

    const newBalance = parseFloat(saldo.balance) + totalPrice;
    await saldo.update({ balance: newBalance }, { transaction: t });

    return {
      transaksi: transaksi.toJSON(),
      newBalance,
    };
  });
};

const getAllTransaksi = async ({ page = 1, limit = 10 }, ownershipFilter) => {
  const offset = (page - 1) * limit;
  const where = {};

  // IDOR protection: non-admin hanya bisa lihat transaksi sendiri
  if (ownershipFilter) {
    where[ownershipFilter.field] = ownershipFilter.userId;
  }

  const { count, rows } = await TransaksiSetor.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      { model: User, as: 'nasabah', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'petugas', attributes: ['id', 'name', 'email'] },
      { model: JenisSampah, as: 'jenisSampah', attributes: ['id', 'name', 'pricePerKg'] },
    ],
  });

  return {
    data: rows,
    pagination: {
      total: count,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(count / limit),
    },
  };
};

const getTransaksiById = async (id, ownershipFilter) => {
  const where = { id };
  if (ownershipFilter) {
    where[ownershipFilter.field] = ownershipFilter.userId;
  }

  const transaksi = await TransaksiSetor.findOne({
    where,
    include: [
      { model: User, as: 'nasabah', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'petugas', attributes: ['id', 'name', 'email'] },
      { model: JenisSampah, as: 'jenisSampah' },
    ],
  });

  if (!transaksi) throw new ApiError(404, 'Transaksi not found');
  return transaksi;
};

module.exports = { createTransaksi, getAllTransaksi, getTransaksiById };
