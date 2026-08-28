const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { createUserValidation, updateUserValidation } = require('../validators/userValidator');
const { validate } = require('../validators/validationHandler');
const { logAction } = require('../middleware/auditLog');

// Only admin can manage users
router.use(authenticate, authorize('admin'));

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createUserValidation, validate, logAction('CREATE', 'user'), create);
router.put('/:id', updateUserValidation, validate, update);
router.delete('/:id', remove);

module.exports = router;
