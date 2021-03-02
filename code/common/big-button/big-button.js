/**
 * Template and append a button link, disable it optionally, and invoke a callback function argument
 * @parameter {string} id - id attribute of the a tag in the button link
 * @parameter {string} view_id - Knack view id to append button link to
 * @parameter {string} url - Destination to navigate to on click
 * @parameter {string} fa_icon - Icon string (https://support.knack.com/hc/en-us/articles/226165208-Working-with-Icons#2-complete-list-of-icons)
 * @parameter {bool} isDisabled - Is button disabled (defaults to false)
 * @parameter {function} callback - Function that is invoked after appending the button link
 */
function bigButton(
  id,
  view_id,
  url,
  fa_icon,
  button_label,
  isDisabled = false,
  callback = null
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

// Some examples

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
