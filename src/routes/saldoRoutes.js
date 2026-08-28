const router = require('express').Router();
const ctrl = require('../controllers/saldoController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/:userId', ctrl.getSaldo);

module.exports = router;
