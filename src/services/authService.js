const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, Saldo } = require('../models');
const config = require('../config');
const ApiError = require('../utils/ApiError');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

const register = async ({ name, email, password, role = 'nasabah', phone, address }) => {
  // Cek email sudah ada
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  // Buat user baru
  const user = await User.create({ name, email, password, role, phone, address });

  // Untuk role nasabah, otomatis buat saldo
  if (role === 'nasabah') {
    await Saldo.create({ userId: user.id, balance: 0 });
  }

  const token = generateToken(user);
  return { user: user.toJSON(), token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, isActive: true } });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user);
  return { user: user.toJSON(), token };
};

module.exports = { register, login };
