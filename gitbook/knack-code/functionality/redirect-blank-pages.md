---
description: How to redirect blank pages as a result of selecting a navigation menu header
---

# Redirect Blank Menu Pages

![Blank page resulting from selecting the menu header](<../../../.gitbook/assets/image (56).png>)

This code helps alleviate a current Knack bug that causes a menu to direct you to a blank page that is not editable in the builder. (No longer a bug as of May 2021)

### The JS

We create a handler that renders on a specified page scene and redirects the page to the specified url (our first top level page in the menu)

```
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

```
'knack-scene-render.scene_28'
```

and the URL

```
window.location.href = "https://atd.knack.com/development-services#development-reviews/"
```

Do this redirect for each navigation menu that has child level pages
