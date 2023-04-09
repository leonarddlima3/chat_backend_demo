const db = require("../db/models");
const helperUtil = require('../helpers/utils');
const _ = require('lodash');

module.exports = {
    sendChatMessage: function(req, resolve) {
        const groupId = req.params.groupId;
        const chatData = _.pick(req.body, [
            'message'
        ]);
        chatData.group_id = groupId;

        db.Chat.create(chatData)
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    likeChatMessage: function(req, resolve) {
        const chatId = req.params.messageId;
        const chatLikeData = _.pick(req.body, [
            'user_id'
        ]);
        chatLikeData.chat_id = chatId;
        db.ChatLike.create(chatLikeData)
            .then((data) => {
                const filter = { _id: chatId };
                const update = { $push: { chat_likes: data._id } };

                db.Chat.findOneAndUpdate(filter, update)
                    .then(() => {
                        resolve(null, data, 200, 'success');
                    });
                
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    getChatMessagesForGroup: function(req, resolve) {
        const groupId = req.params.groupId;

        db.Chat.find({
            group_id: groupId
        })
            .populate('chat_likes')
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },

}