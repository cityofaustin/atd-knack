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

// create large Add New Telework Request button on the home page
$(document).on("knack-view-render.view_924", function(event, page) {
    bigButton("new-telework", "view_924", `${APP_URL}#new-telework-request`, "plus-circle", "Add New Telework Request");
});

// create large Add New EMPLOYEE button on the Programs page
$(document).on("knack-view-render.view_929", function(event, page) {
    bigButton("new-employee", "view_929", `${APP_URL}#new-telework-request`, "times", "Employees");
});

// create large Add New HIRING RESOURCES button on the Programs page
$(document).on("knack-view-render.view_930", function(event, page) {
    bigButton("hiring-resources", "view_930", `${APP_URL}#hiring-resources/`, "users", "Hiring Resources");
});

// create large Add New STAFF FORMS button on the Programs page
$(document).on("knack-view-render.view_931", function(event, page) {
    bigButton("staff-forms", "view_931", `${APP_URL}#forms/`, "files-o", "Staff Forms");
});

// create large Employee Logs | District Maintenance button on the home page
$(document).on("knack-view-render.view_760", function(event, page) {
    bigButton("employee-logs-district-maintenance", "view_760", `${APP_URL}#manage-employee-logs/manage-dm-logs/?view_774_filters=%5B%5D`, "cubes", "District Maintenance");
});
// create large Employee Logs | Pavement Operations button on the home page
$(document).on("knack-view-render.view_761", function(event, page) {
    bigButton("employee-logs-pavement-operations", "view_761", `${APP_URL}#manage-employee-logs/manage-pvm-logs/?view_777_filters=%5B%5D`, "road", "Pavement Operations");
});
// create large Employee Logs | District Maintenance button on the home page
$(document).on("knack-view-render.view_762", function(event, page) {
    bigButton("employee-logs-utilities-and-structures", "view_762", `${APP_URL}#manage-employee-logs/manage-usd-logs/?view_780_filters=%5B%5D`, "wrench", "Utilities and Structures");
});
// create large Employee Logs | Logistics button on the home page
$(document).on("knack-view-render.view_827", function(event, page) {
    bigButton("manage-logistic-logs", "view_827", `${APP_URL}#manage-employee-logs/manage-logistic-logs/?view_822_filters=%5B%5D`, "truck", "Logistics");
});
// create large Training Buttons | My Training Dashboard
$(document).on("knack-view-render.view_845", function(event, page) {
    bigButton("my-training-dashboard", "view_845", `${APP_URL}#my-training-dashboard`, "tachometer", "My Training");
});
// create large Training Buttons | View Training Classes
$(document).on("knack-view-render.view_935", function(event, page) {
    bigButton("view-training-candidates", "view_935", `${APP_URL}#view-training-candidates`, "users", "View Training Candidates");
});
// create large Training Buttons | Manage Training Candidates
$(document).on("knack-view-render.view_844", function(event, page) {
    bigButton("manage-training-candidates", "view_844", `${APP_URL}#manage-training-candidates/`, "users", "Manage Training Candidates");
});
// create large Training Buttons | Enroll in a Program
$(document).on("knack-view-render.view_889", function(event, page) {
    bigButton("program-elgibility", "view_889", `${APP_URL}#program-eligibility/`, "check-square", "Enroll in a Training Program");
});
// create large buttons - Manage Nominations 
$(document).on("knack-view-render.view_996", function(event, page) {
    bigButton("manage-nominations", "view_996", `${APP_URL}#manage-nominations/`, "trophy", "Manage Committee Nominations");
});
// create large buttons - Self-Nominations 
$(document).on("knack-view-render.view_997", function(event, page) { 
  bigButton("view-nominations", "view_997", `${APP_URL}#view-nominations/`, "star", "View Committee Nominations"); 
});
// create large buttons - View Nominations 
$(document).on("knack-view-render.view_998", function(event, page) { 
  bigButton("commitee-self-nominations", "view_998", `${APP_URL}#committee-self-nomination/`, "user", "Committee Self-Nomination"); 
});
// create large buttons - DM Nominations
$(document).on("knack-view-render.view_1031", function(event, page) {
    bigButton("committee-member-nomination", "view_1031", `${APP_URL}#committee-member-nomination/`, "users", "Committee DM Nomination");
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
//Adds Small Button HTML directly on View ID
function smallButton(id, view_id, url, fa_icon, button_label, is_disabled = false, callback = null) {
  const disabledClass = is_disabled ? " small-button-disabled'" : "'";
  const html = `
    <a id='${id}' 
       class='back-button${disabledClass}' 
       href='${url}'>
      <span><i class='fa fa-${fa_icon}'></i></span>
      <span> ${button_label}</span>
    </a>
  `;

  $(`#${view_id}`).append(html);
  if (callback) callback();
}

/********************************************/
/******* Auto Populate Add Time Form ********/
/********************************************/
// Add Time Form: Set "Employee Name" to logged in user name
$(document).on("knack-view-render.view_32", function(event, page) {
  var attrs = Knack.getUserAttributes();
  console.log(attrs)
  $('#view_32-field_105').val(attrs.id);
  $('#view_32-field_105').trigger("liszt:updated");
});

/***************************************************************/
/*** Disable the ability to Click/Touch outside a Modal Page ***/
/***************************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
    $('.kn-modal-bg').off('click');
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
  // SSPR
  'scene_165', // SSPR Details page

  // Committee Nominations
  'scene_471', // Self Nomination Attestation page
  'scene_485', // Member Nomination Attestation page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
});

/*Hide all Utility page links and hyphens on Employee Sign In page*/
$(document).on('knack-scene-render.scene_326', function(event, scene) {
  $('.kn-current_user > .kn-log-out, .kn-current_user > a:not(.kn-log-out)').hide();
  var nodes = $('.kn-current_user').contents();
  while (true) {
    var hyphenFound = false;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === 3 && nodes[i].textContent.trim() === '-') {
        $(nodes[i]).remove();
        hyphenFound = true;
        break;
      }
    }
    if (!hyphenFound) {
      break;
    }
    nodes = $('.kn-current_user').contents(); // Update nodes after removal
  }
});
