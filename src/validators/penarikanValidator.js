const { body, param, query } = require('express-validator');

const createPenarikanValidation = [
  body('amount').isFloat({ min: 1000 }).withMessage('Minimum withdrawal is 1000'),
  body('notes').optional().trim(),
];

const approvalValidation = [
  param('id').isInt({ min: 1 }),
  body('notes').optional().trim(),
];

const listPenarikanValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['pending', 'approved', 'rejected']),
];

module.exports = {
  createPenarikanValidation,
  approvalValidation,
  listPenarikanValidation,
};
