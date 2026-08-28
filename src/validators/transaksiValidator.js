const { body, param, query } = require('express-validator');

const createTransaksiValidation = [
  body('nasabahId').isInt({ min: 1 }).withMessage('Valid nasabahId is required'),
  body('jenisSampahId').isInt({ min: 1 }).withMessage('Valid jenisSampahId is required'),
  body('weightKg').isFloat({ min: 0.01 }).withMessage('Weight must be greater than 0'),
  body('notes').optional().trim(),
];

const listTransaksiValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
];

module.exports = { createTransaksiValidation, listTransaksiValidation };
