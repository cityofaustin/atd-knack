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

// create large Add New Telework Request button on the home page
$(document).on("knack-view-render.view_96", function(event, page) {
    bigButton("new-telework", "view_96", "https://atd.knack.com/hr#new-telework-request", "plus-circle", "Add New Telework Request");
});
// create large Add Coded Time button on the home page
$(document).on("knack-view-render.view_97", function(event, page) {
    bigButton("add-time", "view_97", "https://atd.knack.com/hr#add-time/", "plus-circle", "Add Coded Time");
});

// create large Employee Logs | District Maintenance button on the home page
$(document).on("knack-view-render.view_760", function(event, page) {
    bigButton("employee-logs-district-maintenance", "view_760", "https://atd.knack.com/hr#manage-employee-logs/manage-dm-logs/?view_774_filters=%5B%5D", "cubes", "District Maintenance");
});
// create large Employee Logs | Pavement Operations button on the home page
$(document).on("knack-view-render.view_761", function(event, page) {
    bigButton("employee-logs-pavement-operations", "view_761", "https://atd.knack.com/hr#manage-employee-logs/manage-pvm-logs/?view_777_filters=%5B%5D", "road", "Pavement Operations");
});
// create large Employee Logs | District Maintenance button on the home page
$(document).on("knack-view-render.view_762", function(event, page) {
    bigButton("employee-logs-utilities-and-structures", "view_762", "https://atd.knack.com/hr#manage-employee-logs/manage-usd-logs/?view_780_filters=%5B%5D", "wrench", "Utilities and Structures");
});
// create large Employee Logs | Logistics button on the home page
$(document).on("knack-view-render.view_827", function(event, page) {
    bigButton("manage-logistic-logs", "view_827", "https://atd.knack.com/hr#manage-employee-logs/manage-logistic-logs/?view_822_filters=%5B%5D", "truck", "Logistics");
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
//Create Small Button nested in a block
function smallButton(id, view_id, url, fa_icon, button_label, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
    $( "<a id='" + id + "' class='back-button" + disabledClass + " href='" + url + 
      "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);

  if (callback) callback();
}

/********************************************/
/******* Auto Populate Add Time Form ********/
/********************************************/
// Add Time Form: Set "Employee Name" to logged in user name
$(document).on("knack-view-render.view_32", function(event, page) {
  var attrs = Knack.getUserAttributes();
  console.log(attrs)
  $('#view_32-field_105').val(attrs.id);
  $('#view_32-field_105').trigger("liszt:updated");
});

/***************************************************************/
/*** Disable the ability to Click/Touch outside a Modal Page ***/
/***************************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
    $('.kn-modal-bg').off('click');
});

/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

//Page to disable crumbtrail in SSPR Details
$(document).on("knack-scene-render.scene_165", function () {
  disableBreadCrumbsNonAdmin();
});
