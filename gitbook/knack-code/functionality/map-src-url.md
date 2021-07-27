---
description: How to set a Map src for a Rich Text iframe
---

# Set Map iFrame Source URL

### The JS

```text
$(document).on("knack-scene-render.scene_290", function (event, page) {
  // update iframe src with Mitigation Map URL in the Detail View
    var iframe_url = $($("span:contains('apps/webappviewer')")[0]).text()
  $("#mitigationMapiFrame").attr("src", iframe_url);
  // hide the Mitigation Map URL field & view
  $("#view_960").hide();
});
```

### The CSS

None needed 😎

### The HTML

```text
<iframe src="" id="mitigationMapiFrame" style=" border:0px #ffffff none;" name="mitigationMapiFrame" scrolling="no" marginheight="0px" marginwidth="0px" allowfullscreen="" frameborder="0" width="100%" height="500px">
</iframe>
```

### How to Implement

