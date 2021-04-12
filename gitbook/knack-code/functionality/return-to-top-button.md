---
description: How to create a Return to Top link button at the bottom of a page
---

# Return to Top Button







### The JS

```text
$(document).on("knack-scene-render.scene_1028", function() {
  $backToTop = $(".kn-back-link").append(
    "<span class='back-to-top-link'> Back to top</span>"
  );
  $backToTop.on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $(".kn-back-link a").hide();
});
```

### The CSS

```text
.back-to-top-link {
  color: #07467c;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 700 !important;
  font-size: 18px;
}

.back-to-top-link:before {
  font-family: "FontAwesome";
  content: "\f0aa";
  display: inline-block;
  padding-right: 3px;
  vertical-align: middle;
  font-weight: 900;
}
```

### How to Implement



