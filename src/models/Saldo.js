module.exports = (sequelize, DataTypes) => {
  const Saldo = sequelize.define(
    'Saldo',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'user_id',
      },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
      },
    },
    {
      tableName: 'saldo',
      underscored: true,
    }
  );

  return Saldo;
};
