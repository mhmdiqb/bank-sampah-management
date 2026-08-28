'use strict';
const bcrypt = require('bcrypt');
const config = require('../../config');

module.exports = {
  async up(queryInterface) {
    const saltRounds = config.bcrypt.saltRounds;
    const hashedPassword = await bcrypt.hash('Password123!', saltRounds);

    const users = [
      {
        name: 'Admin Bank Sampah',
        email: 'admin@banksampah.com',
        password: hashedPassword,
        role: 'admin',
        phone: '081234567890',
        address: 'Jl. Admin No.1',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Petugas Satu',
        email: 'petugas@banksampah.com',
        password: hashedPassword,
        role: 'petugas',
        phone: '081234567891',
        address: 'Jl. Petugas No.1',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nasabah Demo',
        email: 'nasabah@banksampah.com',
        password: hashedPassword,
        role: 'nasabah',
        phone: '081234567892',
        address: 'Jl. Nasabah No.1',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
