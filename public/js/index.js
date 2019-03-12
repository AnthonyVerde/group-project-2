// Get references to page elements
var $clientLogin = $("#btnClientLogin");
var $clientUsername = $("#clientUsername");
var $clientPassword = $("#clientPassword");
var $updateProperty = $("#updateProperty");



///// DEMO CODE ... CAN BE DELETED /////

var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

///// END OF DEMO CODE /////

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

  updateProperty: function(editedInfo, currentId) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../../api/property/" + currentId,
      data: JSON.stringify(editedInfo)
      // data: editedInfo
    });
  },

  ///// DEMO CODE ... CAN BE DELETED /////

  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
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
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

///// END OF DEMO CODE /////

// Click to EDIT a property

// $updateProperty.on("click", function () {
//   console.log("XXXXXXXXXXXXXX    UPDATE NOT REQUESTED    XXXXXXXXXXXXXX");
// });

var handleUpdateProperty = function(event) {
  event.preventDefault();

  console.log("XXXXXXXXXXXXXX    UPDATE REQUESTED    XXXXXXXXXXXXXX");

  var editedInfo = {
    address1: $("#propInputAddress1").val().trim(),
    address2: $("#propInputAddress2").val().trim(),
    postalcode: $("#propInputPostalCode").val().trim(),
    propertype: $("#propInputProperType").val().trim(),
    price_string: $("#propInputPriceString").val().trim(),
    price_dec: $("#propInputPriceDec").val().trim(),
    bedrooms: $("#propInputBedrooms").val().trim(),
    bathrooms: $("#propInputBathrooms").val().trim(),
    ownershiptype: $("#propInputOwnershipType").val().trim(),
    ammenities: $("#propInputAmmenities").val().trim(),
    ammenitiesnearby: $("#propInputAmmenitiesNearby").val().trim(),
  };

  var currentId = $("#idtag").data("tag");

  API.updateProperty(editedInfo, currentId).then(function() {
    console.log("XXXXXXXXXXXXXX    UPDATED    XXXXXXXXXXXXXX");
  });
};

$updateProperty.on("click", handleUpdateProperty);


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
