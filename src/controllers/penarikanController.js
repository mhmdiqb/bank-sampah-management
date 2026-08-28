const service = require('../services/penarikanService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const data = await service.createPenarikan(req.body, req.user.id);
  res.locals.createdId = data.id;
  res.locals.createdData = data.toJSON();
  ApiResponse.created(res, 'Penarikan requested, awaiting approval', data);
});

const approve = catchAsync(async (req, res) => {
  const result = await service.approvePenarikan(req.params.id, req.user.id);
  ApiResponse.success(res, 200, 'Penarikan approved', result);
});

const reject = catchAsync(async (req, res) => {
  const data = await service.rejectPenarikan(req.params.id, req.user.id, req.body.notes);
  ApiResponse.success(res, 200, 'Penarikan rejected', data);
});

const getAll = catchAsync(async (req, res) => {
  const result = await service.getAllPenarikan(req.query, req.ownershipFilter);
  ApiResponse.paginated(res, 'Penarikan retrieved', result.data, result.pagination);
});

const getById = catchAsync(async (req, res) => {
  const data = await service.getPenarikanById(req.params.id, req.ownershipFilter);
  ApiResponse.success(res, 200, 'Penarikan retrieved', data);
});

module.exports = { create, approve, reject, getAll, getById };
