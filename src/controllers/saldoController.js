const service = require('../services/saldoService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const getSaldo = catchAsync(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const result = await service.getSaldo(userId, req.user);
  ApiResponse.success(res, 200, 'Saldo retrieved', result);
});

module.exports = { getSaldo };
