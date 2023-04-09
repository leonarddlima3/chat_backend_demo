module.exports = (sequelize, Sequelize) => {

    const Group = sequelize.define("groups", {
      group_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      group_name: {
        type: Sequelize.STRING,
        allowNull: false
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
  
    return Group;
  };