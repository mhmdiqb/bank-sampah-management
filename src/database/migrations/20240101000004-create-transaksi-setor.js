'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi_setor', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nasabah_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      petugas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      jenis_sampah_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'jenis_sampah', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      weight_kg: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      price_per_kg: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('transaksi_setor', ['nasabah_id']);
    await queryInterface.addIndex('transaksi_setor', ['petugas_id']);
    await queryInterface.addIndex('transaksi_setor', ['created_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transaksi_setor');
  },
};
