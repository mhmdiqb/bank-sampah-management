const { User, Saldo } = require('../models');
const ApiError = require('../utils/ApiError');

const getAllUsers = async ({ page = 1, limit = 10, role, search }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (role) where.role = role;
  if (search) {
    const { Op } = require('sequelize');
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  const { count, rows } = await User.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset,
    order: [['createdAt', 'DESC']],
    include: [{ model: Saldo, as: 'saldo', attributes: ['balance'] }],
  });

  return {
    users: rows,
    pagination: {
      total: count,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(count / limit),
    },
  };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Saldo, as: 'saldo' }],
  });
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const createUser = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) throw new ApiError(409, 'Email already exists');

  const user = await User.create(data);

  if (data.role === 'nasabah') {
    await Saldo.create({ userId: user.id, balance: 0 });
  }

  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new ApiError(404, 'User not found');

  // Jangan biarkan admin nonaktifin dirinya sendiri
  await user.update(data);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new ApiError(404, 'User not found');
  await user.destroy();
  return { id };
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
