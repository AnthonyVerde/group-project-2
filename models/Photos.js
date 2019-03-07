module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.Property, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Photo;
};
