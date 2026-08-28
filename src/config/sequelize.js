const { Sequelize } = require('sequelize');
const config = require('./index');

// Sequelize CLI configuration
const sequelizeConfig = {
  development: {
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};

module.exports = sequelizeConfig;
