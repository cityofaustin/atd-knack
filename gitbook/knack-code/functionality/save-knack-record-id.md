---
description: >-
  How to save the behind-the-scenes Knack Record ID to relate records or send
  child record emails
---

# Save Knack Record ID

![The Knack Record ID short text field for the parent object](../../.gitbook/assets/image%20%28130%29.png)

![The Knack Record ID text formula field for the child object](../../.gitbook/assets/image%20%28135%29.png)

![The Save Record ID Page separate from the rest of the app](../../.gitbook/assets/image%20%28133%29.png)

### The JS

In order to the save the Knack Record ID, we use a [View Based PUT with the Knack API](https://docs.knack.com/docs/view-based-put).

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

// This is the Save Record ID / Second Form.
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
Create a short text field for the parent object to capture the Knack Record ID

![](../../.gitbook/assets/image%20%28131%29.png)
{% endtab %}

{% tab title="Second Step" %}
Create a text formula field on the child object that is set to the Knack Record ID field on the parent object

![](../../.gitbook/assets/image%20%28134%29.png)
{% endtab %}

{% tab title="Third Step" %}
Create a new page to Save the Record ID

![](../../.gitbook/assets/image%20%28137%29.png)

![](../../.gitbook/assets/image%20%28136%29.png)

Make sure the page settings do NOT have the page included in the page menu

![](../../.gitbook/assets/image%20%28132%29.png)

Add a parent object form view to the page that will only show the Knack Record ID field. No additional form rules are needed.

![](../../.gitbook/assets/image%20%28129%29.png)
{% endtab %}

{% tab title="Fourth Step" %}
Establish a form submit page or multi-page application where the parent object is created if there is not one already. For example, in the TDS TIA Module there is a parent object multi-page application. The TIA Requester Information is the first page in this application where the parent object is created. This is the form view that will save the Knack Record ID.

![](../../.gitbook/assets/image%20%28128%29.png)
{% endtab %}

{% tab title="Fifth Step" %}
Update the JS for data section where the Record ID is stored with the correct Field ID

```text
data: {
    // Store Record ID in Knack Record ID field on TIA Request object
      field_824 : recordId,
    },
```
{% endtab %}

{% tab title="Sixth Step" %}
Update the JS handlers for both the first and second forms with the correct View IDs

```text
// Listen for record creation (Application Submit / First Form)
$(document).on('knack-record-create.view_393', function(event, view, record) {
  const recordId = record.id;
  console.log('CREATE')
  saveRecordId(recordId);
});
```

```text
// This is the Save Record ID / Second Form
// This removes the view from HTML upon rendering to prevent data manipulation.
$(document).on('knack-view-render.view_740', function (event, view, record) {
  $('#' + view.key).remove(); 
});
```
{% endtab %}

{% tab title="Seventh Step" %}
Lastly, the url in the function will need to be updated with the Scene and View IDs of the Save Record ID page

```text
url: "https://api.knack.com/v1/pages/scene_269/views/view_740/records/" + recordId,
```
{% endtab %}
{% endtabs %}





