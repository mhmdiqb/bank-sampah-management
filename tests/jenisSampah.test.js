const request = require('supertest');
const app = require('../src/app');
const { User, JenisSampah } = require('../src/models');

const getAdminToken = async () => {
  await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: 'Password123',
    role: 'admin',
  });
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'admin@test.com', password: 'Password123' });
  return res.body.data.token;
};

describe('Jenis Sampah Endpoints', () => {
  describe('POST /api/v1/jenis-sampah', () => {
    it('should create jenis sampah as admin', async () => {
      const token = await getAdminToken();

      const res = await request(app)
        .post('/api/v1/jenis-sampah')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Plastik', pricePerKg: 3000 });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.name).toBe('Plastik');
    });

    it('should reject non-admin', async () => {
      await User.create({
        name: 'Nasabah',
        email: 'nasabah@test.com',
        password: 'Password123',
        role: 'nasabah',
      });
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'nasabah@test.com', password: 'Password123' });

      const res = await request(app)
        .post('/api/v1/jenis-sampah')
        .set('Authorization', `Bearer ${loginRes.body.data.token}`)
        .send({ name: 'Test', pricePerKg: 1000 });

      expect(res.statusCode).toBe(403);
    });
  });
});
