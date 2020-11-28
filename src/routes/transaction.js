const Router = require('express').Router();
const topUpController = require('../controllers/transaction/topUp');
const transferController = require('../controllers/transaction/transfer');
const historyController = require('../controllers/transaction/history');
const paymentPlnController = require('../controllers/transaction/paymentPln');

const needLogin = require('../middlewares/needLogin');

Router.post('/top-up', needLogin, topUpController)
  .post('/transfer', needLogin, transferController)
  .get('/history', needLogin, historyController)
  .post('/payment/pln', needLogin, paymentPlnController);

module.exports = Router;
