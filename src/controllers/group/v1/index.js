const routes = require('express').Router();
const controller = require('./controller');

routes.get('/', controller.getGroups);
routes.get('/:groupId', controller.getGroupById);
routes.post('/', controller.createGroup);
routes.patch('/:groupId', controller.updateGroup);
routes.post('/:groupId/member', controller.addGroupMember);
routes.get('/:groupId/member', controller.getGroupMembersByGroupId);

module.exports = routes;
