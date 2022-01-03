const express = require('express');
const Route = express.Router();

Route.use('/auth', require('./auth'))
  .use('/transaction', require('./transaction'))
  .use('/profile', require('./profile'))
  .use('/user', require('./user'))
  .use('/transaction_type', require('./transactionType'))
  .use('/promo', require('./promo'));

module.exports = Route;
