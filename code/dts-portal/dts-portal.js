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
//Create Big Button nested in a block
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

// create large Service Requests button on the home page
$(document).on("knack-view-render.view_127", function(event, page) {
    bigButton("new-service-request", "view_127", "https://atd.knack.com/dts#new-service-request/", "phone-square", "Service Requests");
});

// create large Datasets button on the home page
$(document).on("knack-view-render.view_128", function(event, page) {
    bigButton("datasets", "view_128", "https://atd.knack.com/dts#datasets/", "database", "Datasets");
});

// create large Applications button on the home page
$(document).on("knack-view-render.view_312", function(event, page) {
    bigButton("applications", "view_312", "https://atd.knack.com/dts#applications/", "laptop", "Applications");
});

// create large Knack Directory button on the home page
$(document).on("knack-view-render.view_374", function(event, page) {
    bigButton("knack-directory", "view_374", "https://atd.knack.com/dts#knack-directory/", "asterisk", "Knack Directory");
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
function smallButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
    $( "<a id='" + id + "' class='small-button-container" + disabledClass + " href='" + url + "'" 
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
//Knack Directory Pages
//AMD Data Tracker
$(document).on('knack-scene-render.scene_200', function(event, scene) { 
window.location.replace("https://atd.knack.com/amd");
});
//Bike Benefit Program
$(document).on('knack-scene-render.scene_213', function(event, scene) { 
window.location.replace("https://atd.knack.com/bike-benefit-program");
});
//Finance & Purchasing
$(document).on('knack-scene-render.scene_204', function(event, scene) { 
window.location.replace("https://atd.knack.com/finance-purchasing");
});
//Hiring Resource
$(document).on('knack-scene-render.scene_208', function(event, scene) { 
window.location.replace("https://atd.knack.com/tpw-hire");
});
//Human Resources
$(document).on('knack-scene-render.scene_203', function(event, scene) { 
window.location.replace("https://atd.knack.com/hr");
});
//Office of City Engineer
$(document).on('knack-scene-render.scene_215', function(event, scene) { 
window.location.replace("https://atd.knack.com/oce");
});
//Office of the Director
$(document).on('knack-scene-render.scene_319', function(event, scene) { 
window.location.replace("https://atd.knack.com/ood");
});
//Parking Enterprise
$(document).on('knack-scene-render.scene_212', function(event, scene) { 
window.location.replace("https://atd.knack.com/parking-enterprise");
});
//Right of Way
$(document).on('knack-scene-render.scene_205', function(event, scene) { 
window.location.replace("https://atd.knack.com/row");
});
//Shared Mobility
$(document).on('knack-scene-render.scene_209', function(event, scene) { 
window.location.replace("https://atd.knack.com/smrt");
});
//Signs & Markings
$(document).on('knack-scene-render.scene_202', function(event, scene) { 
window.location.replace("https://atd.knack.com/signs-markings");
});
//Smart Mobility
$(document).on('knack-scene-render.scene_210', function(event, scene) { 
window.location.replace("https://atd.knack.com/smart-mobility");
});
//Street Banners
$(document).on('knack-scene-render.scene_211', function(event, scene) { 
window.location.replace("https://atd.knack.com/street-banners");
});
//Street and Bridge
$(document).on('knack-scene-render.scene_216', function(event, scene) { 
window.location.replace("https://atd.knack.com/sbo");
});
//TPW Forms
$(document).on('knack-scene-render.scene_218', function(event, scene) { 
window.location.replace("https://atd.knack.com/atd-forms");
});
//Traffic Register
$(document).on('knack-scene-render.scene_207', function(event, scene) { 
window.location.replace("https://atd.knack.com/traffic-register");
});
//Transportation Development Services
$(document).on('knack-scene-render.scene_206', function(event, scene) { 
window.location.replace("https://atd.knack.com/development-services");
});
//Urban Forestry
$(document).on('knack-scene-render.scene_214', function(event, scene) { 
window.location.replace("https://atd.knack.com/urban-forestry");
});
