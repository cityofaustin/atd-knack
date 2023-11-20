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
$(document).on("knack-view-render.view_1664", function(event, page) {
  bigButton("task-board", "view_1664", "https://atd.knack.com/development-services#task-board/", "tasks", "Task Board");
});
// create large TDR Reviews button on the Home page
$(document).on("knack-view-render.view_1269", function(event, page) {
  bigButton("tdr-reviews", "view_1269", "https://atd.knack.com/development-services#home/tdr-reviews/", "list-ul", "TDR Reviews");
});
// create large TIA Reviews button on the Home page
$(document).on("knack-view-render.view_719", function(event, page) {
  bigButton("tia-reviews", "view_719", "https://atd.knack.com/development-services#tia-reviews/", "list-ul", "TIA Reviews");
});
// create large TDA Reviews button on the Home page
$(document).on("knack-view-render.view_724", function(event, page) {
  bigButton("tda-reviews", "view_724", "https://atd.knack.com/development-services#tda-reviews/", "list-ul", "TDA Reviews");
});
// create large Customer Portal button on the Home page
$(document).on("knack-view-render.view_1271", function(event, page) {
  bigButton("customer-portal", "view_1271", "https://atd.knack.com/development-services#customer-portal/", "child", "Customer Portal");
});
// create large TIA Mitigations button on the Home page
$(document).on("knack-view-render.view_1662", function(event, page) {
  bigButton("tia-mitigations", "view_1662", "https://atd.knack.com/development-services#tia-mitigations/", "dollar", "TIA Mitigations");
});
// create large TIA Determinations button on the Home page
$(document).on("knack-view-render.view_721", function(event, page) {
  bigButton("tia-determinations", "view_721", "https://atd.knack.com/development-services#tia-determinations/", "file-text-o", "TIA Determinations");
});
// create large SIF Worksheets button on the Home page
$(document).on("knack-view-render.view_1663", function(event, page) {
  bigButton("sif-worksheets", "view_1663", "https://atd.knack.com/development-services#sif-worksheets/", "calculator", "SIF Worksheets");
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_720", function(event, page) {
  bigButton("account-management", "view_720", "https://atd.knack.com/development-services#account-management/", "users", "Account Management");
});
// create large Viewer Managment button on the Home page
$(document).on("knack-view-render.view_1661", function(event, page) {
  bigButton("viewer-management", "view_1661", "https://atd.knack.com/development-services#viewer-management/", "users", "Viewer Management");
});
// create large Reporting button on the Home page
$(document).on("knack-view-render.view_1270", function(event, page) {
  bigButton("viewer-management", "view_1270", "https://atd.knack.com/development-services#reporting/", "pie-chart", "Reporting");
});


// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_1429", function(event, page) {
  bigButton("available-services", "view_1429", "https://atd.knack.com/development-services#customer-portal/services/", "list-ul", "Available Services");
});

// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home", true);
});
// create large SIF Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1433", function(event, page) {
  bigButton("sif-program-link", "view_1433", "https://www.austintexas.gov/department/street-impact-fee", "road", "SIF Program", true);
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

// create large Start Submittal button on the TDS Customer Portal - Services page for TIA Determinations
$(document).on("knack-view-render.view_1876", function(event, page) {
  largeSubmitButton("start-tia-determination-submittal", "view_1876", "https://atd.knack.com/development-services#tia-determination/", "arrow-right", "Start Submittal");
});
// create large Start Application button on the TDS Customer Portal - Services page for TIA Compliance
$(document).on("knack-view-render.view_1894", function(event, page) {
  largeSubmitButton("start-tia-compliance-application", "view_1894", "https://atd.knack.com/development-services#tia-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for TIA
$(document).on("knack-view-render.view_1870", function(event, page) {
  largeSubmitButton("start-tia-application", "view_1870", "https://atd.knack.com/development-services#tia-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for NTA
$(document).on("knack-view-render.view_1900", function(event, page) {
  largeSubmitButton("start-nta-application", "view_1900", "https://atd.knack.com/development-services#tia-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for TA
$(document).on("knack-view-render.view_1909", function(event, page) {
  largeSubmitButton("start-ta-application", "view_1909", "https://atd.knack.com/development-services#tia-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for ZTA
$(document).on("knack-view-render.view_1904", function(event, page) {
  largeSubmitButton("start-zta-application", "view_1904", "https://atd.knack.com/development-services#tia-application/", "arrow-right", "Start Application");
});
// create large Start Submittal button on the TDS Customer Portal - Services page for SIF Worksheets
$(document).on("knack-view-render.view_1874", function(event, page) {
  largeSubmitButton("start-sif-worksheet-submittal", "view_1874", "https://atd.knack.com/development-services#sif-worksheet-submittal/", "arrow-right", "Start Submittal");
});

/**********************************************************/
/*** Disable Large Trigger buttons from being Clickable ***/
/**********************************************************/
$(document).on('knack-scene-render.any', function(event, view) {
  var $disabledTriggerButton = $(".trigger-button-large-disabled").parent();
  $disabledTriggerButton.removeClass("kn-action-link");
})

/*************************************************************/
/** Convert Case ID fields to UPPERCASE for TIA Application **/
/*************************************************************/
/*TIA Case ID*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_1047').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})
/*TIA Related Case ID*/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_1333').keyup(function(){
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

/********************************************************************/
//TIA Request Type Selection page
$(document).on("knack-scene-render.scene_377", function () {
  disableBreadCrumbsNonAdmin();
});

/*****************************************************************/
/*** Disable Breadcrumb Navigation Links for TIA Determination ***/
/*****************************************************************/

//Determination Information page
$(document).on("knack-scene-render.scene_412", function () {
  disableBreadCrumbsNonAdmin();
});
//Review Determination page
$(document).on("knack-scene-render.scene_413", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Information page
$(document).on("knack-scene-render.scene_414", function () {
  disableBreadCrumbsNonAdmin();
});
//Determination Confirmation page
$(document).on("knack-scene-render.scene_417", function () {
  disableBreadCrumbsNonAdmin();
});
//Determination Document page
$(document).on("knack-scene-render.scene_640", function () {
  disableBreadCrumbsNonAdmin();
});

/**************************************************************************/
/*** Disable Breadcrumb Navigation Links for TIA Compliance Application ***/
/**************************************************************************/

//TIA Applicant Information page
$(document).on("knack-scene-render.scene_381", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Project Information page
$(document).on("knack-scene-render.scene_387", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Required Documents page
$(document).on("knack-scene-render.scene_393", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Review Application page
$(document).on("knack-scene-render.scene_394", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Application Confirmation page
$(document).on("knack-scene-render.scene_397", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Information page
$(document).on("knack-scene-render.scene_395", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Attachments page
$(document).on("knack-scene-render.scene_396", function () {
  disableBreadCrumbsNonAdmin();
});

/********************************************************************/
/*** Disable Breadcrumb Navigation Links for Full TIA Application ***/
/********************************************************************/

//TIA Applicant Information page
$(document).on("knack-scene-render.scene_385", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Project Information page
$(document).on("knack-scene-render.scene_386", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Required Documents page
$(document).on("knack-scene-render.scene_388", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Review Application page
$(document).on("knack-scene-render.scene_389", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Application Confirmation page
$(document).on("knack-scene-render.scene_392", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Information page
$(document).on("knack-scene-render.scene_390", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Attachments page
$(document).on("knack-scene-render.scene_391", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for NTA Application ***/
/*******************************************************************/

//NTA Applicant Information page
$(document).on("knack-scene-render.scene_384", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Project Information page
$(document).on("knack-scene-render.scene_419", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Required Documents page
$(document).on("knack-scene-render.scene_420", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Review Application page
$(document).on("knack-scene-render.scene_421", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Application Confirmation page
$(document).on("knack-scene-render.scene_424", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Edit Information page
$(document).on("knack-scene-render.scene_422", function () {
  disableBreadCrumbsNonAdmin();
});
//NTA Edit Attachments page
$(document).on("knack-scene-render.scene_423", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for TA Application ***/
/*******************************************************************/

//TA Applicant Information page
$(document).on("knack-scene-render.scene_598", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Project Information page
$(document).on("knack-scene-render.scene_606", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Required Documents page
$(document).on("knack-scene-render.scene_607", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Review Application page
$(document).on("knack-scene-render.scene_608", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Application Confirmation page
$(document).on("knack-scene-render.scene_611", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Edit Information page
$(document).on("knack-scene-render.scene_609", function () {
  disableBreadCrumbsNonAdmin();
});
//TA Edit Attachments page
$(document).on("knack-scene-render.scene_610", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for ZTA Application ***/
/*******************************************************************/

//ZTA Applicant Information page
$(document).on("knack-scene-render.scene_599", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Project Information page
$(document).on("knack-scene-render.scene_600", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Required Documents page
$(document).on("knack-scene-render.scene_601", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Review Application page
$(document).on("knack-scene-render.scene_602", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Application Confirmation page
$(document).on("knack-scene-render.scene_605", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Edit Information page
$(document).on("knack-scene-render.scene_603", function () {
  disableBreadCrumbsNonAdmin();
});
//ZTA Edit Attachments page
$(document).on("knack-scene-render.scene_604", function () {
  disableBreadCrumbsNonAdmin();
});

/***********************************************************************/
/*** Disable Breadcrumb Navigation Links for SIF Worksheet Submittal ***/
/***********************************************************************/

//SIF Worksheet Submittal Information page
$(document).on("knack-scene-render.scene_505", function () {
  disableBreadCrumbsNonAdmin();
});
//Review SIF Worksheet Submittal page
$(document).on("knack-scene-render.scene_506", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit Information page
$(document).on("knack-scene-render.scene_507", function () {
  disableBreadCrumbsNonAdmin();
});
//SIF Worksheet Submittal Confirmation page
$(document).on("knack-scene-render.scene_512", function () {
  disableBreadCrumbsNonAdmin();
});
//SIF Worksheet Submittal Document page
$(document).on("knack-scene-render.scene_647", function () {
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

/**************************************************/
/** Add Previous Window Button to specific views **/
/**************************************************/
/* Add Previous Window Button to Customer View, Add, & Edit Pages since we disable breadcrumbs */
$(document).on("knack-view-render.any", function(event, view) {
var appviews=["view_1552","view_1568","view_1544","view_1560","view_1548","view_1563"];
var key=(view.key!=undefined)?view.key.toLowerCase().trim():"";
var l=appviews.length;
for (var x=0; x<l; x++) {

if (appviews[x]==key) {
	$('#'+appviews[x]).prepend("<button id='previous-window-button'><i class='fa fa-arrow-left'/> Previous Window</button>");
	document.getElementById('previous-window-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});

/***********************************/
/**** Reporting Menu Navigation ****/
/***********************************/

function aDropdownMenuItem(recordId, route, iconName, linkName, mobile = false, newTab = false) {
  const buttonClass = mobile ? "tia-button" : "kn-button"
  if (newTab) {
    return (
      `<li class="${buttonClass}">\
        <a href="#reporting/ts-reports/${route}/" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`)
  }

  return (
    `<li class="${buttonClass}">\
      <a href="#reporting/ts-reports/${route}/">\
        <span class="icon is-small"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span>${linkName}</span>\
      </a>\
    </li>`)
}

// Function to toggle "active" class for mobile dropdown menu
// if class is not "active", list is display: none;
$(document).on('click', '.mobile-dropdown-button', function(event) {
  const menuList = $(event.target).siblings()[0]
  $(menuList).toggleClass("active")
  $(event.target).toggleClass("show-icon")
});

/* Reporting Dashboard Page */
$(document).on('knack-view-render.view_2433', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/reporting-dashboard/" data-kn-slug="#reporting-dashboard-menu">\
          <span class="nav-dropdown-link">Reporting</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "reporting-dashboard", "fa-dashboard", "Reporting Dashboard")}\
          ${aDropdownMenuItem(recordId, "reporting-dictionary", "fa-book", "Reporting Dictionary")}\
          ${aDropdownMenuItem(recordId, "tda-reports", "fa-buysellads", "Development Assessment Reports")}\
          ${aDropdownMenuItem(recordId, "tdr-reports", "fa-building", "Developmet Review Reports")}\
          ${aDropdownMenuItem(recordId, "sif-reports", "fa-road", "Street Impact Fee Reports")}\
          ${aDropdownMenuItem(recordId, "tia-determination-reports", "fa-gavel", "TIA Determination Reports")}\
          ${aDropdownMenuItem(recordId, "ts-reports", "fa-car", "Transportation Study Reports")}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_2433")

/* Mobile Reporting Dashboard Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Reporting Dashboard Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "reporting-dashboard", "fa-dashboard", "Reporting Dashboard", true)}\
          ${aDropdownMenuItem(recordId, "reporting-dictionary", "fa-book", "Reporting Dictionary", true)}\
          ${aDropdownMenuItem(recordId, "tda-reports", "fa-buysellads", "Development Assessment Reports", true)}\
          ${aDropdownMenuItem(recordId, "tdr-reports", "fa-building", "Developmet Review Reports", true)}\
          ${aDropdownMenuItem(recordId, "sif-reports", "fa-road", "Street Impact Fee Reports", true)}\
          ${aDropdownMenuItem(recordId, "tia-determination-reports", "fa-gavel", "TIA Determination Reports", true)}\
          ${aDropdownMenuItem(recordId, "ts-reports", "fa-car", "Transportation Study Reports", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_2433")
})

/* Transportation Study Reports Page */
$(document).on('knack-view-render.view_2434', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/ts-cases/" data-kn-slug="#transportation-study-reports-menu">\
          <span class="nav-dropdown-link">Transportation Study Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "ts-cases", "fa-briefcase", "All Cases")}\
          ${aDropdownMenuItem(recordId, "ts-scope-cycles", "fa-crosshairs", "All Scope Cycles")}\
          ${aDropdownMenuItem(recordId, "ts-submission-cycles", "fa-inbox", "All Submission Cycles")}\
          ${aDropdownMenuItem(recordId, "tia-mitigation-reports", "fa-file-text-o", "TIA Mitigations")}\
          ${aDropdownMenuItem(recordId, "tia-work-load-reports", "fa-tasks", "TIA Work Load")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/full-tia-cases/" data-kn-slug="#full-tia-reports-menu">\
          <span class="nav-dropdown-link">Full TIA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "full-tia-cases", "fa-briefcase", "Full TIA Cases")}\
          ${aDropdownMenuItem(recordId, "full-tia-scope-cycles", "fa-crosshairs", "Full TIA Scope Cycles")}\
          ${aDropdownMenuItem(recordId, "full-tia-submission-cycles", "fa-inbox", "Full TIA Submission Cycles")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/compliance-cases/" data-kn-slug="#compliance-reports-menu">\
          <span class="nav-dropdown-link">Compliance Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "compliance-cases", "fa-briefcase", "Compliance Cases")}\
          ${aDropdownMenuItem(recordId, "compliance-cycles", "fa-inbox", "Compliance Cycles")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/nta-cases/" data-kn-slug="#nta-reports-menu">\
          <span class="nav-dropdown-link">NTA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "nta-cases", "fa-briefcase", "NTA Cases")}\
          ${aDropdownMenuItem(recordId, "nta-cycles", "fa-inbox", "NTA Cycles")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/ta-cases/" data-kn-slug="#ta-reports-menu">\
          <span class="nav-dropdown-link">TA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "ta-cases", "fa-briefcase", "TA Cases")}\
          ${aDropdownMenuItem(recordId, "ta-scope-cycles", "fa-crosshairs", "TA Scope Cycles")}\
          ${aDropdownMenuItem(recordId, "ta-submission-cycles", "fa-inbox", "TA Submission Cycles")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/zta-cases/" data-kn-slug="#zta-reports-menu">\
          <span class="nav-dropdown-link">ZTA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${aDropdownMenuItem(recordId, "zta-cases", "fa-briefcase", "ZTA Cases")}\
          ${aDropdownMenuItem(recordId, "zta-cycles", "fa-inbox", "ZTA Cycles")}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_2434")

/* Mobile Transportation Study Reports Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Transportation Study Reports Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "ts-cases", "fa-briefcase", "All Cases", true)}\
          ${aDropdownMenuItem(recordId, "ts-scope-cycles", "fa-crosshairs", "All Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "ts-submission-cycles", "fa-inbox", "All Submission Cycles", true)}\
          ${aDropdownMenuItem(recordId, "tia-mitigation-reports", "fa-file-text-o", "TIA Mitigations", true)}\
          ${aDropdownMenuItem(recordId, "tia-work-load-reports", "fa-tasks", "TIA Work Load", true)}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/full-tia-cases/" data-kn-slug="#full-tia-reports-menu">\
          <span class="nav-dropdown-link">Full TIA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "full-tia-cases", "fa-briefcase", "Full TIA Cases", true)}\
          ${aDropdownMenuItem(recordId, "full-tia-scope-cycles", "fa-crosshairs", "Full TIA Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "full-tia-submission-cycles", "fa-inbox", "Full TIA Submission Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/compliance-cases/" data-kn-slug="#compliance-reports-menu">\
          <span class="nav-dropdown-link">Compliance Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "compliance-cases", "fa-briefcase", "Compliance Cases", true)}\
          ${aDropdownMenuItem(recordId, "compliance-cycles", "fa-inbox", "Compliance Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/nta-cases/" data-kn-slug="#nta-reports-menu">\
          <span class="nav-dropdown-link">NTA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "nta-cases", "fa-briefcase", "NTA Cases", true)}\
          ${aDropdownMenuItem(recordId, "nta-cycles", "fa-inbox", "NTA Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/ta-cases/" data-kn-slug="#ta-reports-menu">\
          <span class="nav-dropdown-link">TA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "ta-cases", "fa-briefcase", "TA Cases", true)}\
          ${aDropdownMenuItem(recordId, "ta-scope-cycles", "fa-crosshairs", "TA Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "ta-submission-cycles", "fa-inbox", "TA Submission Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#reporting/ts-reports/zta-cases/" data-kn-slug="#zta-reports-menu">\
          <span class="nav-dropdown-link">ZTA Reports</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "zta-cases", "fa-briefcase", "ZTA Cases", true)}\
          ${aDropdownMenuItem(recordId, "zta-cycles", "fa-inbox", "ZTA Cycles", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_2434")
})


/*****************************/
/**** TIA Menu Navigation ****/
/*****************************/

function dropdownMenuItem(recordId, route, iconName, linkName, mobile = false, newTab = false) {
  const buttonClass = mobile ? "tia-button" : "kn-button"
  if (newTab) {
    return (
      `<li class="${buttonClass}">\
        <a href="#tia-reviews/tia-case-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`)
  }

  return (
    `<li class="${buttonClass}">\
      <a href="#tia-reviews/tia-case-details/${recordId}/${route}/${recordId}">\
        <span class="icon is-small"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span>${linkName}</span>\
      </a>\
    </li>`)
}

// Function to toggle "active" class for mobile dropdown menu
// if class is not "active", list is display: none;
$(document).on('click', '.mobile-dropdown-button', function(event) {
  const menuList = $(event.target).siblings()[0]
  $(menuList).toggleClass("active")
  $(event.target).toggleClass("show-icon")
});

/* Case Details Page */
$(document).on('knack-view-render.view_744', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/edit-tia-case-details/${recordId}" data-kn-slug="#update-case-details">\
          <span class="nav-dropdown-link">Update Case Details</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "edit-tia-case-details", "fa-edit", "Edit Case Details & Notes")}\
          ${dropdownMenuItem(recordId, "assign-case-reviewers", "fa-users", "Assign Case Reviewers")}\
          ${dropdownMenuItem(recordId, "edit-tia-case-status", "fa-retweet", "Edit Case Status")}\
          ${dropdownMenuItem(recordId, "tia-connect-cases", "fa-link", "Connect Cases")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status", "fa-dollar", "Fees")}\
      ${dropdownMenuItem(recordId, "add-tia-communication", "fa-plus-circle", "Communication")}\
    </ul>\
  </div>`).appendTo("#view_744")

/* Mobile Case Details Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
          Update Case Details Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "edit-tia-case-details", "fa-edit", "Edit Case Details & Notes", true)}\
          ${dropdownMenuItem(recordId, "assign-case-reviewers", "fa-users", "Assign Case Reviewers", true)}\
          ${dropdownMenuItem(recordId, "edit-tia-case-status", "fa-retweet", "Edit Case Status", true)}\
          ${dropdownMenuItem(recordId, "tia-connect-cases", "fa-link", "Connect Cases", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status", "fa-dollar", "Fees", true)}\
      ${dropdownMenuItem(recordId, "add-tia-communication", "fa-plus-circle", "Communication", true)}\
    </ul>\
  </div>`).appendTo("#view_744")
})

/* Case Management Page */
$(document).on('knack-view-render.view_887', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "manage-tia", "fa-child", "Customer's View")}\
    </ul>\
  </div>`).appendTo("#view_887")

/* Mobile Case Management Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "manage-tia", "fa-child", "Customer's View", true)}\
    </ul>\
  </div>`).appendTo("#view_887")
})

/* Mitigation Page */
$(document).on('knack-view-render.view_886', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-mitigation-fee-status", "fa-dollar", "Mitigation Fees")}\
      ${dropdownMenuItem(recordId, "feature-map", "fa-map-marker", "Segment & Intersection Map", false, true)}\
      ${dropdownMenuItem(recordId, "tia-mitigation-reporting", "fa-bar-chart", "Mitigation Reporting")}\
      ${dropdownMenuItem(recordId, "search-tia-mitigations", "fa-search", "Search Mitigations")}\
    </ul>\
  </div>`).appendTo("#view_886")

/* Mobile Mitigation Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-mitigation-fee-status", "fa-dollar", "Mitigation Fees", true)}\
      ${dropdownMenuItem(recordId, "feature-map", "fa-map-marker", "Segment & Intersection Map", true, true)}\
      ${dropdownMenuItem(recordId, "tia-mitigation-reporting", "fa-bar-chart", "Mitigation Reporting", true)}\
      ${dropdownMenuItem(recordId, "search-tia-mitigations", "fa-search", "Search Mitigations", true)}\
    </ul>\
  </div>`).appendTo("#view_886")
})

/* Feature Map Page */
$(document).on('knack-view-render.view_926', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_926")

/* Mobile Feature Map Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_926")
})

/* Scope Submission Details Page */
$(document).on('knack-view-render.view_901', function(event, view, record) {
   // regex: match the 24 digit record id that comes in hash part of url after "/"
  const parentRecordId = window.location.hash.match(/(?<=\/)\d[a-z0-9]{23}/)[0];
  const recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${parentRecordId}/tia-case-management/${parentRecordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-scope-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-scope-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "assign-scope-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
    </ul>\
  </div>`).appendTo("#view_901")

/* Mobile Scope Submission Details Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-scope-submission-review", "fa-play-circle-o", "Begin Review", true)}\
      ${dropdownMenuItem(recordId, "complete-scope-submission-review", "fa-exchange", "Reject/Approve", true)}\
      ${dropdownMenuItem(recordId, "assign-scope-submission-reviewer", "fa-hand-o-up", "Assign Reviewer", true)}\
    </ul>\
  </div>`).appendTo("#view_901")
})

/* Submission Details Page */
$(document).on('knack-view-render.view_902', function(event, view, record) {
   // regex: match the 24 digit record id that comes in hash part of url after "/"
  const parentRecordId = window.location.hash.match(/(?<=\/)\d[a-z0-9]{23}/)[0];
  const recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${parentRecordId}/tia-case-management/${parentRecordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "assign-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
    </ul>\
  </div>`).appendTo("#view_902")

/* Mobile Submission Details Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-submission-review", "fa-play-circle-o", "Begin Review", true)}\
      ${dropdownMenuItem(recordId, "complete-submission-review", "fa-exchange", "Reject/Approve", true)}\
      ${dropdownMenuItem(recordId, "assign-submission-reviewer", "fa-hand-o-up", "Assign Reviewer", true)}\
    </ul>\
  </div>`).appendTo("#view_902")
})

/*************************************************/
/*** Simplify Summary Row on Mitigation Tables ***/
/*************************************************/

function hideSummaryNameMitigationEditTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(5)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

// Change Summary Name for Reviewer Mitigation Tables
$(document).on('knack-scene-render.scene_290', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationEditTable("view_854", "Location Total")
  hideSummaryNameMitigationEditTable("view_857", "Location Total")
  hideSummaryNameMitigationEditTable("view_1595", "Location Total")
})

// Change Summary Name for Mitigation Editor Mitigation Tables
$(document).on('knack-scene-render.scene_528', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationEditTable("view_1693", "Location Total")
  hideSummaryNameMitigationEditTable("view_1699", "Location Total")
  hideSummaryNameMitigationEditTable("view_1704", "Location Total")
})


/**********************************/
/*** Set Mitigation Map Src URL ***/
/**********************************/
/*Mitigations Page*/
/* https://austin.maps.arcgis.com/apps/webappviewer/index.html?id=d7894fc5bfad4fd1a58d45a7d24ba5b2&amp;extent=3094678.394%2C10061058.9844%2C3137345.0607%2C10082992.3178%2C102739&amp;mobileBreakPoint=100 */
$(document).on("knack-scene-render.scene_290", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_960").hide();
});

/*Feature Map Page*/
$(document).on("knack-scene-render.scene_294", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_967").hide();
});

/*Mitigation Editor- Edit Location Information Page*/
$(document).on("knack-scene-render.scene_499", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_1605").hide();
});

/*Mitigation Editor- Add Missing Improvements Page*/
$(document).on("knack-scene-render.scene_528", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_1690").hide();
});

/*Mitigation Editor Backfill- Edit Location Information Page*/
$(document).on("knack-scene-render.scene_616", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_1993").hide();
});

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
//Access Code Page
$(document).on('knack-scene-render.scene_580', function(event, scene) { 
window.location.href = "https://atd.knack.com/development-services#customer-portal/access-case/61e9958f57ad0100231d515e/";
});

//Task Board Page
$(document).on('knack-scene-render.scene_656', function(event, scene) { 
window.location.href = "https://atd.knack.com/development-services#task-board/my-tasks/";
});

/***********************************/
/*** Automatically Submit a Form ***/
/***********************************/
/* Begin TDA Parallel Review Modal */
$(document).on('knack-scene-render.scene_633', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Complete TDA Parallel Review Modal */
$(document).on('knack-scene-render.scene_625', function(event, scene) {
    $('button[type=submit]').submit();
});
