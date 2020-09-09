$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("Attachment");
});

// Hide Knack generated "Available Assignments" table, create and add table that condenses
// sign up for multiple officer_assignments into one button
$(document).on("knack-view-render.view_466", function (event, view, data) {
  // Must be updated/checked when moving this code to a new instance
  var appSpecifics = {
    knackAppId: "5dc2ec50bbcb360016e338e1",
    apiTableScene: "scene_238", // Officer assignments table API scene
    apiTableView: "view_487", // Officer assignments table API view
    availableAssignmentsView: "view_466", // Where to insert new table
    noOfficerAssignedId: "5ebef4d0682bfc0015c9e0f4" // For conditional styles based on officer assigned
  };

  // officer_assignment object fields
  var fields = {
    dateField: "field_154",
    timeField: "field_139",
    locationFieldRaw: "field_656_raw",
    assignedOfficerFieldRaw: "field_704_raw",
    assignedOfficerField: "field_704",
    officerShiftField: "field_724",
    assignmentDateTimeField: "field_133",
    unassignedOfficerField: "field_669",
    addToMyAssignmentsField: "field_663",
    dateTimeOfCancellationField: "field_712"
  };

  // Cache all officer_assignments to traverse with pagination
  var completeRecords = null;

  // Cache records to display on each page
  var recordsInPage = null;

  // Keep track of pagination details
  var currentPage = 1;
  var recordsPerPage = 10;
  var numberOfPages = null;
  var currentRangeStart = 1;
  var currentRangeEnd = currentPage - 1 + recordsPerPage;

  // Filter for records for assignments time windows
  var filters = {
    all: [
      {
        field: fields.dateField,
        operator: "is today or after"
      },
      {
        field: fields.assignmentDateTimeField,
        operator: "is not blank"
      }
    ],
    week: [
      {
        value: "",
        text: "Next Week",
        operator: "is during the next",
        field: fields.dateField,
        type: "weeks",
        range: "1"
      }
    ],
    month: [
      {
        field: fields.dateField,
        operator: "is during the next",
        text: "Next Month",
        type: "months",
        range: "1"
      }
    ]
  };

  // Endpoints
  var getUrl =
    "https://api.knack.com/v1/pages/" +
    appSpecifics.apiTableScene +
    "/views/" +
    appSpecifics.apiTableView +
    "/records";

  var putUrl =
    "https://api.knack.com/v1/pages/" +
    appSpecifics.apiTableScene +
    "/views/" +
    appSpecifics.apiTableView +
    "/records/";

  // Get user auth for get request (API view is private) and set req headers
  var user = Knack.getUserToken();
  var userId = Knack.getUserAttributes().id;

  var headers = {
    "X-Knack-Application-ID": appSpecifics.knackAppId,
    Authorization: user,
    "content-type": "application/json"
  };

  function removeKnackTable() {
    $(
      "#" + appSpecifics.availableAssignmentsView + "> div.kn-records-nav"
    ).remove();
    $(
      "#" + appSpecifics.availableAssignmentsView + "> div.kn-table-wrapper"
    ).remove();
  }

  // Remove Knack generated table that we are replacing and request records
  removeKnackTable();

  // Setup pagination
  function initializePagination(records) {
    currentPage = 1;
    numberOfPages = Math.ceil(records.length / recordsPerPage);

    var initialPageRecords = records.slice(0, recordsPerPage);
    return initialPageRecords;
  }

  // Request and set initial records
  function requestRecords(filters) {
    var url =
      getUrl +
      "?filters=" +
      encodeURIComponent(JSON.stringify(filters)) +
      "&rows_per_page=1000";

    // Show spinner while fetching officer_assignment records
    $("#" + appSpecifics.availableAssignmentsView + "> div.view-header").append(
      `<span id="assignment-spinner" class="icon">&nbsp;<i class="fa fa-circle-o-notch fa-spin"></i></span>`
    );

    // Request officer_assignment records
    $.ajax({
      url: url,
      type: "GET",
      headers: headers,
      success: function (res) {
        records = res.records;

        // Don't process records if there are none
        if (records.length === 0) {
          $("#shift-table-body").children().remove();
          appendTableWithNoRecordsMessage();
          $("#assignment-spinner").remove();
          completeRecords = null;
          recordsInPage = null;
          return;
        }

        completeRecords = groupRecordsIntoAssignments(records);
        recordsInPage = initializePagination(completeRecords);
        buildAndAppendShiftSection(recordsInPage);
        prependShiftTableWithPagination();
        prependPaginationWithTimeFilters();
        addOpenShiftButtonClickHandlers();
        addCancelMyShiftButtonClickHandlers();

        // Remove spinner
        $("#assignment-spinner").remove();
      }
    });
  }

  // Group officer assignments into shifts
  function groupRecordsIntoAssignments(records) {
    // Group records by Officer Shift Label
    var groupedRecords = {};

    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var officerShift = record[fields.officerShiftField];

      if (groupedRecords[officerShift]) {
        groupedRecords[officerShift].push(record);
      } else {
        groupedRecords[officerShift] = [record];
      }
    }

    return Object.values(groupedRecords);
  }

  function buildAndAppendShiftSection(shiftRecords) {
    // Clear the table in case we need to repopulate for pagination
    $("#shift-table-body").children().remove();

    function buildShift(records) {
      var shiftsHTML = ``;

      records.forEach(function (shiftRecords) {
        shiftsHTML += `
          <tr class="kn-table-group kn-group-level-1">
            <td class="shift-header" colspan="4">${
              shiftRecords[0][fields.officerShiftField]
            }</td>
          </tr>`;

        // Condense each set of officer_assignments that make up a shift together
        // First dimension is shifts of officer_assignments (grouped together for sign up)
        // Second dimension is array of officer_assignments within shift
        // [A,A,B,B,C,C] => [[A,B,C], [A,B,C]]

        var buttonRecords = [];

        if (shiftRecords.length !== 0) {
          var currentArrayPosition = 0;
          var currentSubarrayPosition = 0;

          function isSameTime(record1, record2) {
            return record1[fields.timeField] === record2[fields.timeField];
          }

          for (let i = 0; i < shiftRecords.length; i++) {
            if (i === 0) {
              buttonRecords.push([shiftRecords[i]]);
              currentArrayPosition++;
            } else if (
              isSameTime(
                shiftRecords[i],
                buttonRecords[currentArrayPosition - 1][currentSubarrayPosition]
              ) &&
              currentSubarrayPosition === 0
            ) {
              buttonRecords.push([shiftRecords[i]]);
              currentArrayPosition++;
            } else if (
              !isSameTime(
                shiftRecords[i],
                buttonRecords[currentArrayPosition - 1][currentSubarrayPosition]
              )
            ) {
              currentSubarrayPosition++;
              currentArrayPosition = 0;
              buttonRecords[currentArrayPosition].push(shiftRecords[i]);
              currentArrayPosition++;
            } else if (
              isSameTime(
                shiftRecords[i],
                buttonRecords[currentArrayPosition - 1][currentSubarrayPosition]
              ) &&
              currentSubarrayPosition > 0
            ) {
              buttonRecords[currentArrayPosition].push(shiftRecords[i]);
              currentArrayPosition++;
            }
          }
        }

        buttonRecords[0].forEach(function (record) {
          shiftsHTML += `
            <tr>
              <td
                style="padding-left: 20px;"
                data-column-index="1"
              >
                <span class="col-1">
                  ${record[fields.timeField]}
                </span>
              </td>
              <td data-column-index="2">
                <span class="col-2">
                  <span>${
                    record[fields.locationFieldRaw][0].identifier.split(
                      " - "
                    )[0]
                  }</span>
                </span>
              </td>
              <td data-column-index="3">
                <span class="col-3">
                  <span
                    >${
                      record[fields.locationFieldRaw][0].identifier.split(
                        " - "
                      )[2]
                    }</span
                  >
                </span>
              </td>
            </tr>
            `;
        });

        // Add sign up buttons
        shiftsHTML += `
          <tr>
            <td style="padding-top: 16px;" colspan="4">
          `;

        function setButtonStatus(
          isMyAssignment,
          isOtherOfficerAssignment,
          isNotAssigned
        ) {
          if (isNotAssigned) {
            return "open-shift-button";
          } else if (isMyAssignment) {
            return "my-shift-button";
          } else if (isOtherOfficerAssignment) {
            return "is-disabled";
          }
        }

        // For each subarray, add one button
        buttonRecords.forEach(function (shift, i) {
          // Build the button id from shift officer assignment ids for use by sign up click handler
          const buttonId = shift
            .map(function (assignment) {
              return assignment.id;
            })
            .join("-");

          var assignmentOfficerId =
            shift[0][fields.assignedOfficerFieldRaw][0].id;
          var isMyAssignment = assignmentOfficerId === userId;
          var isOtherOfficerAssignment =
            assignmentOfficerId !== userId &&
            assignmentOfficerId !== appSpecifics.noOfficerAssignedId;
          var isNotAssigned =
            assignmentOfficerId === appSpecifics.noOfficerAssignedId;

          shiftsHTML += `
            <span
            class="kn-button ${setButtonStatus(
              isMyAssignment,
              isOtherOfficerAssignment,
              isNotAssigned
            )}"
            style="margin: 0px 10px 10px 0px;"
            id="${buttonId}"
            >
              <span class="icon">
                ${
                  (isNotAssigned && `<i class="fa fa-plus-square"></i>`) ||
                  (isOtherOfficerAssignment &&
                    `<i class="fa fa-check-square-o"></i>`) ||
                  (isMyAssignment && `<i class="fa fa-times-circle"></i>`)
                }
              </span>
              <span>
              ${
                (isNotAssigned && `Sign up - Officer ${i + 1}`) ||
                (isOtherOfficerAssignment && `Filled - Officer ${i + 1}`) ||
                (isMyAssignment && `Cancel My Sign Up`)
              }
             </span>
            </span>
            `;
        });

        shiftsHTML += `
            </td>
          </tr>`;
      });

      return shiftsHTML;
    }

    var shiftSection = buildShift(shiftRecords);
    $("#shift-table-body").append(shiftSection);
  }

  // Add button handler to associate officer assignment records with logged in user
  function addOpenShiftButtonClickHandlers() {
    var buttons = $(`.open-shift-button`);
    buttons.each(function () {
      var thisButton = $(this);
      var thisButtonIcon = thisButton.find("i");

      // Remove any existing click handler
      thisButton.off("click");

      thisButton.click(function () {
        // Get officer_assignment record ids
        var idsToAssignCurrentUser = thisButton.attr("id").split("-");
        thisButton.removeClass("open-shift-button");
        thisButtonIcon
          .removeClass("fa-plus-square")
          .addClass("fa-circle-o-notch fa-spin");

        idsToAssignCurrentUser.forEach(function (recordId) {
          $.ajax({
            url: putUrl + recordId,
            type: "PUT",
            data: JSON.stringify({ [fields.assignedOfficerField]: userId }),
            headers: headers,
            success: function (res) {
              thisButton.addClass("my-shift-button");
              thisButton[0].children[1].innerText = "Cancel My Sign Up";
              thisButtonIcon
                .removeClass("fa-circle-o-notch fa-spin")
                .addClass("fa-times-circle");

              addCancelMyShiftButtonClickHandlers();

              $.ajax({
                url: putUrl + recordId,
                type: "PUT",
                data: JSON.stringify({
                  action_link_index: 0,
                  id: recordId
                }),
                headers: headers,
                success: function (res) {
                  console.log(res);
                }
              });
            }
          });
        });
      });
    });
  }

  function addCancellationModal(
    recordIdsString,
    buttonNumber,
    thisButton,
    thisButtonIcon
  ) {
    var cancellationForm = `
    <div
    id="kn-modal-bg-0"
    class="kn-modal-bg cancellation-modal"
    style="top: 0px; z-index: 2000; display: block"
    >
      <div class="kn-modal default" style="display: block">
        <header class="modal-card-head">
          <h1 class="modal-card-title">Remove From Today's Assignments</h1>
          <button class="delete close-cancellation-modal"></button>
        </header>
        <section class="modal-card-body kn-page-modal" id="kn-page-modal-0">
          <div class="kn-scene kn-container" id="kn-scene_236">
            <div class="kn-form kn-view view_484" id="view_484">
              <form id="cancellation-form">
                <ul class="kn-form-group columns kn-form-group-1">
                  <li class="kn-form-col column is-constrained">
                    <div
                      class="kn-input kn-input-short_text control"
                      id="kn-input-field_671"
                      data-input-id="field_671"
                    >
                      <label for="field_671" class="label kn-label"
                        ><span>Reason for Cancellation</span></label
                      >
                      <div class="control">
                        <input
                          class="input"
                          id="field_671"
                          name="field_671"
                          type="text"
                          value=""
                        />
                      </div>
                      <p class="kn-instructions" style="display: none"></p>
                    </div>
                    <div
                      class="kn-input kn-input-boolean control"
                      id="kn-input-field_711"
                      data-input-id="field_711"
                    >
                      <label for="field_711" class="label kn-label"
                        ><span>Remove From My Assignments</span></label
                      >
                      <div class="control">
                        <label class="option checkbox"
                          ><input
                            type="checkbox"
                            name="field_711"
                            value="Yes"
                          />&nbsp;I have read the SEU Cancellation Policy and
                          understand that by cancelling this assignment with less
                          than 48 hours notice I am responsible for finding another
                          Officer to work the shift or risk losing eligibility for
                          SEU assignments.</label
                        >
                      </div>
                      <input name="key" type="hidden" value="field_711" />
                      <p class="kn-instructions">
                        <a
                          href="https://docs.google.com/document/d/1cODXt1FuJVHAmiSg23hdcQDrfcFaiKhUmVOiFxgJ-4g/edit?usp=sharing"
                          >Cancellation Policy</a
                        >
                      </p>
                    </div>
                  </li>
                </ul>
                <div class="kn-submit">    
                  <button class="kn-button is-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
    `;

    // Append cancellation modal and handle form submit
    $(".kn-content").append(cancellationForm);
    var thisForm = $("#cancellation-form");
    thisForm.off("submit");
    thisForm.on("submit", function (e) {
      e.preventDefault();

      // Collect form values and create payload for officer_assignment records
      var formAllFields = thisForm.serializeArray();
      var neededFields = formAllFields.reduce(function (acc, field) {
        if (field.name.includes("field")) {
          return { ...acc, [field.name]: field.value };
        } else {
          return acc;
        }
      }, {});

      // Start spinner
      $("#kn-loading-spinner").css("display", "block");

      // Submit PUT requests to modify each officer_assignment ID stored in button id attribute
      var idsToAssignCurrentUser = recordIdsString.split("-");

      var now = new Date().toLocaleString();

      idsToAssignCurrentUser.forEach(function (recordId) {
        $.ajax({
          url: putUrl + recordId,
          type: "PUT",
          data: JSON.stringify({
            ...neededFields, // Reason for cancellation and Remove from My Assignments fields from form
            [fields.assignedOfficerField]: appSpecifics.noOfficerAssignedId, // Add unassigned officer ID
            [fields.unassignedOfficerField]: userId, // Add current user as unassigned officer to track who cancelled
            [fields.addToMyAssignmentsField]: "No", // Add to My Assignments
            [fields.dateTimeOfCancellationField]: now // DateTime of cancellation
          }),
          headers: headers,
          success: function (res) {
            // Switch button associated with these records back to a Sign Up button
            thisButton
              .removeClass("my-shift-button")
              .addClass("open-shift-button");
            thisButton[0].children[1].innerText = `Sign Up - Officer ${buttonNumber}`;
            thisButtonIcon
              .removeClass("fa-times-circle")
              .addClass("fa-plus-square");
            addOpenShiftButtonClickHandlers();

            // Remove modal and stop spinner
            $("#kn-modal-bg-0").remove();
            $("#kn-loading-spinner").css("display", "none");
          }
        });
      });
    });

    // Add click handler to close modal (X) button
    var closeModalButton = $(".close-cancellation-modal");
    closeModalButton.off("click");
    closeModalButton.click(function () {
      $(".cancellation-modal").remove();
    });
  }

  function addCancelMyShiftButtonClickHandlers() {
    var buttons = $(`.my-shift-button`);
    buttons.each(function () {
      var thisButton = $(this);
      var thisButtonIcon = thisButton.find("i");
      // Use this to display the Officer number in the button that corresponds with its position in the UI
      var buttonNumber = thisButton.index() + 1;

      // Remove any existing click handler
      thisButton.off("click");

      thisButton.click(function () {
        var recordIdsString = thisButton.attr("id");
        addCancellationModal(
          recordIdsString,
          buttonNumber,
          thisButton,
          thisButtonIcon
        );
      });
    });
  }

  // Add button handler to associate officer assignment records with logged in user
  function addPaginationClickHandlers(prevId, nextId) {
    var prev = $(`#${prevId}`);
    var next = $(`#${nextId}`);

    prev.click(function () {
      if (currentPage === 1) {
        return;
      }

      currentPage--;
      currentRangeStart -= recordsPerPage;
      if (currentPage === numberOfPages - 1) {
        currentRangeEnd = currentRangeStart + recordsPerPage - 1;
      } else {
        currentRangeEnd -= recordsPerPage;
      }

      var prevPageRecords = completeRecords.slice(
        currentRangeStart - 1,
        currentRangeEnd
      );
      var shifts = buildAndAppendShiftSection(prevPageRecords);
      $("#shift-table-body").append(shifts);
      prependShiftTableWithPagination();
      addOpenShiftButtonClickHandlers();
    });

    next.click(function () {
      if (currentPage === numberOfPages) {
        return;
      }

      currentPage++;
      currentRangeStart += recordsPerPage;
      if (currentPage === numberOfPages) {
        currentRangeEnd = completeRecords.length;
      } else {
        currentRangeEnd += recordsPerPage;
      }

      var nextPageRecords = completeRecords.slice(
        currentRangeStart - 1,
        currentRangeEnd
      );
      var shifts = buildAndAppendShiftSection(nextPageRecords);
      $("#shift-table-body").append(shifts);
      prependShiftTableWithPagination();
      addOpenShiftButtonClickHandlers();
    });
  }

  // Update pagination values and add control click handlers
  function prependShiftTableWithPagination() {
    if ($(".pagination-controls").length) {
      $(".pagination-controls").remove();
    }

    var paginationControls = `
      <div class="level pagination-controls" style="margin-bottom: .75em;">
        <div class="level-left">
          <div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing</span> ${currentRangeStart}-${Math.min(
      currentRangeEnd,
      completeRecords.length
    )}
            <span class="light">of</span> ${completeRecords.length}
          </div>
        </div>
        <div class="kn-pagination level-right">
          <div class="kn-total-pages">${currentPage} of ${numberOfPages}</div>
          <div class="pagination-arrows">
            <span class="icon" id="prev-arrow">
              <i class="fa fa-chevron-left"></i>
            </span>
            <span class="icon" id="next-arrow">
              <i class="fa fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>`;

    $(".assignments-table").before(paginationControls);
    addPaginationClickHandlers("prev-arrow", "next-arrow");
  }

  // Add time filters once, add click handlers to add filters to record request and handle active/inactive button status
  function prependPaginationWithTimeFilters() {
    if ($("#time-filter-buttons").length) {
      return;
    }

    var filterMenu = `
      <div class="js-filter-menu tabs is-toggle is-flush">
        <ul id="time-filter-buttons">
          <li class="is-active" id="all">
            <a>
              <span>All</span>
            </a>
          </li>
          <li id="week">
            <a>
              <span>Next Week</span>
            </a>
          </li>
          <li id="month">
            <a>
              <span>Next Month</span>
            </a>
            </li>
         </ul>
      </div>`;

    $(".pagination-controls")
      .before(filterMenu)
      .ready(function () {
        $("#time-filter-buttons")
          .children()
          .each(function () {
            // Request records with matching time filter on click
            $(this).click(function () {
              var clickedFilterButtonId = $(this).attr("id");
              requestRecords(filters[clickedFilterButtonId]);

              // Add/remove active button status
              $("#time-filter-buttons")
                .children()
                .each(function () {
                  var thisFilterButtonId = $(this).attr("id");
                  if (thisFilterButtonId === clickedFilterButtonId) {
                    $(this).addClass("is-active");
                  } else {
                    $(this).removeClass("is-active");
                  }
                });
            });
          });
      });
  }

  function appendTableWithNoRecordsMessage() {
    if ($("#no-records-msg").length) {
      return;
    }

    var noRecordsRow = `
      <tr class="kn-table-group kn-group-level-1" id="no-records-msg">
        <td colspan="4">No assignments available</td>
      </tr>  
    `;

    $("#shift-table-body").append(noRecordsRow);
  }

  // Table to receive formatted table body
  var recordsTable = `
    <div class="assignments-table">
      <table class="kn-table kn-table-table is-bordered">
        <thead>
          <tr>
            <th>
              <span class="table-fixed-label">
                <span>Time</span>
              </span>
            </th>
            <th>
              <span class="table-fixed-label">
                <span>Sector</span>
              </span>
            </th>
            <th>
              <span class="table-fixed-label">
                <span>Location</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody id="shift-table-body">
        </tbody>
      </table>
    </div>`;

  // Append table, then request records and append shifts to table body
  $("#" + appSpecifics.availableAssignmentsView + "> div.view-header")
    .after(recordsTable)
    .ready(function () {
      requestRecords(filters.all);
    });
});
