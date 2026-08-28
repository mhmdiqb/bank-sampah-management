const request = require('supertest');
const app = require('../src/app');
const { User, JenisSampah, TransaksiSetor, Saldo } = require('../src/models');

let adminToken, petugasToken, nasabahToken, nasabahId, jenisSampahId;

const createUsers = async () => {
  await User.create({ name: 'Admin', email: 'admin@t.com', password: 'Password123', role: 'admin' });
  await User.create({ name: 'Petugas', email: 'petugas@t.com', password: 'Password123', role: 'petugas' });
  const nasabah = await User.create({ name: 'Nasabah', email: 'nasabah@t.com', password: 'Password123', role: 'nasabah' });
  await Saldo.create({ userId: nasabah.id, balance: 0 });
  return nasabah.id;
};

const loginUser = async (email) => {
  const res = await request(app).post('/api/v1/auth/login').send({ email, password: 'Password123' });
  return res.body.data.token;
};

beforeEach(async () => {
  nasabahId = await createUsers();
  adminToken = await loginUser('admin@t.com');
  petugasToken = await loginUser('petugas@t.com');
  nasabahToken = await loginUser('nasabah@t.com');

  const js = await JenisSampah.create({ name: 'Plastik', pricePerKg: 3000 });
  jenisSampahId = js.id;
});

describe('Transaksi Endpoints', () => {
  it('petugas can create transaksi setor', async () => {
    const res = await request(app)
      .post('/api/v1/transaksi')
      .set('Authorization', `Bearer ${petugasToken}`)
      .send({ nasabahId, jenisSampahId, weightKg: 5 });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.transaksi.totalPrice).toBe(15000);
    expect(res.body.data.newBalance).toBe(15000);
  });

  it('should update saldo after transaksi', async () => {
    await request(app)
      .post('/api/v1/transaksi')
      .set('Authorization', `Bearer ${petugasToken}`)
      .send({ nasabahId, jenisSampahId, weightKg: 2 });

    const saldo = await Saldo.findOne({ where: { userId: nasabahId } });
    expect(parseFloat(saldo.balance)).toBe(6000);
  });

  it('nasabah cannot create transaksi', async () => {
    const res = await request(app)
      .post('/api/v1/transaksi')
      .set('Authorization', `Bearer ${nasabahToken}`)
      .send({ nasabahId, jenisSampahId, weightKg: 5 });

    expect(res.statusCode).toBe(403);
  });

  it('nasabah can only see own transaksi (IDOR protection)', async () => {
    // Buat transaksi
    await request(app)
      .post('/api/v1/transaksi')
      .set('Authorization', `Bearer ${petugasToken}`)
      .send({ nasabahId, jenisSampahId, weightKg: 1 });

    // Nasabah get list
    const res = await request(app)
      .get('/api/v1/transaksi')
      .set('Authorization', `Bearer ${nasabahToken}`);

    expect(res.statusCode).toBe(200);
    res.body.data.forEach((trx) => {
      expect(trx.nasabahId).toBe(nasabahId);
    });
  });
});
