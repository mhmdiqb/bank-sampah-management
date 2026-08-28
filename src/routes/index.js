const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/jenis-sampah', require('./jenisSampahRoutes'));
router.use('/transaksi', require('./transaksiRoutes'));
router.use('/penarikan', require('./penarikanRoutes'));
router.use('/saldo', require('./saldoRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/audit-logs', require('./auditRoutes'));

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bank Sampah Management API v1',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      jenisSampah: '/api/v1/jenis-sampah',
      transaksi: '/api/v1/transaksi',
      penarikan: '/api/v1/penarikan',
      saldo: '/api/v1/saldo',
      dashboard: '/api/v1/dashboard',
      auditLogs: '/api/v1/audit-logs',
      docs: '/api-docs',
    },
  });
});

module.exports = router;
