module.exports = (sequelize, DataTypes) => {
  const JenisSampah = sequelize.define(
    'JenisSampah',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      pricePerKg: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        field: 'price_per_kg',
        validate: { min: 0 },
      },
      description: { type: DataTypes.TEXT, allowNull: true },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
      },
    },
    {
      tableName: 'jenis_sampah',
      underscored: true,
    }
  );

  return JenisSampah;
};
