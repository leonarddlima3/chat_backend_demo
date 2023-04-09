module.exports = (Schema) => {
    const ChatLike = new Schema({
        // chat_id: String,
        user_id: String,
        chat_id: {type: Schema.Types.ObjectId, ref: 'Chat'},
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
      }, {
        capped: { size: 1024 },
        bufferCommands: false,
        autoCreate: false // disable `autoCreate` since `bufferCommands` is false
      });

      return ChatLike;
}