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

// create large Reviewer Dashboard button on the Home page
$(document).on("knack-view-render.view_612", function(event, page) {
  bigButton("reviewer-dashboard", "view_612", "https://atd.knack.com/traffic-register#rd-assigned-work/", "dashboard", "Reviewer Dashboard");
});

// create large Regulation Documents button on the Home page
$(document).on("knack-view-render.view_613", function(event, page) {
  bigButton("regulation-documents", "view_613", "https://atd.knack.com/traffic-register#regulation-documents/", "cubes", "Regulation Documents");
});

// create large Regulations button on the Home page
$(document).on("knack-view-render.view_614", function(event, page) {
  bigButton("regulations", "view_614", "https://atd.knack.com/traffic-register#regulations/", "files-o", "Regulations");
});

// create large Account Management button on the Home page
$(document).on("knack-view-render.view_615", function(event, page) {
  bigButton("account-management", "view_615", "https://atd.knack.com/traffic-register#account-management/", "users", "Account Management");
});

// create large App Administration button on the Home page
$(document).on("knack-view-render.view_616", function(event, page) {
  bigButton("app-administration", "view_616", "https://atd.knack.com/traffic-register#admin/", "gears", "App Administration");
});

/*********************************************/
/*** Convert Sign Type field to UPPERCASE  ***/
/*********************************************/
/*Canvas Regulation Sign Type*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_392').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})

/*Approved Regulation Sign Type*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_100').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})

/*Regulation Backfill Sign Type*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_616').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})

/***********************************************/
/*** Convert Street Name field to UPPERCASE  ***/
/***********************************************/
/*Street - Street Name*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_14').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})

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

/*************************************************************/
/*** Disable Breadcrumb Navigation Links for Reg Doc Draft ***/
/*************************************************************/
/*Draft Reg Doc Builder Page 2*/
$(document).on("knack-scene-render.scene_253", function () {
  disableBreadCrumbsNonAdmin();
});

/*Approved Reg Doc Builder Page 2*/
$(document).on("knack-scene-render.scene_401", function () {
  disableBreadCrumbsNonAdmin();
});

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on('knack-view-render.any', function(event, view, data) {
  $("a.kn-view-asset").html("Attachment"); 
});

/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
  $('.kn-modal-bg').off('click');
});
