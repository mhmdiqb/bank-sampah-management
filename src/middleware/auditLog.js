const { AuditLog } = require('../models');

/**
 * Audit log middleware untuk create operations.
 * Why: Setiap aksi penting (create/update/delete) dicatat untuk
 * compliance, debugging, dan forensik. Data perubahan disimpan
 * sebagai JSON untuk audit trail yang lengkap.
 */
const logAction = (action, entity) => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      // Hanya catat response sukses
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        try {
          await AuditLog.create({
            userId: req.user.id,
            action,
            entity,
            entityId: res.locals.createdId || null,
            newData: res.locals.createdData || null,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')?.substring(0, 255),
          });
        } catch (err) {
          // Gagal log jangan ganggu response user
          console.error('Audit log failed:', err.message);
        }
      }
    });
    next();
  };
};

module.exports = { logAction };
