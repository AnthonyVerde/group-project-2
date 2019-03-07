module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  return Client;
};
