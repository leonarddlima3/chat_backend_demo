const _ = require('lodash');

module.exports = {

  getUniqueId() {
    return Date.now().toString(36) + ("000" + ((Math.random() * 46656) | 0).toString(36)).slice(-3);
  },

};
