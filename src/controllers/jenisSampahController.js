const service = require('../services/jenisSampahService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const result = await service.getAll(req.query);
  ApiResponse.paginated(res, 'Jenis sampah retrieved', result.data, result.pagination);
});

const getById = catchAsync(async (req, res) => {
  const data = await service.getById(req.params.id);
  ApiResponse.success(res, 200, 'Jenis sampah retrieved', data);
});

const create = catchAsync(async (req, res) => {
  const data = await service.create(req.body);
  res.locals.createdId = data.id;
  res.locals.createdData = data.toJSON();
  ApiResponse.created(res, 'Jenis sampah created', data);
});

const update = catchAsync(async (req, res) => {
  const data = await service.update(req.params.id, req.body);
  ApiResponse.success(res, 200, 'Jenis sampah updated', data);
});

const remove = catchAsync(async (req, res) => {
  await service.remove(req.params.id);
  ApiResponse.success(res, 200, 'Jenis sampah deleted');
});

module.exports = { getAll, getById, create, update, remove };
