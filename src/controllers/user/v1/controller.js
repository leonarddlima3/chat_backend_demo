const userService = require('../../../services/user');
const resHandler = require('../../../helpers/responseHelper');

module.exports = {
  getUsers(request, res) {
    userService.getUsers(request, resHandler.delegate(res));
  },
  addUser(request, res) {
    userService.addUser(request, resHandler.delegate(res));
  },
  updateUser(request, res) {
    userService.updateUser(request, resHandler.delegate(res));
  },

};
