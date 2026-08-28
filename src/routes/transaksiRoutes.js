const router = require('express').Router();
const ctrl = require('../controllers/transaksiController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { preventIDOR } = require('../middleware/idorProtection');
const { createTransaksiValidation, listTransaksiValidation } = require('../validators/transaksiValidator');
const { validate } = require('../validators/validationHandler');
const { logAction } = require('../middleware/auditLog');

router.use(authenticate);

router.get('/', listTransaksiValidation, validate, preventIDOR('nasabah_id'), ctrl.getAll);
router.get('/:id', preventIDOR('nasabah_id'), ctrl.getById);

// Petugas & admin can create transaksi
router.post(
  '/',
  authorize('admin', 'petugas'),
  createTransaksiValidation,
  validate,
  logAction('CREATE', 'transaksi_setor'),
  ctrl.create
);

module.exports = router;
