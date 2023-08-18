const jsonwebtoken = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Error('Необходимо авторизоваться.'));
    return;
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(
      token,
      'SECRET',
    );
  } catch (e) {
    next(new Error('необходима авторизация'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
