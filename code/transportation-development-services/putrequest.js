/****************************************************/
/*** Save TIA Knack Record ID for TIA Application ***/
/****************************************************/
// Function to Save Record ID
function saveRecordId(recordId) {
  $.ajax({
    url: "https://api.knack.com/v1/pages/scene_167/views/view_740/records/" + recordId, // Scene/View of Second Form
    type: "PUT", 
    headers: {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-Key": `knack`,
      "Authorization": Knack.getUserToken(),
      "ContentType": "application/json"
    },
    data: {
      field_824 : recordId, // Store Record ID in Knack Record ID field on TIA Request object
    },
    tryCount: 0,
    retryLimit: 3,
    success: function(response) {
      console.log("Captured Record ID"); // Success Message in Console
      Knack.hideSpinner();
    },
    error : function(XMLHttpRequest, textStatus, errorThrown) {
      this.tryCount++;
      let tryCount = this.tryCount, retryLimit = this.retryLimit, seconds; 
      if (tryCount <= retryLimit) { //try again
        switch(tryCount) {
          case 1:
          case 2: seconds = 5; break;
          case 3: seconds = 10; break; }
        let timeout = seconds * 1000;
        console.log("Error: " + XMLHttpRequest.status + " " + XMLHttpRequest.statusText + "\nRetry Count: " + tryCount + "\nRetrying in " + seconds + " seconds")
        let ajaxObject = this;
        window.setTimeout(function(){
          $.ajax(ajaxObject);
        }, timeout);
      } else {
        console.log("Failed to Capture Record ID"); // Failure Message in Console
      }
    }
  });
}

// Listen for record creation (TIA Request Application Information Submit / First Form)
$(document).on('knack-record-create.view_393', function(event, view, record) {
  const recordId = record.id;
  console.log('CASE CREATED')
  saveRecordId(recordId);
});

// Listen for record creation (TIA Case Template Submit / First Form)
$(document).on('knack-record-create.view_972', function(event, view, record) {
  const recordId = record.id;
  console.log('CASE TEMPLATE CREATED')
  saveRecordId(recordId);
});

// This is the Second Form.
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_740', function (event, view, record) {
  $('#' + view.key).remove(); 
  console.log('HIDE')
});
