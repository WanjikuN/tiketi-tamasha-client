const { app, server } = require('./server');
const supertest = require('supertest');

afterAll(() => {
  server.close();
});

describe('Express Server Tests', () => {
  it('responds with 200 and "Login successful" on valid login', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('responds with 401 and "Invalid username or password" on invalid login', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid username or password');
  });


});
