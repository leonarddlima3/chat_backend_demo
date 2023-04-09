const dbConfig = require("../config");
const mongoose = require('mongoose');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MySQL models
db.User = require("./user")(sequelize, Sequelize);
db.Group = require("./group")(sequelize, Sequelize);
db.GroupMember = require("./group-members")(sequelize, Sequelize);

mongoose.connect(
  dbConfig.MONGO_DB,
  { keepAlive: true, useNewUrlParser: true }
)
  .then(() => {
    console.log("Mongo db Connected");
  })
  .catch((err) => {
    // Catch any potential error
    console.log("Unable to connect to MongoDB. Error: " + err);
  });

// MongoDB models
db.Chat = mongoose.model('Chat', require("./chat")(mongoose.Schema));
db.ChatLike = mongoose.model('ChatLike', require("./chat-likes")(mongoose.Schema));

module.exports = db;