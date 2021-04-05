---
description: How to disable breadcrumb navigation links to prevent backwards navigation
---

# Disable Breadcrumb Navigation Links

![Disabled navigation for the TIA Request](../../.gitbook/assets/image%20%2854%29.png)

### The JS

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

//TIA Case Details page
$(document).on("knack-scene-render.scene_58", function () {
  disableBreadCrumbsNonAdmin();
});
```











