const request = require('supertest');
const app = require('../src/app');
const { User } = require('../src/models');

describe('Auth Endpoints', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('id');
      expect(res.body.data.user.email).toBe('test@example.com');
      expect(res.body.data.user).not.toHaveProperty('password');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should fail with invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ name: 'Test', email: 'invalid', password: 'Password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail with weak password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({ name: 'Test', email: 'test2@example.com', password: '123' });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'Password123',
        role: 'nasabah',
      });
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'login@example.com', password: 'Password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('token');
    });

    it('should reject wrong password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'login@example.com', password: 'wrong' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return current user with valid token', async () => {
      await request(app)
        .post('/api/v1/auth/register')
        .send({ name: 'Me Test', email: 'me@example.com', password: 'Password123' });

      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'me@example.com', password: 'Password123' });

      const token = loginRes.body.data.token;

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.email).toBe('me@example.com');
    });

    it('should reject without token', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.statusCode).toBe(401);
    });
  });
});
