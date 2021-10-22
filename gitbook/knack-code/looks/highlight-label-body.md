---
description: How to highlight a details view label body to bring attention to a field
---

# Highlight Details View Label Body & Table Value

This will give greater visibility to a field that is important to understand at a glance such as a status field and adjusting the highlight color based on the current status.

![In the Signs and Markings Tracker, Work Order Details page](<../../../.gitbook/assets/image (51) (1).png>)

![In Parking Enterprise Portal, My Assignments page](../../../.gitbook/assets/highlight\_details\_widget\_field.png)

### The JS

This function allows us to identify the details view label body and set a background color value

```
//Change Label Body Background Color
function changeFieldColor(field, color_map) {
  var child_field = $(field).find(".kn-detail-body");
  var value = child_field.text();
  if (color_map[value]) {
    $(child_field).css({
      "background-color": color_map[value].background_color,
      color: color_map[value].color
    });
  }
}
```

This function allows us to identify a table field and set a background color value

```
//Change Table Value Background Color
function changeTableFieldColor(field, color_map) {
  var fields = $(field);
  fields.each(function() {
    var value = this.innerText;
    if (color_map[value]) {
      $(this).css({
        "background-color": color_map[value].background_color,
        color: color_map[value].color
      });
    }
  });
}
```

We set variables for each combination of background and text colors we want based on field values

```
//Color Map Status Highlight
var colorMapOne = {
  "Available": { background_color: "#80d07e", color: "#fff" },
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
};
```

We create a handler that calls the function and sets a specified field to a specified variable

```
//Highlighted Field
$(document).on("knack-scene-render.any", function() {
  changeFieldColor(".field_236", colorMapOne);
});
```

### The CSS

None needed 😎

### How to Implement

Adjust the hex colors for each color map variable

```
  "Available": { background_color: "#80d07e", color: "#fff" },
  "Unavailable": { background_color: "#ff9b9c", color: "#fff" }
```

Adjust the Field ID for each handler

```
 changeFieldColor(".field_236", colorMapOne);
```

