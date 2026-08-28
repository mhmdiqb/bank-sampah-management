module.exports = (sequelize, DataTypes) => {
  const TransaksiSetor = sequelize.define(
    'TransaksiSetor',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nasabahId: { type: DataTypes.INTEGER, allowNull: false, field: 'nasabah_id' },
      petugasId: { type: DataTypes.INTEGER, allowNull: false, field: 'petugas_id' },
      jenisSampahId: { type: DataTypes.INTEGER, allowNull: false, field: 'jenis_sampah_id' },
      weightKg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'weight_kg',
        validate: { min: 0.01 },
      },
      pricePerKg: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        field: 'price_per_kg',
      },
      totalPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: 'total_price',
      },
      notes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: 'transaksi_setor',
      underscored: true,
    }
  );

  return TransaksiSetor;
};
