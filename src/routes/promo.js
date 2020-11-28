const Router = require('express').Router();
const promo = require('../controllers/promo/promo');

const needLogin = require('../middlewares/needLogin');

Router.get('/', needLogin, promo.getAllPromos)
  .post('/', needLogin, promo.createPromo)
  .patch('/:id', needLogin, promo.updatePromo)
  .delete('/:id', needLogin, promo.deletePromo);

module.exports = Router;
