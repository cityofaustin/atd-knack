---
description: >-
  How to create a Refresh button that updates view data without needing to
  reload the page
---

# Refresh View Button









### The JS

```text
/***************************/
/*** Refresh View Button ***/
/***************************/
$(document).on("knack-view-render.view_2698", function (event, page) {
  var button = $(
    "<span style='width: 2em'></span>
    <button id='refresh-view_2698' 
    style='border-radius: .35em !important' 
    class='kn-button is-primary'>
    <i class='fa fa-refresh'></i>
    <span style='width: .5em'></span>Refresh</button>"
  );

  button.insertAfter(
    $("#view_2698").find("form.table-keyword-search").find("a")[0]
  );

  $("#refresh-view_2698").click(function (e) {
    e.preventdefault();
    Knack.views["view_2698"].model.fetch();
  });
});
```

### The CSS



### How to Implement



