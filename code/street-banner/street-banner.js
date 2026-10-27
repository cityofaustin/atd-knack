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
/************** Citybase API ****************/
/********************************************/
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
        bigButton('citybase-payment-button', viewId, response.url, "arrow-right", "Make Payment");
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
  // LPB Application
  'scene_1211', // Event Information page
  'scene_1212', // Add Design Attachment page
  'scene_1226', // Add Banner Locations page

  // LPB Applications
  'scene_1219', // Application Details page

  // OTS Application
  'scene_1233', // Event Information page
  'scene_1234', // Add Design Attachment page
  'scene_1255', // Add Banner Locations page

  // OTS Applications
  'scene_1243', // Application Details page
];

BREADCRUMB_SCENES.forEach(scene => {
  $(document).on(`knack-scene-render.${scene}`, disableBreadcrumbLinks);
});


// Reload LPB Application when Design Ready "Yes"
$(document).on("knack-scene-render.scene_1212", function () {
  $('#view_3392 .kn-link:contains("Yes")').on("click", function(){
    location.reload();
  })
});

// Reload OTS Application when Design Ready "Yes"
$(document).on("knack-scene-render.scene_1234", function () {
  $('#view_3397 .kn-link:contains("Yes")').on("click", function(){
    location.reload();
  })
});


// lamppost application details
$(document).on("knack-view-render.view_3664", function (event, page, view) {
  $("#view_3664").hide();
  // operating under the expectation that there is only one line item to add
  var transactionRecord = view[0];

  var payload = {
    allowed_payment_methods: ["CARD", "BANK"],
    cancel_url: {
      url: window.location.href,
      label: "Cancel",
    },
    return_url: {
      url: window.location.href,
      label: "Continue",
    },
  };

  if (transactionRecord) {
    payload["line_items"] = [
      {
        description: transactionRecord["field_3350"],
        amount: parseInt(transactionRecord["field_3342_raw"] * 100),
        sub_description: transactionRecord["field_3351"],
        custom_attributes: [
          {
            key: "knack_record_id",
            value: transactionRecord["id"],
          },
          {
            key: "invoice_number",
            value: transactionRecord["field_3327"],
          },
          {
            key: "fund",
            value: String(transactionRecord["field_3356"]),
          },
          {
            key: "dept",
            value: String(transactionRecord["field_3357"]),
          },
          {
            key: "unit",
            value: String(transactionRecord["field_3358"]),
          },
          {
            key: "revenue",
            value: String(transactionRecord["field_3359"]),
          },
        ],
      },
    ];
    payload["custom_attributes"] = [
      {
        key: "knack_record_id",
        value: transactionRecord["id"],
      },
      {
        key: "invoice_number",
        value: transactionRecord["field_3327"],
      },
      {
        key: "banner_type",
        value: "LAMPPOST",
      },
      {
        key: "parent_record_id",
        value: String(transactionRecord["field_3328_raw"][0]["id"]),
      },
      {
        key: "knack_app",
        value: "STREET_BANNER",
      },
    ];
    // uncomment line below for debugging
    // console.log(JSON.stringify(payload));
    getCitybaseButton(payload, "view_3667");
  }
});

// over the street
$(document).on("knack-view-render.view_3665", function (event, page, view) {
  $("#view_3665").hide();
  // operating under the expectation that there is only one line item to add
  var transactionRecord = view[0];

  var payload = {
    allowed_payment_methods: ["CARD", "BANK"],
    cancel_url: {
      url: window.location.href,
      label: "Cancel",
    },
    return_url: {
      url: window.location.href,
      label: "Continue",
    },
  };

  if (transactionRecord) {
    payload["line_items"] = [
      {
        description: transactionRecord["field_3350"],
        amount: parseInt(transactionRecord["field_3342_raw"] * 100),
        sub_description: transactionRecord["field_3351"],
        custom_attributes: [
          {
            key: "knack_record_id",
            value: transactionRecord["id"],
          },
          {
            key: "invoice_number",
            value: transactionRecord["field_3327"],
          },
          {
            key: "fund",
            value: String(transactionRecord["field_3356"]),
          },
          {
            key: "dept",
            value: String(transactionRecord["field_3357"]),
          },
          {
            key: "unit",
            value: String(transactionRecord["field_3358"]),
          },
          {
            key: "revenue",
            value: String(transactionRecord["field_3359"]),
          },
        ],
      },
    ];
    payload["custom_attributes"] = [
      {
        key: "knack_record_id",
        value: transactionRecord["id"],
      },
      {
        key: "invoice_number",
        value: transactionRecord["field_3327"],
      },
      {
        key: "banner_type",
        value: "OVER_THE_STREET",
      },
      {
        key: "parent_record_id",
        value: String(transactionRecord["field_3329_raw"][0]["id"]),
      },
      {
        key: "knack_app",
        value: "STREET_BANNER",
      },
    ];
    // uncomment line below for debugging
    // console.log(JSON.stringify(payload));
    getCitybaseButton(payload, "view_3666");
  }
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

// Handler to target a specific login view to load generated password into the password input box - Acct Mgmt - Add Account form
$(document).on("knack-view-render.view_3040", function (event, scene) {
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});
  // Run on every hash change (triggered by navigation)
  $(window).on('hashchange', injectFooter);

})();
