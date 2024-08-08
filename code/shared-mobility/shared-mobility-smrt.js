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

/********************************************/
/************** Small Buttons ***************/
/********************************************/
//Create Small Button nested in a block
function smallButton(id, view_id, url, fa_icon, button_label, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
    $( "<a id='" + id + "' class='back-button" + disabledClass + " href='" + url + 
      "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);

  if (callback) callback();
}
$(document).on("knack-scene-render.scene_257", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_534").hide();
  $("#csr_view").attr("src", iframe_url);
});

$(document).on("knack-scene-render.scene_260", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_547").hide();
  $("#csr_view").attr("src", iframe_url);
});

$(document).on("knack-scene-render.scene_264", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_558").hide();
  $("#csr_view").attr("src", iframe_url);
});

/*********** Provider SMRT Portal ***********/
// create large Get Started button on the Customer RPP Portal page
$(document).on("knack-view-render.view_626", function(event, page) {
  bigButton( "get-started", "view_626", "https://atd.knack.com/smrt#get-started/", "file-text", "Get Started");
});
// create large Am I Eligible button on the Customer RPP Portal page
$(document).on("knack-view-render.view_627", function(event, page) {
  bigButton("eligibility", "view_627", "https://atd.knack.com/smrt#eligibility/", "book", "Eligibility");
});
// create large Help button on the Customer RPP Portal page
$(document).on("knack-view-render.view_628", function(event, page) {
  bigButton("faq", "view_628", "https://atd.knack.com/smrt#faq/", "info-circle", "Help");
});
// create large About the Program button on the Customer RPP Portal page
$(document).on("knack-view-render.view_629", function(event, page) {
  bigButton("about-the-program", "view_629", "https://www.austintexas.gov/page/shared-mobility-regulations-and-license-application", "book", "About the Program");
});

/*********** Get Started page ***********/
// create large Home  button on the Customer SMRT Portal page
$(document).on("knack-view-render.view_875", function(event, page) {
  bigButton( "home", "view_875", "https://atd.knack.com/smrt#portal/", "home", "Home");
});
// create large Required Attachments button on the Customer SMRT Portal, Required Documents page
$(document).on("knack-view-render.view_878", function(event, page) {
  bigButton( "required-documents", "view_878", "https://atd.knack.com/smrt#required-documents/", "files-o", "Required Documents");
});
// create large Start Application button on the Customer SMRT Application page
$(document).on("knack-view-render.view_631", function(event, page) {
  bigButton( "start-application", "view_631", "https://atd.knack.com/smrt#application/", "arrow-right", "Start Application");
});

/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

//Page to disable crumbtrail App Info page
$(document).on("knack-scene-render.scene_336", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Parent Company page
$(document).on("knack-scene-render.scene_337", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Business Information page
$(document).on("knack-scene-render.scene_338", function () {
  disableBreadCrumbsNonAdmin();
});

//Page to disable crumbtrail Past Performance page
$(document).on("knack-scene-render.scene_339", function () {
  disableBreadCrumbsNonAdmin();
});
//Page to disable crumbtrail Fleet Information page
$(document).on("knack-scene-render.scene_340", function () {
  disableBreadCrumbsNonAdmin();
});


/******* Associate impoundments with invoice *******/

function getTodaysDate() {
  var today = new Date()
  return((today.getMonth() + 1) + "/" + today.getDate() + "/"+ today.getFullYear())
}

var headers = {
  "X-Knack-Application-ID": "6669fb3cd43ca60027942eef",
  Authorization: Knack.getUserToken(),
  "content-type": "application/json",
};


// Create invoice items from items after selection and submission
function handleAddImpoundmentsClick(id, viewKey) {

  var impoundmentDetailsView = "view_392";
  var impoundmentDetailsScene = "scene_210";

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

  $("#" + viewKey + " tbody input[type=checkbox]:checked").each(function () {
    // Get id of row
    var id = $(this).closest("tr").attr("id");

     $.ajax({
      type: "GET",
      url:
        "https://api.knack.com/v1/scenes/" + impoundmentDetailsScene + "/views/" +
        impoundmentDetailsView + "/records/" + id,
      headers: headers,
      contentType: "application/json",
      })
        .then(function (res) {
          newInvoiceItem = {
              "field_404": res["field_121_raw"], // provider
              "field_407": res["field_128_raw"], // impound fee: transaction amount
              "field_454": res["field_115"], // description: date of impound
              "field_403": getTodaysDate(), // Created Date
              "field_401": "Impoundment Fee",
              "field_408": [{ // Created By
                  "id": Knack.user.id,
                  "identifier": Knack.user.attributes.values.name.full
                }],
              "field_405": [{id:id}], // impoundment id
              "field_411": "UNPAID", // transaction status
              "crumbtrail": {"invoice-details_id": invoiceId}
            }
            return(newInvoiceItem)
          })
          .then(function(newInvoiceItem) {
            console.log("Creating invoice item:", newInvoiceItem)
            $.ajax({
              type: "POST",
              url: "https://api.knack.com/v1/pages/scene_231/views/view_459/records",
              headers: headers,
              data: JSON.stringify(newInvoiceItem),
              contentType: "application/json",
            })
            .then(function (res) {
              Knack.views["view_459"].model.fetch();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Failed to create new invoice item")
                console.error("Status:", textStatus);
                console.error("Error:", errorThrown);
                console.error("Response Text:", jqXHR.responseText);
                console.error("Status Code:", jqXHR.status);
            });
          })

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
          // refetch view
          Knack.views[viewKey].model.fetch();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          $("#" + id + "-spinner").remove();
          console.error("Failed to set impoundment invoice ID")
          console.error("Failed to create new invoice item")
          console.error("Status:", textStatus);
          console.error("Error:", errorThrown);
          console.error("Response Text:", jqXHR.responseText);
          console.error("Status Code:", jqXHR.status);
        });
    });
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

  function toggleCheckbox($checkbox) {
    $checkbox.is(":checked")
      ? $checkbox.prop("checked", false)
      : $checkbox.prop("checked", true);
  }

  // Add click event handler to checkbox parent to check/uncheck child box
  $("#" + view.key + " .table-checkboxes-parent").click(function (event) {
    // If table header, check/uncheck all checkboxes
    if ($(this).is("th")) {
      var $headerCheckbox = $($(this).children()[0]);
      toggleCheckbox($headerCheckbox);
      $(
        "#" + view.key + " td.table-checkboxes-parent input.table-checkboxes"
      ).each(function () {
        $headerCheckbox.is(":checked")
          ? $(this).prop("checked", true)
          : $(this).prop("checked", false);
      });
    } else {
      var $checkbox = $($(this).children()[0]);
      toggleCheckbox($checkbox);
    }
  });

  // Restore default checkbox toggle
  $("#" + view.key + " .table-checkboxes").click(function (event) {
    var $checkbox = $(this);
    toggleCheckbox($checkbox);
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
    handler(id, viewKey);
  });
}


// the view with the Provider Impoundments table
$(document).on("knack-view-render.view_1044", function(event, view, data) {
  addCheckboxes(view);

  appendSubmitButton(
    "Add to invoice items",
    "#" + view.key + " > .kn-table-wrapper",
    handleAddImpoundmentsClick,
    view.key,
  );
});

