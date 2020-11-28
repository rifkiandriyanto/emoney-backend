const Router = require('express').Router();
const getAllTransactionTypeController = require('../controllers/transactionType/getAll');

Router.get('/', getAllTransactionTypeController);

module.exports = Router;
