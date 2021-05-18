---
description: >-
  How to save the behind-the-scenes Knack Record ID to relate records or send
  child record emails
---

# Save Knack Record ID

![The Knack Record ID short text field for the parent object](../../.gitbook/assets/image%20%28128%29.png)

![The Knack Record ID text formula field for the child object](../../.gitbook/assets/image%20%28130%29.png)

![The Save Record ID Page separate from the rest of the app](../../.gitbook/assets/image%20%28129%29.png)

### The JS

```text
/******************************/
/**** Save Knack Record ID ****/
/******************************/
// Function to Save Record ID
function saveRecordId(recordId) {
  $.ajax({
  // Scene/View of Second Form
    url: "https://api.knack.com/v1/pages/scene_269/views/view_740/records/" + recordId,
    type: "PUT", 
    headers: {
      "X-Knack-Application-Id": Knack.application_id,
      "X-Knack-REST-API-Key": `knack`,
      "Authorization": Knack.getUserToken(),
      "ContentType": "application/json"
    },
    data: {
    // Store Record ID in Knack Record ID field on TIA Request object
      field_824 : recordId,
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
$(document).on('knack-record-create.view_393', function(event, view, record) {
  const recordId = record.id;
  console.log('CREATE')
  saveRecordId(recordId);
});

// This is the Second Form.
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_740', function (event, view, record) {
  $('#' + view.key).remove(); 
});
```

### The CSS

None needed 😎

### How to Implement

{% tabs %}
{% tab title="First Step" %}

{% endtab %}

{% tab title="Second Step" %}

{% endtab %}

{% tab title="Third Step" %}

{% endtab %}

{% tab title="Fourth Step" %}

{% endtab %}
{% endtabs %}





