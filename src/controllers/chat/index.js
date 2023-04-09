const routes = require('express').Router();
const v1 = require('./v1');
const auth = require('../../helpers/auth-middleware');

routes.use('/v1', auth, v1);

module.exports = routes;