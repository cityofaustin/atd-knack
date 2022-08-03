---
description: How to add big buttons to your application to improve navigation
---

# Big Buttons

![Some big buttons with fa icons](<../../../.gitbook/assets/image (30).png>)

### &#x20;The JS

Big Buttons are nested in an `<a>` tag now instead of a `<div>` tag so that the clickable area of buttons does not expand the width of the Knack page and stays within the button area. The variable `newTab` has been added if you would like a big button to open its url in a new tab. To do this you would pass the `true` argument to the individual button. Additionally, the variable `disabledClass` has been added if you would like to set a big button to be disabled. To do this you would pass the `true` argument to the individual button. This code also lives in the [common folder in the atd-knack GitHub repository](https://github.com/cityofaustin/atd-knack/tree/master/code/common/big-button).

```
/********************************************/
/*************** Big Buttons ****************/
/********************************************/
//Create Big Button nested in a block
function bigButton(id, view_id, url, fa_icon, button_label, target_blank = false, is_disabled = false, callback = null) {
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
  var newTab = target_blank ? " target='_blank'" : "" ;
    $( "<a id='" + id + "' class='big-button-container" + disabledClass + " href='" + url + "'"
      + newTab + "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></a>" ).appendTo("#" + view_id);
  if (callback) callback();
}
```

A handler for each big button

```
// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home");
});
```

To open a big button in a new tab, pass the `true` argument in the handler like this

```
// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home", true);
});
```

To disable a big button, pass the `true` argument in the handler after the `newTab` argument

```
// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home", false, true);
});
```

To do both, open in a new tab and disable the button, pass the `true` argument for both

```
// create large TDS Link button on the Customer Portal Home page
$(document).on("knack-view-render.view_1432", function(event, page) {
  bigButton("tds-link", "view_1432", "https://www.austintexas.gov/department/transportation-development-services", "bank", "TDS Division Home", true, true);
});
```

### The CSS

Big Buttons have shadow to show elevation and provide a 3D effect. They are also `display: block` so we can set width without clickable area extending the width of the page. We create a pointer hover and color effect when enabled and an opacity and cursor effect when disabled. These CSS classes only need to placed once on the CSS page and any buttons can use them. They can be called via JS or HTML.

```
/***************************************/
/************* Big Buttons *************/
/***************************************/
.big-button-container {
  padding: 20px 20px;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px gray;
  font-size: 2.5em;
  max-width: 15em;
  display: block;
}

.big-button-container:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.big-button-disabled {
  background-color: #f7f7f7;
  opacity: 0.6;
  pointer-events: none;
}

a.big-button-container {
  text-decoration: none;
}
```

Add these CSS classes if not already present. If we have a disable button it allows us to change the mouse pointer and set the Font Awesome icons throughout the app to the middle of the line vertically.

```
/****************************************/
/************ Button Effects ************/
/****************************************/
.disabled { cursor: not-allowed; }

/***************************************/
/********* FA Icon Positioning *********/
/***************************************/
.fa { vertical-align: baseline; }
```

### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
Create a Rich Text view

![](<../../../.gitbook/assets/image (66).png>)
{% endtab %}

{% tab title="2️⃣" %}
Open the Rich Text view to identify its View ID and update the view name to include it for easy reference

![](<../../../.gitbook/assets/image (65).png>)
{% endtab %}

{% tab title="3️⃣" %}
Make sure the CSS styling is in place. Update the CSS styling to meet your needs, sometimes buttons may need a larger width to accommodate your button text. Additionally, if you already have the `disabled` and `fa` CSS classes, be sure not to duplicate them.
{% endtab %}

{% tab title="4️⃣" %}
When placing the JS, the function only needs to be placed once but you will need a new handler for each Rich Text view + Big Button that you have.

#### Things to change in JavaScript

*   Change the Button ID in the first set of parentheses to whatever is appropriate to name your button;&#x20;

    ```
    "tds-link"
    ```
*   Change the View ID to match the corresponding Rich Text view where the big button will live;&#x20;

    ```
    "view_1432"
    ```
*   Change the URL to the corresponding page that the button will redirect to;&#x20;

    ```
    "https://www.austintexas.gov/department/transportation-development-services"
    ```
*   Change the Font Awesome icon to match the theme of the button. Knack currently supports [FA version 4 icons](https://fontawesome.com/v4.7.0/). You can also read more about [FA icons here](../looks/fa-icons.md).

    ```
    "bank"
    ```
*   Change the Button Label of the button to the text that will be visible;&#x20;

    ```
    "TDS Division Home"
    ```
* Add the `true` argument if you would like the button to open in a new tab;
*   Add the `true` argument after the newTab argument if you would like the button to be disabled&#x20;

    ```
    true
    ```
{% endtab %}
{% endtabs %}



