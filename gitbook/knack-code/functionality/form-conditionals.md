---
description: >-
  How to hide or show certain form fields for input based on a specific field
  value selection
---

# Conditionally Hide/Show Form Fields

![The Improvement field value will determine which additional fields show or hide](<../../../.gitbook/assets/image (62).png>)

![For this specific Improvement, we have four new fields show on the form](<../../../.gitbook/assets/image (63).png>)



### The JS

Create two variables, one that determines which fields to display on load, and the other for which fields to display on the field's value selection. We create an argument for each possible value.

```
var improvementField = "field_495";
var mitigationField = "field_326";

var fieldsIdsShownOnLoad = {
  // "Field ID": "Field Name"
  "kn-input-field_639": "Mitigation Location",
  "kn-input-field_326": "Mitigation Type",
  "kn-input-field_495": "Improvement",
  "kn-input-field_317": "Cost",
  "kn-input-field_211": "Recommendation Notes",
};

var fieldsIdsShownOnImprovementSelect = {
  // "MC Field Value": [...ids of fields to show on value select]
  "Construct Turn Lane": [
    "kn-input-field_494",
    "kn-input-field_728",
    "kn-input-field_496",
    "kn-input-field_729",
  ],
  
  "Construct New Road": [
    "kn-input-field_496",
    "kn-input-field_727",
    "kn-input-field_737",
  ],
  
  "Install Traffic Signal": [
    "kn-input-field_730",
  ],
  
  "Construct Sidewalk": [
    "kn-input-field_496",
    "kn-input-field_727",
  ],
  
  "Construct Protected Bike Lane": [
    "kn-input-field_496",
    "kn-input-field_727",
    "kn-input-field_731",
  ],
  
  "Stripe New Bike Lane": [
    "kn-input-field_732",
  ],
  
  "Relocate Bus Stop": [
    
  ],
  
  "Signal Modifications": [
    "kn-input-field_733",
  ],
  
  "Signal Timing Modifications": [
    
  ],
  
  "Construct Urban Trail": [
    "kn-input-field_496",
    "kn-input-field_727",
  ],
  
  "Install Pedestrian Crosswalk": [
    "kn-input-field_734",
  ],
  
  "Install Pedestrian Hybrid Beacon": [
    
  ],
  
  "Construct Curb Ramps": [
    "kn-input-field_735",
    "kn-input-field_736",
  ],
};

var fieldsIdsShownOnMitigationTypeSelect = {
  // "MC Field Value": [...ids of fields to show on value select]
  "Mitigation Fee-in-Lieu": ["kn-input-field_488"]
};
```

We create two functions, one that will hide the specified fields for us, and the other to show the specified fields.

```
function hideFormFields(fieldViewId) {
  var $fields = $("#" + fieldViewId).find(".kn-input");

  $fields.each(function (index, field) {
    var fieldId = field.id;

    if (!fieldsIdsShownOnLoad.hasOwnProperty(fieldId) && fieldId) {
      $("#" + fieldId).hide();
    }
  });
}

function showFormFieldsByImprovementType(value) {
  // Un-hide form fields in map
  if(fieldsIdsShownOnImprovementSelect.hasOwnProperty(value)){
  	fieldsIdsShownOnImprovementSelect[value].forEach(function (fieldId) {
    	$("#" + fieldId).show();
  	});
  }
}

function showFormFieldsByMitigationType(value) {
  // Un-hide form fields in map
  if(fieldsIdsShownOnMitigationTypeSelect.hasOwnProperty(value)){
  	fieldsIdsShownOnMitigationTypeSelect[value].forEach(function (fieldId) {
    	$("#" + fieldId).show();
  	});
  }
}

function showFieldsByImprovementAndType(viewId){
  var improvementType = $("#" + viewId + "-" + improvementField).val();
  var mitigationType = $("#" + viewId + "-" + mitigationField).val();

  hideFormFields(viewId);
  showFormFieldsByImprovementType(improvementType);
  showFormFieldsByMitigationType(mitigationType);
}
```

For each of our form views where the selection occurs, we create a handler with an event listener for a change in the field value that determines which fields show or hide.

```
//the Add Mitigation Form
$(document).on("knack-view-render.view_628", function (event, view) {
  hideFormFields(view.key);

  // Attach event listener to handle change in field_495 select (Improvement)
  $("#" + view.key + "-" + improvementField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });

  // Attach event listener to handle change in field_326 select (Mitigation Type)
  $("#" + view.key + "-" + mitigationField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });
});
```

On an Edit form specifically, we add an if statement to check if the field already has a value and show the appropriate fields based on the existing value.

```
//the Edit Mitigation Form
$(document).on("knack-view-render.view_509", function (event, view) {
  hideFormFields(view.key);
  
  var improvementValue = $("#" + view.key + "-" + improvementField).val();
  var mitigationType = $("#" + view.key + "-" + mitigationField).val();
  
  // If there is an existing value, show associated fields
  if(fieldsIdsShownOnImprovementSelect.hasOwnProperty(improvementValue)){	
     showFormFieldsByImprovementType(improvementValue);
  }
  
  // If there is an existing value, show associated fields
  if(fieldsIdsShownOnMitigationTypeSelect.hasOwnProperty(mitigationType)){	
     showFormFieldsByMitigationType(mitigationType);
  }

  // Attach event listener to handle change in field_495 select (Improvement)
  $("#" + view.key + "-" + improvementField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });

  // Attach event listener to handle change in field_326 select (Mitigation Type)
  $("#" + view.key + "-" + mitigationField).on("change", function (event) {
    showFieldsByImprovementAndType(view.key);
  });
});
```

### The CSS

None needed 😎

### How to Implement

For the variable arguments, you will need to adjust to your specific Field Names, Field ID's and Field Values

```
// "Field ID": "Field Name"
  "kn-input-field_639": "Mitigation Location",
```

```
// "MC Field Value": [...ids of fields to show on value select]
  "Construct Turn Lane": [
    "kn-input-field_494",
    "kn-input-field_728",
    "kn-input-field_496",
    "kn-input-field_729",
  ],
```

For each of the handlers, you will also need to adjust to your specific View ID's and Field ID's

```
"knack-view-render.view_509"
```

```
"view_509"
```

```
"#view_509-field_495"
```

Lastly, if using an edit form, you can update the variable name for the if statement to be something more generic or more specific for your use case.

```
improvementValue
```

to

```
specificValue
```

for all 3 references to it in the if statement
