// Setting constant variable to this app URL
const APP_URL = `https://atd.knack.com/${Knack.app.attributes.slug}`;

/********************************************/
/******** COACD Single Sign On Login ********/
/********************************************/
function customizeLoginButton(viewId) {
  // Hide Knack default SSO button, login form, login title, and any other children
  $("#" + viewId)
    .children()
    .hide();

  var url = Knack.url_base + Knack.scene_hash + "auth/COACD";

  // Create a div for Login buttons
  var $coacdButton = $("<div/>", {
    id: "coacd-button-login"
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

/********************************************/
/*************** Big Buttons ****************/
/********************************************/
// Adds big button HTML directly on View id
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  const disabledClass = is_disabled ? " big-button-disabled'" : "'";
  const newTab = target_blank ? " target='_blank'" : "" ;
  const html = `
    <a id='${id}' 
       class='big-button-container${disabledClass}' 
       href='${url}'${newTab}>
      <span><i class='fa fa-${fa_icon}'></i></span>
      <span> ${button_label}</span>
    </a>
  `;

  $(`#${view_id}`).append(html);
  if (callback) callback();
}

   //HOME TAB BUTTONS - New Button Format
$(document).on("knack-view-render.view_125", function(event, page) {
    bigButton("revenue-tracking", "view_125", `${APP_URL}#home/revenue-tracking/`, "usd", "Revenue Tracking");
});

$(document).on("knack-view-render.view_126", function(event, page) {
    bigButton("parking-citation-tracking", "view_126", `${APP_URL}#home/parking-citation-tracking/`, "exclamation-triangle", "Parking Citation Tracking");
});

$(document).on("knack-view-render.view_127", function(event, page) {
    bigButton("officer-citation-tracking", "view_127", `${APP_URL}#home/officer-citation-tracking/`, "exclamation-circle", "Officer Citation Tracking");
});

/****************************************************/
/*** Disable Breadcrumb Navigation Links Function ***/
/****************************************************/
function disableBreadcrumbLinks() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

const BREADCRUMB_SCENES = [
  // Event Support
  'scene_298', // Multi Day Request page
  'scene_299', // Daily Details page
  'scene_300', // Confirmation page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
});

/********************************************/
/***************** Iframes ******************/
/********************************************/
$(document).on("knack-scene-render.scene_113", function (event, page) {
  // CSR issue - signs details
  // update iframe src from detail field
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#csr_view").attr("src", iframe_url);
  // hide the url vield, we don't need it after extracting the value
  $("#view_194").hide();
});

$(document).on("knack-scene-render.scene_185", function (event, page) {
  // CSR issue - signs details
  // update iframe src from detail field
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#csr_view").attr("src", iframe_url);
  // hide the url vield, we don't need it after extracting the value
  $("#view_354").hide();
});

/********************************************/
/*************** Color Mapping **************/
/********************************************/
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

// Change table data background colors My Assignments | My Status
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
  "Available": { background_color: "#80d07e", color: "#fff" },
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
};

// Color map for My Assignments | My Status highlighting
var colorMapServiceRequestsStatus = {
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
};

$(document).on("knack-scene-render.any", function() {
  //  My Assignments | My Status
  changeFieldColor(".field_236", colorMapOne);
});

