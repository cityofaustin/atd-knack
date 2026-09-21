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
