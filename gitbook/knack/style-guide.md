# Style Guide

## Table of Contents

* Banner Image
* Field Naming Conventions
* Object Naming Conventions
* Colors
* Icons
* Layout
* Page naming conventions
* Page URL conventions

### Banner Image

Use [Gimp software ](https://www.gimp.org/)to create banner background color

You can find the original banner assets and a template for creating a new application banner in the corresponding G drive folder: G:\ATD\ATD\_GIS\03\_RESOURCES\Seals\_Logos\ATD App Banner Assets

* You may use an .xcf GIMP file for an existing application and edit the text layer of the image
* HTML: ![\#163f63](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color
* RGB: ![\#22, 63, 110](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color
* Banner Size: `800 x 160`px \(`650 x 100`px \)
* Font: `Standard or Roboto`
* Font Color: White
* Font Size: 45px for first line \(bolded\), 39px for second line
  * If text length exceeds banner size, adjust font size smaller until it fits appropriately
* Layout: City Logo left side, first line: Name of Application, second line: Austin Transportation Department
* Save .xcf GIMP file in the logo folder for the application on the G Drive
* Export as .png file in the logo folder for the application on the G Drive

### Field Naming Conventions

Follow these guidelines when naming fields:

* Avoid special characters and double spaces unless absolutely necessary
* Use `Title Case` for fields that will be exposed to end-users in the app.
* Use `UPPERCASE_SNAKE_CASE` for fields that are not exposed to the user. Err on the side of longer names that describe functionality, and the field function should proceed it's description. Examples: `COUNT_TASKS_COMPLETED`, `SUM_ATTACHMENTS`.
* Use the \(default\) `lower_case_object_name` for connection fields, unless they are directly exposed to the user, in which case, use `Title Case`.
* Field names should not be renamed in a production application without following a change management process. This is critically important if the application has been integrated with external systems.

### Object Naming Conventions

* Knack objects should be named using `lower_case_snake_case`. No exceptions.
* In the Builder, Knack objects should be ordered alphabetically
* Renaming objects should follow a change management process, however renaming objects will not break API integrations.
* In the ATD Forms app, prepend objects with the acronym for the program or division that owns them and the word `PROGRAM` or `DIVISION`, e.g. HR\_DIVISION\_awards\_and\_recognition\_nominations

## Colors

### Status Colors

* ![\#ff9b9c](https://placehold.it/15/ff9b9c/000000?text=+) `#ff9b9c` - Inactive
* ![\#80d07e](https://placehold.it/15/80d07e/000000?text=+) `#80d07e` - Active

### Other Colors

* ![\#f5901f](https://placehold.it/15/f5901f/000000?text=+) `#f5901f` - Orange
* ![\#ff9b9c](https://placehold.it/15/ff9b9c/000000?text=+) `#ff9b9c` - Return to Requester
* ![\#80d07e](https://placehold.it/15/80d07e/000000?text=+) `#80d07e` - Current
* ![\#4daf4a](https://placehold.it/15/4daf4a/000000?text=+) `#4daf4a` - Approved
* ![\#000000](https://placehold.it/15/000000/000000?text=+) `#000000` - Rejected

### Data Tracker Colors & Icons

* ![\#E41A1C](https://placehold.it/15/E41A1C/000000?text=+) `#E41A1C` - Need To Be Issued `fa fa-exclamation-triangle`
* ![\#367DB7](https://placehold.it/15/367DB7/000000?text=+) `#367DB7` - Issued `fa fa-truck` 
* ![\#974DA2](https://placehold.it/15/974DA2/000000?text=+) `#974DA2` - Needs GIS `fa fa-map-marker`
* ![\#4CAE49](https://placehold.it/15/4CAE49/000000?text=+) `#4CAE49` - Final Review `fa fa-flag-checkered`
* ![\#ADADAD](https://placehold.it/15/ADADAD/000000?text=+) `#ADADAD` - On Hold `fa fa-clock-o`
* ![\#777777](https://placehold.it/15/777777/000000?text=+) `#777777` - Closed `fa fa-check-circle`
* ![\#777777](https://placehold.it/15/777777/000000?text=+) `#777777` - Cancelled `fa fa-close`

### Finance and Purchasing Colors & Icons

* ![\#f5901f](https://placehold.it/15/f5901f/000000?text=+) `#f5901f` - Orange
* ![\#ff9b9c](https://placehold.it/15/ff9b9c/000000?text=+) `#ff9b9c` - Not Submitted
* ![\#ff9b9c](https://placehold.it/15/ff9b9c/000000?text=+) `#ff9b9c` - Returned
* ![\#\#6a6565](https://placehold.it/15/6a6565/000000?text=+) `#6a6565` - Rejected
* ![\#\#6a6565](https://placehold.it/15/6a6565/000000?text=+) `#6a6565` - Cancelled
* ![\#377eb8](https://placehold.it/15/377eb8/000000?text=+) `#377eb8` - Waiting for Approval
* ![\#41ae76](https://placehold.it/15/41ae76/000000?text=+) `#41ae76` - Purchase Review  `fa fa-clipboard`
* ![\#41ae76](https://placehold.it/15/41ae76/000000?text=+) `#41ae76` - Budget Review `fa fa-money`
* ![\#41ae76](https://placehold.it/15/41ae76/000000?text=+) `#41ae76` - Processing \| Purchasing `fa fa-gears`
* ![\#f5901f](https://placehold.it/15/f5901f/000000?text=+) `#f5901f` - Pending Invoice `fa fa-clock-o`
* ![\#41ae76](https://placehold.it/15/41ae76/000000?text=+) `#41ae76` - Processing \| Accounts Payable `fa fa-credit-card`
* ![\#adadad](https://placehold.it/15/adadad/000000?text=+) `#adadad` - Closed `fa fa-check-circle`

### Service Request Colors

* ![\#cd7070](https://placehold.it/15/cd7070/000000?text=+) `#cd7070` - New
* ![\#5c68ff](https://placehold.it/15/5c68ff/000000?text=+) `#5c68ff` - In Progress
* ![\#67b36a](https://placehold.it/15/67b36a/000000?text=+) `#67b36a` - Repairs Completed

## Layout

### Form Layout

* Follow one column form layout \(typically best responsive layout, optimized for tablet/phones\)
* Use default settings for layout
* Add Attachments, Add Comments 
  * \(Setup: `Display page in modal popup`\)
    * If modal popup, can remove the title of the form as it is redundant

### Button Layout

* Depending on business process we do two things
* Add `menu`, add `new page` for form/button \(cleaner look, not as efficient\)
* Add `form directly onto page` \(not as clean of a look, but usually highly efficient for user especially if they have to enter lots of information\)
* More about BUTTON STYLES

### Page naming conventions

* want to make sure the page names are simple yet descriptive
  * ex. `Note` \(isn't as descriptive\), `Page Note` \(is more descriptive of what kind of page it is\)

### Page URL conventions

* Don't want to have duplicate url names 
  * Ex. `add-attachments`, if another attachment form is created with the same name, the page url will automatically go to `add-attachments2` and incrementally go up. \(this does not look great\)

## Button Styles

#### Out of the box "buttons"

* Add Menu&gt;Link to a **new page**
* Add Menu&gt;Link to a **existing page**
* Choose **icon** for button
  * Knack references[ Font Awesome 4.7.0](https://fontawesome.com/v4.7.0/icons/)

#### HTML Buttons



![CSS Code - screen shot](../.gitbook/assets/image%20%2811%29.png)

#### CSS Code: 

`.block { display: block; width: 20%; border: none; background-color: #4CAE49; color: white; padding: 5px 5px; font-size: 20px; cursor: pointer; text-align: center; }`

* `width` changes the width of the HTML Button
* `background` HTML color code 
  * ![\#80d07e](https://placehold.it/15/80d07e/000000?text=+) `#80d07e` 
  *  ![\#367DB7](https://placehold.it/15/367DB7/000000?text=+) `#367DB7`
* `padding` is the top and bottom border of the HTML Button
  * first number: `5px` \(top\)
  * second number: `5px` \(bottom\)
* `font-size` can change font to different size

#### Trigger function and Details

* Used a trigger function from a Details page and replaced the Link Text with HTML
* In Trigger configuration page, html goes here into this field: `Link Text`

![](../.gitbook/assets/image%20%285%29.png)

Enter into `Link Text` field:

`<h2><button class="block><i class="fa fa-plus-circle"></i><strong> New Submission</strong></button></h2>`

Looks like this in the live app

![](../.gitbook/assets/image%20%2810%29.png)

## Links

### Out of the box "links"

**Option 1:** Add Menu&gt;Link to a **URL**

**Option 2:** Add Rich Text

* * Add text for link
  * Click **link** icon on toolbar
  * Click **Insert link**
    * Enter **URL**
    * Enter **Text**
    * Select **Open link in new tab**

### Using field labels & instructions to add links

#### Example 1: Form Title or Instructions

**Option 1:** Link, Link Text and Icon

`<a href="https://atd.knack.com/parking#verify/"> Look up address <i class="fa fa-search"><i></a>` 

![](../.gitbook/assets/image%20%286%29.png)

**Option 2:** Form field label text, link that is an icon

Number of Resident Decals `<a href="https://atd.knack.com/parking#permit-costs/"></i class="fa fa-info-circle"></i></a>`

![](../.gitbook/assets/image%20%287%29.png)

**Option 3:** Link and icon that opens in new tab

`<a href="https://purchweb.austintexas.gov/search/RTMATSSelect.cfm" target=_blank> Contract Agreement </i class="fa fa-external-link-square"></i></a>`

![](../.gitbook/assets/image%20%2812%29.png)

