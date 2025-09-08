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
/**
 * Template and append a button link, disable it optionally, and invoke a callback function argument
 * @parameter {string} id - id attribute of the a tag in the button link
 * @parameter {string} view_id - Knack view id to append button link to
 * @parameter {string} url - Destination to navigate to on click
 * @parameter {string} fa_icon - Icon string (https://support.knack.com/hc/en-us/articles/226165208-Working-with-Icons#2-complete-list-of-icons)
 * @parameter {bool} isDisabled - Is button disabled (defaults to false)
 * @parameter {function} callback - Function that is invoked after appending the button link
 **/
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  isDisabled = false,
  callback = null
) {
  var disabledClass = isDisabled ? " big-button-disabled'" : "'";

  $(
    "<a id='" +
      id +
      "' class='big-button-container" +
      disabledClass +
      " href='" +
      url +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);

  if (callback) callback();
}
  //>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_16', function(event, page) {
  // create large button on the home page
    bigButton('metrobike-employee-benefit', 'view_16', "https://atd.knack.com/bike-benefit-program#metrobike-employee-benefit/", "bicycle", "MetroBike Employee Benefit");
});


  //>>>LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_410', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-eoi', 'view_410', "https://atd.knack.com/smart-mobility#living-streets-eoi/", "street-view", "Healthy Streets or Play Streets");
});
  //>>>LIVING STREETS PROGRAM SELECTIONS BUTTONS draft
$(document).on('knack-view-render.view_411', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-login', 'view_411', "https://www.austintexas.gov/department/neighborhood-block-parties", "users", "Block Party");
});

  //>>>LIVING STREETS GETTING STARTED PAGE draft 1
$(document).on('knack-view-render.view_451', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-login', 'view_451', "https://www.austintexas.gov/LivingStreets", "home", "Return to Living Streets Home");
});
  //>>>LIVING STREETS GETTING STARTED PAGE draft 2
$(document).on('knack-view-render.view_450', function(event, page) {
  // create large button on the home page
    bigButton('living-streets-getting-started', 'view_450', "https://atd.knack.com/smart-mobility#living-streets-eoi-new/", "arrow-right", "Start Expression of Interest");
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

//LS Timeframe
$(document).on("knack-scene-render.scene_188", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Finalize and Submit
$(document).on("knack-scene-render.scene_206", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Confirmation
$(document).on("knack-scene-render.scene_208", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Finalize and Submit
$(document).on("knack-scene-render.scene_209", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Confirmation
$(document).on("knack-scene-render.scene_211", function () {
  disableBreadCrumbsNonAdmin();
});

//LS Timeframe NEW
$(document).on("knack-scene-render.scene_276", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Finalize and Submit NEW
$(document).on("knack-scene-render.scene_277", function () {
  disableBreadCrumbsNonAdmin();
});

//HS EOI Confirmation NEW
$(document).on("knack-scene-render.scene_280", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Finalize and Submit NEW
$(document).on("knack-scene-render.scene_281", function () {
  disableBreadCrumbsNonAdmin();
});

//PS EOI Confirmation NEW
$(document).on("knack-scene-render.scene_284", function () {
  disableBreadCrumbsNonAdmin();
});

  //***MANAGE WALLET AND MAKE PAYMENT BUTTONS***
$(document).on('knack-view-render.view_804', function(event, page) {
  // create large button on go back to Portal page
  bigButton('manage-wallet', 'view_804', "https://austin-tx-austin-tx.uat.cityba.se/welcome", "credit-card", "Manage Wallet");
  // bigButton('manage-wallet', 'view_804', "https://atd.knack.com/smart-mobility#living-streets-applicant-portal/", "credit-card", "Manage Wallet");
});
$(document).on('knack-view-render.view_806', function(event, page) {
  // create large button on go back to Portal page
  // *** see the getCitybaseButton function for the invocation of the make payment bigButton function
  //   bigButton('make-payment', 'view_806', "https://atd.knack.com/smart-mobility#living-streets-applicant-portal/", "arrow-right", "Make Payment");
});

/** 
 * Citybase Integration
 */

function getCitybaseButton(payload, viewId) {
  fetch(
    "https://invoice-service-austin-tx.uat.cityba.se/invoices/austin_tx_transportation/street_banner",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  )
    .then((response) => {
      console.log(response.url);
      bigButton(
        "make-payment",
        viewId,
        response.url,
        "arrow-right",
        "Make Payment",
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

var knackUserToken = Knack.getUserToken();

var headers = {
  "X-Knack-Application-Id": "618ad3322d11b4002169a6f9",
  "X-Knack-REST-API-KEY": "knack",
  Authorization: knackUserToken,
  "content-type": "application/json",
};

// After the transactions table loads
$(document).on("knack-view-render.view_817", function (event, page, view) {
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

  // make sure record exists
  if (transactionRecord) {
    payload["line_items"] = [
      {
        description: transactionRecord["field_819"],
        amount: transactionRecord["field_833_raw"] * 100,
        sub_description: transactionRecord["field_849"],
        custom_attributes: [
          {
            key: "knack_record_id",
            value: transactionRecord["id"],
          },
          {
            key: "invoice_number",
            value: transactionRecord["field_814"],
          },
          {
            key: "fund",
            value: String(transactionRecord["field_829"]),
          },
          {
            key: "dept",
            value: String(transactionRecord["field_830"]),
          },
          {
            key: "unit",
            value: String(transactionRecord["field_831"]),
          },
          {
            key: "revenue",
            value: String(transactionRecord["field_832"]),
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
        value: transactionRecord["field_814"],
      },
      {
        "key": "parent_record_id",
        "value": String(transactionRecord["field_815_raw"][0]["id"]),
      },
      {
        key: "knack_app",
        value: "SMART_MOBILITY",
      },
    ];
    console.log(JSON.stringify(payload));
    getCitybaseButton(payload, "view_806");
  }
});
