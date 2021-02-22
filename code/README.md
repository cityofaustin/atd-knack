# Knack Custom Code

## About

This README contains common code snippets used to customize DTS Knack applications. The sub-folders within this folder hold custom JavaScript and CSS for specific DTS Knack applications.

## Big Button

JavaScript code

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
```

CSS code

```css
.big-button-container {
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px gray;
  font-size: 2.5em;
  padding: 10px;
  margin: 20px;
  max-width: 12em;
}

.big-button-container:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.fa {
  vertical-align: middle;
}

a.big-button {
  text-decoration: none;
}
```

## Custom Login Buttons

JavaScript code

```js
$(document).on("knack-view-render.any", function (event, page) {
  // Find SSO button and existing custom button
  var $ssoButton = $(".kn-sso-container");
  var $coacdLoginDiv = $("#coacd-button-login");

  // If SSO button exists on page and there isn't already a custom button
  if ($ssoButton.length && !$coacdLoginDiv.length) {
    var $ssoView = $ssoButton.closest("[id^=view_]");
    var viewId = $ssoView.get(0).id;

    customizeLoginButton(viewId);
  }
});

function customizeLoginButton(viewId) {
  // Hide Knack default SSO button, login form, login title, and any other children
  $("#" + viewId)
    .children()
    .hide();

  var url = Knack.url_base + Knack.scene_hash + "auth/COACD";

  // Create a div for Login buttons
  var $coacdButton = $("<div/>", {
    id: "coacd-button-login",
  });
  $coacdButton.appendTo("#" + viewId);

  // Append Big SSO Login button and non-SSO Login button
  $coacdButton.append(
    "<a class='big-button' href='" +
      url +
      "'><div class='big-button-container'><span><i class='fa fa-sign-in'></i></span><span> Sign-in</span></div></a>"
  );

  $coacdButton.append(
    "<a class='small-button' href='javascript:void(0)'>" +
      "<div class='small-button-container'><span><i class='fa fa-lock'></i></span><span> Non-COA Sign-In</span></div></a>"
  );

  // On non-SSO button click, hide SSO and non-SSO buttons and show Knack Login form
  var $nonCoacdButton = $(".small-button");
  $nonCoacdButton.click(function () {
    $("#" + viewId)
      .children()
      .show();
    $(".small-button-container,.big-button-container").hide();
    $(".kn-sso-container").hide();
  });
}
```

CSS code

```css
/* Big Buttons */
.big-button-container {
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px gray;
  font-size: 2.5em;
  padding: 10px;
  margin: 20px;
  max-width: 12em;
}

.big-button-container:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.fa {
  vertical-align: middle;
}

a.big-button {
  text-decoration: none;
}

/* Small Buttons */
.small-button-container {
  padding: 5px;
  margin: 20px;
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px gray;
  font-size: 1em;
  max-width: 15em;
  background-color: #babbbc;
  color: white;
}

.small-button-container:hover {
  background-color: #4c4c4c;
  cursor: pointer;
}

a.small-button {
  text-decoration: none;
}
```
