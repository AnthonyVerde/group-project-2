var db = require("../models");

module.exports = function(app) {
  // Load landing page page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function() {
      res.render("index");
    });
  });

  // Load the client page based on clientID
  app.get("/client/:id", function(req, res) {
    db.client
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClient) {
        console.log(
          "Serving page for client: " +
            dbClient.username +
            " with Id:" +
            dbClient.id
        );
        res.render("client", {
          client: dbClient
        });
      });
  });

  // Load the owner page based on ownerID
  app.get("/owner/:id", function(req, res) {
    var ownerInfo, ownerProperties;

    // First find the info of the owner
    db.owner
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbOwner) {
        // Then find all properties related to this owner
        ownerInfo = dbOwner;
        console.log(
          "Fownd owner: " + ownerInfo.username + " with Id:" + ownerInfo.id
        );
        db.property
          .findAndCountAll({
            where: {
              ownerId: ownerInfo.id
            }
          })
          .then(function(dbProperties) {
            ownerProperties = dbProperties;
            console.log(
              "Found " +
                ownerProperties.count +
                " properties for ownerId:" +
                ownerInfo.id
            );
            res.render("owner", {
              client: ownerInfo,
              properties: ownerProperties
            });
          });
      });
  });

  // Load the info page of a property based on propertyID
  app.get("/property/:id", function(req, res) {
    db.property
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbProperty) {
        console.log("Serving INFO page for property with Id:" + dbProperty.id);
        res.render("property", {
          property: dbProperty
        });
      });
  });

  // Load the EDIT page of a property based on propertyID
  app.get("/property/edit/:id", function(req, res) {
    db.property
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbProperty) {
        console.log("Serving EDIT page for property with Id:" + dbProperty.id);
        res.render("propertyedit", {
          property: dbProperty
        });
      });
  });

  // Load the EDIT page of a property based on propertyID
  app.put("/property/edit/:id", function(req, res) {
    db.property
      .update(
        {
          address1: req.body.address1,
          address2: req.body.address2,
          postalcode: req.body.postalcode,
          propertytype: req.body.propertytype,
          price_string: req.body.price_string,
          price_dec: req.body.price_dec,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          ownershiptype: req.body.ownershiptype,
          ammenities: req.body.ammenities,
          ammenitiesnearby: req.body.ammenitiesnearby,
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(function(dbProperty) {
        console.log("Serving EDIT page for property with Id:" + dbProperty.id);
        res.render("propertyedit", {
          property: dbProperty
        });
      });
  });

  

  // Load admin page
  app.get("/admin", function(req, res) {
    res.render("admin", {});
  });

  // Load search reult page
  app.get("/search", function(req, res) {
    res.render("search", {});
  });

  ///// DEMO CODE ... CAN BE DELETED /////

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  ///// END OF DEMO CODE /////

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
