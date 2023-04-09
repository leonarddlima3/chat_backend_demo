const chatService = require('../../../services/chat');
const resHandler = require('../../../helpers/responseHelper');

module.exports = {
  sendChatMessage(request, resolve) {
    chatService.sendChatMessage(request, resHandler.delegate(resolve));
  },
  likeChatMessage(request, resolve) {
    chatService.likeChatMessage(request, resHandler.delegate(resolve));
  },
  getChatMessagesForGroup(request, resolve) {
    chatService.getChatMessagesForGroup(request, resHandler.delegate(resolve));
  },

};
