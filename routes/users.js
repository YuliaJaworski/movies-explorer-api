const routerUser = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

routerUser.get('/users/me', getUser);
routerUser.patch('/users/me', updateUser);

module.exports = routerUser;
