$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("Attachment");
});

// #### Officer Assignments (batch officer_assignments workflows) ####
// #### Sign up page and My Assignments page ####

// ### App Specific Attributes ###
// Must be updated/checked when moving this code to a new instance
var appSpecifics = {
  knackAppId: "5dc2ec50bbcb360016e338e1",
  apiTableScene: "scene_238", // Officer assignments table API scene
  apiTableView: "view_487", // Officer assignments table API view
  availableAssignmentsView: "view_466", // Insert new table
  todayAssignmentsView: "view_447", // Insert new table
  futureAssignmentsView: "view_439", // Insert new table
  startButtonView: "view_449", // Assignment Details view
  endButtonView: "view_450", // Assignment Details view
  noOfficerAssignedId: "5ebef4d0682bfc0015c9e0f4", // For conditional styles based on officer assigned
  assignmentDetailsTimes: "view_538" // Assignment Details view
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
  dateTimeOfCancellationField: "field_712",
  assignmentStatus: "field_584",
  startTime: "field_560",
  endTime: "field_561",
  observationsField: "field_734"
};

// Shared code
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

var userId = Knack.getUserAttributes().id;

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
  today: [
    {
      field: fields.dateField,
      operator: "is today"
    },
    {
      field: fields.assignedOfficerField,
      operator: "is",
      value: userId
    }
  ],
  future: [
    {
      field: fields.dateField,
      operator: "is after today"
    },
    {
      field: fields.assignedOfficerField,
      operator: "is",
      value: userId
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

// Endpoints for officer_assignments API view
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

function removeKnackTable(view) {
  $("#" + view + "> div.kn-records-nav").remove();
  $("#" + view + "> div.kn-table-wrapper").remove();
}

// Setup pagination
function initializePagination(records) {
  currentPage = 1;
  currentRangeStart = 1;
  currentRangeEnd = currentPage - 1 + recordsPerPage;
  numberOfPages = Math.ceil(records.length / recordsPerPage);

  var initialPageRecords = records.slice(0, recordsPerPage);
  return initialPageRecords;
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

// Find a record within cached records by id
function findRecordById(id) {
  var found = null;

  for (var i = 0; i < completeRecords.length; i++) {
    found = completeRecords[i].find(function (record) {
      return record.id === id;
    });

    if (!!found) {
      break;
    }
  }

  return found;
}

// Create table to append requested records after they are formatted below
function createRecordsTable(view, tableConfig) {
  var tableHeadersHTML = ``;

  Object.keys(tableConfig.columns).forEach(function (columnTitle) {
    tableHeadersHTML += `
    <th>
      <span class="table-fixed-label">
        <span>${columnTitle}</span>
      </span>
    </th>`;
  });

  return `
  <div class="assignments-table">
    <table class="kn-table kn-table-table is-bordered">
      <thead>
        ${tableHeadersHTML}
      </thead>
      <tbody class="${view} shift-table-body">
      </tbody>
    </table>
  </div>`;
}

// Request and set initial records
function requestRecords(filterConfig, view, tableConfig) {
  // Get user auth for get request (API view is private) and set req headers
  var user = Knack.getUserToken();

  var headers = {
    "X-Knack-Application-ID": appSpecifics.knackAppId,
    Authorization: user,
    "content-type": "application/json"
  };

  var url =
    getUrl +
    "?filters=" +
    encodeURIComponent(JSON.stringify(filterConfig)) +
    "&rows_per_page=1000";

  // Show spinner while fetching officer_assignment records
  $("#" + view + "> div.view-header").append(
    `<span id="${view}-table-spinner" class="table-spinner">&nbsp;<i class="fa fa-circle-o-notch fa-spin"></i></span>`
  );

  // Remove Knack generated table that we are replacing and request records
  removeKnackTable(view);

  // Calculate number of columns to set colspan in
  var numberOfColumns = Object.keys(tableConfig.columns).length;

  // Request officer_assignment records
  $.ajax({
    url: url,
    type: "GET",
    headers: headers,
    success: function (res) {
      records = res.records;

      // Don't process records if there are none
      if (records.length === 0) {
        $("." + view + ".shift-table-body")
          .children()
          .remove();
        appendTableWithNoRecordsMessage();
        $("#" + view + "-table-spinner").remove();
        completeRecords = null;
        recordsInPage = null;
        return;
      }

      completeRecords = groupRecordsIntoAssignments(records);
      recordsInPage = initializePagination(completeRecords);
      buildAndAppendShiftSection(recordsInPage);
      prependShiftTableWithPagination();
      if (tableConfig.addTimeFilters) {
        prependPaginationWithTimeFilters();
      }
      addOpenShiftButtonClickHandlers();
      addCancelMyShiftButtonClickHandlers();

      // Remove spinner
      $("#" + view + "-table-spinner").remove();
    }
  });

  // Helper functions that all need view arg to target correct table in view
  function buildAndAppendShiftSection(shiftRecords) {
    // Clear the table in case we need to repopulate for pagination
    $("." + view + ".shift-table-body")
      .children()
      .remove();

    function buildShift(records) {
      var shiftsHTML = ``;

      records.forEach(function (shiftRecords) {
        shiftsHTML += `
          <tr class="kn-table-group kn-group-level-1">
            <td class="shift-header" colspan="${numberOfColumns}">${
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

          for (var i = 0; i < shiftRecords.length; i++) {
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

        function createTableRowData(record) {
          var tableDataCells = ``;

          Object.values(tableConfig.columns).forEach(function (
            columnDataGetter,
            i
          ) {
            var convertedIndexForColumns = i + 1;

            tableDataCells += `
            <td
              style="padding-left: 20px;"
              data-column-index="${convertedIndexForColumns}"
            >
              <span class="col-${convertedIndexForColumns}">
                ${columnDataGetter(record)}
              </span>
            </td>
            `;
          });

          return tableDataCells;
        }

        buttonRecords[0].forEach(function (record) {
          shiftsHTML += `
            <tr>
              ${createTableRowData(record)}
            </tr>
            `;
        });

        // Add sign up buttons
        shiftsHTML += `
          <tr>
            <td style="padding-top: 16px;" colspan="${numberOfColumns}">
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
    $("." + view + ".shift-table-body").append(shiftSection);
  }

  // Add button handler to associate officer assignment records with logged in user
  function addOpenShiftButtonClickHandlers() {
    var buttons = $(`#${view} .open-shift-button`);
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

              // Update cached record
              var thisRecord = findRecordById(recordId);
              thisRecord[fields.assignedOfficerFieldRaw][0].id = userId;

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
          <h1 class="modal-card-title">Remove From My Assignments</h1>
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
                          required
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
                            required
                          />&nbsp;I have read the SEU Cancellation Policy and
                          understand that by cancelling this assignment with less
                          than 48 hours notice I am responsible for finding another
                          Officer to work the shift or risk losing eligibility for
                          SEU assignments.</label
                        >
                      </div>
                      <p class="kn-instructions">
                        <a
                          href="https://atd.knack.com/vza#cancellation-policy/"
                          target="_blank"
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

      // Collect form values
      var formFields = thisForm.serializeArray();
      var knackFormatFields = formFields.reduce(function (acc, field) {
        return { ...acc, [field.name]: field.value };
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
            ...knackFormatFields, // Reason for cancellation and Remove from My Assignments fields from form
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

            // Update cached record based if reverting to .open-shift-button button
            if (!tableConfig.isCancelOnly) {
              var thisRecord = findRecordById(recordId);
              thisRecord[fields.assignedOfficerFieldRaw][0].id =
                appSpecifics.noOfficerAssignedId;
            }

            // Remove modal and stop spinner
            $("#kn-modal-bg-0").remove();
            $("#kn-loading-spinner").css("display", "none");

            // If only cancelling, reload table to refresh user's assignments
            if (tableConfig.isCancelOnly) {
              requestRecords(filterConfig, view, tableConfig);
            }
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
    var buttons = $(`#${view} .my-shift-button`);
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
  function addPaginationClickHandlers(prevClass, nextClass) {
    var prev = $(`#${view} .${prevClass}`);
    var next = $(`#${view} .${nextClass}`);

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
      $("." + view + " .shift-table-body").append(shifts);
      prependShiftTableWithPagination();
      addOpenShiftButtonClickHandlers();
      addCancelMyShiftButtonClickHandlers();
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
      $("." + view + " .shift-table-body").append(shifts);
      prependShiftTableWithPagination();
      addOpenShiftButtonClickHandlers();
      addCancelMyShiftButtonClickHandlers();
    });
  }

  // Update pagination values and add control click handlers
  function prependShiftTableWithPagination() {
    if ($("#" + view + " .pagination-controls").length) {
      $("#" + view + " .pagination-controls").remove();
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
          <span class="icon prev-arrow">
            <i class="fa fa-chevron-left"></i>
          </span>
          <span class="icon next-arrow">
            <i class="fa fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>`;

    $("#" + view + " .assignments-table").before(paginationControls);
    $("#" + view + " .assignments-table").after(paginationControls);
    addPaginationClickHandlers("prev-arrow", "next-arrow");
  }

  // Add time filters once, add click handlers to add filters to record request and handle active/inactive button status
  function prependPaginationWithTimeFilters() {
    if ($("#" + view + " #time-filter-buttons").length) {
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

    $("#" + view + " .pagination-controls")
      .before(filterMenu)
      .ready(function () {
        $("#" + view + " #time-filter-buttons")
          .children()
          .each(function () {
            // Request records with matching time filter on click
            $(this).click(function () {
              var clickedFilterButtonId = $(this).attr("id");
              requestRecords(filters[clickedFilterButtonId], view, tableConfig);

              // Add/remove active button status
              $("#" + view + " #time-filter-buttons")
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
    if ($("#" + view + "#no-records-msg").length) {
      return;
    }

    var noRecordsRow = `
    <tr class="kn-table-group kn-group-level-1" id="no-records-msg">
      <td colspan="${numberOfColumns}">No assignments available</td>
    </tr>  
    `;

    $("." + view + ".shift-table-body").append(noRecordsRow);
  }
}

// #### Sign Up page ####
// Hide Knack generated "Available Assignments" table, create and add table that condenses
// sign up for multiple officer_assignments into one button
$(document).on("knack-view-render.view_466", function (event, view, data) {
  var tableConfig = {
    columns: {
      // Header Title: Getter() for data in record
      Time: function (record) {
        return record[fields.timeField];
      },
      Sector: function (record) {
        return record[fields.locationFieldRaw][0].identifier.split(" - ")[0];
      },
      Location: function (record) {
        return record[fields.locationFieldRaw][0].identifier.split(" - ")[2];
      }
    },
    addTimeFilters: true,
    isCancelOnly: false
  };

  var recordsTable = createRecordsTable(view.key, tableConfig);

  // Append table, then request records and append shifts to table body
  $("#" + appSpecifics.availableAssignmentsView + "> div.view-header")
    .after(recordsTable)
    .ready(function () {
      requestRecords(filters.all, view.key, tableConfig);
    });
});

// #### My Assignments page ####
// Hide Knack generated "Today's Assignments" and "Future Assignments" table, create and add tables that condense
// cancellation for multiple officer_assignments into one button

// Helper to create folder icon link in custom table data cells
function addRecordLinkToTableConfig(view, config) {
  var slug = view.scene.slug;

  function createFolderIconLink(record) {
    return `
    <a href="#${slug}/assignment-details/${record.id}" 
    class="kn-link kn-link-page" address="true" style="text-align: center; ">
      <span class="level is-compact">
        <span class="icon is-left">
          <i class="fa fa-folder-open-o"></i>
        </span>
      </span>
    </a>
    `;
  }

  return {
    ...config,
    columns: { Details: createFolderIconLink, ...config.columns }
  };
}

$(document).on(
  "knack-view-render." + appSpecifics.todayAssignmentsView,
  function (event, view, data) {
    var tableConfig = {
      columns: {
        Time: function (record) {
          return record[fields.timeField];
        },
        Location: function (record) {
          return record[fields.locationFieldRaw][0].identifier.split(" - ")[2];
        },
        "Clock In": function (record) {
          return record[fields.startTime];
        },
        "Clock Out": function (record) {
          return record[fields.endTime];
        },
        Observations: function (record) {
          return record[fields.observationsField];
        }
      },
      addTimeFilters: false,
      isCancelOnly: true
    };

    var updatedTableConfig = addRecordLinkToTableConfig(view, tableConfig);
    var recordsTable = createRecordsTable(view.key, updatedTableConfig);

    // Append table, then request records and append shifts to table body
    $("#" + appSpecifics.todayAssignmentsView + "> div.view-header")
      .after(recordsTable)
      .ready(function () {
        requestRecords(filters.today, view.key, updatedTableConfig);
      });
  }
);

$(document).on(
  "knack-view-render." + appSpecifics.futureAssignmentsView,
  function (event, view, data) {
    var tableConfig = {
      columns: {
        Time: function (record) {
          return record[fields.timeField];
        },
        Sector: function (record) {
          return record[fields.locationFieldRaw][0].identifier.split(" - ")[0];
        },
        Location: function (record) {
          return record[fields.locationFieldRaw][0].identifier.split(" - ")[2];
        }
      },
      addTimeFilters: false,
      isCancelOnly: true
    };

    var recordsTable = createRecordsTable(view.key, tableConfig);

    // Append table, then request records and append shifts to table body
    $("#" + view.key + "> div.view-header")
      .after(recordsTable)
      .ready(function () {
        requestRecords(filters.future, view.key, tableConfig);
      });
  }
);

// Enable/disable Start and End assignment buttons and add timestamps
var startTimeInputSelector = `input#${appSpecifics.assignmentDetailsTimes}-${fields.startTime}`;
var endTimeInputSelector = `input#${appSpecifics.assignmentDetailsTimes}-${fields.endTime}`;

function waitForAllEvents(listOfEvents, cb) {
  var triggeredEvents = [];
  listOfEvents.forEach(function (eventKey) {
    var listener = function (event, view, record) {
      if (!triggeredEvents.includes(eventKey)) {
        triggeredEvents.push(eventKey);
      }

      if (triggeredEvents.length === listOfEvents.length) {
        cb();
        triggeredEvents = []; // Clear out array and continue listening
      }
    };

    $(document).on(eventKey, listener);
  });
}

// When any of these views update, makes sure all three events occurred and then apply changes to button states
waitForAllEvents(
  [
    "knack-view-render." + appSpecifics.assignmentDetailsTimes,
    "knack-view-render." + appSpecifics.startButtonView,
    "knack-view-render." + appSpecifics.endButtonView
  ],
  function () {
    var $startTimeInput = $(startTimeInputSelector);
    var startTime = $startTimeInput[0].value;
    var $startButtonLink = $(`.${appSpecifics.startButtonView} a`);

    var $endTimeInput = $(endTimeInputSelector);
    var endTime = $endTimeInput[0].value;
    var $endButtonLink = $(`.${appSpecifics.endButtonView} a`);

    if (startTime.length !== 0) {
      $startButtonLink.addClass("disabled");
      $(".start-timestamp").length === 0 &&
        $startButtonLink.append(
          `<div class="content start-timestamp"><strong>Assignment started at ${startTime}</strong></div>`
        );
    } else if (startTime.length === 0) {
      $endButtonLink.addClass("disabled");
    }

    if (endTime.length !== 0) {
      $endButtonLink.addClass("disabled");
      $(".end-timestamp").length === 0 &&
        $endButtonLink.append(
          `<div class="content end-timestamp"><strong>Assignment ended at ${endTime}</strong></div>`
        );
    }
  }
);

function customButton(
  div_id,
  view_id,
  url,
  fa_icon,
  button_label,
  button_class,
  container_class,
  callback
) {
  // Create a custom button
  $("<div/>", {
    id: div_id
  }).appendTo("#" + view_id);

  $("#" + div_id).append(
    "<a class='" +
      button_class +
      "' href='" +
      url +
      "'><div class='" +
      container_class +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></div></a>"
  );

  if (callback) callback();
}

$(document).on("knack-view-render.any", function (event, page) {
  //  wrapper to create large sign-in buttons
  //  the views ojbect uses the view id of the login form element as each key
  //  and the page url of the login page's **chile page** as the value
  var views = {
    view_39: "home",
    view_5: "purchase-requests",
    view_82: "purchasing-budget-review",
    view_52: "account-administration",
    view_322: "commodity-codes",
    view_31: "reviews",
    view_387: "invoice-details",
    view_379: "add-invoice",
    view_77: "my-purchase-requests"
  };

  if (page.key in views) {
    customLoginButton(page.key, views[page.key]);
  }
});

function customLoginButton(view_id, page_name) {
  //  special logic to generate URL and clean-up sign in page brefore creating large button
  $(".kn-sso-container").hide();

  $(".login_form").hide();

  $("h2.kn-title").hide();

  var url =
    "https://atd.knack.com/finance-purchasing#" + page_name + "/auth/COACD";

  customButton(
    "caocd-button-login",
    view_id,
    url,
    "sign-in",
    "Sign-In",
    "big-button",
    "big-button-container"
  );

  customButton(
    "non-coacd-button-login",
    view_id,
    "javascript:void(0)",
    "lock",
    "Non-COA Sign-In",
    "small-button",
    "small-button-container",
    function (divId = "non-coacd-button-login") {
      setClickEvent(
        divId,
        showHideElements,
        ".login_form",
        ".small-button-container,.big-button-container"
      );
    }
  );
}
