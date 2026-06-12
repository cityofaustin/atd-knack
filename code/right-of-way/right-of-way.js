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
$(document).on("knack-view-render.view_644", function(event, page) {
  bigButton("task-board", "view_644", `${APP_URL}#task-board/`, "tasks", "Task Board");
});
// create large Customer Portal button on the Home page
$(document).on("knack-view-render.view_645", function(event, page) {
  bigButton("row-portal", "view_645", `${APP_URL}#portal-home/`, "child", "Customer Portal");
});
// create large Customer Home button on the Home page
$(document).on("knack-view-render.view_1087", function(event, page) {
  bigButton("customer-login", "view_1087", `${APP_URL}#customer/`, "unlock-alt", "Customer Login");
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_646", function(event, page) {
  bigButton("account-management", "view_646", `${APP_URL}#account-management/`, "users", "Manage Internal Accounts");
});
// create large Manage Customer Accounts button on the Home page
$(document).on("knack-view-render.view_1086", function(event, page) {
  bigButton("manage-customers", "view_1086", `${APP_URL}#app-admin/manage-customers/`, "user", "Manage Customer Accounts");
});
// create large TCP Projects button on the Home page
$(document).on("knack-view-render.view_31", function(event, page) {
  bigButton("tcp-projects", "view_31", `${APP_URL}#tcp-projects/`, "briefcase", "TCP Projects");
});
// create large CCM button on the Home page
$(document).on("knack-view-render.view_244", function(event, page) {
  bigButton("ccm", "view_244", `${APP_URL}#court-case-management/`, "suitcase", "Court Case Management");
});
// create large COS Reporting button on the Home page
$(document).on("knack-view-render.view_245", function(event, page) {
  bigButton("cos", "view_245", `${APP_URL}#cost-of-service-data/`, "dollar", "Cost of Service Data");
});
// create large CSWZ button on the Home page
$(document).on("knack-view-render.view_451", function(event, page) {
  bigButton("tcp-cswz", "view_451", `${APP_URL}#tcp-cswz/`, "files-o", "Conflict/Shared Requests");
});

// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_234", function(event, page) {
  bigButton("services", "view_234", `${APP_URL}#customer-portal/services`, "list-ul", "Available Services");
});
// create large Available Services button on the ROW Portal page
$(document).on("knack-view-render.view_681", function(event, page) {
  bigButton("all-services", "view_681", `${APP_URL}#portal-home/all-services`, "list-ul", "Available Services");
});
// create large Available Services button on the Customer Home page
$(document).on("knack-view-render.view_1117", function(event, page) {
  bigButton("customer-services", "view_1117", `${APP_URL}#customer/customer-services`, "list-ul", "Available Services");
});
// create large ROW Division button on the Customer Portal Home page
$(document).on("knack-view-render.view_237", function(event, page) {
  bigButton("row-division-link", "view_237", "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management", "bank", "ROW Division", true);
});
// create large ROW Division button on the ROW Portal page
$(document).on("knack-view-render.view_684", function(event, page) {
  bigButton("row-division-link", "view_684", "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management", "bank", "ROW Division", true);
});
// create large ROW Division button on the Customer Home page
$(document).on("knack-view-render.view_1120", function(event, page) {
  bigButton("row-division-link", "view_1120", "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management", "bank", "ROW Division", true);
});

// create large Task Board button on the Task Board Login page
$(document).on("knack-view-render.view_1385", function(event, page) {
  bigButton("task-board", "view_1385", `${APP_URL}#task-board/my-tasks`, "tasks", "Go to My Tasks");
});

// create large DAPCZ Meeting button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1526", function(event, page) {
  bigButton("manage-dapcz-meetings", "view_1526", `${APP_URL}#manage-dapcz-meetings/`, "microphone", "DAPCZ Meeting");
});

// create large DAPCZ Project button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1527", function(event, page) {
  bigButton("manage-dapcz-project", "view_1527", `${APP_URL}#manage-dapcz-project/`, "cubes", "DAPCZ Projects");
});

// create large DAPCZ Contacts button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1528", function(event, page) {
  bigButton("manage-dapcz-contacts", "view_1528", `${APP_URL}#manage-dapcz-contacts/`, "users", "DAPCZ Contacts");
});

// create large DAPCZ Resources button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1529", function(event, page) {
  bigButton("manage-dapcz-resources", "view_1529", `${APP_URL}#manage-dapcz-resources/`, "book", "DAPCZ Resources");
});

// create large DAPCZ Public Portal button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1593", function(event, page) {
  bigButton("dapcz-meeting", "view_1593", `${APP_URL}#dapcz-meeting/`, "slideshare", "DAPCZ Public Portal");
});

// create large DAPCZ Agenda button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1505", function(event, page) {
  bigButton("dapcz-agenda", "view_1505", `${APP_URL}#dapcz-meeting/dapcz-agenda/`, "file-o", "DAPCZ Agenda");
});

// create large DAPCZ Project List button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1506", function(event, page) {
  bigButton("dapcz-project-list", "view_1506", `${APP_URL}#dapcz-meeting/dapcz-project-list/`, "list-ul", "DAPCZ Project List");
});

// create large DAPCZ Links button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1507", function(event, page) {
  bigButton("dapcz-links", "view_1507", `${APP_URL}#dapcz-meeting/dapcz-links/`, "link", "DAPCZ Links & Resources");
});

// create large DAPCZ Meeting Schedule button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1508", function(event, page) {
  bigButton("dapcz-meeting-schedule", "view_1508", `${APP_URL}#dapcz-meeting/dapcz-meeting-schedule`, "calendar", "DAPCZ Meeting Schedule");
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

// create large My Projects button on the Customer Dashboard - Customer Services page
$(document).on("knack-view-render.view_1089", function(event, page) {
  largeSubmitButton("my-projects", "view_1089", `${APP_URL}#customer/my-projects`, "arrow-right", "My Projects");
}); 

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
  // Old TCP Application
  'scene_97',  // TCP Application Project Information page
  'scene_98',  // TCP Application Attachments page
  'scene_99',  // Review TCP Application page
  'scene_100', // Edit Information page
  'scene_101', // Edit Attachments page
  'scene_102', // TCP Application Confirmation page
  
  // New TCP Application
  'scene_137', // New TCP Application page
  'scene_138', // TCP Project Information page
  'scene_148', // TCP Fee Information page
  'scene_149', // TCP Documents page
  'scene_150', // Finalize TCP Application page
  'scene_151', // Edit Information page
  'scene_152', // Edit Attachments page
  'scene_153', // TCP Application Confirmation page
  
  // Staff TCP Application
  'scene_583', // Submit Staff TCP Application page
  
  // TCP Conflict/Shared TCP Request
  'scene_183', // Applicant Information page
  'scene_184', // Conflicting Party page
  'scene_185', // Attachments page
  'scene_186', // Review Request page
  'scene_187', // Submittal Confirmation page
  'scene_188', // Edit Information page
  'scene_189', // Edit Attachments page
  
  // Customer Account Signup
  'scene_480', // Customer Confirm Account Login Step 2 page
  'scene_476', // Customer Complete Account Setup Step 3 page
  
  // Customer Project Creation
  'scene_463', // Customer Create TCP Project Step 1 page
  'scene_464', // Customer Create TCP Project Step 2 page
  'scene_465', // Customer Create CSWZ Request Step 1 page
  'scene_467'  // Customer Create CSWZ Request Step 2 page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
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
/*Customer Home Page "https://atd.knack.com/pte#customer-portal-home/" */
$(document).on('knack-scene-render.scene_586', function(event, scene) { 
window.location.href = `${APP_URL}#portal-home/`;
});

/*Task Board Page "https://atd.knack.com/pte#task-board/" */
$(document).on('knack-scene-render.scene_166', function(event, scene) { 
window.location.href = `${APP_URL}#task-board/my-tasks/`;
});

/*****************************/
/*** Autosubmit Form Pages ***/
/*****************************/

/* Auto Submit New TCP Intake Submission Cycle for Customer Manage TCP Project Page*/
$(document).on('knack-scene-render.scene_589', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Auto Submit New TCP Review Submission Cycle for Customer Manage TCP Project Page*/
$(document).on('knack-scene-render.scene_411', function(event, scene) {
    $('button[type=submit]').submit();
});
/* Auto Submit New CSWZ Submission Cycle for Customer Customer Manage Conflict/Shared TCP Project Page*/
$(document).on('knack-scene-render.scene_417', function(event, scene) {
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

/********************************************/
/** DAPCZ: Link Active Projects to Meeting **/
/** https://github.com/cityofaustin/atd-data-tech/issues/26752 **/
/********************************************/
// Helpers live in the IIFE; Knack hooks stay global (see DapczLink at bottom).
var DapczLink = (function () {
  const CONFIG = {
    views: {
      meetings: "view_1768",
      projects: "view_1755",
    },
    api: {
      baseUrl: "https://api.knack.com/v1",
      scene: "scene_776",
      projectUpdateView: "view_1786",
    },
    fields: {
      projectMeetingConnection: "field_1423",
      meetingDate: "field_1402",
      projectName: "field_1394",
      projectZone: "field_1414",
      projectRsn: "field_1421",
      projectStatus: "field_1410",
      projectGroupHeader: "",
    },
    batchSize: 5,
    batchDelay: 500,
    operationCooldownMs: 3000,
    feedbackDismissMs: 5000,
  };

  var operationState = {
    isProcessing: false,
    lastOperationTime: 0,
    currentMeeting: null,
    projectConnections: {},
    initialLinkedIds: {},
    modalFilter: "all",
    prefetchPromise: null,
    prefetchProjectIdsKey: "",
    prefetchComplete: false,
    feedbackDismissTimeoutId: null,
    modalSort: { column: "project", direction: "asc" },
  };

  var projectsTableFields = {
    projectName: null,
    groupHeader: null,
    meetingConnection: null,
  };

  /** Poll until a DOM selector matches, then run callback (Knack views render async). */
  function elementLoaded(el, callback, attempts) {
    var tryCount = attempts || 0;
    if ($(el).length) {
      callback($(el));
      return;
    }
    if (tryCount > 40) {
      return;
    }
    setTimeout(function () {
      elementLoaded(el, callback, tryCount + 1);
    }, 300);
  }

  /** Log Knack API failures to the console for debugging. */
  function logApiError(error) {
    console.error("DAPCZ link API error:", error);
    if (error && error.responseText) {
      console.error("DAPCZ API response:", error.responseText);
    }
  }

  /** Extract a user-facing message from a parsed Knack error response body. */
  function getApiErrorFromBody(body) {
    if (!body) {
      return "";
    }
    if (body.message) {
      return body.message;
    }
    if (body.errors) {
      return JSON.stringify(body.errors);
    }
    return "";
  }

  /** Extract a user-facing message from a jQuery XHR / Knack API failure. */
  function getApiErrorFromXhr(xhr) {
    if (!xhr) {
      return "";
    }

    var fromResponseJson = getApiErrorFromBody(xhr.responseJSON);
    if (fromResponseJson) {
      return fromResponseJson;
    }

    var responseText =
      typeof xhr.responseText === "string" ? xhr.responseText : "";

    if (xhr.status === 400 && responseText && /required/i.test(responseText)) {
      return (
        "Knack rejected clearing the meeting connection. On view_1786, set field_1423 " +
        "(dapcz_meetings) to not required so projects can be unlinked."
      );
    }

    if (responseText) {
      try {
        var fromParsed = getApiErrorFromBody(JSON.parse(responseText));
        if (fromParsed) {
          return fromParsed;
        }
      } catch (parseError) {
        if (responseText.length < 300) {
          return responseText;
        }
      }
    }

    return xhr.statusText || "";
  }

  /** Normalize any API error (string, Error, or XHR) into a modal-friendly message. */
  function formatApiError(error) {
    if (!error) {
      return "Unknown error";
    }
    if (typeof error === "string") {
      return error;
    }
    if (error.message) {
      return error.message;
    }

    var xhrMessage = getApiErrorFromXhr(error.xhr || error);
    return xhrMessage || "Request failed";
  }

  /**
   * Resolve field keys for the Active Projects table (view_1755) by matching column headers.
   * Knack cells are selected via td.field_XXXX classes, not labels, this cache lets row
   * helpers (ex: getProjectNameFromRow) read values from the DOM when the
   * model is missing data.
   */
  function cacheProjectsTableFields() {
    var viewKey = CONFIG.views.projects;

    // Project name column — header label may vary slightly in Builder.
    projectsTableFields.projectName = getTableFieldKeyByHeader(
      viewKey,
      function (text) {
        return text === "project name" || text.indexOf("project name") === 0;
      },
    );

    // Group header rows in the table (used as a fallback for row grouping).
    projectsTableFields.groupHeader = getTableFieldKeyByHeader(
      viewKey,
      function (text) {
        return text.indexOf("group header") >= 0;
      },
    );

    // Meeting connection: prefer config (field_1423); fall back to header lookup if unset.
    projectsTableFields.meetingConnection =
      CONFIG.fields.projectMeetingConnection ||
      getTableFieldKeyByHeader(viewKey, function (text) {
        return (
          text.indexOf("dapcz_meeting") >= 0 ||
          text === "dapcz_meetings" ||
          text.indexOf("meeting date") >= 0
        );
      });
  }

  /** Escape text before inserting into dynamically built HTML. */
  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Extract a display string from a dapcz_meeting Knack model (field_1402).
   * Knack date fields may be a plain string or an object with .date / .iso_date
   * depending on context (table model vs API record). Used for modal title/hint
   * and as a fallback when matching meeting connection identifiers.
   */
  function formatMeetingDate(model) {
    var dateField = CONFIG.fields.meetingDate;
    var value = model.get ? model.get(dateField) : model[dateField];

    if (!value) {
      return "Meeting";
    }
    if (typeof value === "object" && value.date) {
      return value.date;
    }
    if (typeof value === "object" && value.iso_date) {
      return value.iso_date;
    }

    return String(value);
  }

  /**
   * Parse linked meeting records from Knack connection-field HTML.
   * When field_1423 lacks a _raw array, Knack may return markup like
   * <span class="{recordId}" data-kn="connection-value">{date}</span>.
   * Returns [{ id, identifier }, ...] so link detection matches the _raw shape.
   */
  function parseConnectionHtml(value) {
    if (!value || typeof value !== "string" || value.indexOf("data-kn") === -1) {
      return [];
    }

    var records = [];
    // Capture record ID (class) and display label (inner text) per connection span.
    var pattern =
      /class="([a-f0-9]{24})"[^>]*data-kn="connection-value"[^>]*>([^<]*)</gi;
    var match;

    while ((match = pattern.exec(value)) !== null) {
      records.push({
        id: match[1],
        identifier: (match[2] || "").trim(),
      });
    }

    return records;
  }

  /**
   * Normalize a Knack connection field (field_1423) into [{ id, identifier }, ...].
   * Knack exposes the same link data in many shapes depending on source (API record,
   * table model, rendered HTML). This function always returns a uniform array for link checks
   * and payload building. Returns [] when the field is empty or unrecognized.
   */
  function getConnectionRecords(model, fieldKey) {
    // Best case: structured _raw array from API or rich model data.
    var raw = model.get ? model.get(fieldKey + "_raw") : model[fieldKey + "_raw"];
    if (raw && raw.length) {
      return raw.map(function (record) {
        return { id: record.id, identifier: record.identifier || "" };
      });
    }

    var value = model.get ? model.get(fieldKey) : model[fieldKey];
    if (!value) {
      return [];
    }

    // Array of connection objects or bare record IDs.
    if (Array.isArray(value)) {
      return value
        .map(function (record) {
          if (typeof record === "object" && record && record.id) {
            return { id: record.id, identifier: record.identifier || "" };
          }
          if (typeof record === "string") {
            return { id: record, identifier: "" };
          }
          return null;
        })
        .filter(Boolean);
    }

    // Single linked record object.
    if (typeof value === "object" && value.id) {
      return [{ id: value.id, identifier: value.identifier || "" }];
    }

    if (typeof value === "string") {
      // Rendered HTML spans (table cells) or a lone 24-char record ID.
      var fromHtml = parseConnectionHtml(value);
      if (fromHtml.length) {
        return fromHtml;
      }

      if (/^[a-f0-9]{24}$/i.test(value)) {
        return [{ id: value, identifier: "" }];
      }
    }

    return [];
  }

  /**
   * True when the given meeting appears in a project's connection data.
   * Checks three sources in priority order:
   *   1. Pre-fetched connections array (fastest, from operationState cache)
   *   2. Knack model's connection field via getConnectionRecords
   *   3. DOM cell text in the projects table row (last resort)
   * Any param may be null/empty — the function skips that tier and falls through.
   */
  function isProjectLinkedToMeeting(connections, model, $row, meeting) {
    if (!meeting) {
      return false;
    }

    function matchesMeeting(record) {
      if (String(record.id) === String(meeting.id)) {
        return true;
      }
      if (meeting.dateLabel && record.identifier === meeting.dateLabel) {
        return true;
      }
      if (meeting.identifier && record.identifier === meeting.identifier) {
        return true;
      }
      return false;
    }

    if (connections && connections.length && connections.some(matchesMeeting)) {
      return true;
    }

    if (model) {
      var fieldKey = CONFIG.fields.projectMeetingConnection;
      var modelRecords = getConnectionRecords(model, fieldKey);
      if (modelRecords.length && modelRecords.some(matchesMeeting)) {
        return true;
      }
    }

    if ($row && $row.length) {
      var meetingFieldKey =
        projectsTableFields.meetingConnection ||
        CONFIG.fields.projectMeetingConnection;
      var cellText = meetingFieldKey ? getCellText($row, meetingFieldKey) : "";
      if (cellText) {
        if (meeting.dateLabel && cellText.indexOf(meeting.dateLabel) >= 0) {
          return true;
        }
        if (meeting.identifier && cellText.indexOf(meeting.identifier) >= 0) {
          return true;
        }
      }
    }

    return false;
  }

  /** Return the first linked record from a connection field, or null. */
  function getConnectionDetails(model, fieldKey) {
    var records = getConnectionRecords(model, fieldKey);
    return records.length ? records[0] : null;
  }

  /** Read a Knack field's display text from model _raw, identifier, or plain value. */
  function getFieldDisplayValue(model, fieldKey) {
    if (!fieldKey) {
      return "";
    }

    var raw = model.get ? model.get(fieldKey + "_raw") : model[fieldKey + "_raw"];
    if (raw && raw.length && raw[0].identifier) {
      return String(raw[0].identifier).trim();
    }

    var value = model.get ? model.get(fieldKey) : model[fieldKey];
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object" && value.identifier) {
      return String(value.identifier).trim();
    }

    return String(value).trim();
  }

  /** Find a table column's field key (e.g. field_1394) by matching its header text. */
  function getTableFieldKeyByHeader(viewKey, headerMatch) {
    var fieldKey = null;
    $("#" + viewKey + " table.kn-table-table thead th").each(function () {
      var headerText = $(this).text().replace(/\s+/g, " ").trim().toLowerCase();
      if (headerMatch(headerText)) {
        var classes = (this.className || "").split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].indexOf("field_") === 0) {
            fieldKey = classes[i];
            return false;
          }
        }
      }
    });
    return fieldKey;
  }

  /** Read trimmed cell text from a table row by Knack field key class. */
  function getCellText($row, fieldKey) {
    if (!$row.length || !fieldKey) {
      return "";
    }
    return $row
      .find("td." + fieldKey)
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
  }

  /** Get the group header label for a project row (field or preceding kn-table-group row). */
  function getGroupHeaderForRow($row) {
    var groupHeader = "";
    var groupFieldKey =
      projectsTableFields.groupHeader ||
      CONFIG.fields.projectGroupHeader;

    if ($row.length && groupFieldKey) {
      groupHeader = getCellText($row, groupFieldKey);
    }

    if (!groupHeader && $row.length) {
      groupHeader = $row
        .prevAll("tr.kn-table-group")
        .first()
        .find("td")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();
    }

    return groupHeader;
  }

  /** Knack REST API root URL from config. */
  function getApiBaseUrl() {
    return CONFIG.api.baseUrl || "https://api.knack.com/v1";
  }

  /** Auth headers for Knack REST calls using the logged-in user's session token. */
  function getApiHeaders() {
    return {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-KEY": "knack",
      Authorization: Knack.getUserToken(),
      "content-type": "application/json",
    };
  }

  /** Build the PUT/GET URL for a project record via view_1786. */
  function getProjectUpdateUrl(projectId) {
    var api = CONFIG.api;
    return (
      getApiBaseUrl() +
      "/scenes/" +
      api.scene +
      "/views/" +
      api.projectUpdateView +
      "/records/" +
      projectId
    );
  }

  /** GET a single dapcz_project record through the API edit form (view_1786). */
  function fetchProjectRecord(projectId) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "GET",
        url: getProjectUpdateUrl(projectId),
        headers: getApiHeaders(),
      })
        .done(function (response) {
          resolve(response.record || response);
        })
        .fail(function (xhr) {
          reject(xhr);
        });
    });
  }

  /** Collect record IDs from visible project rows in view_1755 (skips group headers). */
  function getProjectIdsFromTable() {
    var viewKey = CONFIG.views.projects;
    var projectIds = [];

    $("#" + viewKey + " tbody tr[id]").each(function () {
      var $row = $(this);
      if ($row.hasClass("kn-table-group")) {
        return;
      }
      var projectId = $row.attr("id");
      if (projectId) {
        projectIds.push(projectId);
      }
    });

    return projectIds;
  }

  /**
   * Batch-fetch field_1423 connections for many projects (rate-limited).
   * Returns { [projectId]: [{ id, identifier }, ...] }.
   */
  function fetchProjectConnectionsBatch(projectIds) {
    var batchSize = CONFIG.batchSize;
    var fieldKey = CONFIG.fields.projectMeetingConnection;
    var connectionMap = {};
    var index = 0;

    function processBatch() {
      var batch = projectIds.slice(index, index + batchSize);
      if (!batch.length) {
        return Promise.resolve(connectionMap);
      }

      index += batchSize;

      return Promise.all(
        batch.map(function (projectId) {
          return fetchProjectRecord(projectId)
            .then(function (record) {
              connectionMap[projectId] = getConnectionRecords(
                record,
                fieldKey,
              );
            })
            .catch(function (error) {
              logApiError(error);
              connectionMap[projectId] = [];
            });
        }),
      ).then(function () {
        if (index < projectIds.length) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(processBatch());
            }, CONFIG.batchDelay);
          });
        }
        return connectionMap;
      });
    }

    return processBatch();
  }

  /** Stable cache key from sorted project IDs (detects table changes). */
  function getProjectIdsKey(projectIds) {
    return projectIds.slice().sort().join(",");
  }

  /** Merge a batch fetch result into operationState.projectConnections. */
  function mergeProjectConnections(connectionMap) {
    Object.keys(connectionMap || {}).forEach(function (projectId) {
      operationState.projectConnections[projectId] =
        connectionMap[projectId];
    });
  }

  /** True when every visible project row has a cached connection entry. */
  function hasCompleteProjectConnectionCache() {
    var projectIds = getProjectIdsFromTable();
    if (!projectIds.length) {
      return false;
    }

    return projectIds.every(function (projectId) {
      return Object.prototype.hasOwnProperty.call(
        operationState.projectConnections,
        projectId,
      );
    });
  }

  /**
   * Prefetch project→meeting connections for all visible projects.
   * Deduplicates in-flight requests; only fetches missing IDs when possible.
   */
  function prefetchProjectConnections() {
    if (!CONFIG.api.projectUpdateView) {
      return Promise.resolve(operationState.projectConnections);
    }

    var projectIds = getProjectIdsFromTable();
    if (!projectIds.length) {
      operationState.prefetchComplete = false;
      return Promise.resolve(operationState.projectConnections);
    }

    var idsKey = getProjectIdsKey(projectIds);
    var missingIds = projectIds.filter(function (projectId) {
      return !Object.prototype.hasOwnProperty.call(
        operationState.projectConnections,
        projectId,
      );
    });

    if (
      !missingIds.length &&
      operationState.prefetchProjectIdsKey === idsKey
    ) {
      operationState.prefetchComplete = true;
      return Promise.resolve(operationState.projectConnections);
    }

    if (
      operationState.prefetchPromise &&
      operationState.prefetchProjectIdsKey === idsKey
    ) {
      return operationState.prefetchPromise;
    }

    operationState.prefetchProjectIdsKey = idsKey;
    operationState.prefetchComplete = false;

    var idsToFetch = missingIds.length ? missingIds : projectIds;

    operationState.prefetchPromise =
      fetchProjectConnectionsBatch(idsToFetch)
        .then(function (connectionMap) {
          mergeProjectConnections(connectionMap);
          operationState.prefetchComplete =
            hasCompleteProjectConnectionCache();
          operationState.prefetchPromise = null;
          return operationState.projectConnections;
        })
        .catch(function (error) {
          operationState.prefetchPromise = null;
          operationState.prefetchComplete = false;
          throw error;
        });

    return operationState.prefetchPromise;
  }

  /** Wait for view_1755 rows, then start connection prefetch (non-blocking). */
  function scheduleProjectConnectionsPrefetch() {
    if (!CONFIG.api.projectUpdateView) {
      return;
    }

    var viewKey = CONFIG.views.projects;
    elementLoaded("#" + viewKey + " tbody tr[id]", function () {
      prefetchProjectConnections().catch(function (error) {
        console.warn("DAPCZ project connection prefetch failed:", error);
      });
    });
  }

  /**
   * Snapshot which projects are linked to the meeting (saved baseline).
   * Used for Assigned/Unassigned filters and detecting checkbox changes on Save.
   */
  function setInitialLinkedIdsForMeeting(meeting) {
    var initialLinkedIds = {};
    var connectionMap = operationState.projectConnections || {};

    Object.keys(connectionMap).forEach(function (projectId) {
      if (isProjectLinkedToMeeting(connectionMap[projectId], null, null, meeting)) {
        initialLinkedIds[projectId] = true;
      }
    });

    operationState.initialLinkedIds = initialLinkedIds;
    return initialLinkedIds;
  }

  /** Prefetch connections and refresh initialLinkedIds for the open meeting. */
  function loadProjectLinkState(meeting) {
    return prefetchProjectConnections().then(function () {
      setInitialLinkedIdsForMeeting(meeting);
      return operationState.projectConnections;
    });
  }

  /**
   * Build a minimal PUT payload for field_1423 only — add or remove one meeting
   * from existing connections without touching other project fields.
   */
  function buildProjectMeetingPayload(
    meeting,
    existingConnections,
    shouldLink,
  ) {
    var fieldKey = CONFIG.fields.projectMeetingConnection;
    var connections = (existingConnections || []).map(function (record) {
      return {
        id: record.id,
        identifier: record.identifier || "",
      };
    });
    var meetingEntry = {
      id: meeting.id,
      identifier: meeting.identifier || meeting.dateLabel || "",
    };
    var payload = {};

    if (shouldLink) {
      if (
        !connections.some(function (record) {
          return String(record.id) === String(meetingEntry.id);
        })
      ) {
        connections.push(meetingEntry);
      }
    } else {
      connections = connections.filter(function (record) {
        if (String(record.id) === String(meetingEntry.id)) {
          return false;
        }
        if (meeting.dateLabel && record.identifier === meeting.dateLabel) {
          return false;
        }
        if (meeting.identifier && record.identifier === meeting.identifier) {
          return false;
        }
        return true;
      });
    }

    payload[fieldKey] = connections;
    payload[fieldKey + "_raw"] = connections;

    return payload;
  }

  /** PUT a JSON payload to view_1786 for one project record. */
  function putProjectPayload(projectId, payload) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "PUT",
        url: getProjectUpdateUrl(projectId),
        headers: getApiHeaders(),
        data: JSON.stringify(payload),
        contentType: "application/json",
      })
        .done(function (response) {
          resolve(response);
        })
        .fail(function (xhr) {
          reject(xhr);
        });
    });
  }

  /** Get a project Backbone model from view_1755 by record ID. */
  function getProjectModel(projectId) {
    var viewKey = CONFIG.views.projects;
    if (
      !Knack.views[viewKey] ||
      !Knack.views[viewKey].model ||
      !Knack.views[viewKey].model.data
    ) {
      return null;
    }

    return Knack.views[viewKey].model.data.get(projectId);
  }

  /**
   * Link or unlink one project from a meeting via API.
   * GET fresh record → merge field_1423 → PUT; retries empty string on unlink 400.
   */
  function updateProjectMeetingLink(project, meeting, shouldLink) {
    if (!CONFIG.api.projectUpdateView) {
      return Promise.reject({
        message:
          "DAPCZ API form view is not configured. Set CONFIG.api.projectUpdateView to view_1786.",
      });
    }

    var fieldKey = CONFIG.fields.projectMeetingConnection;

    return fetchProjectRecord(project.id)
      .then(function (record) {
        var existingConnections = getConnectionRecords(
          record,
          fieldKey,
        );
        operationState.projectConnections[project.id] =
          existingConnections;

        var payload = buildProjectMeetingPayload(
          meeting,
          existingConnections,
          shouldLink,
        );
        var clearingAllMeetings = !shouldLink && payload[fieldKey].length === 0;

        return putProjectPayload(project.id, payload).catch(
          function (xhr) {
            if (!clearingAllMeetings || !xhr || xhr.status !== 400) {
              throw xhr;
            }

            var emptyPayload = {};
            emptyPayload[fieldKey] = "";
            emptyPayload[fieldKey + "_raw"] = "";

            return putProjectPayload(project.id, emptyPayload);
          },
        );
      })
      .then(function (response) {
        var record = response.record || response;
        operationState.projectConnections[project.id] =
          getConnectionRecords(record, fieldKey);
        return response;
      })
      .catch(function (xhr) {
        var message = formatApiError(xhr);
        logApiError(xhr);
        return Promise.reject({ message: message, xhr: xhr });
      });
  }

  /** Read a field value from Knack model first, then fall back to table cell text. */
  function getProjectFieldValue($row, model, fieldKey) {
    if (model && fieldKey) {
      var fromModel = getFieldDisplayValue(model, fieldKey);
      if (fromModel) {
        return fromModel;
      }
    }

    if ($row.length && fieldKey) {
      return getCellText($row, fieldKey);
    }

    return "";
  }

  /** Resolve project display name from model, cached field key, or table cell link text. */
  function getProjectNameFromRow($row, model) {
    var configNameField = CONFIG.fields.projectName;
    if (model && configNameField) {
      var fromModel = getFieldDisplayValue(model, configNameField);
      if (fromModel) {
        return fromModel;
      }
    }

    var nameFieldKey =
      projectsTableFields.projectName || configNameField;

    if ($row.length && nameFieldKey) {
      var $cell = $row.find("td." + nameFieldKey).first();
      var fromLink = $cell.find("a").first().text().replace(/\s+/g, " ").trim();
      if (fromLink) {
        return fromLink;
      }
      var fromCell = $cell.text().replace(/\s+/g, " ").trim();
      if (fromCell) {
        return fromCell;
      }
    }

    return getFieldDisplayValue(
      model,
      CONFIG.fields.projectName,
    );
  }

  /** Full display label: optional group header prefix + project name. */
  function getProjectDisplayLabelFromRow($row, model) {
    var projectName = getProjectNameFromRow($row, model);
    var groupHeader = getGroupHeaderForRow($row);

    if (groupHeader && projectName) {
      return groupHeader + " - " + projectName;
    }

    return projectName || "Project";
  }

  /** All project models in view_1755 that have a matching visible table row. */
  function getProjectModels() {
    var viewKey = CONFIG.views.projects;
    if (
      !Knack.views[viewKey] ||
      !Knack.views[viewKey].model ||
      !Knack.views[viewKey].model.data
    ) {
      return [];
    }

    return (Knack.views[viewKey].model.data.models || []).filter(
      function (model) {
        var projectId = model.id || model.get("id");
        var $row = $("#" + viewKey + " tbody tr#" + projectId);
        return $row.length && !$row.hasClass("kn-table-group");
      },
    );
  }

  /** Re-fetch a Knack view's model and wait for re-render (with timeout fallback). */
  function refreshViewModels(viewKey) {
    return new Promise(function (resolve) {
      if (!Knack.views[viewKey] || !Knack.views[viewKey].model) {
        resolve();
        return;
      }

      var resolved = false;
      function finish() {
        if (resolved) {
          return;
        }
        resolved = true;
        resolve();
      }

      var timeoutId = setTimeout(finish, 2500);

      $(document).one("knack-view-render." + viewKey, function () {
        clearTimeout(timeoutId);
        setTimeout(finish, 300);
      });

      Knack.views[viewKey].model.fetch({
        success: function () {
          clearTimeout(timeoutId);
          finish();
        },
        error: function () {
          clearTimeout(timeoutId);
          finish();
        },
      });
    });
  }

  /** Refresh view_1755 and return updated project models. */
  function refreshProjectModels() {
    return refreshViewModels(CONFIG.views.projects).then(
      function () {
        return getProjectModels();
      },
    );
  }

  /** Refresh view_1768 (meetings table) after save. */
  function refreshMeetingView() {
    return refreshViewModels(CONFIG.views.meetings);
  }

  /**
   * Build modal row data from view_1755: zone, RSN, name, and link state
   * for the given meeting (uses cache, model, and row fallbacks).
   */
  function buildProjectRows(meeting) {
    cacheProjectsTableFields();

    var viewKey = CONFIG.views.projects;
    var connectionField = CONFIG.fields.projectMeetingConnection;
    var connectionMap = operationState.projectConnections || {};
    var rows = [];

    $("#" + viewKey + " tbody tr[id]").each(function () {
      var $row = $(this);
      if ($row.hasClass("kn-table-group")) {
        return;
      }

      var projectId = $row.attr("id");
      if (!projectId) {
        return;
      }

      var model =
        Knack.views[viewKey] &&
        Knack.views[viewKey].model &&
        Knack.views[viewKey].model.data
          ? Knack.views[viewKey].model.data.get(projectId)
          : null;
      var connections = connectionMap[projectId];

      if (!connections && model) {
        connections = getConnectionRecords(model, connectionField);
      }

      var linkedToMeeting = isProjectLinkedToMeeting(
        connections,
        model,
        $row,
        meeting,
      );

      rows.push({
        id: projectId,
        zone: getProjectFieldValue(
          $row,
          model,
          CONFIG.fields.projectZone,
        ),
        rsn: getProjectFieldValue(
          $row,
          model,
          CONFIG.fields.projectRsn,
        ),
        label: getProjectNameFromRow($row, model) || "Project",
        isLinked: linkedToMeeting,
        isChecked: linkedToMeeting,
      });
    });

    return rows;
  }

  /** Reset modal table sort to Project ascending (on open/close). */
  function resetModalSort() {
    operationState.modalSort = { column: "project", direction: "asc" };
  }

  /** HTML for one sortable modal column header button. */
  function getModalSortableHeaderCell(column, label) {
    return (
      '<th class="dapcz-link-sort-col" scope="col" data-sort-col="' +
      column +
      '">' +
      '<button type="button" class="dapcz-link-sort-btn" data-sort="' +
      column +
      '">' +
      '<span class="dapcz-link-sort-label">' +
      label +
      '</span> <i class="dapcz-link-sort-icon fa fa-sort" aria-hidden="true"></i>' +
      "</button></th>"
    );
  }

  /** HTML for the modal table thead (select-all + Zone / RSN / Project). */
  function getModalTableHeadHtml() {
    return (
      "<thead><tr>" +
      '<th class="dapcz-link-sort-col dapcz-link-sort-col-select" scope="col">' +
      '<input type="checkbox" id="dapcz-link-select-all" class="dapcz-link-modal-checkbox" aria-label="Select all projects">' +
      "</th>" +
      getModalSortableHeaderCell("zone", "Zone") +
      getModalSortableHeaderCell("rsn", "RSN #") +
      getModalSortableHeaderCell("project", "Project") +
      "</tr></thead>"
    );
  }

  /** Case-insensitive compare with numeric sorting (e.g. RSN 2 before 10). */
  function compareNaturalSortValues(a, b) {
    return String(a).localeCompare(String(b), undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  /** Sort key for a project row object by column name. */
  function getProjectRowSortValue(row, column) {
    if (column === "zone") {
      return row.zone || "";
    }
    if (column === "rsn") {
      return row.rsn || "";
    }
    if (column === "linked") {
      return row.isLinked ? 1 : 0;
    }
    return row.label || "";
  }

  /** Compare two sort values for a given column (numeric for linked, natural otherwise). */
  function compareProjectRowValues(aVal, bVal, column) {
    if (column === "linked") {
      return (Number(aVal) || 0) - (Number(bVal) || 0);
    }
    return compareNaturalSortValues(aVal, bVal);
  }

  /** Sort project row data in place using operationState.modalSort. */
  function sortProjectRowData(rows) {
    var sort = operationState.modalSort;

    rows.sort(function (a, b) {
      var aVal = getProjectRowSortValue(a, sort.column);
      var bVal = getProjectRowSortValue(b, sort.column);
      var result = compareProjectRowValues(aVal, bVal, sort.column);

      if (result === 0) {
        result = compareNaturalSortValues(a.label, b.label);
      }

      return sort.direction === "desc" ? -result : result;
    });
  }

  /** Sort key from a rendered modal table row's data attributes. */
  function getModalRowSortValue($row, column) {
    if (column === "zone") {
      return String($row.data("zone") || "");
    }
    if (column === "rsn") {
      return String($row.data("rsn") || "");
    }
    if (column === "linked") {
      return $row.hasClass("is-linked") ? 1 : 0;
    }
    return String($row.data("project-label") || "");
  }

  /** Compare two rendered modal rows for sorting (ties break on project name). */
  function compareModalRowElements($a, $b, column, direction) {
    var aVal = getModalRowSortValue($a, column);
    var bVal = getModalRowSortValue($b, column);
    var result = compareProjectRowValues(aVal, bVal, column);

    if (result === 0) {
      result = compareNaturalSortValues(
        $a.data("project-label"),
        $b.data("project-label"),
      );
    }

    return direction === "desc" ? -result : result;
  }

  /** Re-sort tbody rows in the DOM (preserves checkbox state vs re-rendering). */
  function reorderModalRows() {
    var $tbody = $("#dapcz-link-modal-rows");
    var sort = operationState.modalSort;
    var $rows = $tbody.children("tr[data-project-id]").get();

    $rows.sort(function (rowA, rowB) {
      return compareModalRowElements(
        $(rowA),
        $(rowB),
        sort.column,
        sort.direction,
      );
    });

    $.each($rows, function (_, row) {
      $tbody.append(row);
    });
  }

  /** Update sort icon and aria-sort on column headers to match modalSort state. */
  function syncModalSortHeaders() {
    var sort = operationState.modalSort;

    $("#dapcz-link-modal-overlay .dapcz-link-sort-col[data-sort-col]").each(
      function () {
        var $th = $(this);
        var column = $th.data("sort-col");
        var $btn = $th.find(".dapcz-link-sort-btn");
        var $icon = $btn.find(".dapcz-link-sort-icon");
        var isActive = column === sort.column;

        $btn.toggleClass("is-active", isActive);
        $icon.removeClass("fa-sort fa-sort-asc fa-sort-desc");
        $icon.addClass(
          isActive
            ? sort.direction === "asc"
              ? "fa-sort-asc"
              : "fa-sort-desc"
            : "fa-sort",
        );
        $th.attr(
          "aria-sort",
          isActive
            ? sort.direction === "asc"
              ? "ascending"
              : "descending"
            : "none",
        );
      },
    );
  }

  function handleModalSortClick(event) {
    event.preventDefault();

    var column = $(this).data("sort");
    if (!column) {
      return;
    }

    if (operationState.modalSort.column === column) {
      operationState.modalSort.direction =
        operationState.modalSort.direction === "asc" ? "desc" : "asc";
    } else {
      operationState.modalSort.column = column;
      operationState.modalSort.direction = "asc";
    }

    reorderModalRows();
    syncModalSortHeaders();
    syncSelectAllCheckbox();
  }

  function ensureModalShell() {
    if ($("#dapcz-link-modal-overlay").length) {
      return;
    }

    $("body").append(
      '<div id="dapcz-link-modal-overlay" class="dapcz-link-modal-overlay" aria-hidden="true">' +
        '<div id="dapcz-link-modal" class="dapcz-link-modal" role="dialog" aria-modal="true">' +
        '<div class="dapcz-link-modal-header">' +
        '<h3 id="dapcz-link-modal-title" class="dapcz-link-modal-title"></h3>' +
        '<button type="button" id="dapcz-link-modal-close" class="dapcz-link-modal-close" aria-label="Close">&times;</button>' +
        "</div>" +
        '<p id="dapcz-link-modal-hint" class="dapcz-link-modal-hint"></p>' +
        '<div id="dapcz-link-modal-message"></div>' +
        '<div id="dapcz-link-modal-filter" class="dapcz-link-filter-group" role="group" aria-label="Filter projects">' +
        '<button type="button" class="dapcz-link-filter-btn is-active" data-filter="all">All <span class="dapcz-link-filter-count" data-count="all">0</span></button>' +
        '<button type="button" class="dapcz-link-filter-btn" data-filter="assigned">Assigned <span class="dapcz-link-filter-count" data-count="assigned">0</span></button>' +
        '<button type="button" class="dapcz-link-filter-btn" data-filter="unassigned">Unassigned <span class="dapcz-link-filter-count" data-count="unassigned">0</span></button>' +
        "</div>" +
        '<div class="dapcz-link-modal-table-wrap">' +
        '<table class="dapcz-link-modal-table">' +
        getModalTableHeadHtml() +
        '<tbody id="dapcz-link-modal-rows"></tbody>' +
        "</table>" +
        '<div id="dapcz-link-modal-empty" class="dapcz-link-empty-state" hidden></div>' +
        "</div>" +
        '<div id="dapcz-link-progress-slot"></div>' +
        '<div class="dapcz-link-modal-actions">' +
        '<a id="dapcz-link-modal-submit" class="dapcz-link-btn dapcz-link-btn-primary" href="javascript:void(0)">' +
        '<span class="icon is-small"><i class="fa fa-link"></i></span><span>Save Project Links</span></a>' +
        '<a id="dapcz-link-modal-cancel" class="dapcz-link-btn dapcz-link-btn-secondary" href="javascript:void(0)">' +
        '<span class="icon is-small"><i class="fa fa-times"></i></span><span>Cancel</span></a>' +
        "</div></div></div>",
    );

    $("#dapcz-link-modal-close, #dapcz-link-modal-cancel").on(
      "click",
      closeModal,
    );
    $("#dapcz-link-modal-overlay").on("click", function (event) {
      if (event.target === this) {
        closeModal();
      }
    });
    $("#dapcz-link-select-all").on("change", handleSelectAllChange);
    $("#dapcz-link-modal-submit").on("click", handleModalSubmit);
    $("#dapcz-link-modal-filter").on(
      "click",
      ".dapcz-link-filter-btn",
      handleModalFilterClick,
    );
    $("#dapcz-link-modal-overlay .dapcz-link-modal-table").on(
      "click",
      ".dapcz-link-sort-btn",
      handleModalSortClick,
    );
    $(document).on(
      "change.dapczCheckbox",
      "#dapcz-link-modal-rows .dapcz-link-project-checkbox",
      function () {
        syncSelectAllCheckbox();
      },
    );
  }

  function ensureModalFilterGroup() {
    if ($("#dapcz-link-modal-filter").length) {
      return;
    }

    $("#dapcz-link-modal-message").after(
      '<div id="dapcz-link-modal-filter" class="dapcz-link-filter-group" role="group" aria-label="Filter projects">' +
        '<button type="button" class="dapcz-link-filter-btn is-active" data-filter="all">All <span class="dapcz-link-filter-count" data-count="all">0</span></button>' +
        '<button type="button" class="dapcz-link-filter-btn" data-filter="assigned">Assigned <span class="dapcz-link-filter-count" data-count="assigned">0</span></button>' +
        '<button type="button" class="dapcz-link-filter-btn" data-filter="unassigned">Unassigned <span class="dapcz-link-filter-count" data-count="unassigned">0</span></button>' +
        "</div>",
    );

    $("#dapcz-link-modal-filter").on(
      "click",
      ".dapcz-link-filter-btn",
      handleModalFilterClick,
    );
  }

  function getModalFilterEmptyMessage(filter) {
    if (filter === "assigned") {
      return "No projects are linked to this meeting.";
    }
    if (filter === "unassigned") {
      return "No unassigned projects. All active projects are linked to this meeting.";
    }
    return "There are no active projects to display.";
  }

  function updateFilterCounts() {
    var $rows = $("#dapcz-link-modal-rows tr[data-project-id]");
    var total = $rows.length;
    var initialLinkedIds = operationState.initialLinkedIds || {};
    var assigned = 0;

    $rows.each(function () {
      if (initialLinkedIds[$(this).data("project-id")]) {
        assigned++;
      }
    });

    var unassigned = total - assigned;

    $('.dapcz-link-filter-count[data-count="all"]').text("(" + total + ")");
    $('.dapcz-link-filter-count[data-count="assigned"]').text(
      "(" + assigned + ")",
    );
    $('.dapcz-link-filter-count[data-count="unassigned"]').text(
      "(" + unassigned + ")",
    );
  }

  function applyModalFilter(filter) {
    operationState.modalFilter = filter || "all";

    $("#dapcz-link-modal-filter .dapcz-link-filter-btn").each(function () {
      var isActive =
        $(this).data("filter") === operationState.modalFilter;
      $(this).toggleClass("is-active", isActive).attr("aria-pressed", isActive);
    });

    var initialLinkedIds = operationState.initialLinkedIds || {};
    var visibleCount = 0;
    $("#dapcz-link-modal-rows tr[data-project-id]").each(function () {
      var $row = $(this);
      var isSavedLinked = !!initialLinkedIds[$row.data("project-id")];
      var show =
        operationState.modalFilter === "all" ||
        (operationState.modalFilter === "assigned" && isSavedLinked) ||
        (operationState.modalFilter === "unassigned" && !isSavedLinked);

      $row.toggleClass("is-filter-hidden", !show);
      if (show) {
        visibleCount++;
      }
    });

    var $empty = $("#dapcz-link-modal-empty");
    var $table = $("#dapcz-link-modal-overlay .dapcz-link-modal-table");

    if (visibleCount === 0) {
      $empty
        .text(
          getModalFilterEmptyMessage(
            operationState.modalFilter,
          ),
        )
        .prop("hidden", false);
      $table.addClass("is-empty");
    } else {
      $empty.prop("hidden", true).empty();
      $table.removeClass("is-empty");
    }

    syncSelectAllCheckbox();
  }

  function handleModalFilterClick(event) {
    event.preventDefault();
    var filter = $(event.currentTarget).data("filter");
    if (!filter || filter === operationState.modalFilter) {
      return;
    }
    applyModalFilter(filter);
  }

  function showModalLoading(message) {
    $("#dapcz-link-modal-rows").html(
      '<tr class="dapcz-link-loading-row"><td colspan="4">' +
        escapeHtml(message || "Loading project links...") +
        "</td></tr>",
    );
    $("#dapcz-link-modal-empty").prop("hidden", true);
    $("#dapcz-link-modal-overlay .dapcz-link-modal-table").removeClass(
      "is-empty",
    );
    $("#dapcz-link-modal-filter .dapcz-link-filter-btn").prop("disabled", true);
    $("#dapcz-link-select-all")
      .prop("checked", false)
      .prop("indeterminate", false)
      .prop("disabled", true);
  }

  function closeModal() {
    clearModalFeedbackDismiss();
    $("#dapcz-link-modal-overlay")
      .removeClass("is-active")
      .attr("aria-hidden", "true");
    $("#dapcz-link-progress-slot").empty();
    $("#dapcz-link-modal-message").empty();
    operationState.currentMeeting = null;
    operationState.initialLinkedIds = {};
    operationState.modalFilter = "all";
    resetModalSort();
  }

  function renderModalRows(rows) {
    var html = "";

    sortProjectRowData(rows);

    rows.forEach(function (row) {
      html +=
        '<tr class="' +
        (row.isLinked ? "is-linked" : "") +
        '" data-project-id="' +
        escapeHtml(row.id) +
        '" data-project-label="' +
        escapeHtml(row.label) +
        '" data-zone="' +
        escapeHtml(row.zone) +
        '" data-rsn="' +
        escapeHtml(row.rsn) +
        '">' +
        '<td><input type="checkbox" class="dapcz-link-project-checkbox dapcz-link-modal-checkbox" ' +
        (row.isChecked ? "checked " : "") +
        'aria-label="Select ' +
        escapeHtml(row.label) +
        '"></td>' +
        "<td>" +
        escapeHtml(row.zone) +
        "</td>" +
        "<td>" +
        escapeHtml(row.rsn) +
        "</td>" +
        "<td>" +
        escapeHtml(row.label) +
        "</td></tr>";
    });

    $("#dapcz-link-modal-rows").html(html);
    $("#dapcz-link-modal-filter .dapcz-link-filter-btn").prop("disabled", false);
    syncModalSortHeaders();
    updateFilterCounts();
    applyModalFilter(operationState.modalFilter);
  }

  function getVisibleProjectCheckboxes() {
    return $(
      "#dapcz-link-modal-rows tr[data-project-id]:not(.is-filter-hidden) .dapcz-link-project-checkbox",
    );
  }

  function getAllProjectCheckboxes() {
    return $(
      "#dapcz-link-modal-rows tr[data-project-id] .dapcz-link-project-checkbox",
    );
  }

  function syncSelectAllCheckbox() {
    var $visible = getVisibleProjectCheckboxes();
    var $checked = $visible.filter(":checked");
    var $selectAll = $("#dapcz-link-select-all");

    if (!$visible.length) {
      $selectAll
        .prop("checked", false)
        .prop("indeterminate", false)
        .prop("disabled", true);
      return;
    }

    $selectAll.prop("disabled", false);
    $selectAll.prop("checked", $visible.length === $checked.length);
    $selectAll.prop(
      "indeterminate",
      $checked.length > 0 && $checked.length < $visible.length,
    );
  }

  function handleSelectAllChange() {
    var isChecked = $("#dapcz-link-select-all").is(":checked");
    getVisibleProjectCheckboxes().prop("checked", isChecked);
    syncSelectAllCheckbox();
  }

  function showModalMessage(type, message) {
    var typeClass =
      type === "error"
        ? "is-error"
        : type === "success"
          ? "is-success"
          : "is-info";
    $("#dapcz-link-modal-message").html(
      '<div class="dapcz-link-message ' + typeClass + '">' + message + "</div>",
    );
  }

  function clearModalFeedbackDismiss() {
    if (operationState.feedbackDismissTimeoutId) {
      clearTimeout(operationState.feedbackDismissTimeoutId);
      operationState.feedbackDismissTimeoutId = null;
    }
  }

  function scheduleModalFeedbackDismiss() {
    clearModalFeedbackDismiss();
    operationState.feedbackDismissTimeoutId = setTimeout(function () {
      operationState.feedbackDismissTimeoutId = null;
      $("#dapcz-link-modal-message").empty();
      $("#dapcz-link-progress-slot").empty();
    }, CONFIG.feedbackDismissMs);
  }

  function updateModalTableStructure() {
    var $table = $("#dapcz-link-modal-overlay .dapcz-link-modal-table");
    if (!$table.length) {
      return;
    }
    $table.find("thead").remove();
    $table.prepend(getModalTableHeadHtml());
    $("#dapcz-link-select-all")
      .off("change")
      .on("change", handleSelectAllChange);
    syncModalSortHeaders();
  }

  function openModal(meeting, skipLoading) {
    ensureModalShell();
    ensureModalFilterGroup();
    updateModalTableStructure();
    operationState.currentMeeting = meeting;
    operationState.modalFilter = "all";
    resetModalSort();

    $("#dapcz-link-modal-title").text(
      "Link Active Projects — " + meeting.dateLabel,
    );
    $("#dapcz-link-modal-hint").text(
      "Checked projects are linked to the " +
        meeting.dateLabel +
        " meeting. Uncheck a project to remove it from this meeting, or check additional projects to link them.",
    );

    if (!skipLoading) {
      showModalLoading();
    }

    $("#dapcz-link-modal-overlay")
      .addClass("is-active")
      .attr("aria-hidden", "false");
  }

  function refreshModalProjectRows(meeting) {
    var hadCache = hasCompleteProjectConnectionCache();

    if (hadCache) {
      setInitialLinkedIdsForMeeting(meeting);
      renderModalRows(buildProjectRows(meeting));
    }

    return refreshProjectModels()
      .then(function () {
        return loadProjectLinkState(meeting);
      })
      .then(function () {
        if (
          !operationState.currentMeeting ||
          operationState.currentMeeting.id !== meeting.id
        ) {
          return;
        }
        renderModalRows(buildProjectRows(meeting));
      })
      .catch(function (error) {
        console.error("DAPCZ failed to load project links:", error);
        if (operationState.currentMeeting) {
          if (!hadCache) {
            showModalMessage(
              "error",
              "Unable to load current project links. Showing table data only.",
            );
          }
          renderModalRows(
            buildProjectRows(operationState.currentMeeting),
          );
        }
      });
  }

  function handleOpenModalClick(event) {
    event.preventDefault();

    if (operationState.isProcessing) {
      return;
    }

    var meetingId = $(event.currentTarget).data("meeting-id");
    var viewKey = CONFIG.views.meetings;
    var meetingModel =
      Knack.views[viewKey] &&
      Knack.views[viewKey].model &&
      Knack.views[viewKey].model.data
        ? Knack.views[viewKey].model.data.get(meetingId)
        : null;

    if (!meetingModel) {
      window.alert(
        "Unable to load meeting details. Refresh the page and try again.",
      );
      return;
    }

    var meeting = {
      id: meetingId,
      dateLabel: formatMeetingDate(meetingModel),
      identifier: formatMeetingDate(meetingModel),
    };

    openModal(meeting, hasCompleteProjectConnectionCache());
    refreshModalProjectRows(meeting);
  }

  function getModalProjectChanges() {
    var toLink = [];
    var toUnlink = [];
    var initialLinkedIds = operationState.initialLinkedIds || {};

    $("#dapcz-link-modal-rows tr").each(function () {
      var $row = $(this);
      var projectId = $row.data("project-id");
      if (!projectId) {
        return;
      }

      var $checkbox = $row.find(".dapcz-link-project-checkbox");
      if (!$checkbox.length) {
        return;
      }

      var isChecked = $checkbox.is(":checked");
      var wasLinked = !!initialLinkedIds[projectId];
      var project = {
        id: projectId,
        label: $row.data("project-label") || "",
      };

      if (isChecked && !wasLinked) {
        toLink.push(project);
      } else if (!isChecked && wasLinked) {
        toUnlink.push(project);
      }
    });

    return { toLink: toLink, toUnlink: toUnlink };
  }

  function createProgressBar(total) {
    $("#dapcz-link-progress-slot").html(
      '<div id="dapcz-link-progress-container" class="progress-container">' +
        '<div class="progress-title">Linking Active Projects to Meeting</div>' +
        '<div id="dapcz-link-progress-text" class="progress-text">Preparing to update ' +
        total +
        " projects...</div>" +
        '<div class="progress-track"><div id="dapcz-link-progress-bar-fill" class="progress-fill progress-fill-update">' +
        '<div id="dapcz-link-progress-percentage" class="progress-percentage">0%</div></div></div>' +
        '<div class="progress-stats">' +
        '<span class="progress-stat-item"><i class="fa fa-check-circle progress-stat-success"></i> Updated: <span id="dapcz-link-success-count">0</span></span>' +
        '<span class="progress-stat-item"><i class="fa fa-times-circle progress-stat-failed"></i> Failed: <span id="dapcz-link-failed-count">0</span></span>' +
        '<span class="progress-stat-item"><i class="fa fa-gears progress-stat-remaining"></i> Remaining: <span id="dapcz-link-remaining-count">' +
        total +
        "</span></span></div></div>",
    );
  }

  function updateProgress(completed, total, failed, currentAction) {
    var percentage = total ? Math.round((completed / total) * 100) : 0;
    $("#dapcz-link-progress-bar-fill").css("width", percentage + "%");
    $("#dapcz-link-progress-percentage").text(percentage + "%");
    $("#dapcz-link-progress-text").text(
      currentAction || "Updating project " + completed + " of " + total,
    );
    $("#dapcz-link-success-count").text(completed - failed);
    $("#dapcz-link-failed-count").text(failed);
    $("#dapcz-link-remaining-count").text(total - completed);
  }

  function completeProgress(total, failed, linkedCount, unlinkedCount) {
    var $progressBar = $("#dapcz-link-progress-bar-fill");
    $progressBar.removeClass("progress-fill-update");
    $progressBar.addClass(
      failed > 0 ? "progress-fill-warning" : "progress-fill-update",
    );

    if (failed > 0) {
      $("#dapcz-link-progress-text").text(
        "Finished with errors. Updated " +
          (total - failed) +
          " of " +
          total +
          " projects.",
      );
      return;
    }

    var parts = [];
    if (linkedCount) {
      parts.push("linked " + linkedCount);
    }
    if (unlinkedCount) {
      parts.push("unlinked " + unlinkedCount);
    }

    $("#dapcz-link-progress-text").text(
      parts.length
        ? "Successfully " + parts.join(" and ") + " project(s)."
        : "Project links saved.",
    );
  }

  function applyProjectChangesBatch(changes, meeting) {
    return new Promise(function (resolve) {
      var batchSize = CONFIG.batchSize;
      var tasks = changes.toLink
        .map(function (project) {
          return { project: project, shouldLink: true, action: "link" };
        })
        .concat(
          changes.toUnlink.map(function (project) {
            return { project: project, shouldLink: false, action: "unlink" };
          }),
        );
      var results = [];

      createProgressBar(tasks.length);
      $("#dapcz-link-progress-container .progress-title").text(
        "Saving Project Links to Meeting",
      );

      function processBatch(startIndex) {
        var endIndex = Math.min(startIndex + batchSize, tasks.length);
        var batch = tasks.slice(startIndex, endIndex);

        updateProgress(
          results.length,
          tasks.length,
          results.filter(function (r) {
            return !r.success;
          }).length,
          "Updating projects " +
            (startIndex + 1) +
            "–" +
            endIndex +
            " of " +
            tasks.length,
        );

        var promises = batch.map(function (task) {
          return updateProjectMeetingLink(
            task.project,
            meeting,
            task.shouldLink,
          )
            .then(function () {
              return {
                project: task.project,
                action: task.action,
                success: true,
              };
            })
            .catch(function (error) {
              return {
                project: task.project,
                action: task.action,
                success: false,
                error: formatApiError(error),
              };
            });
        });

        Promise.all(promises).then(function (batchResults) {
          results = results.concat(batchResults);
          var failedCount = results.filter(function (r) {
            return !r.success;
          }).length;

          updateProgress(results.length, tasks.length, failedCount);

          if (endIndex < tasks.length) {
            setTimeout(function () {
              processBatch(endIndex);
            }, CONFIG.batchDelay);
          } else {
            completeProgress(
              tasks.length,
              failedCount,
              changes.toLink.length,
              changes.toUnlink.length,
            );
            resolve(results);
          }
        });
      }

      processBatch(0);
    });
  }

  function setModalSubmitLoading(isLoading) {
    var $button = $("#dapcz-link-modal-submit");
    var $icon = $button.find("i");
    $button.prop("disabled", isLoading).toggleClass("is-loading", isLoading);
    if (isLoading) {
      $icon.removeClass("fa-link").addClass("fa-spinner fa-spin");
    } else {
      $icon.removeClass("fa-spinner fa-spin").addClass("fa-link");
    }
  }

  function handleModalSubmit(event) {
    event.preventDefault();

    var now = Date.now();
    if (operationState.isProcessing) {
      return;
    }
    if (
      now - operationState.lastOperationTime <
      CONFIG.operationCooldownMs
    ) {
      return;
    }

    var meeting = operationState.currentMeeting;
    if (!meeting) {
      return;
    }

    var changes = getModalProjectChanges();
    if (!changes.toLink.length && !changes.toUnlink.length) {
      showModalMessage(
        "error",
        "No changes to save. Check or uncheck projects to link or unlink them from this meeting.",
      );
      return;
    }

    if (!CONFIG.api.projectUpdateView) {
      showModalMessage(
        "error",
        "Linking is not configured yet. Add an API-enabled Form view on the Connect Project to Meeting page (field_1423 on dapcz_project) and set CONFIG.api.projectUpdateView in right-of-way.js.",
      );
      return;
    }

    operationState.isProcessing = true;
    operationState.lastOperationTime = now;
    setModalSubmitLoading(true);
    clearModalFeedbackDismiss();
    $("#dapcz-link-modal-message").empty();

    applyProjectChangesBatch(changes, meeting)
      .then(function (results) {
        var failed = results.filter(function (r) {
          return !r.success;
        });
        var successCount = results.length - failed.length;

        if (failed.length) {
          var errorDetails = results
            .filter(function (result) {
              return !result.success;
            })
            .slice(0, 3)
            .map(function (result) {
              return (
                escapeHtml(result.project.label || result.project.id) +
                " (" +
                escapeHtml(result.action || "update") +
                "): " +
                escapeHtml(result.error || "Update failed")
              );
            })
            .join("<br>");

          showModalMessage(
            "error",
            "Updated " +
              successCount +
              " of " +
              results.length +
              " project(s).<br><br>" +
              errorDetails,
          );
        } else {
          var summaryParts = [];
          if (changes.toLink.length) {
            summaryParts.push("linked " + changes.toLink.length);
          }
          if (changes.toUnlink.length) {
            summaryParts.push("unlinked " + changes.toUnlink.length);
          }

          showModalMessage(
            "success",
            "Successfully " +
              summaryParts.join(" and ") +
              " project(s) for this meeting.",
          );
        }

        scheduleModalFeedbackDismiss();

        return refreshProjectModels()
          .then(refreshMeetingView)
          .then(function () {
            operationState.modalFilter = "all";
            setInitialLinkedIdsForMeeting(meeting);
            renderModalRows(buildProjectRows(meeting));
          });
      })
      .catch(function (error) {
        console.error("DAPCZ link projects failed:", error);
        showModalMessage(
          "error",
          "Something went wrong while linking projects. Please try again.",
        );
        scheduleModalFeedbackDismiss();
      })
      .finally(function () {
        operationState.isProcessing = false;
        setModalSubmitLoading(false);
      });
  }

  function injectMeetingActionColumn(view) {
    var viewSelector = "#" + view.key;
    var tableSelector = viewSelector + " table.kn-table-table";

    if (!$(tableSelector + " thead tr").length) {
      return;
    }

    if (!$(tableSelector + " thead .dapcz-link-col").length) {
      $(tableSelector + " thead tr").append(
        '<th class="dapcz-link-col"><span class="table-fixed-label">Link Projects</span></th>',
      );
    }

    $(tableSelector + " tbody tr").each(function () {
      var $row = $(this);
      if ($row.find(".dapcz-link-col").length) {
        return;
      }

      var meetingId = $row.attr("id");
      if (!meetingId) {
        return;
      }

      $row.append(
        '<td class="dapcz-link-col">' +
          '<a class="kn-button dapcz-link-open-btn" href="javascript:void(0)" data-meeting-id="' +
          meetingId +
          '">' +
          '<span class="icon is-small"><i class="fa fa-link"></i></span>' +
          "<span>Link Projects</span></a></td>",
      );
    });

    $(viewSelector + " .dapcz-link-open-btn")
      .off("click.dapcz")
      .on("click.dapcz", handleOpenModalClick);
  }

  function addMeetingActionColumn(view) {
    var tableSelector = "#" + view.key + " table.kn-table-table";

    if ($(tableSelector + " tbody tr").length) {
      injectMeetingActionColumn(view);
      return;
    }

    elementLoaded(tableSelector + " tbody tr", function () {
      injectMeetingActionColumn(view);
    });
  }

  return {
    CONFIG: CONFIG,
    addMeetingActionColumn: addMeetingActionColumn,
    cacheProjectsTableFields: cacheProjectsTableFields,
    scheduleProjectConnectionsPrefetch: scheduleProjectConnectionsPrefetch,
  };
})();

$(document).on(
  "knack-view-render." + DapczLink.CONFIG.views.projects,
  function () {
    DapczLink.cacheProjectsTableFields();
    DapczLink.scheduleProjectConnectionsPrefetch();
  }
);

$(document).on(
  "knack-view-render." + DapczLink.CONFIG.views.meetings,
  function (event, view) {
    DapczLink.addMeetingActionColumn(view);
  }
);

$(document).on("knack-scene-render.scene_759", function () {
  DapczLink.addMeetingActionColumn({ key: DapczLink.CONFIG.views.meetings });
  DapczLink.scheduleProjectConnectionsPrefetch();
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
$(document).on("knack-view-render.view_29", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});
