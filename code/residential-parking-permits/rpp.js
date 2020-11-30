function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button

  $("<div/>", {
    id: div_id,
  }).appendTo("#" + view_id);

  $("#" + div_id).append(
    "<a class='big-button' href='" +
      url +
      "'><div class='big-button-container'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></div></a>"
  );

  if (callback) callback();
}
//>>>RPP TAB BUTTONS
$(document).on("knack-view-render.view_4", function (event, page) {
  // create large button on the home page
  bigButton(
    "verify",
    "view_518",
    "https://atd.knack.com/parking#verify/",
    "map-marker",
    "Am I Eligible?"
  );
});

$(document).on("knack-view-render.view_4", function (event, page) {
  // create large button on the home page
  bigButton(
    "get-started",
    "view_4",
    "https://atd.knack.com/parking#get-started/",
    "file-text",
    "Get Started"
  );
});

$(document).on("knack-view-render.view_5", function (event, page) {
  // create large button on the home page
  bigButton(
    "faq",
    "view_5",
    "https://atd.knack.com/parking#faq/",
    "info-circle",
    "Help"
  );
});

$(document).on("knack-view-render.view_455", function (event, page) {
  // create large button on the home page
  bigButton(
    "learn-more",
    "view_455",
    "http://www.austintexas.gov/department/residential-permit-parking",
    "book",
    "About the Program"
  );
});

//>>>FAQ TAB BUTTONS
$(document).on("knack-view-render.view_236", function (event, page) {
  // create large button on the home page
  bigButton(
    "rpp",
    "view_236",
    "https://atd.knack.com/parking#rpp",
    "home",
    "Home"
  );
});

//>>>GET STARTED TAB BUTTONS
$(document).on("knack-view-render.view_127", function (event, page) {
  // create large button on the home page
  bigButton(
    "apply",
    "view_127",
    "https://atd.knack.com/parking#apply-for-permits/",
    "arrow-right",
    "Start Application"
  );
});

//>>>HOME TAB BUTTONS
$(document).on("knack-view-render.view_27", function (event, page) {
  // create large button on the home page
  bigButton(
    "applications",
    "view_27",
    "https://atd.knack.com/parking#applications/",
    "files-o",
    "Applications"
  );
});

$(document).on("knack-view-render.view_28", function (event, page) {
  // create large button on the home page
  bigButton(
    "permits",
    "view_28",
    "https://atd.knack.com/parking#permits",
    "tags",
    "Permits"
  );
});

$(document).on("knack-view-render.view_267", function (event, page) {
  // create large button on the home page
  bigButton(
    "transactions",
    "view_267",
    "https://atd.knack.com/parking#transactions",
    "credit-card",
    "Transactions"
  );
});

$(document).on("knack-view-render.view_184", function (event, page) {
  // create large button on the home page
  bigButton(
    "advanced-search",
    "view_184",
    "https://atd.knack.com/parking#advanced-search/",
    "search",
    "Advanced Search"
  );
});

$(document).on("knack-view-render.view_396", function (event, page) {
  // create large button on the home page
  bigButton(
    "verify",
    "view_396",
    "https://atd.knack.com/parking#verify/",
    "map-marker",
    "Am I Eligible?"
  );
});

//$(document).on('knack-view-render.view_208', function(event, page) {
// create large button on the home page
bigButton(
  "reports",
  "view_208",
  "https://atd.knack.com/parking#reports",
  "bar-chart",
  "Reports"
);
//});

//>>>PAYMENT OPTIONS TAB BUTTONS
$(document).on("knack-view-render.view_273", function (event, page) {
  // create large button on the home page
  bigButton(
    "rpp",
    "view_273",
    "https://atd.knack.com/parking#rpp",
    "home",
    "Home"
  );
});

//>>>APPLICATION SUBMIT BUTTONS
//$(document).on('knack-view-render.view_755', function(event, page) {
// create large button on the review application page
//bigButton('continue', 'view_755', "https://atd.knack.com/parking#apply/permit-information2/required-documents/review-application/", "check", "Save & Continue");
//});

$(document).on("knack-page-render.any", function (event, page) {
  // Convert all name, address, and license plate entries to upper case
  //  This is required in addition to the uppercase css text transform, which is superficial
  $(".kn-input-name input").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $(".kn-input-address input").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_232").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_235").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_237").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_239").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_397").keyup(function () {
    this.value = this.value.toUpperCase();
  });

  $("input#field_398").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});

//$(document).on('knack-view-render.any', function(event, view, data) {
//  autofill city and state on any address form except permit information on customer application
//if (view === "view_713") {
//  return;
//}
//$("#city").val('AUSTIN');
//$("#state").val('TX');
//});

function updateVerifyIframe(x, y, street) {
  // RPP Eligibility
  // update iframe src from detail field
  // see AGOL URL Params: https://doc.arcgis.com/en/arcgis-online/reference/use-url-parameters.htm
  var baseUrl =
    "https://austin.maps.arcgis.com/apps/webappviewer/index.html?id=ba9bf354772c4d478808b6445a723a44&level=18&marker=";

  var mapUrl = baseUrl + x + "," + y + ",4326,,," + street;
  $("#map_url").attr("src", mapUrl);
}

$(document).on("knack-form-submit.view_163", function (event, view, record) {
  console.log(record);
  //  initative parking zone check on verify form submit
  var lon = record.field_130_raw.longitude;
  var lat = record.field_130_raw.latitude;
  var street = record.field_130_raw.street;

  updateVerifyIframe(lon, lat, street);

  point_in_poly(
    "RPP_Properties",
    0,
    lat,
    lon,
    street,
    "*",
    function (feature, lat, lon, address) {
      //  hide page submit confirmation message
      $(".kn-message").hide();

      //  hide page instructions wich are no longer relevant
      $(".view_89").remove();

      //  get a url to view the geocoded address on the parking restrictions map
      var map_url = getMapUrl(lat, lon, address);
      var map =
        '<h5><b><i class="fa fa-map-marker"></i> <a target="_blank" href="' +
        map_url +
        '" >View this address </a> on a parking restriction map</b></h5>';

      if (feature) {
        // confirm address is eligible
        var parkingZone = feature.attributes["ZONE_NO"];
        var restriction = feature.attributes["RESTRICTION_TIME_DATE"];
        var blockNo = feature.attributes["BLOCK_NO"];
        var streetName = feature.attributes["STREET_NAME"];
        var maxResidents = feature.attributes["MAX_RESIDENTS"];
        var maxVisitorHangTagHouseh =
          feature.attributes["MAX_VISITOR_HANG_TAG_PER_HOUSEH"];
        var renewalPeriod = feature.attributes["RENEWAL_PERIOD"];

        var message =
          "<h4></i> Residents at this address <b>" +
          blockNo +
          " " +
          streetName +
          "</b> can purchase street parking permits.</h4>" +
          "<ul><li><h5><i>" +
          "Parking restrictions are in effect <b>" +
          restriction +
          "</i></b></h5></li>" +
          "<li><h5><i>Maximum Resident Decals: <b>" +
          maxResidents +
          "</b></i></h5></li>" +
          "<li><h5><i>Maximum Visitor Hang-tags: <b>" +
          maxVisitorHangTagHouseh +
          "</b></i></h5></li>" +
          "<li><h5><i>Permit Renewal Period: <b>" +
          renewalPeriod +
          "</b></i></h5></li>";

        var contact_us =
          '<h5><b><i class="fa fa-phone"></i> ' +
          '<a href="https://atd.knack.com/parking#contact-us/" >Contact Us</a> if you need help</b></h5>';

        showMessage(
          "#view_163",
          (message = message),
          (message_type = "confirmation")
        );

        $(".kn-form-confirmation").prepend(contact_us);
        $(".kn-form-confirmation").prepend(webmap_url);
        $(".kn-form-confirmation").prepend(map);
        $(".kn-form-confirmation").prepend(
          $("<h5><b><b></h5>").append($(".kn-form-reload"))
        );
      } else {
        //  address is ineligible
        //  move reload form button inside message
        var message =
          '<h5><i class="fa fa-exclamation-triangle"></i> Our records show that <underline>no parking permit is required</underline> at this address. If you think this may be in error please email: <b>residentialparking@austintexas.gov</b></h5>';

        var contact_us =
          '<h5><b><i class="fa fa-phone"></i> ' +
          '<a href="https://atd.knack.com/parking#contact-us/" >Contact Us</a> if you need help.</b></h5>';

        showMessage(
          "#view_163",
          (message = message),
          (message_type = "warning")
        );

        $(".kn-form-confirmation").prepend(contact_us);
        $(".kn-form-confirmation").prepend(
          $("<h5></h5>").append($(".kn-form-reload"))
        );
      }
    }
  );

  //  these work, too:
  //  point_in_poly('BOUNDARIES_single_member_districts', 0, lon, lat, 'COUNCIL_DISTRICT')
  //  geocode(street);
});

function point_in_poly(
  service_name,
  layer_id,
  lat,
  lon,
  address,
  outfields,
  callback
) {
  // check if point is within polygon feature
  // return attributes of containing feature
  // assume input geometry spatial reference is WGS84
  var point = lon + "," + lat;
  var url =
    "https://services.arcgis.com/0L95CJ0VTaxqcmED/ArcGIS/rest/services/" +
    service_name +
    "/FeatureServer/" +
    layer_id +
    "/query";
  var params = {
    f: "json",
    outFields: outfields,
    geometry: point,
    returnGeometry: false,
    spatialRel: "esriSpatialRelIntersects",
    inSR: 4326,
    geometryType: "esriGeometryPoint",
    callbackParamName: "callback",
  };

  requestCORS(url, "GET", params, function (response) {
    var feature = parseFeature(response);
    callback(feature, lat, lon, address);
  });
}

function requestCORS(url, type, params, callback) {
  $.ajax({
    url: url,
    type: type,
    data: params,
    crossDomain: true,
    dataType: "jsonp",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      callback(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function parseFeature(response) {
  return response.features[0];
}

function geocode(address) {
  address = encodeURI(address);
  var url =
    "https://www.austintexas.gov/GIS/REST/Geocode/COA_Street_Locator/GeocodeServer/findAddressCandidates?SingleLine=" +
    address;

  var params = {
    f: "json",
    outFields: "*",
    callbackParamName: "callback",
    maxLocations: 1,
  };

  requestCORS(url, "GET", params, function (response) {
    handleGecode(response);
  });
}

function handleGecode(results) {
  alert(results.candidates[0].address);
}

function getIframe(el_id, street) {
  var url =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyBhvDuAf3jPNzdnowYI4beNjEK4lkWJiKI&zoom=18&q=" +
    street +
    ",austin,tx";
  console.log(url);
  var width = $("#knack-body").width();
  var width = width * 0.9;
  //  set iframe source
  $("#" + el_id)
    .attr("src", url)
    .attr("width", width);
  //  reveal iframe
  $("#" + el_id).show();
  //  move iframe to bottom of view
  $("#" + el_id).insertAfter($("#view_8").parent());
}

function addButton(button_id, element, href, icon, label) {
  $("<div/>", {
    id: button_id,
  }).appendTo(element);

  var button =
    '<a class="big-button" href="' +
    href +
    '"><div class="big-button-container"><span><i class="fa fa-' +
    icon +
    '" ></i></span><span> ' +
    label +
    "</span></div></a>";

  $(element).append(button);

  return true;
}

function showMessage(element, message = "", message_type = "warning") {
  //  message types are 'confirmation, warning, error, and neutral'
  $(
    '<div class="kn-view"><div class="kn-notification is-' +
      message_type +
      '">' +
      message +
      "</div></div>"
  ).prependTo(element);
  return true;
}

function getMapUrl(lat, lon, address) {
  address = encodeURI(address);
  return (
    "http://austin.maps.arcgis.com/apps/webappviewer/index.html?id=27116dbd37274d298315b3c9fdb4319a&level=10&marker=" +
    lon +
    "," +
    lat +
    ",4632,,," +
    address
  );
}

// Disable breadcrumb links
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}
//no longer exists
$(document).on("knack-scene-render.scene_3", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_13", function () {
  disableBreadCrumbsNonAdmin();
});
//delete view
$(document).on("knack-scene-render.scene_123", function () {
  disableBreadCrumbsNonAdmin();
});
//delete view
$(document).on("knack-scene-render.scene_176", function () {
  disableBreadCrumbsNonAdmin();
});
//delete view
$(document).on("knack-scene-render.scene_179", function () {
  disableBreadCrumbsNonAdmin();
});
//delete view
$(document).on("knack-scene-render.scene_140", function () {
  disableBreadCrumbsNonAdmin();
});
//delete view
$(document).on("knack-scene-render.scene_142", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_186", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_163", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_226", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_227", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_231", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_237", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_244", function () {
  disableBreadCrumbsNonAdmin();
});
//no longer exists
$(document).on("knack-scene-render.scene_262", function () {
  disableBreadCrumbsNonAdmin();
});
//apply for permits-rpp app
$(document).on("knack-scene-render.scene_309", function () {
  disableBreadCrumbsNonAdmin();
});
//permit information-rpp app
$(document).on("knack-scene-render.scene_310", function () {
  disableBreadCrumbsNonAdmin();
});
//required documents-rpp app
$(document).on("knack-scene-render.scene_312", function () {
  disableBreadCrumbsNonAdmin();
});
//review application-rpp app
$(document).on("knack-scene-render.scene_313", function () {
  disableBreadCrumbsNonAdmin();
});
//application invoice-rpp app
$(document).on("knack-scene-render.scene_314", function () {
  disableBreadCrumbsNonAdmin();
});
//edit application-rpp app
$(document).on("knack-scene-render.scene_315", function () {
  disableBreadCrumbsNonAdmin();
});

/////////////////////////////////////////////////////////////
//// Begin Set Weighted Unit Cost ///////////////////////////
/////////////////////////////////////////////////////////////
function setCostFields(viewId, options) {
  var NUM_DECALS_FIELD = "field_394"; // Resident Decals Application Choice
  var NUM_HANGTAGS_FIELD = "field_395"; // Visitor Hangtags Application Choice
  var NUM_DAY_PASSES_FIELD = "field_396"; //  day passes choice
  var NUM_EXISTING_PERMITS_FIELD = "field_546";
  var COMBINED_PERMIT_COST_FIELD = "field_530";
  var DAY_PASS_BASE_COST_FIELD = "field_505";
  var DAY_PASS_TOTAL_COST_FIELD = "field_508";
  var TAX_RATE_FIELD = "field_501"; // tax rate snapshot
  var TAX_AMOUNT_FIELD = "field_538"; // tax amount
  var SUBTOTAL_FIELD = "field_536"; // subtotal
  var TOTAL_COST_FIELD = "field_540"; // final total cost
  var APPLICANT_TYPE_FIELD = "field_128";

  var FIELDS_TO_HIDE = [
    COMBINED_PERMIT_COST_FIELD,
    DAY_PASS_BASE_COST_FIELD,
    DAY_PASS_TOTAL_COST_FIELD,
    TAX_RATE_FIELD,
    TAX_AMOUNT_FIELD,
    SUBTOTAL_FIELD,
    TOTAL_COST_FIELD,
  ];

  var hideFromUser = options.hideFromUser ?? false;
  var autoUpdate = options.autoUpdate ?? true;

  function getPermitCost(numPermits) {
    switch (numPermits) {
      case 0:
        return 0;
      case 1:
        return 20;
      case 2:
        return 45;
      case 3:
        return 75;
      case 4:
        return 110;
      case 5:
        return 170;
      case 6:
        return 240;
      default:
        // each additional permit beyond the 6th permit costs $70
        var baseCost = 240;
        var additionalCost = (numPermits - 6) * 70;
        return baseCost + additionalCost;
    }
    return 0;
  }

  function numToDollars(val) {
    var isInt = val % 1 === 0;
    var stringNum = isInt ? val + ".00" : val.toFixed(2);
    return "$" + stringNum;
  }

  function dollarsToNum(val) {
    return parseFloat(val.replace("$", "").replace(",", ""));
  }

  function hideFields(fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      var field = fieldArray[i];
      $("#kn-input-" + field).addClass("hiddenFormField");
    }
  }

  // apply hidden field classes if needed
  hideFromUser && hideFields(FIELDS_TO_HIDE);

  // set form cost values based on current form current data
  calculateAndSetValues();
  if (autoUpdate) {
    // set event handlers to recalculate when select fields are changed
    $("#" + viewId + "-" + NUM_DECALS_FIELD).on("input", function () {
      calculateAndSetValues();
    });
    $("#" + viewId + "-" + NUM_HANGTAGS_FIELD).on("input", function () {
      calculateAndSetValues();
    });
    $("#" + NUM_DAY_PASSES_FIELD).on("input", function () {
      calculateAndSetValues();
    });
    $("#" + viewId + "-" + NUM_EXISTING_PERMITS_FIELD).on("input", function () {
      calculateAndSetValues();
    });
    $("#" + APPLICANT_TYPE_FIELD).on("input", function () {
      calculateAndSetValues();
    });
    $("#" + TAX_RATE_FIELD).on("input", function () {
      calculateAndSetValues();
    });
  }

  function calculateAndSetValues() {
    // note <select> fields have a different identifier format than <input>
    var numHangTags = parseInt(
      $("#" + viewId + "-" + NUM_HANGTAGS_FIELD).val()
    );
    var numDecals = parseInt($("#" + viewId + "-" + NUM_DECALS_FIELD).val());
    var numDayPasses = parseInt($("#" + NUM_DAY_PASSES_FIELD).val()) || 0;
    var numExistingPermits =
      parseInt($("#" + viewId + "-" + NUM_EXISTING_PERMITS_FIELD).val()) || 0;

    var dayPassBaseCost = dollarsToNum($("#" + DAY_PASS_BASE_COST_FIELD).val());
    var taxRate = $("#" + TAX_RATE_FIELD).val();

    var existingPermitCost = getPermitCost(numExistingPermits);
    var existingPlusNewPermitCost = getPermitCost(
      numDecals + numHangTags + numExistingPermits
    );
    var combinedPermitCost = existingPlusNewPermitCost - existingPermitCost;

    $("#" + COMBINED_PERMIT_COST_FIELD).val(numToDollars(combinedPermitCost));

    var dayPassTotalCost = numDayPasses * dayPassBaseCost;
    $("#" + DAY_PASS_TOTAL_COST_FIELD).val(numToDollars(dayPassTotalCost));

    var subTotal = dayPassTotalCost + combinedPermitCost;
    $("#" + SUBTOTAL_FIELD).val(numToDollars(subTotal));

    var taxAmount = taxRate * subTotal;
    $("#" + TAX_AMOUNT_FIELD).val(numToDollars(taxAmount));

    var totalCost = taxAmount + subTotal;
    $("#" + TOTAL_COST_FIELD).val(numToDollars(totalCost));

    // conditionally hide the "required documents" fields if no decals or hangtags
    // are being requested. we do this with custom code because the form logic via
    // knack is quite hellish, because we already have a knack display rule to show
    // the proof of residency document attachment conditionally
    var dl_attachment_field = "field_419";
    if (numDecals + numHangTags == 0) {
      $("#kn-input-" + dl_attachment_field)
        .closest("ul")
        .hide();
    } else {
      $("#kn-input-" + dl_attachment_field)
        .closest("ul")
        .show();
    }
  }
}

$("#kn-input-field_419").closest("ul");

function recalcCostsButton(clickEvent, viewKey, options) {
  var button = $(
    "<span style='width: 2em'></span><button id='recalc-costs-button' style='border-radius: .35em !important' class='kn-button'><i class='fa fa-refresh'></i><span style='width: .5em'></span>Re-Calculate Costs</button>"
  );

  var placeHolder = $("h3:contains('$replace_with_javascript')");
  placeHolder.hide();
  button.insertAfter(placeHolder);
  button.on("click", function (event) {
    event.preventDefault();
    clickEvent(viewKey, options);
  });
}

$(document).on("knack-view-render.view_1301", function (event, view) {
  // back office Edit Permit application view
  // creates a "Re-calculate Costs" button which updates the Edit Permit App form
  // with calculated cost values
  recalcCostsButton(setCostFields, view.key, {
    hideFromUser: false,
    autoUpdate: false,
  });
});

$(document).on("knack-view-render.view_1175", function (event, view) {
  // "permit information" page of customer application workflow
    for (var i = 3; i < 7; i++) {
    // remove number of hangtag chocies higher than 2. only staff can pick more than 2
    // hangtags
    $("#view_1175-field_395 option[value='" + i + "']").remove();
  }

  setCostFields(view.key, { hideFromUser: true, autoUpdate: true });
});

$(document).on("knack-view-render.view_1194", function (event, view) {
  // "edit application" page of customer application workflow
  for (var i = 3; i < 7; i++) {
    // remove number of hangtag chocies higher than 2. only staff can pick more than 2
    // hangtags
    $("#view_1175-field_395 option[value='" + i + "']").remove();
  }

  setCostFields(view.key, { hideFromUser: true, autoUpdate: true });
});

