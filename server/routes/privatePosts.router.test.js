const router = require('./privatePosts.router');
const supertest = require('supertest');

describe('Test root path', () => {
test('Give us a 200 from the privatePosts route', async() => {
    const response = await supertest(router).post('/privatePosts');
    expect(response.statusCode).toBe(201);
})
})