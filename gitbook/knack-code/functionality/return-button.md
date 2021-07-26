---
description: How to create a Return Button with a Rich Text view
---

# Return to Previous Page Button

![With disabled navigation, we provide a top of page return button for users](../../.gitbook/assets/image%20%2859%29.png)

![Return button allows user to escape a lengthy edit page without having to scroll to the bottom](../../.gitbook/assets/image%20%2858%29.png)

There are instances where Knack's built in back link at the bottom of every page detract from the page experience or do not provide enough functionality. We create these return buttons to solve a couple problems; when a page's content is too long making it so the back link is too far from the top navigation resulting in more page scrolling, or when we disable top navigation to prevent a user from navigating to a specific page, but we still want the user to be able to navigate to their previous page. These previous pages tend to be major landing pages where important details or navigation are present, and therefore, easy access to these pages is important.

### The JS

We create a handler that creates some variables for us to indicate our specific rich text views to iterate through and where our buttons will render. For each view indicated we call the return-button selector and set the button text for our specific use case. We have an event listener that enables the button to function like a browser back button and take the user to the previous page.

```text
/*********************************************/
/*** Add a Return Button to specific views ***/
/*********************************************/
$(document).on("knack-view-render.any", function(event, view) {
var appviews=["view_601","view_602","view_604","view_605"];
var key=(view.key!=undefined)?view.key.toLowerCase().trim():"";
var l=appviews.length;
for (var x=0; x<l; x++) {

if (appviews[x]==key) {
	$('#'+appviews[x]).prepend("<button id='previous-window-button'><i class='fa fa-arrow-left'/> Previous Window</button>");
	document.getElementById('previous-window-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});
```

### The CSS

We style the previous window buttons just like Knack buttons. We call it by its specific ID Selector.

```text
#previous-window-button {
  border-style: solid;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px gray;
  background-color: #ebebeb;
  color: #163f6e;
  padding: 5px 10px;
  font-size: 1.1em;
  text-align: center;
}

#previous-window-button:hover {
  cursor: pointer;
  opacity: 0.9;
  border-color: gray;
}
```

### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
Determine which pages you would like the return buttons to be present. A Rich Text view will need to be added at the top of each of these pages. We specifically add these views to the top of the page but there may be instances where you would want to include in the middle of a long page or below certain views. Adjust accordingly.

![](../../.gitbook/assets/image%20%2855%29.png)

Nothing will need to be placed inside this Rich Text view but you will need to know its View ID
{% endtab %}

{% tab title="2️⃣" %}
Once you have placed your rich text views and know their View ID's, adjust the View ID's in the JS accordingly. Add or remove views based on your need.

```text
appviews=["view_601","view_602","view_604","view_605"]
```
{% endtab %}

{% tab title="3️⃣" %}
Next, adjust the button text for the specified views

```text
"<button id='previous-window-button'><i class='fa fa-arrow-left'/> Previous Window</button>"
```
{% endtab %}

{% tab title="4️⃣" %}
Lastly, after updating the code in your app, if you wanted to customize the button look further, you could do so using the specified CSS ID Selector or utilizing a new or existing CSS Class Selector.
{% endtab %}
{% endtabs %}





