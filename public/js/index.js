// Get references to page elements
var $clientLogin = $("#btnClientLogin");
var $updateClient = $("#updateClient");

var $ownerLogin = $("#btnOwnerLogin");
var $updateOwner = $("#updateOwner");

var $updateProperty = $("#updateProperty");
var $addProperty = $("#addProperty");
var $deleteProperty = $(".deleteProperty");

// The API object contains methods for each kind of request we'll make
var API = {
  // Get a client info
  getClient: function(client) {
    return $.ajax({
      url: "api/client/" + client.username,
      type: "GET"
    }).then(function(data) {
      return data;
    });
  },

  // Update a client
  updateClient: function(editedInfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../api/client/" + editedInfo.clientId,
      data: JSON.stringify(editedInfo)
    }).then(function(data) {
      window.location.href = "/client/" + data;
    });
  },

  // Get an owner info
  getOwner: function(owner) {
    return $.ajax({
      url: "api/owner/" + owner.username,
      type: "GET"
    }).then(function(data) {
      return data;
    });
  },

  // Update an owner
  updateOwner: function(editedInfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../api/owner/" + editedInfo.ownerId,
      data: JSON.stringify(editedInfo)
    }).then(function(data) {
      window.location.href = "/owner/" + data;
    });
  },

  // Create a NEW property
  newProperty: function(newPropertyInfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../../api/property",
      data: JSON.stringify(newPropertyInfo)
    }).then(function() {
      window.location.href = "/owner/" + newPropertyInfo.ownerId;
    });
  },

  // Update a property
  updateProperty: function(editedInfo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../api/property/" + editedInfo.propertyId,
      data: JSON.stringify(editedInfo)
    }).then(function(data) {
      window.location.href = "/owner/" + data;
    });
  },

  // Delete a property
  deleteProperty: function(propertyId, ownerId) {
    return $.ajax({
      url: "../../api/property/" + propertyId,
      type: "DELETE"
    }).then(function() {
      window.location.href = "/owner/" + ownerId;
    });
  }
};

//////// Functions for PROPERTIES ////////

// Function called when adding a property
var handleAddProperty = function(event) {
  event.preventDefault();

  // Gathering all elements to create a new item
  var newPropertyInfo = {
    ownerId: $("#idtag").data("tag"),
    info: $("#propInputInfo").val().trim(),
    address1: $("#propInputAddress1").val().trim(),
    address2: $("#propInputAddress2").val().trim(),
    postalcode: $("#propInputPostalCode").val().trim(),
    propertype: $("#propInputProperType").val().trim(),
    price_string: $("#propInputPrice_string").val().trim(),
    price_dec: $("#propInputPrice_dec").val().trim(),
    bedrooms: $("#propInputBedrooms").val().trim(),
    bathrooms: $("#propInputBathrooms").val().trim(),
    ownershiptype: $("#propInputOwnershipType").val().trim(),
    ammenities: $("#propInputAmmenities").val().trim(),
    ammenitiesnearby: $("#propInputAmmenitiesNearby").val().trim(),
    photo: $("#propInputPhoto").val().trim(),
  };

  // Call the funtion to create a new item and pass the new info
  API.newProperty(newPropertyInfo);
};

// Function called when updating a property
var handleUpdateProperty = function(event) {
  event.preventDefault();

  // Gathering all elements to update the registry with
  var editedInfo = {
    propertyId: $("#propertyTag").data("tag"),
    ownerId: $("#ownerTag").data("tag"),
    info: $("#propInputInfo").val().trim(),
    address1: $("#propInputAddress1").val().trim(),
    address2: $("#propInputAddress2").val().trim(),
    postalcode: $("#propInputPostalCode").val().trim(),
    propertype: $("#propInputProperType").val().trim(),
    price_string: $("#propInputPrice_string").val().trim(),
    price_dec: $("#propInputPrice_dec").val().trim(),
    bedrooms: $("#propInputBedrooms").val().trim(),
    bathrooms: $("#propInputBathrooms").val().trim(),
    ownershiptype: $("#propInputOwnershipType").val().trim(),
    ammenities: $("#propInputAmmenities").val().trim(),
    ammenitiesnearby: $("#propInputAmmenitiesNearby").val().trim(),
    photo: $("#propInputPhoto").val().trim(),
  };

  // Call the update funtion and pass the updated propertyinfo
  API.updateProperty(editedInfo);
};

// // Function called when updating a property
// var handleAddProperty = function(event) {
//   event.preventDefault();

//   var newPropertyInfo = {
//     ownerId: $("#idtag").data("tag"),
//     info: $("#propInputInfo").val().trim(),
//     address1: $("#propInputAddress1").val().trim(),
//     address2: $("#propInputAddress2").val().trim(),
//     postalcode: $("#propInputPostalCode").val().trim(),
//     propertype: $("#propInputProperType").val().trim(),
//     price_string: $("#propInputPrice_string").val().trim(),
//     price_dec: $("#propInputPrice_dec").val().trim(),
//     bedrooms: $("#propInputBedrooms").val().trim(),
//     bathrooms: $("#propInputBathrooms").val().trim(),
//     ownershiptype: $("#propInputOwnershipType").val().trim(),
//     ammenities: $("#propInputAmmenities").val().trim(),
//     ammenitiesnearby: $("#propInputAmmenitiesNearby").val().trim(),
//     photo: $("#propInputPhoto").val().trim(),
//   };

//   API.newProperty(newPropertyInfo);
// };

var handleDeleteProperty = function() {
  var ownerId = location.href.match(/([^\/]*)\/*$/)[1];
  var propertyIdToDelete = $(this).data("tag");

  API.deleteProperty(propertyIdToDelete, ownerId);
};

$addProperty.on("click", handleAddProperty);
$updateProperty.on("click", handleUpdateProperty);
$deleteProperty.on("click", handleDeleteProperty);

//////// Functions for OWNERS ////////

// Function called when updating an owner registry
var handleUpdateOwner = function(event) {
  event.preventDefault();

  // Gathering all elements to update the registry with
  var editedInfo = {
    ownerId: $("#idtag").data("tag"),
    username: $("#propInputUsername").val().trim(),
    password: $("#propInputPassword").val().trim(),
    firstName: $("#propInputfirstName").val().trim(),
    lastName: $("#propInputLastName").val().trim(),
    email: $("#propInputEmail").val().trim(),
    phone: $("#propInputPhone").val().trim(),
    address1: $("#propInputAddress1").val().trim(),
    address2: $("#propInputAddress2").val().trim(),
    city: $("#propInputCity").val().trim(),
    province: $("#propInputProvince").val().trim(),
    country: $("#propInputCountry").val().trim(),
  };

  // Call the update funtion and pass the updted info
  API.updateOwner(editedInfo);
};

// Owner log in
var handleBtnOwnerLogin = function() {
  event.preventDefault();

  var wrongPassLbl = false;
  var client = {
    username: $("#ownerUsername").val().trim(),
    password: $("#ownerPassword").val().trim()
  };

  API.getOwner(client).then(function(data) {
    if (
      $("#ownerPassword")
        .val()
        .trim() === data.password
    ) {
      console.log("Password matches");
      $("#psswdLbl").html("Password");
      window.location.href = "/owner/" + data.id;
    } else {
      console.log("Wrong password");
      if (!wrongPassLbl) {
        $("#psswdLbl").html("Password - <b>WRONG PASSWORD!</b>");
      }
      wrongPassLbl = true;
    }
  });
};

$updateOwner.on("click", handleUpdateOwner);
$ownerLogin.on("click", handleBtnOwnerLogin);

//////// Functions for CLIENTS ////////

// var HTTP = {
//   serveClientPage: function(clientID) {
//     return $.ajax({
//       url: "/client/" + clientID,
//       type: "GET"
//     });
//   }
// };

/// UPDATE CLIENT GOES HERE

// Function called when updating an owner registry
var handleUpdateClient = function(event) {
  event.preventDefault();

  // Gathering all elements to update the registry with
  var editedInfo = {
    clientId: $("#idtag").data("tag"),
    username: $("#propInputUsername").val().trim(),
    password: $("#propInputPassword").val().trim(),
    firstName: $("#propInputfirstName").val().trim(),
    lastName: $("#propInputLastName").val().trim(),
    email: $("#propInputEmail").val().trim(),
    phone: $("#propInputPhone").val().trim()
  };

  // Call the update funtion and pass the updted info
  API.updateClient(editedInfo);
};

// Client log in
var handleBtnClientLogin = function() {
  event.preventDefault();

  var wrongPassLbl = false;
  var client = {
    username: $("#clientUsername").val().trim(),
    password: $("#clientPassword").val().trim()
  };

  API.getClient(client).then(function(data) {
    if (
      $("#clientPassword")
        .val()
        .trim() === data.password
    ) {
      console.log("Password matches");
      $("#psswdLbl").html("Password");
      window.location.href = "/client/" + data.id;
    } else {
      console.log("Wrong password");
      if (!wrongPassLbl) {
        $("#psswdLbl").html("Password - <b>WRONG PASSWORD!</b>");
      }
      wrongPassLbl = true;
    }
  });
};

$updateClient.on("click", handleUpdateClient);
$clientLogin.on("click", handleBtnClientLogin);

//////// MODAL logic

// USER log in
$("#clientLogIn").on("click", function() {
  console.log("Open USER modal");

  // Display CLIENT login modal
  $("#clientModal").modal({
    backdrop: "static",
    keyboard: false
  });
});

// OWNER log in
$("#ownerLogIn").on("click", function() {
  console.log("Open OWNER modal");

  // Display OWNER login modal
  $("#ownerModal").modal({
    backdrop: "static",
    keyboard: false
  });
});

$("#btnLogin").click(function(event) {
  //Fetch form to apply custom Bootstrap validation
  var form = $("#formLogin");

  if (form[0].checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.addClass("was-validated");
});
