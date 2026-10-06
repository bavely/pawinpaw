module.exports = function (sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    request: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      len: [1]
    },
    response: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      len: [1]
    },
    matchdate: {
      type: DataTypes.DATE,
      allowNull: true,
      len: [1]
    }
  });

  Match.associate = function (models) {
    Match.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Match;
};
