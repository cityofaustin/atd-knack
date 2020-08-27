$(document).on("knack-view-render.any", function (event, view, data) {
  $("a.kn-view-asset").html("Attachment");
});

$(document).on("knack-view-render.view_466", function (event, view, data) {
  // Define VZA Knack app ID
  var knackAppId = "5f2440f7ef8de9001620d7e2";

  // Define scene and view of officer_assignments table API view
  var tableScene = "scene_236";
  var tableView = "view_484";

  // Define relevant officer_assignment fields
  var dateField = "field_154";
  var assignedOfficerFieldRaw = "field_704_raw";
  var assignedOfficerField = "field_704";
  var noOfficerAssignedId = "5f2440fb3dd0c106c27178b1";

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
        field: dateField,
        operator: "is today or after"
      }
    ],
    week: [
      {
        value: "",
        text: "Next Week",
        operator: "is during the next",
        field: "field_154",
        type: "weeks",
        range: "1"
      }
    ],
    month: [
      {
        field: "field_154",
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
    tableScene +
    "/views/" +
    tableView +
    "/records";

  var putUrl =
    "https://api.knack.com/v1/pages/" +
    tableScene +
    "/views/" +
    tableView +
    "/records/";

  // Get user auth for get request (API view is private) and set req headers
  var user = Knack.getUserToken();
  var userId = Knack.getUserAttributes().id;

  var headers = {
    "X-Knack-Application-ID": knackAppId,
    Authorization: user,
    "content-type": "application/json"
  };

  function removeKnackTable() {
    $("#view_466 > div.kn-records-nav").remove();
    $("#view_466 > div.kn-table-wrapper").remove();
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
      "&sort_field=" +
      dateField +
      "&sort_order=asc" +
      "&rows_per_page=1000";

    // Show spinner while fetching officer_assignment records
    $("#view_466 > div.view-header").append(
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
        addShiftButtonClickHandlers("shift-button");

        // Remove spinner
        $("#assignment-spinner").remove();
      }
    });
  }

  // Group officer assignments into shifts
  function groupRecordsIntoAssignments(records) {
    // Group records by field_724 (Officer Shift Label)
    var officerShiftField = "field_724";

    var groupedRecords = {};

    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var officerShift = record[officerShiftField];

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
            <td class="shift-header" colspan="4">${shiftRecords[0].field_724}</td>
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
            return record1.field_139 === record2.field_139;
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
                data-field-key="field_139"
              >
                <span class="col-1">
                  ${record.field_139}
                </span>
              </td>
              <td class="field_637" data-column-index="2" data-field-key="field_637">
                <span class="col-2">
                  <span id="5f24412f3dd0c106c2719524">${
                    record.field_656_raw[0].identifier.split(" - ")[0]
                  }</span>
                </span>
              </td>
              <td data-column-index="3" data-field-key="field_624">
                <span class="col-3">
                  <span id="5f24412f3dd0c106c2719524"
                    >${record.field_656_raw[0].identifier.split(" - ")[2]}</span
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

        function setButtonStatus(record) {
          return record[assignedOfficerFieldRaw][0].id === noOfficerAssignedId
            ? ""
            : "is-disabled";
        }

        // For each subarray, add one button
        buttonRecords.forEach(function (shift, i) {
          // Build the button id from shift officer assignment ids for use by sign up click handler
          const buttonId = shift
            .map(function (assignment) {
              return assignment.id;
            })
            .join("-");

          shiftsHTML += `
            <span
            class="kn-button shift-button ${setButtonStatus(shift[0])}"
            style="margin: 0px 10px 10px 0px;"
            id="${buttonId}"
            >
              <span class="icon">
                <i class="fa fa-plus-square"></i>
              </span>
              <span>Sign up - Officer ${i + 1}</span>
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
  function addShiftButtonClickHandlers(className) {
    var buttons = $(`.${className}`);
    buttons.each(function () {
      var thisButton = $(this);
      thisButton.click(function () {
        // Get officer_assignment record ids
        var idsToAssignCurrentUser = thisButton.attr("id").split("-");

        idsToAssignCurrentUser.forEach(function (id) {
          $.ajax({
            url: putUrl + id,
            type: "PUT",
            data: JSON.stringify({ [assignedOfficerField]: userId }),
            headers: headers,
            success: function (res) {
              thisButton.addClass("is-disabled");
            }
          });
        });
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
      addShiftButtonClickHandlers("shift-button");
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
      addShiftButtonClickHandlers("shift-button");
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
            <th class="field_139">
              <span class="table-fixed-label">
                <span>Time</span>
              </span>
            </th>
            <th class="field_637">
              <span class="table-fixed-label">
                <span>Sector</span>
              </span>
            </th>
            <th class="field_624">
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
  $("#view_466 > div.view-header")
    .after(recordsTable)
    .ready(function () {
      requestRecords(filters.all);
    });
});
