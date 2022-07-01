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

$(document).on("knack-page-render.any", function (event, page) {
  // Hide the entire "Repeat" checkbox and label
  $("label:contains('Repeat')").hide();

  // Rename confusing google maps link
  $('a[title="view in google maps"]').text("View on Google Maps");
});

$(document).on("knack-view-render.view_958", function (event, page) {
  //  hide crumb trail at select locations
  setTimeout(function () {
    $(".kn-crumbtrail").remove();
    //do something special
  }, 1000);
});

$(document).on("knack-scene-render.scene_428", function (event, page) {
  // update iframe src from detail field
  var iframe_url = $('a[href*="webappviewer"]').attr("href");
  $(".view_1852").hide();
  $("#csr_view").attr("src", iframe_url);
});

$(document).on("knack-view-render.view_1407", function (event, page) {
  //  default city/state for VZA enforcement
  $("#city").val("Austin");
  $("#state").val("TX");
});

function changeFieldColor(field, color_map) {
  var child_field = $(field).find(".kn-value");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color,
    });
  }
}

var colorMapOne = {
  "NEED TO BE ISSUED": { background_color: "#e41a1c", color: "#fff" },
  "ON HOLD": { background_color: "#aeaeae", color: "#fff" },
  ISSUED: { background_color: "#377eb8", color: "#fff" },
  "NEEDS GIS": { background_color: "#984ea3", color: "#fff" },
  "FINAL REVIEW": { background_color: "#4daf4a", color: "#fff" },
};

$(document).on("knack-view-render.view_2107", function (event, page) {
  //  replace attachment filename with attachment type
  //  find each attachment cell
  $("td.field_2405").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_2403")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        $(this).html(attachmentType);
      });
  });
});

$(document).on("knack-view-render.view_2108", function (event, page) {
  //  replace attachment filename with attachment type
  //  find each attachment cell
  $("td.field_2405").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_2403")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });
        //  update link contents
        $(this).html(attachmentType);
      });
  });
});

//  replace 'Quantity' label with UOM of measure by parsing the select value contents
//  was unable to use the chosen.js native events because of however Knack has implemented them
//  so listening for click which is a bit wonky
function setUOM(element) {
  //  expects a connection selector field with a pipe-delmited name/unit of measure
  var item = $(element).find("span").text();

  if (item.split("|")[1]) {
    var unitOfMeasure = item.split("|")[1].trim();
    $("#kn-input-field_2214").find(".kn-input-label").text(unitOfMeasure);
  }
}

$(document).on("knack-scene-render.scene_716", function (event, page) {
  //  handle a click
  $("#view_1929_field_2220_chzn").click(function () {
    setUOM(this);
  });

  //  and for good measure update UOM on field focus
  $("#field_2214").focus(function () {
    var element = $("#view_1929_field_2220_chzn")["0"];
    setUOM(element);
  });
});

//////////////////////////////////////////////////
// Remove whitespace from street segment inputs///
//////////////////////////////////////////////////
$(document).on("knack-view-render.view_1199", function (event, scene) {
  $("#field_119").keyup(function () {
    var trimmed = $("#field_119").val().trim();
    $("#field_119").val(trimmed);
  });
});

$(document).on("knack-view-render.view_1200", function (event, scene) {
  $("#field_119").keyup(function () {
    var trimmed = $("#field_119").val().trim();
    $("#field_119").val(trimmed);
  });
});

$(document).on("knack-view-render.view_1207", function (event, scene) {
  $("#field_119").keyup(function () {
    var trimmed = $("#field_119").val().trim();
    $("#field_119").val(trimmed);
  });
});

$(document).on("knack-view-render.view_1206", function (event, scene) {
  $("#field_119").keyup(function () {
    var trimmed = $("#field_119").val().trim();
    $("#field_119").val(trimmed);
  });
});

$(document).on("knack-view-render.view_1996", function (event, scene) {
  $("#field_119").keyup(function () {
    var trimmed = $("#field_119").val().trim();
    $("#field_119").val(trimmed);
  });
});

$(document).on("knack-view-render.view_2357", function (event, page) {
  //  now with minor changes, used for traffic count attachments field
  //  this one affects the table that those with editing priviledges see
  //  replace attachment filename with attachment type
  //  find each attachment cell
  $("td.field_3176").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_3174")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        // and add a line break to make it consistent with the box next to it (BH)
        $(this).html(attachmentType + "<br>");
      });
  });
});

$(document).on("knack-view-render.view_2486", function (event, page) {
  //  now with minor changes, used for traffic count attachments field
  //  this one affects the table that those without editing priviledges see
  //  replace attachment filename with attachment type
  //  find each attachment cell
  $("td.field_3176").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";
        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_3174")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        // and add a line break to make it consistent with the box next to it (BH)
        $(this).html(attachmentType + "<br>");
      });
  });
});

$(document).on("knack-view-render.view_2491", function (event, page) {
  // Another copy of the find and replace attachment types script, this one for the manage requests
  // page
  $("td.field_3176").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_3174")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        // and add a line break to make it consistent with the box next to it (BH)
        $(this).html(attachmentType + "<br>");
      });
  });
});

$(document).on("knack-view-render.view_2465", function (event, page) {
  // Another copy of the find and replace attachment types script.  This one is used
  // on the Request Status page under Traffic Counts.
  $("td.field_3176").each(function () {
    //  find each attachment link within the cell
    $(this)
      .find("a")
      .each(function (index) {
        var attachmentType = "";

        //  search the neighboring field (attachmenty type) and retrieve the corresponding type
        $(this)
          .closest("tr")
          .children("td.field_3174")
          .find("span")
          .children("span")
          .each(function (index2) {
            if (index == index2) {
              attachmentType = $(this).text();
            }
          });

        //  update link contents
        // and add a line break to make it consistent with the box next to it (BH)
        $(this).html(attachmentType + "<br>");
      });
  });
});

//////////////////////////////////////////////////////////////
// set random password when adding an account.        //
// the user will not use this pw. they login with ADFS    //
//////////////////////////////////////////////////////////////

function generatePassword() {
  var length = 20,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal + "!"; // add  a special character, per app requirements
}

$(document).on("knack-view-render.view_1294", function (event, scene) {
  // set a random password when creating a new account. the user will not
  // use this pw. they login with ADFS
  var pw = generatePassword();
  $('input[name$="password"]').val(pw);
  $('input[name$="password_confirmation"]').val(pw);
});

///// end set password //////

/////////////////////////////////////////////////////////////
//// Change field color of inventory request statuses ///////
/////////////////////////////////////////////////////////////

function changeFieldColor(fieldClass, color_map) {
  var child_field = $(fieldClass).find(".kn-value");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color,
    });
  }
}

function insertIcon(fieldClass, icon_map) {
  var child_field = $(fieldClass).find(".kn-value");
  var value = child_field.text();
  var elem = $(fieldClass).find(".kn-value").find("span")[0];

  $(elem).before(
    "<span> <i class='fa fa-" + icon_map[value].icon + "'></i> </span>"
  );
}

var colorMapOne = {
  "Needs to be issued": {
    background_color: "#377eb8",
    color: "#fff",
    icon: "exclamation-circle",
  },
  "Review needed": {
    background_color: "#f5901f",
    color: "#fff",
    icon: "exclamation-triangle",
  },
  "Needs AIMS entry": {
    background_color: "#ff9b9c",
    color: "#fff",
    icon: "exclamation-triangle",
  },
  Completed: {
    background_color: "",
    color: "#adadad",
    icon: "check-circle",
  },
  Cancelled: {
    background_color: "#adadad",
    color: "#000",
    icon: "times-circle-o",
  },
};

$(document).on("knack-scene-render.scene_1085", function () {
  //  inventory request details
  changeFieldColor(".field_3556", colorMapOne);
  insertIcon(".field_3556", colorMapOne);
});
////////////////////////////////////////////////////////////
////////// End field color setting ////////////////////
///////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
//// Begin Set Weighted Unit Cost ///////////////////////////
/////////////////////////////////////////////////////////////
$(document).on("knack-scene-render.scene_1171", function (event, page) {
  function appendErrorMessage(msg) {
    var errorDiv = $(
      '<div id="' +
        page.key +
        '-fail" class="kn-message is-error"><span class="kn-message-body"><p><strong>' +
        msg +
        "</strong></p></span></div>"
    );
    errorDiv.insertBefore($(".kn-submit")[0]);
  }

  function dollarsToNum(val) {
    // Attempts to parse a float from a dollar string. Returns a float or NaN.
    if (typeof val === "number") {
      // if val is a number, return it
      return val;
    } else if (!typeof val === "string") {
      // not a number or string, set it to NaN and let validation catch it
      return NaN;
    }
    // we use Number here (and elsewhere) instead of parseFloat, because we don't want to tolerate any
    // unexpected text in the value we're parsing. e.g. parseFloat("23abcd12") would return `23`
    return Number(val.replace("$", "").replaceAll(",", "").trim());
  }

  function getWeightedUnitCost(state) {
    var weightedUnitCost =
      (state.quantity.current * state.cost.current +
        state.quantity.restock * state.cost.restock) /
      (state.quantity.current + state.quantity.restock);
    return Number(weightedUnitCost.toFixed(4));
  }

  function handleWeightedUnitCostChange(state) {
    var isValid = state.isValid();
    if (!isValid && !state.errorIsShowing) {
      // show error banner
      appendErrorMessage(
        "Unable to submit. Please verify that all fields are populated correctly."
      );
      // hide submit button
      $(".kn-button").hide();
      state.errorIsShowing = true;
    } else if (isValid) {
      // remove error banner
      $("#" + page.key + "-fail").remove();
      // show submit button
      $(".kn-button").show();
      state.errorIsShowing = false;
    } else {
      // leave existing error banner up
      return;
    }
  }

  function areInputsValid() {
    // ensure that the user-input values are valid. the restock unit cost, quantity
    // and, as a safegaurd, the calculated weighted unit cost, must be non-zero numbers
    var valsToTest = [
      this.cost.updated,
      this.quantity.restock,
      this.cost.restock,
    ];
    return valsToTest.every((val) => {
      if (isNaN(val) || typeof val !== "number" || val === 0) {
        return false;
      } else {
        return true;
      }
    });
    return results;
  }

  var detailsView = "view_2865";

  var fields = {
    cost: {
      current: "field_245",
      previous: "field_3786",
      restock: "field_3783",
      updated: "field_245",
    },
    quantity: {
      current: "field_3579",
      previous: "field_3906",
      restock: "field_3785",
    },
  };

  var state = {
    quantity: {
      restock: null,
      current: null,
    },
    cost: {
      restock: null,
      current: null,
      updated: null,
    },
    isValid: areInputsValid,
    errorIsShowing: false,
  };

  // clear out pre-existing values from these form fields. these fields are used to "translate"
  // values to the related unit_cost_history records that are created by form rule on submission,
  // there may be values in these fields from previous restocking
  $("#" + fields.cost.restock).val("");
  $("#" + fields.quantity.restock).val("");
  $("#" + fields.cost.updated).val("");

  // prevent editing of new unit cost field. this will be set programmatically
  $("#" + fields.cost.updated).prop("disabled", true);

  state.quantity.current = parseInt(
    $(
      $("#" + detailsView)
        .find("div.kn-detail." + fields.quantity.current)
        .find(".kn-detail-body span")[0]
    )
      .text()
      .replaceAll(",", "")
      .trim()
  );

  // handle situation where stock levels are negative (this should not but prob will happen)
  state.quantity.current =
    state.quantity.current > 0 ? state.quantity.current : 0;

  state.cost.current = dollarsToNum(
    $(
      $("#" + detailsView)
        .find("div.kn-detail." + fields.cost.current)
        .find(".kn-detail-body span")[0]
    ).text()
  );
  /*
      set the value of the preivous unit cost and quanity. these fields are hidden to the 
      user and we pass these values via submit rule that inserts them into a log record
    */
  $("#" + fields.cost.previous)
    .val(state.cost.current)
    .prop("disabled", true);

  $("#" + fields.quantity.previous)
    .val(state.quantity.current)
    .prop("disabled", true);

  // we call handleWeightedUnitCostChange to initialize the error state and hide submit button
  // until all fields are populated
  handleWeightedUnitCostChange(state);

  $("#" + fields.cost.restock).on("input", function () {
    state.cost.restock = dollarsToNum($(this).val());
    state.cost.updated = getWeightedUnitCost(state);
    $("#" + fields.cost.updated).val(state.cost.updated);
    handleWeightedUnitCostChange(state);
  });

  $("#" + fields.quantity.restock).on("input", function () {
    state.quantity.restock = Number($(this).val());
    state.cost.updated = getWeightedUnitCost(state);
    $("#" + fields.cost.updated).val(state.cost.updated);
    handleWeightedUnitCostChange(state);
  });
});

///////////////////////////////////////////////////////////
//// End Set Weighted Unit Cost ///////////////////////////
///////////////////////////////////////////////////////////

// Add "Refresh" button to inventory requests table
$(document).on("knack-view-render.view_2698", function (event, page) {
  var button = $(
    "<span style='width: 2em'></span><button id='refresh-view_2698' style='border-radius: .35em !important' class='kn-button is-primary'><i class='fa fa-refresh'></i><span style='width: .5em'></span>Refresh</button>"
  );

  button.insertAfter(
    $("#view_2698").find("form.table-keyword-search").find("a")[0]
  );

  $("#refresh-view_2698").click(function (e) {
    e.preventdefault();
    Knack.views["view_2698"].model.fetch();
  });
});

//////////////////////////////////////////////////////
// Disable editing of task order on work orders   ////
//////////////////////////////////////////////////////

/* 
This logic ensures that a work order's task order cannot be edited if
any inventory transactions have been financially processed. This is
dependent on a view being added to the work order edit view which
displays the `SUM_JV_TRANSACTIONS_COMPLETED` field. This field
indicates if any financial transactions have been processed.

If financial txns have been processed, then the editable select field
will be replaced with a static span of text.
*/
function getDetailsFieldValue(fieldKey) {
  var spans = $("div." + fieldKey).find(".kn-detail-body span");
  if (!spans || spans.length === 0) {
    return null;
  }
  var span = spans[0];
  if (!span) {
    return null;
  }
  return $(span).text();
}

function removeParentDetails(fieldKey) {
  var details = $("." + fieldKey).closest(".kn-details");
  if (details) {
    details.remove();
  }
}

function getConnectionFieldValue(fieldKey) {
  return $($("#connection-picker-chosen-" + fieldKey)[0]).find("span")[0]
    .textContent;
}

function conditionallyDisableTaskOrderEditing() {
  var JV_STATUS_FIELD_KEY = "field_3871";
  var TK_FIELD_KEY = "field_2634";
  var taskOrderValue = null;

  var jvStatus = getDetailsFieldValue(JV_STATUS_FIELD_KEY);
  // always hide this details view, users don't need to see it
  removeParentDetails(JV_STATUS_FIELD_KEY);

  if (jvStatus && jvStatus > 0) {
    // hide the the task order connection field
    // attempt to get the current value of the task order connection field
    // we're dealing with a race condition with the Chosen lib, which
    // knack uses for async select inputs.
    //
    // side note: i did try to interface directly with jquery-chosen, which has
    // a mechanism for disabling inputs, but i could not get it to work. i think
    // it's a context issue
    // https://stackoverflow.com/questions/17153417/disable-jquery-chosen-dropdown
    var MAX_ATTEMPTS = 3;
    var attempts = 0;
    var loop = setInterval(function () {
      // the connection field will have a value of "Select" until rendering is complete
      // it may *actually* have a value of select (i.e., it's blank)
      // or we may be waiting for the field to render
      attempts++;
      taskOrderValue = getConnectionFieldValue(TK_FIELD_KEY);
      if (taskOrderValue != "Select") {
        // append TK field value as text
        $("#kn-input-" + TK_FIELD_KEY).append(
          "<span>" + taskOrderValue + "</span>"
        );
        // hide TK connection input
        // it's important that we hide—-not remove--this field, because removing
        // could have weird side effects when the form is submitted
        $("#kn-input-" + TK_FIELD_KEY)
          .find(".control")
          .addClass("hiddenFormField");
        clearInterval(loop);
      } else if (attempts === MAX_ATTEMPTS) {
        // append TK field value as text
        $("#kn-input-" + TK_FIELD_KEY).append("<span>(none)</span>");
        // hide TK connection input
        $("#kn-input-" + TK_FIELD_KEY)
          .find(".control")
          .addClass("hiddenFormField");
        clearInterval(loop);
      }
    }, 1000);
  }
}

$(document).on("knack-scene-render.scene_1130", function (event, scene) {
  conditionallyDisableTaskOrderEditing();
});

$(document).on("knack-scene-render.scene_1048", function (event, scene) {
  conditionallyDisableTaskOrderEditing();
});

$(document).on("knack-scene-render.scene_297", function (event, scene) {
  conditionallyDisableTaskOrderEditing();
});
$(document).on("knack-scene-render.scene_634", function (event, scene) {
  conditionallyDisableTaskOrderEditing();
});

////////////////////////////////////////////
////// End Disable Task Order Editing //////
////////////////////////////////////////////

////////////////////////////////////////////
/// Begin Technician Time Log Validation ///
////////////////////////////////////////////

function appendErrorMessage(viewKey, formDiv, msg) {
  // remove existing error msg if present
  var errorDiv = $(
    '<div id="' +
      viewKey +
      '-fail" class="kn-message is-error"><span class="kn-message-body"><p><strong>' +
      msg +
      "</strong></p></span></div>"
  );
  errorDiv.insertBefore(formDiv);
  setTimeout(function () {
    $("#" + viewKey + "-fail").remove();
  }, 6000);
}

function highlightErrorField(inputId) {
  $(inputId).addClass("input-error");
  $(inputId + "-time").addClass("input-error");

  setTimeout(function () {
    $(inputId).removeClass("input-error");
    $(inputId + "-time").removeClass("input-error");
  }, 6000);
}

function getDatetime(inputId) {
  // Date-time field has two inputs, one for date, and one for time
  var dt = $("#" + inputId).val();

  if (!dt) return undefined;

  var [hoursStr, minutesStr] = $("#" + inputId + "-time")
    .val()
    .split(":");

  if (!(hoursStr && minutesStr)) {
    // we'll do like knack does and handle an absent or un-parseable time as 0:00
    hoursStr = "0";
    minutesStr = "0";
  }

  var hours = parseInt(hoursStr);
  var amPm = minutesStr.slice(-2).toLowerCase();

  // extract 'am' or 'pm' if present
  if (amPm !== "am" && amPm !== "pm") {
    amPm = null;
  } else {
    // remove am/pm string from string so that we can parse it as an int
    minutesStr = minutesStr.replace(amPm, "");
  }

  minutes = parseInt(minutesStr) || 0;

  if (isNaN(hours) || isNaN(minutes)) {
    return undefined;
  }

  // adjust hours for am/pm
  if (amPm == "pm" && hours < 12) {
    hours = hours + 12;
  } else if (amPm == "am" && hours == 12) {
    hours = 0;
  }
  return new Date(dt + " " + hours + ":" + minutes);
}

function formatErrorMessage(startField, endField) {
  return `<u>${startField.name}</u> must be earlier than <u>${endField.name}</u><br/>`;
}

$(document).on("knack-view-render.view_1252", function (event, page) {
  var viewKey = page.key;

  // each date field must be ordred chronologically, earliest to latest
  var dateFields = [
    { key: "field_2020", name: "Issue Recevied" }, // issue received
    { key: "field_1437", name: "Arrive at Worksite" }, // arrive on-site
    { key: "field_1438", name: "Leave Work Site" }, // leave site
    { key: "field_1425", name: "Return to Shop" }, // return to shop
  ];

  $(`#${viewKey} .kn-button`).on("click", function () {
    var passesValidation = true;
    var formDiv = $(this).closest("div")[0];
    var errorMsgs = "";

    for (var i = 1; i < 4; i++) {
      var startField = dateFields[i - 1];
      var endField = dateFields[i];
      var startDateTime = getDatetime(`${viewKey}-${startField.key}`);
      var endDateTime = getDatetime(`${viewKey}-${endField.key}`);

      if (startDateTime === undefined || endDateTime === undefined) {
        // this only happens when a date or time field is blank
        // in which case we do not validate start/end. Knack validations
        // will step in if these fields are required
        continue;
      }
      if (startDateTime > endDateTime) {
        passesValidation = false;
        // highlight errored fields with red border
        highlightErrorField(`#${viewKey}-${startField.key}`);
        highlightErrorField(`#${viewKey}-${endField.key}`);

        errorMsgs = `${errorMsgs}${formatErrorMessage(startField, endField)}`;
      }
    }
    if (!passesValidation) {
      // show red error banner
      appendErrorMessage(viewKey, formDiv, errorMsgs);
    }
    return passesValidation;
  });
});

////////////////////////////////////////////
/// End Technician Time Log Validation ///
////////////////////////////////////////////

//// Update link text to cabinet details page from signal detals
$(document).on("knack-view-render.view_1261", function (event, page) {
  // find cabinet ID field div
  var el = $(".field_1789");
  // find child <a>
  var a = $(el).find("a");
  // update text
  $(a).addClass("kn-link kn-link-1 kn-link-page kn-button");
  $(a).html(
    "<span class='icon is-small'><i class='fa fa-list'></i></span><span>Cabinet details</span>"
  );
});

///////////////////////////////////////////////////////////////
/// Autopopulate work order ID in the follow-up order form ////
// https://github.com/cityofaustin/atd-data-tech/issues/9052 //
///////////////////////////////////////////////////////////////

$(document).on("knack-view-render.view_1718", function (event, view, data) {
  // Select and clone the original work order ID select field
  var $workOrderIdSelect = $("select#view_1718-field_2075");

  // Update the field placeholder text so it looks like the original work order ID is chosen
  var originalWorkOrderIdText = data.field_1209;
  var originalWorkOrderId = data.id;

  // Chosen.js updates this select after the view loads so we need to watch for that change
  // This event blows away any DOM updates made before it
  $workOrderIdSelect.on("change", function () {
    // Add selected option with value of original work order ID
    var $placeholderOption = $(this).find("option");
    $placeholderOption.val(originalWorkOrderId);
    $placeholderOption.text(originalWorkOrderIdText);

    // Disable this listener so we don't get an endless loop when we fire off one last change
    $(this).off();
    // Update this select with the original work order ID as its value
    $(this).val(originalWorkOrderId).change();

    // Update the span that normally prompts the type to search with the human-readable ID
    var $placeholderTextSpan = $("div#view_1718_field_2075_chzn > a > span");
    $placeholderTextSpan.text(originalWorkOrderIdText);
  });
});

//////////////////////////////////////////////////////////////////
/// End Autopopulate work order ID in the follow-up order form ///
//////////////////////////////////////////////////////////////////
