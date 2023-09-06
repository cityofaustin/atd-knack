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
$(document).on("knack-scene-render.scene_257", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_534").hide();
  $("#csr_view").attr("src", iframe_url);
});

$(document).on("knack-scene-render.scene_260", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_547").hide();
  $("#csr_view").attr("src", iframe_url);
});

$(document).on("knack-scene-render.scene_264", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_558").hide();
  $("#csr_view").attr("src", iframe_url);
});

/*********** Provider SMRT Portal ***********/
// create large Get Started button on the Customer RPP Portal page
$(document).on("knack-view-render.view_626", function(event, page) {
  bigButton( "get-started", "view_626", "https://atd.knack.com/smrt#get-started/", "file-text", "Get Started");
});
// create large Am I Eligible button on the Customer RPP Portal page
$(document).on("knack-view-render.view_627", function(event, page) {
  bigButton("eligibility", "view_627", "https://atd.knack.com/smrt#eligibility/", "book", "Eligibility");
});
// create large Help button on the Customer RPP Portal page
$(document).on("knack-view-render.view_628", function(event, page) {
  bigButton("faq", "view_628", "https://atd.knack.com/smrt#faq/", "info-circle", "Help");
});
// create large About the Program button on the Customer RPP Portal page
$(document).on("knack-view-render.view_629", function(event, page) {
  bigButton("about-the-program", "view_629", "https://www.austintexas.gov/page/shared-mobility-regulations-and-license-application", "book", "About the Program");
});

/*********** Get Started page ***********/
// create large Home  button on the Customer SMRT Portal page
$(document).on("knack-view-render.view_875", function(event, page) {
  bigButton( "home", "view_875", "https://atd.knack.com/smrt#portal/", "home", "Home");
});
// create large Required Attachments button on the Customer SMRT Portal, Required Documents page
$(document).on("knack-view-render.view_878", function(event, page) {
  bigButton( "required-documents", "view_878", "https://atd.knack.com/smrt#required-documents/", "files-o", "Required Documents");
});
// create large Start Application button on the Customer SMRT Application page
$(document).on("knack-view-render.view_631", function(event, page) {
  bigButton( "start-application", "view_631", "https://atd.knack.com/smrt#application/", "arrow-right", "Start Application");
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

//Page to disable crumbtrail App Info page
$(document).on("knack-scene-render.scene_336", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Parent Company page
$(document).on("knack-scene-render.scene_337", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Business Information page
$(document).on("knack-scene-render.scene_338", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Past Performance page
$(document).on("knack-scene-render.scene_339", function () {
  disableBreadCrumbsNonAdmin();
});
//Page to disable crumbtrail Fleet Information page
$(document).on("knack-scene-render.scene_340", function () {
  disableBreadCrumbsNonAdmin();
});
