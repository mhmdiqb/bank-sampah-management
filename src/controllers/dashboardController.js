const service = require('../services/dashboardService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const getStats = catchAsync(async (req, res) => {
  const stats = await service.getStats(req.user);
  ApiResponse.success(res, 200, 'Dashboard stats', stats);
});

module.exports = { getStats };
