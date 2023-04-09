module.exports = (sequelize, Sequelize) => {

    const GroupMember = sequelize.define("group_members", {
      gm_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Group',
          key: 'group_id'
        }
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id'
        }
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
  
    return GroupMember;
  };