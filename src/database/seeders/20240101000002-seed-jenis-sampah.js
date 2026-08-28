'use strict';

module.exports = {
  async up(queryInterface) {
    const jenisSampah = [
      { name: 'Plastik', price_per_kg: 3000, description: 'Botol plastik, kemasan', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Kertas', price_per_kg: 2000, description: 'Kertas HVS, kardus', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Besi', price_per_kg: 8000, description: 'Besi tua, kaleng', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Botol Kaca', price_per_kg: 1500, description: 'Botol kaca bekas', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Aluminium', price_per_kg: 12000, description: 'Kaleng aluminium', is_active: true, created_at: new Date(), updated_at: new Date() },
    ];

    await queryInterface.bulkInsert('jenis_sampah', jenisSampah, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('jenis_sampah', null, {});
  },
};
