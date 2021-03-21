const bcrypt = require('bcrypt');
const database = require('../utils/database');

async function checkEmailUnique ({ email }) {
    try {
        const userEmail = await database.query('SELECT * FROM users WHERE email = $1', [email]);

        return userEmail.rows[0];
    } catch (err) {
        return err;
    }
}

async function createNewUser ({ email, password, username }) {
    const cryptPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        email,
        password: cryptPassword,
        username,
    };
    try {
        await database.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, cryptPassword]);
        return newUser;
    } catch (err) {
        return err;
    }
}

async function checkEmailPassword ({ email, password }) {
    try {
        const user = await database.query('SELECT * FROM users WHERE email = $1', [email]);
        if (!user.rows[0]) {
            return '';
        }
        if (!bcrypt.compareSync(password, user.rows[0].password)) return '';

        return user.rows[0];
    } catch (err) {
        return err;
    }
}

async function findById (id) {
    try {
        const user = await database.query('SELECT * FROM users WHERE id = $1', [id]);
        return user.rows[0];
    } catch (err) {
        return err;
    }
}

function getUserData (user, token) {
    const { id, email, username } = user;

    return {
        id,
        email,
        username,
        token,
    };
}

module.exports = {
    checkEmailUnique,
    createNewUser,
    checkEmailPassword,
    getUserData,
    findById,
};
