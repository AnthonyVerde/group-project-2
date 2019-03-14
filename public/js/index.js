// Get references to page elements
var $clientLogin = $("#btnClientLogin");
var $clientUsername = $("#clientUsername");
var $clientPassword = $("#clientPassword");

var $updateProperty = $("#updateProperty");
var $addProperty = $("#addProperty");
var $deleteProperty = $(".deleteProperty");

// The API object contains methods for each kind of request we'll make
var API = {
  getClients: function (client) {
    console.log("Username: " + client.username);
    console.log("Password: " + client.password);
    console.log("URL: api/client/" + client.username);

    return $.ajax({
      url: "api/client/" + client.username,
      type: "GET"
    }).then(function (data) {
      return data;
    });
  },

  // Pushes the information of a NEW property
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

  // Updates a property in the database
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

  // Delete a property in the database
  deleteProperty: function(propertyId, ownerId) {
    return $.ajax({
      url: "../../api/property/" + propertyId,
      type: "DELETE"
    }).then(function() {
      window.location.href = "/owner/" + ownerId;
    });
  },

  ///// DEMO CODE ... CAN BE DELETED /////

  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }

  ///// END OF DEMO CODE /////
};

///// DEMO CODE ... CAN BE DELETED /////

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

///// END OF DEMO CODE /////

// Click to EDIT a property

var handleUpdateProperty = function(event) {
  event.preventDefault();

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

  API.updateProperty(editedInfo);
};

var handleAddProperty = function(event) {
  event.preventDefault();

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

  API.newProperty(newPropertyInfo);
};

var handleDeleteProperty = function() {
  var ownerId = location.href.match(/([^\/]*)\/*$/)[1]
  var propertyIdToDelete = $(this).data("tag");

  API.deleteProperty(propertyIdToDelete, ownerId);
};

$updateProperty.on("click", handleUpdateProperty);
$addProperty.on("click", handleAddProperty);
$deleteProperty.on("click", handleDeleteProperty);

var HTTP = {
  serveClientPage: function (clientID) {
    return $.ajax({
      url: "/client/" + clientID,
      type: "GET"
    });
  }
};

var handleBtnClientLogin = function () {
  event.preventDefault();

  var client = {
    username: $clientUsername.val().trim(),
    password: $clientPassword.val().trim()
  };

  API.getClients(client).then(function (data) {
    console.log("***********************\nReturn from API.getClients");
    console.log(data.username);
    console.log(data.password);
    console.log(data.id);
    console.log("***********************");

    $("#clientModal")
      .modal("hide")
      .then(function () {
        HTTP.serveClientPage(data.id);
      });

    if ($clientPassword.val().trim() === data.password) {
      console.log("Password matches");
      // Hide the CLIENT login modal
    }
  });
};

// Add event listeners to the submit and delete buttons
$clientLogin.on("click", handleBtnClientLogin);

// MODAL logic

// USER log in
$("#clientLogIn").on("click", function () {
  console.log("Open USER modal");

  // Display CLIENT login modal
  $("#clientModal").modal({
    backdrop: "static",
    keyboard: false
  });
});

// OWNER log in
$("#ownerLogIn").on("click", function () {
  console.log("Open OWNER modal");

  // Display OWNER login modal
  $("#ownerModal").modal({
    backdrop: "static",
    keyboard: false
  });
});

$("#btnLogin").click(function (event) {
  //Fetch form to apply custom Bootstrap validation
  var form = $("#formLogin");

  if (form[0].checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.addClass("was-validated");
});
