const database = require('../utils/database');
const { v4: uuidv4 } = require("uuid");

async function createByUserId(userId) {
    const session = await database.query('SELECT * FROM sessions WHERE "userId" = $1', [userId]);

    if(session.rows[0]) {
        return session.rows[0];
    } else {
        const token = uuidv4();
        try {
            const result = await database.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING *`, [userId, token])    

            return result.rows[0];
        } catch(err) {
            return err.detail;
        }     
    }
}

module.exports = {
    createByUserId
};