var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function() {
      res.render("index", {});
    });
  });

  // Returns the client page based on clientID
  app.get("/client/:id", function(req, res) {
    console.log("HTML route: req.params.id = " + req.params.id);
    console.log(req.params);
    console.log("= HTML CALL ======================");
    db.client
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbClient) {
        res.render("client", {
          client: dbClient
        });
      });
  });

  // Returns the owner page based on ownerID
  app.get("/owner/:id", function(req, res) {
    console.log("HTML route: req.params.id = " + req.params.id);
    console.log(req.params);
    console.log("= HTML CALL ======================");
    db.owner
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbOwner) {
        res.render("owner", {
          client: dbOwner
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
