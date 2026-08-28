const router = require('express').Router();
const ctrl = require('../controllers/penarikanController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { preventIDOR } = require('../middleware/idorProtection');
const { createPenarikanValidation, approvalValidation, listPenarikanValidation } = require('../validators/penarikanValidator');
const { validate } = require('../validators/validationHandler');
const { logAction } = require('../middleware/auditLog');

router.use(authenticate);

router.get('/', listPenarikanValidation, validate, preventIDOR('nasabah_id'), ctrl.getAll);
router.get('/:id', preventIDOR('nasabah_id'), ctrl.getById);

// Nasabah request penarikan
router.post(
  '/',
  authorize('nasabah', 'admin'),
  createPenarikanValidation,
  validate,
  logAction('CREATE', 'penarikan_saldo'),
  ctrl.create
);

// Admin approve/reject
router.patch(
  '/:id/approve',
  authorize('admin'),
  approvalValidation,
  validate,
  logAction('APPROVE', 'penarikan_saldo'),
  ctrl.approve
);

router.patch(
  '/:id/reject',
  authorize('admin'),
  approvalValidation,
  validate,
  logAction('REJECT', 'penarikan_saldo'),
  ctrl.reject
);

module.exports = router;
