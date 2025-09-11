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

// create large Task Board button on the Home page
$(document).on("knack-view-render.view_644", function(event, page) {
  bigButton("task-board", "view_644", "https://atd.knack.com/row#task-board/", "tasks", "Task Board");
});
// create large Customer Portal button on the Home page
$(document).on("knack-view-render.view_645", function(event, page) {
  bigButton("row-portal", "view_645", "https://atd.knack.com/row#portal-home/", "child", "Customer Portal");
});
// create large Customer Home button on the Home page
$(document).on("knack-view-render.view_1087", function(event, page) {
  bigButton("customer-login", "view_1087", "https://atd.knack.com/row#customer/", "unlock-alt", "Customer Login");
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_646", function(event, page) {
  bigButton("account-management", "view_646", "https://atd.knack.com/row#account-management/", "users", "Manage Internal Accounts");
});
// create large Manage Customer Accounts button on the Home page
$(document).on("knack-view-render.view_1086", function(event, page) {
  bigButton("manage-customers", "view_1086", "https://atd.knack.com/row#app-admin/manage-customers/", "user", "Manage Customer Accounts");
});
// create large TCP Projects button on the Home page
$(document).on("knack-view-render.view_31", function(event, page) {
  bigButton("tcp-projects", "view_31", "https://atd.knack.com/row#tcp-projects/", "briefcase", "TCP Projects");
});
// create large CCM button on the Home page
$(document).on("knack-view-render.view_244", function(event, page) {
  bigButton("ccm", "view_244", "https://atd.knack.com/row#court-case-management/", "suitcase", "Court Case Management");
});
// create large COS Reporting button on the Home page
$(document).on("knack-view-render.view_245", function(event, page) {
  bigButton("cos", "view_245", "https://atd.knack.com/row#cost-of-service-data/", "dollar", "Cost of Service Data");
});
// create large CSWZ button on the Home page
$(document).on("knack-view-render.view_451", function(event, page) {
  bigButton("tcp-cswz", "view_451", "https://atd.knack.com/row#tcp-cswz/", "files-o", "Conflict/Shared Requests");
});

// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_234", function(event, page) {
  bigButton("services", "view_234", "https://atd.knack.com/row#customer-portal/services", "list-ul", "Available Services");
});
// create large Available Services button on the ROW Portal page
$(document).on("knack-view-render.view_681", function(event, page) {
  bigButton("all-services", "view_681", "https://atd.knack.com/row#portal-home/all-services", "list-ul", "Available Services");
});
// create large Available Services button on the Customer Home page
$(document).on("knack-view-render.view_1117", function(event, page) {
  bigButton("customer-services", "view_1117", "https://atd.knack.com/row#customer/customer-services", "list-ul", "Available Services");
});
// create large ROW Division button on the Customer Portal Home page
$(document).on("knack-view-render.view_237", function(event, page) {
  bigButton("row-division-link", "view_237", "https://www.austintexas.gov/department/right-way-row-management", "bank", "ROW Division", true);
});
// create large ROW Division button on the ROW Portal page
$(document).on("knack-view-render.view_684", function(event, page) {
  bigButton("row-division-link", "view_684", "https://www.austintexas.gov/department/right-way-row-management", "bank", "ROW Division", true);
});
// create large ROW Division button on the Customer Home page
$(document).on("knack-view-render.view_1120", function(event, page) {
  bigButton("row-division-link", "view_1120", "https://www.austintexas.gov/department/right-way-row-management", "bank", "ROW Division", true);
});

// create large Task Board button on the Task Board Login page
$(document).on("knack-view-render.view_1385", function(event, page) {
  bigButton("task-board", "view_1385", "https://atd.knack.com/row#task-board/my-tasks", "tasks", "Go to My Tasks");
});

// create large DAPCZ Meeting button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1526", function(event, page) {
  bigButton("manage-dapcz-meetings", "view_1526", "https://atd.knack.com/row#manage-dapcz-meetings/", "microphone", "DAPCZ Meeting");
});

// create large DAPCZ Project button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1527", function(event, page) {
  bigButton("manage-dapcz-project", "view_1527", "https://atd.knack.com/row#manage-dapcz-project/", "cubes", "DAPCZ Projects");
});

// create large DAPCZ Contacts button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1528", function(event, page) {
  bigButton("manage-dapcz-contacts", "view_1528", "https://atd.knack.com/row#manage-dapcz-contacts/", "users", "DAPCZ Contacts");
});

// create large DAPCZ Resources button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1529", function(event, page) {
  bigButton("manage-dapcz-resources", "view_1529", "https://atd.knack.com/row#manage-dapcz-resources/", "book", "DAPCZ Resources");
});

// create large DAPCZ Public Portal button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1593", function(event, page) {
  bigButton("dapcz-meeting", "view_1593", "https://atd.knack.com/row#dapcz-meeting/", "slideshare", "DAPCZ Public Portal");
});

// create large Manage DAPCZ Links button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1594", function(event, page) {
  bigButton("manage-links", "view_1594", "https://atd.knack.com/row#manage-links/", "link", "Manage Links");
});

// create large Manage DAPCZ Meeting Schedule button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1595", function(event, page) {
  bigButton("manage-schedule", "view_1595", "https://atd.knack.com/row#manage-schedule", "calendar", "Manage Schedule");
});

// create large DAPCZ Public Portal button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1597", function(event, page) {
  bigButton("dapcz-meeting", "view_1597", "https://atd.knack.com/row#dapcz-meeting/", "slideshare", "DAPCZ Public Portal");
});

// create large DAPCZ Agenda button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1505", function(event, page) {
  bigButton("dapcz-agenda", "view_1505", "https://atd.knack.com/row#dapcz-meeting/dapcz-agenda/", "file-o", "DAPCZ Agenda");
});

// create large DAPCZ Project List button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1506", function(event, page) {
  bigButton("dapcz-project-list", "view_1506", "https://atd.knack.com/row#dapcz-meeting/dapcz-project-list/", "list-ul", "DAPCZ Project List");
});

// create large DAPCZ Links button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1507", function(event, page) {
  bigButton("dapcz-links", "view_1507", "https://atd.knack.com/row#dapcz-meeting/dapcz-links/", "link", "DAPCZ Links & Resources");
});

// create large DAPCZ Meeting Schedule button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1508", function(event, page) {
  bigButton("dapcz-meeting-schedule", "view_1508", "https://atd.knack.com/row#dapcz-meeting/dapcz-meeting-schedule", "calendar", "DAPCZ Meeting Schedule");
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

/*
// create large Start Application button on the ROW Customer Portal - Services page for TCP
$(document).on("knack-view-render.view_388", function(event, page) {
  largeSubmitButton("tcp-application", "view_388", "https://atd.knack.com/row#new-tcp-application/", "arrow-right", "Start Application");
});
// create large Start Application button on the ROW Customer Portal - Services page for CSWZ
$(document).on("knack-view-render.view_444", function(event, page) {
  largeSubmitButton("cswz-application", "view_444", "https://atd.knack.com/row#new-cswz/", "arrow-right", "Start Request");
}); 
*/

// create large My Projects button on the Customer Dashboard - Customer Services page
$(document).on("knack-view-render.view_1089", function(event, page) {
  largeSubmitButton("my-projects", "view_1089", "https://atd.knack.com/row#customer/my-projects", "arrow-right", "My Projects");
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

/*******************************************************************/
/*** Disable Breadcrumb Navigation Links for old TCP Application ***/
/*******************************************************************/

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

/***************************************************************/
/*** Disable Breadcrumb Navigation Links for TCP Application ***/
/***************************************************************/

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

/************************************************************************/
/*** Disable Breadcrumb Navigation Links for Reviewer TCP Application ***/
/************************************************************************/

//New TCP Application page
$(document).on("knack-scene-render.scene_583", function () {
  disableBreadCrumbsNonAdmin();
});

/*******************************************************************************/
/*** Disable Breadcrumb Navigation Links for TCP Conflict/Shared TCP Request ***/
/*******************************************************************************/

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

/***********************************************************************/
/*** Disable Breadcrumb Navigation Links for Customer Account Signup ***/
/***********************************************************************/

//Customer Account Login Step 2 page
$(document).on("knack-scene-render.scene_480", function () {
  disableBreadCrumbsNonAdmin();
});
//Customer Account Setup Step 3 page
$(document).on("knack-scene-render.scene_476", function () {
  disableBreadCrumbsNonAdmin();
});

/*************************************************************************/
/*** Disable Breadcrumb Navigation Links for Customer Project Creation ***/
/*************************************************************************/

//Customer Create TCP Project Step 1 page
$(document).on("knack-scene-render.scene_463", function () {
  disableBreadCrumbsNonAdmin();
});
//Customer Create TCP Project Step 2 page
$(document).on("knack-scene-render.scene_464", function () {
  disableBreadCrumbsNonAdmin();
});
//Customer Create CSWZ Request Step 1 page
$(document).on("knack-scene-render.scene_465", function () {
  disableBreadCrumbsNonAdmin();
});
//Customer Create CSWZ Request Step 2 page
$(document).on("knack-scene-render.scene_467", function () {
  disableBreadCrumbsNonAdmin();
});


/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on("knack-scene-render.any", function (event, scene) {
  $(".kn-modal-bg").off("click");
});

/*************************************/
/*** Redirect from Blank Nav Pages ***/
/*************************************/
/*Customer Home Page "https://atd.knack.com/row#customer-portal-home/" */
$(document).on('knack-scene-render.scene_586', function(event, scene) { 
window.location.href = "https://atd.knack.com/row#portal-home/";
});

/*Task Board Page "https://atd.knack.com/row#task-board/" */
$(document).on('knack-scene-render.scene_166', function(event, scene) { 
window.location.href = "https://atd.knack.com/row#task-board/my-tasks/";
});

/*****************************/
/*** Autosubmit Form Pages ***/
/*****************************/

/* Auto Submit New TCP Review Submission Cycle */
$(document).on('knack-scene-render.scene_411', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Auto Submit New CSWZ Submission Cycle */
$(document).on('knack-scene-render.scene_417', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit Begin Review for TCP Review Submission Cycle */
$(document).on('knack-scene-render.scene_378', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Auto Submit Begin Review for CSWZ Submissions */
$(document).on('knack-scene-render.scene_386', function(event, scene) {
    $('button[type=submit]').submit();
});

/* Auto Submit Approve TCP Case */
$(document).on('knack-scene-render.scene_488', function(event, scene) {
    $('button[type=submit]').submit();
});

/***********************************/
/*** Custom TCP Navigation Menu  ***/
/***********************************/
function tcpDropdownMenuItem(recordId, route, iconName, linkName, mobile = false, newTab = false) {
  const buttonClass = mobile ? "desktop-button" : "kn-button"
  if (newTab) {
    return (
      `<li class="${buttonClass}">\
        <a href="#tcp-projects/tcp-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`)
  }

  return (
    `<li class="${buttonClass}">\
      <a href="#tcp-projects/tcp-details/${recordId}/${route}/${recordId}" class="tcp-nav-menu">\
        <span class="icon is-small" style="color:#163f6e"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span style="color:#163f6e">${linkName}</span>\
      </a>\
    </li>`)
}

/* TCP Case Details Page */
$(document).on('knack-view-render.view_1175', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="desktop-menu-list">\
      <li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tcp-projects/" data-kn-slug="#case-management">\
          <span class="kn-dropdown-icon fa fa-reply" />\
          <span class="nav-dropdown-link">&nbsp;Back to TCP Projects</span>\
        </a>\
        <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
        </ul>\
      </li>\
      <li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tcp-projects/tcp-details/${recordId}/edit-tcp-case/${recordId}" data-kn-slug="#update-case-details">\
          <span class="kn-dropdown-icon fa fa-edit" /> \
          <span class="nav-dropdown-link">&nbsp;Update Case Details</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-case", "fa-briefcase", "Edit Case Details & Notes")}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-engineer-info", "fa-wrench", "Edit Engineer Info")}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-financial-info", "fa-dollar", "Edit Financial Info")}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-organization-info", "fa-building", "Edit Organization Info")}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-contact-person", "fa-child", "Edit Contact")}\
          ${tcpDropdownMenuItem(recordId, "change-tcp-contact-person", "fa-refresh", "Change Contact")}\
        </ul>\
      </li>\
      ${tcpDropdownMenuItem(recordId, "intake-decision", "fa-inbox", "Intake Decision")}\
      ${tcpDropdownMenuItem(recordId, "create-tcp-submission-cycle-staff", "fa-plus-square", "Create Submission Cycle")}\
      ${tcpDropdownMenuItem(recordId, "tcp-submission-override", "fa-share-square", "Create Submission Cycle Override")}\
    </ul>\
  </div>`).appendTo("#view_1175")

/* Mobile TCP Case Details Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="mobile-menu-list">\
      <li class="mobile-dropdown-menu">\
        <span class="desktop-button mobile-dropdown-button"> \
          <i class="fa fa-reply desktop-dropdown" /> \
          TCP Navigation Menu\
        </span>\
        <ul class="desktop-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
        </ul>\
      </li>\
      <li class="mobile-dropdown-menu">\
        <span class="desktop-button mobile-dropdown-button">\
          <i class="fa fa-angle-down desktop-dropdown" /> \
          Update Case Details Menu\
        </span>\
        <ul class="desktop-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-case", "fa-briefcase", "Edit Case Details & Notes", true)}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-engineer-info", "fa-wrench", "Edit Engineer Info", true)}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-financial-info", "fa-dollar", "Edit Financial Info", true)}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-organization-info", "fa-building", "Edit Organization Info", true)}\
          ${tcpDropdownMenuItem(recordId, "edit-tcp-contact-person", "fa-child", "Edit Contact", true)}\
          ${tcpDropdownMenuItem(recordId, "change-tcp-contact-person", "fa-refresh", "Change Contact", true)}\
        </ul>\
      </li>\
      ${tcpDropdownMenuItem(recordId, "intake-decision", "fa-inbox", "Intake Decision", true)}\
      ${tcpDropdownMenuItem(recordId, "create-tcp-submission-cycle-staff", "fa-plus-square", "Create Submission Cycle", true)}\
      ${tcpDropdownMenuItem(recordId, "tcp-submission-override", "fa-share-square", "Create Submission Cycle Override", true)}\
    </ul>\
  </div>`).appendTo("#view_1175")
})

/************************************/
/*** Custom CSWZ Navigation Menu  ***/
/************************************/
function cswzDropdownMenuItem(recordId, route, iconName, linkName, mobile = false, newTab = false) {
  const buttonClass = mobile ? "desktop-button" : "kn-button"
  if (newTab) {
    return (
      `<li class="${buttonClass}">\
        <a href="#tcp-cswz/cswz-request-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`)
  }

  return (
    `<li class="${buttonClass}">\
      <a href="#tcp-cswz/cswz-request-details/${recordId}/${route}/${recordId}" class="cswz-nav-menu">\
        <span class="icon is-small" style="color:#163f6e"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span style="color:#163f6e">${linkName}</span>\
      </a>\
    </li>`)
}

/* CSWZ Case Details Page */
$(document).on('knack-view-render.view_1176', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="desktop-menu-list">\
      <li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tcp-cswz/" data-kn-slug="#case-management">\
          <span class="kn-dropdown-icon fa fa-reply" />\
          <span class="nav-dropdown-link">&nbsp;Back to CSWZ Requests</span>\
        </a>\
        <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
        </ul>\
      </li>\
      <li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tcp-cswz/cswz-request-details/${recordId}/edit-cswz-case/${recordId}" data-kn-slug="#update-case-details">\
          <span class="kn-dropdown-icon fa fa-edit" /> \
          <span class="nav-dropdown-link">&nbsp;Update Case Details</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-case", "fa-briefcase", "Edit Case Details & Notes")}\
          ${cswzDropdownMenuItem(recordId, "connect-to-tcp-project", "fa-link", "Connect to TCP Project")}\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-organization-info", "fa-building", "Edit Organization Info")}\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-contact-person", "fa-child", "Edit Contact")}\
          ${cswzDropdownMenuItem(recordId, "change-cswz-contact-person", "fa-refresh", "Change Contact")}\
        </ul>\
      </li>\
      ${cswzDropdownMenuItem(recordId, "create-cswz-submission-cycle-staff", "fa-plus-square", "Create Submission Cycle")}\
      ${cswzDropdownMenuItem(recordId, "cswz-submission-override", "fa-share-square", "Create Submission Cycle Override")}\
    </ul>\
  </div>`).appendTo("#view_1176")

/* Mobile CSWZ Case Details Page */
$(`<div class="mobile-details-dropdown-menu">\
    <ul id="mobile-menu-list">\
      <li class="mobile-dropdown-menu">\
        <span class="desktop-button mobile-dropdown-button"> \
          <i class="fa fa-reply desktop-dropdown" /> \
          CSWZ Navigation Menu\
        </span>\
        <ul class="desktop-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
        </ul>\
      </li>\
      <li class="mobile-dropdown-menu">\
        <span class="desktop-button mobile-dropdown-button">\
          <i class="fa fa-angle-down desktop-dropdown" /> \
          Update Case Details Menu\
        </span>\
        <ul class="desktop-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-case", "fa-briefcase", "Edit Case Details & Notes", true)}\
          ${cswzDropdownMenuItem(recordId, "connect-to-tcp-project", "fa-link", "Connect to TCP Project", true)}\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-organization-info", "fa-building", "Edit Organization Info", true)}\
          ${cswzDropdownMenuItem(recordId, "edit-cswz-contact-person", "fa-child", "Edit Contact", true)}\
          ${cswzDropdownMenuItem(recordId, "change-cswz-contact-person", "fa-refresh", "Change Contact", true)}\
        </ul>\
      </li>\
      ${cswzDropdownMenuItem(recordId, "create-cswz-submission-cycle-staff", "fa-plus-square", "Create Submission Cycle", true)}\
      ${cswzDropdownMenuItem(recordId, "cswz-submission-override", "fa-share-square", "Create Submission Cycle Override", true)}\
    </ul>\
  </div>`).appendTo("#view_1176")
})
