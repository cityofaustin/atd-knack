/******************************/
/**** Save Knack Record ID ****/
/******************************/
// Function to Save Record ID. The purpose is to use the record ID to retrieve a 
// link to the producer details page in the email notification.
function saveRecordId(recordId) {
  $.ajax({
  // Scene/View of Second Form
    url: "https://api.knack.com/v1/pages/scene_37/views/view_60/records/" + recordId,
    type: "PUT", 
    headers: {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-Key": `knack`,
      "Authorization": Knack.getUserToken(),
      "ContentType": "application/json"
    },
    data: {
    // Store Record ID in Knack Record ID field
      field_103 : recordId,
    },
    tryCount: 0,
    retryLimit: 3,
    success: function(response) {
    // Success Message in Console
      console.log("Captured Record ID");
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
      // Failure Message in Console
        console.log("Failed to Capture Record ID");
      }
    }
  });
}

// Listen for record creation (Application Submit / First Form)
$(document).on('knack-record-create.view_10', function(event, view, record) {
  const recordId = record.id;
  console.log('CREATE')
  saveRecordId(recordId);
});

// This is the Save Record ID / Second Form.
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_60', function (event, view, record) {
  $('#' + view.key).remove(); 
});

/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/

// Change PDF name in 
// https://builder.knack.com/atd/oce/pages/scene_3/views/view_4/table
// https://builder.knack.com/atd/oce/pages/scene_15/views/view_25/table


// The views to use to change PDF name to 'View' instead of the long file name convention in grid views
const  v = ['view_4','view_6','view_25','view_50']

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_4 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_6 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_25 .kn-view-asset").html("View");
})

$(document).on('knack-view-render.any', function(event, view, data) {
  $("#view_50 .kn-view-asset").html("View");
})

// Changes attachment name to "View"
/*
const attachmentName = function(event, view, data) {
  $('a.kn-view-asset').html("View"); 
};*/

// $(document).on('knack-view-render.view_4', attachmentName);
//$(document).on('knack-view-render.view_25', attachmentName);

// Interate through the views
/*
for (let i = 0; i < views.length; i++) {
  $(document).on('knack-view-render.'.concat(views[i]), attachmentName);
} 
*/
//Sets it for everything
/*
$(document).on('knack-view-render.view_4', function(event, data) {
  $("a.kn-view-asset").html("View");
})
*/
