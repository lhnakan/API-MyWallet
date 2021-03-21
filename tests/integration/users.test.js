/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../src/app');
const db = require('../../src/utils/database');

async function cleanDatabase () {
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM sessions');
}

beforeAll(cleanDatabase);

afterAll(async () => {
    await cleanDatabase();
    db.end();
});

describe('POST /api/users/sign-up', () => {
    it('should return status 422 error on schemas', async () => {
        const body = {
            username: 'TesteFinaldeVerdade',
            email: 'ultimotesteemail.com',
            password: '1234',
            passwordConfirmation: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(422);
    });
    it('should return status 201 on success signUp', async () => {
        const body = {
            username: 'TesteFinaldeVerdade',
            email: 'ultimoteste@email.com',
            password: '1234',
            passwordConfirmation: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.body.password).toEqual(response.body.passwordConfirmation);

        expect(response.status).toBe(201);
    });
    it('should return status 409 Email is alredy in use', async () => {
        const body = {
            username: 'TesteFinaldeVerdade',
            email: 'ultimoteste@email.com',
            password: '1234',
            passwordConfirmation: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(409);
    });
});

describe('POST /api/users/sign-in', () => {
    it('should return status 422 error on schemas', async () => {
        const body = {
            email: 'ultimotesteemail.com',
            password: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-up').send(body);

        expect(response.status).toBe(422);
    });
    it('should return status 200 on success signIn', async () => {
        const body = {
            email: 'ultimoteste@email.com',
            password: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-in').send(body);
        expect(response.status).toBe(200);
    });
    it('should return status 401 wrong email', async () => {
        const body = {
            email: 'naosalvo@email.com',
            password: '1234',
        };

        const response = await supertest(app).post('/api/users/sign-in').send(body);

        expect(response.status).toBe(401);
    });
    it('should return status 401 wrong password', async () => {
        const body = {
            email: 'ultimoteste@email.com',
            password: 'abacaxi',
        };

        const response = await supertest(app).post('/api/users/sign-in').send(body);

        expect(response.status).toBe(401);
    });
});

describe('POST /api/users/sign-out', () => {
    let token = '';
    beforeAll(async () => {
        const body = {
            email: 'ultimoteste@email.com',
            password: '1234',
        };
        const response = await supertest(app).post('/api/users/sign-in').send(body);
        token = response.body.token;
    });

    it('should return status 200 on success signOut', async () => {
        const body = null;
        const response = await supertest(app).post('/api/users/sign-out').set({ Authorization: `Bearer ${token}` }).send(body);

        expect(response.status).toBe(200);
    });
    it('should return status 401 on invalid token', async () => {
        const body = null;
        const response = await supertest(app).post('/api/users/sign-out').set({ Authorization: 'Bearer 123invalido321' }).send(body);

        expect(response.status).toBe(401);
    });
});
