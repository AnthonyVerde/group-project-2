var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load client page
  app.get("/client", function (req, res) {
    res.render("client", {});
  });

  // Load owner page
  app.get("/owner", function (req, res) {
    res.render("owner", {});
  });

  // Load admin page
  app.get("/admin", function (req, res) {
    res.render("admin", {});
  });

  // Load admin page
  app.get("/search", function (req, res) {
    res.render("search", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};