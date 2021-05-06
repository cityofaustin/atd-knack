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
function bigButton(id, view_id, url, fa_icon, button_label, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + 
      "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);

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

// create large My Equipment button on the home page
$(document).on("knack-view-render.view_146", function(event, page) {
    bigButton("equipment", "view_146", "https://atd.knack.com/dts#my-equipment/", "desktop", "My Equipment");
});

// create large Applications button on the home page
$(document).on("knack-view-render.view_312", function(event, page) {
    bigButton("applications", "view_312", "https://atd.knack.com/dts#applications/", "laptop", "Applications");
});

// create large Technician Equipment Tracker button on the home page
$(document).on("knack-view-render.view_176", function(event, page) {
    bigButton("all", "view_176", "https://atd.knack.com/dts#technician-equipment-tracker/", "wrench", "Technician Equipment Tracker");
});

/********************************************/
/********* Click Event / Selector ***********/
/********************************************/
function setClickEvent(divId, func, param1, param2) {
  // TODO make these args less weird
  $("#" + divId).click(function(){
    func(param1, param2);
  })
}

function showHideElements(showSelector, hideSelector) {
  $(showSelector).show();
  $(hideSelector).hide();
}
