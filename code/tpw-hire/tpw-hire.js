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
/*************** UI Components ***************/
/********************************************/

/*********** Button Components ********/
// Creates a big button with icon and label
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

// Add the Generate Responses button to the page
function addGenerateResponsesButton() {
  // Check if button already exists to avoid duplicates
  if ($("#generate-responses-button").length === 0) {
    // Create the styled button with icon and text
    var generateResponsesButtonHtml = $(
      '<a id="generate-responses-button" class="kn-link kn-link-2 kn-link-page kn-button" href="javascript:void(0)">' +
        '<span class="icon is-small"><i class="fa fa-cogs"></i></span>' +
        "<span>Generate Responses</span>" +
        "</a>"
    );

    // Find the "Add Manual Responses" button using the view ID from config
    var addManualResponsesButton = $(
      "#" + CONFIG.views.manualResponses + " .kn-button"
    );
    if (addManualResponsesButton.length > 0) {
      generateResponsesButtonHtml.insertAfter(addManualResponsesButton);
      generateResponsesButtonHtml.css("margin-left", "8px"); // Add some spacing
    }
  }
}

// Helper function to manage button state
function enableGenerateButton() {
  $("#generate-responses-button")
    .removeClass("is-loading")
    .prop("disabled", false)
    .find("i")
    .removeClass("fa-spinner fa-spin")
    .addClass("fa-cogs");
}

function disableGenerateButton() {
  $("#generate-responses-button")
    .addClass("is-loading")
    .prop("disabled", true)
    .find("i")
    .removeClass("fa-cogs")
    .addClass("fa-spinner fa-spin");

  // Hide the warning message during processing
  $("#regenerate-warning-message").hide();
}

// Helper function to update button with count
function updateButtonWithCount(currentInterviewResponses) {
  var expectedRecords = calculateExpectedRecordCount();
  var hasExistingRecords = currentInterviewResponses > 0;

  var $generateResponsesButton = $("#generate-responses-button");

  // Always enable the button
  $generateResponsesButton
    .prop("disabled", false)
    .removeClass("is-disabled")
    .css({
      opacity: "1",
      cursor: "pointer",
      "pointer-events": "auto",
    });

  // Update button text and icon based on existing records
  if (hasExistingRecords) {
    // Change to "Regenerate" if records exist
    $generateResponsesButton
      .find("span:last")
      .text(
        "Regenerate Responses (" + currentInterviewResponses + " existing)"
      );

    // Change icon to refresh icon
    $generateResponsesButton
      .find("i")
      .removeClass("fa-cogs")
      .addClass("fa-refresh");

    // Show warning message about deletion if it exists, or create it if it doesn't
    var $warningMessage = $("#regenerate-warning-message");
    if ($warningMessage.length === 0) {
      var warningHtml =
        '<div id="regenerate-warning-message" style="margin: 10px 0; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; color: #856404; font-size: 14px;">' +
        '<i class="fa fa-exclamation-triangle"></i> <strong>Regenerate Mode:</strong> ' +
        "This will first delete all " +
        currentInterviewResponses +
        " existing interview response records, " +
        "then create " +
        expectedRecords +
        " new records." +
        "</div>";
      // Insert warning message after the button
      $generateResponsesButton.after(warningHtml);
    } else {
      // Update existing warning message with current counts
      $warningMessage.html(
        '<i class="fa fa-exclamation-triangle"></i> <strong>Regenerate Mode:</strong> ' +
          "This will first delete all " +
          currentInterviewResponses +
          " existing interview response records, " +
          "then create " +
          expectedRecords +
          " new records."
      );
      $warningMessage.show();
    }
  } else {
    // Normal "Generate" mode
    $generateResponsesButton.find("span:last").text("Generate Responses");

    // Use normal cogs icon
    $generateResponsesButton
      .find("i")
      .removeClass("fa-refresh")
      .addClass("fa-cogs");

    // Remove warning message
    $("#regenerate-warning-message").remove();
  }

  // Remove old records exist message if it exists
  $("#records-exist-message").remove();

  return {
    currentCount: currentInterviewResponses,
    expectedCount: expectedRecords,
    hasExistingRecords: hasExistingRecords,
  };
}

// Check and update button state based on existing records
function checkButtonState() {
  var currentInterviewResponses = 0;

  // Get the total records count
  try {
    if (
      Knack.views[CONFIG.views.responses] &&
      Knack.views[CONFIG.views.responses].model &&
      Knack.views[CONFIG.views.responses].model.data &&
      Knack.views[CONFIG.views.responses].model.data.total_records !== undefined
    ) {
      currentInterviewResponses =
        Knack.views[CONFIG.views.responses].model.data.total_records;
      console.log(
        "✅ Successfully got " +
          currentInterviewResponses +
          " existing interview response records"
      );
    } else {
      console.warn(
        "Could not access total_records from " +
          CONFIG.views.responses +
          ", defaulting to 0"
      );
    }
  } catch (error) {
    console.error("Error accessing view data:", error);
    currentInterviewResponses = 0;
  }

  // Use view data for count and return the result
  return updateButtonWithCount(currentInterviewResponses);
}

/*********** Progress Bar Components ********/
// Unified progress bar function for both create and delete operations
function createProgressBar(total, operationType = "create") {
  var isDelete = operationType === "delete";
  var containerId = isDelete
    ? "deletion-progress-container"
    : "interview-progress-container";
  var title = isDelete
    ? "Deleting Existing Interview Response Records"
    : "Creating Interview Response Records";
  var actionText = isDelete ? "delete" : "create";
  var preparingText = isDelete ? "Preparing to delete" : "Preparing to create";
  var successLabel = isDelete ? "Deleted" : "Success";
  var progressBarId = isDelete
    ? "deletion-progress-bar-fill"
    : "progress-bar-fill";
  var progressTextId = isDelete ? "deletion-progress-text" : "progress-text";
  var progressPercentageId = isDelete
    ? "deletion-progress-percentage"
    : "progress-percentage";
  var progressStatsId = isDelete ? "deletion-progress-stats" : "progress-stats";
  var successCountId = isDelete ? "deletion-success-count" : "success-count";
  var failedCountId = isDelete ? "deletion-failed-count" : "failed-count";
  var remainingCountId = isDelete
    ? "deletion-remaining-count"
    : "remaining-count";

  // Default colors based on operation type
  var defaultGradient = isDelete
    ? "linear-gradient(90deg, #dc3545, #fd7e14)"
    : "linear-gradient(90deg, #28a745, #20c997)";

  // Remove existing progress bar if it exists
  $("#" + containerId).remove();

  var progressBarHtml =
    '<div id="' +
    containerId +
    '" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">' +
    '<div style="margin-bottom: 10px; font-weight: bold; color: #495057;">' +
    title +
    "</div>" +
    '<div id="' +
    progressTextId +
    '" style="margin-bottom: 8px; font-size: 14px; color: #6c757d;">' +
    preparingText +
    " " +
    total +
    " records...</div>" +
    '<div style="background: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">' +
    '<div id="' +
    progressBarId +
    '" style="background: ' +
    defaultGradient +
    '; height: 100%; width: 0%; transition: width 0.3s ease; border-radius: 10px; position: relative;">' +
    '<div id="' +
    progressPercentageId +
    '" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 12px; font-weight: bold;">0%</div>' +
    "</div>" +
    "</div>" +
    '<div id="' +
    progressStatsId +
    '" style="margin-top: 8px; font-size: 12px; color: #6c757d; display: flex; justify-content: space-between;">' +
    '<span><i class="fa fa-check-circle" style="color: #28a745;"></i> ' +
    successLabel +
    ': <span id="' +
    successCountId +
    '">0</span></span>' +
    '<span><i class="fa fa-times-circle" style="color: #dc3545;"></i> Failed: <span id="' +
    failedCountId +
    '">0</span></span>' +
    '<span><i class="fa fa-gears" style="color: #6c757d;"></i> Remaining: <span id="' +
    remainingCountId +
    '">' +
    total +
    "</span></span>" +
    "</div>" +
    "</div>";

  // Insert progress bar after the warning message if it exists, otherwise after the button
  var $insertAfter = $("#regenerate-warning-message").length
    ? $("#regenerate-warning-message")
    : $("#generate-responses-button");
  $insertAfter.after(progressBarHtml);
}

// Unified progress update function for both create and delete operations
function updateProgress(
  completed,
  total,
  failed,
  currentAction,
  operationType = "create"
) {
  var isDelete = operationType === "delete";
  var progressBarId = isDelete
    ? "deletion-progress-bar-fill"
    : "progress-bar-fill";
  var progressTextId = isDelete ? "deletion-progress-text" : "progress-text";
  var progressPercentageId = isDelete
    ? "deletion-progress-percentage"
    : "progress-percentage";
  var successCountId = isDelete ? "deletion-success-count" : "success-count";
  var failedCountId = isDelete ? "deletion-failed-count" : "failed-count";
  var remainingCountId = isDelete
    ? "deletion-remaining-count"
    : "remaining-count";

  var percentage = Math.round((completed / total) * 100);
  var remaining = total - completed;
  var defaultAction = isDelete ? "Deleting record" : "Processing record";

  $("#" + progressBarId).css("width", percentage + "%");
  $("#" + progressPercentageId).text(percentage + "%");
  $("#" + progressTextId).text(
    currentAction || defaultAction + " " + completed + " of " + total
  );
  $("#" + successCountId).text(completed - failed);
  $("#" + failedCountId).text(failed);
  $("#" + remainingCountId).text(remaining);
}

// Unified progress completion function for both create and delete operations
function completeProgress(total, failed, operationType = "create") {
  var isDelete = operationType === "delete";
  var containerId = isDelete
    ? "deletion-progress-container"
    : "interview-progress-container";
  var progressBarId = isDelete
    ? "deletion-progress-bar-fill"
    : "progress-bar-fill";
  var progressTextId = isDelete ? "deletion-progress-text" : "progress-text";

  var successGradient = isDelete
    ? "linear-gradient(90deg, #dc3545, #fd7e14)"
    : "linear-gradient(90deg, #28a745, #20c997)";
  var warningGradient = "linear-gradient(90deg, #ffc107, #fd7e14)";

  var actionText = isDelete ? "Deleted" : "Created";
  var completionText = isDelete ? "Deletion complete!" : "Process complete!";

  $("#" + progressBarId).css(
    "background",
    failed > 0 ? warningGradient : successGradient
  );
  $("#" + progressTextId).text(
    "✅ " +
      completionText +
      " " +
      actionText +
      " " +
      (total - failed) +
      " of " +
      total +
      " records."
  );

  // Remove progress bar after 5 seconds
  setTimeout(function () {
    $("#" + containerId).fadeOut(500, function () {
      $(this).remove();
    });
  }, 5000);
}

// Legacy function aliases for backward compatibility
function createDeletionProgressBar(total) {
  return createProgressBar(total, "delete");
}

// Updates progress bar during record deletion
function updateDeletionProgress(completed, total, failed, currentAction) {
  return updateProgress(completed, total, failed, currentAction, "delete");
}

// Completes progress bar after record deletion
function completeDeletionProgress(total, failed) {
  return completeProgress(total, failed, "delete");
}

/*********** Utility Functions **************/
// Helper function to log detailed API errors
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

// Helper function to filter candidates by interview status
function isSelectedToInterview(candidate) {
  var status = candidate.get(CONFIG.fields.candidateStatus);
  return status === "Selected to interview";
}

// Helper function to calculate expected record count
function calculateExpectedRecordCount() {
  var viewKey = CONFIG.views.candidates;
  var candidates = Knack.views[viewKey].model.data.models;
  var panelMembers = Knack.views[CONFIG.views.panelMembers].model.data.models;
  var interviewQuestions =
    Knack.views[CONFIG.views.questions].model.data.models;

  var selectedToInterviewCandidates = candidates.filter(isSelectedToInterview);

  return (
    selectedToInterviewCandidates.length *
    panelMembers.length *
    interviewQuestions.length
  );
}

/********************************************/
/*************** TPW Hire ****************/
/********************************************/

// Configuration object for view IDs and other constants
const CONFIG = {
  views: {
    candidates: "view_263", // interview_candidates
    panelMembers: "view_264", // interview_panel_members
    questions: "view_269", // interview_questions
    responses: "view_268", // interview_responses
    management: "view_253", // interview_management details
    manualResponses: "view_285", // "Add Manual Responses" button
  },
  api: {
    baseUrl: "https://api.knack.com/v1",
    scenes: {
      main: "scene_112",
      create: "scene_124",
    },
    views: {
      create: "view_286",
      list: "view_268",
    },
  },
  fields: {
    candidateStatus: "field_71", // Status field for candidates (e.g. "Selected to interview")
  },
  batchSize: 5,
  batchDelay: 1000,
};

// Add operation state tracking at the top level
var operationState = {
  isProcessing: false,
  lastOperationTime: 0,
  operationTimeout: 5000, // 5 second cooldown between operations
};

// Main scene render handler for interview management
$(document).on("knack-scene-render.scene_112", function () {
  /********************************************/
  /*********** INITIALIZATION & SETUP *********/
  /********************************************/

  // Refresh the interview responses view and update button state
  function refreshInterviewViews() {
    return new Promise(function (resolve) {
      // Listen for the view's render event
      $(document).one(
        "knack-view-render." + CONFIG.views.responses,
        function () {
          // Add a small delay to ensure data is processed
          setTimeout(resolve, 500);
        }
      );
      // Trigger the refresh
      Knack.views[CONFIG.views.responses].model.fetch();
    });
  }

  /********************************************/
  /*********** RECORD DELETION FUNCTIONS ******/
  /********************************************/

  // Delete all existing interview response records
  function deleteAllInterviewResponses() {
    return new Promise(function (resolve, reject) {
      console.log(
        "🗑️ Starting deletion of existing interview response records..."
      );

      // Get all existing records via API
      var apiUrl =
        CONFIG.api.baseUrl +
        "/scenes/" +
        CONFIG.api.scenes.main +
        "/views/" +
        CONFIG.api.views.list +
        "/records";

      $.ajax({
        type: "GET",
        url: apiUrl,
        headers: headers,
        data: {
          page: 1,
          rows_per_page: 1000, // Get all records (assuming less than 1000)
          "view-interview-details-admin_id":
            Knack.views[CONFIG.views.management].model.id,
        },
      })
        .then(function (response) {
          var recordsToDelete = response.records || [];
          console.log("Found " + recordsToDelete.length + " records to delete");

          // Initialize deletion progress bar if we have records to delete
          if (recordsToDelete.length > 0) {
            createDeletionProgressBar(recordsToDelete.length);
          }

          if (recordsToDelete.length === 0) {
            console.log("No records to delete");
            resolve(0);
            return;
          }

          // Delete records in batches
          deleteRecordsBatch(recordsToDelete, 0, [])
            .then(function (results) {
              var deletedCount = results.filter((r) => r.success).length;
              var failedCount = results.filter((r) => !r.success).length;

              console.log(
                "Deletion complete. Deleted: " +
                  deletedCount +
                  ", Failed: " +
                  failedCount
              );

              // Complete the deletion progress bar
              completeDeletionProgress(recordsToDelete.length, failedCount);

              resolve(deletedCount);
            })
            .catch(function (error) {
              console.error("Deletion failed:", error);
              reject(error);
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error(
            "❌ Failed to fetch records from " +
              CONFIG.api.scenes.main +
              "/" +
              CONFIG.api.views.list
          );
          logAPIError(jqXHR, textStatus, errorThrown);
        });
    });
  }

  // Delete records in batches
  function deleteRecordsBatch(records, startIndex, results) {
    return new Promise(function (resolve, reject) {
      var batchSize = CONFIG.batchSize;
      var endIndex = Math.min(startIndex + batchSize, records.length);
      var batchRecords = records.slice(startIndex, endIndex);

      if (batchRecords.length === 0) {
        resolve(results);
        return;
      }

      // Update progress bar for batch start
      updateDeletionProgress(
        startIndex,
        records.length,
        results.filter((r) => !r.success).length,
        "Processing batch " +
          Math.ceil(startIndex / batchSize + 1) +
          "/" +
          Math.ceil(records.length / batchSize) +
          "..."
      );

      // Create deletion promises for this batch
      var deletePromises = batchRecords.map(function (record) {
        return deleteInterviewResponse(record.id);
      });

      Promise.allSettled(deletePromises).then(function (batchResults) {
        var batchResultsFormatted = batchResults.map(function (result, index) {
          return {
            recordId: batchRecords[index].id,
            success: result.status === "fulfilled",
            error: result.status === "rejected" ? result.reason : null,
          };
        });

        results = results.concat(batchResultsFormatted);

        // Update progress after batch completion
        updateDeletionProgress(
          endIndex,
          records.length,
          results.filter((r) => !r.success).length,
          "Batch " +
            Math.ceil(startIndex / batchSize + 1) +
            "/" +
            Math.ceil(records.length / batchSize) +
            " complete"
        );

        // Continue with next batch after delay
        setTimeout(function () {
          deleteRecordsBatch(records, endIndex, results)
            .then(resolve)
            .catch(reject);
        }, CONFIG.batchDelay);
      });
    });
  }

  // Delete a single interview response record
  function deleteInterviewResponse(recordId) {
    return new Promise(function (resolve, reject) {
      var deleteUrl =
        CONFIG.api.baseUrl +
        "/scenes/" +
        CONFIG.api.scenes.main +
        "/views/" +
        CONFIG.api.views.list +
        "/records/" +
        recordId;

      $.ajax({
        type: "DELETE",
        url: deleteUrl,
        headers: headers,
      })
        .then(function (response) {
          console.log("✅ Deleted record " + recordId);
          resolve(response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error("❌ Failed to delete record " + recordId);
          logAPIError(jqXHR, textStatus, errorThrown);
          reject(new Error("Failed to delete record " + recordId));
        });
    });
  }

  /********************************************/
  /*********** RECORD CREATION FUNCTIONS ******/
  /********************************************/

  // Create a single interview response record
  function createInterviewResponse(payload, index, total) {
    return new Promise(function (resolve, reject) {
      var url =
        CONFIG.api.baseUrl +
        "/scenes/" +
        CONFIG.api.scenes.create +
        "/views/" +
        CONFIG.api.views.create +
        "/records";

      $.ajax({
        type: "POST",
        url: url,
        headers: headers,
        data: JSON.stringify(payload),
        contentType: "application/json",
      })
        .then(function (res) {
          console.log("✅ Created record " + (index + 1) + "/" + total);
          resolve(res);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error(
            "❌ Failed to create record " + (index + 1) + "/" + total
          );
          logAPIError(jqXHR, textStatus, errorThrown);
          reject({ payload: payload, error: jqXHR });
        });
    });
  }

  // Create all interview response records in batches
  function createAllInterviewResponses(payloads, batchSize = CONFIG.batchSize) {
    return new Promise(function (resolve, reject) {
      console.log("🔄 Starting creation of new records...");
      console.log("Total records to create:", payloads.length);

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
            setTimeout(function () {
              processBatch(endIndex);
            }, CONFIG.batchDelay);
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
              reject(new Error("Some records failed to create"));
            } else {
              resolve(createdRecords);
            }

            // Complete progress bar
            completeProgress(payloads.length, failedRecords.length);

            // Re-enable button
            enableGenerateButton();

            // Refresh views and update button state
            refreshInterviewViews()
              .then(function () {
                checkButtonState();
              })
              .catch(function (error) {
                console.error("Error refreshing views:", error);
              });
          }
        });
      }

      // Start processing from first batch
      processBatch(0);
    });
  }

  /********************************************/
  /******* DATA COLLECTION & PAYLOAD GEN ******/
  /********************************************/

  // Set auth and headers for API calls
  var knackUserToken = Knack.getUserToken();
  var headers = {
    "X-Knack-Application-Id": Knack.application_id,
    "X-Knack-REST-API-KEY": "knack",
    Authorization: knackUserToken,
    "content-type": "application/json",
  };

  // Function to generate interview response payloads
  function generateInterviewResponsePayloads() {
    console.log("=== Generating Interview Response Payloads ===");

    // Get all required data from Knack views
    var viewKey = CONFIG.views.candidates;
    var candidates = Knack.views[viewKey].model.data.models;
    var panelMembers = Knack.views[CONFIG.views.panelMembers].model.data.models;
    var interviewQuestions =
      Knack.views[CONFIG.views.questions].model.data.models;

    var selectedToInterviewCandidates = candidates.filter(
      isSelectedToInterview
    );

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

    // Generate all combinations of candidates × panel members × questions
    var payloads = [];

    // Triple nested loop to create all combinations
    selectedToInterviewCandidates.forEach(function (candidate) {
      panelMembers.forEach(function (panelMember) {
        interviewQuestions.forEach(function (question) {
          var payload = {
            // Connection fields - using IDs for relationships
            field_87: Knack.views[CONFIG.views.management].model.id,
            field_88: candidate.get("id") || candidate.id, // interview_candidate
            field_89: question.get("id") || question.id, // interview_question
            field_183: panelMember.get("id") || panelMember.id, // interview_panel_member
          };

          payloads.push(payload);
        });
      });
    });

    console.log("Generated", payloads.length, "interview response payloads");
    return payloads;
  }

  /********************************************/
  /************* EVENT HANDLERS ***************/
  /********************************************/

  // Initialize UI components
  addGenerateResponsesButton();
  checkButtonState();

  // Move click handler outside scene render
  $(document)
    .off("click", "#generate-responses-button")
    .on("click", "#generate-responses-button", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Check if we're already processing or in cooldown
      var now = Date.now();
      if (operationState.isProcessing) {
        console.log("⚠️ Operation already in progress, ignoring click");
        return false;
      }

      if (
        now - operationState.lastOperationTime <
        operationState.operationTimeout
      ) {
        console.log("⚠️ Operation cooldown in effect, ignoring click");
        return false;
      }

      console.log("🚀 Generate Responses button clicked!");

      // Get current button state
      var buttonState = checkButtonState();

      // Safety check in case buttonState is undefined
      if (!buttonState) {
        console.error("Button state is undefined, aborting operation");
        alert(
          "Error: Could not determine current state. Please refresh the page and try again."
        );
        return false;
      }

      var currentCount = buttonState.currentCount || 0;
      var expectedCount = buttonState.expectedCount || 0;
      var hasExistingRecords = buttonState.hasExistingRecords || false;

      // Get detailed counts for the breakdown
      var viewKey = CONFIG.views.candidates;
      var candidates = Knack.views[viewKey].model.data.models;
      var panelMembers =
        Knack.views[CONFIG.views.panelMembers].model.data.models;
      var interviewQuestions =
        Knack.views[CONFIG.views.questions].model.data.models;
      var selectedToInterviewCandidates = candidates.filter(
        isSelectedToInterview
      );

      // Build detailed confirmation message
      var confirmationText = "=== Record Creation Summary ===\n\n";

      if (hasExistingRecords) {
        confirmationText += "⚠️  REGENERATE MODE ⚠️\n\n";
        confirmationText += "This will:\n";
        confirmationText +=
          "1. DELETE all " +
          currentCount +
          " existing interview response records\n";
        confirmationText += "2. CREATE new records as follows:\n\n";
      } else {
        confirmationText += "This will create new records as follows:\n\n";
      }

      // Add detailed breakdown
      confirmationText +=
        "Selected Candidates: " + selectedToInterviewCandidates.length + "\n";
      confirmationText += "Panel Members: " + panelMembers.length + "\n";
      confirmationText +=
        "Interview Questions: " + interviewQuestions.length + "\n\n";

      // Show the calculation
      confirmationText += "Calculation:\n";
      confirmationText +=
        selectedToInterviewCandidates.length + " candidates × ";
      confirmationText += panelMembers.length + " panel members × ";
      confirmationText += interviewQuestions.length + " questions = ";
      confirmationText += expectedCount + " total records\n\n";

      if (hasExistingRecords) {
        confirmationText += "⚠️  This action cannot be undone! ⚠️\n\n";
      }

      confirmationText += "Are you sure you want to proceed?";

      // Show confirmation dialog for safety
      var confirmation = confirm(confirmationText);

      if (confirmation) {
        // Set processing state
        operationState.isProcessing = true;
        operationState.lastOperationTime = now;

        console.log("✅ User confirmed - Starting process...");

        // Disable button during execution
        disableGenerateButton();

        // Generate payloads
        var interviewResponsePayloads = generateInterviewResponsePayloads();

        if (hasExistingRecords) {
          // Regenerate mode: delete first, then create
          console.log("🔄 Starting regeneration process...");

          deleteAllInterviewResponses()
            .then(function (deletedCount) {
              // Refresh views to reflect deletions
              refreshInterviewViews();

              // Start creation after small delay
              setTimeout(function () {
                createAllInterviewResponses(interviewResponsePayloads).finally(
                  function () {
                    // Reset processing state when complete
                    operationState.isProcessing = false;
                  }
                );
              }, 1000);
            })
            .catch(function (error) {
              console.error("❌ Deletion failed:", error);
              alert(
                "Failed to delete existing records. Please try again or contact support."
              );

              // Re-enable button and reset state on error
              enableGenerateButton();
              operationState.isProcessing = false;
            });
        } else {
          // Normal generation mode: just create
          console.log("🔄 Starting record creation...");
          createAllInterviewResponses(interviewResponsePayloads).finally(
            function () {
              // Reset processing state when complete
              operationState.isProcessing = false;
            }
          );
        }
      } else {
        console.log("❌ User cancelled operation");
      }
    });
});
