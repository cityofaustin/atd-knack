---
description: How to convert field input to UPPERCASE while entering characters
---

# Convert Values to UPPERCASE \(Option B\)

![a Case ID converting to UPPERCASE as entered](../../.gitbook/assets/image%20%2853%29.png)

### The JS

The function

```text
/*****************************************/
/*** Convert Field/Inputs to UpperCase ***/
/*****************************************/
$(document).on("knack-page-render.any", function (event, page) {
```

We create a handler that uses the keyup function. We can create one that applies to an entire field type such as the Name field \(i.e. Customer Name and Reviewer Name\)

```text
//All Name Fields
  $('.kn-input-name input').keyup(function(){
      this.value = this.value.toUpperCase();
  });
```

or we can target a specific field by using the Knack Field ID

```text
//Specific Field   
   $('input#field_165').keyup(function(){
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
'.kn-input-name input'
```

```text
'input#field_165'
```


