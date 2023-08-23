const ErrorUnauthorized = require('../errors/error-unauthorized');
const { checkToken } = require('../utils/token');

const auth = (req, _res, next) => {
  if (!req.cookies) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  const result = checkToken(token);
  if (!result) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }
  req.user = result;

  return next();
};

module.exports = { auth };
