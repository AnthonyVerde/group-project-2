var db = require("../models");

module.exports = function (app) {
  // Owner login
  app.get("/api/client/:username", function (req, res) {
    db.client
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(function (dbClient) {
        console.log("= API CALL =======================");
        console.log("Username: " + dbClient.username);
        console.log("Password: " + dbClient.password);
        console.log("ID: " + dbClient.id);
        res.json(dbClient);
      });
  });

  // Adding a new property
  app.post("/api/property", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.property
      .create({
        info: req.body.info,
        address1: req.body.address1,
        address2: req.body.address2,
        postalcode: req.body.postalcode,
        propertype: req.body.propertype,
        price_string: req.body.price_string,
        price_dec: req.body.price_dec,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        ownershiptype: req.body.ownershiptype,
        ammenities: req.body.ammenities,
        ammenitiesnearby: req.body.ammenitiesnearby,
        photo: req.body.photo
      })
      .then(function(dbProperty) {
        res.json(dbProperty);
      });
  });

  // PUT route for updating a property. We can get the updated PROPERTY data from req.body
  app.post("/api/property/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.property
      .update(
        {
          info: req.body.info,
          address1: req.body.address1,
          address2: req.body.address2,
          postalcode: req.body.postalcode,
          propertype: req.body.propertype,
          price_string: req.body.price_string,
          price_dec: req.body.price_dec,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          ownershiptype: req.body.ownershiptype,
          ammenities: req.body.ammenities,
          ammenitiesnearby: req.body.ammenitiesnearby,
          photo: req.body.photo
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbProperty) {
        res.json(dbProperty);
      });
  });

  ///// DEMO CODE ... CAN BE DELETED /////

  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  ///// END OF DEMO CODE /////
};