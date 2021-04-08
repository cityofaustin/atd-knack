---
description: How to disable breadcrumb navigation links to prevent backwards navigation
---

# Disable Breadcrumb Navigation Links

![Disabled navigation for the TIA Request](../../.gitbook/assets/image%20%2854%29.png)

### The JS

We have a function that checks the session token and disables the .kn-crumbtrail for a specified scene as called by the handler.

```text
/*******************************************/
/*** Disable Breadcrumb Navigation Links ***/
/*******************************************/
function disableBreadCrumbsNonAdmin() {
  if (!Knack.user.session) {
    $(".kn-crumbtrail a").each(function () {
      $(this).replaceWith($(this).text());
    });
  }
}

//Page to disable crumbtrail
$(document).on("knack-scene-render.scene_58", function () {
  disableBreadCrumbsNonAdmin();
});
```

### The CSS

None needed 😎

### How to Implement

```text
"knack-scene-render.scene_58"
```

Adjust Scene ID and you are set 👍







