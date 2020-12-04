const database = require('../utils/database');

async function findUserTransactions(id) {
    try {
        const result = await database.query('SELECT * FROM transactions WHERE "userId" = $1 ORDER BY year DESC, month DESC, date DESC, id DESC', [id]);
        return result.rows;
    } catch(err) {
        return err;
    }
}

async function create(transaction) {
    const { selectDate } = transaction;
    const date = parseInt(selectDate[8]+selectDate[9]);
    const month = parseInt(selectDate[5]+selectDate[6]);
    const year = parseInt('20'+selectDate[2]+selectDate[3]);
    
    try {
        const result = await database.query('INSERT INTO transactions (item, cost, type, "userId", date, month, year) VALUES ($1, $2,$3, $4, $5, $6, $7) RETURNING *', [transaction.item, transaction.cost, transaction.type, transaction.userId, date, month, year]);
        
        return result.rows[0];
    } catch(err) {
        return err;
    }
}


module.exports = {
    findUserTransactions, 
    create
}