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

// TPW Hire Generate Responses Page
$(document).on("knack-scene-render.scene_112", function () {
  console.log("=== TPW Hire Generate Responses Debug ===");

  // Get current record ID from URL
  var hrefArray = window.location.href.split("/");
  var recordId = hrefArray[hrefArray.length - 2];
  console.log("Current page record ID:", recordId);

  // Set auth and headers for API calls
  var knackUserToken = Knack.getUserToken();
  var headers = {
    "X-Knack-Application-Id": Knack.application_id,
    "X-Knack-REST-API-KEY": "knack",
    Authorization: knackUserToken,
    "content-type": "application/json",
  };

  // Debug current page and URL structure
  console.log("=== Page Context Debug ===");
  console.log("Current URL:", window.location.href);
  console.log("URL parts:", hrefArray);
  console.log("Extracted record ID:", recordId);
  console.log("Current scene:", window.location.hash);

  //   // Test 1: Try different view IDs that might exist on this scene
  var testViews = ["view_263", "view_264", "view_269"]; // Test the views you mentioned

  // Test 3: Check what views are actually available on this page
  console.log("=== Available Knack Views on Page ===");
  if (typeof Knack !== "undefined" && Knack.views) {
    console.log("Available Knack views:", Object.keys(Knack.views));

    // Try to get data from views that are actually loaded on the page
    Object.keys(Knack.views).forEach(function (viewKey) {
      console.log("viewKey", viewKey);
      if (Knack.views[viewKey].model && Knack.views[viewKey].model.data) {
        console.log("✅ " + viewKey + " has data:", {
          view: viewKey,
          modelData: Knack.views[viewKey].model.data,
          recordCount: Knack.views[viewKey].model.data.models
            ? Knack.views[viewKey].model.data.models.length
            : "N/A",
        });
      }
    });
  }

  //   Everything above is for debugging.
  // Here we focus on the actual functionality.

  // Get all the Candidates with Status = "Selected to interview"
  // Name: interview_candidates, Key: view_263
  // Filter: field_36 = "Selected to interview"

  // Try to get data from views that are actually loaded on the page
  //   Object.keys(Knack.views).forEach(function (viewKey) {

  var viewKey = "view_263";
  var candidates = Knack.views[viewKey].model.data.models;
  console.log("Candidates raw models:", candidates);

  var isSelectedToInterview = function (candidate) {
    // Access Backbone model attributes properly
    var status = candidate.get("field_71"); // Use .get() method for Backbone models
    var name = candidate.get("field_90");
    var id = candidate.get("id") || candidate.id;

    console.log("Candidate ID:", id);
    console.log("Candidate name:", name);
    console.log("Candidate status:", status);
    console.log("Is selected:", status === "Selected to interview");

    return status === "Selected to interview";
  };

  // Filter candidates by status = "Selected to interview"
  var selectedToInterviewCandidates = candidates.filter(isSelectedToInterview);

  console.log(
    "Filtered candidates (selected to interview):",
    selectedToInterviewCandidates.length
  );
  console.log(
    "Selected candidates details:",
    selectedToInterviewCandidates.map(function (candidate) {
      return {
        id: candidate.get("id") || candidate.id,
        name: candidate.get("field_90"),
        status: candidate.get("field_71"),
      };
    })
  );

  // Get all the Panel Members
  // Name: interview_panel_members, Key: view_264
  var panelMembers = Knack.views["view_264"].model.data.models;
  console.log("Panel members:", panelMembers);

  console.log(
    "Panel member details:",
    panelMembers.map(function (panelMember) {
      return {
        id: panelMember.get("id") || panelMember.id,
        name: panelMember.get("field_189"),
        type: panelMember.get("field_213"),
      };
    })
  );

  // Do we need to filter panel members Type?
  //   For now, no. Ask Team.

  // Get all the Interview Questions
  // Name: interview_questions, Key: view_269
  var interviewQuestions = Knack.views["view_269"].model.data.models;
  console.log("Interview questions:", interviewQuestions);

  console.log(
    "Interview question details:",
    interviewQuestions.map(function (question) {
      return {
        id: question.get("id") || question.id,
        question: question.get("field_26"),
      };
    })
  );

  console.log("view_253", Knack.views["view_253"]);

  var interviewManagement = Knack.views["view_253"].record["field_17_raw"];
  console.log("Interview management:", interviewManagement);
  console.log("Interview management ID:", interviewManagement[0].id);
  console.log("Interview management Name:", interviewManagement[0].identifier);

  // Test creating new INTERVIEW RESPONSE records
  console.log("=== Testing POST request to create Interview Response ===");

  //   Fields needed:
  //   interview_candidate	object_10	field_88	outbound	one	one
  //   interview_panel_member	object_9	field_183	outbound	one	many
  //   interview_question	object_4	field_89	outbound	one	many

  //   field_88: interview_candidate
  //   field_87: interview_management
  //   field_183: interview_panel_member
  //   field_89: interview_question

  // Create a test Interview Response record following proper patterns
  var newRecordData = {
    field_87: "67b8b06980a23602bb02eb32",
    field_88: selectedToInterviewCandidates[0].get("id"),
    field_89: interviewQuestions[0].get("id"),
    field_183: panelMembers[0].get("id"),
  };

  console.log("Test data to be sent:", newRecordData);

  var addResponseScene = "scene_124";

  $.ajax({
    type: "POST",
    url:
      "https://api.knack.com/v1/scenes/" +
      addResponseScene +
      "/views/view_268/records", // Try scenes pattern first
    headers: headers,
    data: JSON.stringify(newRecordData), // ✅ Must stringify the data
    contentType: "application/json", // ✅ Required for JSON requests
  })
    .then(function (res) {
      console.log("✅ POST Success:", res);
      console.log("res", res);
      console.log("Created record ID:", res.id);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("❌ POST Failed:");
      logAPIError(jqXHR, textStatus, errorThrown);

      // Try alternative API pattern if first fails
      console.log("Trying alternative /pages/ pattern...");
      $.ajax({
        type: "POST",
        url: "https://api.knack.com/v1/pages/scene_112/views/view_268/records", // Alternative pattern
        headers: headers,
        data: JSON.stringify(newRecordData),
        contentType: "application/json",
      })
        .then(function (res) {
          console.log("✅ Alternative POST Success:", res);
        })
        .fail(function (jqXHR2, textStatus2, errorThrown2) {
          console.error("❌ Alternative POST also failed:");
          logAPIError(jqXHR2, textStatus2, errorThrown2);
        });
    });

  // Helper function to log detailed error information
  function logAPIError(jqXHR, textStatus, errorThrown) {
    console.error("=== Detailed Error Information ===");
    console.error("Status Code:", jqXHR.status);
    console.error("Status Text:", textStatus);
    console.error("Error Thrown:", errorThrown);
    console.error("Response Text:", jqXHR.responseText);

    try {
      var errorResponse = JSON.parse(jqXHR.responseText);
      console.error("Parsed Error Response:", errorResponse);
    } catch (e) {
      console.error("Could not parse error response as JSON");
    }
  }

  // For each Candidate, create a new Interview Response related to each panel member and interview question.
});
