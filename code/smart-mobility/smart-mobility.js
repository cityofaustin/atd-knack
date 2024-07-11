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
    bigButton('metrobike-employee-benefit', 'view_16', "https://atd.knack.com/smart-mobility#metrobike-employee-benefit/", "bicycle", "MetroBike Employee Benefit");
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
    bigButton('living-streets-getting-started', 'view_450', "https://atd.knack.com/smart-mobility#living-streets-eoi/", "arrow-right", "Start Expression of Interest");
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


/******* Add invoice to multiple impoundments *******/

var headers = {
  "X-Knack-Application-ID": "6669fb3cd43ca60027942eef",
  Authorization: Knack.getUserToken(),
  "content-type": "application/json",
};


// Create invoice items from items after selection and submission
function handleAddImpoundmentsClick(id, viewKey) {

  // Get current invoice knack ID
  var hrefArray = window.location.href.split("/");
  var invoiceId = hrefArray[hrefArray.length - 2];

  // Show spinner
  $("#" + id).append(
    '<span id="' +
      id +
      '-spinner" class="icon is-2x">&nbsp;<i class="fa fa-spinner fa-spin"></i></span>'
  );

  // Cycle through selected checkboxes, get their id and create payload

  var selectedImpoundments = [];

  $("#" + view + " tbody input[type=checkbox]:checked").each(function () {
    // Get id of row
    var id = $(this).closest("tr").attr("id");

    selectedImpoundments.push({
      id: id,
      payload: {
        "field_467": [{
          "id": invoiceId,
        }]
      }
    });
  });


  // For each selected impoundment, make call to set invoice
  selectedImpoundments.forEach(function (item) {
    $.ajax({
      type: "PUT",
      url:
        "https://api.knack.com/v1/scenes/scene_231/views/" +
        viewKey + "/records/" + item.id,
      headers: headers,
      data: JSON.stringify(item.payload),
      contentType: "application/json",
      })
        .then(function (res) {
          // Remove spinner after invoice item record is created
          $("#" + id + "-spinner").remove();
          // Clear all checkboxes
          $(".table-checkboxes").each(function (event) {
            $(this).prop("checked", false);
          });
        })
        .fail(function () {
          $("#" + id + "-spinner").remove();
          console.error("Failed to add invoice to impoundments")
        });
    });

  // refetch view
  Knack.views[viewKey].model.fetch();
}

function addCheckboxes(view) {
  // Add the checkbox to to the header to select/unselect all
  $("#" + view.key + ".kn-table thead tr").prepend(
    '<th class="table-checkboxes-parent"><input class="table-checkboxes" type="checkbox"></th>'
  );

  $("#" + view.key + ".kn-table thead input").change(function () {
    $("." + view.key + ".kn-table tbody tr input").each(function () {
      $(this).attr(
        "checked",
        $("#" + view.key + ".kn-table thead input").attr("checked") !==
          undefined
      );
    });
  });

  // Add a checkbox to each row in the table body
  $("#" + view.key + ".kn-table tbody tr").each(function () {
    $(this).prepend(
      '<td class="table-checkboxes-parent"><input class="table-checkboxes" type="checkbox"></td>'
    );
  });
}

function appendSubmitButton(buttonString, selector, handler, viewKey) {
  var id = buttonString.toLowerCase().split(" ").join("-");
  $(selector).append(
    '<a id="' +
      id +
      '" class="kn-button"><span class="icon is-small"><i class="fa fa-check"></i></span><span>' +
      buttonString +
      "</span></a>"
  );

  $("#" + id).click(function () {
    handler(event, id, viewKey);
  });
}


// the view with the Provider Impoundments table
$(document).on("knack-view-render.view_1044", function(event, view, data) {
  addCheckboxes(view);

  appendSubmitButton(
    "Add selected to invoice",
    "#" + view.key + " > .kn-table-wrapper",
    handleAddImpoundmentsClick,
    view.key,
  );
});
