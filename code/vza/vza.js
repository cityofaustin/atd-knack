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
  var dateField = "field_205";

  var completeRecords = null;
  var recordsInPage = null;
  var currentPage = 1;
  var recordsPerPage = 10;
  var numberOfPages = null;
  var currentRangeStart = 1;
  var currentRangeEnd = currentPage - 1 + recordsPerPage;

  // Filter for records for assignments today or after
  var filters = [
    {
      field: dateField,
      operator: "is today or after"
    }
  ];

  var url =
    "https://api.knack.com/v1/pages/" +
    tableScene +
    "/views/" +
    tableView +
    "/records" +
    "?filters=" +
    encodeURIComponent(JSON.stringify(filters)) +
    "&sort_field=" +
    dateField +
    "&sort_order=asc" +
    "&rows_per_page=1000";

  // Get user auth for get request (API view is private) and set req headers
  var user = Knack.getUserToken();

  var headers = {
    "X-Knack-Application-ID": knackAppId,
    Authorization: user,
    "content-type": "application/json"
  };

  // Show spinner while fetching
  $("#view_466 > div.view-header").append(
    `<span id="assignment-spinner" class="icon">&nbsp;<i class="fa fa-circle-o-notch fa-spin"></i></span>`
  );

  function hideKnackTable() {
    $("#view_466 > div.kn-records-nav").hide();
    $("#view_466 > div.kn-table-wrapper").hide();
  }

  // Hide Knack generated table
  hideKnackTable();

  // Setup pagination
  function initializePagination(records) {
    currentPage = 1;
    numberOfPages = Math.ceil(records.length / recordsPerPage);

    return records.slice(0, recordsPerPage);
  }

  // Request officer_assignment records
  $.ajax({
    url: url,
    type: "GET",
    headers: headers,
    success: function (res) {
      records = res.records;
      completeRecords = groupRecordsIntoAssignments(records);
      recordsInPage = initializePagination(completeRecords);
      appendShiftTable(recordsInPage);
      console.log(recordsInPage);

      // Remove spinner
      $("#assignment-spinner").remove();
    }
  });

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

  function appendShiftTable(records) {
    // Build table from records
    var recordsTotalsDiv = `
      <div class="level" style="margin-bottom: .75em;">
        <div class="level-left">
          <div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing</span> ${currentRangeStart}-${currentRangeEnd}
            <span class="light">of</span> ${completeRecords.length}
          </div>
        </div>
        <div class="kn-pagination level-right">
          <div class="kn-total-pages">${currentPage} of ${numberOfPages}</div>
          <div class="kn-pagination-arrows">
            <span class="icon" id="prev-arrow">
              <i class="fa fa-chevron-left"></i>
            </span>
            <span class="icon" id="next-arrow">
              <i class="fa fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>`;

    var recordsTable = `
    <div class="kn-table-wrapper assignments-table">
      <table class="kn-table kn-table-table is-bordered is-striped">
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

    function buildAndAppendShiftSection(shiftRecords) {
      // Clear the table in case we need to repopulate for pagination
      $("#shift-table-body").children().remove();

      function buildShift(records) {
        var shiftsHTML = ``;

        records.forEach(function (shiftRecords) {
          shiftsHTML += `
          <tr class="kn-table-group kn-group-level-1">
            <td colspan="4">${shiftRecords[0].field_724}</td>
          </tr>`;

          // Condense each set of officer_assignments that make up a shift together
          // First dimension is shifts of officer_assignments (grouped together for sign up)
          // Second dimension is array of officer_assignments within shift
          var buttonRecords = [[]];

          for (let i = 0; i < shiftRecords.length; i++) {
            var record = shiftRecords[i];
            var lastCondensed = buttonRecords[buttonRecords.length - 1];

            if (lastCondensed.length === 0) {
              lastCondensed.push(record);
              continue;
            }

            var firstTimeRange = lastCondensed[0].field_139;
            var firstLocation = lastCondensed[0].field_656_raw[0].identifier;

            var recordTimeRange = record.field_139;
            var recordLocation = record.field_656_raw[0].identifier;

            if (
              firstTimeRange !== recordTimeRange &&
              firstLocation !== recordLocation
            ) {
              lastCondensed.push(record);
            } else {
              buttonRecords.push([record]);
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
            class="kn-button shift-button"
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
        $(this).click(function () {
          console.log(`You clicked ${$(this).attr("id")}`);
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
      });
    }

    // Append table, then append shifts to table body
    $("#view_466 > div.view-header")
      .append(recordsTotalsDiv + recordsTable)
      .ready(function () {
        buildAndAppendShiftSection(records);
        addShiftButtonClickHandlers("shift-button");
        addPaginationClickHandlers("prev-arrow", "next-arrow");
        // TODO: Update pagination displays with current location
      });
  }
});
