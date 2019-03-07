module.exports = function(sequelize, DataTypes) {
  var Property = sequelize.define("Property", {
    ownerid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_string: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_dec: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.STRING
    },
    bathrooms: {
      type: DataTypes.STRING
    },
    ownershiptype: {
      type: DataTypes.STRING
    },
    ammenities: {
      type: DataTypes.STRING
    },
    ammenitiesnearby: {
      type: DataTypes.STRING
    }
  });

  Property.associate = function(models) {
    Property.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
    Property.hasMany(models.Photo, {
      onDelete: "cascade"
    });
  };

  return Property;
};
