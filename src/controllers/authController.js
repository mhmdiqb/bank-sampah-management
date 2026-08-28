const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  ApiResponse.created(res, 'Registration successful', result);
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  ApiResponse.success(res, 200, 'Login successful', result);
});

const getMe = catchAsync(async (req, res) => {
  ApiResponse.success(res, 200, 'User profile', req.user);
});

module.exports = { register, login, getMe };
