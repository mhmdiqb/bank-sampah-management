const service = require('../services/auditService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const result = await service.getAllLogs(req.query);
  ApiResponse.paginated(res, 'Audit logs retrieved', result.data, result.pagination);
});

module.exports = { getAll };
