---
description: How to convert field input to UPPERCASE after leaving field selection
---

# Convert Values to UPPERCASE \(Option A\)

![an Applicant Name converting to UPPERCASE after leaving the field](../../.gitbook/assets/image%20%28179%29.png)

### The JS

The function

```text
/*****************************************/
/*** Convert Field/Inputs to UpperCase ***/
/*****************************************/
$(document).on("knack-page-render.any", function (event, page) {
```

We create a handler that uses the focusout function. We can create one that applies to an entire field type such as the Name field \(i.e. Customer Name and Reviewer Name\)

```text
//All Name Fields
  $(".kn-input-name input").focusout(function () {
    this.value = this.value.toUpperCase();
  });
```

or we can target a specific field by using the Knack Field ID.

```text
//License Plate 1
  $("input#field_232").focusout(function () {
    this.value = this.value.toUpperCase();
  });
```

and dont forget to close the function.

```text
});
```

### The CSS

None needed 😎

### How to Implement

Adjust field input type or Field ID and you are set 👍

```text
".kn-input-name input"
```

```text
"input#field_232"
```

