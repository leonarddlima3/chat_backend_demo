const routes = require('express').Router();

const authRoute = require('../controllers/auth');
const userRoute = require('../controllers/user');
const groupRoute = require('../controllers/group');
const chatRoute = require('../controllers/chat');

routes.use('/auth', authRoute);
routes.use('/user', userRoute);
routes.use('/group', groupRoute);
routes.use('/chat', chatRoute);

module.exports = routes;
