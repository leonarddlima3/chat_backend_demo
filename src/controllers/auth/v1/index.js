const routes = require('express').Router();
const controller = require('./controller');

routes.post('/login', controller.loginUser);
routes.post('/logout', controller.logoutUser);


module.exports = routes;
