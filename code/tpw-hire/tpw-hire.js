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
  // Create "Execute Script" button
  function addExecuteScriptButton() {
    // Check if button already exists to avoid duplicates
    if ($("#execute-script-button").length === 0) {
      // Create the button with same styling as "Generate Responses" button
      var executeButtonHtml = $(
        '<a id="execute-script-button" class="kn-link kn-link-2 kn-link-page kn-button" href="javascript:void(0)">' +
          '<span class="icon is-small"><i class="fa fa-cogs"></i></span>' +
          "<span>Execute Script</span>" +
          "</a>"
      );

      // Find existing "Generate Responses" button and add our button next to it
      var generateResponsesButton = $('a[href*="generate-responses"]');
      if (generateResponsesButton.length > 0) {
        executeButtonHtml.insertAfter(generateResponsesButton);
        executeButtonHtml.css("margin-left", "10px"); // Add some spacing
      }
    }
  }

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

  //   console.log("=== Available Knack Views on Page ===");
  //   if (typeof Knack !== "undefined" && Knack.views) {
  //     console.log("Available Knack views:", Object.keys(Knack.views));

  //     // Try to get data from views that are actually loaded on the page
  //     Object.keys(Knack.views).forEach(function (viewKey) {
  //       console.log("viewKey", viewKey);
  //       if (Knack.views[viewKey].model && Knack.views[viewKey].model.data) {
  //         console.log("✅ " + viewKey + " has data:", {
  //           view: viewKey,
  //           modelData: Knack.views[viewKey].model.data,
  //           recordCount: Knack.views[viewKey].model.data.models
  //             ? Knack.views[viewKey].model.data.models.length
  //             : "N/A",
  //         });
  //       }
  //     });
  //   }

  // Get all the Candidates with Status = "Selected to interview"
  // Name: interview_candidates, Key: view_263
  // Filter: field_36 = "Selected to interview"

  var viewKey = "view_263"; // interview_candidates
  var candidates = Knack.views[viewKey].model.data.models;
  console.log("Candidates raw models:", candidates);

  var isSelectedToInterview = function (candidate) {
    // Access Backbone model attributes properly
    var status = candidate.get("field_71"); // Use .get() method for Backbone models
    // var name = candidate.get("field_90");
    // var id = candidate.get("id") || candidate.id;

    return status === "Selected to interview";
  };

  // Filter candidates by status = "Selected to interview"
  var selectedToInterviewCandidates = candidates.filter(isSelectedToInterview);

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

  // Get all the Interview Questions
  // Name: interview_questions, Key: view_269
  var interviewQuestions = Knack.views["view_269"].model.data.models;

  console.log(
    "Interview question details:",
    interviewQuestions.map(function (question) {
      return {
        id: question.get("id") || question.id,
        question: question.get("field_26"),
      };
    })
  );

  var interviewManagement = Knack.views["view_253"].record["field_17_raw"];
  console.log("Interview management:", interviewManagement);

  console.log("=== Generating All Interview Response Payloads ===");

  //   Fields needed for Interview Response records (right?):
  //   interview_candidate	object_10	field_88	outbound	one	one
  //   interview_panel_member	object_9	field_183	outbound	one	many
  //   interview_question	object_4	field_89	outbound	one	many
  //   interview_management object_11 field_87   outbound   one   many

  // Generate all combinations of candidates × panel members × questions
  var interviewResponsePayloads = [];

  console.log("Generating payloads for:");
  console.log("- Candidates:", selectedToInterviewCandidates.length);
  console.log("- Panel Members:", panelMembers.length);
  console.log("- Interview Questions:", interviewQuestions.length);
  console.log(
    "- Expected total records:",
    selectedToInterviewCandidates.length *
      panelMembers.length *
      interviewQuestions.length
  );

  // Triple nested loop to create all combinations
  selectedToInterviewCandidates.forEach(function (candidate, candidateIndex) {
    panelMembers.forEach(function (panelMember, panelIndex) {
      interviewQuestions.forEach(function (question, questionIndex) {
        var payload = {
          // Connection fields - using IDs for relationships
          // field_87: interviewManagement[0].id, // interview_management connection
          field_87: Knack.views["view_253"].model.id,
          field_88: candidate.get("id") || candidate.id, // interview_candidate
          field_89: question.get("id") || question.id, // interview_question
          field_183: panelMember.get("id") || panelMember.id, // interview_panel_member

          // Metadata for tracking
          _meta: {
            candidateIndex: candidateIndex,
            candidateName: candidate.get("field_90"),
            panelIndex: panelIndex,
            panelMemberName: panelMember.get("field_189"),
            questionIndex: questionIndex,
            questionText: question.get("field_26"),
            recordNumber: interviewResponsePayloads.length + 1,
          },
        };

        interviewResponsePayloads.push(payload);
      });
    });
  });

  console.log(
    "Generated",
    interviewResponsePayloads.length,
    "interview response payloads"
  );
  console.log(
    "Sample payloads (first 3):",
    interviewResponsePayloads.slice(0, 3)
  );

  console.log(interviewResponsePayloads);

  // =================================================================
  // VIEW REFRESH FUNCTIONS
  // =================================================================

  // Function to refresh all interview-related views
  function refreshInterviewViews() {
    console.log("🔄 Refreshing interview views...");

    var viewsToRefresh = [
      "view_263", // interview_candidates
      "view_264", // interview_panel_members
      "view_269", // interview_questions
      "view_268", // interview_responses (where new records are created)
      "view_253", // interview_management details
    ];

    viewsToRefresh.forEach(function (viewKey) {
      if (Knack.views[viewKey] && Knack.views[viewKey].model) {
        console.log("Refreshing view:", viewKey);
        Knack.views[viewKey].model.fetch();
      }
    });

    console.log("✅ All views refreshed");
  }

  // Function to create and manage progress bar
  function createProgressBar(total) {
    // Remove existing progress bar if it exists
    $("#interview-progress-container").remove();

    var progressBarHtml =
      '<div id="interview-progress-container" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">' +
      '<div style="margin-bottom: 10px; font-weight: bold; color: #495057;">Creating Interview Response Records</div>' +
      '<div id="progress-text" style="margin-bottom: 8px; font-size: 14px; color: #6c757d;">Preparing to create ' +
      total +
      " records...</div>" +
      '<div style="background: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">' +
      '<div id="progress-bar-fill" style="background: linear-gradient(90deg, #28a745, #20c997); height: 100%; width: 0%; transition: width 0.3s ease; border-radius: 10px; position: relative;">' +
      '<div id="progress-percentage" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 12px; font-weight: bold;">0%</div>' +
      "</div>" +
      "</div>" +
      '<div id="progress-stats" style="margin-top: 8px; font-size: 12px; color: #6c757d; display: flex; justify-content: space-between;">' +
      '<span>✅ Success: <span id="success-count">0</span></span>' +
      '<span>❌ Failed: <span id="failed-count">0</span></span>' +
      '<span>⏳ Remaining: <span id="remaining-count">' +
      total +
      "</span></span>" +
      "</div>" +
      "</div>";

    // Insert progress bar after execute button
    $("#execute-script-button").after(progressBarHtml);
  }

  // Function to update progress bar
  function updateProgress(completed, total, failed, currentAction) {
    var percentage = Math.round((completed / total) * 100);
    var remaining = total - completed;

    $("#progress-bar-fill").css("width", percentage + "%");
    $("#progress-percentage").text(percentage + "%");
    $("#progress-text").text(
      currentAction || "Processing record " + completed + " of " + total
    );
    $("#success-count").text(completed - failed);
    $("#failed-count").text(failed);
    $("#remaining-count").text(remaining);
  }

  // Function to complete progress bar
  function completeProgress(total, failed) {
    $("#progress-bar-fill").css(
      "background",
      failed > 0
        ? "linear-gradient(90deg, #ffc107, #fd7e14)"
        : "linear-gradient(90deg, #28a745, #20c997)"
    );
    $("#progress-text").text(
      "✅ Process complete! Created " +
        (total - failed) +
        " of " +
        total +
        " records."
    );

    // Remove progress bar after 5 seconds
    setTimeout(function () {
      $("#interview-progress-container").fadeOut(500, function () {
        $(this).remove();
      });
    }, 5000);
  }

  // =================================================================
  // BULK RECORD CREATION FUNCTIONS
  // =================================================================

  // =================================================================
  // TESTING CONFIGURATION
  // =================================================================
  var TESTING_MODE = {
    enabled: true, // Set to true to enable mock failures
    failureRate: 0.3, // 30% of requests will fail
    mockAPICall: true, // Set to true to skip actual API calls
    randomDelay: true, // Add random delays to simulate real API
    specificFailures: [2, 5, 8], // Specific record indices that should fail (0-based)
  };

  // Helper functions for different test scenarios
  function setTestScenario(scenario) {
    switch (scenario) {
      case "no-failures":
        TESTING_MODE.enabled = true;
        TESTING_MODE.failureRate = 0;
        TESTING_MODE.specificFailures = [];
        console.log(
          "🧪 Test scenario: NO FAILURES - All requests will succeed"
        );
        break;
      case "all-failures":
        TESTING_MODE.enabled = true;
        TESTING_MODE.failureRate = 1.0;
        TESTING_MODE.specificFailures = [];
        console.log("🧪 Test scenario: ALL FAILURES - All requests will fail");
        break;
      case "random-failures":
        TESTING_MODE.enabled = true;
        TESTING_MODE.failureRate = 0.3;
        TESTING_MODE.specificFailures = [];
        console.log(
          "🧪 Test scenario: RANDOM FAILURES - 30% of requests will fail"
        );
        break;
      case "specific-failures":
        TESTING_MODE.enabled = true;
        TESTING_MODE.failureRate = 0;
        TESTING_MODE.specificFailures = [2, 5, 8, 12, 15];
        console.log(
          "🧪 Test scenario: SPECIFIC FAILURES - Records 3, 6, 9, 13, 16 will fail"
        );
        break;
      case "real-api":
        TESTING_MODE.enabled = false;
        console.log("🧪 Test scenario: REAL API - Making actual API calls");
        break;
      default:
        console.log(
          "🧪 Available test scenarios: 'no-failures', 'all-failures', 'random-failures', 'specific-failures', 'real-api'"
        );
    }
  }

  // Set default test scenario
  setTestScenario("random-failures");

  // Display testing information
  console.log("🧪 === TESTING MODE ENABLED ===");
  console.log("To change test scenarios, use the console:");
  console.log("- setTestScenario('no-failures')     // All succeed");
  console.log("- setTestScenario('all-failures')    // All fail");
  console.log("- setTestScenario('random-failures') // 30% fail randomly");
  console.log(
    "- setTestScenario('specific-failures') // Specific records fail"
  );
  console.log("- setTestScenario('real-api')        // Make real API calls");
  console.log("================================");

  // Function to create a single interview response record
  function createInterviewResponse(payload, index, total) {
    return new Promise(function (resolve, reject) {
      // Remove metadata before sending to API
      var apiPayload = Object.assign({}, payload);
      delete apiPayload._meta;

      console.log(
        "Creating record " + (index + 1) + "/" + total + ":",
        payload._meta.candidateName +
          " → " +
          payload._meta.panelMemberName +
          " → " +
          payload._meta.questionText.substring(0, 50) +
          "..."
      );

      // TESTING MODE: Mock API failures
      if (TESTING_MODE.enabled) {
        console.log(
          "🧪 TESTING MODE: Simulating API call for record",
          index + 1
        );

        // Determine if this request should fail
        var shouldFail = false;

        if (TESTING_MODE.specificFailures.includes(index)) {
          shouldFail = true;
          console.log("🎯 Specific failure triggered for record", index + 1);
        } else if (Math.random() < TESTING_MODE.failureRate) {
          shouldFail = true;
          console.log("🎲 Random failure triggered for record", index + 1);
        }

        // Simulate API delay
        var delay = TESTING_MODE.randomDelay
          ? Math.random() * 2000 + 500
          : 1000; // 500-2500ms

        setTimeout(function () {
          if (shouldFail) {
            // Mock API error response
            var mockError = {
              status: Math.random() > 0.5 ? 400 : 500,
              responseText: JSON.stringify({
                error: "Mock API Error",
                message: "Simulated failure for testing purposes",
                field: index % 2 === 0 ? "field_87" : "field_88",
              }),
            };

            console.error("❌ Mock API failure for record " + (index + 1));
            reject({ payload: payload, error: mockError });
          } else {
            // Mock successful response
            var mockResponse = {
              id: "mock_record_" + Date.now() + "_" + index,
              field_87: apiPayload.field_87,
              field_88: apiPayload.field_88,
              field_89: apiPayload.field_89,
              field_183: apiPayload.field_183,
            };

            console.log(
              "✅ Mock API success for record " + (index + 1) + " - ID:",
              mockResponse.id
            );
            resolve(mockResponse);
          }
        }, delay);

        return; // Exit early for testing mode
      }

      // =================================================================
      // 🐛 KNOWN BUG - TODO: Fix connection field persistence
      // =================================================================
      // Issue: When creating interview response records via POST request,
      // the field_87 (interview_management connection) doesn't persist
      // from payload to response. Record creates but isn't associated
      // to the correct interview_management object.
      //
      // Possible causes to investigate:
      // - Wrong field format (should it be field_87 vs field_87_raw?)
      // - Missing crumbtrail parameter for parent context
      // - Connection field permissions/validation rules
      // - API endpoint should be under interview_management context
      // =================================================================

      var scene = "scene_124";
      var view = "view_286";
      var url =
        "https://api.knack.com/v1/scenes/" +
        scene +
        "/views/" +
        view +
        "/records";

      $.ajax({
        type: "POST",
        url: url,
        headers: headers,
        data: JSON.stringify(apiPayload),
        contentType: "application/json",
      })
        .then(function (res) {
          console.log("res", res);
          console.log(
            "✅ Created record " + (index + 1) + "/" + total + " - ID:",
            res.id
          );

          resolve(res);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error(
            "❌ Failed to create record " + (index + 1) + "/" + total + ":"
          );
          logAPIError(jqXHR, textStatus, errorThrown);
          reject({ payload: payload, error: jqXHR });
        });
    });
    //   //   This is the data that we need to send to the API.
    //   var newRecordData = {
    //     field_87_raw: [
    //       {
    //         id: "67b8b06980a23602bb02eb32",
    //         identifier: "999999 | <p>DTS TEST RECORD</p>-INT36",
    //       },
    //     ],
    //     field_87: interviewManagement[0].id, // interview_management connection
    //     field_88: selectedToInterviewCandidates[0].get("id"),
    //     field_89: interviewQuestions[0].get("id"),
    //     field_183: panelMembers[0].get("id"),
    //   };
  }

  // Function to create all interview response records in batches
  function createAllInterviewResponses(payloads, batchSize = 5) {
    console.log("=== Starting Bulk Interview Response Creation ===");
    console.log("Total records to create:", payloads.length);
    console.log("Batch size:", batchSize);

    // Initialize progress bar
    createProgressBar(payloads.length);

    var createdRecords = [];
    var failedRecords = [];
    var currentBatch = 0;
    var totalBatches = Math.ceil(payloads.length / batchSize);

    function processBatch(startIndex) {
      currentBatch++;
      var endIndex = Math.min(startIndex + batchSize, payloads.length);
      var batchPayloads = payloads.slice(startIndex, endIndex);

      console.log(
        "Processing batch " +
          currentBatch +
          "/" +
          totalBatches +
          " (records " +
          (startIndex + 1) +
          "-" +
          endIndex +
          ")"
      );

      // Update progress bar for batch start
      updateProgress(
        createdRecords.length + failedRecords.length,
        payloads.length,
        failedRecords.length,
        "Processing batch " + currentBatch + "/" + totalBatches + "..."
      );

      // Create promises for this batch
      var batchPromises = batchPayloads.map(function (payload, index) {
        return createInterviewResponse(
          payload,
          startIndex + index,
          payloads.length
        );
      });

      // Wait for all records in this batch to complete
      Promise.allSettled(batchPromises).then(function (results) {
        results.forEach(function (result, index) {
          if (result.status === "fulfilled") {
            createdRecords.push(result.value);
          } else {
            failedRecords.push(result.reason);
          }
        });

        // Update progress bar after batch completion
        updateProgress(
          createdRecords.length + failedRecords.length,
          payloads.length,
          failedRecords.length,
          "Batch " + currentBatch + "/" + totalBatches + " complete"
        );

        console.log(
          "Batch " +
            currentBatch +
            " complete. Success: " +
            results.filter((r) => r.status === "fulfilled").length +
            ", Failed: " +
            results.filter((r) => r.status === "rejected").length
        );

        // Process next batch or finish
        if (endIndex < payloads.length) {
          // Add delay between batches to avoid rate limiting
          setTimeout(function () {
            processBatch(endIndex);
          }, 1000); // 1 second delay between batches
        } else {
          // All batches complete
          console.log("=== Bulk Creation Complete ===");
          console.log("Total created:", createdRecords.length);
          console.log("Total failed:", failedRecords.length);
          console.log(
            "Success rate:",
            Math.round((createdRecords.length / payloads.length) * 100) + "%"
          );

          if (failedRecords.length > 0) {
            console.log("Failed records:", failedRecords);
          }

          // Complete progress bar
          completeProgress(payloads.length, failedRecords.length);

          // Refresh all views to show new records
          setTimeout(function () {
            refreshInterviewViews();
          }, 1000);
        }
      });
    }

    // Start processing from first batch
    processBatch(0);
  }

  // =================================================================
  // TESTING SECTION
  // =================================================================

  // Test with a single record first
  console.log("=== Testing Single Record Creation ===");
  var testPayload = interviewResponsePayloads[0];
  console.log("Test payload:", testPayload);

  // Add the Execute Script button and click handler
  addExecuteScriptButton();

  // Add click handler for the Execute Script button
  $(document).on("click", "#execute-script-button", function (e) {
    e.preventDefault();
    console.log("🚀 Execute Script button clicked!");

    var confirmationText =
      "This will create " +
      interviewResponsePayloads.length +
      " interview response records.\n\n" +
      "Breakdown:\n" +
      "- Candidates: " +
      selectedToInterviewCandidates.length +
      "\n" +
      "- Panel Members: " +
      panelMembers.length +
      "\n" +
      "- Questions: " +
      interviewQuestions.length +
      "\n\n" +
      "Are you sure you want to proceed?";

    // Show confirmation dialog for safety
    var confirmation = confirm(confirmationText);

    if (confirmation) {
      console.log("✅ User confirmed - Starting bulk record creation...");
      // Disable button during execution
      $("#execute-script-button").addClass("is-loading").prop("disabled", true);

      // Test single record creation (commented out for safety)
      //   createInterviewResponse(testPayload, 0, 1);

      //   ⚠️ Execute the bulk creation
      //   Uncomment this line below to execute the bulk creation
      createAllInterviewResponses(interviewResponsePayloads);

      // Re-enable button after 5 seconds (or you could do this in the completion callback)
      setTimeout(function () {
        $("#execute-script-button")
          .removeClass("is-loading")
          .prop("disabled", false);
      }, 5000);
    } else {
      console.log("❌ User cancelled bulk record creation");
    }
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
});
