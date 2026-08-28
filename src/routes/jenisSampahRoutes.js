const router = require('express').Router();
const ctrl = require('../controllers/jenisSampahController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { createJenisSampahValidation, updateJenisSampahValidation } = require('../validators/jenisSampahValidator');
const { validate } = require('../validators/validationHandler');

// Read: all authenticated users
router.get('/', authenticate, ctrl.getAll);
router.get('/:id', authenticate, ctrl.getById);

// Write: admin only
router.post('/', authenticate, authorize('admin'), createJenisSampahValidation, validate, ctrl.create);
router.put('/:id', authenticate, authorize('admin'), updateJenisSampahValidation, validate, ctrl.update);
router.delete('/:id', authenticate, authorize('admin'), ctrl.remove);

module.exports = router;
