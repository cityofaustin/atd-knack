var appSpecifics = {
  knackAppId: "64a8051523bfa90026dfd045", // Must update on per app instance basis
  apiSceneIdForRegulationText: "scene_688", // Automated regulation text edit form API scene id
  apiViewIdForRegulationText: "view_1393", // Automated regulation text edit form API view id
};

/*
KnackInitAsync = function ($, callback) { // Load the Knack Toolkit Library (KTL)
    (window.LazyLoad = LazyLoad) && LazyLoad.js(['https://ctrnd.com/Lib/KTL/KTL_Start.js'], () => {
        loadKtl($, callback, (typeof KnackApp === 'function' ? KnackApp : null), '' */ /*KTL version, leave blank to get latest*/ /*, 'min'*/ /*min or full*/ /*);
    })
};
*/

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

// create large Task Board button on the Home page
$(document).on("knack-view-render.view_612", function (event, page) {
  bigButton(
    "task-board",
    "view_612",
    "https://atd.knack.com/traffic-register#task-board/my-tasks/",
    "tasks",
    "My Task Board"
  );
});

// create large Search Approved Regulations button on the Home page
$(document).on("knack-view-render.view_613", function (event, page) {
  bigButton(
    "search-regulations",
    "view_613",
    "https://atd.knack.com/traffic-register#approved-regulations/",
    "search",
    "Search for Approved Regulations"
  );
});

// create large Search Regulation Documents button on the Home page
$(document).on("knack-view-render.view_614", function (event, page) {
  bigButton(
    "search-documents",
    "view_614",
    "https://atd.knack.com/traffic-register#regulation-documents/",
    "search",
    "Search for Regulation Documents"
  );
});

// create large Usability Survey button on the Usability Sign Up page
$(document).on("knack-view-render.view_1130", function (event, page) {
  bigButton(
    "usability-survey",
    "view_1130",
    "https://forms.office.com/g/C1sagRCRtk",
    "flask",
    "Usability Survey",
    true
  );
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
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
      "' class='small-button-container" +
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

/********************************************/
/************ Directory Buttons *************/
/********************************************/
/*
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
*/
/********************************************/
/************* Trigger Buttons **************/
/********************************************/
function triggerButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  target_blank = false,
  is_disabled = false,
  callback = null
) {
  var disabledClass = is_disabled ? " trigger-button'" : "'";
  var newTab = target_blank ? " target='_blank'" : "";
  $(
    "<a id='" +
      id +
      "' class='trigger-button" +
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
/*
// create a Bookmark button on the Approved Regulation Details page
$(document).on("knack-view-render.view_838", function (event, page) {
  triggerButton("bookmark", "view_838", "https://atd.knack.com/traffic-register#filtered-regulations/", "bookmark", "Bookmark");
});
*/
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

/*Submit Draft Page*/
$(document).on("knack-scene-render.scene_657", function () {
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

/*** Draft Builder Retire modal ***/
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
      connFieldId: "field_561" /*Self Connection for Approveds*/,
      detailsViewId: "view_891",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*** Draft Builder Retire & Replace modal ***/
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
      connFieldId: "field_561" /*Self Connection for Approveds*/,
      detailsViewId: "view_893",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*** Draft Builder Save Draft page ***/
$(document).on("knack-scene-render.scene_454", function () {
  if (prevIntervalId) {
    clearInterval(prevIntervalId);
  }
  prevIntervalId = setInterval(function () {
    populateConnectionFromDetails({
      formViewId: "view_902",
      connFieldId: "field_560" /*Self Connection for Drafts*/,
      detailsViewId: "view_901",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*** Draft Builder Submit Draft page ***/
$(document).on("knack-scene-render.scene_657", function () {
  if (prevIntervalId) {
    clearInterval(prevIntervalId);
  }
  prevIntervalId = setInterval(function () {
    populateConnectionFromDetails({
      formViewId: "view_1334",
      connFieldId: "field_560" /*Self Connection for Drafts*/,
      detailsViewId: "view_1332",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*** Draft Editor Retire modal ***/
$(document).on("knack-scene-render.scene_487", function () {
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
      formViewId: "view_995",
      connFieldId: "field_561" /*Self Connection for Approveds*/,
      detailsViewId: "view_996",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*** Draft Editor Retire & Replace modal ***/
$(document).on("knack-scene-render.scene_488", function () {
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
      formViewId: "view_997",
      connFieldId: "field_561" /*Self Connection for Approveds*/,
      detailsViewId: "view_998",
      detailsFieldId: "field_950" /*Document Display*/,
    });
  }, 250);
});

/*************************************************************/
/*** Render Create Document Button to Send Data to FS Docs ***/
/*************************************************************/
/*$(document).on('knack-scene-render.scene_545', function(event, scene) {

  $('#view_1107 .view-header').after('<div style="padding:15px"><a href="#" id="webmerge" class="kn-button">Create Document</a></div>');
  
  // link hander: send to FS Docs
  $('#webmerge').click(function(event) {
  event.preventDefault();

  // get data
  var data = Knack.models['view_1107'].toJSON();
  var record_id = data.id;
	
  log('data!');log(data);
  Knack.showSpinner();

  $.ajax({
  	url: 'https://www.webmerge.me/merge/983206/rgch6s?test=1',
	  data: {
		  //te_email: data.field_1162_raw.email,
      //cte_email: data.field_1164_raw.email,
	    regdoc_id: data.field_936_raw,
      submitted_date: data.field_882_raw,
      created_date: data.field_71_raw,
      record_id: data.id,
      //remarks: data.field_67_raw,
      //te_approval_date: data.field_888_raw,
	    //cte_approval_date: data.field_891_raw,
	    //te_review_completed_by: data.field_301_raw,
	    //cte_review_completed_by: data.field_303_raw
	  },
	  type: 'POST',
	  success: function() {
      alert('Document Created!');
	    Knack.hideSpinner();
	  },
      error: function() {
        alert('There was an error creating the document');
      }
    });
  });
  
});*/

/*************************/
/*** Auto Submit Forms ***/
/*************************/

/* Auto Submit Page 2 of Draft Builder */
$(document).on("knack-scene-render.scene_446", function (event, scene) {
  $("button[type=submit]").submit();
});

/* Auto Submit TE Approve Modal of Draft Review */
$(document).on("knack-scene-render.scene_653", function (event, scene) {
  $("button[type=submit]").submit();
});

/* Auto Submit CTE Approve Modal of Draft Review */
$(document).on("knack-scene-render.scene_654", function (event, scene) {
  $("button[type=submit]").submit();
});

/*********************************************/
/*** Hide Top Navigation for Draft Builder ***/
/*********************************************/
$(document).on("knack-scene-render.scene_446", function (event, scene) {
  $("#kn-app-menu").hide();
});
$(document).on("knack-scene-render.scene_447", function (event, scene) {
  $("#kn-app-menu").hide();
});
$(document).on("knack-scene-render.scene_454", function (event, scene) {
  $("#kn-app-menu").hide();
});
$(document).on("knack-scene-render.scene_657", function (event, scene) {
  $("#kn-app-menu").hide();
});

/********************************/
/*** Change Browser Tab Names ***/
/********************************/
$(document).on("knack-scene-render.scene_310", function (event, scene) {
  document.title = "Traffic Register Home";
});
$(document).on("knack-scene-render.scene_577", function (event, scene) {
  document.title = "Traffic Register Search";
});
$(document).on("knack-scene-render.scene_578", function (event, scene) {
  document.title = "Traffic Register Search";
});
$(document).on("knack-scene-render.scene_518", function (event, scene) {
  document.title = "Traffic Register Search";
});
$(document).on("knack-scene-render.scene_517", function (event, scene) {
  document.title = "Traffic Register Search";
});
$(document).on("knack-scene-render.scene_445", function (event, scene) {
  document.title = "Traffic Register Draft Builder";
});
$(document).on("knack-scene-render.scene_446", function (event, scene) {
  document.title = "Traffic Register Draft Builder";
});
$(document).on("knack-scene-render.scene_447", function (event, scene) {
  document.title = "Traffic Register Draft Builder";
});
$(document).on("knack-scene-render.scene_454", function (event, scene) {
  document.title = "Traffic Register Draft Builder";
});
$(document).on("knack-scene-render.scene_657", function (event, scene) {
  document.title = "Traffic Register Draft Builder";
});
$(document).on("knack-scene-render.scene_485", function (event, scene) {
  document.title = "Traffic Register Draft Editor";
});
$(document).on("knack-scene-render.scene_645", function (event, scene) {
  document.title = "Traffic Register Draft Review";
});
$(document).on("knack-scene-render.scene_588", function (event, scene) {
  document.title = "Regulation Document Details";
});
$(document).on("knack-scene-render.scene_581", function (event, scene) {
  document.title = "Approved Regulation Details";
});
$(document).on("knack-scene-render.scene_435", function (event, scene) {
  document.title = "My Task Board";
});
$(document).on("knack-scene-render.scene_436", function (event, scene) {
  document.title = "My Task Board";
});
$(document).on("knack-scene-render.scene_439", function (event, scene) {
  document.title = "My Task Board";
});
$(document).on("knack-scene-render.scene_469", function (event, scene) {
  document.title = "Review Page";
});
$(document).on("knack-scene-render.scene_469", function (event, scene) {
  document.title = "Account Settings";
});
$(document).on("knack-scene-render.scene_343", function (event, scene) {
  document.title = "App Administration";
});

/*
  // Function that adds checkboxes
var addCheckboxes = function(view) {
  // Add the checkbox to to the header to select/unselect all
  $('#' + view.key + '.kn-table thead tr').prepend('<th><input type="checkbox"></th>');
  $('#' + view.key + '.kn-table thead input').change(function() {
    $('.' + view.key + '.kn-table tbody tr input').each(function() {
      $(this).attr('checked', $('#' + view.key + '.kn-table thead input').attr('checked') != undefined);
    });
  });
  // Add a checkbox to each row in the table body
  $('#' + view.key + '.kn-table tbody tr').each(function() {
    $(this).prepend('<td><input type="checkbox"></td>');
  });
}

// Add checkboxes to a specific table view
$(document).on('knack-view-render.view_657', function (event, view) {
  addCheckboxes(view);
});
// Cycle through selected checkboxes. Use this in any code that needs to get the checked IDs
$('#view_657 tbody input[type=checkbox]:checked').each(function() {
  // add code here to get record id or row value
  var id = $(this).closest('tr').attr('id'); // record id
});
*/

/*************************************************************/
/*** Automated Regulation Text popluted by regulation type ***/
/*************************************************************/

var automatedRegulationTextPatternsByType = {
  // This is using the identifier key, should we use id like "61ef7a148e6250071cd47a49"?
  "ANGLEPARK: Angle Parking":
    "$421$ $391$ - on -  $394$ from $405$ $406$ of $403$ to $408$, $399$, $414$ side(s).",
};

/* Some fields return HTML in field_<field #> key, so we need to grab from the raw field
which contains an array of objects */
var fieldsToUseRawData = {
  391: "391_raw",
  394: "394_raw",
  403: "403_raw",
  408: "408_raw",
  1313: "1313_raw",
};

$(document).on("knack-form-submit.view_896", function (event, view, record) {
  var regulationTypeField = "field_391_raw";

  // Get the pattern from the map
  var regulationTypeRecordIdentifier =
    record[regulationTypeField][0].identifier;

  // Get the pattern by regulation type
  var pattern =
    automatedRegulationTextPatternsByType[regulationTypeRecordIdentifier];

  // Gather the fields that need to be replaced with their values
  // Use match all to get matches and the captured strings too
  // Ex. [["$391$", "391"], ...]
  var regex = /\$(.*?)\$/g;
  var matchesIterable = pattern.matchAll(regex);

  // Collect matches and values in an array of objects
  // For example, [{match: "$391$", value: "value-from-Knack-record"}, ...]
  var matches = [];
  for (var matchArray of matchesIterable) {
    var matchObject = {
      match: matchArray[0],
    };

    var fieldNumber = matchArray[1];
    // Create the field key to get the value from the record
    var fieldKey;
    if (fieldNumber in fieldsToUseRawData) {
      fieldKey = "field_" + fieldsToUseRawData[fieldNumber];
    } else {
      fieldKey = "field_" + fieldNumber;
    }

    // Add the value to the match object
    if (fieldNumber in fieldsToUseRawData) {
      // Get the value out of the array of objects in raw data
      var value = record[fieldKey][0].identifier;
      matchObject["value"] = value;
    } else {
      var value = record[fieldKey];
      matchObject["value"] = value;
    }

    matches.push(matchObject);
  }

  // Go through the map and replace the pattern with the value
  var automatedRegulationText = pattern;
  matches.forEach(function (matchObject) {
    var match = matchObject.match;
    var value = matchObject.value;
    automatedRegulationText = automatedRegulationText.replace(match, value);
  });

  // Async request to populated field_658 with the automated text
  var headers = {
    "X-Knack-Application-ID": appSpecifics.knackAppId,
    Authorization: Knack.getUserToken(),
    "content-type": "application/json",
  };

  var putUrl =
    "https://api.knack.com/v1/pages/" +
    appSpecifics.apiSceneIdForRegulationText +
    "/views/" +
    appSpecifics.apiViewIdForRegulationText +
    "/records/";
  var recordId = record.id;

  $.ajax({
    url: putUrl + recordId,
    type: "PUT",
    data: JSON.stringify({ field_658: automatedRegulationText }),
    headers: headers,
    success: function (res) {
      console.log(res);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
