const routes = require('express').Router();
const controller = require('./controller');

routes.post('/:groupId', controller.sendChatMessage);
routes.post('/:messageId/like', controller.likeChatMessage);
routes.get('/:groupId', controller.getChatMessagesForGroup);

module.exports = routes;
