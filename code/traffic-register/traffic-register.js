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
    "Sign-In"
  );

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
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  target_blank = false,
  is_disabled = false,
  callback = null
) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
  $(
    "<a id='" +
      id +
      "' class='big-button-container" +
      disabledClass +
      " href='" +
      url +
      "'" +
      newTab +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);
  if (callback) callback();
}

// create large Reviewer Dashboard button on the Home page
$(document).on("knack-view-render.view_612", function (event, page) {
  bigButton(
    "reviewer-dashboard",
    "view_612",
    "https://atd.knack.com/traffic-register#rd-assigned-work/",
    "dashboard",
    "Reviewer Dashboard"
  );
});

// create large Regulation Documents button on the Home page
$(document).on("knack-view-render.view_613", function (event, page) {
  bigButton(
    "regulation-documents",
    "view_613",
    "https://atd.knack.com/traffic-register#regulation-documents/",
    "cubes",
    "Regulation Documents"
  );
});

// create large Regulations button on the Home page
$(document).on("knack-view-render.view_614", function (event, page) {
  bigButton(
    "regulations",
    "view_614",
    "https://atd.knack.com/traffic-register#regulations/",
    "files-o",
    "Regulations"
  );
});

// create large Account Management button on the Home page
$(document).on("knack-view-render.view_615", function (event, page) {
  bigButton(
    "account-management",
    "view_615",
    "https://atd.knack.com/traffic-register#account-management/",
    "users",
    "Account Management"
  );
});

// create large App Administration button on the Home page
$(document).on("knack-view-render.view_616", function (event, page) {
  bigButton(
    "app-administration",
    "view_616",
    "https://atd.knack.com/traffic-register#admin/",
    "gears",
    "App Administration"
  );
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
//Create Small Button nested in a block
function smallButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  target_blank = false,
  is_disabled = false,
  callback = null
) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
  $(
    "<a id='" +
      id +
      "' class='back-button" +
      disabledClass +
      " href='" +
      url +
      "'" +
      newTab +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);
  if (callback) callback();
}

// create small Bookmark button on the Approved Regulation Details page
$(document).on("knack-view-render.view_838", function (event, page) {
  smallButton(
    "bookmark",
    "view_838",
    "https://atd.knack.com/traffic-register#filtered-regulations/",
    "bookmark",
    "Bookmark"
  );
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

/*****************************************************/
/*** Display Icon function for Field Table Headers ***/
/*****************************************************/
/*
function displayIcon(id, field_id, fa_icon, callback = null) {
  if ($("a#" + id).length === 0) {
    $(
      "<a id='" +
        id +
        "' class='display-icon'><span>&nbsp<i class='fa fa-" +
        fa_icon +
        "'></i></span></a>"
    ).appendTo("th." + field_id + " .table-fixed-label > a");
    if (callback) callback();
  }
}

//Display Icon for Approved Regulation fields
$(document).on("knack-scene-render.any", function () {
  displayIcon("RN", "field_114", "barcode");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Drafted Reg Doc", "field_289", "toggle-off");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Approved Reg Doc", "field_50", "toggle-on");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Line Item ID", "field_679", "sort-numeric-asc");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Action", "field_91", "adn");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Nickname", "field_365", "tag");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Approved Status", "field_120", "flag");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Reg Type", "field_92", "gears");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Sign Type", "field_100", "gear");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Full Primary Street", "field_696", "road");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Intersection", "field_682", "arrows");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Street Range", "field_689", "arrows-h");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Lane", "field_101", "reorder");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Regulation Text", "field_111", "file-text-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Created Timestamp", "field_156", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Submitted Timestamp", "field_292", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Approved Timestamp", "field_105", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Installed Timestamp", "field_106", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Retired Timestamp", "field_108", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Uninstalled Timestamp", "field_318", "clock-o");
});
$(document).on("knack-scene-render.any", function () {
  displayIcon("Modified Timestamp", "field_157", "clock-o");
});
*/
/****************************************************/
/*** Autopopulate Drafted Reg Doc ID for drafting ***/
/****************************************************/

/**
 * Given two sibling views - a details and a form — populate a connection
 * field with the record ID of a details field
 */
function populateConnectionFromDetails({
  formViewId,
  connFieldId,
  detailsViewId,
  detailsFieldId,
}) {
  // Select and clone the original work order ID select field
  var $matchRegSelect = $(`#${formViewId}-${connFieldId}`);
  // Get this form's record ID from the submit button
  var thisRecordId = $(".kn-submit").find("input").val();

  if ($matchRegSelect.val() === thisRecordId) {
    //   nothing to do — correct value is set
    return;
  }

  var thisRecordLabel = $(`#${detailsViewId}`)
    .find(`.kn-detail.${detailsFieldId}`)
    .find(".kn-detail-body")
    .text();

  // Update placeholder option with value of original work order ID
  var $placeholderOption = $matchRegSelect.find("option");
  $placeholderOption.val(thisRecordId);
  $placeholderOption.text(thisRecordLabel);

  // Disable this listener so we don't get an endless loop when we fire off one last change
  $matchRegSelect.off("change");
  // Update this select with the original work order ID as its value
  $matchRegSelect.val(thisRecordId).change();

  // Update the span that normally prompts the type to search with the human-readable ID
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

/*** Retire and replace modal ***/
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

/*** Save draft ***/
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

/********************************************************/
/*** End Autopopulate Drafted Reg Doc ID for drafting ***/
/********************************************************/
