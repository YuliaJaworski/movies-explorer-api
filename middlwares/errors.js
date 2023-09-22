const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const TokenError = require('../errors/TokenError');

const error = (err, req, res, next) => {
  let trueError;

  if (err instanceof TokenError) {
    trueError = err;
  } else if (err instanceof ForbiddenError) {
    trueError = err;
  } else if (err instanceof NotFoundError) {
    trueError = err;
  } else if (err.name === 'CastError') {
    trueError = new BadRequestError('Переданы некорректные данные');
  } else if (err.name === 'ValidationError') {
    trueError = new BadRequestError('Переданы некорректные данные');
    console.log(err);
  } else if (err.name === 'JsonWebTokenError') {
    trueError = new TokenError('Неверный токен');
  } else if (err.code === 11000) {
    trueError = new ConflictError('Пользователь с такой почтой уже существует.');
  } else {
    trueError = new ServerError('Ошибка сервера.');
    console.log(err);
  }

  res.status(trueError.statusCode).send({ message: trueError.message });
  next();
};

module.exports = {
  error,
};
