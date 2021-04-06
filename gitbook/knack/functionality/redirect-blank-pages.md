---
description: How to redirect blank pages as a result of selecting a navigation menu header
---

# Redirect Blank Menu Pages

![Blank page resulting from selecting the menu header](../../.gitbook/assets/image%20%2856%29.png)

This code helps alleviate a current Knack bug that causes a menu to direct you to a blank page that is not editable in the builder.

### The JS

We create a handler that renders on a specified page scene and redirects the page to the specified url \(our first top level page in the menu\)

```text
/**************************************/
/*** Redirect from Blank Menu Pages ***/
/**************************************/
//Menu Page
$(document).on('knack-scene-render.scene_28', function(event, scene) { 
window.location.href = "https://atd.knack.com/development-services#development-reviews/";
});
```

### The CSS

None needed 😎

### How to Implement

Adjust the Scene ID

```text
'knack-scene-render.scene_28'
```

and the URL

```text
window.location.href = "https://atd.knack.com/development-services#development-reviews/"
```

Do this redirect for each navigation menu that has child level pages

