class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class TokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

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
  NotFoundError,
  TokenError,
  ForbiddenError,
  error,
};
