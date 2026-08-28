module.exports = (sequelize, DataTypes) => {
  const PenarikanSaldo = sequelize.define(
    'PenarikanSaldo',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nasabahId: { type: DataTypes.INTEGER, allowNull: false, field: 'nasabah_id' },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: { min: 1000 },
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      approvedBy: { type: DataTypes.INTEGER, allowNull: true, field: 'approved_by' },
      approvedAt: { type: DataTypes.DATE, allowNull: true, field: 'approved_at' },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: 'penarikan_saldo',
      underscored: true,
    }
  );

  return PenarikanSaldo;
};
