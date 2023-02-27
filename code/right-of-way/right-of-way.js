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

// create large TCP Projects button on the Home page
$(document).on("knack-view-render.view_31", function(event, page) {
  bigButton("tcp-projects", "view_31", "https://atd.knack.com/row#tcp-projects/", "crop", "TCP Projects");
});
// create large CCM button on the Home page
$(document).on("knack-view-render.view_244", function(event, page) {
  bigButton("ccm", "view_244", "https://atd.knack.com/row#court-case-management/", "briefcase", "Court Case Management");
});
// create large COS Reporting button on the Home page
$(document).on("knack-view-render.view_245", function(event, page) {
  bigButton("cos", "view_245", "https://atd.knack.com/row#cost-of-service-reporting/", "dollar", "COS Reporting");
});

// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_234", function(event, page) {
  bigButton("services", "view_234", "https://atd.knack.com/row#customer-portal/services", "list-ul", "Available Intake Services");
});
// create large ROW Division button on the Customer Portal Home page
$(document).on("knack-view-render.view_237", function(event, page) {
  bigButton("row-division-link", "view_237", "https://www.austintexas.gov/department/right-way-row-management", "bank", "ROW Division", true);
});

/********************************************/
/*********** Large Submit Buttons ***********/
/********************************************/
function largeSubmitButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " submit-button-large-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='submit-button-large" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

// create large Start Application button on the ROW Customer Portal - Services page for TCP
$(document).on("knack-view-render.view_388", function(event, page) {
  largeSubmitButton("tcp-application", "view_388", "https://atd.knack.com/row#new-tcp-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the ROW Customer Portal - Services page for CSWZ
$(document).on("knack-view-render.view_444", function(event, page) {
  largeSubmitButton("cswz-application", "view_444", "https://atd.knack.com/row#new-cswz/", "arrow-right", "Start Request");
});

/****************************************************/
/*** Disable Breadcrumb Navigation Links Function ***/
/****************************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

/***************************************************************/
/*** Disable Breadcrumb Navigation Links for old TCP Application ***/
/***************************************************************/

//TCP Application Project Information page
$(document).on("knack-scene-render.scene_97", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Application Attachments page
$(document).on("knack-scene-render.scene_98", function () {
  disableBreadCrumbsNonAdmin();
});
//Review TCP Application page
$(document).on("knack-scene-render.scene_99", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Information page
$(document).on("knack-scene-render.scene_100", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Attachments page
$(document).on("knack-scene-render.scene_101", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Application Confirmation page
$(document).on("knack-scene-render.scene_102", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for TCP Application ***/
/*******************************************************************/

//New TCP Application page
$(document).on("knack-scene-render.scene_137", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Project Information page
$(document).on("knack-scene-render.scene_138", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Fee Information page
$(document).on("knack-scene-render.scene_148", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Documents page
$(document).on("knack-scene-render.scene_149", function () {
  disableBreadCrumbsNonAdmin();
});
//Finalize TCP Application page
$(document).on("knack-scene-render.scene_150", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Information page
$(document).on("knack-scene-render.scene_151", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Attachments page
$(document).on("knack-scene-render.scene_152", function () {
  disableBreadCrumbsNonAdmin();
});
//TCP Application Confirmation page
$(document).on("knack-scene-render.scene_153", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for TCP Conflict/Shared TCP Request ***/
/*******************************************************************/

//Applicant Information page
$(document).on("knack-scene-render.scene_183", function () {
  disableBreadCrumbsNonAdmin();
});
//Conflicting Party page
$(document).on("knack-scene-render.scene_184", function () {
  disableBreadCrumbsNonAdmin();
});
//Attachments page
$(document).on("knack-scene-render.scene_185", function () {
  disableBreadCrumbsNonAdmin();
});
//Review Request page
$(document).on("knack-scene-render.scene_186", function () {
  disableBreadCrumbsNonAdmin();
});
//Submittal Confirmation page
$(document).on("knack-scene-render.scene_187", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Information page
$(document).on("knack-scene-render.scene_188", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Attachments page
$(document).on("knack-scene-render.scene_189", function () {
  disableBreadCrumbsNonAdmin();
});

/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on("knack-scene-render.any", function (event, scene) {
  $(".kn-modal-bg").off("click");
});
