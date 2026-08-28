const router = require('express').Router();
const ctrl = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);
router.get('/stats', ctrl.getStats);

module.exports = router;
