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

// create large Traffic Control Plans button on the Home page
$(document).on("knack-view-render.view_31", function(event, page) {
  bigButton("traffic-control-plans", "view_31", "https://atd.knack.com/row#tcp-projects/", "crop", "Traffic Control Plans");
});

/*************************************************************************************/
/** Disable the ability to Click/Touch outside a Modal Page (accidentally close it) **/
/*************************************************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
  $('.kn-modal-bg').off('click');
});


/*************************************************************************************/
/***********************Cost of Service Checkboxes************************************/
/*************************************************************************************/
// Function that adds checkboxes
var addCheckboxes = function (view) {
  // Add the checkbox to to the header to select/unselect all
  $("#" + view.key + ".kn-table thead tr").prepend(
    '<th><input type="checkbox"></th>'
  );
  $("#" + view.key + ".kn-table thead input").change(function () {
    $("." + view.key + ".kn-table tbody tr input").each(function () {
      $(this).attr(
        "checked",
        $("#" + view.key + ".kn-table thead input").attr("checked") != undefined
      );
    });
  });
  // Add a checkbox to each row in the table body
  $("#" + view.key + ".kn-table tbody tr").each(function () {
    $(this).prepend('<td class="custom-checkbox"><input type="checkbox"></td>');
  });
};

// // Cycle through selected checkboxes. Use this in any code that needs to get the checked IDs
// $("#view_5 tbody input[type=checkbox]:checked").each(function () {
//   // add code here to get record id or row value
//   var id = $(this).closest("tr").attr("id"); // record id
// });

$(document).on("knack-view-render.view_49", function (event, view) {
  addCheckboxes(view);
  var button = $(
    "<span style='width: 2em'></span><button id='refresh-view_49' style='border-radius: .35em !important' class='kn-button is-primary'><i class='fa fa-refresh'></i><span style='width: .5em'></span>Update selected records</button>"
  );
  button.insertAfter(
    $("#" + view.key)
      .find("form.table-keyword-search")
      .find("a")[0]
  );
  $("#refresh-view_49").click(function (e) {
    e.preventdefault();
  });
  $("#view_49 tbody td.custom-checkbox").on("click", function () {
    // add code here to get record id or row value
    // var isChecked = $(this).find("input").attr("checked");
    // console.log();
    // $(this).find("input").attr("checked", !isChecked);
    console.log($(this).closest("tr").attr("id")); // record id
  });
});
