# Knack Custom Code

## About

This README contains common code snippets used to customize DTS Knack applications. The sub-folders within this folder hold custom JavaScript and CSS for specific DTS Knack applications.

## Big Button

```js
function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button
  $("<div/>", {
    id: div_id,
  }).appendTo("#" + view_id);

  $("#" + div_id).append(
    "<a class='big-button' href='" +
      url +
      "'><div class='big-button-container'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></div></a>"
  );

  if (callback) callback();
}

//>>>HOME TAB BUTTONS
$(document).on("knack-view-render.view_15", function (event, page) {
  // create large button on the home page
  bigButton(
    "development-reviews",
    "view_15",
    "https://atd.knack.com/development-services#home/development-reviews/",
    "list-ul",
    "Development Reviews"
  );
});

$(document).on("knack-view-render.view_55", function (event, page) {
  // create large button on the home page
  bigButton(
    "my-reviews",
    "view_55",
    "https://atd.knack.com/development-services#my-reviews/",
    "male",
    "My Reviews"
  );
});
```
