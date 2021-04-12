---
description: How to detect if user is using Internet Explorer browser and display a message
---

# Detect IE





### The JS

```text
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  // other browser
  return false;
}
```

```text
$(document).on("knack-scene-render.scene_1", function () {
  if (detectIE()) {
    alert(
      "You are using Microsoft Internet Explorer or Edge to view this page. We recommend using Firefox or Chrome. Contact your system administrator for assistance."
    );
  }
});
```

### The CSS



### How to Implement



