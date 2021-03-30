---
description: Add Big Buttons to your Knack applications!
---

# CODE: Big Buttons

![](../.gitbook/assets/image%20%2830%29.png)

### Steps

* Navigate to the settings cog on your application, click “API & Code”
* There is a “Javascript” and “CSS” tab you can toggle to
  * There are 2 snippets of code: 1 for the Javascript tab and 1 for the CSS tab

###  Big Button JS code

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

#### Things to change in Javascript

* Change the Button ID code in the first set of parentheses to whatever is appropriate to name your button; 

  ```text
  "development-reviews"
  ```

* Change the View ID code to match the corresponding Rich Text view where the big button will live; 

  ```text
  "view_15"
  ```

* Change the URL code to the corresponding page that the button will redirect to; 

  ```text
  "https://atd.knack.com/development-services#home/development-reviews/"
  ```

* Change the Font Awesome icon to match the theme of the button. Knack currently supports FA version 4 icons. \([https://fontawesome.com/v4.7.0/](https://fontawesome.com/v4.7.0/)\) 

  ```text
  "list-ul"
  ```

* Change the Button Label code of the button to the text that will be visible; 

  ```text
  "Development Reviews"
  ```

* Lastly, only add the `true` argument if you would like the button to be disabled.

  ```text
  true
  ```



### Big Button CSS code

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
 
a.big-button-container {
  text-decoration: none;
}

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

### Creating Page Buttons

1. Create a page or on the page your want to add the big button, add a RICH TEXT view. 
2. Open the newly created Rich Text view and look at the URL. Take note of the view \#.

   [https://builder.knack.com/atd/development-services\#pages/scene\_1/views/view\_15](https://builder.knack.com/atd/development-services#pages/scene_1/views/view_15)

3. Edit the name of your Rich Text view and be sure to append the view \# to it to easily use it for code reference without having to look every time.
4. You will then use this View ID \# when creating or updating the JS code above.

#### Example

[https://builder.knack.com/atd/development-services\#pages/scene\_1](https://builder.knack.com/atd/development-services#pages/scene_1)

![](../.gitbook/assets/image%20%2813%29.png)





