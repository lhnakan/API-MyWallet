require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const usersController = require('./controllers/usersController');
const transactionsController = require('./controllers/transactionsController');

const authMiddleware = require('./middlewares/authMiddlewares');

app.use(cors());
app.use(express.json());

app.post('/api/users/sign-in', usersController.postSignIn);
app.post('/api/users/sign-up', usersController.postSignUp);
app.post('/api/users/sign-out', authMiddleware, usersController.postSignOut);

app.get('/api/transactions', authMiddleware, transactionsController.getTransactions);
app.post('/api/transactions', authMiddleware, transactionsController.addTransaction);

module.exports = app;
