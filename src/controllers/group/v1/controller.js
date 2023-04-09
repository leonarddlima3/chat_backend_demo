const groupService = require('../../../services/group');
const resHandler = require('../../../helpers/responseHelper');

module.exports = {
  getGroups(request, resolve) {
    groupService.getGroups(request, resHandler.delegate(resolve));
  },
  getGroupById(request, resolve) {
    groupService.getGroupById(request, resHandler.delegate(resolve));
  },
  createGroup(request, resolve) {
    groupService.createGroup(request, resHandler.delegate(resolve));
  },
  updateGroup(request, resolve) {
    groupService.updateGroup(request, resHandler.delegate(resolve));
  },
  addGroupMember(request, resolve) {
    groupService.addGroupMember(request, resHandler.delegate(resolve));
  },
  getGroupMembersByGroupId(request, resolve) {
    groupService.getGroupMembersByGroupId(request, resHandler.delegate(resolve));
  },

};
