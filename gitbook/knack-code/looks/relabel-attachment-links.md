---
description: How to shorten attachment links to something more readable
---

# Relabel Attachment Links

![Attachment links](<../../../.gitbook/assets/image (60).png>)

Without this code, when attachment file names display in tables they can be super long and distort the readability of the field and the table as a whole. Relabeling gives the column a consistent width. This code could be further updated to specify a certain view for your specific use case.

### The JS

We create a handler that renders on any application view and sets the attachment link text.

```
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

Adjust text to the preferred nomenclature if other than Attachment (i.e. "File")

```
"Attachment"
```



