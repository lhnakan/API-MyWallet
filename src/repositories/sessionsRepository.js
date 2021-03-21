const { v4: uuidv4 } = require('uuid');
const database = require('../utils/database');

async function createByUserId (id) {
    const session = await database.query('SELECT * FROM sessions WHERE "userId" = $1', [id]);

    if (session.rows[0]) {
        await database.query('DELETE FROM sessions WHERE "userId" = $1', [id]);
    }

    const token = uuidv4();
    try {
        const result = await database.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING *', [id, token]);
        return result.rows[0];
    } catch (err) {
        return err.detail;
    }
}

async function findByToken (token) {
    try {
        const session = await database.query('SELECT * FROM sessions WHERE token = $1', [token]);
        return session.rows[0];
    } catch (err) {
        return err.detail;
    }
}

async function deleteSession (id) {
    try {
        await database.query('DELETE FROM sessions WHERE "userId" = $1', [id]);
        return 200;
    } catch {
        return 500;
    }
}

module.exports = {
    createByUserId,
    findByToken,
    deleteSession,
};
