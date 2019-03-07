module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clientID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Favorites.associate = function(models) {
    Favorites.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
    Favorites.hasMany(models.Property, {
      onDelete: "cascade"
    });
  };

  return Favorites;
};
