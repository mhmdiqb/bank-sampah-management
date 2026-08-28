const { body, param } = require('express-validator');

const createUserValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
  body('role').isIn(['admin', 'petugas', 'nasabah']).withMessage('Invalid role'),
];

const updateUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('Invalid user ID'),
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('email').optional().trim().isEmail().normalizeEmail(),
  body('role').optional().isIn(['admin', 'petugas', 'nasabah']),
  body('isActive').optional().isBoolean(),
];

module.exports = { createUserValidation, updateUserValidation };
