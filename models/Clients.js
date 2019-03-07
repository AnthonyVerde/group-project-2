module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Client.associate = function(models) {
    Client.hasMany(models.Favorites, {
      onDelete: "cascade"
    });
  };

  return Client;
};
