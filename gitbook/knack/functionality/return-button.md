---
description: How to create a Return Button with a Rich Text view
---

# Return to Previous Page Button





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
	$('#'+appviews[x]).prepend("<button id='return-button'>Return to Case Details</button>");
	document.getElementById('return-button').addEventListener('click', function() {
      	window.history.back();
    });        

  }; // if  
};	// for
});
```

### The CSS

We mostly use Knack's built in styling for return buttons with a few exceptions. We call it by its specific ID Selector.

```text
#return-button {
  padding: 5px 10px;
  cursor: pointer;
  box-shadow: 0px 2px 4px 0px gray;
}
```





