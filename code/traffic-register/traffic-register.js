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
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

// create large Task Board button on the Home page
$(document).on("knack-view-render.view_612", function(event, page) {
  bigButton("task-board", "view_612", "https://atd.knack.com/traffic-register#task-board/my-tasks/", "tasks", "My Task Board");
});

// create large Search Approved Regulations button on the Home page
$(document).on("knack-view-render.view_613", function(event, page) {
  bigButton("search-regulations", "view_613", "https://atd.knack.com/traffic-register#approved-regulations/", "search", "Search for Approved Regulations");
});

// create large Search Regulation Documents button on the Home page
$(document).on("knack-view-render.view_614", function(event, page) {
  bigButton("search-documents", "view_614", "https://atd.knack.com/traffic-register#regulation-documents/", "search", "Search for Regulation Documents");
});

// create large PDF Search button on the Home page
$(document).on("knack-view-render.view_615", function(event, page) {
  bigButton("pdf-search", "view_615", "https://atd.knack.com/traffic-register#pdf-search/", "red fa-file-pdf-o", "PDF Search");
});

/*
// create large Usability Survey button on the Usability Sign Up page
$(document).on("knack-view-render.view_1130", function(event, page) {
  bigButton("usability-survey", "view_1130", "https://forms.office.com/g/C1sagRCRtk", "flask", "Usability Survey", true);
});
*/

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

/********************************************/
/************* Trigger Buttons **************/
/********************************************/
function triggerButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " trigger-button'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
    $( "<a id='" + id + "' class='trigger-button" + disabledClass + " href='" + url + "'" 
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

/******************************************/
/*** Convert Field Inputs to UPPERCASE  ***/
/******************************************/
/*Canvas Regulation object - Sign Type*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_392").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Approved Regulation object - Sign Type*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_100").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Street object - Street Name*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_14").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Regulation Type object - Reg Type Code*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_85").keyup(function () {
    this.value = this.value.toUpperCase();
  });
});
/*Regulation Type object - Code Section*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_87").keyup(function () {
    this.value = this.value.toUpperCase();
  });
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

/*************************************************************/
/*** Disable Breadcrumb Navigation Links for Draft Builder ***/
/*************************************************************/
/*Drafting Page*/
$(document).on("knack-scene-render.scene_698", function () {
  disableBreadCrumbsNonAdmin();
});

/*Add Regulations Page*/
$(document).on("knack-scene-render.scene_699", function () {
  disableBreadCrumbsNonAdmin();
});

/*Save Draft Page*/
$(document).on("knack-scene-render.scene_707", function () {
  disableBreadCrumbsNonAdmin();
});

/*Submit Draft Page*/
$(document).on("knack-scene-render.scene_708", function () {
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
$(document).on("knack-scene-render.any", function () {
  $(".kn-modal-bg").off("click");
});

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
//Task Board Page
$(document).on('knack-scene-render.scene_435', function(event, scene) { 
window.location.href = "https://atd.knack.com/traffic-register#task-board/my-tasks/";
});

/*************************/
/*** Auto Submit Forms ***/
/*************************/
/* Auto Submit Page 2 of Draft Builder */
$(document).on('knack-scene-render.scene_698', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit TE Approve Modal of Draft Review */
$(document).on('knack-scene-render.scene_681', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit CTE Approve Modal of Draft Review */
$(document).on('knack-scene-render.scene_682', function(event, scene) {
    $('button[type=submit]').submit();
});

/*********************************************/
/*** Hide Top Navigation for Draft Builder ***/
/*********************************************/
/*Drafting*/
$(document).on('knack-scene-render.scene_698', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Add Regulations*/
$(document).on('knack-scene-render.scene_699', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Submit Draft*/
$(document).on('knack-scene-render.scene_707', function(event, scene) {
    $('#kn-app-menu').hide()
});
/*Save Draft*/
$(document).on('knack-scene-render.scene_708', function(event, scene) {
    $('#kn-app-menu').hide()
});

/*********************************************/
/************** PDF Button link **************/
/*********************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
  $(".kn-detail.field_1729 a").addClass("pbi-link");                      /*Add CSS Class pbi-link to child anchor*/
  $(".kn-detail.field_1729").wrap("<div class='pbi-link-button'></div>"); /*Wrap the div with div class pbi-link-button*/
  $(".pbi-link-button").click(function(){                                 /*Add click event to the new div*/
	  window.open($(this).find("a").attr("href"), '_blank');                /*Click event uses link from child anchor & opens in new tab*/
		return false;
	});
});

$(document).on('knack-scene-render.any', function(event, scene) {
  $(".kn-detail.field_1778 a").addClass("sp-link");                      /*Add CSS Class sp-link to child anchor*/
  $(".kn-detail.field_1778").wrap("<div class='sp-link-button'></div>"); /*Wrap the div with div class sp-link-button*/
  $(".sp-link-button").click(function(){                                 /*Add click event to the new div*/
	  window.open($(this).find("a").attr("href"), '_blank');               /*Click event uses link from child anchor & opens in new tab*/
		return false;
	});
});
