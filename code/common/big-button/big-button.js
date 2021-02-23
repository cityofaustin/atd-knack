function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  $("<div/>", {
    id: div_id,
  }).appendTo("#" + view_id);

  $("#" + div_id).append(
    "<div class='big-button-container'><a class='big-button' href='" +
      url +
      "'><span><i class='fa fa-" +
      fa_icon +
      "'></i></span><span> " +
      button_label +
      "</span></a></div>"
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
