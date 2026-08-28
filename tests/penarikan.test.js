const request = require('supertest');
const app = require('../src/app');
const { User, Saldo } = require('../src/models');

let adminToken, nasabahToken, nasabahId;

beforeEach(async () => {
  await User.create({ name: 'Admin', email: 'admin@p.com', password: 'Password123', role: 'admin' });
  const nasabah = await User.create({ name: 'Nasabah', email: 'n@p.com', password: 'Password123', role: 'nasabah' });
  await Saldo.create({ userId: nasabah.id, balance: 50000 });
  nasabahId = nasabah.id;

  const a = await request(app).post('/api/v1/auth/login').send({ email: 'admin@p.com', password: 'Password123' });
  const n = await request(app).post('/api/v1/auth/login').send({ email: 'n@p.com', password: 'Password123' });
  adminToken = a.body.data.token;
  nasabahToken = n.body.data.token;
});

describe('Penarikan Endpoints', () => {
  it('nasabah can request withdrawal', async () => {
    const res = await request(app)
      .post('/api/v1/penarikan')
      .set('Authorization', `Bearer ${nasabahToken}`)
      .send({ amount: 20000 });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.status).toBe('pending');
  });

  it('admin can approve withdrawal', async () => {
    const create = await request(app)
      .post('/api/v1/penarikan')
      .set('Authorization', `Bearer ${nasabahToken}`)
      .send({ amount: 10000 });

    const res = await request(app)
      .patch(`/api/v1/penarikan/${create.body.data.id}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.penarikan.status).toBe('approved');
  });

  it('admin cannot approve own withdrawal twice', async () => {
    const create = await request(app)
      .post('/api/v1/penarikan')
      .set('Authorization', `Bearer ${nasabahToken}`)
      .send({ amount: 10000 });

    await request(app)
      .patch(`/api/v1/penarikan/${create.body.data.id}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);

    const res = await request(app)
      .patch(`/api/v1/penarikan/${create.body.data.id}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(400);
  });

  it('should reject withdrawal with insufficient balance', async () => {
    const res = await request(app)
      .post('/api/v1/penarikan')
      .set('Authorization', `Bearer ${nasabahToken}`)
      .send({ amount: 1000000 });

    expect(res.statusCode).toBe(400);
  });
});
