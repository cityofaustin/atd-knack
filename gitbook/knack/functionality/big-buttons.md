---
description: How to add big buttons to your application to improve navigation
---

# Big Buttons

![Some big buttons with fa icons](../../.gitbook/assets/image%20%2830%29.png)

###  The JS

Big Buttons are nested in an `<a>` tag now instead of a `<div>` tag so that the clickable area of buttons does not expand the width of the Knack page and stays within the button area. Additionally, the variable `disabledClass` has been added if you would like to set a big button to be disabled. To do this you would pass the `true` argument to the individual button.

```text
/********************************************/
/*************** Big Buttons ****************/
/********************************************/
//Create Big Button nested in a block
function bigButton(id, view_id, url, fa_icon, button_label, is_disabled, callback) 
{
  var disabledClass = is_disabled ? " big-button-disabled'" : "'";
    $( "<a id='" + 
    id + "' class='big-button-container" + 
    disabledClass + 
    " href='" + url + 
    "'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + 
    button_label + "</span></a>" 
    ).appendTo("#" + view_id);

  if (callback) callback();
}
```

A handler for each big button

```text
// create large Development Reviews button on the Home page
$(document).on("knack-view-render.view_15", function(event, page) {
    bigButton(
    "development-reviews", 
    "view_15", 
    "https://atd.knack.com/development-services#home/development-reviews/", 
    "list-ul", 
    "Development Reviews"
    );
});
```

To disable a big button pass the `true` argument in the handler

```text
// create a DISABLED Development Reviews button on the Home page
$(document).on("knack-view-render.view_15", function(event, page) {
    bigButton(
    "disabled-development-reviews", 
    "view_15", 
    "https://atd.knack.com/development-services#home/development-reviews/", 
    "list-ul", 
    "Disabled Development Reviews", 
    true
    );
});
```



### The CSS

Big Buttons have shadow to show elevation and provide a 3D effect. They are also `display: block` so we can set width without clickable area extending the width of the page. We create a pointer hover and color effect when enabled and an opacity and cursor effect when disabled. These CSS classes only need to placed once on the CSS page and any buttons can use them. They can be called via JS or HTML.

```text
/***************************************/
/************* Big Buttons *************/
/***************************************/
.big-button-container {
  padding: 10px 10px;
  margin: 20px;
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px gray;
  font-size: 2.5em;
  max-width: 12em;
  display: block;
}
 
.big-button-container:hover {
    background-color: #f7f7f7;
    cursor: pointer;
}

.big-button-disabled {
  background-color: #f7f7f7;
  opacity: 0.6;
} 

//this prevents the natural underlining Knack does for links 
a.big-button-container {
  text-decoration: none;
}
```

Add these CSS classes if not already present

```text
/****************************************/
/************ Button Effects ************/
/****************************************/
.disabled { 
  cursor: not-allowed; 
}

/****************************************/
/************* Icon Effects *************/
/****************************************/
.fa { vertical-align: baseline; }
```

### How to Implement

{% tabs %}
{% tab title="First Step" %}
Create a Rich Text view

![](../../.gitbook/assets/image%20%2865%29.png)
{% endtab %}

{% tab title="Second Step" %}
Open the Rich Text view to identify its View ID and update the view name to include it for easy reference

![](../../.gitbook/assets/image%20%2864%29.png)
{% endtab %}

{% tab title="Third Step" %}
Make sure the CSS styling is in place. Update the CSS styling to meet your needs, sometimes buttons may need a larger width to accommodate your button text. Additionally, if you already have the `disabled` and `fa` CSS classes, be sure not to duplicate them.
{% endtab %}

{% tab title="Fourth Step" %}
When placing the JS, the function only needs to be placed once but you will need a new handler for each Rich Text view + Big Button that you have.

#### Things to change in JavaScript

* Change the Button ID in the first set of parentheses to whatever is appropriate to name your button; 

  ```text
  "development-reviews"
  ```

* Change the View ID to match the corresponding Rich Text view where the big button will live; 

  ```text
  "view_15"
  ```

* Change the URL to the corresponding page that the button will redirect to; 

  ```text
  "https://atd.knack.com/development-services#home/development-reviews/"
  ```

* Change the Font Awesome icon to match the theme of the button. Knack currently supports [FA version 4 icons](https://fontawesome.com/v4.7.0/). You can also read more about FA icons here.

  ```text
  "list-ul"
  ```

* Change the Button Label of the button to the text that will be visible; 

  ```text
  "Development Reviews"
  ```

* Lastly, only add the `true` argument if you would like the button to be disabled.

  ```text
  true
  ```
{% endtab %}
{% endtabs %}





