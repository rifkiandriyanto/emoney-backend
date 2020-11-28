const Router = require('express').Router();
const register = require('../controllers/auth/register');
const activation = require('../controllers/auth/activation');
const login = require('../controllers/auth/login');
const forgotPassword = require('../controllers/auth/forgot');
const resetPassword = require('../controllers/auth/reset');

Router.post('/register', register)
  .patch('/activation', activation)
  .post('/login', login)
  .post('/forgot-password', forgotPassword)
  .patch('/reset-password', resetPassword);

module.exports = Router;
