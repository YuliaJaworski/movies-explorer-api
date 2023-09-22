require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const { error } = require('./middlwares/errors');
const { errorLogger, requestLogger } = require('./middlwares/logger');
const { PORT, dataMovies } = require('./config');
const router = require('./routes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001', 'https://movies-explorer-jj.nomoredomainsicu.ru/'],
  }),
);

mongoose.connect(dataMovies, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.use(router);

app.use(errorLogger); // logger
app.use(errors()); // celebrate
app.use(error); // middlewares

app.listen(PORT, () => {
  console.log(`Слушаю ${PORT} порт`);
});
