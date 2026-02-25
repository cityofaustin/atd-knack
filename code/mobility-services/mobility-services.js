const APP_URL = `https://atd.knack.com/${Knack.app.attributes.slug}`;
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
	//>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_11', function(event, page) {
  // create large AVAILABLE SERVICES button on the PORTAL page
  bigButton('available-services', 'view_11', `${APP_URL}#available-services/`, 'list-ul', 'Available Services');
});
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
  bigButton('available-services', 'view_16', `${APP_URL}#portal/`, 'child', 'Customer Portal');
});
$(document).on('knack-view-render.view_34', function(event, page) {
  // create large REQUIRED DOCUMENTS button on the CHAUFFEUR page
  bigButton('required-documents-chauffeur', 'view_34', `${APP_URL}#chauffeur-permit/required-documents-chauffeur/`, 'files-o', 'Required Documents');
});
$(document).on('knack-view-render.view_36', function(event, page) {
  // create large START APPLICATION button on the CHAUFFEUR page
  bigButton('start-application', 'view_36', `${APP_URL}#application-chauffeur/`, "arrow-right", "Start Chauffeur Application");
});
$(document).on('knack-view-render.view_41', function(event, page) {
  // create large SIGN UP or Log-In button on the PORTAL page
  bigButton('sign-up', 'view_41', `${APP_URL}#sign-up`, 'sign-in', 'Sign up or Log In');
});
$(document).on('knack-view-render.view_57', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
  bigButton('available-services', 'view_57', `${APP_URL}#portal/`, 'arrow-right', 'Mobility Services Portal');
});
$(document).on('knack-view-render.view_383', function(event, page) {
  // create large START APPLICATION button on the Operating Authority page
  bigButton('start-application', 'view_383', `${APP_URL}#select-operating-authority`, 'arrow-right', 'Start Operating Authority Application');
});

$(document).on('knack-view-render.view_1032', function(event, page) {
  // create large New CREATE NEW APPLICATION button on the Operating Authority page
  bigButton('create-operating-authority-application', 'view_1032', `${APP_URL}#create-operating-authority-application`, 'arrow-right', 'Create New Application');
});

$(document).on('knack-view-render.view_1033', function(event, page) {
  // create large New JOIN EXISTING APPLICATION button on the Operating Authority page
  bigButton('join-existing-operating-authority-application', 'view_1033', `${APP_URL}#join-existing-operating-authority-application`, 'arrow-right', 'Join Existing Application');
});


/***************************************/
/**** Input validation for SSN ********/
/***************************************/
$(document).on("knack-view-render.any", function (event, view, data) {
  $("input#field_33").keyup(function (event) {
    // validates typing
    this.value = this.value.replace(/[-]/g, ""); // replace hyphens with nothing

    if (event.key === "Backspace") {
      // ignore if backspace
      return;
    } else if (event.key === " ") {
      // reject " "
      this.value = this.value.replace(/[\s]/g, ""); // replace space with nothing
    } else if (isNaN(Number(event.key))) {
      // if not number
      this.value = this.value.replace(/[^0-9\s-]+/g, "");
    }
  });
  $("input#field_33").attr("maxlength", 4); // only max is 4 length
});

/********************************************************/
/********** Show character limit on text type ***********/
/********************************************************/
/* Function shows character limit of the text field when filling out the filed in a a form view.*/
function showCharacterLimit(view_id, field_id, charLimit) {
  /* Function returns list as message text and css based on the input length and character limit */
  function showMessage(inputField) {
    const fieldLength = inputField.val().length;
    var inputLength = Math.abs(charLimit - fieldLength); // No negative numbers
    var fieldText = fieldLength == 0 ? "allowed" : "left";
    var cssField = { color: "#4a4a4a", "font-weight": "normal" };
    if (fieldLength > charLimit) {
      // if the length is over the character limit change the CSS and text
      cssField = { color: "#ff0000", "font-weight": "bold" }; // make text red and bold instead
      fieldText = "over limit"; // Will say "XXX characters over limit" instead
    }
    return [inputLength + " characters " + fieldText, cssField]; // returns list as [str message, dict css]
  }

  /* Shows the message after field input based on character limit and length */
  $(document).on("knack-view-render." + view_id, function (event, view, data) {
    /* When first viewing the field input */
    const formViewFieldID =
      ".kn-form.kn-view." + view_id + " form #" + field_id;
    const fieldMessage = showMessage($(formViewFieldID))[0];
    $(formViewFieldID).after(`<p class='typed-chars'>${fieldMessage}</p>`);

    /* When user is typing in the input field change the text and CSS */
    $(document).ready(function () {
      $(formViewFieldID).on("input", function (e) {
        const $input = $(this);
        const inputMessage = showMessage($input)[0];
        const cssField = showMessage($input)[1];
        $input.siblings(".typed-chars").text(inputMessage); // Set text message of field
        $input.siblings(".typed-chars").css(cssField); // Set CSS of typed-chars class
      });
    });
  });
} // This closes the showCharacterLimit function

const textBoxFieldIDs = [48, 49, 52, 53, 76, 86, 56]; // lists paragraph fields
/* Character limit */
for (let i = 0; i < textBoxFieldIDs.length; i++) {
  showCharacterLimit("view_83", "field_" + textBoxFieldIDs[i], 500);  // Background Info page view
  showCharacterLimit("view_155", "field_" + textBoxFieldIDs[i], 500); // Edit Application page view
}

/********************************************************/
/** Relabel Attachment Links in Tables to Name Field **/
/********************************************************/
//  replace attachment file name with name field. hide_name to hide nameField from table
function replaceAttachmentFilenameWithNameField(fileFieldId, nameFieldId, hide_name = true) {
  //  find each attachment cell
  $("td." + fileFieldId).each(function() {
    //  find each attachment link within the cell
    $(this).find("span").children("span").each(function() {
      let attachmentType = "View";
      let fileRecordId = $(this).context.id;

      //  if neighboring field exists on same table, retrieve the corresponding type
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

    // Remove duplicate break lines
    $('br').each(function () {
      if ($(this).next().is('br')) {
        $(this).next().remove();
      }
    });

  });

  // hides the name field ID based on third parameter. Default true.
  if (hide_name){
    $("td." + nameFieldId).hide();
    $("th." + nameFieldId).hide();
  }
}

$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("View");
  replaceAttachmentFilenameWithNameField("field_285", "field_458");
});

/****************************************************/
/*** Disable Trigger buttons from being Clickable ***/
/****************************************************/
$(document).on("knack-scene-render.any", function (event, view) {
  var $disabledTriggerButton = $(".trigger-button-large-disabled").parent();
  $disabledTriggerButton.removeClass("kn-action-link");
});

/***************************************/
/***** Print Menu Button ************/
/***************************************/
function printMenuButton(view_id) {
  $("#" + view_id + " .knMenuLink").click(function (e) {
    window.print();
  });
}

/* Print 3 pages menu view button - Chauffeur Permit*/
$(document).on("knack-view-render.view_227", function (event, view, data) {
  // Customer Print
  printMenuButton("view_227");
});

$(document).on("knack-view-render.view_315", function (event, view, data) {
  // Reviewer Print
  printMenuButton("view_315");
});

/* Print 4 pages menu view button - Chauffeur Permit*/
$(document).on("knack-view-render.view_228", function (event, view, data) {
  // Customer Print
  printMenuButton("view_228");
});

$(document).on("knack-view-render.view_304", function (event, view, data) {
  // Reviewer Print
  printMenuButton("view_304");
});

/* Print Operating Authority Notary Page */
$(document).on("knack-view-render.view_1148", function (event, view, data) {
  // Primary Holder Print
  printMenuButton("view_1148");
});

/***************************************
 * Enhance SSO button and hide/show default Knack login form with buttons
 * @parameter {string} viewId - Knack view id to append button link to
/***************************************/
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

/****************************************/
/**** In-Form Dropdown Menu Buttons  ****/
/****************************************/
// Define dictionary of views needing dropdown menu in editable Operating Authority (OA) pages
// Format is {"view_id" : ["Dropdown Menu Label", "page-slug"],etc...}
let dropdown = {
  "view_1190": ["1 - Service Information", "edit-service-information"],
  "view_1191": ["2 - Insurance Information", "edit-insurance-information"],
  "view_1192": ["3 - Additional People", "edit-additional-people-section"],
  "view_1193": ["4 - Vehicle Information", "edit-vehicle-information"],
  "view_1194": ["5 - Review and Submit", "edit-review-and-submit"]
};

let knSlug = "#application-operating-authority";

// Function that returns the dropdown menu item
function dropdownMenuItem(slug, recordId, route, linkName) {
  let buttonItem = `<li class="kn-button">\
      <a href="${slug}/${route}/${recordId}/">\
        <span>${linkName}</span>\
      </a></li>`;
  return buttonItem;
}

for (let v in dropdown) {
  $(document).on(`knack-view-render.${v}`, function (event, view, record) {         
    var recordId = view.scene.scene_id; 
    var currentMenu = dropdown[v][0];   // "Dropdown Menu Label"
    var currentSlug = dropdown[v][1];   // "page-slug"

    // Desktop dropdown menu code
    var desktopDropdownMenu = `<div class="details-dropdown-menu tabs">\
      <ul id="desktop-menu-list"><li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
      <a><span class="nav-dropdown-link">${currentMenu}</span><span class="kn-dropdown-icon fa fa-caret-down" /></a>\
      <a href="${knSlug}/${currentSlug}/${recordId}" data-kn-slug="${knSlug}"></a>\
      <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">`;

    // Mobile dropdown menu code
    var mobileDropdownMenu = `<div class="mobile-details-dropdown-menu">\
    <ul id="mobile-menu-list"><li class="mobile-dropdown-menu">\
    <ul class="kn-dropdown-menu-list mobile-dropdown-menu-list" style="min-width: 152px; margin: 0;">`;

    // Adds dropdown menuu item to desktop and mobile
    for (let label in dropdown) {
      desktopDropdownMenu += `${dropdownMenuItem(knSlug,recordId,dropdown[label][1],dropdown[label][0])}`;
      mobileDropdownMenu += `${dropdownMenuItem(knSlug,recordId,dropdown[label][1],dropdown[label][0])}`;
    }
    desktopDropdownMenu += `</ul></div><br>`;
    mobileDropdownMenu += `</ul></li></ul></div><br>`;

    $(desktopDropdownMenu).appendTo(`#${v}`);
    $(mobileDropdownMenu).appendTo(`#${v}`);
  });
}

/*******************************************/
/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadcrumbLinks() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

const BREADCRUMB_SCENES = [
  // Operating Authority Tables scene_207
  'scene_335',  // 1 - Service Information
  'scene_337',  // 2 - Insurance Information
  'scene_338',  // 3 - Additional People
  'scene_339',  // 4 - Vehicle Information
  'scene_340',  // 5 - Review and Submit
  'scene_341',  // 6 - Print Notary
  'scene_342',  // Add Additional Holders
  'scene_347',  // Edit Personal Information
  'scene_368',  // Submitted Application
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
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
$(document).on("knack-view-render.view_353", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});
