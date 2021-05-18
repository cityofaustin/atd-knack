$(document).on("knack-page-render.any", function(event, page) {
  // Hide the entire "Repeat" checkbox and label
  $("label:contains('Repeat')").hide();

  // Rename confusing google maps link
  $('a[title="view in google maps"]').text("View on Google Maps");

  //  remove signs/markings tabs/filter except on landing page
  if (page.key != "scene_808" && page.key != "scene_809") {
    $("#view_2106").remove();
  }
});

$(document).on("knack-scene-render.scene_1014", function(event, page) {
  // CSR issue - markings details
  // update iframe src from detail field
  var iframe_url = $("span:contains('apps/webappviewer')").text();
  $("#csr_view").attr("src", iframe_url);

  // hide the url vield, we don't need it after extracting the value
  $("#view_2528").hide();
});

$(document).on("knack-scene-render.scene_1264", function(event, page) {
  // CSR issue - signs details
  // update iframe src from detail field
  var iframe_url = $("span:contains('apps/webappviewer')").text();
  $("#csr_view").attr("src", iframe_url);

  // hide the url vield, we don't need it after extracting the value
  $("#view_3145").hide();
});

function changeFieldColor(field, color_map) {
  var child_field = $(field).find(".kn-detail-body");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color
    });
  }
}

// Change table data background colors (SERVICE REQUESTS | Markings | Work Order Status)
function changeTableFieldColor(field, color_map) {
  var fields = $(field);
  fields.each(function() {
    var value = this.innerText;
    if (color_map[value]) {
      $(this).css({
        "background-color": color_map[value].background_color,
        color: color_map[value].color
      });
    }
  });
}

var colorMapOne = {
  "NEED TO BE ISSUED": { background_color: "#e41a1c", color: "#fff" },
  "ON HOLD": { background_color: "#aeaeae", color: "#fff" },
  ISSUED: { background_color: "#377eb8", color: "#fff" },
  "NEEDS GIS": { background_color: "#984ea3", color: "#fff" },
  "FINAL REVIEW": { background_color: "#4daf4a", color: "#fff" }
};

// Color map for SERVICE REQUESTS | Markings | Work Order Status highlighting
var colorMapServiceRequestsStatus = {
  "FINAL REVIEW": { background_color: "#4daf4a", color: "#fff" }
};

$(document).on("knack-scene-render.any", function() {
  //  MARKINGS Work Orders Details Status
  changeFieldColor(".field_2181", colorMapOne);

  //  MARKINGS Job Details Status
  changeFieldColor(".field_2190", colorMapOne);

  //  SIGNS Work Orders Details Status
  changeFieldColor(".field_3265", colorMapOne);
});

$(document).on("knack-view-render.any", function() {
  // SERVICE REQUESTS | Markings | Work Order Status
  changeTableFieldColor("td.field_2181", colorMapServiceRequestsStatus);
});

function replaceAttachmentFilenameWithFileType(fileFieldId, typeFieldId) {
  //  replace attachment filename with attachment type
  //  find each attachment cell
  $("td." + fileFieldId).each(function() {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function(index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td." + typeFieldId)
          .find("span")
          .children("span")
          .each(function(index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        $(this).html(attachmentType);
      });
  });
}

$(document).on("knack-view-render.view_2565", function(event, page) {
  replaceAttachmentFilenameWithFileType("field_2405", "field_2403");
});

$(document).on("knack-view-render.view_2107", function(event, page) {
  replaceAttachmentFilenameWithFileType("field_2405", "field_2403");
});

function modCrumbtrail() {
  //  function to replace crumbtrail contents on signs/markings work orders when technician is viewing
  // if user is a signs/markings tech

  var techUserRole = "object_152";
  if (Knack.getUserRoles(techUserRole)) {
    $("div.kn-crumbtrail")
      .find("a")
      .each(function(index) {
        var text = $(this)
          .text()
          .toUpperCase();

        //  replace crumb pointer from work orders to jobs
        if (text.indexOf("WORK ORDERS") >= 0) {
          var href = this.href;
          href = href.replace("work-orders-markings", "work-jobs-markings");
          this.href = href;
          $(this).text("Jobs");
        }

        // remove intermediary Markings or Signs work order landing page crumb entirely
        if (text == "MARKINGS") {
          $(this).remove();
          //  remove extra "→" span
          var span = $("div.kn-crumbtrail").find("span")[1];
          $(span).remove();
        } else if (text == "SIGNS") {
          $(this).remove();
          //  remove extra "→" span
          var span = $("div.kn-crumbtrail").find("span")[1];
        }
      });
  }
}

$(document).on("knack-scene-render.scene_713", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_716", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_724", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_751", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_753", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_762", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_763", function(event, page) {
  modCrumbtrail();
});

//  remove default crumbtrail on signs/markings work orders when technician is viewing
$(document).on("knack-scene-render.scene_720", function(event, page) {
  modCrumbtrail();
});

//  replace 'Quantity' label with UOM of measure by parsing the select value contents
//  was unable to use the chosen.js native events because of however Knack has implemented them
//  so listening for click which is a bit wonky
function setUOM(element) {
  //  expects a connection selector field with a pipe-delmited name/unit of measure
  var item = $(element)
    .find("span")
    .text();

  if (item.split("|")[1]) {
    var unitOfMeasure = item.split("|")[1].trim();
    $("#kn-input-field_2214")
      .find(".kn-input-label")
      .text(unitOfMeasure);
  }
}

$(document).on("knack-scene-render.scene_716", function(event, page) {
  // set the UOM entry box on markings materials
  //  handle a click
  $("#view_1929_field_2220_chzn").click(function() {
    setUOM(this);
  });

  //  and for good measure update UOM on field focus
  $("#field_2214").focus(function() {
    var element = $("#view_1929_field_2220_chzn")["0"];
    setUOM(element);
  });
});

function setRequester(divisionFieldId, requesterSelectorId, userRoleObject) {
  //  function to set a requester field by an attribute value associated with the logged-in user

  if (!Knack.getUserRoles(userRoleObject)) {
    //  ignore if user is supervisor role
    var userAttrs = Knack.getUserAttributes();
    var division = userAttrs.values[divisionFieldId];
    $(requesterSelectorId)
      .val(division)
      .change();
    $(requesterSelectorId).prop("disabled", "true");
  }
}

$(document).on("knack-view-render.view_1880", function(event, page) {
  // Auto-populate requester divison field in MARKINGS New Work Order form
  setRequester("field_2186", "#view_1880-field_2162", "object_151");
});

$(document).on("knack-view-render.view_2633", function(event, page) {
  // Auto-populate requester divison field in SIGNS New Work Order form
  setRequester("field_2186", "#view_2633-field_3216", "object_151");
});

$(document).on("knack-scene-render.scene_713", function(event, page) {
  // remove "signs" dropdown from workgroup selection choices based when work order type is markings
  var workType = $(".field_2292 .kn-value")
    .text()
    .toUpperCase();

  if (workType == "MARKINGS") {
    $("#view_1887-field_2173 option[value='SIGNS']").remove();
  }
});

//////////////////////////////////////////////////
//     Knack Geo Location Selector Plugin       //
//////////////////////////////////////////////////

// TODO: In places where we are removing maps and other fields with JQuery,
// can we remove them on the Knack side instead?

function loadIframeMapMessenger(viewId) {
  var url =
    "https://dnb4pix4gcpf6.cloudfront.net/atd-knack-signs-markings/production/iframeMapMessenger.js";
  $.getScript(url, function(data, textStatus, jqxhr) {
    console.log(data); // Data returned
    console.log(textStatus); // Success
    console.log(jqxhr.status); // 200
    console.log("Load was performed.");
  });
}

window.viewIdsArray = [];

// Work Orders Details Page - Viewer
$(document).on("knack-view-render.view_2619", function(event, scene) {
  window.viewIdsArray.push("#view_2619");
  loadIframeMapMessenger("view_2619");
});

// Work Orders Details Page - Editable
$(document).on("knack-view-render.view_2573", function(event, scene) {
  window.viewIdsArray.push("#view_2573");
  loadIframeMapMessenger("view_2573");
});

// Edit Location Page
$(document).on("knack-view-render.view_2682", function(event, scene) {
  window.viewIdsArray.push("#view_2682");
  $(".field_3300").hide();

  loadIframeMapMessenger("view_2682");
});

// Location Details Page - Viewer & Editable
$(document).on("knack-view-render.view_2733", function(event, scene) {
  window.viewIdsArray.push("#view_2733");
  loadIframeMapMessenger("view_2733");
  $("#kn-map-field_3300").hide(); // Remove map from Location Details
});

// Overlay Latitude/Longitude fields and button on map
$(document).on("knack-scene-render.scene_1028", function(event, scene) {
  // Remove header from form to prevent lat/lon fields from shifting and move form below map
  var $header = $("#view_2607 > div.view-header");
  $header.remove();
  var $form = $("#view_2607");
  $form.attr("id", "lat-lon-form");
  $form.detach();
  $("#view_2572").prepend($form);
  // Hide Latitude/Longitude fields and labels overlaying map
  $("#kn-input-field_3300 > div").hide();
});

$(document).on("knack-view-render.view_2607", function(event, scene) {
  // Remove header that renders in DOM after successfully submitting form
  if ($("#lat-lon-form .view-header").length !== 0) {
    $("#lat-lon-form .view-header").remove();
  }
  // Hide Latitude/Longitude fields and labels overlaying map
  $("#kn-input-field_3300 > div").hide();
});

// END: Knack Geo Location Selector Plugin

/**
 * Template and append a button link, disable it optionally, and invoke a callback function argument
 * @parameter {string} id - id attribute of the a tag in the button link
 * @parameter {string} view_id - Knack view id to append button link to
 * @parameter {string} url - Destination to navigate to on click
 * @parameter {string} fa_icon - Icon string (https://support.knack.com/hc/en-us/articles/226165208-Working-with-Icons#2-complete-list-of-icons)
 * @parameter {bool} isDisabled - Is button disabled (defaults to false)
 * @parameter {function} callback - Function that is invoked after appending the button link
 */
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  isDisabled = false,
  callback = null
) {
  var disabledClass = isDisabled ? " big-button-disabled'" : "'";

  $(
    "<a id='" +
      id +
      "' class='big-button-container" +
      disabledClass +
      " href='" +
      url +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);

  if (callback) callback();
}

/**
 * Enhance SSO button and hide/show default Knack login form with buttons
 * @parameter {string} viewId - Knack view id to append button link to
 */
function customizeLoginButton(viewId) {
  // Hide Knack default SSO button, login form, login title, and any other children
  $("#" + viewId)
    .children()
    .hide();

  var url = Knack.url_base + Knack.scene_hash + "auth/COACD";

  // Create a div for Login buttons
  var $coacdButton = $("<div/>", {
    id: "coacd-button-login",
  });
  $coacdButton.appendTo("#" + viewId);

  // Append Big SSO Login button and non-SSO Login button
  bigButton("coacd-big-button", "coacd-button-login", url, "sign-in", "Sign-In")

  $coacdButton.append(
    "<a class='small-button' href='javascript:void(0)'>" +
      "<div class='small-button-container'><span><i class='fa fa-lock'></i></span><span> Non-COA Sign-In</span></div></a>"
  );

  // On non-SSO button click, hide SSO and non-SSO buttons and show Knack Login form
  var $nonCoacdButton = $(".small-button");
  $nonCoacdButton.click(function () {
    $("#" + viewId)
      .children()
      .show();
    $(".small-button-container,.big-button-container").hide();
    $(".kn-sso-container").hide();
  });
}

// Call customizeLoginButton on any view render to customize any login page that renders in app
$(document).on("knack-view-render.any", function (event, page) {
  // Find SSO button and existing custom button
  var $ssoButton = $(".kn-sso-container");
  var $coacdLoginDiv = $("#coacd-button-login");

  // If SSO button exists on page and there isn't already a custom button
  if ($ssoButton.length && !$coacdLoginDiv.length) {
    var $ssoView = $ssoButton.closest("[id^=view_]");
    var viewId = $ssoView.get(0).id;

    customizeLoginButton(viewId);
  }
});

function setClickEvent(divId, func, param1, param2) {
  // TODO make these args less weird
  $("#" + divId).click(function() {
    func(param1, param2);
  });
}

function showHideElements(showSelector, hideSelector) {
  $(showSelector).show();
  $(hideSelector).hide();
}

$(document).on("knack-view-render.view_2621", function(event, page) {
  // create large button on the home page
  bigButton(
    "work-orders-markings",
    "view_2621",
    "https://atd.knack.com/signs-markings#work-orders-markings/markings/",
    "road",
    "Markings | Work Orders",
  );
});

$(document).on("knack-view-render.view_3178", function(event, page) {
  // create large button on the home page
  bigButton(
    "work-orders-service-requests",
    "view_3178",
    "https://atd.knack.com/signs-markings#service-requests-markings/",
    "comments",
    "Markings | Service Requests",
  );
});

$(document).on("knack-view-render.view_2628", function(event, page) {
  // create large button on the home page
  bigButton(
    "work-orders-signs",
    "view_2628",
    "https://atd.knack.com/signs-markings#work-order-signs/",
    "flag",
    "Signs | Work Orders",
  );
});

$(document).on("knack-view-render.view_2629", function(event, page) {
  // create large button on the home page
  bigButton(
    "service-requests-signs",
    "view_2629",
    "https://atd.knack.com/signs-markings#service-requests-signs/",
    "comments",
    "Signs | Service Requests",
  );
});

$(document).on("knack-view-render.view_2630", function(event, page) {
  // create large button on the home page
  bigButton(
    "street-banners",
    "view_2630",
    "https://atd.knack.com/street-banners#home/",
    "flag-o",
    "Street Banners | Program",
  );
});

$(document).on("knack-view-render.view_2903", function(event, page) {
  // create large button on the home page
  bigButton(
    "signs-gis-qa",
    "view_2903",
    "https://atd.knack.com/signs-markings#signs-gis-qa/",
    "flag",
    "GIS QA | Signs",
  );
});

$(document).on("knack-view-render.view_2904", function(event, page) {
  // create large button on the home page
  bigButton(
    "markings-gis-qa",
    "view_2904",
    "https://atd.knack.com/signs-markings#markings-gis-qa/",
    "road",
    "GIS QA | Markings",
  );
});
$(document).on("knack-view-render.view_3424", function(event, page) {
  // create large button on the home page
  bigButton(
    "sign-fabrication-work-orders",
    "view_3424",
    "https://atd.knack.com/signs-markings#sign-fabrication-work-orders/",
    "wrench",
    "Contractor | Work Orders",
  ); 
})
// END: Custom Buttons

function hideFieldIfRole(selector, roleObjectId) {
  //  function to hide a field based on if the user does not have a given role
  if (Knack.getUserRoles(roleObjectId)) {
    $(selector).hide();
  }
}

$(document).on("knack-view-render.view_2566", function(event, page) {
  // hide fields if technician user
  hideFieldIfRole(".kn-detail.field_3252", "object_152"); // Printed Date (field_3252)
  hideFieldIfRole(".kn-detail.field_3203", "object_152"); // Created Date (field_3203)
  hideFieldIfRole(".kn-detail.field_3206", "object_152"); // Modified Date (field_3206)
  hideFieldIfRole(".kn-detail.field_3283", "object_152"); // Modified By (field_3283)
  hideFieldIfRole(".kn-detail.field_3215", "object_152"); // Work Type (field_3215)
  hideFieldIfRole(".kn-detail.field_3214", "object_152"); // Work Order ID (field_3214)
}); /* #214 Increase default menu button size */

/* #214 Increase default menu button size */
function updateButtonIconSizes(viewId) {
  $("#" + viewId + " .kn-button .icon").each(function(item) {
    this.classList.remove("is-small");
  });
}
$(document).on("knack-view-render.view_2901", function() {
  updateButtonIconSizes("view_2901");
});

$(document).on("knack-view-render.view_2684", function() {
  updateButtonIconSizes("view_2684");
});

$(document).on("knack-view-render.view_2123", function() {
  updateButtonIconSizes("view_2123");
});

$(document).on("knack-view-render.view_2661", function() {
  updateButtonIconSizes("view_2661");
});

$(document).on("knack-view-render.view_1912", function() {
  updateButtonIconSizes("view_1912");
});

$(document).on("knack-view-render.view_2307", function() {
  updateButtonIconSizes("view_2307");
});

$(document).on("knack-view-render.view_2741", function() {
  updateButtonIconSizes("view_2741");
});
/* END #214 */

// #213
$(document).on("knack-scene-render.scene_1028", function() {
  $backToTop = $(".kn-back-link").append(
    "<span class='back-to-top-link'> Back to top</span>"
  );
  $backToTop.on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $(".kn-back-link a").hide();
});
// END #213

// Embed JS Calc for view_2267
$(document).on("knack-view-render.view_2267", function() {
  $("#view_2267").html(
    '<iframe src="https://atd-knack-signs-markings.netlify.com/calcs" scrolling="no" frameborder="0" height="3000px" width="100%"></iframe>'
  );
});
// End JS Calc

// #233
$(document).on("knack-view-render.view_2985", function() {
  $(
    '<label for="field_2405_upload" class="custom-file-upload kn-button is-secondary">Choose File</label>'
  ).insertBefore("#field_2405_upload");
});
$(document).on("knack-view-render.view_2742", function() {
  $(
    '<label for="field_3378_upload" class="custom-file-upload kn-button is-secondary">Choose File</label>'
  ).insertBefore("#field_3378_upload");
});
// END #233


///////////////////////////////////
//// atd-knack-api integration ////
///////////////////////////////////

$(document).on('knack-form-submit.view_3158', function(event, view, txn) {
    // on submission of "assign to" form in markins SR manager
  	// posts to the work_order_flext_notes endpoint, which fires a script that
    // attaches flex notes to created work orders
    var endpoint = "https://knack-api.austinmobility.io/work_order_flex_notes";
    var src = Knack.application_id; // markings prod
    var url = endpoint + "?src=" + src;

    // post inventory request
    $.post(url).done(function (response) {
        console.log(response);
    });
})

