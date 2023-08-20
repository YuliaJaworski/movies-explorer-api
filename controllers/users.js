const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, TokenError } = require('../middlwares/errors');

// возвращает информацию о пользователе
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// изменяет информацию о пользователе
const updateUser = (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(req.user._id, { name }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// создать пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(String(password), 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => res.status(201).send(user))
        .catch(next);
    })
    .catch(next);
};

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new TokenError('Пользователь не найден.'))
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((validUser) => {
        if (validUser) {
          const token = jsonwebtoken.sign(
            { _id: user._id },
            'SECRET',
            { expiresIn: '7d' },
          );
          res.send({ data: user.toJSON(), token });
        } else {
          next(new TokenError('Неправильная почта или пароль.'));
        }
      });
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
