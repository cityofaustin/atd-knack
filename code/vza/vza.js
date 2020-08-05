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

  var records = null;

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

  // Request officer_assignment records
  $.ajax({
    url: url,
    type: "GET",
    headers: headers,
    success: function (res) {
      records = res.records;
      var groupedAssignments = groupRecordsIntoAssignments(records);
      appendShiftTable(groupedAssignments);
      console.log(groupedAssignments);

      // Remove spinner
      $("#assignment-spinner").remove();
    }
  });

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

    return groupedRecords;
  }

  function appendShiftTable(records) {
    var currentPage = 1;

    var recordsTotalsDiv = `
      <div class="level" style="margin-bottom: .75em;">
        <div class="level-left">
          <div class="kn-entries-summary" style="margin-right: .5em;">
            <span class="light">Showing</span> 1-10
            <span class="light">of</span> ${Object.values(records).length}
          </div>
        </div>
        <div class="kn-pagination level-right">
          <div class="kn-total-pages">${currentPage} of 19</div>
          <div class="kn-pagination-arrows">
            <span class="icon">
              <i class="fa fa-chevron-left"></i>
            </span>
            <span class="icon">
              <i class="fa fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>`;

    var recordsTable = `
    <div class="kn-table-wrapper">
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

    function buildShiftSection(shiftRecords) {
      function buildShift(records) {
        var shiftsHTML = ``;

        Object.entries(records).forEach(function ([title, shiftRecords]) {
          console.log(shiftRecords);

          shiftsHTML += `
          <tr class="kn-table-group kn-group-level-1">
            <td style="" colspan="4">${title}</td>
          </tr>`;

          var factor = shiftRecords.length / 2;
          var buttonIds = [];

          shiftRecords.forEach(function (record) {
            buttonIds.push(record.id);
          });

          console.log(buttonIds);

          shiftRecords.forEach(function (record) {
            shiftsHTML += `
            <tr>
              <td
                style="background-color: rgb(82, 157, 198); padding-left: 20px;"
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
              <span
                class="kn-button"
                style="margin: 0px 10px 10px 0px;"
              >
                <span class="icon">
                  <i class="fa fa-plus-square"></i>
                </span>
                <span>Sign up - Officer 1</span>
              </span>
              <span
                class="kn-button"
                style="margin: 0px 10px 10px 0px;"
              >
                <span class="icon">
                  <i class="fa fa-plus-square"></i>
                </span>
                <span>Sign up - Officer 2</span>
              </span>
              <span
                class="kn-button"
                style="margin: 0px 10px 10px 0px;"
              >
                <span class="icon">
                  <i class="fa fa-plus-square"></i>
                </span>
                <span>Sign up - Officer 3</span>
              </span>
              <span
                class="kn-button"
                style="margin: 0px 10px 10px 0px;"
              >
                <span class="icon">
                  <i class="fa fa-plus-square"></i>
                </span>
                <span>Sign up - Officer 4</span>
              </span>
              <span
                class="kn-button"
                style="margin: 0px 10px 10px 0px;"
              >
                <span class="icon">
                  <i class="fa fa-plus-square"></i>
                </span>
                <span>Sign up - Officer 5</span>
              </span>
            </td>
          </tr>`;
        });

        return shiftsHTML;
      }

      return buildShift(shiftRecords);
    }

    // Append table, then append shifts to table body
    $("#view_466 > div.view-header")
      .append(recordsTotalsDiv + recordsTable)
      .ready(function () {
        var shifts = buildShiftSection(records);
        $("#shift-table-body").append(shifts);
      });
  }
});
