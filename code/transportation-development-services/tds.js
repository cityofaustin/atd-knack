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

// create large Reviewer Dashboard button on the Home page
$(document).on("knack-view-render.view_55", function(event, page) {
  bigButton("reviewer-dashboard", "view_55", "https://atd.knack.com/development-services#reviewer-dashboard/", "dashboard", "Reviewer Dashboard");
});
// create large Development Reviews button on the Home page
$(document).on("knack-view-render.view_15", function(event, page) {
  bigButton("development-reviews", "view_15", "https://atd.knack.com/development-services#home/development-reviews/", "list-ul", "Development Reviews");
});
// create large TIA Reviews button on the Home page
$(document).on("knack-view-render.view_719", function(event, page) {
  bigButton("tia-reviews", "view_719", "https://atd.knack.com/development-services#tia-reviews/", "list-ul", "TIA Reviews");
});
// create large TDA Reviews button on the Home page
/*$(document).on("knack-view-render.view_724", function(event, page) {
  bigButton("tda-reviews", "view_724", "https://atd.knack.com/development-services#tda-reviews/", "list-ul", "Pre-Assessment Reviews");
});*/
// create large Advanced Search button on the Home page
$(document).on("knack-view-render.view_56", function(event, page) {
  bigButton("advanced-search", "view_56", "https://atd.knack.com/development-services#advanced-search/", "search", "Advanced Search");
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_720", function(event, page) {
  bigButton("account-management", "view_720", "https://atd.knack.com/development-services#account-management/", "gears", "Account Management");
});
// create large Reviewer Help button on the Home page
$(document).on("knack-view-render.view_721", function(event, page) {
  bigButton("reviewer-help", "view_721", "https://atd.knack.com/development-services#reviewer-help/", "question", "Reviewer Help");
});


// create large Search Reviews button on the Advanced Search page
$(document).on("knack-view-render.view_60", function(event, page) {
  bigButton("search-reviews", "view_60", "https://atd.knack.com/development-services#search-reviews/", "search", "Search | Reviews");
});
// create large Search Comments button on the Advanced Search page
$(document).on("knack-view-render.view_61", function(event, page) {
  bigButton("search-comments", "view_61", "https://atd.knack.com/development-services#search-comments/", "search", "Search | Comments");
});


// create large Start TIA Application button on the TIA Portal page
$(document).on("knack-view-render.view_112", function(event, page) {
  bigButton("tia-application", "view_112", "https://atd.knack.com/development-services#tia-applicant-information/", "arrow-right", "Start TIA Application");
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

// create small Staff Login button on the TIA Portal page
$(document).on("knack-view-render.view_948", function(event, page) {
  smallButton("tds-staff-login", "view_948", "https://atd.knack.com/development-services#home", "lock", "TDS Staff Login");
});

/**********************************************************/
/*** Disable Large Trigger buttons from being Clickable ***/
/**********************************************************/
$(document).on('knack-scene-render.any', function(event, view) {
  var $disabledTriggerButton = $(".trigger-button-large-disabled").parent();
  $disabledTriggerButton.removeClass("kn-action-link");
})

/************************************************************/
/** Convert Case ID field to UPPERCASE for TIA Application **/
/************************************************************/
$(document).on('knack-page-render.any', function(event, page) {
  $('input#field_165').keyup(function(){
    this.value = this.value.toUpperCase();
  });
})

/******************************************************************/
/** Disable Breadcrumb Navigation Links for TIA Case Status page **/
/******************************************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}
//TIA Case Details page
$(document).on("knack-scene-render.scene_58", function () {
  disableBreadCrumbsNonAdmin();
});
//View TIA Submission Details page
$(document).on("knack-scene-render.scene_194", function () {
  disableBreadCrumbsNonAdmin();
});
//Add TIA Submission Attachments page
$(document).on("knack-scene-render.scene_228", function () {
  disableBreadCrumbsNonAdmin();
});
//View TIA Scope Submission Details page
$(document).on("knack-scene-render.scene_214", function () {
  disableBreadCrumbsNonAdmin();
});
//Add TIA Scope Submission Attachments page
$(document).on("knack-scene-render.scene_213", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit TIA Submission Attachment page
$(document).on("knack-scene-render.scene_230", function () {
  disableBreadCrumbsNonAdmin();
});
//Edit TIA Scope Submission Attachment page
$(document).on("knack-scene-render.scene_231", function () {
  disableBreadCrumbsNonAdmin();
});

/***************************************************************/
/*** Disable Breadcrumb Navigation Links for TIA Application ***/
/***************************************************************/

//TIA Applicant Information page
$(document).on("knack-scene-render.scene_166", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Project Information page
$(document).on("knack-scene-render.scene_167", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Required Documents page
$(document).on("knack-scene-render.scene_176", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Review Application page
$(document).on("knack-scene-render.scene_177", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Application Confirmation page
$(document).on("knack-scene-render.scene_178", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Information page
$(document).on("knack-scene-render.scene_179", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Attachments page
$(document).on("knack-scene-render.scene_181", function () {
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
var appviews=["view_601","view_602","view_604","view_605","view_612","view_613"];
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

/************************************/
/**** Save TIA Knack Record ID ****/
/************************************/
// Function to Save Record ID
function saveRecordId(recordId) {
  $.ajax({
    url: "https://api.knack.com/v1/pages/scene_269/views/view_740/records/" + recordId, // Scene/View of Second Form
    type: "PUT", 
    headers: {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-Key": `knack`,
      "Authorization": Knack.getUserToken(),
      "ContentType": "application/json"
    },
    data: {
      field_824 : recordId, // Store Record ID in Knack Record ID field on TIA Request object
    },
    tryCount: 0,
    retryLimit: 3,
    success: function(response) {
      console.log("Captured Record ID"); // Success Message in Console
      Knack.hideSpinner();
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      this.tryCount++;
      let tryCount = this.tryCount, retryLimit = this.retryLimit, seconds; 
      if (tryCount <= retryLimit) { //try again
        switch(tryCount) {
          case 1:
          case 2: seconds = 5; break;
          case 3: seconds = 10; break; }
        let timeout = seconds * 1000;
        console.log("Error: " + XMLHttpRequest.status + " " + XMLHttpRequest.statusText + "\nRetry Count: " + tryCount + "\nRetrying in " + seconds + " seconds")
        let ajaxObject = this;
        window.setTimeout(function(){
          $.ajax(ajaxObject);
        }, timeout);
      } else {
        console.log("Failed to Capture Record ID"); // Failure Message in Console
      }
    }
  });
}

// Listen for record creation (TIA Request Application Submit / First Form)
$(document).on('knack-record-create.view_393', function(event, view, record) {
  const recordId = record.id;
  console.log('CREATE')
  saveRecordId(recordId);
});

/*
$(document).on('knack-form-submit.view_393', function(event, view, record) {
  console.log('SUBMIT')
});
*/

// This is the Second Form.
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_740', function (event, view, record) {
  $('#' + view.key).remove(); 
});

/*************************************/
/**** TIA Menu Buttons Navigation ****/
/*************************************/

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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
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
          ${dropdownMenuItem(recordId, "connected-cases", "fa-link", "Connect Cases")}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
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
          ${dropdownMenuItem(recordId, "connected-cases", "fa-link", "Connect Cases", true)}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "tia-submissions-reporting", "fa-bar-chart", "Submissions Reporting")}\
      ${dropdownMenuItem(recordId, "tia-case-status", "fa-child", "Customer's View")}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "tia-submissions-reporting", "fa-bar-chart", "Submissions Reporting", true)}\
      ${dropdownMenuItem(recordId, "tia-case-status", "fa-child", "Customer's View", true)}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-mitigation-fee-status", "fa-dollar", "Mitigation Fees")}\
      ${dropdownMenuItem(recordId, "feature-map", "fa-road", "Segment & Intersection Map", false, true)}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-mitigation-fee-status", "fa-dollar", "Mitigation Fees", true)}\
      ${dropdownMenuItem(recordId, "feature-map", "fa-road", "Segment & Intersection Map", true, true)}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_926")
})


/* Memo Details Page */
$(document).on('knack-view-render.view_889', function(event, view, record) {
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
        ${dropdownMenuItem(recordId, "send-final-memo", "fa-envelope", "Send Final Memo")}\
      </li>\
    </ul>\
  </div>`).appendTo("#view_889")

/* Mobile Memo Details Page */
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "send-final-memo", "fa-envelope", "Send Final Memo", true)}\
    </ul>\
  </div>`).appendTo("#view_889")
})

/* Case Log Page */
$(document).on('knack-view-render.view_893', function(event, view, record) {
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_893")

/* Mobile Case Log Page */
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
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_893")
})

/* Scope Submission Details Page */
$(document).on('knack-view-render.view_901', function(event, view, record) {
   // regex: match the 24 digit record id that comes in hash part of url after "/"
  const parentRecordId = window.location.hash.match(/(?<=\/)\d[a-z0-9]{23}/)[0];
  const recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(parentRecordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-scope-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-scope-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "assign-scope-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
      ${dropdownMenuItem(recordId, "scope-submission-change-log", "fa-list-ol", "Submission Log")}\
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
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-scope-submission-review", "fa-play-circle-o", "Begin Review", true)}\
      ${dropdownMenuItem(recordId, "complete-scope-submission-review", "fa-exchange", "Reject/Approve", true)}\
      ${dropdownMenuItem(recordId, "assign-scope-submission-reviewer", "fa-hand-o-up", "Assign Reviewer", true)}\
      ${dropdownMenuItem(recordId, "scope-submission-change-log", "fa-list-ol", "Submission Log", true)}\
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
        <a href="#tia-reviews/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(parentRecordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(parentRecordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(parentRecordId, "tia-memo-details", "fa-medium", "Memo Details")}\
          ${dropdownMenuItem(parentRecordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "assign-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
      ${dropdownMenuItem(recordId, "submission-change-log", "fa-list-ol", "Submission Log")}\
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
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions", true)}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations", true)}\
          ${dropdownMenuItem(recordId, "tia-memo-details", "fa-medium", "Memo Details", true)}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "begin-submission-review", "fa-play-circle-o", "Begin Review", true)}\
      ${dropdownMenuItem(recordId, "complete-submission-review", "fa-exchange", "Reject/Approve", true)}\
      ${dropdownMenuItem(recordId, "assign-submission-reviewer", "fa-hand-o-up", "Assign Reviewer", true)}\
      ${dropdownMenuItem(recordId, "submission-change-log", "fa-list-ol", "Submission Log", true)}\
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

// Change Summary Name for Edit Mitigation Tables
$(document).on('knack-scene-render.scene_290', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationEditTable("view_854", "Location Total")
  hideSummaryNameMitigationEditTable("view_857", "Location Total")
})

/**************************************************************/
/*** Simplify Summary Row on Memo Details Mitigation Tables ***/
/**************************************************************/

function hideSummaryNameMitigationMemoTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(1)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

// Change Summary Name for Edit Mitigation Tables
$(document).on('knack-scene-render.scene_248', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationMemoTable("view_964", "Location Total")
  hideSummaryNameMitigationMemoTable("view_965", "Location Total")
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
