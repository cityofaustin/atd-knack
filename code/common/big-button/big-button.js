function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  isDisabled,
  callback
) {
  var disabledClass = isDisabled ? " big-button-disabled'" : "'";

  $(
    "<a id='" +
      id +
      "' class='big-button-container" +
      disabledClass +
      " href='" +
      url +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a>"
  ).appendTo("#" + view_id);

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
