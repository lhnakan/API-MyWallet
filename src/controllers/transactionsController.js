/* eslint-disable consistent-return */
const transactionsSchemas = require('../schemas/transactionsSchemas');
const transactionsRepositories = require('../repositories/transactionsRepositories');

async function getTransactions (req, res) {
    const userId = req.user.id;

    const transactions = await transactionsRepositories.findUserTransactions(userId);

    res.send(transactions);
}

async function addTransaction (req, res) {
    const transactionsParams = req.body;

    const { error } = transactionsSchemas.transaction.validate(transactionsParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const result = await transactionsRepositories.create({
        userId: req.user.id,
        ...transactionsParams,
    });

    res.status(201).send(result);
}

module.exports = {
    getTransactions,
    addTransaction,
};
