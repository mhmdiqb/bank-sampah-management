const { JenisSampah } = require('../models');
const ApiError = require('../utils/ApiError');

const getAll = async ({ page = 1, limit = 10, isActive }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (isActive !== undefined) where.isActive = isActive === 'true';

  const { count, rows } = await JenisSampah.findAndCountAll({
    where,
    limit: parseInt(limit, 10),
    offset,
    order: [['name', 'ASC']],
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

const getById = async (id) => {
  const data = await JenisSampah.findByPk(id);
  if (!data) throw new ApiError(404, 'Jenis sampah not found');
  return data;
};

const create = async (data) => {
  const existing = await JenisSampah.findOne({ where: { name: data.name } });
  if (existing) throw new ApiError(409, 'Jenis sampah with this name already exists');
  return await JenisSampah.create(data);
};

const update = async (id, data) => {
  const item = await JenisSampah.findByPk(id);
  if (!item) throw new ApiError(404, 'Jenis sampah not found');
  await item.update(data);
  return item;
};

const remove = async (id) => {
  const item = await JenisSampah.findByPk(id);
  if (!item) throw new ApiError(404, 'Jenis sampah not found');
  await item.destroy();
  return { id };
};

module.exports = { getAll, getById, create, update, remove };
