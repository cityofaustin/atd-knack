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
/**
 * Enhance SSO button and hide/show default Knack login form with buttons
 * @parameter {string} viewId - Knack view id to append button link to
 */
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

/******************************/
/**** Save Knack Record ID ****/
/******************************/
// Function to Save Record ID. The purpose is to use the record ID to retrieve a 
// link to the producer details page in the email notification.
function saveRecordId(recordId) {
  $.ajax({
  // Scene/View of Second Form
    url: "https://api.knack.com/v1/pages/scene_37/views/view_60/records/" + recordId,
    type: "PUT", 
    headers: {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-Key": `knack`,
      "Authorization": Knack.getUserToken(),
      "ContentType": "application/json"
    },
    data: {
    // Store Record ID in Knack Record ID field
      field_103 : recordId,
    },
    tryCount: 0,
    retryLimit: 3,
    success: function(response) {
    // Success Message in Console
      console.log("Captured Record ID");
      Knack.hideSpinner();
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      this.tryCount++;
      let tryCount = this.tryCount, retryLimit = this.retryLimit, seconds; 
      if (tryCount <= retryLimit) { //try again
        switch(tryCount) {
          case 1:
          case 2: seconds = 5; break;
          case 3: seconds = 10; break; }
        let timeout = seconds * 1000;
        console.log("Error: " + XMLHttpRequest.status + " " + XMLHttpRequest.statusText + "\nRetry Count: " + tryCount + "\nRetrying in " + seconds + " seconds")
        let ajaxObject = this;
        window.setTimeout(function(){
          $.ajax(ajaxObject);
        }, timeout);
      } else {
      // Failure Message in Console
        console.log("Failed to Capture Record ID");
      }
    }
  });
}

// Listen for record creation (Application Submit / First Form)
$(document).on('knack-record-create.view_10', function(event, view, record) {
  const recordId = record.id;
  console.log('CREATE')
  saveRecordId(recordId);
});

// This is the Save Record ID / Second Form.
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_60', function (event, view, record) {
  $('#' + view.key).remove(); 
});

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/

// Change PDF name in 
// https://builder.knack.com/atd/oce/pages/scene_3/views/view_4/table
// https://builder.knack.com/atd/oce/pages/scene_15/views/view_25/table


// The views to use to change PDF name to 'View' instead of the long file name convention in grid views
const  v = ['view_4','view_6','view_25','view_50']

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_4 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_6 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_25 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_50 .kn-view-asset").html("View");
})

// Changes attachment name to "View"
/*
const attachmentName = function(event, view, data) {
  $('a.kn-view-asset').html("View"); 
};*/

// $(document).on('knack-view-render.view_4', attachmentName);
//$(document).on('knack-view-render.view_25', attachmentName);

// Interate through the views
/*
for (let i = 0; i < views.length; i++) {
  $(document).on('knack-view-render.'.concat(views[i]), attachmentName);
} 
*/
//Sets it for everything
/*
$(document).on('knack-view-render.view_4', function(event, data) {
  $("a.kn-view-asset").html("View");
})
*/
