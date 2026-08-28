const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: true, len: [2, 100] } },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING(255), allowNull: false },
      role: {
        type: DataTypes.ENUM('admin', 'petugas', 'nasabah'),
        allowNull: false,
        defaultValue: 'nasabah',
      },
      phone: { type: DataTypes.STRING(20), allowNull: true },
      address: { type: DataTypes.TEXT, allowNull: true },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
      },
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );

  // Hash password sebelum create/update
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, config.bcrypt.saltRounds);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, config.bcrypt.saltRounds);
    }
  });

  // Method instance untuk compare password
  User.prototype.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // Hide sensitive fields
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};
