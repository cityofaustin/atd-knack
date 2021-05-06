# Style Guide

## Table of Contents

* Banner Image
* Knack Naming Conventions \(Pages/Views, Fields, and Objects\)
* Colors
* Icons
* Layout
* Button Styles
* Links

## Banner Image

![](../.gitbook/assets/banner_800x160_coa_template.png)

Use [Gimp software ](https://www.gimp.org/)to create or update a Knack application banner

You can find the original banner assets and a template for creating a new application banner in the corresponding G drive folder: G:\ATD\ATD\_GIS\03\_RESOURCES\Seals\_Logos\ATD App Banner Assets

* You can use the .xcf GIMP template file or an .xcf GIMP file for an existing application and edit the text layer of the banner image
* HTML: ![\#163f63](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color \(make sure Knack Header color is the same\)
* RGB: ![\#22, 63, 110](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color
* Banner Size: `800 x 160`px
* Font: `Standard or Roboto[Roboto Bold = 1st line, Roboto #1(not bolded) = 2nd line]`

  `Gimp may automatically bold the second line due to the text formatting of the first line so be sure to un-bold it`

* Font Color: White
* Font Size: 45px for first line \(bolded\), 36px for second line
  * If text length exceeds banner size, adjust font size smaller until it fits appropriately
* Layout: City Logo left side, first line: Name of Application, second line: Austin Transportation Department
* Save as .xcf GIMP file in the logo folder for the application on the G Drive
* Export as .png file in the logo folder for the application on the G Drive

## Overall Knack Naming Conventions

* No Special Characters
* No Double Spaces
* Try not to exceed 63 characters for any name
* Use singular names over plural names, for example: 'Comment Table' instead of 'Comments Table'

### Page/View Naming Conventions

* Use a unique and descriptive name that no other page will use since the page URL is sourced from its page name
* Use `Title Case`
* Use action verbs where appropriate
* For example: Instead of an 'Add Attachment' page, use 'Add Attachment to TIA Review' instead

### Field Naming Conventions

* Do not begin a field with a number. For example: use 'Five Day Work Week' instead of '5 Day Work Week'
* Do not use generic names such as 'ID', instead use descriptive names like 'productID'
* Use `Title Case` for fields that will be exposed to end-users in the app
* The use of \# or % symbols in field names is acceptable if exposed to end-users
* Use `camelCase` for fields that are only on the backend and not exposed to the user. For formulas and calculations for example use: 'countTasksCompleted' or 'sumOrangeDistrictTransactions'
* Use the \(default\) `lower_case_object_name` for connection fields, unless they are directly exposed to the user, in which case, use `Title Case`.
* Field names should not be renamed in a production application without following a change management process. This is critically important if the application has been integrated with external systems.

### Object Naming Conventions

* Use `snake_case`
* Order objects alphabetically in Knack
* Renaming objects should follow a change management process, however renaming objects will not break API integrations.
* In the ATD Forms app, prepend objects with the acronym for the program or division that owns them and the word `PROGRAM` or `DIVISION`, e.g. HR\_DIVISION\_awards\_and\_recognition\_nominations

## Colors

### Status Colors

* [`#ff9b9c`](https://www.colorhexa.com/ff9b9c) - Inactive 
* ![](../.gitbook/assets/image%20%2897%29%20%281%29.png)
* [`#80d07e`](https://www.colorhexa.com/80d07e) - Active
* ![](../.gitbook/assets/image%20%28102%29.png)

### Other Colors

*  [`#f5901f`](https://www.colorhexa.com/f5901f) - Orange
* ![](../.gitbook/assets/image%20%2894%29%20%283%29.png)
*  [`#ff9b9c`](www.colorhexa.com/ff9b9c) - Return to Requester
* ![](../.gitbook/assets/image%20%2884%29.png)
*  [`#80d07e`](https://www.colorhexa.com/80d07e) - Current
* ![](../.gitbook/assets/image%20%28104%29.png)
*  [`#4daf4a`](https://www.colorhexa.com/4daf4a) - Approved
* ![](../.gitbook/assets/image%20%2888%29.png)
*  [`#000000`](https://www.colorhexa.com/000000) - Rejected
* ![](../.gitbook/assets/image%20%2882%29.png)

### Data Tracker Colors & Icons

*  [`#E41A1C`](https://www.colorhexa.com/e41a1c) - Need To Be Issued [`fa fa-exclamation-triangle`](https://fontawesome.com/v4.7.0/icon/exclamation-triangle)\`\`
* ![](../.gitbook/assets/image%20%2887%29.png)![](../.gitbook/assets/image%20%28106%29.png)
*  [`#367DB7`](https://www.colorhexa.com/367DB7) - Issued [`fa fa-truck`](https://fontawesome.com/v4.7.0/icon/truck) 
* ![](../.gitbook/assets/image%20%2895%29.png)![](../.gitbook/assets/image%20%28105%29.png)
*  [`#974DA2`](https://www.colorhexa.com/974DA2) - Needs GIS `fa fa-map-marker`
* ![](../.gitbook/assets/image%20%2898%29.png)
*  [`#4CAE49`](https://www.colorhexa.com/4CAE49) - Final Review `fa fa-flag-checkered`
* ![](../.gitbook/assets/image%20%28103%29.png)
*  [`#ADADAD`](https://www.colorhexa.com/ADADAD) - On Hold `fa fa-clock-o`
* ![](../.gitbook/assets/image%20%2892%29.png)
* [`#777777`](https://www.colorhexa.com/777777) - Closed `fa fa-check-circle`
* ![](../.gitbook/assets/image%20%28100%29.png)
*  [`#777777`](https://www.colorhexa.com/777777) - Cancelled `fa fa-close`
* ![](../.gitbook/assets/image%20%28100%29.png)

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

## Button Styles

#### Out of the box "buttons"

* Add Menu&gt;Link to a **new page**
* Add Menu&gt;Link to a **existing page**
* Choose **icon** for button
  * Knack references[ Font Awesome 4.7.0](https://fontawesome.com/v4.7.0/icons/)

#### HTML Buttons



![CSS Code - screen shot](../.gitbook/assets/image%20%289%29%20%281%29%20%281%29.png)

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

![](../.gitbook/assets/image%20%288%29.png)

**Option 3:** Link and icon that opens in new tab

`<a href="https://purchweb.austintexas.gov/search/RTMATSSelect.cfm" target=_blank> Contract Agreement </i class="fa fa-external-link-square"></i></a>`

![](../.gitbook/assets/image%20%2812%29.png)

