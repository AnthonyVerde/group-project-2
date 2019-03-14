var db = require("../models");
// var Op = Sequelize.Op;

module.exports = function(app) {
  /////////// Routes for SEARCH ///////////
  // app.get("/api/search/:keyword", function(req, res) {
  //   db.property
  //     .findAll({
  //       where: {
  //         address2: {
  //           $like: "%" + req.params.keyword + "%"
  //         }
  //       }
  //     })
  //     .then(function(dbClient) {
  //       // console.log("= API CALL =======================");
  //       // console.log("Username: " + dbClient.username);
  //       // console.log("Password: " + dbClient.password);
  //       console.log(dbClient);
  //       res.json(dbClient);
  //     });
  // });
  /////////// Routes for CLIENTS ///////////

  // Client login
  app.get("/api/client/:id", function(req, res) {
    db.client
      .findOne({
        where: {
          username: req.params.id
        }
      })
      .then(function(dbClient) {
        // console.log("= API CALL =======================");
        // console.log("Username: " + dbClient.username);
        // console.log("Password: " + dbClient.password);
        // console.log("ID: " + dbClient.id);
        res.json(dbClient);
      });
  });

  /////////// Routes for OWNERS ///////////

  // Owner login
  app.get("/api/owner/:id", function(req, res) {
    db.owner
      .findOne({
        where: {
          username: req.params.id
        }
      })
      .then(function(dbOwner) {
        // console.log("= API CALL =======================");
        // console.log("Username: " + dbClient.username);
        // console.log("Password: " + dbClient.password);
        // console.log("ID: " + dbClient.id);
        res.json(dbOwner);
      });
  });

  // Updating existing owner based on ownerId
  app.post("/api/owner/:id", function(req, res) {
    var ownerId = req.body.ownerId;

    db.owner
      .update(
        {
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          province: req.body.province,
          country: req.body.country
        },
        {
          where: {
            id: ownerId
          }
        }
      )
      .then(function() {
        res.json(ownerId);
      });
  });

  /////////// Routes for PROPERTIES ///////////

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
        photo: req.body.photo,
        ownerId: req.body.ownerId
      })
      .then(function(dbProperty) {
        res.json(dbProperty);
      });
  });

  // Updating existing property based on propertyId
  app.post("/api/property/:id", function(req, res) {
    var ownerId = req.body.ownerId;

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
      .then(function() {
        res.json(ownerId);
      });
  });

  // Delete existing property based on propertyId
  app.delete("/api/property/:id", function(req, res) {
    db.property
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.json(data);
      });
  });

  // Delete existing property based on propertyId
  app.delete("/api/owner/:id", function(req, res) {
    db.owner
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.json(data);
      });
  });
};
