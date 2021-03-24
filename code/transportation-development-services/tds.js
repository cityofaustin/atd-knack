/********************************************/
/******** COACD Single Sign On Login ********/
/********************************************/
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
  $coacdButton.append(
    "<a class='big-button' href='" +
      url +
      "'><div class='big-button-container'><span><i class='fa fa-sign-in'></i></span><span> Sign-in</span></div></a>"
  );

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

/********************************************/
/*************** Big Buttons ****************/
/********************************************/
//Create Big Button nested in a block
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  is_disabled,
  callback
) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
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

// create large Reviewer Dashboard button on the Home page
$(document).on("knack-view-render.view_55", function (event, page) {
  bigButton(
    "reviewer-dashboard",
    "view_55",
    "https://atd.knack.com/development-services#reviewer-dashboard/",
    "dashboard",
    "Reviewer Dashboard"
  );
});
// create large Development Reviews button on the Home page
$(document).on("knack-view-render.view_15", function (event, page) {
  bigButton(
    "development-reviews",
    "view_15",
    "https://atd.knack.com/development-services#home/development-reviews/",
    "list-ul",
    "Development Reviews"
  );
});
// create large TIA Reviews button on the Home page
$(document).on("knack-view-render.view_719", function (event, page) {
  bigButton(
    "tia-reviews",
    "view_719",
    "https://atd.knack.com/development-services#view-tia-requests/",
    "list-ul",
    "TIA Reviews"
  );
});
// create large TDA Reviews button on the Home page
$(document).on("knack-view-render.view_724", function (event, page) {
  bigButton(
    "tda-reviews",
    "view_724",
    "https://atd.knack.com/development-services#tda-reviews/",
    "list-ul",
    "Pre-Assessment Reviews"
  );
});
// create large Advanced Search button on the Home page
$(document).on("knack-view-render.view_56", function (event, page) {
  bigButton(
    "advanced-search",
    "view_56",
    "https://atd.knack.com/development-services#advanced-search/",
    "search",
    "Advanced Search"
  );
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_720", function (event, page) {
  bigButton(
    "account-management",
    "view_720",
    "https://atd.knack.com/development-services#account-management/",
    "gears",
    "Account Management"
  );
});
// create large Reviewer Help button on the Home page
$(document).on("knack-view-render.view_721", function (event, page) {
  bigButton(
    "reviewer-help",
    "view_721",
    "https://atd.knack.com/development-services#reviewer-help/",
    "question",
    "Reviewer Help"
  );
});

// create large Search Reviews button on the Advanced Search page
$(document).on("knack-view-render.view_60", function (event, page) {
  bigButton(
    "search-reviews",
    "view_60",
    "https://atd.knack.com/development-services#search-reviews/",
    "search",
    "Search | Reviews"
  );
});
// create large Search Comments button on the Advanced Search page
$(document).on("knack-view-render.view_61", function (event, page) {
  bigButton(
    "search-comments",
    "view_61",
    "https://atd.knack.com/development-services#search-comments/",
    "search",
    "Search | Comments"
  );
});

// create large Start TIA Request button on the TIA Portal page
$(document).on("knack-view-render.view_112", function (event, page) {
  bigButton(
    "tia-request",
    "view_112",
    "https://atd.knack.com/development-services#tia-request-requester-information/",
    "arrow-right",
    "Start TIA Request"
  );
});

/****************************************************/
/*** Disable Trigger buttons from being Clickable ***/
/****************************************************/
$(document).on("knack-scene-render.any", function (event, view) {
  var $blockContainerButton = $(".block-container-disabled").parent();
  $blockContainerButton.removeClass("kn-action-link");
});

/****************************************************************/
/** Convert Requester Name field to UPPER CASE for TIA Request **/
/****************************************************************/
/*$(document).on('knack-page-render.any', function(event, page) {
   
  $('.kn-input-name input').keyup(function(){
      this.value = this.value.toUpperCase();
  });
  
   $('input#field_181').keyup(function(){
      this.value = this.value.toUpperCase();
  });
})*/

/*********************************************************/
/** Convert Case ID field to UPPER CASE for TIA Request **/
/*********************************************************/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_165").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});

/******************************************************************/
/** Disable Navigation Breadcrumb Links for TIA Case Status page **/
/******************************************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}
//TIA Case Details page
$(document).on("knack-scene-render.scene_58", function () {
  disableBreadCrumbsNonAdmin();
});
//View TIA Submission Details page
$(document).on("knack-scene-render.scene_194", function () {
  disableBreadCrumbsNonAdmin();
});
//Add TIA Submission Attachments page
$(document).on("knack-scene-render.scene_228", function () {
  disableBreadCrumbsNonAdmin();
});
//View TIA Scope Submission Details page
$(document).on("knack-scene-render.scene_214", function () {
  disableBreadCrumbsNonAdmin();
});
//Add TIA Scope Submission Attachments page
$(document).on("knack-scene-render.scene_213", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit TIA Submission Attachment page
$(document).on("knack-scene-render.scene_230", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit TIA Scope Submission Attachment page
$(document).on("knack-scene-render.scene_231", function () {
  disableBreadCrumbsNonAdmin();
});

/***********************************************************/
/*** Disable Navigation Breadcrumb Links for TIA Request ***/
/***********************************************************/

//TIA Requester Information page
$(document).on("knack-scene-render.scene_166", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Project Information page
$(document).on("knack-scene-render.scene_167", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Required Documents page
$(document).on("knack-scene-render.scene_176", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Review Request page
$(document).on("knack-scene-render.scene_177", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Request Confirmation page
$(document).on("knack-scene-render.scene_178", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Request page
$(document).on("knack-scene-render.scene_179", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Locations page
$(document).on("knack-scene-render.scene_180", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Attachments page
$(document).on("knack-scene-render.scene_181", function () {
  disableBreadCrumbsNonAdmin();
});

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("Attachment");
});

/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on("knack-scene-render.any", function (event, scene) {
  $(".kn-modal-bg").off("click");
});

/*********************************************************/
/** Add Return to Case Details Button to specific views **/
/*********************************************************/
$(document).on("knack-view-render.any", function (event, view) {
  var appviews = ["view_601", "view_602", "view_604", "view_605"];
  var key = view.key != undefined ? view.key.toLowerCase().trim() : "";
  var l = appviews.length;
  for (var x = 0; x < l; x++) {
    if (appviews[x] == key) {
      $("#" + appviews[x]).prepend(
        "<button id='return-button'>Return to Case Details</button>"
      );
      document
        .getElementById("return-button")
        .addEventListener("click", function () {
          window.history.back();
        });
    } // if
  } // for
});

/********************************************************************/
/** Add Return to Submission Cycle Button to Edit Attachment Pages **/
/********************************************************************/
$(document).on("knack-view-render.any", function (event, view) {
  var appviews = ["view_612", "view_613"];
  var key = view.key != undefined ? view.key.toLowerCase().trim() : "";
  var l = appviews.length;
  for (var x = 0; x < l; x++) {
    if (appviews[x] == key) {
      $("#" + appviews[x]).prepend(
        "<button id='return-button'>Return to Submission Cycle</button>"
      );
      document
        .getElementById("return-button")
        .addEventListener("click", function () {
          window.history.back();
        });
    } // if
  } // for
});

/***********************************************************/
/*** Add Return to Memo Builder Button to New Memo Pages ***/
/***********************************************************/
$(document).on("knack-view-render.any", function (event, view) {
  var appviews = ["view_713", "view_714", "view_715"];
  var key = view.key != undefined ? view.key.toLowerCase().trim() : "";
  var l = appviews.length;
  for (var x = 0; x < l; x++) {
    if (appviews[x] == key) {
      $("#" + appviews[x]).prepend(
        "<button id='return-button'>Return to Memo Builder</button>"
      );
      document
        .getElementById("return-button")
        .addEventListener("click", function () {
          window.history.back();
        });
    } // if
  } // for
});

/***************************************/
/**** Global Reporting Page Styling ****/
/***************************************/
Highcharts.setOptions({
  chart: {
    backgroundColor: {
      linearGradient: [
        500,
        500,
        500,
        500,
      ] /*for report container, set to same value for no gradient*/,
      stops: [
        [0, "rgb(255, 255, 255)"],
        [
          1,
          "rgb(240, 240, 255)",
        ] /*we create a light blue report container background to contrast the data with the white plot area and white page*/,
      ],
    },
    borderWidth: 0 /*border width for report container, does not include title, print/download, or filter menu*/,
    plotBackgroundColor:
      "rgba(255, 255, 255, .9)" /*how much lighter you want the plot background to be compared to report background color. 
        We make the plot background almost transparent to be similar as the page color and contrast with the light blue report container color*/,
    plotShadow: false /*adds shadow to bottom and right of plot and gives a 3D effect. We make it flat.*/,
    plotBorderWidth: 2 /*for plot only. Helps user focus on data in the plot*/,
  },
});

/****************************************************/
/**** Hide/show TIA Add Mitigation form elements ****/
/****************************************************/
var fieldsIdsShownOnLoad = {
  // "Field ID": "Field Name"
  "kn-input-field_639": "Mitigation Location",
  "kn-input-field_326": "Mitigation Type",
  "kn-input-field_495": "Improvement",
  "kn-input-field_317": "Cost",
  "kn-input-field_211": "Recommendation Notes",
};

var fieldsIdsShownOnFieldSelect = {
  // "Field Value": [...ids of fields to show on value select]
  "Construct Turn Lane": [
    "kn-input-field_494",
    "kn-input-field_728",
    "kn-input-field_496",
    "kn-input-field_729",
  ],
};

function hideFormFields() {
  var $fields = $("#view_628").find(".kn-input");

  $fields.each(function (index, field) {
    var fieldId = field.id;

    if (!fieldsIdsShownOnLoad.hasOwnProperty(fieldId) && fieldId) {
      $("#" + fieldId).hide();
    }
  });
}

function showFormFieldsByValue(value) {
  // Un-hide form fields in map
  fieldsIdsShownOnFieldSelect[value].forEach(function (fieldId) {
    $("#" + fieldId).show();
  });
}

$(document).on("knack-view-render.view_628", function (event, view) {
  hideFormFields();

  // Attach event listener to handle change in field_495 select (Improvement)
  $("#view_628-field_495").on("change", function (event) {
    var fieldValue = event.target.value;

    hideFormFields();
    showFormFieldsByValue(fieldValue);
  });
});
