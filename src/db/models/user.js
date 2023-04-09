const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;
const dbConfig = require("../config");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_no: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING
    },
    is_admin: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    },
    created_at: {
      type: 'DATETIME',
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: 'DATETIME',
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  User.beforeCreate(async (user) => {
    try {
      const genSalt = await bcrypt.genSalt(salt);
      const genHash = await bcrypt.hash(user.password, genSalt);
      user.password = genHash;
      return user;
    } catch(err) {
      console.log(err);
    } 
  })

  User.comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  User.generateToken = async (user) => {
    const token=jwt.sign(user.user_id,dbConfig.SECRET);
    return token;
  }

  User.findByToken = async (token, user) => {
    if (!token) {
      return;
    }
    const decode = await jwt.verify(token, dbConfig.SECRET);
    return user.findOne({
      where: {
        user_id: decode,
        token: token
      }
    });
  };

  User.deleteToken = (token, user) => {
    return user.update({ token: null }, {
      where: {
        token: token
      }
    });
  }

  return User;
};