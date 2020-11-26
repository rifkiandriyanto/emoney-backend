const response = require('../utils/response');
const jsonWebToken = require('jsonwebtoken');
const { jwt_key } = require('../configs');

module.exports = (req, res, next) => {
  try {
    let authorization = req
      .header('Authorization')
      .replace(/Bearer|bearer/g, '')
      .trim();
    const me = jsonWebToken.verify(
      authorization || req.query._token || req.body._token,
      jwt_key
    );
    req.me = me;
    next();
  } catch (e) {
    res.status(403).send(response(false, 'This action need token', req.body));
  }
};
