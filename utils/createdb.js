var realtor = require('realtorca');
var faker = require('faker');
console.log(faker.name.firstName());


var createdb = function() {
  var locations = [
    {
      city: "Toronto",
      province: "Ontario",
      latitude: 43.6532,
      longitude: 79.3832
    },
    {
      city: "Mississauga",
      province: "Ontario",
      latitude: 43.5890,
      longitude: 79.6441
    },
    {
      city: "London",
      province: "Ontario",
      latitude: 42.9849,
      longitude: 81.2453
    },
    {
      city: "Calgary",
      province: "Alberta",
      latitude: 51.0486,
      longitude: 114.0708
    },
    {
      city: "Vancouver",
      province: "British Columbia",
      latitude: 49.2827,
      longitude: 123.1207
    },
    {
      city: "Montreal",
      province: "Quebec",
      latitude: 45.5017,
      longitude: 73.5673
    }
  ]

  for (j in locations) {
    let opts = {
      LongitudeMin: locations[j].longtitude - 0.035,
      LongitudeMax: locations[j].longtitude + 0.035,
      LatitudeMin: locations[j].latitude - 0.035,
      LatitudeMax: locations[j].latitude + 0.035,
      PriceMin: 100000,
      PriceMax: 1000000,
      RecordsPerPage: 50
    };
    realtor.post(opts)
      .then((data) => {
        //json response
        for (i in data.Results) {
          console.log(i);
          // var property = {
          //   // ownerid:
          //   info: data.Results[i].PublicRemarks.replace(/'/gi, "*"),
          //   address1: data.Results[i].Property.Address.AddressText.split("|")[0],
          //   address2: data.Results[i].Property.Address.AddressText.split("|")[1],
          //   postalcode: data.Results[i].PostalCode,
          //   propertytype: data.Results[i].Building.Type,
          //   price_string: data.Results[i].Property.Price,
          //   price_dec: 0,
          //   bedrooms: data.Results[i].Building.Bedrooms,
          //   bathrooms: data.Results[i].Building.BathroomTotal,
          //   ownershiptype: data.Results[i].Property.OwnershipType,
          //   ammenities: data.Results[i].Building.Ammenities,
          //   ammenitiesnearby: data.Results[i].Property.AmmenitiesNearBy
          // };
          // var owner = {
          //   firstName: faker.name.firstName(),
          //   lastName: faker.name.lastName(),
          //   email: faker.name.email(),
          //   phone: faker.phone.phoneNumber(),
          //   address1: faker.address.secondaryAddress(),
          //   address2: faker.address.streetAddress(),
          //   city: locations[j].city,
          //   province: locations[j].province,
          //   country: "Canada"
          // };
          // owner.username = owner.firstName + owner.lastName;

          // db.Owner.create(owner).then(function (newowner) {
          //   property.ownerid = newowner.id;
          //   db.Property.create(property).then(function (newproperty) {

          //     for (k in data.Results[i].Property.Photo.length) {
          //       var photo = {
          //         url: data.Results[i].Property.Photo[k].Highres
          //       };
          //       photo.propertyId = newproperty.id;
          //       db.Photo.create(photo).then(function (newphoto) {

          //       });
          //     }
          //   });

          // });
        }


      })
  }
}

  // .catch(err) => {

  // };

  // fs.appendFile("seeds.sql", "INSERT INTO properties (description, address, postalcode, type, price, bedrooms, bathrooms, ownershiptype, amenities, photo, amenitiesnearby) VALUES ("Samsung 4K UHD TV", "TV", 799.99, 25);", function(err) {


  //   if (err) {
  //     return console.log(err);
  //   }

  //   // console.log("\nYour log was updated!\n");

  // });