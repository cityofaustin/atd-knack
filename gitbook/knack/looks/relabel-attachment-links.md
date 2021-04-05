---
description: How to shorten attachment links to something more readable
---

# Relabel Attachment Links



### The JS

We create a handler that renders on any application view and sets the attachment link text.

```text
/********************************************************/
/** Relabel Attachment Links in Tables to 'Attachment' **/
/********************************************************/
$(document).on('knack-view-render.any', function(event, view, data) {
 
 $("a.kn-view-asset").html("Attachment"); 
 
});
```

### The CSS

None needed 😎

### How to Implement

Adjust text to the preferred nomenclature if other than Attachment \(i.e. "File"\)

```text
"Attachment"
```





