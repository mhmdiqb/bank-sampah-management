const router = require('express').Router();
const ctrl = require('../controllers/auditController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

// Only admin
router.use(authenticate, authorize('admin'));
router.get('/', ctrl.getAll);

module.exports = router;
