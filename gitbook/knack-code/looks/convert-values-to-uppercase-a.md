---
description: How to convert field input to UPPERCASE after leaving field selection
---

# Convert Values to UPPERCASE (Option A)

![an Applicant Name converting to UPPERCASE after leaving the field](<../../../.gitbook/assets/image (179).png>)

### The JS

The function

```
/*****************************************/
/*** Convert Field/Inputs to UpperCase ***/
/*****************************************/
$(document).on("knack-page-render.any", function (event, page) {
```

We create a handler that uses the focusout function. We can create one that applies to an entire field type such as the Name field (i.e. Customer Name and Reviewer Name)

```
//All Name Fields
  $(".kn-input-name input").focusout(function () {
    this.value = this.value.toUpperCase();
  });
```

or we can target a specific field by using the Knack Field ID.

```
//License Plate 1
  $("input#field_232").focusout(function () {
    this.value = this.value.toUpperCase();
  });
```

and dont forget to close the function.

```
})
```

Example of full code block

```
/*comment*/
$(document).on('knack-page-render.any', function(event, page) {
  $("input#field_232").focusout(function () {
    this.value = this.value.toUpperCase();
  });
})
```

### The CSS

None needed 😎

### How to Implement

Adjust field input type or Field ID and you are set 👍

```
".kn-input-name input"
```

```
"input#field_232"
```
