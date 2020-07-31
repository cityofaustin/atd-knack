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

  // Request officer_assignment records
  $.ajax({
    url: url,
    type: "GET",
    headers: headers,
    success: function (res) {
      records = res.records;
      var groupedAssignments = groupRecordsIntoAssignments(records);
      // hideKnackTable();
      appendShiftTable(groupedAssignments);
      console.log(groupedAssignments);
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

  function hideKnackTable() {
    $("#view_466 > div.kn-records-nav").hide();
    $("#view_466 > div.kn-table-wrapper").hide();
  }

  function appendShiftTable(records) {
    $("#view_466 > div.view-header").append(JSON.stringify(records));
  }
});