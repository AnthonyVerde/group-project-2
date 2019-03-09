var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function() {
      res.render("index", {});
    });
  });

  // Returns the
  app.get("/client/:username", function(req, res) {
    db.client
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(function(dbClient) {
        // console.log("===============================");
        // console.log("Username: " + dbClient.username);
        // console.log("Password: " + dbClient.password);
        // console.log("ID: " + dbClient.id);
        res.render("client", {
          client: dbClient
        });
      });
  });

  // // Load client page
  // app.get("/client", function(req, res) {
  //   res.render("client", {

  //   });
  // });

  // Load owner page
  app.get("/owner", function(req, res) {
    res.render("owner", {});
  });

  // Load admin page
  app.get("/admin", function(req, res) {
    res.render("admin", {});
  });

  // Load admin page
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
