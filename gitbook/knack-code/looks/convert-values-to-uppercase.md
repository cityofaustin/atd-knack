---
description: How to convert all values input into a field to UPPERCASE
---

# Convert Values to UPPERCASE

![a Case ID converting to UPPERCASE as entered](../../.gitbook/assets/image%20%2853%29.png)

### The JS

We create a handler that uses the keyup function. We can create one that applies to an entire field type such as the Name field \(i.e. Customer Name and Reviewer Name\)

```text
/********************************************/
/*** Convert the Name field to UPPERCASE  ***/
/********************************************/
$(document).on('knack-page-render.any', function(event, page) {
   
  $('.kn-input-name input').keyup(function(){
      this.value = this.value.toUpperCase();
  });
})
```

or we can target a specific field by using the Knack Field ID.

```text
/*********************************************/
/*** Convert a specific field to UPPERCASE ***/
/*********************************************/
$(document).on('knack-page-render.any', function(event, page) {
  
   $('input#field_165').keyup(function(){
      this.value = this.value.toUpperCase();
  });
})
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



