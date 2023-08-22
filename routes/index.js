const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlwares/auth');
const { validateLogin, validateUser } = require('../middlwares/joiValidater');
const routerMovie = require('./movies');
const routerUser = require('./users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);
router.use(auth);
router.use('/', routerUser);
router.use('/', routerMovie);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
