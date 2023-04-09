
module.exports = (Schema) => {
    const Chat = new Schema({
        group_id: String,
        message: String,
        chat_likes:[
          {type: Schema.Types.ObjectId, ref: 'ChatLike'}
        ],
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
      }, {
        capped: { size: 1024 },
        bufferCommands: false,
        autoCreate: false, // disable `autoCreate` since `bufferCommands` is false
      });

      return Chat;
}