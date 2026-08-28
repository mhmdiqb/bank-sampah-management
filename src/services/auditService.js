const { AuditLog, User } = require('../models');
const { Op } = require('sequelize');

const getAllLogs = async ({ page = 1, limit = 20, action, entity, userId, startDate, endDate }) => {
  const offset = (page - 1) * limit;
  const where = {};

  if (action) where.action = action;
  if (entity) where.entity = entity;
  if (userId) where.userId = userId;
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt[Op.gte] = new Date(startDate);
    if (endDate) where.createdAt[Op.lte] = new Date(endDate);
  }

  const { count, rows } = await AuditLog.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset,
    order: [['createdAt', 'DESC']],
    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] }],
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

module.exports = { getAllLogs };
