var db = require("../models");
var realtor = require('realtorca');
var faker = require('faker');

module.exports = function(app) {
  // Get all examples
  createdb();
// test();

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
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};


var test = function(){
  var location = {
      city: "Toronto",
      province: "Ontario",
      latitude: 43.6532,
      longitude: -79.3832
    }
  let opts = {
    LongitudeMin: location.longitude - 0.035,
    LongitudeMax: location.longitude + 0.035,
    LatitudeMin: location.latitude - 0.035,
    LatitudeMax: location.latitude + 0.035,
    PriceMin: 100000,
    PriceMax: 1000000,
    RecordsPerPage: 2
  };
  realtor.post(opts)
      .then((data) => {
        console.log(data.Results.length)
        for (i in data.Results){
          console.log(data.Results[i]);
        }
      })
}

var j = 0;
var createdb = function() {
  console.log("Im getting here")
  var locations = [
    {
      city: "Toronto",
      province: "Ontario",
      latitude: 43.6532,
      longitude: -79.3832
    },
    {
      city: "Mississauga",
      province: "Ontario",
      latitude: 43.5890,
      longitude: -79.6441
    },
    {
      city: "London",
      province: "Ontario",
      latitude: 42.9849,
      longitude: -81.2453
    },
    {
      city: "Calgary",
      province: "Alberta",
      latitude: 51.0486,
      longitude: -114.0708
    },
    {
      city: "Vancouver",
      province: "British Columbia",
      latitude: 49.2827,
      longitude: -123.1207
    },
    {
      city: "Montreal",
      province: "Quebec",
      latitude: 45.5017,
      longitude: -73.5673
    }
  ]



  for (j in locations) {
    let opts = {
      LongitudeMin: locations[j].longitude - 0.035,
      LongitudeMax: locations[j].longitude + 0.035,
      LatitudeMin: locations[j].latitude - 0.035,
      LatitudeMax: locations[j].latitude + 0.035,
      PriceMin: 100000,
      PriceMax: 1000000,
      RecordsPerPage: 3
    };
    realtor.post(opts)
      .then((data) => {

        //json response
        for (i in data.Results) {
          console.log(data.Results[i].Property.Photo)
          
          // console.log(data.Results[i].Property.Address.AddressText);
          var property = {
            // ownerid:
            info: data.Results[i].PublicRemarks.replace(/'/gi, "*"),
            address1: data.Results[i].Property.Address.AddressText.split("|")[0],
            address2: data.Results[i].Property.Address.AddressText.split("|")[1],
            postalcode: data.Results[i].PostalCode,
            propertytype: data.Results[i].Building.Type,
            price_string: data.Results[i].Property.Price,
            price_dec: 0,
            bedrooms: data.Results[i].Building.Bedrooms,
            bathrooms: data.Results[i].Building.BathroomTotal,
            ownershiptype: data.Results[i].Property.OwnershipType,
            ammenities: data.Results[i].Building.Ammenities,
            ammenitiesnearby: data.Results[i].Property.AmmenitiesNearBy,
            ownerId: (Math.floor(Math.random() * 10) + 1),
            photo: data.Results[i].Property.Photo[0].HighResPath
          };
          var owner = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address1: faker.address.secondaryAddress(),
            address2: faker.address.streetAddress(),
            city: locations[j].city,
            province: locations[j].province,
            country: "Canada"
          };
          owner.username = owner.firstName + owner.lastName;
          // console.log(property);
          db.owner.create(owner).then(function (newowner) {
            property.ownerId = newowner.id;
            // db.property.create(property).then(function (newproperty) {}) ;
            
          })
          db.property.create(property).then(function (newproperty) {}) ;
          //   });
          // });
        }


      })
  }
}

  // .catch(err) => {

  // };
