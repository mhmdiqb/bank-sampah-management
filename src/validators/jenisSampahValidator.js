const { body, param } = require('express-validator');

const createJenisSampahValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('pricePerKg').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().trim(),
];

const updateJenisSampahValidation = [
  param('id').isInt({ min: 1 }),
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('pricePerKg').optional().isFloat({ min: 0 }),
  body('description').optional().trim(),
  body('isActive').optional().isBoolean(),
];

module.exports = { createJenisSampahValidation, updateJenisSampahValidation };
