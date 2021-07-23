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
    bigButton("tia-reviews", "view_719", "https://atd.knack.com/development-services#tia-requests/", "list-ul", "TIA Reviews");
});
// create large TDA Reviews button on the Home page
$(document).on("knack-view-render.view_724", function(event, page) {
    bigButton("tda-reviews", "view_724", "https://atd.knack.com/development-services#tda-reviews/", "list-ul", "Pre-Assessment Reviews");
});
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


// create large Start TIA Request button on the TIA Portal page
$(document).on("knack-view-render.view_112", function(event, page) {
    bigButton("tia-request", "view_112", "https://atd.knack.com/development-services#tia-request-requester-information/", "arrow-right", "Start TIA Request");
});

/****************************************************/
/*** Disable Trigger buttons from being Clickable ***/
/****************************************************/
$(document).on('knack-scene-render.any', function(event, view) {
  var $blockContainerButton = $(".block-container-disabled").parent();
  $blockContainerButton.removeClass("kn-action-link");
})

/*********************************************************/
/** Convert Case ID field to UPPERCASE for TIA Request **/
/*********************************************************/
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

/***********************************************************/
/*** Disable Breadcrumb Navigation Links for TIA Request ***/
/***********************************************************/

//TIA Requester Information page
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
//TIA Review Request page
$(document).on("knack-scene-render.scene_177", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Request Confirmation page
$(document).on("knack-scene-render.scene_178", function () {
  disableBreadCrumbsNonAdmin();
});
//TIA Edit Request page
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

/*********************************************************/
/** Add Return to Case Details Button to specific views **/
/*********************************************************/
$(document).on("knack-view-render.any", function(event, view) {
var appviews=["view_601","view_602","view_604","view_605"];
var key=(view.key!=undefined)?view.key.toLowerCase().trim():"";
var l=appviews.length;
for (var x=0; x<l; x++) {

if (appviews[x]==key) {
	$('#'+appviews[x]).prepend("<button id='return-button'>Return to Case Details</button>");
	document.getElementById('return-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});

/********************************************************************/
/** Add Return to Submission Cycle Button to Edit Attachment Pages **/
/********************************************************************/
$(document).on("knack-view-render.any", function(event, view) {
var appviews=["view_612","view_613"];
var key=(view.key!=undefined)?view.key.toLowerCase().trim():"";
var l=appviews.length;
for (var x=0; x<l; x++) {

if (appviews[x]==key) {
	$('#'+appviews[x]).prepend("<button id='return-button'>Return to Submission Cycle</button>");
	document.getElementById('return-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});

/***********************************************************/
/*** Add Return to Memo Builder Button to New Memo Pages ***/
/***********************************************************/
$(document).on("knack-view-render.any", function(event, view) {
var appviews=["view_713","view_714","view_715"];
var key=(view.key!=undefined)?view.key.toLowerCase().trim():"";
var l=appviews.length;
for (var x=0; x<l; x++) {

if (appviews[x]==key) {
	$('#'+appviews[x]).prepend("<button id='return-button'>Return to Memo Builder</button>");
	document.getElementById('return-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});


/***************************************/
/**** Global Reporting Page Styling ****/
/***************************************/
Highcharts.setOptions({
    chart: {  

      backgroundColor: {
            linearGradient: [500, 500, 500, 500], /*for report container, set to same value for no gradient*/
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)'] /*we create a light blue report container background to contrast the data with the white plot area and white page*/
            ]
        },
        borderWidth: 0, /*border width for report container, does not include title, print/download, or filter menu*/
        plotBackgroundColor: 'rgba(255, 255, 255, .9)', /*how much lighter you want the plot background to be compared to report background color. 
        We make the plot background almost transparent to be similar as the page color and contrast with the light blue report container color*/
        plotShadow: false, /*adds shadow to bottom and right of plot and gives a 3D effect. We make it flat.*/
        plotBorderWidth: 2 /*for plot only. Helps user focus on data in the plot*/
    }
});

/****************************************************/
/**** Hide/Show TIA Add Mitigation form elements ****/
/****************************************************/
var improvementField = "field_495";
var mitigationField = "field_326";

var fieldsIdsShownOnLoad = {
  // "Field ID": "Field Name"
  "kn-input-field_639": "Mitigation Location",
  "kn-input-field_326": "Mitigation Type",
  "kn-input-field_495": "Improvement",
  "kn-input-field_317": "Cost",
  "kn-input-field_211": "Recommendation Notes",
};

var fieldsIdsShownOnImprovementSelect = {
  // "MC Field Value": [...ids of fields to show on value select]
  "Construct Turn Lane": [
    "kn-input-field_494",
    "kn-input-field_728",
    "kn-input-field_496",
    "kn-input-field_729",
  ],
  
  "Construct New Road": [
    "kn-input-field_496",
    "kn-input-field_727",
    "kn-input-field_737",
  ],
  
  "Install Traffic Signal": [
    "kn-input-field_730",
  ],
  
  "Construct Sidewalk": [
    "kn-input-field_496",
    "kn-input-field_727",
  ],
  
  "Construct Protected Bike Lane": [
    "kn-input-field_496",
    "kn-input-field_727",
    "kn-input-field_731",
  ],
  
  "Stripe New Bike Lane": [
    "kn-input-field_732",
  ],
  
  "Relocate Bus Stop": [
    
  ],
  
  "Signal Modifications": [
    "kn-input-field_733",
  ],
  
  "Signal Timing Modifications": [
    
  ],
  
  "Construct Urban Trail": [
    "kn-input-field_496",
    "kn-input-field_727",
  ],
  
  "Install Pedestrian Crosswalk": [
    "kn-input-field_734",
  ],
  
  "Install Pedestrian Hybrid Beacon": [
    
  ],
  
  "Construct Curb Ramps": [
    "kn-input-field_735",
    "kn-input-field_736",
  ],
};

var fieldsIdsShownOnMitigationTypeSelect = {
  // "MC Field Value": [...ids of fields to show on value select]
  "Mitigation Fee in Lieu": ["kn-input-field_488"]
};

function hideFormFields(fieldViewId) {
  var $fields = $("#" + fieldViewId).find(".kn-input");

  $fields.each(function (index, field) {
    var fieldId = field.id;

    if (!fieldsIdsShownOnLoad.hasOwnProperty(fieldId) && fieldId) {
      $("#" + fieldId).hide();
    }
  });
}

function showFormFieldsByImprovementType(value) {
  // Un-hide form fields in map
  if(fieldsIdsShownOnImprovementSelect.hasOwnProperty(value)){
  	fieldsIdsShownOnImprovementSelect[value].forEach(function (fieldId) {
    	$("#" + fieldId).show();
  	});
  }
}

function showFormFieldsByMitigationType(value) {
  // Un-hide form fields in map
  if(fieldsIdsShownOnMitigationTypeSelect.hasOwnProperty(value)){
  	fieldsIdsShownOnMitigationTypeSelect[value].forEach(function (fieldId) {
    	$("#" + fieldId).show();
  	});
  }
}

function showFieldsByImprovementAndType(viewId){
  var improvementType = $("#" + viewId + "-" + improvementField).val();
  var mitigationType = $("#" + viewId + "-" + mitigationField).val();

  hideFormFields(viewId);
  showFormFieldsByImprovementType(improvementType);
  showFormFieldsByMitigationType(mitigationType);
}

//the Add Mitigation Form
$(document).on("knack-view-render.view_628", function (event, view) {
  hideFormFields(view.key);

  // Attach event listener to handle change in field_495 select (Improvement)
  $("#" + view.key + "-" + improvementField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });

  // Attach event listener to handle change in field_326 select (Mitigation Type)
  $("#" + view.key + "-" + mitigationField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });
});

//the Edit Mitigation Form
$(document).on("knack-view-render.view_509", function (event, view) {
  hideFormFields(view.key);
  
  var improvementValue = $("#" + view.key + "-" + improvementField).val();
  var mitigationType = $("#" + view.key + "-" + mitigationField).val();
  
  // If there is an existing value, show associated fields
  if(fieldsIdsShownOnImprovementSelect.hasOwnProperty(improvementValue)){	
     showFormFieldsByImprovementType(improvementValue);
  }
  
  // If there is an existing value, show associated fields
  if(fieldsIdsShownOnMitigationTypeSelect.hasOwnProperty(mitigationType)){	
     showFormFieldsByMitigationType(mitigationType);
  }

  // Attach event listener to handle change in field_495 select (Improvement)
  $("#" + view.key + "-" + improvementField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });

  // Attach event listener to handle change in field_326 select (Mitigation Type)
  $("#" + view.key + "-" + mitigationField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });
});

/************************************/
/**** Save TIA Request Record ID ****/
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

/***************************************************/
/*** Refresh Mitigation Fee in Lieu Table Button ***/
/***************************************************/
$(document).on("knack-view-render.view_322", function (event, page) {
  var button = $(
    "<span style='width: 2em'></span>" +
    "<button id='refresh-view_322' style='border-radius: .35em' class='kn-button is-primary'>" +
    "<i class='fa fa-refresh'></i>" +
    "<span style='width: .5em'></span>Refresh Table</button>"
  );

  button.insertAfter( //places button next to keyword search option
    $("#view_322").find("form.table-keyword-search").find("a")[0]
  );

  $("#refresh-view_322").click(function (e) {
    e.preventdefault();
    Knack.views["view_322"].model.fetch();
  });
});

/****************************************************/
/*** Refresh Mitigation Construction Table Button ***/
/****************************************************/
$(document).on("knack-view-render.view_321", function (event, page) {
  var button = $(
    "<span style='width: 2em'></span>" +
    "<button id='refresh-view_321' style='border-radius: .35em' class='kn-button is-primary'>" +
    "<i class='fa fa-refresh'></i>" +
    "<span style='width: .5em'></span>Refresh Table</button>"
  );

  button.insertAfter(//places button next to keyword search option
    $("#view_321").find("form.table-keyword-search").find("a")[0]
  );

  $("#refresh-view_321").click(function (e) {
    e.preventdefault();
    Knack.views["view_321"].model.fetch();
  });
});

/*************************************/
/**** TIA Menu Buttons Navigation ****/
/*************************************/

function dropdownMenuItem(recordId, route, iconName, linkName, mobile = false, newTab = false) {
  const buttonClass = mobile ? "tia-button" : "kn-button";
  if (newTab) {
    return (
      `<li class="${buttonClass}">\
        <a href="#tia-requests/tia-case-details/${recordId}/${route}/${recordId}" target="_blank" and rel="noopener noreferrer">\
          <span class="icon is-small"> \
            <i class="fa ${iconName}" /> \
          </span>\
          <span>${linkName}</span>\
        </a>\
      </li>`)
  }
  return (
    `<li class="${buttonClass}">\
      <a href="#tia-requests/tia-case-details/${recordId}/${route}/${recordId}">\
        <span class="icon is-small"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span>${linkName}</span>\
      </a>\
    </li>`)
}

// Function to toggle "active" and "show-icon" classes for mobile dropdown menu
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
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/edit-tia-case-details/${recordId}" data-kn-slug="#update-case-details">\
          <span class="nav-dropdown-link">Update Case Details</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "edit-tia-case-details", "fa-edit", "Edit Case Details & Notes")}\
          ${dropdownMenuItem(recordId, "assign-case-reviewers", "fa-users", "Assign Case Reviewers")}\
          ${dropdownMenuItem(recordId, "change-tia-case-status", "fa-retweet", "Approve or Change Case Status")}\
          ${dropdownMenuItem(recordId, "connected-cases", "fa-link", "Connect Cases")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status-reviewer", "fa-dollar", "Fees")}\
      ${dropdownMenuItem(recordId, "add-tia-communication", "fa-plus-circle", "Communication")}\
    </ul>\
  </div>`).appendTo("#view_744")

  // *** Dropdown menu for mobile views ***
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
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder", true)}\
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
          ${dropdownMenuItem(recordId, "change-tia-case-status", "fa-retweet", "Approve or Change Case Status", true)}\
          ${dropdownMenuItem(recordId, "connected-cases", "fa-link", "Connect Cases", true)}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status-reviewer", "fa-dollar", "Fees", true)}\
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
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-advanced-search/" data-kn-slug="#advanced-search">\
          <span class="nav-dropdown-link">Advanced Search</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "search-tia-submissions", "fa-search", "Search Submissions")}\
          ${dropdownMenuItem(recordId, "search-tia-scopes", "fa-search", "Search Scopes")}\
          ${dropdownMenuItem(recordId, "search-tia-submission-content", "fa-search", "Search Submission Content")}\
          ${dropdownMenuItem(recordId, "search-tia-scope-content", "fa-search", "Search Scope Content")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "tia-submissions-reporting", "fa-bar-chart", "Submissions Reporting")}\
      ${dropdownMenuItem(recordId, "review-tia-case-status", "fa-child", "Customer's View")}\
    </ul>\
  </div>`).appendTo("#view_887")
})

/* Mitigation Page */
$(document).on('knack-view-render.view_886', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-mitigation-fee-status", "fa-dollar", "Mitigation Fees")}\
      ${dropdownMenuItem(recordId, "feature-map", "fa-road", "Segment & Intersection Map", false, true)}\
      ${dropdownMenuItem(recordId, "tia-mitigation-reporting", "fa-bar-chart", "Mitigation Reporting")}\
      ${dropdownMenuItem(recordId, "search-tia-mitigations", "fa-search", "Search Mitigations")}\
    </ul>\
  </div>`).appendTo("#view_886")
})

/* Feature Map Page */
$(document).on('knack-view-render.view_926', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
    </ul>\
  </div>`).appendTo("#view_926")
})

/* Memo Builder Page */
$(document).on('knack-view-render.view_889', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "new-final-memo", "fa-plus-square", "New Final Memo")}\
    </ul>\
  </div>`).appendTo("#view_889")
})

/* Case Log Page */
$(document).on('knack-view-render.view_893', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
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
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "assign-scope-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
      ${dropdownMenuItem(recordId, "begin-scope-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-scope-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "scope-submission-change-log", "fa-list-ol", "Submission Log")}\
    </ul>\
  </div>`).appendTo("#view_901")
})

/* Submission Details Page */
$(document).on('knack-view-render.view_902', function(event, view, record) {
  // regex: match the 24 digit record id that comes in hash part of url after "/"
  const parentRecordId = window.location.hash.match(/(?<=\/)\d[a-z0-9]{23}/)[0]
  const recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-details", "fa-list-alt", "Case Details")}\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "assign-submission-reviewer", "fa-hand-o-up", "Assign Reviewer")}\
      ${dropdownMenuItem(recordId, "begin-submission-review", "fa-play-circle-o", "Begin Review")}\
      ${dropdownMenuItem(recordId, "complete-submission-review", "fa-exchange", "Reject/Approve")}\
      ${dropdownMenuItem(recordId, "submission-change-log", "fa-list-ol", "Submission Log")}\
    </ul>\
  </div>`).appendTo("#view_902")
})

/***************************************************/
/* Change or Hide Summary Row on Mitigation Tables */
/***************************************************/

function hideSummaryNameMitigationEditTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(5)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

function hideSummaryNameMitigationExportTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(1)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

function hideSummaryNameMitigationMemo(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      // The tables on memos omit the edit column and notes column, the summary total cell is the first cell
      $(this).find("td:eq(0)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

// Change Summary Name for Mitigation Tables
$(document).on('knack-scene-render.scene_290', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationEditTable("view_854", "Location Total")
  hideSummaryNameMitigationEditTable("view_857", "Location Total")
})

// Change Summary Name for Mitigation Tables
$(document).on('knack-scene-render.scene_314', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationExportTable("view_911", "Location Total")
  hideSummaryNameMitigationExportTable("view_914", "Location Total")
})

// Change Summary Name for Mitigation Tables on Memos
$(document).on('knack-scene-render.scene_255', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationMemo("view_708", "Location Total")
  hideSummaryNameMitigationMemo("view_709", "Location Total")
})

/***************************************************/
/* Change or Hide Summary Row on Mitigation Tables */
/***************************************************/

function hideSummaryNameMitigationTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(2)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

function hideSummaryNameMitigationMemo(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      // The tables on memos omit the edit column and notes column, the summary total cell is the first cell
      $(this).find("td:eq(0)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

// Change Summary Name for Mitigation Tables
$(document).on('knack-scene-render.scene_105', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationTable("view_322", "Location Total")
  hideSummaryNameMitigationTable("view_321", "Location Total")
})

// Change Summary Name for Mitigation Tables on Memos
$(document).on('knack-scene-render.scene_255', (event) => {
  // // Waiting for scene to render instead of view
  // // View finishes rendering before table data is loaded
  hideSummaryNameMitigationMemo("view_708", "Location Total")
  hideSummaryNameMitigationMemo("view_709", "Location Total")
})
