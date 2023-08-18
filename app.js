const express = require('express');
const mongoose = require('mongoose');

const routerUser = require('./routes/users');
const routerMovie = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlwares/auth');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', routerUser);
app.use('/', routerMovie);

app.listen(3000, () => {
  console.log('Слушаю 3000 порт');
});
