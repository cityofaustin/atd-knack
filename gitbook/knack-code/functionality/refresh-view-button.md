---
description: >-
  How to create a Refresh button that updates view data without needing to
  reload the page
---

# Refresh View Button

![a Table View with the Keyword Search option enabled and Refresh button](../../.gitbook/assets/image%20%2874%29.png)

Sometimes Knack will fail or be slow to update a record table, especially if you have a same-page multi-submit form, or a modal multi-submit form where a user can submit the form many times, creating new records until done. If data does not show up in table or update, a page refresh would be necessary. Additionally, when records are added or updated often, the refresh button reinforces the user that they are working with all available and updated records.

### The JS

```text
/***************************/
/*** Refresh View Button ***/
/***************************/
$(document).on("knack-view-render.view_2698", function (event, page) {
  var button = $(
    "<span style='width: 2em'></span><button id='refresh-view_2698' style='border-radius: .35em' class='kn-button is-primary'><i class='fa fa-refresh'></i><span style='width: .5em'></span>Refresh</button>"
  );

  button.insertAfter( //places button next to keyword search option
    $("#view_2698").find("form.table-keyword-search").find("a")[0]
  );

  $("#refresh-view_2698").click(function (e) {
    e.preventdefault();
    Knack.views["view_2698"].model.fetch();
  });
});
```

### The CSS

None needed 😎

### How to Implement

Adjust the View ID's with your own

```text
view_2698
```

and make sure that the Keyword Search option is enabled for your View

![](../../.gitbook/assets/image%20%2875%29.png)

