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

/********************************************/
/*************** Big Buttons ****************/
/********************************************/
//Create Big Button nested in a block
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  is_disabled = false,
  callback = null
) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
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

$(document).on("knack-view-render.view_167", function (event, page) {
  // create large button on the home page
  bigButton(
    "all",
    "view_167",
    "https://atd.knack.com/finance-purchasing#purchase-requests/",
    "archive",
    "All Purchase Requests"
  );

  bigButton(
    "create",
    "view_167",
    "https://atd.knack.com/finance-purchasing#new-purchase-requests/",
    "plus-circle",
    "New Purchase Request"
  );

  bigButton(
    "review",
    "view_167",
    "https://atd.knack.com/finance-purchasing#reviews/",
    "check-square-o",
    "Review Purchase Requests"
  );

  bigButton(
    "my",
    "view_167",
    "https://atd.knack.com/finance-purchasing#my-purchase-requests/",
    "male",
    "My Purchase Requests"
  );
});

/********************************************/
/************** Small Buttons ***************/
/********************************************/
//Create Small Button nested in a block
function smallButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  is_disabled = false,
  callback = null
) {
  var disabledClass = is_disabled ? " small-button-disabled'" : "'";
  $(
    "<a id='" +
      id +
      "' class='back-button" +
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

function changeFieldColor(fieldClass, color_map) {
  var child_field = $(fieldClass).find(".kn-detail-body");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color,
    });
  }
}

function insertIcon(fieldClass, icon_map) {
  var child_field = $(fieldClass).find(".kn-detail-body");
  var value = child_field.text();
  var elem = $(".kn-detail" + fieldClass)
    .find(".kn-detail-body")
    .find("span")[0];

  $(elem).before(
    "<span> <i class='fa fa-" + icon_map[value].icon + "'></i> </span>"
  );
}

var colorMapOne = {
  "Not Submitted": { background_color: "#ff9b9c", color: "#fff", icon: null },
  Returned: { background_color: "#ff9b9c", color: "#fff", icon: null },
  Rejected: { background_color: "#6a6565", color: "#fff", icon: null },
  Cancelled: { background_color: "#6a6565", color: "#fff", icon: null },
  "Waiting for Approval": {
    background_color: "#377eb8",
    color: "#fff",
    icon: null,
  },
  "Purchase Review": {
    background_color: "#41ae76",
    color: "#fff",
    icon: "clipboard",
  },
  "Budget Review": {
    background_color: "#41ae76",
    color: "#fff",
    icon: "money",
  },
  "Processing | Purchasing": {
    background_color: "#41ae76",
    color: "#fff",
    icon: "cogs",
  },
  "Pending Invoice": {
    background_color: "#f5901f",
    color: "#fff",
    icon: "clock-o",
  },
  "Processing | Accounts Payable": {
    background_color: "#41ae76",
    color: "#fff",
    icon: "credit-card",
  },
  Closed: { background_color: "#ffffff", color: "#000", icon: "check-circle" },
  Unpaid: { background_color: "#ff9b9c", color: "#fff", icon: null },
  Paid: { background_color: "#41ae76", color: "#fff", icon: null },
  "Submitted to Accounts Payable": {
    background_color: "#f5901f",
    color: "#fff",
    icon: null,
  },
  Submitted: {
    background_color: "#377eb8",
    color: "#fff",
    icon: null,
  },
  "In progress": {
    background_color: "#41ae76",
    color: "#fff",
    icon: "cogs",
  },
  Complete: {
    background_color: "#ffffff",
    color: "#000",
    icon: "check-circle",
  },
};

$(document).on("knack-scene-render.scene_4", function () {
  //  work orders signs/markings status
  changeFieldColor(".field_17", colorMapOne);
  insertIcon(".field_17", colorMapOne);
});

$(document).on("knack-page-render.scene_68", function (event, page) {
  // render Review Details page
  //  Remove unwanted select options from approval authority list
  $("option[value='8 | Budget Review']").remove();
  $("option[value='7 | Purchase Review']").remove();
});

function hideDetailsLink(dest_id, src_field) {
  var detailsUrl = $(".kn-link-page").attr("href");
  $("#" + dest_id)
    .find("a")
    .attr("href", detailsUrl);
  $(".kn-details-link." + src_field).remove();
}

function setClickEvent(divId, func, param1, param2) {
  // TODO make these args less weird
  $("#" + divId).click(function () {
    func(param1, param2);
  });
}

function showHideElements(showSelector, hideSelector) {
  $(showSelector).show();
  $(hideSelector).hide();
}

// replace "Add New Option" with custom text
$(document).on("knack-page-render.any", function (event, view) {
  var addNew = $("#kn-input-field_217")
    .find(".kn-add-option")
    .html("<i class='fa fa-plus-circle'></i> Add New Vendor | ")
    .removeClass("kn-add-option")
    .detach();

  $("#kn-input-field_217").find(".kn-instructions").find("a").before(addNew);
});

// --- Begin Item Copying ---
$(document).on("knack-view-render.view_315", function (event, view) {
  // automatically submit 'copy' form when modal renders
  $("button[type=submit]").submit();
});

$(document).on("knack-form-submit.view_315", function (event, view, record) {
  // Insert a copy of an item to the same purchase request

  var formUrl =
    "https://api.knack.com/v1/pages/scene_123/views/view_316/records/";

  // url where to redirect to on record insert success
  var redirectUrl =
    "https://atd.knack.com/finance-purchasing#purchase-requests/purchase-request-details/";

  // grab ID of purchase request and append it to redirect URL
  console.log(record.field_20_raw);

  redirectUrl = redirectUrl + record.field_20_raw[0].id;

  console.log(redirectUrl);
  fields = [
    "field_36", // unit of measure
    "field_37", // part #
    "field_15", // description
    "field_16", // unit cost
    "field_20_raw", // purchase request
    "field_189_raw", // department
    "field_105_raw", // fund
    "field_103_raw", // unit
    "field_104_raw", // object
    "field_357_raw",
  ];

  // reduce object to specified fields
  const filtered = Object.keys(record)
    .filter((key) => fields.includes(key))
    .reduce((obj, key) => {
      var new_key = key.replace("_raw", "");
      obj[new_key] = record[key];
      return obj;
    }, {});

  insertRecord(filtered, formUrl, redirectUrl);
});

function insertRecord(record, url, redirectUrl) {
  Knack.showSpinner();

  var user = Knack.getUserToken();

  var headers = {
    "X-Knack-Application-ID": "5b422c9b13774837e54ed814",
    Authorization: user,
    "content-type": "application/json",
  };

  // insert the record
  $.ajax({
    url: url,
    type: "POST",
    headers: headers,
    data: JSON.stringify(record),
    success: function (response) {
      Knack.hideSpinner();
      window.location = redirectUrl;
    },
  });
}
// --- End Item Copying ---

//  redirect to invoice details when invoice created
//  (mysteriously unable to accomplish this with form submit rule)
$(document).on("knack-form-submit.view_285", function (event, view, record) {
  var _id = record.id; // newly created invoice id
  var id_pr = record.field_316_raw[0].id; // id of the connected purchase request

  // manually create url of invoice details
  var url =
    "https://atd.knack.com/finance-purchasing#purchase-requests/purchase-request-details/" +
    id_pr +
    "/view-invoice-details/" +
    _id;
  window.location = url;
});

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 * https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie-with-jquery
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}

$(document).on("knack-scene-render.scene_1", function () {
  if (detectIE()) {
    alert(
      "You are using Microsoft Internet Explorer or Edge to view this page. We recommend using Firefox or Chrome. Contact your system administrator for assistance."
    );
  }
});

//////// Inventory Checkboxes (scene_4) /////////

// Set scenes and views
var scene = "scene_4";

// Items table
var itemsView = "view_60";
var itemsEditableView = "view_16";

// Invoice Items table
var invoiceItemsAdminView = "view_681";
var invoiceItemsNonAdminView = "view_717";

// Invoices table
var invoicesView = "view_282";

// Invoice Items API view form scene and view
var invoicesAPIViewConfig = { scene: "scene_123", view: "view_698" };

// Invoice Items API view form scene and view
var itemsAPIViewConfig = { scene: "scene_336", view: "view_804" };

// Set auth and headers for API calls
var knackUserToken = Knack.getUserToken();
var headers = {
  "X-Knack-Application-Id": "5b422c9b13774837e54ed814",
  "X-Knack-REST-API-KEY": "knack",
  Authorization: knackUserToken,
  "content-type": "application/json",
};

// Helper to select elements not immediately loaded in views
// Wait until element is loaded by Knack
function elementLoaded(el, callback) {
  if ($(el).length) {
    // Element is now loaded.
    callback($(el));
  } else {
    // Repeat every 500ms.
    setTimeout(function () {
      elementLoaded(el, callback);
    }, 500);
  }
}

// Add left column of checkboxes and event handlers to Knack table
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

  // Fix offset in totals row created by checkboxes
  elementLoaded("#" + view.key + " .kn-table-totals", function (el) {
    el.prepend(
      '<td style="background-color: #eee; border-top: 1px solid #dadada;">&nbsp;</td>'
    );
  });
}

// Append a submit button and add event handler to element by selector
function appendSubmitButton(buttonString, selector, handler, view) {
  var id = buttonString.toLowerCase().split(" ").join("-");
  $(selector).append(
    '<a id="' +
      id +
      '" class="kn-button"><span class="icon is-small"><i class="fa fa-check"></i></span><span>' +
      buttonString +
      "</span></a>"
  );

  $("#" + id).click(function () {
    handler(event, id, view);
  });
}

function appendErrorMessage(id, selector, msg) {
  $(selector).append(
    '<div id="' +
      id +
      '-fail" class="kn-message is-error"><span class="kn-message-body"><p><strong>' +
      msg +
      "</strong></p></span></div>"
  );
  setTimeout(function () {
    $("#" + id + "-fail").remove();
  }, 6000);
}

function appendSuccessMessage(id, selector, msg) {
  $(selector).append(
    '<div id="' +
      id +
      '-success" class="kn-message success-msg"><span class="kn-message-body"><p><strong>' +
      msg +
      "</strong></p></span></div>"
  );
  setTimeout(function () {
    $("#" + id + "-success").remove();
  }, 6000);
}

///// Create Invoice Items from Items /////

// Create invoice items from items after selection and submission
function handleMarkAsReceivedClick(event, id, view) {
  event.preventDefault();

  // Set current record ID to fetch invoices from Knack API
  var hrefArray = window.location.href.split("/");
  var recordId = hrefArray[hrefArray.length - 2];

  // Check DOM for spinner to prevent multiple requests at one time
  if ($("#" + id + "-spinner").length) {
    return;
  }

  // Show spinner
  $("#" + id).append(
    '<span id="' +
      id +
      '-spinner" class="icon is-2x">&nbsp;<i class="fa fa-spinner fa-spin"></i></span>'
  );

  // Cycle through selected checkboxes
  function getCheckedItems(view) {
    var checkedItemIds = [];
    $("#" + view + " tbody input[type=checkbox]:checked").each(function () {
      // Get id
      var id = $(this).closest("tr").attr("id");
      // Get inventory item value (Yes or No)
      // Inventory? field is in different column in view_16 (column index 3) and view_60 (column index 2)
      // Let's define which column to get value from based on view
      var tableColumnIndex;
      if (view === "view_16") {
        tableColumnIndex = 3;
      } else if (view === "view_60") {
        tableColumnIndex = 2;
      }

      var isInventoryItem = $(this).closest("tr").children()[
        tableColumnIndex
      ].innerText;
      checkedItemIds.push({ id: id, isInventoryItem: isInventoryItem });
    });
    return checkedItemIds;
  }

  // Get checked item IDs and whether items are inventory items (editable or non-editable view)
  var itemsToCreateInvoiceItems = [];
  var viewForInventoryItemQuery = "";
  var checkedEditableItems = getCheckedItems(itemsEditableView);
  var checkedItems = getCheckedItems(itemsView);
  var invoiceItemsView = "";

  // Determine if admin or not and assign view to query, assign invoice items table view
  if (checkedEditableItems.length === 0 && checkedItems.length === 0) {
    // Remove spinner if no checkboxes selected
    $("#" + id + "-spinner").remove();
  } else if (checkedEditableItems.length !== 0) {
    itemsToCreateInvoiceItems = checkedEditableItems;
    viewForInventoryItemQuery = itemsEditableView;
    invoiceItemsView = invoiceItemsAdminView;
  } else if (checkedItems.length !== 0) {
    itemsToCreateInvoiceItems = checkedItems;
    viewForInventoryItemQuery = itemsView;
    invoiceItemsView = invoiceItemsNonAdminView;
  }

  // Retrieve Knack data about item records in Items table
  var invoiceItems = [];
  $.ajax({
    url:
      "https://api.knack.com/v1/scenes/" +
      scene +
      "/views/" +
      viewForInventoryItemQuery +
      "/records?purchase-request-details_id=" +
      recordId,
    headers: headers,
  }).then(function (res) {
    var records = res.records;

    // Create invoice item record if inventory item is checked
    records.forEach(function (record) {
      itemsToCreateInvoiceItems.forEach(function (item) {
        // If it is an inventory item and is checked
        // if (record.id === item.id && item.isInventoryItem === "Yes") {
        // Commented out in case reverting back to only marking items designated as inventory items as received
        if (record.id === item.id) {
          // Prepare payload to create Invoice Item record
          var invoiceItem = {};

          invoiceItem["field_409"] = [
            { id: record.id, identifier: record.field_15 },
          ]; // Item id and description => Invoice item description
          invoiceItem["field_773"] = record.field_20_raw; // Purchase request => purchase request
          invoiceItem["field_422"] = record.field_38_raw; // Total Cost => Amount Due
          invoiceItem["field_733"] = "Yes"; // Mark Received as "Yes"

          invoiceItems.push(invoiceItem);
        } else {
          return;
        }
      });
    });

    // POST new Invoice Item records to Knack
    invoiceItems.forEach(function (item) {
      $.ajax({
        type: "POST",
        url:
          "https://api.knack.com/v1/scenes/" +
          invoicesAPIViewConfig.scene +
          "/views/" +
          invoicesAPIViewConfig.view +
          "/records",
        headers: headers,
        data: JSON.stringify(item),
        contentType: "application/json",
      })
        .then(function (res) {
          // Remove spinner after invoice item record is created
          $("#" + id + "-spinner").remove();

          // Display success message
          appendSuccessMessage(
            id,
            "#" + view.key,
            "Marked " + item.field_409[0].identifier + " as received."
          );

          // Refetch data for invoice items table to reflect new invoice item records

          Knack.views[invoiceItemsView].model.fetch();

          // Clear all checkboxes
          $(".table-checkboxes").each(function (event) {
            $(this).prop("checked", false);
          });
        })
        .fail(function () {
          $("#" + id + "-spinner").remove();
          appendErrorMessage(
            id,
            "#" + view.key,
            "Failed to mark " +
              item.field_409[0].identifier +
              " as received. Please try again."
          );
        });
    });
  });
}

///// Associate Invoice Items with Invoice /////

// Prepend Knack table with Select dropdown and populate dropdown with invoice options
function addInvoicesDropdown(view) {
  // Set current record ID to fetch invoices from Knack API
  var hrefArray = window.location.href.split("/");
  var recordId = hrefArray[hrefArray.length - 2];

  // Append dropdown if it doesn't already exist
  if (!$("#kn-input-invoice-select").length) {
    // Fetch invoices for record and create options HTML for select dropdown
    var invoiceOptionsMarkup = "";
    $.ajax({
      url:
        "https://api.knack.com/v1/scenes/" +
        scene +
        "/views/" +
        invoicesView +
        "/records?purchase-request-details_id=" +
        recordId,
      headers: headers,
    }).then(function (res) {
      // For each record, create an option tag for select menu
      res.records.forEach(function (record) {
        invoiceOptionsMarkup +=
          '<option value="' + record.id + '">' + record.field_309 + "</option>";
      });

      // Add dropdown populated with invoice options
      $("#" + view.key + " div.view-header").append(
        '<div class="kn-input kn-input-select control" id="kn-input-invoice-select" data-input-id="invoice-select"><div class="kn-select"><div class="kn-select"><select data-placeholder="Select" id="invoice-select" name="invoice-select" style="vertical-align: bottom;" class="select"><option value="" selected="">Select...</option>' +
          invoiceOptionsMarkup +
          "</select></div></div></div>"
      );
    });
  }
}

// Associate invoice items with invoice after selection and submission
function handleCreateInvoiceClick(event, id, view) {
  event.preventDefault();

  // Check DOM for spinner to prevent multiple requests at one time
  if ($("#" + id + "-spinner").length) {
    return;
  }

  // Show spinner
  $("#" + id).append(
    '<span id="' +
      id +
      '-spinner" class="icon is-2x">&nbsp;<i class="fa fa-spinner fa-spin"></i></span>'
  );

  // Cycle through selected checkboxes
  function getCheckedItems() {
    var checkedItemIds = [];
    $("#" + view.key + " tbody input[type=checkbox]:checked").each(function () {
      // Get id
      var id = $(this).closest("tr").attr("id");
      var identifier = $(this).closest("tr").children()[2].innerText;
      checkedItemIds.push({ id: id, identifier: identifier });
    });
    return checkedItemIds;
  }

  // Get checked invoice item IDs and selected invoice ID
  var checkedItems = getCheckedItems();
  var selectedInvoiceId = $("#invoice-select").val();
  var selectedInvoiceText = $("#invoice-select").find("option:selected").text();

  // For each checkedItem, add invoice record ID and record identifier to associate with invoice
  checkedItems.forEach(function (item) {
    var updatedInvoiceItemData = {
      field_408: [{ id: selectedInvoiceId, identifier: selectedInvoiceText }],
    };

    $.ajax({
      type: "PUT",
      url:
        "https://api.knack.com/v1/scenes/" +
        itemsAPIViewConfig.scene +
        "/views/" +
        itemsAPIViewConfig.view +
        "/records/" +
        item.id,
      headers: headers,
      data: JSON.stringify(updatedInvoiceItemData),
      contentType: "application/json",
    })
      .then(function (res) {
        // Remove spinner after invoice item record is created
        $("#" + id + "-spinner").remove();

        // Refetch data for invoice items table to reflect new association
        Knack.views[view.key].model.fetch();

        // Clear all checkboxes
        $(".table-checkboxes").each(function (event) {
          $(this).prop("checked", false);
        });
      })
      .fail(function () {
        $("#" + id + "-spinner").remove();
        appendErrorMessage(
          id,
          "#" + view.key + " .kn-records-nav",
          "Failed to add " +
            item.identifier +
            " to invoice " +
            selectedInvoiceText +
            ". Please try again."
        );
      });
  });
}

///// View Render Events /////

// Check if user only has one role and it is "User" (object_10)
function isUserRoleOnlyUser() {
  var roles = Knack.getUserRoles();
  if (roles.length === 1 && roles[0] === "object_10") {
    return true;
  } else {
    return false;
  }
}

// Add checkboxes to a items and invoice items tables
if (!isUserRoleOnlyUser()) {
  $(document).on("knack-view-render." + itemsView, function (event, view) {
    addCheckboxes(view);
  });

  $(document).on(
    "knack-view-render." + itemsEditableView,
    function (event, view) {
      addCheckboxes(view);
    }
  );

  $(document).on(
    "knack-view-render." + invoiceItemsAdminView,
    function (event, view) {
      addCheckboxes(view);
    }
  );

  $(document).on(
    "knack-view-render." + invoiceItemsNonAdminView,
    function (event, view) {
      addCheckboxes(view);
    }
  );

  // Add "Mark as Received" button to create invoice item records from items table
  $(document).on("knack-view-render.view_117", function (event, view) {
    appendSubmitButton(
      "Mark as Received",
      "#" + view.key + " > div.control",
      handleMarkAsReceivedClick,
      view
    );
  });

  $(document).on(
    "knack-view-render." + invoiceItemsAdminView,
    function (event, view) {
      addInvoicesDropdown(view);
      // Wait until dropdown is added before appending submit button to it
      elementLoaded("#kn-input-invoice-select", function () {
        appendSubmitButton(
          "Add to Selected Invoice",
          "#kn-input-invoice-select",
          handleCreateInvoiceClick,
          view
        );
      });
    }
  );

  $(document).on(
    "knack-view-render." + invoiceItemsNonAdminView,
    function (event, view) {
      addInvoicesDropdown(view);
      // Wait until dropdown is added before appending submit button to it
      elementLoaded("#kn-input-invoice-select", function () {
        appendSubmitButton(
          "Add to Selected Invoice",
          "#kn-input-invoice-select",
          handleCreateInvoiceClick,
          view
        );
      });
    }
  );
}

/**** Remove extra whitespace from stock number input ****/
$(document).on("knack-view-render.view_794", function (event, page) {
  $("#field_720").on("change", function () {
    var val = $("#field_720").val();
    $("#field_720").val(val.trim());
  });
});

// change color of service request status
$(document).on("knack-scene-render.scene_340", function () {
  changeFieldColor(".field_930", colorMapOne);
});
