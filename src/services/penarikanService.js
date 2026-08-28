const { sequelize, PenarikanSaldo, Saldo, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Nasabah request penarikan saldo.
 * Status default: pending (perlu approval admin).
 */
const createPenarikan = async ({ amount, notes }, nasabahId) => {
  return await sequelize.transaction(async (t) => {
    // Cek saldo cukup
    const saldo = await Saldo.findOne({ where: { userId: nasabahId }, transaction: t });
    if (!saldo || parseFloat(saldo.balance) < parseFloat(amount)) {
      throw new ApiError(400, 'Insufficient balance');
    }

    const penarikan = await PenarikanSaldo.create(
      {
        nasabahId,
        amount,
        notes,
        status: 'pending',
      },
      { transaction: t }
    );

    return penarikan;
  });
};

/**
 * Admin approve penarikan.
 * - Cek status masih pending
 * - Cek saldo masih cukup
 * - Kurangi saldo
 * - Update status ke approved
 */
const approvePenarikan = async (id, adminId) => {
  return await sequelize.transaction(async (t) => {
    const penarikan = await PenarikanSaldo.findByPk(id, { transaction: t });
    if (!penarikan) throw new ApiError(404, 'Penarikan not found');
    if (penarikan.status !== 'pending') {
      throw new ApiError(400, 'Penarikan already processed');
    }

    const saldo = await Saldo.findOne({ where: { userId: penarikan.nasabahId }, transaction: t });
    if (!saldo || parseFloat(saldo.balance) < parseFloat(penarikan.amount)) {
      throw new ApiError(400, 'Insufficient balance');
    }

    // Kurangi saldo
    const newBalance = parseFloat(saldo.balance) - parseFloat(penarikan.amount);
    await saldo.update({ balance: newBalance }, { transaction: t });

    // Update status penarikan
    await penarikan.update(
      {
        status: 'approved',
        approvedBy: adminId,
        approvedAt: new Date(),
      },
      { transaction: t }
    );

    return { penarikan, newBalance };
  });
};

const rejectPenarikan = async (id, adminId, notes) => {
  const penarikan = await PenarikanSaldo.findByPk(id);
  if (!penarikan) throw new ApiError(404, 'Penarikan not found');
  if (penarikan.status !== 'pending') {
    throw new ApiError(400, 'Penarikan already processed');
  }

  await penarikan.update({
    status: 'rejected',
    approvedBy: adminId,
    approvedAt: new Date(),
    notes,
  });

  return penarikan;
};

const getAllPenarikan = async ({ page = 1, limit = 10, status }, ownershipFilter) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (status) where.status = status;

  // IDOR: nasabah hanya lihat penarikan sendiri
  if (ownershipFilter) {
    where[ownershipFilter.field] = ownershipFilter.userId;
  }

  const { count, rows } = await PenarikanSaldo.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      { model: User, as: 'nasabah', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'approver', attributes: ['id', 'name', 'email'] },
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

const getPenarikanById = async (id, ownershipFilter) => {
  const where = { id };
  if (ownershipFilter) {
    where[ownershipFilter.field] = ownershipFilter.userId;
  }

  const penarikan = await PenarikanSaldo.findOne({
    where,
    include: [
      { model: User, as: 'nasabah', attributes: ['id', 'name', 'email'] },
      { model: User, as: 'approver', attributes: ['id', 'name', 'email'] },
    ],
  });

  if (!penarikan) throw new ApiError(404, 'Penarikan not found');
  return penarikan;
};

module.exports = {
  createPenarikan,
  approvePenarikan,
  rejectPenarikan,
  getAllPenarikan,
  getPenarikanById,
};
