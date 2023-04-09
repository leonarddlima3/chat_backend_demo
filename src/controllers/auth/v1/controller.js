const authService = require('../../../services/auth');
const resHandler = require('../../../helpers/responseHelper');

module.exports = {
  loginUser(request, res) {
    authService.loginUser(request, resHandler.delegate(res));
  },
  logoutUser(request, res) {
    authService.logoutUser(request, resHandler.delegate(res));
  },

};
