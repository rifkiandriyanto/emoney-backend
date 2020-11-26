const express = require('express');
const Route = express.Router();

Route.use('/auth', require('./auth'))
  .use('/transaction', require('./transaction'))
  .use('/profile', require('./profile'))
  .use('/user', require('./user'))
  .use('/transaction_type', require('./transactionType'))
  .use('/promo', require('./promo'))

  .use('/public', express.static('../../public'))
  .use('/profile', express.static('../assets/user'))
  .use('/banner', express.static('../assets/banner'));

module.exports = Route;
