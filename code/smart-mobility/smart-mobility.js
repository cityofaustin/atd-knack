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
/**
 * Template and append a button link, disable it optionally, and invoke a callback function argument
 * @parameter {string} id - id attribute of the a tag in the button link
 * @parameter {string} view_id - Knack view id to append button link to
 * @parameter {string} url - Destination to navigate to on click
 * @parameter {string} fa_icon - Icon string (https://support.knack.com/hc/en-us/articles/226165208-Working-with-Icons#2-complete-list-of-icons)
 * @parameter {bool} isDisabled - Is button disabled (defaults to false)
 * @parameter {function} callback - Function that is invoked after appending the button link
 **/
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
	//>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large button on the home page
    bigButton('metrobike-employee-benefit', 'view_16', "https://atd.knack.com/smart-mobility#metrobike-employee-benefit/", "bicycle", "MetroBike Employee Benefit");
});


	//>>>LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_410', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-eoi', 'view_410', "https://atd.knack.com/smart-mobility#living-streets-eoi/", "street-view", "Healthy Streets or Play Streets");
});
	//>>>LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_411', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-login', 'view_411', "https://www.austintexas.gov/department/neighborhood-block-parties", "users", "Block Party");
});

	//>>>LIVING STREETS GETTING STARTED PAGE draft 1
$(document).on('knack-view-render.view_451', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-login', 'view_451', "https://www.austintexas.gov/LivingStreets", "home", "Return to Living Streets Home");
});
	//>>>LIVING STREETS GETTING STARTED PAGE draft 2
$(document).on('knack-view-render.view_450', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-getting-started', 'view_450', "https://atd.knack.com/smart-mobility#living-streets-eoi/", "arrow-right", "Start Expression of Interest");
});

/*******************************************/
/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

//LS Timeframe
$(document).on("knack-scene-render.scene_188", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Finalize and Submit
$(document).on("knack-scene-render.scene_206", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Confirmation
$(document).on("knack-scene-render.scene_208", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Finalize and Submit
$(document).on("knack-scene-render.scene_209", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Confirmation
$(document).on("knack-scene-render.scene_211", function () {
  disableBreadCrumbsNonAdmin();
});

//LS Timeframe NEW
$(document).on("knack-scene-render.scene_276", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Finalize and Submit NEW
$(document).on("knack-scene-render.scene_277", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Confirmation NEW
$(document).on("knack-scene-render.scene_280", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Finalize and Submit NEW
$(document).on("knack-scene-render.scene_281", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Confirmation NEW
$(document).on("knack-scene-render.scene_284", function () {
  disableBreadCrumbsNonAdmin();
});
