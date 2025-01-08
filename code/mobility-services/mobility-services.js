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
    bigButton('available-services', 'view_11', "https://atd.knack.com/mobility-services#available-services/", "list-ul", "Available Services");
});
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_16', "https://atd.knack.com/mobility-services#portal/", "child", "Customer Portal");
});
$(document).on('knack-view-render.view_34', function(event, page) {
  // create large REQUIRED DOCUMENTS button on the CHAUFFEUR page
    bigButton('required-documents-chauffeur', 'view_34', "https://atd.knack.com/mobility-services#chauffeur-permit/required-documents-chauffeur/", "files-o", "Required Documents");
});
$(document).on('knack-view-render.view_36', function(event, page) {
  // create large START APPLICATION button on the CHAUFFEUR page
    bigButton('start-application', 'view_36', "https://atd.knack.com/mobility-services#application-chauffeur/", "arrow-right", "Start Chauffeur Application");
});
$(document).on('knack-view-render.view_41', function(event, page) {
  // create large SIGN UP or Log-In button on the PORTAL page
    bigButton('sign-up', 'view_41', "https://atd.knack.com/mobility-services#sign-up", "sign-in", "Sign up or Log In ");
});
$(document).on('knack-view-render.view_57', function(event, page) {
  // create large CUSTOMER PORTAL button on the PORTAL page
    bigButton('available-services', 'view_57', "https://atd.knack.com/mobility-services#portal/", "arrow-right", "Mobility Services Portal");
});
$(document).on('knack-view-render.view_383', function(event, page) {
  // create large START APPLICATION button on the Operating Authority page
    bigButton('start-application', 'view_383', "https://atd.knack.com/mobility-services#application-operating-authority", "arrow-right", "Start Operating Authority Application");
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
  showCharacterLimit("view_83", "field_" + textBoxFieldIDs[i], 500); // background info page view
  showCharacterLimit("view_155", "field_" + textBoxFieldIDs[i], 500); // edit application page view
}

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("View");
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
$(document).on("knack-view-render.view_480", function (event, view, data) {
  // Company Print
  printMenuButton("view_480");
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
/*** Dropdown Menu Buttons Navigation ***/
/****************************************/
function dropdownMenuItem(recordId, route, linkName) {
  return `<li class="kn-button">\
      <a href="#application-operating-authority/business-information/${recordId}/${route}/${recordId}">\
        <span>${linkName}</span>\
      </a>\
    </li>`;
}

// Dictionary of views needing dropdown menu in editable Operating Authority (OA) pages
var viewNameOA = {
  687: "1 - Service Type",
  676: "2 - Business Information",
  689: "3 - Insurance",
  691: "4 - Authorized Person",
  693: "5 - Vehicle Information",
  695: "6 - Review and Submit",
};

for (let key in viewNameOA) {
  $(document).on(
    "knack-view-render.view_" + key,
    function (event, view, record) {
      var recordId = view.scene.scene_id;
      var currentMenu = viewNameOA[key];

      /* Desktop Operating Authority Page */
      $(`<div class="details-dropdown-menu tabs">\
      <ul id="desktop-menu-list">\
        <li class="desktop-dropdown-menu kn-dropdown-menu kn-button">\
          <a href="#application-operating-authority/business-information/${recordId}/business-information/${recordId}" data-kn-slug="#application-operating-authority">\
            <span class="nav-dropdown-link">${currentMenu}</span>\
            <span class="kn-dropdown-icon fa fa-caret-down" />\
          </a>\
          <ul class="kn-dropdown-menu-list desktop-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
            ${dropdownMenuItem(
              recordId,
              "application-operating-authority-service-type",
              "1 - Service Type"
            )}\
            ${dropdownMenuItem(
              recordId,
              "business-information",
              "2 - Business Information"
            )}\
            ${dropdownMenuItem(recordId, "insurance", "3 - Insurance")}\
            ${dropdownMenuItem(
              recordId,
              "authorized-person",
              "4 - Authorized Person"
            )}\
            ${dropdownMenuItem(
              recordId,
              "application-operating-authority-vehicles",
              "5 - Vehicle Information"
            )}\
            ${dropdownMenuItem(
              recordId,
              "application-operating-authority-details",
              "6 - Review and Submit"
            )}\
          </ul>\
    </div><br>`).appendTo("#view_" + key);

      /* Mobile Operating Authority Page */
      $(`<div class="mobile-details-dropdown-menu">\
    <ul id="mobile-menu-list">\
      <li class="mobile-dropdown-menu">\
        <ul class="desktop-dropdown-menu-list" style="min-width: 152px; margin: .5em;">\
          ${dropdownMenuItem(
            recordId,
            "application-operating-authority-service-type",
            "1 - Service Type"
          )}\
            ${dropdownMenuItem(
              recordId,
              "business-information",
              "2 - Business Information"
            )}\
            ${dropdownMenuItem(recordId, "insurance", "3 - Insurance")}\
            ${dropdownMenuItem(
              recordId,
              "authorized-person",
              "4 - Authorized Person"
            )}\
            ${dropdownMenuItem(
              recordId,
              "application-operating-authority-vehicles",
              "5 - Vehicle Information"
            )}\
            ${dropdownMenuItem(
              recordId,
              "application-operating-authority-details",
              "6 - Review and Submit"
            )}\
      </li>\
    </ul>\
  </div><br>`).appendTo("#view_" + key);
    }
  );
}