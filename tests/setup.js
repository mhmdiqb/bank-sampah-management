const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  // Clean tables after each test
  const { User, Saldo, TransaksiSetor, PenarikanSaldo, JenisSampah, AuditLog } = require('../src/models');
  await AuditLog.destroy({ where: {}, truncate: true, cascade: true });
  await PenarikanSaldo.destroy({ where: {}, truncate: true, cascade: true });
  await TransaksiSetor.destroy({ where: {}, truncate: true, cascade: true });
  await Saldo.destroy({ where: {}, truncate: true, cascade: true });
  await JenisSampah.destroy({ where: {}, truncate: true, cascade: true });
  await User.destroy({ where: {}, truncate: true, cascade: true });
});
