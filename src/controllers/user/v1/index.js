const routes = require('express').Router();
const controller = require('./controller');

routes.post('/register', controller.registerUser);
routes.get('/users', controller.getUsers);
routes.post('/', controller.addUser);
routes.patch('/:userId', controller.updateUser);


module.exports = routes;
