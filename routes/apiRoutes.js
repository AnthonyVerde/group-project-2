var db = require("../models");

module.exports = function(app) {
  // Owner login
  app.get("api/client/:username", function(req, res) {
    db.client
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(function(dbClient) {
        console.log("===============================");
        // console.log("Username: " + dbClient.username);
        // console.log("Password: " + dbClient.password);
        // console.log("ID: " + dbClient.id);
        // res.json(dbClient);
      });
  });

  ///// DEMO CODE ... CAN BE DELETED /////

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  ///// END OF DEMO CODE /////
};
