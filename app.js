require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routerUser = require('./routes/users');
const routerMovie = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlwares/auth');
const { error } = require('./middlwares/errors');
const { NotFoundError } = require('./errors/NotFoundError');
const { validateUser, validateLogin } = require('./middlwares/joiValidater');
const { errorLogger, requestLogger } = require('./middlwares/logger');
const { PORT, dataMovies } = require('./config');

const app = express();

mongoose.connect(dataMovies, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.use(auth);
app.use('/', routerUser);
app.use('/', routerMovie);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger); // logger
app.use(errors()); // celebrate
app.use(error); // middlewares

app.listen(PORT, () => {
  console.log('Слушаю 3000 порт');
});
