const Router = require('express').Router();
const user = require('../controllers/user/user');

const needLogin = require('../middlewares/needLogin');

Router.get('/', user.getAllUsers)
  .get('/:id', needLogin, user.getUserById)
  .delete('/:id', needLogin, user.deleteUser);

module.exports = Router;
