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

// create large Task Board button on the Home page
$(document).on("knack-view-render.view_1664", function(event, page) {
  bigButton("task-board", "view_1664", `${APP_URL}#task-board/my-tasks`, "tasks", "Task Board");
});
// create large TDR Reviews button on the Home page
$(document).on("knack-view-render.view_1269", function(event, page) {
  bigButton("tdr-reviews", "view_1269", `${APP_URL}#home/tdr-reviews/`, "list-ul", "TDR Reviews");
});
// create large TIA Reviews button on the Home page
$(document).on("knack-view-render.view_719", function(event, page) {
  bigButton("tia-reviews", "view_719", `${APP_URL}#tia-reviews/`, "list-ul", "TIA Reviews");
});
// create large TDA Reviews button on the Home page
$(document).on("knack-view-render.view_724", function(event, page) {
  bigButton("tda-reviews", "view_724", `${APP_URL}#tda-reviews/`, "list-ul", "TDA Reviews");
});
// create large Customer Portal button on the Home page
$(document).on("knack-view-render.view_1271", function(event, page) {
  bigButton("customer-portal", "view_1271", `${APP_URL}#customer-portal/`, "child", "Customer Portal");
});
// create large TIA Mitigations button on the Home page
$(document).on("knack-view-render.view_1662", function(event, page) {
  bigButton("tia-mitigations", "view_1662", `${APP_URL}#tia-mitigations/`, "dollar", "TIA Mitigations");
});
// create large TIA Determinations button on the Home page
$(document).on("knack-view-render.view_721", function(event, page) {
  bigButton("tia-determinations", "view_721", `${APP_URL}#tia-determinations/`, "file-text-o", "TIA Determinations");
});
// create large SIF Worksheets button on the Home page
$(document).on("knack-view-render.view_1663", function(event, page) {
  bigButton("sif-worksheets", "view_1663", `${APP_URL}#sif-worksheets/`, "calculator", "SIF Worksheets");
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_720", function(event, page) {
  bigButton("account-management", "view_720", `${APP_URL}#account-management/`, "users", "Account Management");
});
// create large Viewer Managment button on the Home page
$(document).on("knack-view-render.view_1661", function(event, page) {
  bigButton("viewer-management", "view_1661", `${APP_URL}#viewer-management/`, "users", "Viewer Management");
});
// create large Reporting button on the Home page
$(document).on("knack-view-render.view_1270", function(event, page) {
  bigButton("reporting", "view_1270", `${APP_URL}#reporting/`, "pie-chart", "Reporting");
});
// create large Reporting button on the Home page
$(document).on("knack-view-render.view_1272", function(event, page) {
  bigButton("sep", "view_1272", `${APP_URL}#sif-encumbrance-projects/`, "certificate", "SIF Encumbrance Projects");
});


// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_1429", function(event, page) {
  bigButton("available-services", "view_1429", `${APP_URL}#customer-portal/services/`, "list-ul", "Available Services");
});

// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home", true);
});
// create large SIF Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1433", function(event, page) {
  bigButton("sif-program-link", "view_1433", "https://www.austintexas.gov/department/street-impact-fee", "road", "SIF Program", true);
});

// create large Task Board button on the Task Board Login page
$(document).on("knack-view-render.view_3019", function(event, page) {
  bigButton("task-board", "view_3019", `${APP_URL}#task-board/my-tasks`, "tasks", "Go to My Tasks");
});

/********************************************/
/*********** Large Submit Buttons ***********/
/********************************************/
function largeSubmitButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  const disabledClass = is_disabled ? " submit-button-large-disabled'" : "'";
  const newTab = target_blank ? " target='_blank'" : "";
  const html = `
    <a id='${id}' 
       class='submit-button-large${disabledClass}' 
       href='${url}'${newTab}>
      <span><i class='fa fa-${fa_icon}'></i></span>
      <span> ${button_label}</span>
    </a>
  `;

  $(`#${view_id}`).append(html);
  if (callback) callback();
}

// create large Start Submittal button on the TDS Customer Portal - Services page for TIA Determinations
$(document).on("knack-view-render.view_1876", function(event, page) {
  largeSubmitButton("start-tia-determination-submittal", "view_1876", `${APP_URL}#tia-determination/`, "arrow-right", "Start Submittal");
});
// create large Start Application button on the TDS Customer Portal - Services page for TIA Compliance
$(document).on("knack-view-render.view_1894", function(event, page) {
  largeSubmitButton("start-tia-compliance-application", "view_1894", `${APP_URL}#tia-application/`, "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for TIA
$(document).on("knack-view-render.view_1870", function(event, page) {
  largeSubmitButton("start-tia-application", "view_1870", `${APP_URL}#tia-application/`, "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for NTA
$(document).on("knack-view-render.view_1900", function(event, page) {
  largeSubmitButton("start-nta-application", "view_1900", `${APP_URL}#tia-application/`, "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for TA
$(document).on("knack-view-render.view_1909", function(event, page) {
  largeSubmitButton("start-ta-application", "view_1909", `${APP_URL}#tia-application/`, "arrow-right", "Start Application");
});
// create large Start Application button on the TDS Customer Portal - Services page for ZTA
$(document).on("knack-view-render.view_1904", function(event, page) {
  largeSubmitButton("start-zta-application", "view_1904", `${APP_URL}#tia-application/`, "arrow-right", "Start Application");
});
// create large Start Submittal button on the TDS Customer Portal - Services page for SIF Worksheets
$(document).on("knack-view-render.view_1874", function(event, page) {
  largeSubmitButton("start-sif-worksheet-submittal", "view_1874", `${APP_URL}#sif-worksheet-submittal/`, "arrow-right", "Start Submittal");
});
// create large Start Request button on the WVR Start page for TPW Waiver Requests
$(document).on("knack-view-render.view_3254", function(event, page) {
  largeSubmitButton("start-wvr", "view_3254", `${APP_URL}#create-wvr/`, "arrow-right", "Start Request");
});
// create large Start Request button on the TDS Customer Portal - Services page for TPW Waiver Requests
$(document).on("knack-view-render.view_2918", function(event, page) {
  largeSubmitButton("start-wvr", "view_2918", `${APP_URL}#wvr-start/`, "arrow-right", "Start Request");
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
function disableBreadcrumbLinks() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

const BREADCRUMB_SCENES = [
  // TIA Request Type Selection
  'scene_377',

  // TIA Determination
  'scene_412', // Determination Information page
  'scene_413', // Review Determination page
  'scene_414', // Edit Information page
  'scene_417', // Determination Confirmation page
  'scene_640', // Determination Document page

  // TIA Compliance Application
  'scene_381', // TIA Applicant Information page
  'scene_387', // TIA Project Information page
  'scene_393', // TIA Required Documents page
  'scene_394', // TIA Review Application page
  'scene_397', // TIA Application Confirmation page
  'scene_395', // TIA Edit Information page
  'scene_396', // TIA Edit Attachments page

  // Full TIA Application
  'scene_385', // TIA Applicant Information page
  'scene_386', // TIA Project Information page
  'scene_388', // TIA Required Documents page
  'scene_389', // TIA Review Application page
  'scene_392', // TIA Application Confirmation page
  'scene_390', // TIA Edit Information page
  'scene_391', // TIA Edit Attachments page

  // NTA Application
  'scene_384', // NTA Applicant Information page
  'scene_419', // NTA Project Information page
  'scene_420', // NTA Required Documents page
  'scene_421', // NTA Review Application page
  'scene_424', // NTA Application Confirmation page
  'scene_422', // NTA Edit Information page
  'scene_423', // NTA Edit Attachments page

  // TA Application
  'scene_598', // TA Applicant Information page
  'scene_606', // TA Project Information page
  'scene_607', // TA Required Documents page
  'scene_608', // TA Review Application page
  'scene_611', // TA Application Confirmation page
  'scene_609', // TA Edit Information page
  'scene_610', // TA Edit Attachments page

  // ZTA Application
  'scene_599', // ZTA Applicant Information page
  'scene_600', // ZTA Project Information page
  'scene_601', // ZTA Required Documents page
  'scene_602', // ZTA Review Application page
  'scene_605', // ZTA Application Confirmation page
  'scene_603', // ZTA Edit Information page
  'scene_604', // ZTA Edit Attachments page

  // Non-TIA Application
  'scene_1019', // Non-TIA Customer Information page
  'scene_1020', // Non-TIA Project Information page
  'scene_1021', // Non-TIA Add Documentation page
  'scene_1022', // Non-TIA Submit page
  'scene_1023', // Non-TIA Edit Information page
  'scene_1024', // Non-TIA Edit Attachments page

  // TPW Waiver Request
  'scene_1025', // WVR Customer Information page
  'scene_1026', // WVR Project Information page
  'scene_1027', // WVR Add Documentation page
  'scene_1028', // WVR Submit page
  'scene_1029', // WVR Edit Information page
  'scene_1030', // WVR Edit Attachments page

  // SWF Assessment
  'scene_817', // SWF Assessment Documents page

  // SIF Assessment
  'scene_819', // SIF Worksheet Documents page
  'scene_820', // Submit SIF Worksheet Submittal page
  'scene_823', // Edit Information page
  'scene_824', // Edit Attachments page
  'scene_821', // SIF Worksheet Submittal Confirmation page
  'scene_822', // SIF Worksheet Submittal Completed Documents page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
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
var appviews=["view_1552","view_1568","view_1544","view_1560"];
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

/******************************************/
/**** Reporting Custom Menu Navigation ****/
/******************************************/

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
  //$("#view_2434").removeClass("kn-menu")

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
          Transportation Study Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "ts-cases", "fa-briefcase", "All Cases", true)}\
          ${aDropdownMenuItem(recordId, "ts-scope-cycles", "fa-crosshairs", "All Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "ts-submission-cycles", "fa-inbox", "All Submission Cycles", true)}\
          ${aDropdownMenuItem(recordId, "tia-mitigation-reports", "fa-file-text-o", "TIA Mitigations", true)}\
          ${aDropdownMenuItem(recordId, "tia-work-load-reports", "fa-tasks", "TIA Work Load", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
            Full TIA Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "full-tia-cases", "fa-briefcase", "Full TIA Cases", true)}\
          ${aDropdownMenuItem(recordId, "full-tia-scope-cycles", "fa-crosshairs", "Full TIA Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "full-tia-submission-cycles", "fa-inbox", "Full TIA Submission Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
            Compliance Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "compliance-cases", "fa-briefcase", "Compliance Cases", true)}\
          ${aDropdownMenuItem(recordId, "compliance-cycles", "fa-inbox", "Compliance Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
            NTA Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "nta-cases", "fa-briefcase", "NTA Cases", true)}\
          ${aDropdownMenuItem(recordId, "nta-cycles", "fa-inbox", "NTA Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
            TA Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "ta-cases", "fa-briefcase", "TA Cases", true)}\
          ${aDropdownMenuItem(recordId, "ta-scope-cycles", "fa-crosshairs", "TA Scope Cycles", true)}\
          ${aDropdownMenuItem(recordId, "ta-submission-cycles", "fa-inbox", "TA Submission Cycles", true)}\
        </ul>\
      </li>\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button">\
          <i class="fa fa-angle-down tia-dropdown" /> \
            ZTA Reports\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${aDropdownMenuItem(recordId, "zta-cases", "fa-briefcase", "ZTA Cases", true)}\
          ${aDropdownMenuItem(recordId, "zta-cycles", "fa-inbox", "ZTA Cycles", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_2434")
})


/********************************************/
/**** TIA Reviews Custom Menu Navigation ****/
/********************************************/

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
      <a href="#tia-reviews/tia-case-details/${recordId}/${route}/${recordId}" class="my-test">\
        <span class="icon is-small" style="color:#163f6e"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span style="color:#163f6e">${linkName}</span>\
      </a>\
    </li>`)
}

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
    </ul>\
  </div>`).appendTo("#view_744")
})

/* Case Details Page for Non-TIA */
$(document).on('knack-view-render.view_3346', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/" data-kn-slug="#mitigation-details">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
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
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status", "fa-dollar", "Fees")}\
    </ul>\
  </div>`).appendTo("#view_3346")

/* Mobile Case Details Page for Non-TIA */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="tia-mobile-menu-list">\
      <li class="tia-mobile-dropdown-menu">\
        <span class="tia-button mobile-dropdown-button"> \
          <i class="fa fa-angle-down tia-dropdown" /> \
          Case Management Menu\
        </span>\
        <ul class="tia-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
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
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status", "fa-dollar", "Fees", true)}\
    </ul>\
  </div>`).appendTo("#view_3346")
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
      ${dropdownMenuItem(recordId, "adjust-ts-scope-cycle-due-date", "fa-calendar", "Adjust Due Date")}\
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
      ${dropdownMenuItem(recordId, "adjust-ts-scope-cycle-due-date", "fa-calendar", "Adjust Due Date", true)}\
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
      ${dropdownMenuItem(recordId, "adjust-ts-submission-cycle-due-date", "fa-calendar", "Adjust Due Date")}\
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
      ${dropdownMenuItem(recordId, "adjust-ts-submission-cycle-due-date", "fa-calendar", "Adjust Due Date", true)}\
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
/*Customer Home Page "https://atd.knack.com/development-services#customer/" */
$(document).on('knack-scene-render.scene_870', function(event, scene) { 
window.location.href = `${APP_URL}#customer-portal/`;
});

/*Access Case Page "https://atd.knack.com/development-services#access-case-redirect/" */
$(document).on('knack-scene-render.scene_580', function(event, scene) { 
window.location.href = `${APP_URL}#customer-portal/access-case/61e9958f57ad0100231d515e/`;
});

/*Task Board Page "https://atd.knack.com/development-services#task-board" */
$(document).on('knack-scene-render.scene_656', function(event, scene) { 
window.location.href = `${APP_URL}#task-board/my-tasks/`;
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
/* Begin SWS Review Modal */
$(document).on('knack-scene-render.scene_761', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Complete SWS Review Modal */
$(document).on('knack-scene-render.scene_760', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Approve SWS Case Modal */
$(document).on('knack-scene-render.scene_810', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Begin TPW Waiver Lead Cycle Review Modal */
$(document).on('knack-scene-render.scene_978', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Begin TPW Waiver PM Cycle Review Modal */
$(document).on('knack-scene-render.scene_985', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Begin TPW Waiver Companion Review Modal */
$(document).on('knack-scene-render.scene_967', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Approve TPW Waiver Case Modal */
$(document).on('knack-scene-render.scene_915', function(event, scene) {
    $('button[type=submit]').submit();
});


/*****************************************************/
/*** "Go to Top" and "Go to Bottom" Scroll buttons ***/
/*****************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {  
  const excludedScenes = ['scene_1', 'scene_2'] // Add scenes where you don't want the buttons to appear
  if (excludedScenes.includes(scene.key)) return
  const isModal = Knack.modals.length != 0
  const markup = 
  `
    <div id="scroll-buttons">
      <button id="go-to-top" class="kn-button">
        <i class="fa fa-arrow-up"></i>
      </button>
      <button id="go-to-bottom" class="kn-button">
        <i class="fa fa-arrow-down"></i>
      </button>
    </div>
  `
  const target = isModal ? '.kn-modal-bg' : `#kn-${Knack.router.current_scene_key}`
  const buttons = isModal ? '.kn-modal-bg #scroll-buttons' : `#kn-${Knack.router.current_scene_key} #scroll-buttons`
  const topButton = isModal ? '.kn-modal-bg #go-to-top' : `#kn-${Knack.router.current_scene_key} #go-to-top`
  const bottomButton = isModal ? '.kn-modal-bg #go-to-bottom' : `#kn-${Knack.router.current_scene_key} #go-to-bottom`
  const hasButtons = $(buttons).length

  if (hasButtons) return
  
  $(target).append(markup)
  const topElement = isModal ? '.kn-modal-bg' : 'html, body'
  
  $(topButton).on('click', function(e) {
    $(topElement).animate({ scrollTop: 0 }, "fast")
  })

  $(bottomButton).on('click', function(e) {
    $(topElement).animate({ scrollTop: $(document).height() }, "fast")
  })

  $(buttons).css('visibility', 'visible')
  const scrollableElement = isModal ? '.kn-modal-bg' : window
  
  $(scrollableElement).on('scroll',function() {
    const scroll = $(scrollableElement).scrollTop()

    if (scroll >= 50) {
      $(buttons).css('visibility', 'visible')
    } else {
      $(buttons).css('visibility', 'hidden')
    }
  })
})


/*****************************************************/
/********** Viewport buttons for Task Board **********/
/*****************************************************/
$(document).on('knack-scene-render.scene_657', function(event, scene) {
  // Remove previous button container if it exists (useful if navigating back and forth)
  $('#viewport-button-container').remove();

  // Find the target scene element
  const $sceneElement = $('#kn-scene_657');

  if ($sceneElement.length) {
    // Find all kn-table.kn-view elements within the scene, excluding view_2679
    const $tableViews = $sceneElement.find('.kn-table.kn-view').not('#view_2679');

    // Create a new container for the buttons
    const $buttonContainer = $('<div>').attr('id', 'viewport-button-container');

    // Style the button container
    $buttonContainer.css({
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '90%', // Limit width to 80%
      display: 'flex',
      justifyContent: 'flex-start', // Start the buttons in the bottom left
      padding: '10px',
      boxSizing: 'border-box',
      zIndex: '1000', // Ensure the buttons are on top
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a background for better visibility
      overflowX: 'auto', // Add horizontal scrolling if too many buttons
      whiteSpace: 'nowrap' // Prevent wrapping
    });

    // Create buttons for each table view
    $tableViews.each(function(index) {
      const $tableView = $(this);
      const button = document.createElement('button'); // Using plain JS for element creation is fine here

      // Find the h2.kn-title element within the table view
      const $knTitle = $tableView.find('.view-header h2.kn-title');
      const buttonText = $knTitle.length ? $knTitle.text().trim() : $tableView.attr('id') || 'Table View'; // Use kn-title text or ID

      button.textContent = buttonText;

      // Style the button
      $(button).css({
        backgroundColor: '#163f6e',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginRight: index < $tableViews.length - 1 ? '5px' : '0' // Add 5px margin to all but the last button
      });

      // Add scroll functionality
      $(button).on('click', function() {
        $('html, body').animate({
          scrollTop: $tableView.offset().top
        }, 500); // Smooth scroll duration in milliseconds
      });

      $buttonContainer.append(button);
    });

    // Append the container to the body
    $('body').append($buttonContainer);
  } else {
    console.log('Scene #kn-scene_657 not found during render event.');
  }
});

/* Hide Viewport Container when switching scene from Task Board */
$(document).on('knack-scene-render.any', function(event, scene) {
  if (scene.key !== 'scene_657') {
    $('#viewport-button-container').remove();
  }
});

/********************************************************************/
/* Generates a Strong Random Password for Internal Account Creation */
/********************************************************************/
function generatePassword() {
  const PASSWORD_LENGTH = 20;
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SPECIAL = "!@#$%&*^"; //  `(` and `)` are not special chars according to Knack
  const ALL_CHARS = LOWER + UPPER + NUMBERS + SPECIAL;
  /*
   * Generates a cryptographically secure random integer between 0 and max (inclusive) using rejection sampling to avoid modulo bias.
   * Must be between 0 and 255 since this uses Uint8Array with 255 as the max value and excludes integers greater than max
   */
  function getRandomInt(max) {
    let int = null;
    do {
      const randomIntArray = new Uint8Array(1);
      crypto.getRandomValues(randomIntArray);
      int = randomIntArray[0];
    } while (int !== null && int > max);
    return int;
  }
  // Make sure password contains all required character types
  function hasAllCharacterTypes(password) {
    const pwArray = password.split("");
    const hasLower = pwArray.some((char) => LOWER.includes(char));
    const hasUpper = pwArray.some((char) => UPPER.includes(char));
    const hasNumber = pwArray.some((char) => NUMBERS.includes(char));
    const hasSpecial = pwArray.some((char) => SPECIAL.includes(char));
    return hasLower && hasUpper && hasNumber && hasSpecial;
  }
  // Loop until a valid password is generated
  let password = "";
  do {
    password = "";
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      password += ALL_CHARS[getRandomInt(ALL_CHARS.length - 1)];
    }
  } while (!hasAllCharacterTypes(password));
  return password;
}

// Load Password for Internal Account Creation form
$(document).on("knack-view-render.view_46", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});

// Load Password for Viewer Account Creation form
$(document).on("knack-view-render.view_1591", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});

