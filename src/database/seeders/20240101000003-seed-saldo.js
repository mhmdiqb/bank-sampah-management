'use strict';

module.exports = {
  async up(queryInterface) {
    // Ambil ID nasabah dari seeder users
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'nasabah' LIMIT 1;`
    );

    if (users.length === 0) return;

    const saldo = [
      {
        user_id: users[0].id,
        balance: 50000,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('saldo', saldo, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('saldo', null, {});
  },
};
