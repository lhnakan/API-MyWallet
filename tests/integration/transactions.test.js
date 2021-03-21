/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../src/app');
const db = require('../../src/utils/database');

async function cleanDatabase () {
    await db.query('DELETE FROM transactions');
}

beforeAll(async () => {
    await cleanDatabase;
    const body = {
        username: 'TesteFinaldeVerdade',
        email: 'ultimoteste@email.com',
        password: '1234',
        passwordConfirmation: '1234',
    };

    await supertest(app).post('/api/users/sign-up').send(body);
});

afterAll(async () => {
    await cleanDatabase();
    db.end();
});

async function createToken () {
    const body = {
        email: 'ultimoteste@email.com',
        password: '1234',
    };
    const response = await supertest(app).post('/api/users/sign-in').send(body);

    return response.body.token;
}

describe('POST /api/transactions/output', () => {
    let token;
    beforeAll(async () => {
        token = await createToken();
    });

    it('should return status 200 on success', async () => {
        const body = {
            item: 'ouro',
            cost: '40',
            selectDate: '2020-12-04',
        };
        const response = await supertest(app).post('/api/transactions/output').set({ Authorization: `Bearer ${token}` }).send(body);

        expect(response.status).toBe(200);
    });
});

describe('POST /api/transactions/input', () => {
    let token;
    beforeAll(async () => {
        token = await createToken();
    });

    it('should return status 200 on success', async () => {
        const body = {
            item: 'ouro',
            cost: '40',
            selectDate: '2020-12-04',
        };
        const response = await supertest(app).post('/api/transactions/input').set({ Authorization: `Bearer ${token}` }).send(body);

        expect(response.status).toBe(200);
    });
});

describe('GET /api/transactions', () => {
    let token;
    beforeAll(async () => {
        token = await createToken();
    });

    it('should return status 200 on success', async () => {
        const response = await supertest(app).get('/api/transactions').set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
    });
});
