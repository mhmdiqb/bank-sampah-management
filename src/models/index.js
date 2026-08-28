const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, DataTypes);
const JenisSampah = require('./JenisSampah')(sequelize, DataTypes);
const Saldo = require('./Saldo')(sequelize, DataTypes);
const TransaksiSetor = require('./TransaksiSetor')(sequelize, DataTypes);
const PenarikanSaldo = require('./PenarikanSaldo')(sequelize, DataTypes);
const AuditLog = require('./AuditLog')(sequelize, DataTypes);

// Associations
User.hasOne(Saldo, { foreignKey: 'user_id', as: 'saldo' });
Saldo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(TransaksiSetor, { foreignKey: 'nasabah_id', as: 'transaksiSetor' });
TransaksiSetor.belongsTo(User, { foreignKey: 'nasabah_id', as: 'nasabah' });

User.hasMany(TransaksiSetor, { foreignKey: 'petugas_id', as: 'transaksiDiHandle' });
TransaksiSetor.belongsTo(User, { foreignKey: 'petugas_id', as: 'petugas' });

JenisSampah.hasMany(TransaksiSetor, { foreignKey: 'jenis_sampah_id', as: 'transaksi' });
TransaksiSetor.belongsTo(JenisSampah, { foreignKey: 'jenis_sampah_id', as: 'jenisSampah' });

User.hasMany(PenarikanSaldo, { foreignKey: 'nasabah_id', as: 'penarikanSaldo' });
PenarikanSaldo.belongsTo(User, { foreignKey: 'nasabah_id', as: 'nasabah' });

User.hasMany(PenarikanSaldo, { foreignKey: 'approved_by', as: 'approvedPenarikan' });
PenarikanSaldo.belongsTo(User, { foreignKey: 'approved_by', as: 'approver' });

User.hasMany(AuditLog, { foreignKey: 'user_id', as: 'auditLogs' });
AuditLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  JenisSampah,
  Saldo,
  TransaksiSetor,
  PenarikanSaldo,
  AuditLog,
};
