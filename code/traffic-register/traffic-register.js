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
  bigButton("task-board", "view_612", "https://atd.knack.com/traffic-register#task-board/", "tasks", "Task Board");
});

// create large Regulation Documents button on the Home page
$(document).on("knack-view-render.view_613", function(event, page) {
  bigButton("regulation-documents", "view_613", "https://atd.knack.com/traffic-register#regulation-documents/", "files-o", "Regulation Documents");
});

// create large Regulations button on the Home page
$(document).on("knack-view-render.view_614", function(event, page) {
  bigButton("approved-regulations", "view_614", "https://atd.knack.com/traffic-register#approved-regulations/", "check-square-o", "Approved Regulations");
});

// create large Account Management button on the Home page
$(document).on("knack-view-render.view_615", function(event, page) {
  bigButton("account-management", "view_615", "https://atd.knack.com/traffic-register#account-management/", "users", "Account Management");
});

// create large App Administration button on the Home page
$(document).on("knack-view-render.view_616", function(event, page) {
  bigButton("app-administration", "view_616", "https://atd.knack.com/traffic-register#admin/", "gears", "App Administration");
});

// create large Usability Survey button on the Usability Sign Up page
$(document).on("knack-view-render.view_1130", function(event, page) {
  bigButton("usability-survey", "view_1130", "https://forms.office.com/g/C1sagRCRtk", "flask", "Usability Survey", true);
});

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
/************ Directory Buttons *************/
/********************************************/
function directoryButton(id, view_id, url, fa_icon, button_label, button_description, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " directory-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='directory-button" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</br></br>" + button_description + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}

// create Reg Doc Basic Search button on the Directory page
$(document).on("knack-view-render.view_1101", function(event, page) {
  directoryButton("regulation-documents-basic-search", "view_1101", "https://atd.knack.com/traffic-register#doc-basic-search/", "search", "Basic Search:", "Search for Documents with a specific parameter such as Reg Doc ID");
});

// create Filtered Documents button on the Directory page
$(document).on("knack-view-render.view_1102", function(event, page) {
  directoryButton("regulation-documents-filtered-search", "view_1102", "https://atd.knack.com/traffic-register#doc-filtered-search/", "filter", "Filtered Search:", "View pre-filtered Documents by field values such as Area, Status, or State");
});

// create Reg Doc Power Search button on the Directory page
$(document).on("knack-view-render.view_1104", function(event, page) {
  directoryButton("regulation-documents-power-search", "view_1104", "https://atd.knack.com/traffic-register#doc-power-search/", "plug", "Power Search:", "Search for Documents that may or may not exist with a range of values");
});

// create Unassigned Documents button on the Directory page
$(document).on("knack-view-render.view_1105", function(event, page) {
  directoryButton("regulation-documents-unconnected-search", "view_1105", "https://atd.knack.com/traffic-register#doc-unassigned-search/", "exclamation-triangle", "Unassigned Search:", "View Document records not assigned to a reviewer");
});

// create Regulation Basic Search button on the Directory page
$(document).on("knack-view-render.view_1055", function(event, page) {
  directoryButton("approved-regulations-basic-search", "view_1055", "https://atd.knack.com/traffic-register#reg-basic-search/", "search", "Basic Search:", "Search for Regulations with a specific parameter such as Regulation ID");
});

// create Filtered Regulations button on the Directory page
$(document).on("knack-view-render.view_1056", function(event, page) {
  directoryButton("approved-regulations-filtered-search", "view_1056", "https://atd.knack.com/traffic-register#reg-filtered-search/", "filter", "Filtered Search:", "View pre-filtered Regulations by field values such as Area, Status, or Action");
});

// create Regulation Power Search button on the Directory page
$(document).on("knack-view-render.view_1057", function(event, page) {
  directoryButton("approved-regulations-power-search", "view_1057", "https://atd.knack.com/traffic-register#reg-power-search/", "plug", "Power Search:", "Search for Regulations that may or may not exist with a range of values");
});

// create Unconnected Regulations button on the Directory page
$(document).on("knack-view-render.view_1058", function(event, page) {
  directoryButton("approved-regulations-unconnected-search", "view_1058", "https://atd.knack.com/traffic-register#reg-unconnected-search/", "unlink", "Unconnected Search:", "View Regulation records not connected to a Regulation Document");
});

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
/*Regulation Backfill object - Sign Type*/
$(document).on("knack-page-render.any", function (event, page) {
  $("input#field_616").keyup(function () {
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
/*** Disable Breadcrumb Navigation Links for Reg Doc Draft ***/
/*************************************************************/
/*Draft Instructions Page*/
$(document).on("knack-scene-render.scene_446", function () {
  disableBreadCrumbsNonAdmin();
});

/*Add Regulations Page*/
$(document).on("knack-scene-render.scene_447", function () {
  disableBreadCrumbsNonAdmin();
});

/*Save Draft Page*/
$(document).on("knack-scene-render.scene_454", function () {
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

/****************************************************/
/*** Autopopulate Drafted Reg Doc ID for drafting ***/
/****************************************************/
function populateConnectionFromDetails({
  formViewId,
  connFieldId,
  detailsViewId,
  detailsFieldId,
}) {
  // Select and clone the original ID
  var $matchRegSelect = $(`#${formViewId}-${connFieldId}`);
  // Get this form's record ID from the submit button
  var thisRecordId = $(".kn-submit").find("input").val();

  if ($matchRegSelect.val() === thisRecordId) {
    // nothing to do — correct value is set
    return;
  }

  var thisRecordLabel = $(`#${detailsViewId}`)
    .find(`.kn-detail.${detailsFieldId}`)
    .find(".kn-detail-body")
    .text();

  // Update placeholder option with value of original ID
  var $placeholderOption = $matchRegSelect.find("option");
  $placeholderOption.val(thisRecordId);
  $placeholderOption.text(thisRecordLabel);

  // Disable this listener so we don't get an endless loop when we fire off one last change
  $matchRegSelect.off("change");
  // Update this select with the original ID as its value
  $matchRegSelect.val(thisRecordId).change();

  // Update the span that normally prompts the type to search with the readable ID
  var $placeholderTextSpan = $(
    `div#${formViewId}_${connFieldId}_chzn > a > span`
  );
  $placeholderTextSpan.text(thisRecordLabel);
}

// we need this global var to share interval state across functions
var prevIntervalId;

/*** Retire modal ***/
$(document).on("knack-scene-render.scene_449", function () {
  // clear interval if this modal closes
  $(".delete.close-modal").on("click", () => {
    if (prevIntervalId) {
      clearInterval(prevIntervalId);
    }
  });
  if (prevIntervalId) {
    clearInterval(prevIntervalId);
  }
  prevIntervalId = setInterval(function () {
    populateConnectionFromDetails({
      formViewId: "view_890",
      connFieldId: "field_561",
      detailsViewId: "view_891",
      detailsFieldId: "field_950",
    });
  }, 250);
});

/*** Retire and Replace modal ***/
$(document).on("knack-scene-render.scene_450", function () {
  // clear interval if this modal closes
  $(".delete.close-modal").on("click", () => {
    if (prevIntervalId) {
      clearInterval(prevIntervalId);
    }
  });
  // clear interval if already running
  if (prevIntervalId) {
    clearInterval(prevIntervalId);
  }
  prevIntervalId = setInterval(function () {
    populateConnectionFromDetails({
      formViewId: "view_892",
      connFieldId: "field_561",
      detailsViewId: "view_893",
      detailsFieldId: "field_950",
    });
  }, 250);
});

/*** Save Draft page ***/
$(document).on("knack-scene-render.scene_454", function () {
  if (prevIntervalId) {
    clearInterval(prevIntervalId);
  }
  prevIntervalId = setInterval(function () {
    populateConnectionFromDetails({
      formViewId: "view_902",
      connFieldId: "field_560",
      detailsViewId: "view_901",
      detailsFieldId: "field_950",
    });
  }, 250);
});
