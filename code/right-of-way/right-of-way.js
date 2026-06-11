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
    id: "coacd-button-login",
  });
  $coacdButton.appendTo("#" + viewId);

  // Append Big SSO Login button and non-SSO Login button
  bigButton(
    "coacd-big-button",
    "coacd-button-login",
    url,
    "sign-in",
    "Sign-In",
  );

  $coacdButton.append(
    "<a class='small-button' href='javascript:void(0)'>" +
      "<div class='small-button-container'><span><i class='fa fa-lock'></i></span><span> Non-COA Sign-In</span></div></a>",
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
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  target_blank = false,
  is_disabled = false,
  callback = null,
) {
  const disabledClass = is_disabled ? " big-button-disabled'" : "'";
  const newTab = target_blank ? " target='_blank'" : "";
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
$(document).on("knack-view-render.view_644", function (event, page) {
  bigButton(
    "task-board",
    "view_644",
    `${APP_URL}#task-board/`,
    "tasks",
    "Task Board",
  );
});
// create large Customer Portal button on the Home page
$(document).on("knack-view-render.view_645", function (event, page) {
  bigButton(
    "row-portal",
    "view_645",
    `${APP_URL}#portal-home/`,
    "child",
    "Customer Portal",
  );
});
// create large Customer Home button on the Home page
$(document).on("knack-view-render.view_1087", function (event, page) {
  bigButton(
    "customer-login",
    "view_1087",
    `${APP_URL}#customer/`,
    "unlock-alt",
    "Customer Login",
  );
});
// create large Account Managment button on the Home page
$(document).on("knack-view-render.view_646", function (event, page) {
  bigButton(
    "account-management",
    "view_646",
    `${APP_URL}#account-management/`,
    "users",
    "Manage Internal Accounts",
  );
});
// create large Manage Customer Accounts button on the Home page
$(document).on("knack-view-render.view_1086", function (event, page) {
  bigButton(
    "manage-customers",
    "view_1086",
    `${APP_URL}#app-admin/manage-customers/`,
    "user",
    "Manage Customer Accounts",
  );
});
// create large TCP Projects button on the Home page
$(document).on("knack-view-render.view_31", function (event, page) {
  bigButton(
    "tcp-projects",
    "view_31",
    `${APP_URL}#tcp-projects/`,
    "briefcase",
    "TCP Projects",
  );
});
// create large CCM button on the Home page
$(document).on("knack-view-render.view_244", function (event, page) {
  bigButton(
    "ccm",
    "view_244",
    `${APP_URL}#court-case-management/`,
    "suitcase",
    "Court Case Management",
  );
});
// create large COS Reporting button on the Home page
$(document).on("knack-view-render.view_245", function (event, page) {
  bigButton(
    "cos",
    "view_245",
    `${APP_URL}#cost-of-service-data/`,
    "dollar",
    "Cost of Service Data",
  );
});
// create large CSWZ button on the Home page
$(document).on("knack-view-render.view_451", function (event, page) {
  bigButton(
    "tcp-cswz",
    "view_451",
    `${APP_URL}#tcp-cswz/`,
    "files-o",
    "Conflict/Shared Requests",
  );
});

// create large Available Services button on the Customer Portal Home page
$(document).on("knack-view-render.view_234", function (event, page) {
  bigButton(
    "services",
    "view_234",
    `${APP_URL}#customer-portal/services`,
    "list-ul",
    "Available Services",
  );
});
// create large Available Services button on the ROW Portal page
$(document).on("knack-view-render.view_681", function (event, page) {
  bigButton(
    "all-services",
    "view_681",
    `${APP_URL}#portal-home/all-services`,
    "list-ul",
    "Available Services",
  );
});
// create large Available Services button on the Customer Home page
$(document).on("knack-view-render.view_1117", function (event, page) {
  bigButton(
    "customer-services",
    "view_1117",
    `${APP_URL}#customer/customer-services`,
    "list-ul",
    "Available Services",
  );
});
// create large ROW Division button on the Customer Portal Home page
$(document).on("knack-view-render.view_237", function (event, page) {
  bigButton(
    "row-division-link",
    "view_237",
    "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management",
    "bank",
    "ROW Division",
    true,
  );
});
// create large ROW Division button on the ROW Portal page
$(document).on("knack-view-render.view_684", function (event, page) {
  bigButton(
    "row-division-link",
    "view_684",
    "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management",
    "bank",
    "ROW Division",
    true,
  );
});
// create large ROW Division button on the Customer Home page
$(document).on("knack-view-render.view_1120", function (event, page) {
  bigButton(
    "row-division-link",
    "view_1120",
    "https://www.austintexas.gov/transportation-public-works/divisions/right-way-management",
    "bank",
    "ROW Division",
    true,
  );
});

// create large Task Board button on the Task Board Login page
$(document).on("knack-view-render.view_1385", function (event, page) {
  bigButton(
    "task-board",
    "view_1385",
    `${APP_URL}#task-board/my-tasks`,
    "tasks",
    "Go to My Tasks",
  );
});

// create large DAPCZ Meeting button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1526", function (event, page) {
  bigButton(
    "manage-dapcz-meetings",
    "view_1526",
    `${APP_URL}#manage-dapcz-meetings/`,
    "microphone",
    "DAPCZ Meeting",
  );
});

// create large DAPCZ Project button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1527", function (event, page) {
  bigButton(
    "manage-dapcz-project",
    "view_1527",
    `${APP_URL}#manage-dapcz-project/`,
    "cubes",
    "DAPCZ Projects",
  );
});

// create large DAPCZ Contacts button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1528", function (event, page) {
  bigButton(
    "manage-dapcz-contacts",
    "view_1528",
    `${APP_URL}#manage-dapcz-contacts/`,
    "users",
    "DAPCZ Contacts",
  );
});

// create large DAPCZ Resources button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1529", function (event, page) {
  bigButton(
    "manage-dapcz-resources",
    "view_1529",
    `${APP_URL}#manage-dapcz-resources/`,
    "book",
    "DAPCZ Resources",
  );
});

// create large DAPCZ Public Portal button on the Manage DAPCZ page
$(document).on("knack-view-render.view_1593", function (event, page) {
  bigButton(
    "dapcz-meeting",
    "view_1593",
    `${APP_URL}#dapcz-meeting/`,
    "slideshare",
    "DAPCZ Public Portal",
  );
});

// create large DAPCZ Agenda button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1505", function (event, page) {
  bigButton(
    "dapcz-agenda",
    "view_1505",
    `${APP_URL}#dapcz-meeting/dapcz-agenda/`,
    "file-o",
    "DAPCZ Agenda",
  );
});

// create large DAPCZ Project List button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1506", function (event, page) {
  bigButton(
    "dapcz-project-list",
    "view_1506",
    `${APP_URL}#dapcz-meeting/dapcz-project-list/`,
    "list-ul",
    "DAPCZ Project List",
  );
});

// create large DAPCZ Links button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1507", function (event, page) {
  bigButton(
    "dapcz-links",
    "view_1507",
    `${APP_URL}#dapcz-meeting/dapcz-links/`,
    "link",
    "DAPCZ Links & Resources",
  );
});

// create large DAPCZ Meeting Schedule button on the DAPCZ Public Portal page
$(document).on("knack-view-render.view_1508", function (event, page) {
  bigButton(
    "dapcz-meeting-schedule",
    "view_1508",
    `${APP_URL}#dapcz-meeting/dapcz-meeting-schedule`,
    "calendar",
    "DAPCZ Meeting Schedule",
  );
});

/********************************************/
/*********** Large Submit Buttons ***********/
/********************************************/
function largeSubmitButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  target_blank = false,
  is_disabled = false,
  callback = null,
) {
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
$(document).on("knack-view-render.view_1089", function (event, page) {
  largeSubmitButton(
    "my-projects",
    "view_1089",
    `${APP_URL}#customer/my-projects`,
    "arrow-right",
    "My Projects",
  );
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
  "scene_97", // TCP Application Project Information page
  "scene_98", // TCP Application Attachments page
  "scene_99", // Review TCP Application page
  "scene_100", // Edit Information page
  "scene_101", // Edit Attachments page
  "scene_102", // TCP Application Confirmation page

  // New TCP Application
  "scene_137", // New TCP Application page
  "scene_138", // TCP Project Information page
  "scene_148", // TCP Fee Information page
  "scene_149", // TCP Documents page
  "scene_150", // Finalize TCP Application page
  "scene_151", // Edit Information page
  "scene_152", // Edit Attachments page
  "scene_153", // TCP Application Confirmation page

  // Staff TCP Application
  "scene_583", // Submit Staff TCP Application page

  // TCP Conflict/Shared TCP Request
  "scene_183", // Applicant Information page
  "scene_184", // Conflicting Party page
  "scene_185", // Attachments page
  "scene_186", // Review Request page
  "scene_187", // Submittal Confirmation page
  "scene_188", // Edit Information page
  "scene_189", // Edit Attachments page

  // Customer Account Signup
  "scene_480", // Customer Confirm Account Login Step 2 page
  "scene_476", // Customer Complete Account Setup Step 3 page

  // Customer Project Creation
  "scene_463", // Customer Create TCP Project Step 1 page
  "scene_464", // Customer Create TCP Project Step 2 page
  "scene_465", // Customer Create CSWZ Request Step 1 page
  "scene_467", // Customer Create CSWZ Request Step 2 page
];

BREADCRUMB_SCENES.forEach((scene) => {
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
$(document).on("knack-scene-render.scene_586", function (event, scene) {
  window.location.href = `${APP_URL}#portal-home/`;
});

/*Task Board Page "https://atd.knack.com/pte#task-board/" */
$(document).on("knack-scene-render.scene_166", function (event, scene) {
  window.location.href = `${APP_URL}#task-board/my-tasks/`;
});

/*****************************/
/*** Autosubmit Form Pages ***/
/*****************************/

/* Auto Submit New TCP Intake Submission Cycle for Customer Manage TCP Project Page*/
$(document).on("knack-scene-render.scene_589", function (event, scene) {
  $("button[type=submit]").submit();
});
/* Auto Submit New TCP Review Submission Cycle for Customer Manage TCP Project Page*/
$(document).on("knack-scene-render.scene_411", function (event, scene) {
  $("button[type=submit]").submit();
});
/* Auto Submit New CSWZ Submission Cycle for Customer Customer Manage Conflict/Shared TCP Project Page*/
$(document).on("knack-scene-render.scene_417", function (event, scene) {
  $("button[type=submit]").submit();
});

/* Auto Submit Approve TCP Case */
$(document).on("knack-scene-render.scene_488", function (event, scene) {
  $("button[type=submit]").submit();
});

/***********************************/
/*** Custom TCP Navigation Menu  ***/
/***********************************/
function tcpDropdownMenuItem(
  recordId,
  route,
  iconName,
  linkName,
  mobile = false,
  newTab = false,
) {
  const buttonClass = mobile ? "desktop-button" : "kn-button";
  if (newTab) {
    return `<li class="${buttonClass}">\
        <a href="#tcp-projects/tcp-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`;
  }

  return `<li class="${buttonClass}">\
      <a href="#tcp-projects/tcp-details/${recordId}/${route}/${recordId}" class="tcp-nav-menu">\
        <span class="icon is-small" style="color:#163f6e"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span style="color:#163f6e">${linkName}</span>\
      </a>\
    </li>`;
}

/* TCP Case Details Page */
$(document).on("knack-view-render.view_1175", function (event, view, record) {
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
  </div>`).appendTo("#view_1175");

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
  </div>`).appendTo("#view_1175");
});

/************************************/
/*** Custom CSWZ Navigation Menu  ***/
/************************************/
function cswzDropdownMenuItem(
  recordId,
  route,
  iconName,
  linkName,
  mobile = false,
  newTab = false,
) {
  const buttonClass = mobile ? "desktop-button" : "kn-button";
  if (newTab) {
    return `<li class="${buttonClass}">\
        <a href="#tcp-cswz/cswz-request-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`;
  }

  return `<li class="${buttonClass}">\
      <a href="#tcp-cswz/cswz-request-details/${recordId}/${route}/${recordId}" class="cswz-nav-menu">\
        <span class="icon is-small" style="color:#163f6e"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span style="color:#163f6e">${linkName}</span>\
      </a>\
    </li>`;
}

/* CSWZ Case Details Page */
$(document).on("knack-view-render.view_1176", function (event, view, record) {
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
  </div>`).appendTo("#view_1176");

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
  </div>`).appendTo("#view_1176");
});
/********************************************/
/** DAPCZ: Link Active Projects to Meeting **/
/** https://github.com/cityofaustin/atd-data-tech/issues/26752 **/
/********************************************/
const DAPCZ_LINK_CONFIG = {
  views: {
    meetings: "view_1768",
    projects: "view_1755",
  },
  api: {
    baseUrl: "https://api.knack.com/v1",
    scene: "scene_776",
    // API edit form on dapcz_project — field_1423 must NOT be required (unlink sends []).
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

var dapczLinkOperationState = {
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

var dapczLinkProjectsTableFields = {
  projectName: null,
  groupHeader: null,
  meetingConnection: null,
};

function dapczLink_elementLoaded(el, callback, attempts) {
  var tryCount = attempts || 0;
  if ($(el).length) {
    callback($(el));
    return;
  }
  if (tryCount > 40) {
    return;
  }
  setTimeout(function () {
    dapczLink_elementLoaded(el, callback, tryCount + 1);
  }, 300);
}

function dapczLink_logApiError(error) {
  console.error("DAPCZ link API error:", error);
  if (error && error.responseText) {
    console.error("DAPCZ API response:", error.responseText);
  }
}

function dapczLink_formatApiError(error) {
  if (!error) {
    return "Unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error.message) {
    return error.message;
  }
  var xhr = error.xhr || error;
  if (xhr.responseJSON) {
    if (xhr.responseJSON.message) {
      return xhr.responseJSON.message;
    }
    if (xhr.responseJSON.errors) {
      return JSON.stringify(xhr.responseJSON.errors);
    }
  }
  if (xhr.status === 400 && xhr.responseText) {
    if (
      xhr.responseText.indexOf("required") >= 0 ||
      xhr.responseText.indexOf("Required") >= 0
    ) {
      return (
        "Knack rejected clearing the meeting connection. On view_1786, set field_1423 " +
        "(dapcz_meetings) to not required so projects can be unlinked."
      );
    }
  }
  if (xhr.responseText && typeof xhr.responseText === "string") {
    try {
      var parsed = JSON.parse(xhr.responseText);
      if (parsed.message) {
        return parsed.message;
      }
      if (parsed.errors) {
        return JSON.stringify(parsed.errors);
      }
    } catch (parseError) {
      if (xhr.responseText.length < 300) {
        return xhr.responseText;
      }
    }
  }
  if (xhr.statusText) {
    return xhr.statusText;
  }
  return "Request failed";
}

function dapczLink_cacheProjectsTableFields() {
  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
  dapczLinkProjectsTableFields.projectName = dapczLink_getTableFieldKeyByHeader(
    viewKey,
    function (text) {
      return text === "project name" || text.indexOf("project name") === 0;
    }
  );
  dapczLinkProjectsTableFields.groupHeader = dapczLink_getTableFieldKeyByHeader(
    viewKey,
    function (text) {
      return text.indexOf("group header") >= 0;
    }
  );
  dapczLinkProjectsTableFields.meetingConnection =
    DAPCZ_LINK_CONFIG.fields.projectMeetingConnection ||
    dapczLink_getTableFieldKeyByHeader(viewKey, function (text) {
      return (
        text.indexOf("dapcz_meeting") >= 0 ||
        text === "dapcz_meetings" ||
        text.indexOf("meeting date") >= 0
      );
    });
}

function dapczLink_escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dapczLink_formatMeetingDate(model) {
  var dateField = DAPCZ_LINK_CONFIG.fields.meetingDate;
  var value = model.get ? model.get(dateField) : model[dateField];

  if (!value) {
    return "Meeting";
  }

  if (typeof value === "object") {
    if (value.date) {
      return value.date;
    }
    if (value.iso_date) {
      return value.iso_date;
    }
  }

  return String(value);
}

function dapczLink_parseConnectionHtml(value) {
  if (!value || typeof value !== "string" || value.indexOf("data-kn") === -1) {
    return [];
  }

  var records = [];
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

function dapczLink_getConnectionRecords(model, fieldKey) {
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

  if (typeof value === "object" && value.id) {
    return [{ id: value.id, identifier: value.identifier || "" }];
  }

  if (typeof value === "string") {
    var fromHtml = dapczLink_parseConnectionHtml(value);
    if (fromHtml.length) {
      return fromHtml;
    }

    if (/^[a-f0-9]{24}$/i.test(value)) {
      return [{ id: value, identifier: "" }];
    }
  }

  return [];
}

function dapczLink_isLinkedToMeeting(model, meetingId, fieldKey, meetingLabel) {
  var targetId = String(meetingId);
  return dapczLink_getConnectionRecords(model, fieldKey).some(function (record) {
    if (String(record.id) === targetId) {
      return true;
    }
    if (meetingLabel && record.identifier === meetingLabel) {
      return true;
    }
    return false;
  });
}

function dapczLink_isLinkedToMeetingFromConnections(connections, meeting) {
  if (!connections || !connections.length || !meeting) {
    return false;
  }

  return connections.some(function (record) {
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
  });
}

function dapczLink_isLinkedToMeetingFromRow($row, meeting) {
  var meetingFieldKey =
    dapczLinkProjectsTableFields.meetingConnection ||
    DAPCZ_LINK_CONFIG.fields.projectMeetingConnection;

  if (!$row.length || !meetingFieldKey) {
    return false;
  }

  var cellText = dapczLink_getCellText($row, meetingFieldKey);
  if (!cellText) {
    return false;
  }

  if (meeting.dateLabel && cellText.indexOf(meeting.dateLabel) >= 0) {
    return true;
  }

  if (meeting.identifier && cellText.indexOf(meeting.identifier) >= 0) {
    return true;
  }

  return false;
}

function dapczLink_getConnectionDetails(model, fieldKey) {
  var records = dapczLink_getConnectionRecords(model, fieldKey);
  return records.length ? records[0] : null;
}

function dapczLink_getFieldDisplayValue(model, fieldKey) {
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

function dapczLink_getTableFieldKeyByHeader(viewKey, headerMatch) {
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

function dapczLink_getCellText($row, fieldKey) {
  if (!$row.length || !fieldKey) {
    return "";
  }
  return $row.find("td." + fieldKey).first().text().replace(/\s+/g, " ").trim();
}

function dapczLink_getGroupHeaderForRow($row) {
  var groupHeader = "";
  var groupFieldKey =
    dapczLinkProjectsTableFields.groupHeader ||
    DAPCZ_LINK_CONFIG.fields.projectGroupHeader;

  if ($row.length && groupFieldKey) {
    groupHeader = dapczLink_getCellText($row, groupFieldKey);
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

function dapczLink_getApiBaseUrl() {
  return DAPCZ_LINK_CONFIG.api.baseUrl || "https://api.knack.com/v1";
}

function dapczLink_getApiHeaders() {
  return {
    "X-Knack-Application-Id": Knack.application_id,
    "X-Knack-REST-API-KEY": "knack",
    Authorization: Knack.getUserToken(),
    "content-type": "application/json",
  };
}

function dapczLink_getProjectUpdateUrl(projectId) {
  var api = DAPCZ_LINK_CONFIG.api;
  return (
    dapczLink_getApiBaseUrl() +
    "/scenes/" +
    api.scene +
    "/views/" +
    api.projectUpdateView +
    "/records/" +
    projectId
  );
}

function dapczLink_fetchProjectRecord(projectId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "GET",
      url: dapczLink_getProjectUpdateUrl(projectId),
      headers: dapczLink_getApiHeaders(),
    })
      .done(function (response) {
        resolve(response.record || response);
      })
      .fail(function (xhr) {
        reject(xhr);
      });
  });
}

function dapczLink_getProjectIdsFromTable() {
  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
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

function dapczLink_fetchProjectConnectionsBatch(projectIds) {
  var batchSize = DAPCZ_LINK_CONFIG.batchSize;
  var fieldKey = DAPCZ_LINK_CONFIG.fields.projectMeetingConnection;
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
        return dapczLink_fetchProjectRecord(projectId)
          .then(function (record) {
            connectionMap[projectId] = dapczLink_getConnectionRecords(record, fieldKey);
          })
          .catch(function (error) {
            dapczLink_logApiError(error);
            connectionMap[projectId] = [];
          });
      })
    ).then(function () {
      if (index < projectIds.length) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(processBatch());
          }, DAPCZ_LINK_CONFIG.batchDelay);
        });
      }
      return connectionMap;
    });
  }

  return processBatch();
}

function dapczLink_getProjectIdsKey(projectIds) {
  return projectIds.slice().sort().join(",");
}

function dapczLink_mergeProjectConnections(connectionMap) {
  Object.keys(connectionMap || {}).forEach(function (projectId) {
    dapczLinkOperationState.projectConnections[projectId] =
      connectionMap[projectId];
  });
}

function dapczLink_hasCompleteProjectConnectionCache() {
  var projectIds = dapczLink_getProjectIdsFromTable();
  if (!projectIds.length) {
    return false;
  }

  return projectIds.every(function (projectId) {
    return Object.prototype.hasOwnProperty.call(
      dapczLinkOperationState.projectConnections,
      projectId
    );
  });
}

function dapczLink_prefetchProjectConnections() {
  if (!DAPCZ_LINK_CONFIG.api.projectUpdateView) {
    return Promise.resolve(dapczLinkOperationState.projectConnections);
  }

  var projectIds = dapczLink_getProjectIdsFromTable();
  if (!projectIds.length) {
    dapczLinkOperationState.prefetchComplete = false;
    return Promise.resolve(dapczLinkOperationState.projectConnections);
  }

  var idsKey = dapczLink_getProjectIdsKey(projectIds);
  var missingIds = projectIds.filter(function (projectId) {
    return !Object.prototype.hasOwnProperty.call(
      dapczLinkOperationState.projectConnections,
      projectId
    );
  });

  if (!missingIds.length && dapczLinkOperationState.prefetchProjectIdsKey === idsKey) {
    dapczLinkOperationState.prefetchComplete = true;
    return Promise.resolve(dapczLinkOperationState.projectConnections);
  }

  if (
    dapczLinkOperationState.prefetchPromise &&
    dapczLinkOperationState.prefetchProjectIdsKey === idsKey
  ) {
    return dapczLinkOperationState.prefetchPromise;
  }

  dapczLinkOperationState.prefetchProjectIdsKey = idsKey;
  dapczLinkOperationState.prefetchComplete = false;

  var idsToFetch = missingIds.length ? missingIds : projectIds;

  dapczLinkOperationState.prefetchPromise = dapczLink_fetchProjectConnectionsBatch(
    idsToFetch
  )
    .then(function (connectionMap) {
      dapczLink_mergeProjectConnections(connectionMap);
      dapczLinkOperationState.prefetchComplete =
        dapczLink_hasCompleteProjectConnectionCache();
      dapczLinkOperationState.prefetchPromise = null;
      return dapczLinkOperationState.projectConnections;
    })
    .catch(function (error) {
      dapczLinkOperationState.prefetchPromise = null;
      dapczLinkOperationState.prefetchComplete = false;
      throw error;
    });

  return dapczLinkOperationState.prefetchPromise;
}

function dapczLink_scheduleProjectConnectionsPrefetch() {
  if (!DAPCZ_LINK_CONFIG.api.projectUpdateView) {
    return;
  }

  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
  dapczLink_elementLoaded("#" + viewKey + " tbody tr[id]", function () {
    dapczLink_prefetchProjectConnections().catch(function (error) {
      console.warn("DAPCZ project connection prefetch failed:", error);
    });
  });
}

function dapczLink_setInitialLinkedIdsForMeeting(meeting) {
  var initialLinkedIds = {};
  var connectionMap = dapczLinkOperationState.projectConnections || {};

  Object.keys(connectionMap).forEach(function (projectId) {
    if (dapczLink_isLinkedToMeetingFromConnections(connectionMap[projectId], meeting)) {
      initialLinkedIds[projectId] = true;
    }
  });

  dapczLinkOperationState.initialLinkedIds = initialLinkedIds;
  return initialLinkedIds;
}

function dapczLink_loadProjectLinkState(meeting) {
  return dapczLink_prefetchProjectConnections().then(function () {
    dapczLink_setInitialLinkedIdsForMeeting(meeting);
    return dapczLinkOperationState.projectConnections;
  });
}

function dapczLink_buildProjectMeetingPayload(meeting, existingConnections, shouldLink) {
  var fieldKey = DAPCZ_LINK_CONFIG.fields.projectMeetingConnection;
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

function dapczLink_putProjectPayload(projectId, payload) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: "PUT",
      url: dapczLink_getProjectUpdateUrl(projectId),
      headers: dapczLink_getApiHeaders(),
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

function dapczLink_getProjectModel(projectId) {
  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
  if (
    !Knack.views[viewKey] ||
    !Knack.views[viewKey].model ||
    !Knack.views[viewKey].model.data
  ) {
    return null;
  }

  return Knack.views[viewKey].model.data.get(projectId);
}

function dapczLink_updateProjectMeetingLink(project, meeting, shouldLink) {
  if (!DAPCZ_LINK_CONFIG.api.projectUpdateView) {
    return Promise.reject({
      message:
        "DAPCZ API form view is not configured. Set DAPCZ_LINK_CONFIG.api.projectUpdateView to view_1786.",
    });
  }

  var fieldKey = DAPCZ_LINK_CONFIG.fields.projectMeetingConnection;

  return dapczLink_fetchProjectRecord(project.id)
    .then(function (record) {
      var existingConnections = dapczLink_getConnectionRecords(record, fieldKey);
      dapczLinkOperationState.projectConnections[project.id] = existingConnections;

      var payload = dapczLink_buildProjectMeetingPayload(
        meeting,
        existingConnections,
        shouldLink
      );
      var clearingAllMeetings = !shouldLink && payload[fieldKey].length === 0;

      return dapczLink_putProjectPayload(project.id, payload).catch(function (xhr) {
        if (!clearingAllMeetings || !xhr || xhr.status !== 400) {
          throw xhr;
        }

        var emptyPayload = {};
        emptyPayload[fieldKey] = "";
        emptyPayload[fieldKey + "_raw"] = "";

        return dapczLink_putProjectPayload(project.id, emptyPayload);
      });
    })
    .then(function (response) {
      var record = response.record || response;
      dapczLinkOperationState.projectConnections[project.id] =
        dapczLink_getConnectionRecords(record, fieldKey);
      return response;
    })
    .catch(function (xhr) {
      var message = dapczLink_formatApiError(xhr);
      dapczLink_logApiError(xhr);
      return Promise.reject({ message: message, xhr: xhr });
    });
}

function dapczLink_getProjectFieldValue($row, model, fieldKey) {
  if (model && fieldKey) {
    var fromModel = dapczLink_getFieldDisplayValue(model, fieldKey);
    if (fromModel) {
      return fromModel;
    }
  }

  if ($row.length && fieldKey) {
    return dapczLink_getCellText($row, fieldKey);
  }

  return "";
}

function dapczLink_getProjectNameFromRow($row, model) {
  var configNameField = DAPCZ_LINK_CONFIG.fields.projectName;
  if (model && configNameField) {
    var fromModel = dapczLink_getFieldDisplayValue(model, configNameField);
    if (fromModel) {
      return fromModel;
    }
  }

  var nameFieldKey =
    dapczLinkProjectsTableFields.projectName || configNameField;

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

  return dapczLink_getFieldDisplayValue(model, DAPCZ_LINK_CONFIG.fields.projectName);
}

function dapczLink_getProjectDisplayLabelFromRow($row, model) {
  var projectName = dapczLink_getProjectNameFromRow($row, model);
  var groupHeader = dapczLink_getGroupHeaderForRow($row);

  if (groupHeader && projectName) {
    return groupHeader + " - " + projectName;
  }

  return projectName || "Project";
}

function dapczLink_getProjectModels() {
  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
  if (
    !Knack.views[viewKey] ||
    !Knack.views[viewKey].model ||
    !Knack.views[viewKey].model.data
  ) {
    return [];
  }

  return (Knack.views[viewKey].model.data.models || []).filter(function (model) {
    var projectId = model.id || model.get("id");
    var $row = $("#" + viewKey + " tbody tr#" + projectId);
    return $row.length && !$row.hasClass("kn-table-group");
  });
}

function dapczLink_refreshViewModels(viewKey) {
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

function dapczLink_refreshProjectModels() {
  return dapczLink_refreshViewModels(DAPCZ_LINK_CONFIG.views.projects).then(
    function () {
      return dapczLink_getProjectModels();
    }
  );
}

function dapczLink_refreshMeetingView() {
  return dapczLink_refreshViewModels(DAPCZ_LINK_CONFIG.views.meetings);
}

function dapczLink_buildProjectRows(meeting) {
  dapczLink_cacheProjectsTableFields();

  var viewKey = DAPCZ_LINK_CONFIG.views.projects;
  var connectionField = DAPCZ_LINK_CONFIG.fields.projectMeetingConnection;
  var connectionMap = dapczLinkOperationState.projectConnections || {};
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
      connections = dapczLink_getConnectionRecords(model, connectionField);
    }

    var isLinkedToMeeting =
      dapczLink_isLinkedToMeetingFromConnections(connections, meeting) ||
      dapczLink_isLinkedToMeeting(
        model,
        meeting.id,
        connectionField,
        meeting.dateLabel
      ) ||
      dapczLink_isLinkedToMeetingFromRow($row, meeting);

    rows.push({
      id: projectId,
      zone: dapczLink_getProjectFieldValue(
        $row,
        model,
        DAPCZ_LINK_CONFIG.fields.projectZone
      ),
      rsn: dapczLink_getProjectFieldValue(
        $row,
        model,
        DAPCZ_LINK_CONFIG.fields.projectRsn
      ),
      label: dapczLink_getProjectNameFromRow($row, model) || "Project",
      isLinked: isLinkedToMeeting,
      isChecked: isLinkedToMeeting,
    });
  });

  return rows;
}

function dapczLink_resetModalSort() {
  dapczLinkOperationState.modalSort = { column: "project", direction: "asc" };
}

function dapczLink_getModalSortableHeaderCell(column, label) {
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

function dapczLink_getModalTableHeadHtml() {
  return (
    "<thead><tr>" +
    '<th class="dapcz-link-sort-col dapcz-link-sort-col-select" scope="col">' +
    '<input type="checkbox" id="dapcz-link-select-all" class="dapcz-link-modal-checkbox" aria-label="Select all projects">' +
    "</th>" +
    dapczLink_getModalSortableHeaderCell("zone", "Zone") +
    dapczLink_getModalSortableHeaderCell("rsn", "RSN #") +
    dapczLink_getModalSortableHeaderCell("project", "Project") +
    "</tr></thead>"
  );
}

function dapczLink_compareNaturalSortValues(a, b) {
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function dapczLink_getProjectRowSortValue(row, column) {
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

function dapczLink_compareProjectRowValues(aVal, bVal, column) {
  if (column === "linked") {
    return (Number(aVal) || 0) - (Number(bVal) || 0);
  }
  return dapczLink_compareNaturalSortValues(aVal, bVal);
}

function dapczLink_sortProjectRowData(rows) {
  var sort = dapczLinkOperationState.modalSort;

  rows.sort(function (a, b) {
    var aVal = dapczLink_getProjectRowSortValue(a, sort.column);
    var bVal = dapczLink_getProjectRowSortValue(b, sort.column);
    var result = dapczLink_compareProjectRowValues(aVal, bVal, sort.column);

    if (result === 0) {
      result = dapczLink_compareNaturalSortValues(a.label, b.label);
    }

    return sort.direction === "desc" ? -result : result;
  });
}

function dapczLink_getModalRowSortValue($row, column) {
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

function dapczLink_compareModalRowElements($a, $b, column, direction) {
  var aVal = dapczLink_getModalRowSortValue($a, column);
  var bVal = dapczLink_getModalRowSortValue($b, column);
  var result = dapczLink_compareProjectRowValues(aVal, bVal, column);

  if (result === 0) {
    result = dapczLink_compareNaturalSortValues(
      $a.data("project-label"),
      $b.data("project-label")
    );
  }

  return direction === "desc" ? -result : result;
}

function dapczLink_reorderModalRows() {
  var $tbody = $("#dapcz-link-modal-rows");
  var sort = dapczLinkOperationState.modalSort;
  var $rows = $tbody.children("tr[data-project-id]").get();

  $rows.sort(function (rowA, rowB) {
    return dapczLink_compareModalRowElements(
      $(rowA),
      $(rowB),
      sort.column,
      sort.direction
    );
  });

  $.each($rows, function (_, row) {
    $tbody.append(row);
  });
}

function dapczLink_syncModalSortHeaders() {
  var sort = dapczLinkOperationState.modalSort;

  $("#dapcz-link-modal-overlay .dapcz-link-sort-col[data-sort-col]").each(function () {
    var $th = $(this);
    var column = $th.data("sort-col");
    var $btn = $th.find(".dapcz-link-sort-btn");
    var $icon = $btn.find(".dapcz-link-sort-icon");
    var isActive = column === sort.column;

    $btn.toggleClass("is-active", isActive);
    $icon.removeClass("fa-sort fa-sort-asc fa-sort-desc");
    $icon.addClass(isActive ? (sort.direction === "asc" ? "fa-sort-asc" : "fa-sort-desc") : "fa-sort");
    $th.attr(
      "aria-sort",
      isActive ? (sort.direction === "asc" ? "ascending" : "descending") : "none"
    );
  });
}

function dapczLink_handleModalSortClick(event) {
  event.preventDefault();

  var column = $(this).data("sort");
  if (!column) {
    return;
  }

  if (dapczLinkOperationState.modalSort.column === column) {
    dapczLinkOperationState.modalSort.direction =
      dapczLinkOperationState.modalSort.direction === "asc" ? "desc" : "asc";
  } else {
    dapczLinkOperationState.modalSort.column = column;
    dapczLinkOperationState.modalSort.direction = "asc";
  }

  dapczLink_reorderModalRows();
  dapczLink_syncModalSortHeaders();
  dapczLink_syncSelectAllCheckbox();
}

function dapczLink_ensureModalShell() {
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
      dapczLink_getModalTableHeadHtml() +
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
      "</div></div></div>"
  );

  $("#dapcz-link-modal-close, #dapcz-link-modal-cancel").on("click", dapczLink_closeModal);
  $("#dapcz-link-modal-overlay").on("click", function (event) {
    if (event.target === this) {
      dapczLink_closeModal();
    }
  });
  $("#dapcz-link-select-all").on("change", dapczLink_handleSelectAllChange);
  $("#dapcz-link-modal-submit").on("click", dapczLink_handleModalSubmit);
  $("#dapcz-link-modal-filter").on("click", ".dapcz-link-filter-btn", dapczLink_handleModalFilterClick);
  $("#dapcz-link-modal-overlay .dapcz-link-modal-table").on(
    "click",
    ".dapcz-link-sort-btn",
    dapczLink_handleModalSortClick
  );
  $(document).on(
    "change.dapczLinkCheckbox",
    "#dapcz-link-modal-rows .dapcz-link-project-checkbox",
    function () {
      dapczLink_syncSelectAllCheckbox();
    }
  );
}

function dapczLink_ensureModalFilterGroup() {
  if ($("#dapcz-link-modal-filter").length) {
    return;
  }

  $("#dapcz-link-modal-message").after(
    '<div id="dapcz-link-modal-filter" class="dapcz-link-filter-group" role="group" aria-label="Filter projects">' +
      '<button type="button" class="dapcz-link-filter-btn is-active" data-filter="all">All <span class="dapcz-link-filter-count" data-count="all">0</span></button>' +
      '<button type="button" class="dapcz-link-filter-btn" data-filter="assigned">Assigned <span class="dapcz-link-filter-count" data-count="assigned">0</span></button>' +
      '<button type="button" class="dapcz-link-filter-btn" data-filter="unassigned">Unassigned <span class="dapcz-link-filter-count" data-count="unassigned">0</span></button>' +
      "</div>"
  );

  $("#dapcz-link-modal-filter").on("click", ".dapcz-link-filter-btn", dapczLink_handleModalFilterClick);
}

function dapczLink_getModalFilterEmptyMessage(filter) {
  if (filter === "assigned") {
    return "No projects are linked to this meeting.";
  }
  if (filter === "unassigned") {
    return "No unassigned projects. All active projects are linked to this meeting.";
  }
  return "There are no active projects to display.";
}

function dapczLink_updateFilterCounts() {
  var $rows = $("#dapcz-link-modal-rows tr[data-project-id]");
  var total = $rows.length;
  var initialLinkedIds = dapczLinkOperationState.initialLinkedIds || {};
  var assigned = 0;

  $rows.each(function () {
    if (initialLinkedIds[$(this).data("project-id")]) {
      assigned++;
    }
  });

  var unassigned = total - assigned;

  $('.dapcz-link-filter-count[data-count="all"]').text("(" + total + ")");
  $('.dapcz-link-filter-count[data-count="assigned"]').text("(" + assigned + ")");
  $('.dapcz-link-filter-count[data-count="unassigned"]').text("(" + unassigned + ")");
}

function dapczLink_applyModalFilter(filter) {
  dapczLinkOperationState.modalFilter = filter || "all";

  $("#dapcz-link-modal-filter .dapcz-link-filter-btn").each(function () {
    var isActive = $(this).data("filter") === dapczLinkOperationState.modalFilter;
    $(this).toggleClass("is-active", isActive).attr("aria-pressed", isActive);
  });

  var initialLinkedIds = dapczLinkOperationState.initialLinkedIds || {};
  var visibleCount = 0;
  $("#dapcz-link-modal-rows tr[data-project-id]").each(function () {
    var $row = $(this);
    var isSavedLinked = !!initialLinkedIds[$row.data("project-id")];
    var show =
      dapczLinkOperationState.modalFilter === "all" ||
      (dapczLinkOperationState.modalFilter === "assigned" && isSavedLinked) ||
      (dapczLinkOperationState.modalFilter === "unassigned" && !isSavedLinked);

    $row.toggleClass("is-filter-hidden", !show);
    if (show) {
      visibleCount++;
    }
  });

  var $empty = $("#dapcz-link-modal-empty");
  var $table = $("#dapcz-link-modal-overlay .dapcz-link-modal-table");

  if (visibleCount === 0) {
    $empty
      .text(dapczLink_getModalFilterEmptyMessage(dapczLinkOperationState.modalFilter))
      .prop("hidden", false);
    $table.addClass("is-empty");
  } else {
    $empty.prop("hidden", true).empty();
    $table.removeClass("is-empty");
  }

  dapczLink_syncSelectAllCheckbox();
}

function dapczLink_handleModalFilterClick(event) {
  event.preventDefault();
  var filter = $(event.currentTarget).data("filter");
  if (!filter || filter === dapczLinkOperationState.modalFilter) {
    return;
  }
  dapczLink_applyModalFilter(filter);
}

function dapczLink_showModalLoading(message) {
  $("#dapcz-link-modal-rows").html(
    '<tr class="dapcz-link-loading-row"><td colspan="4">' +
      dapczLink_escapeHtml(message || "Loading project links...") +
      "</td></tr>"
  );
  $("#dapcz-link-modal-empty").prop("hidden", true);
  $("#dapcz-link-modal-overlay .dapcz-link-modal-table").removeClass("is-empty");
  $("#dapcz-link-modal-filter .dapcz-link-filter-btn").prop("disabled", true);
  $("#dapcz-link-select-all").prop("checked", false).prop("indeterminate", false).prop("disabled", true);
}

function dapczLink_closeModal() {
  dapczLink_clearModalFeedbackDismiss();
  $("#dapcz-link-modal-overlay").removeClass("is-active").attr("aria-hidden", "true");
  $("#dapcz-link-progress-slot").empty();
  $("#dapcz-link-modal-message").empty();
  dapczLinkOperationState.currentMeeting = null;
  dapczLinkOperationState.initialLinkedIds = {};
  dapczLinkOperationState.modalFilter = "all";
  dapczLink_resetModalSort();
}

function dapczLink_renderModalRows(rows) {
  var html = "";

  dapczLink_sortProjectRowData(rows);

  rows.forEach(function (row) {
    html +=
      '<tr class="' +
      (row.isLinked ? "is-linked" : "") +
      '" data-project-id="' +
      dapczLink_escapeHtml(row.id) +
      '" data-project-label="' +
      dapczLink_escapeHtml(row.label) +
      '" data-zone="' +
      dapczLink_escapeHtml(row.zone) +
      '" data-rsn="' +
      dapczLink_escapeHtml(row.rsn) +
      '">' +
      '<td><input type="checkbox" class="dapcz-link-project-checkbox dapcz-link-modal-checkbox" ' +
      (row.isChecked ? "checked " : "") +
      'aria-label="Select ' +
      dapczLink_escapeHtml(row.label) +
      '"></td>' +
      "<td>" +
      dapczLink_escapeHtml(row.zone) +
      "</td>" +
      "<td>" +
      dapczLink_escapeHtml(row.rsn) +
      "</td>" +
      "<td>" +
      dapczLink_escapeHtml(row.label) +
      (row.isLinked
        ? ' <span class="dapcz-link-row-note">(Linked to this meeting)</span>'
        : "") +
      "</td></tr>";
  });

  $("#dapcz-link-modal-rows").html(html);
  $("#dapcz-link-modal-filter .dapcz-link-filter-btn").prop("disabled", false);
  dapczLink_syncModalSortHeaders();
  dapczLink_updateFilterCounts();
  dapczLink_applyModalFilter(dapczLinkOperationState.modalFilter);
}

function dapczLink_getVisibleProjectCheckboxes() {
  return $(
    "#dapcz-link-modal-rows tr[data-project-id]:not(.is-filter-hidden) .dapcz-link-project-checkbox"
  );
}

function dapczLink_getAllProjectCheckboxes() {
  return $("#dapcz-link-modal-rows tr[data-project-id] .dapcz-link-project-checkbox");
}

function dapczLink_syncSelectAllCheckbox() {
  var $visible = dapczLink_getVisibleProjectCheckboxes();
  var $checked = $visible.filter(":checked");
  var $selectAll = $("#dapcz-link-select-all");

  if (!$visible.length) {
    $selectAll.prop("checked", false).prop("indeterminate", false).prop("disabled", true);
    return;
  }

  $selectAll.prop("disabled", false);
  $selectAll.prop("checked", $visible.length === $checked.length);
  $selectAll.prop(
    "indeterminate",
    $checked.length > 0 && $checked.length < $visible.length
  );
}

function dapczLink_handleSelectAllChange() {
  var isChecked = $("#dapcz-link-select-all").is(":checked");
  dapczLink_getVisibleProjectCheckboxes().prop("checked", isChecked);
  dapczLink_syncSelectAllCheckbox();
}

function dapczLink_showModalMessage(type, message) {
  var typeClass =
    type === "error" ? "is-error" : type === "success" ? "is-success" : "is-info";
  $("#dapcz-link-modal-message").html(
    '<div class="dapcz-link-message ' + typeClass + '">' + message + "</div>"
  );
}

function dapczLink_clearModalFeedbackDismiss() {
  if (dapczLinkOperationState.feedbackDismissTimeoutId) {
    clearTimeout(dapczLinkOperationState.feedbackDismissTimeoutId);
    dapczLinkOperationState.feedbackDismissTimeoutId = null;
  }
}

function dapczLink_scheduleModalFeedbackDismiss() {
  dapczLink_clearModalFeedbackDismiss();
  dapczLinkOperationState.feedbackDismissTimeoutId = setTimeout(function () {
    dapczLinkOperationState.feedbackDismissTimeoutId = null;
    $("#dapcz-link-modal-message").empty();
    $("#dapcz-link-progress-slot").empty();
  }, DAPCZ_LINK_CONFIG.feedbackDismissMs);
}

function dapczLink_updateModalTableStructure() {
  var $table = $("#dapcz-link-modal-overlay .dapcz-link-modal-table");
  if (!$table.length) {
    return;
  }
  $table.find("thead").remove();
  $table.prepend(dapczLink_getModalTableHeadHtml());
  $("#dapcz-link-select-all").off("change").on("change", dapczLink_handleSelectAllChange);
  dapczLink_syncModalSortHeaders();
}

function dapczLink_openModal(meeting, skipLoading) {
  dapczLink_ensureModalShell();
  dapczLink_ensureModalFilterGroup();
  dapczLink_updateModalTableStructure();
  dapczLinkOperationState.currentMeeting = meeting;
  dapczLinkOperationState.modalFilter = "all";
  dapczLink_resetModalSort();

  $("#dapcz-link-modal-title").text(
    "Link Active Projects — " + meeting.dateLabel
  );
  $("#dapcz-link-modal-hint").text(
    "Checked projects are linked to the " +
      meeting.dateLabel +
      " meeting. Uncheck a project to remove it from this meeting, or check additional projects to link them."
  );

  if (!skipLoading) {
    dapczLink_showModalLoading();
  }

  $("#dapcz-link-modal-overlay").addClass("is-active").attr("aria-hidden", "false");
}

function dapczLink_refreshModalProjectRows(meeting) {
  var hadCache = dapczLink_hasCompleteProjectConnectionCache();

  if (hadCache) {
    dapczLink_setInitialLinkedIdsForMeeting(meeting);
    dapczLink_renderModalRows(dapczLink_buildProjectRows(meeting));
  }

  return dapczLink_refreshProjectModels()
    .then(function () {
      return dapczLink_loadProjectLinkState(meeting);
    })
    .then(function () {
      if (
        !dapczLinkOperationState.currentMeeting ||
        dapczLinkOperationState.currentMeeting.id !== meeting.id
      ) {
        return;
      }
      dapczLink_renderModalRows(dapczLink_buildProjectRows(meeting));
    })
    .catch(function (error) {
      console.error("DAPCZ failed to load project links:", error);
      if (dapczLinkOperationState.currentMeeting) {
        if (!hadCache) {
          dapczLink_showModalMessage(
            "error",
            "Unable to load current project links. Showing table data only."
          );
        }
        dapczLink_renderModalRows(
          dapczLink_buildProjectRows(dapczLinkOperationState.currentMeeting)
        );
      }
    });
}

function dapczLink_handleOpenModalClick(event) {
  event.preventDefault();

  if (dapczLinkOperationState.isProcessing) {
    return;
  }

  var meetingId = $(event.currentTarget).data("meeting-id");
  var viewKey = DAPCZ_LINK_CONFIG.views.meetings;
  var meetingModel =
    Knack.views[viewKey] &&
    Knack.views[viewKey].model &&
    Knack.views[viewKey].model.data
      ? Knack.views[viewKey].model.data.get(meetingId)
      : null;

  if (!meetingModel) {
    window.alert("Unable to load meeting details. Refresh the page and try again.");
    return;
  }

  var meeting = {
    id: meetingId,
    dateLabel: dapczLink_formatMeetingDate(meetingModel),
    identifier: dapczLink_formatMeetingDate(meetingModel),
  };

  dapczLink_openModal(meeting, dapczLink_hasCompleteProjectConnectionCache());
  dapczLink_refreshModalProjectRows(meeting);
}

function dapczLink_getModalProjectChanges() {
  var toLink = [];
  var toUnlink = [];
  var initialLinkedIds = dapczLinkOperationState.initialLinkedIds || {};

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

function dapczLink_createProgressBar(total) {
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
      "</span></span></div></div>"
  );
}

function dapczLink_updateProgress(completed, total, failed, currentAction) {
  var percentage = total ? Math.round((completed / total) * 100) : 0;
  $("#dapcz-link-progress-bar-fill").css("width", percentage + "%");
  $("#dapcz-link-progress-percentage").text(percentage + "%");
  $("#dapcz-link-progress-text").text(
    currentAction || "Updating project " + completed + " of " + total
  );
  $("#dapcz-link-success-count").text(completed - failed);
  $("#dapcz-link-failed-count").text(failed);
  $("#dapcz-link-remaining-count").text(total - completed);
}

function dapczLink_completeProgress(total, failed, linkedCount, unlinkedCount) {
  var $progressBar = $("#dapcz-link-progress-bar-fill");
  $progressBar.removeClass("progress-fill-update");
  $progressBar.addClass(failed > 0 ? "progress-fill-warning" : "progress-fill-update");

  if (failed > 0) {
    $("#dapcz-link-progress-text").text(
      "Finished with errors. Updated " + (total - failed) + " of " + total + " projects."
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
      : "Project links saved."
  );
}

function dapczLink_applyProjectChangesBatch(changes, meeting) {
  return new Promise(function (resolve) {
    var batchSize = DAPCZ_LINK_CONFIG.batchSize;
    var tasks = changes.toLink
      .map(function (project) {
        return { project: project, shouldLink: true, action: "link" };
      })
      .concat(
        changes.toUnlink.map(function (project) {
          return { project: project, shouldLink: false, action: "unlink" };
        })
      );
    var results = [];

    dapczLink_createProgressBar(tasks.length);
    $("#dapcz-link-progress-container .progress-title").text(
      "Saving Project Links to Meeting"
    );

    function processBatch(startIndex) {
      var endIndex = Math.min(startIndex + batchSize, tasks.length);
      var batch = tasks.slice(startIndex, endIndex);

      dapczLink_updateProgress(
        results.length,
        tasks.length,
        results.filter(function (r) {
          return !r.success;
        }).length,
        "Updating projects " + (startIndex + 1) + "–" + endIndex + " of " + tasks.length
      );

      var promises = batch.map(function (task) {
        return dapczLink_updateProjectMeetingLink(
          task.project,
          meeting,
          task.shouldLink
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
              error: dapczLink_formatApiError(error),
            };
          });
      });

      Promise.all(promises).then(function (batchResults) {
        results = results.concat(batchResults);
        var failedCount = results.filter(function (r) {
          return !r.success;
        }).length;

        dapczLink_updateProgress(results.length, tasks.length, failedCount);

        if (endIndex < tasks.length) {
          setTimeout(function () {
            processBatch(endIndex);
          }, DAPCZ_LINK_CONFIG.batchDelay);
        } else {
          dapczLink_completeProgress(
            tasks.length,
            failedCount,
            changes.toLink.length,
            changes.toUnlink.length
          );
          resolve(results);
        }
      });
    }

    processBatch(0);
  });
}

function dapczLink_setModalSubmitLoading(isLoading) {
  var $button = $("#dapcz-link-modal-submit");
  var $icon = $button.find("i");
  $button.prop("disabled", isLoading).toggleClass("is-loading", isLoading);
  if (isLoading) {
    $icon.removeClass("fa-link").addClass("fa-spinner fa-spin");
  } else {
    $icon.removeClass("fa-spinner fa-spin").addClass("fa-link");
  }
}

function dapczLink_handleModalSubmit(event) {
  event.preventDefault();

  var now = Date.now();
  if (dapczLinkOperationState.isProcessing) {
    return;
  }
  if (
    now - dapczLinkOperationState.lastOperationTime <
    DAPCZ_LINK_CONFIG.operationCooldownMs
  ) {
    return;
  }

  var meeting = dapczLinkOperationState.currentMeeting;
  if (!meeting) {
    return;
  }

  var changes = dapczLink_getModalProjectChanges();
  if (!changes.toLink.length && !changes.toUnlink.length) {
    dapczLink_showModalMessage(
      "error",
      "No changes to save. Check or uncheck projects to link or unlink them from this meeting."
    );
    return;
  }

  if (!DAPCZ_LINK_CONFIG.api.projectUpdateView) {
    dapczLink_showModalMessage(
      "error",
      "Linking is not configured yet. Add an API-enabled Form view on the Connect Project to Meeting page (field_1423 on dapcz_project) and set DAPCZ_LINK_CONFIG.api.projectUpdateView in right-of-way.js."
    );
    return;
  }

  dapczLinkOperationState.isProcessing = true;
  dapczLinkOperationState.lastOperationTime = now;
  dapczLink_setModalSubmitLoading(true);
  dapczLink_clearModalFeedbackDismiss();
  $("#dapcz-link-modal-message").empty();

  dapczLink_applyProjectChangesBatch(changes, meeting)
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
              dapczLink_escapeHtml(result.project.label || result.project.id) +
              " (" +
              dapczLink_escapeHtml(result.action || "update") +
              "): " +
              dapczLink_escapeHtml(result.error || "Update failed")
            );
          })
          .join("<br>");

        dapczLink_showModalMessage(
          "error",
          "Updated " +
            successCount +
            " of " +
            results.length +
            " project(s).<br><br>" +
            errorDetails
        );
      } else {
        var summaryParts = [];
        if (changes.toLink.length) {
          summaryParts.push("linked " + changes.toLink.length);
        }
        if (changes.toUnlink.length) {
          summaryParts.push("unlinked " + changes.toUnlink.length);
        }

        dapczLink_showModalMessage(
          "success",
          "Successfully " + summaryParts.join(" and ") + " project(s) for this meeting."
        );
      }

      dapczLink_scheduleModalFeedbackDismiss();

      return dapczLink_refreshProjectModels()
        .then(dapczLink_refreshMeetingView)
        .then(function () {
          dapczLinkOperationState.modalFilter = "all";
          dapczLink_setInitialLinkedIdsForMeeting(meeting);
          dapczLink_renderModalRows(dapczLink_buildProjectRows(meeting));
        });
    })
    .catch(function (error) {
      console.error("DAPCZ link projects failed:", error);
      dapczLink_showModalMessage(
        "error",
        "Something went wrong while linking projects. Please try again."
      );
      dapczLink_scheduleModalFeedbackDismiss();
    })
    .finally(function () {
      dapczLinkOperationState.isProcessing = false;
      dapczLink_setModalSubmitLoading(false);
    });
}

function dapczLink_injectMeetingActionColumn(view) {
  var viewSelector = "#" + view.key;
  var tableSelector = viewSelector + " table.kn-table-table";

  if (!$(tableSelector + " thead tr").length) {
    return;
  }

  if (!$(tableSelector + " thead .dapcz-link-col").length) {
    $(tableSelector + " thead tr").append(
      '<th class="dapcz-link-col"><span class="table-fixed-label">Link Projects</span></th>'
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
        "<span>Link Projects</span></a></td>"
    );
  });

  $(viewSelector + " .dapcz-link-open-btn")
    .off("click.dapczLink")
    .on("click.dapczLink", dapczLink_handleOpenModalClick);
}

function dapczLink_addMeetingActionColumn(view) {
  var tableSelector = "#" + view.key + " table.kn-table-table";

  if ($(tableSelector + " tbody tr").length) {
    dapczLink_injectMeetingActionColumn(view);
    return;
  }

  dapczLink_elementLoaded(tableSelector + " tbody tr", function () {
    dapczLink_injectMeetingActionColumn(view);
  });
}

$(document).on(
  "knack-view-render." + DAPCZ_LINK_CONFIG.views.projects,
  function () {
    dapczLink_cacheProjectsTableFields();
    dapczLink_scheduleProjectConnectionsPrefetch();
  }
);

$(document).on(
  "knack-view-render." + DAPCZ_LINK_CONFIG.views.meetings,
  function (event, view) {
    dapczLink_addMeetingActionColumn(view);
  }
);

$(document).on("knack-scene-render.scene_759", function () {
  dapczLink_addMeetingActionColumn({ key: DAPCZ_LINK_CONFIG.views.meetings });
  dapczLink_scheduleProjectConnectionsPrefetch();
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
