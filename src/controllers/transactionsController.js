/* eslint-disable consistent-return */
const transactionsSchemas = require('../schemas/transactionsSchemas');
const transactionsRepositories = require('../repositories/transactionsRepositories');

async function getTransactions (req, res) {
    const userId = req.user.id;

    const transactions = await transactionsRepositories.findUserTransactions(userId);
    if (transactions.length >= 0) return res.status(200).send(transactions);

    res.status(500).send('Erro');
}

// eslint-disable-next-line consistent-return
async function postOutput (req, res) {
    const transactionsParams = req.body;
    const { item, cost, selectDate } = transactionsParams;

    const { error } = transactionsSchemas.transaction.validate(transactionsParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newOutput = await transactionsRepositories.create({
        item,
        cost,
        type: 'output',
        userId: req.user.id,
        selectDate,
    });

    res.send(newOutput);
}

async function postInput (req, res) {
    const transactionsParams = req.body;
    const { item, cost, selectDate } = transactionsParams;

    const { error } = transactionsSchemas.transaction.validate(transactionsParams);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newInput = await transactionsRepositories.create({
        item,
        cost,
        type: 'input',
        userId: req.user.id,
        selectDate,
    });

    res.send(newInput);
}

module.exports = {
    getTransactions,
    postOutput,
    postInput,
};
