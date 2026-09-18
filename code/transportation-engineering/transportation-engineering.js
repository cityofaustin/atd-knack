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

/********************************************/
/************** Small Buttons ***************/
/********************************************/
// Create Small Button nested in a block
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

$(document).on("knack-page-render.any", function (event, page) {
  // Hide the entire "Repeat" checkbox and label
  $("label:contains('Repeat')").hide();

  // Rename confusing google maps link
  $('a[title="view in google maps"]').text("View on Google Maps");
});

/********************************************************/
/*** Relabel Attachment Links in Tables to Name Field ***/
/********************************************************/
//  replace attachment file name with name field. hide_name to hide nameField from table
function replaceAttachmentFilenameWithNameField(fileFieldId, nameFieldId, hide_name = true) {
  // find each attachment cell
  $("td." + fileFieldId).each(function() {
    // find each attachment link within the cell
    $(this).find("span").children("span").each(function() {
      let attachmentType = "View";
      let fileRecordId = $(this).context.id;

      // if neighboring field exists on same table, retrieve the corresponding type
      $(this).closest("tr").children("td." + nameFieldId)
        .find("span")
        .children("span")
        .each(function() {
          let nameRecordId = $(this).context.id;
          if (fileRecordId == nameRecordId) {
            attachmentType = $(this).text();
          }
        });
      //  update link contents
      $(this).find("a").html(attachmentType);
    });
  });

  // hides the name field ID based on third parameter. Default true.
  if (hide_name){
    $("td." + nameFieldId).hide();
    $("th." + nameFieldId).hide();
  }
}

$(document).on("knack-view-render.any", function (event, view, data) {
  replaceAttachmentFilenameWithNameField("field_3176", "field_3174"); // Traffic Count Attachments
});

/********************************************************/
/***** Remove non-digits from street segment inputs *****/
/********************************************************/
// Restricts an input field to digits by removing all non-digit characters.
function restrictToDigits() {
  let currentValue = $(this).val();
  // Remove all non-digit characters
  let digitsOnly = currentValue.replace(/\D/g, "");
  // Only update if the value changed to avoid cursor jumping
  if (currentValue !== digitsOnly) {
    $(this).val(digitsOnly);
  }
}

const STREET_SEGMENT_VIEWS = [
  // New Location (scene_100)
  'view_1199',  // New location form - add primary street segment
  'view_1200',  // New location form - cross street segment
  // Edit Location (scene_71)
  'view_1207',  // Edit location form - primary street segment
  'view_1206',  // Edit location form - cross street segment
];

STREET_SEGMENT_VIEWS.forEach(view => {
  $(document).on(`knack-view-render.${view}`, function() {
    $("#field_119").keyup(restrictToDigits);
  });
});

/**************************************/
/*** Technician Time Log Validation ***/
/**************************************/
(function() {
  'use strict';
  
  // Date fields configuration
  const DATE_FIELDS = [
    { key: "field_2020", name: "Issue Received" },
    { key: "field_1437", name: "Arrive at Worksite" },
    { key: "field_1438", name: "Leave Work Site" },
    { key: "field_1425", name: "Return to Shop" },
  ];
  
  // Inject custom CSS for error message styling
  const injectCustomStyles = () => {
    const styleId = 'time-log-validation-styles';
    
    // Check if styles already exist
    if ($(`#${styleId}`).length) return;
    
    const customStyles = `
      <style id="${styleId}">
        /* Error message font size for Desktop */
        .kn-message.is-error .kn-message-body p {
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        
        /* Larger Error message font for Tablet */
        @media (max-width: 800px) {
          .kn-message.is-error .kn-message-body p {
            font-size: 18px !important;
            line-height: 1.3 !important;
          }
        }
        
        /* Error message font size for Mobile */
        @media (max-width: 635px) {
          .kn-message.is-error .kn-message-body p {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
        }
      </style>
    `;
    
    $('head').append(customStyles);
  };
  
  /**************************************************************************
   * UTILITY FUNCTIONS - Low-level helpers
   **************************************************************************/
  
  const getDatetime = (inputId) => {
    try {
      // Date-time field has two inputs, one for date, and one for time
      const dateValue = $(`#${inputId}`).val();
      const timeValue = $(`#${inputId}-time`).val();

      // Return undefined if date field is empty
      if (!dateValue) return undefined;

      // If time field is empty or invalid, default to 0:00 (like Knack does)
      let timeToUse = timeValue || "0:00";

      // Improved regex to parse time with optional AM/PM
      // Matches formats like: "14:30", "2:30pm", "2:30 PM", "02:30am"
      const timeMatch = timeToUse.match(/^\s*(\d{1,2}):(\d{2})\s*(am|pm)?\s*$/i);
      
      if (!timeMatch) {
        // If time doesn't match expected format, default to 0:00
        return new Date(`${dateValue} 0:0`);
      }

      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const amPm = timeMatch[3]?.toLowerCase();

      // Validate parsed values
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        // If invalid, default to 0:00
        hours = 0;
        minutes = 0;
      }

      // Adjust hours for 12-hour format with AM/PM
      if (amPm === "pm" && hours < 12) {
        hours += 12;
      } else if (amPm === "am" && hours === 12) {
        hours = 0;
      }

      // Construct the date object
      const dateTimeString = `${dateValue} ${hours}:${minutes}`;
      const dateObject = new Date(dateTimeString);

      // Validate that the date object is valid
      if (isNaN(dateObject.getTime())) {
        console.warn(`Invalid date/time constructed for input: ${inputId} - Date: ${dateValue}, Time: ${timeValue}`);
        return undefined;
      }

      return dateObject;
    } catch (error) {
      console.error(`Error parsing date/time for input: ${inputId}`, error);
      return undefined;
    }
  };

  const formatErrorMessage = (startField, endField) => {
    return `<u>${startField.name}</u> must be earlier than <u>${endField.name}</u><br/>`;
  };
  
  /**************************************************************************
   * UI FUNCTIONS - DOM manipulation for errors
   **************************************************************************/
  
  const highlightErrorField = (inputId) => {
    $(inputId).addClass("input-error");
    $(`${inputId}-time`).addClass("input-error");
  };

  const appendErrorMessage = (viewKey, formDiv, msg) => {
    // remove existing error msg if present
    $(`#${viewKey}-fail`).remove();
    
    const errorDiv = $(
      `<div id="${viewKey}-fail" class="kn-message is-error">
        <span class="kn-message-body">
          <p><strong>${msg}</strong></p>
        </span>
      </div>`
    );
    errorDiv.insertBefore(formDiv);
  };

  const updateErrorMessage = (viewKey, formDiv, errorMessages) => {
    $(`#${viewKey}-fail`).remove();
    
    if (errorMessages.length > 0) {
      const msg = errorMessages.join("");
      const errorDiv = $(
        `<div id="${viewKey}-fail" class="kn-message is-error">
          <span class="kn-message-body">
            <p><strong>${msg}</strong></p>
          </span>
        </div>`
      );
      errorDiv.insertBefore(formDiv);
    }
  };

  const removeErrorStyling = (inputId, viewKey, formDiv, dateFields) => {
    $(inputId).removeClass("input-error");
    $(`${inputId}-time`).removeClass("input-error");
    
    // Re-validate all fields and rebuild error messages
    const errorMessages = [];
    
    for (let i = 1; i < dateFields.length; i++) {
      const startField = dateFields[i - 1];
      const endField = dateFields[i];
      const startDateTime = getDatetime(`${viewKey}-${startField.key}`);
      const endDateTime = getDatetime(`${viewKey}-${endField.key}`);
      
      if (startDateTime === undefined || endDateTime === undefined) {
        continue;
      }
      
      // Check if times are equal or if start is after end
      if (startDateTime >= endDateTime) {
        // Check if these fields still have error styling
        const startHasError = $(`#${viewKey}-${startField.key}`).hasClass("input-error");
        const endHasError = $(`#${viewKey}-${endField.key}`).hasClass("input-error");
        
        if (startHasError || endHasError) {
          errorMessages.push(formatErrorMessage(startField, endField));
        }
      }
    }
    
    // Update the error message banner
    updateErrorMessage(viewKey, formDiv, errorMessages);
  };
  
  /**************************************************************************
   * INITIALIZATION - Event handlers and setup
   **************************************************************************/

  //Add Time Log form
  $(document).on("knack-view-render.view_3169", (event, page) => {
    const { key: viewKey } = page;
    let formDiv;
    
    // Inject custom styles once when view renders
    injectCustomStyles();

    // Set up event listeners to clear errors when fields are interacted with
    DATE_FIELDS.forEach((field) => {
      const fieldSelector = `#${viewKey}-${field.key}`;
      const timeSelector = `${fieldSelector}-time`;
      
      // Remove error styling when either date or time input is focused/changed
      $(fieldSelector).on("focus change", () => {
        if (!formDiv) {
          formDiv = $(`#${viewKey} .kn-button`).closest("div")[0];
        }
        removeErrorStyling(fieldSelector, viewKey, formDiv, DATE_FIELDS);
      });
      
      $(timeSelector).on("focus change", () => {
        if (!formDiv) {
          formDiv = $(`#${viewKey} .kn-button`).closest("div")[0];
        }
        removeErrorStyling(fieldSelector, viewKey, formDiv, DATE_FIELDS);
      });
    });

    $(`#${viewKey} .kn-button`).on("click", function () {
      let passesValidation = true;
      const currentFormDiv = $(this).closest("div")[0];
      let errorMsgs = "";

      // Clear any existing errors before re-validating - scoped to this view only
      $(`#${viewKey} .input-error`).removeClass("input-error");
      $(`#${viewKey}-fail`).remove();

      // Improved loop - dynamically uses DATE_FIELDS.length instead of hard-coded value
      for (let i = 1; i < DATE_FIELDS.length; i++) {
        const startField = DATE_FIELDS[i - 1];
        const endField = DATE_FIELDS[i];
        const startDateTime = getDatetime(`${viewKey}-${startField.key}`);
        const endDateTime = getDatetime(`${viewKey}-${endField.key}`);

        if (startDateTime === undefined || endDateTime === undefined) {
          // this only happens when a date or time field is blank
          // in which case we do not validate start/end. Knack validations
          // will step in if these fields are required
          continue;
        }
        // Changed from > to >= to catch equal times as well
        if (startDateTime >= endDateTime) {
          passesValidation = false;
          // highlight errored fields with red border
          highlightErrorField(`#${viewKey}-${startField.key}`);
          highlightErrorField(`#${viewKey}-${endField.key}`);

          errorMsgs = `${errorMsgs}${formatErrorMessage(startField, endField)}`;
        }
      }
      if (!passesValidation) {
        // show red error banner
        appendErrorMessage(viewKey, currentFormDiv, errorMsgs);
      }
      return passesValidation;
    });
  });

})();

/***********************************************************/
/*** Prevent user from re-assigning their own assignment ***/
/***********************************************************/
// https://github.com/cityofaustin/atd-data-tech/issues/9053
let technicianField = "field_1754";

let disableChosenSelect = function ($workingField, $workingFieldParent) {
  let $workingFieldClone = $workingField.clone();

  // Remove the working Chosen select
  $workingField.remove();
  // Append a non-working copy of the Chosen select to the field parent div
  // Clone/append breaks the context of the Chosen library on the field, hacky but it works
  $workingFieldParent.append($workingFieldClone);

  // Find the a tag that gives us the hover highlighting and pointer change
  let $aTag = $workingFieldClone.find("a.chzn-single");

  // Override hover in/out CSS so select doesn't look interactive
  $aTag.css("background-color", "#e5e5e5");
  $aTag.hover(
    function () {
      $(this).css("border-color", "#dbdbdb");
      $(this).css("cursor", "default");
    },
    function () {
      $(this).css("border-color", "#dbdbdb");
      $(this).css("cursor", "default");
    }
  );
};

let disableSelectField = function ($fieldToDisable, userId) {
  // Find the ID of the current lead technician (if there is one)
  let leadTechnicianId = $fieldToDisable.val() || null;
  // See if the logged in technician and lead technician ids match
  let isLoggedInUserLeadTechnician = userId === leadTechnicianId;
  // If so, disable the select
  if (isLoggedInUserLeadTechnician) {
    let $leadTechnicianSelectChosenDiv = $(
      "div#connection-picker-chosen-" + technicianField
    );
    let $leadTechnicianParentDiv = $leadTechnicianSelectChosenDiv.parent();

    disableChosenSelect(
      $leadTechnicianSelectChosenDiv,
      $leadTechnicianParentDiv
    );
  }
};

const ASSIGN_VIEWS = [
  'view_3156',  // My Work Order > Reassign (scene_1290)
  'view_1146',  // Work Order Details > Assign (scene_402)
];

ASSIGN_VIEWS.forEach(view => {
  $(document).on(`knack-view-render.${view}`, function (event,view,data) {
    // Getting userId before view load sometimes returns undefined so get it here
    let userId = Knack.getUserAttributes().id;
    let leadTechnicianSelect = $(`select#${view.key}-${technicianField}`);
    disableSelectField(leadTechnicianSelect, userId);
  });
});

/**********************************************************/
/*** Autopopulate work order ID in follow-up order form ***/
/**********************************************************/
// https://github.com/cityofaustin/atd-data-tech/issues/9052

$(document).on("knack-view-render.view_1718", function (event, view, data) {
  // Select and clone the original work order ID select field
  var $workOrderIdSelect = $("select#view_1718-field_2075");

  // Update the field placeholder text so it looks like the original work order ID is chosen
  var originalWorkOrderIdText = data.field_1209;
  var originalWorkOrderId = data.id;

  // Chosen.js updates this select after the view loads so we need to watch for that change
  // This event blows away any DOM updates made before it
  $workOrderIdSelect.on("change", function () {
    // Update placeholder option with value of original work order ID
    var $placeholderOption = $(this).find("option");
    $placeholderOption.val(originalWorkOrderId);
    $placeholderOption.text(originalWorkOrderIdText);

    // Disable this listener so we don't get an endless loop when we fire off one last change
    $(this).off();
    // Update this select with the original work order ID as its value
    $(this).val(originalWorkOrderId).change();

    // Update the span that normally prompts the type to search with the human-readable ID
    var $placeholderTextSpan = $("div#view_1718_field_2075_chzn > a > span");
    $placeholderTextSpan.text(originalWorkOrderIdText);
  });
});

/**************************************************************/
/*** Autopopulate scheduled work order ID in follow-up form ***/
/**************************************************************/
// https://github.com/cityofaustin/atd-data-tech/issues/9052

$(document).on("knack-scene-render.scene_1468", function () {
  // We have to do this in a scene render — not view — because we need data from a sibling view
  setInterval(function () {
    // Select and clone the original work order ID select field
    var $workOrderIdSelect = $("select#view_3653-field_4211");
    // find follow-up work order from details view
    var $originalWorkOrderDetails = $("#view_3650")
      .find(".kn-detail.field_1971")
      .find(".kn-detail-body");
    // find the work order ID text within it
    var followUpWorkOrderIdText = $originalWorkOrderDetails.text();
    // find the span that the text came from (mayb not the most effecient way of doing this...)
    var workOrderIDSpan = $originalWorkOrderDetails
      .find(`span:contains('${followUpWorkOrderIdText}')`)
      .last();
    // extract the Knack record ID from the span's class
    var followUpWorkOrderId = workOrderIDSpan.attr("class");
    // is the correct value already set?
    if ($workOrderIdSelect.val() === followUpWorkOrderId) {
      //  nothing to do
      return;
    }
    // Update placeholder option with value of original work order ID
    // The <select> **must** have an option with a value that matches the ID we're targeting
    var $placeholderOption = $workOrderIdSelect.find("option");
    $placeholderOption.val(followUpWorkOrderId);
    $placeholderOption.text(followUpWorkOrderIdText);
    // Disable this listener so we don't get an endless loop when we fire off a change
    $workOrderIdSelect.off("change");
    // Update this select with the original work order ID as its value
    $workOrderIdSelect.val(followUpWorkOrderId).change();
    // Update the span that normally prompts the type to search with the human-readable ID
    var $placeholderTextSpan = $("div#view_3653_field_4211_chzn > a > span");
    $placeholderTextSpan.text(followUpWorkOrderIdText);
  }, 500);
});

/*******************************/
/* Generates a Random Password */
/*******************************/
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

// Handler to target a specific login view to load generated password into the password input box
$(document).on("knack-view-render.view_1294", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
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
  // New Project Request Form scene_1591 (Projects Menu)
  'scene_1620',  // Project Locations page
  'scene_1623',  // Submit Request page
  'scene_1624',  // Confirmation page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
});

/*******************************************/
/*** Lat/Long Coordinate Clipboard Paste ***/
/*******************************************/
// Paste Coordinates from clipboard
async function pasteCoordinates(latitude,longitude) {
    try {
      const latField = document.querySelector(`input[name="${latitude}"]`);
      const lngField = document.querySelector(`input[name="${longitude}"]`);
      const text = await navigator.clipboard.readText();
      const coords = text.split(',').map(parseFloat);
      if(coords.length == 2 && coords) {
        lngField.value = Math.min(...coords);
        latField.value = Math.max(...coords);
      }
      // Run if address coordinate field exists
      pasteCoordinates("latitude","longitude");
    } catch (err) {
        console.error(`Clipboard read failed:`, err);
    }
}

$(document).on('knack-view-render.view_4966', function () {
  const lat = document.querySelector('input[name="field_5331"]');
  const long = document.querySelector('input[name="field_5330"]');
  lat.addEventListener('paste',     () => {pasteCoordinates("field_5331","field_5330")});
  long.addEventListener('paste',     () => {pasteCoordinates("field_5331","field_5330")});
});

/****************************************/
/******* Refresh View on Submit  ********/
/****************************************/
// A function to refresh a specified view
function refreshView(viewKey) {
  Knack.views[viewKey].model.fetch();
  setTimeout(() => {
    Knack.views[viewKey].render();
    Knack.views[viewKey].postRender();
  }, 2000);
}

// When request complete form is submitted, refresh Traffic Count Details view
$(document).on('knack-form-submit.view_5026', function (event, view, data) {
  refreshView('view_2359');
});
