const routerUser = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateInfo } = require('../middlwares/joiValidater');

routerUser.get('/users/me', getUser);
routerUser.patch('/users/me', validateUpdateInfo, updateUser);

module.exports = routerUser;
