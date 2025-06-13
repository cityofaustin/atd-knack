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
/*************** TPW Hire ****************/
/********************************************/
// TPW Hire Generate Responses Page
$(document).on("knack-scene-render.scene_112", function () {
  // Create "Execute Script" button
  function addGenerateResponsesButton() {
    // Check if button already exists to avoid duplicates
    if ($("#generate-responses-button").length === 0) {
      // Create the button with same styling as "Generate Responses" button
      var generateResponsesButtonHtml = $(
        '<a id="generate-responses-button" class="kn-link kn-link-2 kn-link-page kn-button" href="javascript:void(0)">' +
          '<span class="icon is-small"><i class="fa fa-cogs"></i></span>' +
          "<span>Generate Responses</span>" +
          "</a>"
      );

      // Find existing "Add Manual Reponses" button and add our button next to it
      var addManualResponsesButton = $('a[href*="add-reponses"]');
      if (addManualResponsesButton.length > 0) {
        generateResponsesButtonHtml.insertAfter(addManualResponsesButton);
        generateResponsesButtonHtml.css("margin-left", "10px"); // Add some spacing
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

  console.log(interviewResponsePayloads);

  // =================================================================
  // BUTTON STATE MANAGEMENT
  // =================================================================

  // Function to check if Execute Script button should be disabled
  function checkButtonState() {
    var currentInterviewResponses = 0;

    // Safely get the total records count
    try {
      if (
        Knack.views["view_268"] &&
        Knack.views["view_268"].model &&
        Knack.views["view_268"].model.data &&
        Knack.views["view_268"].model.data.total_records !== undefined
      ) {
        currentInterviewResponses =
          Knack.views["view_268"].model.data.total_records;
        console.log(
          "✅ Successfully got total_records:",
          currentInterviewResponses
        );
      } else {
        console.warn(
          "Could not access total_records from view_268, defaulting to 0"
        );
        console.log("Debug info:", {
          hasView: !!Knack.views["view_268"],
          hasModel: !!(
            Knack.views["view_268"] && Knack.views["view_268"].model
          ),
          hasData: !!(
            Knack.views["view_268"] &&
            Knack.views["view_268"].model &&
            Knack.views["view_268"].model.data
          ),
          totalRecords:
            Knack.views["view_268"] &&
            Knack.views["view_268"].model &&
            Knack.views["view_268"].model.data
              ? Knack.views["view_268"].model.data.total_records
              : "N/A",
        });
      }
    } catch (error) {
      console.error("Error accessing view data:", error);
      currentInterviewResponses = 0;
    }

    console.log("Current interview responses:", currentInterviewResponses);

    // Use view data for count and return the result
    return updateButtonWithCount(currentInterviewResponses);
  }

  // Helper function to update button with count
  function updateButtonWithCount(currentInterviewResponses) {
    var expectedRecords = interviewResponsePayloads.length;
    var hasExistingRecords = currentInterviewResponses > 0;

    console.log("=== Button State Check ===");
    console.log("Current interview responses:", currentInterviewResponses);
    console.log("Expected records to create:", expectedRecords);
    console.log("Has existing records:", hasExistingRecords);

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

      // Add warning message about deletion
      if ($("#regenerate-warning-message").length === 0) {
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
        $generateResponsesButton.after(warningHtml);
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

    // Check button state after refresh (with small delay to ensure data is loaded)
    setTimeout(function () {
      checkButtonState();
    }, 500);
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
      '<span><i class="fa fa-check-circle" style="color: #28a745;"></i> Success: <span id="success-count">0</span></span>' +
      '<span><i class="fa fa-times-circle" style="color: #dc3545;"></i> Failed: <span id="failed-count">0</span></span>' +
      '<span><i class="fa fa-gears" style="color: #6c757d;"></i> Remaining: <span id="remaining-count">' +
      total +
      "</span></span>" +
      "</div>" +
      "</div>";

    // Insert progress bar after execute button
    $("#generate-responses-button").after(progressBarHtml);
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
  // BULK RECORD DELETION FUNCTIONS
  // =================================================================

  // Function to delete all existing interview response records
  function deleteAllInterviewResponses() {
    return new Promise(function (resolve, reject) {
      console.log(
        "🗑️ Starting deletion of existing interview response records..."
      );

      // Get all existing records via API
      var apiUrl =
        "https://api.knack.com/v1/scenes/scene_112/views/view_268/records";

      console.log("🔍 Fetching records from:", apiUrl);
      console.log(
        "🔍 Note: Using creation scene/view (scene_124/view_286) for consistency"
      );
      console.log("🔍 Using headers:", headers);

      $.ajax({
        type: "GET",
        url: apiUrl,
        headers: headers,
        data: {
          page: 1,
          rows_per_page: 1000, // Get all records (assuming less than 1000)
          "view-interview-details-admin_id": Knack.views["view_253"].model.id,
        },
      })
        .then(function (response) {
          console.log("📋 Full API response:", response);

          var recordsToDelete = response.records || [];
          console.log("Found " + recordsToDelete.length + " records to delete");

          // Log sample records if any exist
          if (recordsToDelete.length > 0) {
            console.log("Sample record structure:", recordsToDelete[0]);
          } else {
            console.log("⚠️ No records found in response");
            console.log("Response keys:", Object.keys(response));

            // Check if records might be in a different property
            if (response.data && Array.isArray(response.data)) {
              recordsToDelete = response.data;
              console.log(
                "✅ Found records in response.data:",
                recordsToDelete.length
              );
            } else if (response.models && Array.isArray(response.models)) {
              recordsToDelete = response.models;
              console.log(
                "✅ Found records in response.models:",
                recordsToDelete.length
              );
            }
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
              resolve(deletedCount);
            })
            .catch(function (error) {
              console.error("Deletion failed:", error);
              reject(error);
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error("❌ Failed to fetch records from scene_124/view_286");
          logAPIError(jqXHR, textStatus, errorThrown);

          // Fallback: try the original view (scene_112/view_268)
          console.log("🔄 Trying fallback: scene_112/view_268");
          var fallbackUrl =
            "https://api.knack.com/v1/scenes/scene_112/views/view_268/records";

          $.ajax({
            type: "GET",
            url: fallbackUrl,
            headers: headers,
            data: {
              page: 1,
              rows_per_page: 1000,
            },
          })
            .then(function (response) {
              console.log("📋 Fallback API response:", response);

              var recordsToDelete =
                response.records || response.data || response.models || [];
              console.log(
                "Found " +
                  recordsToDelete.length +
                  " records to delete (fallback)"
              );

              if (recordsToDelete.length === 0) {
                console.log("No records to delete (fallback)");
                resolve(0);
                return;
              }

              // Delete records in batches
              deleteRecordsBatch(recordsToDelete, 0, [])
                .then(function (results) {
                  var deletedCount = results.filter((r) => r.success).length;
                  var failedCount = results.filter((r) => !r.success).length;

                  console.log(
                    "Deletion complete (fallback). Deleted: " +
                      deletedCount +
                      ", Failed: " +
                      failedCount
                  );
                  resolve(deletedCount);
                })
                .catch(function (error) {
                  console.error("Deletion failed (fallback):", error);
                  reject(error);
                });
            })
            .fail(function (jqXHR2, textStatus2, errorThrown2) {
              console.error("❌ Fallback also failed:");
              logAPIError(jqXHR2, textStatus2, errorThrown2);
              reject(
                new Error(
                  "Failed to fetch records for deletion (both endpoints failed)"
                )
              );
            });
        });
    });
  }

  // Helper function to delete records in batches
  function deleteRecordsBatch(records, startIndex, results) {
    return new Promise(function (resolve, reject) {
      var batchSize = 5;
      var endIndex = Math.min(startIndex + batchSize, records.length);
      var batchRecords = records.slice(startIndex, endIndex);

      if (batchRecords.length === 0) {
        resolve(results);
        return;
      }

      console.log(
        "Deleting batch " +
          Math.ceil(startIndex / batchSize + 1) +
          " (" +
          (startIndex + 1) +
          "-" +
          endIndex +
          " of " +
          records.length +
          ")"
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

        // Continue with next batch after delay
        setTimeout(function () {
          deleteRecordsBatch(records, endIndex, results)
            .then(resolve)
            .catch(reject);
        }, 1000);
      });
    });
  }

  // Function to delete a single interview response record
  function deleteInterviewResponse(recordId) {
    return new Promise(function (resolve, reject) {
      // Try the same scene/view as we use for creation (scene_124/view_286)
      var deleteUrl =
        "https://api.knack.com/v1/scenes/scene_112/views/view_268/records/" +
        recordId;

      console.log("🗑️ Deleting record:", recordId, "from:", deleteUrl);

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

  // =================================================================
  // BULK RECORD CREATION FUNCTIONS
  // =================================================================

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

          // Re-enable button
          $("#generate-responses-button")
            .removeClass("is-loading")
            .prop("disabled", false);

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
  addGenerateResponsesButton();

  // Check initial button state
  checkButtonState();

  // Add click handler for the Generate Responses button
  $(document).on("click", "#generate-responses-button", function (e) {
    e.preventDefault();
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
    var hasExistingRecords = buttonState.hasExistingRecords || false;

    // Build confirmation message based on whether we have existing records
    var confirmationText;
    if (hasExistingRecords) {
      confirmationText =
        "⚠️  REGENERATE MODE ⚠️\n\n" +
        "This will:\n" +
        "1. DELETE all " +
        currentCount +
        " existing interview response records\n" +
        "2. CREATE " +
        interviewResponsePayloads.length +
        " new interview response records\n\n" +
        "New records breakdown:\n" +
        "- Candidates: " +
        selectedToInterviewCandidates.length +
        "\n" +
        "- Panel Members: " +
        panelMembers.length +
        "\n" +
        "- Questions: " +
        interviewQuestions.length +
        "\n\n" +
        "⚠️  This action cannot be undone! ⚠️\n\n" +
        "Are you sure you want to proceed?";
    } else {
      confirmationText =
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
    }

    // Show confirmation dialog for safety
    var confirmation = confirm(confirmationText);

    if (confirmation) {
      console.log("✅ User confirmed - Starting process...");

      // Disable button during execution
      $("#generate-responses-button")
        .addClass("is-loading")
        .prop("disabled", true);

      if (hasExistingRecords) {
        // Regenerate mode: delete first, then create
        console.log("🔄 Starting regeneration process...");

        deleteAllInterviewResponses()
          .then(function (deletedCount) {
            console.log(
              "✅ Deletion complete. Deleted " + deletedCount + " records."
            );
            console.log("🔄 Starting creation of new records...");

            // Refresh views to reflect deletions
            refreshInterviewViews();

            // Start creation after small delay
            setTimeout(function () {
              createAllInterviewResponses(interviewResponsePayloads);
            }, 1000);
          })
          .catch(function (error) {
            console.error("❌ Deletion failed:", error);
            alert(
              "Failed to delete existing records. Please try again or contact support."
            );

            // Re-enable button
            $("#generate-responses-button")
              .removeClass("is-loading")
              .prop("disabled", false);
          });
      } else {
        // Normal generation mode: just create
        console.log("🔄 Starting record creation...");
        createAllInterviewResponses(interviewResponsePayloads);
      }

      // Re-enable button after timeout (backup in case something goes wrong)
      setTimeout(function () {
        $("#generate-responses-button")
          .removeClass("is-loading")
          .prop("disabled", false);
      }, 60000); // 1 minute timeout
    } else {
      console.log("❌ User cancelled operation");
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
