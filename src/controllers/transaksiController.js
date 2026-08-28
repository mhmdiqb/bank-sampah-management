const service = require('../services/transaksiService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const result = await service.createTransaksi(req.body, req.user.id);
  res.locals.createdId = result.transaksi.id;
  res.locals.createdData = result.transaksi;
  ApiResponse.created(res, 'Transaksi created, saldo updated', result);
});

const getAll = catchAsync(async (req, res) => {
  const result = await service.getAllTransaksi(req.query, req.ownershipFilter);
  ApiResponse.paginated(res, 'Transaksi retrieved', result.data, result.pagination);
});

const getById = catchAsync(async (req, res) => {
  const data = await service.getTransaksiById(req.params.id, req.ownershipFilter);
  ApiResponse.success(res, 200, 'Transaksi retrieved', data);
});

module.exports = { create, getAll, getById };
