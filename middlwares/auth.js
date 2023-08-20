const jsonwebtoken = require('jsonwebtoken');
const { TokenError } = require('./errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new TokenError('Необходимо авторизоваться.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      'SECRET',
    );
  } catch (e) {
    next(new TokenError('необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
