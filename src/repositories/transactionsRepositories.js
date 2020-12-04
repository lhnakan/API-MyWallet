const database = require('../utils/database');

async function findUserTransactions(id) {
    try {
        const result = await database.query('SELECT * FROM transactions WHERE "userId" = $1 ORDER BY id DESC', [id]);
        return result.rows;
    } catch(err) {
        return err;
    }
}

async function create(transaction) {
    try {
        const result = await database.query('INSERT INTO transactions (item, cost, type, "userId") VALUES ($1, $2,$3, $4) RETURNING *', [transaction.item, transaction.cost, transaction.type, transaction.userId]);

        return result.rows[0];
    } catch(err) {
        return err;
    }
}


module.exports = {
    findUserTransactions, 
    create
}