const userService = require('../services/userService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  ApiResponse.paginated(res, 'Users retrieved', result.users, result.pagination);
});

const getById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  ApiResponse.success(res, 200, 'User retrieved', user);
});

const create = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.locals.createdId = user.id;
  res.locals.createdData = user.toJSON();
  ApiResponse.created(res, 'User created', user);
});

const update = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  ApiResponse.success(res, 200, 'User updated', user);
});

const remove = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  ApiResponse.success(res, 200, 'User deleted');
});

module.exports = { getAll, getById, create, update, remove };
