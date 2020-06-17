# CODE: Big Buttons

Need to re-write this guide

### Steps

* Navigate to the settings cog on your application, click “API & Code”
* There is a “Javascript” and “CSS” tab you can toggle to
  * There are 2 snippets of code: 1 for the Javascript tab and 1 for the CSS tab

####  Big Button JS code

```text
function bigButton(div_id, view_id, url, fa_icon, button_label, callback) {
  // create a large button
  
    $("<div/>", {
      id: div_id,
    }).appendTo("#" + view_id);
    
  $("#" + div_id).append("<a class='big-button' href='" + url + "'><div class='big-button-container'><span><i class='fa fa-" + fa_icon + "'></i></span><span> " + button_label + "</span></div></a>");

  if(callback) callback();
}
	//>>>HOME TAB BUTTONS
$(document).on('knack-view-render.view_15', function(event, page) {
  // create large button on the home page
    bigButton('development-reviews', 'view_15', "https://atd.knack.com/development-services#home/development-reviews/", "list-ul", "Development Reviews");
});
$(document).on('knack-view-render.view_55', function(event, page) {
    // create large button on the home page
    bigButton('my-reviews', 'view_55', "https://atd.knack.com/development-services#my-reviews/", "male", "My Reviews");
});
```

 $\(document\).on\('knack-view-render.view\_15', function\(event, page\) { 

  // create large button on the home page 

     bigButton\('development-reviews', 'view\_15', "[https://atd.knack.com/development-services\#home/development-reviews/](https://atd.knack.com/development-services#home/development-reviews/)", "list-ul", "Development Reviews"\); 

}\); 

#### Things to change in Javascript

* Change the code in two places to match the corresponding view, ex. `view_15` to `view_100` 
* Change the code where `development-review` is to be the page url plug, ex. `new-form`
* Change the code where the page url is `https://atd.knack.com/development-services#home/development-reviews/`to the correct page url, ex. `https://atd.knack.com/new-app#home/new-form` 
  * \(Remember this is hard coded!! so if you make a Test environment it will redirect to the Production environment\)
* Change the icon that shows up beside the button, ex. `list-ul` to `plus-circle`
* Change the name of the button `Development Reviews` to `New Form`

$\(document\).on\('knack-view-render.`view_15`', function\(event, page\) { 

  // create large button on the home page 

     bigButton\('`development-reviews`', '`view_15`', "[`https://atd.knack.com/development-services#home/development-reviews/`](https://atd.knack.com/development-services#home/development-reviews/)", "`list-ul`", "`Development Reviews`"\); 

}\); 

#### Big Button CSS code

```text
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

#### Creating Page Buttons

Create page or on the page your want to add the big button. Add a RICH TEXT widget. 

When you open the RICH TEXT views, they have their own views. 

* Ex. “Development Reviews \| 15” 
  * [`https://builder.knack.com/atd/development-services#pages/scene_1/views/view_15`](https://builder.knack.com/atd/development-services#pages/scene_1/views/view_15)\`\`
* Reference the ex. `view_15` 
* Normally rename the Rich Text box to ex. `Development Reviews | 15`

![](../.gitbook/assets/image%20%2813%29.png)

#### Example

My example: [`https://builder.knack.com/atd/development-services#pages/scene_1`](https://builder.knack.com/atd/development-services#pages/scene_1)\`\`



