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

//HOME TAB BUTTONS
$(document).on('knack-view-render.view_16', function(event, page) {
    bigButton('metrobike-employee-benefit', 'view_16', "https://atd.knack.com/bike-benefit-program#metrobike-employee-benefit/", "bicycle", "MetroBike Employee Benefit");
});

//LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_410', function(event, page) {
    bigButton('living-streets-eoi', 'view_410', `${APP_URL}#living-streets-eoi/`, "street-view", "Healthy Streets or Play Streets");
});
//LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_411', function(event, page) {
    bigButton('living-streets-login', 'view_411', "https://www.austintexas.gov/department/neighborhood-block-parties", "users", "Block Party", true);
});

//LIVING STREETS GETTING STARTED PAGE draft 1
$(document).on('knack-view-render.view_451', function(event, page) {
    bigButton('living-streets-login', 'view_451', "https://www.austintexas.gov/LivingStreets", "home", "Return to Living Streets Home", true);
});
//LIVING STREETS GETTING STARTED PAGE draft 2
$(document).on('knack-view-render.view_450', function(event, page) {
    bigButton('living-streets-getting-started', 'view_450', `${APP_URL}#living-streets-eoi-new/`, "arrow-right", "Start Expression of Interest");
});

//LS SPLASH PAGE - Healthy Streets
$(document).on('knack-view-render.view_832', function(event, page) {
    bigButton('living-streets-getting-started', 'view_832', `${APP_URL}#living-streets-getting-started/`, "arrow-right", "Healthy Streets");
});

//LS SPLASH PAGE - Play Streets
$(document).on('knack-view-render.view_833', function(event, page) {
    bigButton('living-streets-getting-started', 'view_833', `${APP_URL}#living-streets-getting-started/`, "arrow-right", "Play Streets");
});

//LS SPLASH PAGE - Neighborhood Block Party
$(document).on('knack-view-render.view_834', function(event, page) {
    bigButton('living-streets-getting-started', 'view_834', `${APP_URL}#block-party-getting-started/`, "arrow-right", "Neighborhood Block Party");
});

//LS NBP Gettign Started PAGE
$(document).on('knack-view-render.view_836', function(event, page) {
    bigButton('living-streets-getting-started', 'view_836', `${APP_URL}#nbp-login/`, "arrow-right", "Start Block Party Application");
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
  'scene_188', //LS Timeframe
  'scene_206', //HS EOI Finalize and Submit
  'scene_208', //HS EOI Confirmation
  'scene_209', //PS EOI Finalize and Submit
  'scene_211', //PS EOI Confirmation
  'scene_276', //LS Timeframe NEW
  'scene_277', //HS EOI Finalize and Submit NEW
  'scene_280', //HS EOI Confirmation NEW
  'scene_281', //PS EOI Finalize and Submit NEW
  'scene_284', //PS EOI Confirmation NEW
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
});

/****************************/
/*** Citybase Integration ***/
/****************************/

//MANAGE MAKE PAYMENT BUTTON
$(document).on('knack-view-render.view_997', function(event, page) {
  // create large button on go back to Portal page
  // see the getCitybaseButton function for the invocation of the make payment bigButton function
});


function getCitybaseButton(payload, viewId){
    fetch('https://invoice-service.prod.cityba.se/invoices/austin_tx_transportation/street_banner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        console.log("Citybase make payment URL:", response.url)
        bigButton('make-payment', viewId, response.url, "arrow-right", "Review and Pay");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

var knackUserToken = Knack.getUserToken();

var headers = {
  "X-Knack-Application-Id": Knack.application_id,
  "X-Knack-REST-API-KEY": "knack",
  Authorization: knackUserToken,
  "content-type": "application/json",
};

// After the transactions table loads
$(document).on('knack-view-render.view_1002', function(event, page, view) {
  $('#view_1002').hide()
  var transactionRecord = view[0]

  var payload = {
    "allowed_payment_methods": [
      "CARD",
      "BANK"
    ],
    "cancel_url": {
      "url": window.location.href,
      "label": "Cancel"
    },
    "return_url": {
      "url": window.location.href,
      "label": "Continue"
    }
  }

  // make sure record exists
  if (transactionRecord) {
      payload["line_items"] = [{
        "description": transactionRecord["field_819"],
        "amount": parseInt(transactionRecord["field_833_raw"]*100),
        "sub_description": transactionRecord["field_849"],
        "custom_attributes": [
          {
            "key":"knack_record_id",
            "value":transactionRecord["id"]
          },
          {
            "key": "invoice_number",
            "value":transactionRecord["field_814"]
          },
          {
            "key": "fund",
            "value":String(transactionRecord["field_829"])
          },
          {
            "key": "dept",
            "value":String(transactionRecord["field_830"])
          },
                    {
            "key": "unit",
            "value":String(transactionRecord["field_831"])
          },
          {
            "key": "revenue",
            "value":String(transactionRecord["field_832"])
          }
        ],
      }];
      payload["custom_attributes"]=[{
            "key":"knack_record_id",
            "value":transactionRecord["id"]
          },
          {
            "key": "invoice_number",
            "value":transactionRecord["field_814"]
          },
          {
            "key": "parent_record_id",
            "value": String(transactionRecord["field_815_raw"][0]["id"]),
          },
          {
            "key": "knack_app",
            "value": "SMART_MOBILITY"
          }
      ]
      // uncomment line below for debugging / triaging
      // console.log(JSON.stringify(payload));
      getCitybaseButton(payload, "view_997")
    }
})

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

// Handler to target a specific login view to load generated password into the password input box - Account Management Page
$(document).on("knack-view-render.view_567", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});
// Handler to target a specific login view to load generated password into the password input box - Application Details Page
$(document).on("knack-view-render.view_486", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});
// Handler to target a specific login view to load generated password into the password input box - Add Internal Account
$(document).on("knack-view-render.view_114", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});

/*************************************/
/**** COA FOOTER - Simple Version ****/
/*************************************/
  // Dynamically injects a branded footer into specific customer-facing standard Knack pages only.
  // Use this version for apps where displaying the footer on modal windows is not required.
  // Caution: Navigating from a standard page > modal page > and then to a new standard page from a menu view on that modal page may cause footer ghosting/duplication to occur
  // Best Practice: Modals are okay as long as a user isnt required to navigate with the modal. Instead the user should navigate via the top nav or a standard page
  //
  // To display the footer on a new page: append its URL hash and scene ID comment to the footerHashes array below.
(function() {

  // List of exact URL hashes that should display the footer. Only exact matches are used — child pages (e.g. #customer/my-projects/) are automatically excluded.
  const footerHashes = [
    '#living-streets-getting-started/',                        // scene_179
    '#block-party-getting-started/',                           // scene_342
    '#block-party-rules/',                                     // scene_348
    '#living-streets-applicant-portal/',                       // scene_356 & 374
  ];

  // Our structured Footer HTML consisting of the COA Brand, the Privacy Policy, and any app specific Contact Info
  // Styling is handled in the Knack CSS file via the #coa-footer selector.
  const footerHTML = `
    <div id="coa-footer">
      <img 
        src="https://images.gitbook.com/__img/dpr=2,width=600,onerror=redirect,format=auto,signature=1503205633/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCqNGfEc0WO4ar1y6yBB3%252Fuploads%252F94aonme89HIUpHVnpeuK%252FCOA-Logo-Horizontal-Official-RGB.png%3Falt%3Dmedia%26token%3Da9121b5d-9d3c-41d0-9e72-90e25938e553" 
        alt="City of Austin Footer Logo" 
      />
      <p><a href="mailto:livingstreets@austintexas.gov">livingstreets@austintexas.gov</a></p>
      <p><a href="https://www.austintexas.gov/page/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
    </div>
  `;

  // Inject footer for standard pages. Runs on initial page load and every time the URL hash changes.
  function injectFooter() {
    const hash = window.location.hash;

    // Check if the current hash exactly matches one of our footer pages
    const shouldShow = footerHashes.includes(hash);

    // If we're not on a footer page, remove the footer and exit
    if (!shouldShow) {
      $('#coa-footer').remove();
      return;
    }

    // Check if the footer is already present in #knack-body
    if ($('#knack-body #coa-footer').length) return;

    // Poll every 100ms for #knack-body to be available in the DOM as it may not exist immediately after hash change. Exits after 2s.
    const maxAttempts = 20;
    let attempts = 0;

    const interval = setInterval(function() {
      attempts++;
      if ($('#knack-body').length) {
        clearInterval(interval);
        $('#knack-body').append(footerHTML);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('COA Footer: #knack-body not found after max attempts');
      }
    }, 100);
  }

  // Run on initial page load
  $(window).on('load', injectFooter);

  // Run on every hash change (triggered by navigation)
  $(window).on('hashchange', injectFooter);

})();
