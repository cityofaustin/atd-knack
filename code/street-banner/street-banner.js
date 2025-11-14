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
//Create Big Button nested in a block
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}
  //>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_2390', function(event, page) {
  // create large button on the home page
    bigButton('contact-directory', 'view_2390', "https://atd.knack.com/street-banners#banners-contacts-organization-directory/", "phone", "Contacts & Organizations");
});
$(document).on('knack-view-render.view_2660', function(event, page) {
    // create large button on the home page
    bigButton('reservations', 'view_2660', "https://atd.knack.com/street-banners#reservations/", "pencil-square-o", "Reservations");
});

$(document).on('knack-view-render.view_2661', function(event, page) {
    // create large button on the home page
    bigButton('availability', 'view_2661', "https://atd.knack.com/street-banners#availability-search/", "calendar", "Availability Search");
});

  // $(document).on('knack-view-render.view_2662', function(event, page) {
  // create large button on the home page
  //  bigButton('work-orders', 'view_2662', "https://atd.knack.com/street-banners#work-orders/", "folder-open", "Work Orders");
// });

  // $(document).on('knack-view-render.view_2750', function(event, page) {
  // create large button on the home page
  // bigButton('schedule', 'view_2750', "https://atd.knack.com/street-banners#schedule/", "clipboard", "Schedule");
// });

  // $(document).on('knack-view-render.view_3009', function(event, page) {
  // create large button on the home page
  //  bigButton('calendar', 'view_3009', "https://atd.knack.com/street-banners#calendar/", "calendar", "Calendar");
// });

$(document).on('knack-view-render.view_3006', function(event, page) {
  // create large button on the home page
    bigButton('reports', 'view_3006', "https://atd.knack.com/street-banners#reports/", "bar-chart", "Reports");
});

$(document).on('knack-view-render.view_2663', function(event, page) {
  // create large button on the home page
    bigButton('resources', 'view_2663', "https://atd.knack.com/street-banners#resources/", "link", "Resources");
});  
  //LAMPPOST TAB BUTTONS
$(document).on('knack-view-render.view_2814', function(event, page) {
  // create large button on the home page
    bigButton('lpb-application-dashboard', 'view_2814', "https://atd.knack.com/street-banners#lpb-application-dashboard/", "pencil-square-o", "Lamppost | Reservations");
});
  
$(document).on('knack-view-render.view_2815', function(event, page) {
  // create large button on the home page
    bigButton('lpb-availability', 'view_2815', "https://atd.knack.com/street-banners#lpb-availability/", "calendar", "Lamppost | Availability");
});

$(document).on('knack-view-render.view_2816', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-lpb', 'view_2816', "https://atd.knack.com/street-banners#work-orders-lpb/", "folder-open", "Lamppost | Work Orders");
});

$(document).on('knack-view-render.view_2817', function(event, page) {
  // create large button on the home page
    bigButton('lpb-schedule', 'view_2817', "https://atd.knack.com/street-banners#lamppost-schedule/", "clipboard", "Lamppost | Schedule");
});
  //>>>OVER-THE-STREET TAB BUTTONS
$(document).on('knack-view-render.view_2818', function(event, page) {
  // create large button on the home page
    bigButton('ots-application-dashboard', 'view_2818', "https://atd.knack.com/street-banners#ots-application-dashboard/", "pencil-square-o", "Over-the-Street | Reservations");
});

$(document).on('knack-view-render.view_2819', function(event, page) {
  // create large button on the home page
    bigButton('ots-availability', 'view_2819', "https://atd.knack.com/street-banners#ots-availability/", "calendar", "Over-the-Street | Availability");
});
$(document).on('knack-view-render.view_2820', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-ots', 'view_2820', "https://atd.knack.com/street-banners#work-orders-ots/", "folder-open", "Over-the-Street | Work Orders");
});

$(document).on('knack-view-render.view_2821', function(event, page) {
  // create large button on the home page
    bigButton('ots-schedule', 'view_2821', "https://atd.knack.com/street-banners#over-the-street-schedule/", "clipboard", "Over-the-Street | Schedule");
});

$(document).on('knack-view-render.view_2907', function(event, page) {
  // create large button on the home page
    bigButton('ots-schedule', 'view_2907', "https://atd.knack.com/street-banners#over-the-street-schedule/", "flag-checkered", "Over-the-Street | Schedule");
});
  //>>>TECHNICIAN TAB BUTTONS
$(document).on('knack-view-render.view_3046', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-tech', 'view_3046', "https://atd.knack.com/street-banners#work-orders//", "folder-open", "Work Orders");
});

$(document).on('knack-view-render.view_3047', function(event, page) {
  // create large button on the home page
    bigButton('schedule', 'view_3047', "https://atd.knack.com/street-banners#schedule/", "clipboard", "Schedule");
});

$(document).on('knack-view-render.view_3668', function(event, page) {
  // create large button on the home page
    bigButton('signs_markings_tracker', 'view_3668', "https://atd.knack.com/street-banners#schedule/", "clipboard", "Schedule");
});

$(document).on('knack-view-render.view_3048', function(event, page) {
  // create large button on the home page
    bigButton('calendar', 'view_3048', "https://atd.knack.com/street-banners#calendar/", "calendar", "Calendar");
});

$(document).on('knack-view-render.view_3668', function(event, page) {
  // create large button on the home page
    bigButton('signs_markings_tracker', 'view_3668', "https://atd.knack.com/signs-markings#home/", "flag", "Signs & Markings Tracker");
});

  //>>>ADMIN TAB BUTTONS
$(document).on('knack-view-render.view_3012', function(event, page) {
  // create large button on the home page
    bigButton('specifications', 'view_3012', "https://atd.knack.com/street-banners#specifications//", "th-list", "Specifications");
});

$(document).on('knack-view-render.view_3013', function(event, page) {
  // create large button on the home page
    bigButton('materials', 'view_3013', "https://atd.knack.com/street-banners#materials/", "shopping-cart", "Materials");
});

$(document).on('knack-view-render.view_3032', function(event, page) {
  // create large button on the home page
    bigButton('account-management', 'view_3032', "https://atd.knack.com/street-banners#account-management/", "users", "Account Management");
});

//Help link button for the Admin tab
$(document).on('knack-view-render.view_3689', function(event, page) {
  // create large button on the home page
    bigButton('help', 'view_3689', "https://atd.knack.com/street-banners#help/", "info-circle", "Admin Help Guide");
});

  //***MENU - RESERVATION PAGE***
$(document).on('knack-view-render.view_2794', function(event, page) {
  // create large button on the home page
    bigButton('lpb-rsvp', 'view_2794', "https://atd.knack.com/street-banners#lpb-application-dashboard/", "flag-o", "Lamppost | Reservations");
});

$(document).on('knack-view-render.view_2795', function(event, page) {
  // create large button on the home page
    bigButton('ots-rsvp', 'view_2795', "https://atd.knack.com/street-banners#ots-application-dashboard/", "flag-checkered", "Over-the-Street | Reservations");
});
  //***MENU - AVAILABILITY PAGE***
$(document).on('knack-view-render.view_2803', function(event, page) {
  // create large button on the home page
    bigButton('lpb-avail', 'view_2803', "https://atd.knack.com/street-banners#lpb-availability/", "flag", "Lamppost | Availability");
});

$(document).on('knack-view-render.view_2804', function(event, page) {
   // create large button on the home page
    bigButton('ots-avail', 'view_2804', "https://atd.knack.com/street-banners#ots-availability/", "flag-checkered", "Over-the-Street | Availability");
}); 
  //***MENU - WORK ORDER PAGE***
$(document).on('knack-view-render.view_2904', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-lpb', 'view_2904', "https://atd.knack.com/street-banners#work-orders-lpb/", "flag", "Lamppost | Work Orders");
});

$(document).on('knack-view-render.view_2905', function(event, page) {
  // create large button on the home page
    bigButton('work-orders-ots', 'view_2905', "https://atd.knack.com/street-banners#work-orders-ots", "flag-checkered", "Over-the-Street | Work Orders");
});

$(document).on('knack-view-render.view_2960', function(event, page) {
  // create large button on the home page
    bigButton('maint-work-orders', 'view_2960', "https://atd.knack.com/street-banners#maintenance-work-orders/", "briefcase", "Maintenance | Work Orders");
});

$(document).on('knack-view-render.view_3097', function(event, page) {
  // create large button on the home page
    bigButton('signs-work-orders', 'view_3097', "https://atd.knack.com/signs-markings#my-work-orders/", "wrench", "Signs | Work Orders");
});
  //***MENU - SCHEDULE PAGE***
$(document).on('knack-view-render.view_2906', function(event, page) {
  // create large button on the home page
    bigButton('ots-work-orders', 'view_2906', "https://atd.knack.com/street-banners#lamppost-schedule/", "flag", "Lamppost | Schedule");
});


  //***MENU - RESOURCES PAGE***
$(document).on('knack-view-render.view_2713', function(event, page) {
  // create large button on the resources page
    bigButton('street-banners-external-site', 'view_2713', "http://austintexas.gov/page/street-banners", "external-link-square", "Street Banners (External Site)", true);
});

$(document).on('knack-view-render.view_2796', function(event, page) {
  // create large button on the resources page
    bigButton('AMANDA-Users-SP', 'view_2796', "https://atd.knack.com/dts#new-service-request/", "database", "AMANDA Support", true);
});

  //***CUSTOMER PORTAL PAGE***
$(document).on('knack-view-render.view_3611', function(event, page) {
  // create large button on the resources page
    bigButton("eligibility", "view_3611", "https://atd.knack.com/street-banners#eligibility/", "map-marker", "Eligibility");
});
$(document).on('knack-view-render.view_3610', function(event, page) {
  // create large button on the resources page
    bigButton('get-started', 'view_3610', "https://atd.knack.com/street-banners#get-started/", "list", "Get Started");
});
$(document).on('knack-view-render.view_3613', function(event, page) {
  // create large button on the resources page
    bigButton( "learn-more", "view_3613", "https://www.austintexas.gov/page/street-banners", "book", "About the Program", true);
});
$(document).on('knack-view-render.view_3612', function(event, page) {
  // create large button on the resources page
   bigButton("faq", "view_3612", "https://atd.knack.com/street-banners#faq/", "info-circle", "Help");
});

  //***GET STARTED PAGE***
$(document).on('knack-view-render.view_3614', function(event, page) {
  // create large button on go back to Portal page
    bigButton('portal', 'view_3614', "https://atd.knack.com/street-banners#portal", "home", "Home");
});
$(document).on('knack-view-render.view_3615', function(event, page) {
  // create large button on go back to Portal page
    bigButton('applications', 'view_3615', "https://atd.knack.com/street-banners#applications", "arrow-right", "Start Application");
});
  //***APPLICATIONS CHOICE PAGE***
$(document).on('knack-view-render.view_3153', function(event, page) {
  // create large button on go back to Portal page
    bigButton('lpb-application', 'view_3153', "https://atd.knack.com/street-banners#lpb-application/", " ", "Lamppost Banner Application");
});
$(document).on('knack-view-render.view_3154', function(event, page) {
  // create large button on go back to Portal page
    bigButton('ots-application', 'view_3154', "https://atd.knack.com/street-banners#ots-application"," " , "Over-the-Street Banner Application");
});

  //***MANAGE WALLET BUTTONS***
$(document).on('knack-view-render.view_3673', function(event, page) {
  // create large button on go back to Portal page
    bigButton('manage-wallet', 'view_3673', "https://austin-tx-austin-tx.uat.cityba.se/login", "credit-card", "Manage Wallet");
});
$(document).on('knack-view-render.view_3675', function(event, page) {
  // create large button on go back to Portal page
    bigButton('manage-wallet', 'view_3675', "https://austin-tx-austin-tx.uat.cityba.se/login","credit-card" , "Manage Wallet");
});
$(document).on('knack-view-render.view_3678', function(event, page) {
  // create large button on go back to Portal page
    bigButton('manage-wallet', 'view_3678', "https://austin-tx-austin-tx.uat.cityba.se/login","credit-card" , "Manage Wallet");
});

  //***RESERVATION CALENDAR BUTTONS***
$(document).on('knack-view-render.view_3728', function(event, page) {
  // create large button on the home page
    bigButton('lpb-rsvp', 'view_3728', "https://atd.knack.com/street-banners#lpb-reservation-calendar", "flag-o", "Lamppost | RSVP Calendar");
});

$(document).on('knack-view-render.view_3729', function(event, page) {
  // create large button on the home page
    bigButton('ots-rsvp', 'view_3729', "https://atd.knack.com/street-banners#ots-reservation-calendar", "flag-checkered", "Over-the-Street | RSVP Calendar");
});

/*******************************************/
/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1211", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1212", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1219", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1226", function () {
  disableBreadCrumbsNonAdmin();
});
//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1233", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1234", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1243", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_1255", function () {
  disableBreadCrumbsNonAdmin();
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
