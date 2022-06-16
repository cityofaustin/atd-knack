# Style Guide

## Table of Contents

* Banner Image
* Knack Naming Conventions (Pages/Views, Fields, and Objects)
* Colors
* Icons
* Layout
* Button Styles
* Links

## Banner Image

![](../../.gitbook/assets/banner\_800x160\_coa\_template.png)

Use [Gimp software ](https://www.gimp.org/)to create or update a Knack application banner

You can find the original banner assets and a template for creating a new application banner in the corresponding G drive folder: G:\ATD\ATD\_GIS\03\_RESOURCES\Seals\_Logos\ATD App Banner Assets

* You can use the .xcf GIMP template file or an .xcf GIMP file for an existing application and edit the text layer of the banner image
* HTML: ![#163f63](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color (make sure Knack Header color is the same)
* RGB: ![#22, 63, 110](https://placehold.it/15/163f63/000000?text=+) `#163f63` - Background Color
* Banner Size: `800 x 160`px
*   Font: `Standard or Roboto[Roboto Bold = 1st line, Roboto #1(not bolded) = 2nd line]`

    `Gimp may automatically bold the second line due to the text formatting of the first line so be sure to un-bold it`
* Font Color: White
* Font Size: 45px for first line (bold), 36px for second line
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
* The use of # or % symbols in field names is acceptable if exposed to end-users
* Use `camelCase` for fields that are only on the backend and not exposed to the user. For formulas and calculations for example use: 'countTasksCompleted' or 'sumOrangeDistrictTransactions'
* Use the (default) `lower_case_object_name` for connection fields, unless they are directly exposed to the user, in which case, use `Title Case`.
* Field names should not be renamed in a production application without following a change management process. This is critically important if the application has been integrated with external systems.

### Object Naming Conventions

* Use `snake_case`
* Order objects alphabetically in Knack
* Renaming objects should follow a change management process, however renaming objects will not break API integrations.
* In the ATD Forms app, prepend objects with the acronym for the program or division that owns them and the word `PROGRAM` or `DIVISION`, e.g. HR\_DIVISION\_awards\_and\_recognition\_nominations

## Colors

### Status Colors

| Link                                         | HEX Code  | Swatch                                          | Name        | HTML Code    | Font Awesome Icons |
| -------------------------------------------- | --------- | ----------------------------------------------- | ----------- | ------------ | ------------------ |
| [#ff9b9c](https://www.colorhexa.com/ff9b9c)  | `#ff9b9c` | ![](<../../.gitbook/assets/image (97) (1).png>) | Inactive/No | ------------ | ------------       |
| [#80d07e](https://www.colorhexa.com/80d07e)  | `#80d07e` | ![](<../../.gitbook/assets/image (102).png>)    | Active/Yes  | ------------ | ------------       |
|                                              |           |                                                 |             |              |                    |
| [#f6fa6b](https://www.colorhexa.com/f6fa6b)  | `#f6fa6b` | ![](<../../.gitbook/assets/image (123).png>)    | Yellow      | ------------ | ------------       |
| [#0028ff ](https://www.colorhexa.com/0028ff) | `#0028ff` | ![](<../../.gitbook/assets/image (127).png>)    | Blue        | ------------ | ------------       |

### Signs & Markings Data Tracker Colors & Icons

| Link                                         | HEX Code  | Swatch                                       | Name               | HTML Code                                    | Font Awesome Icons                                                     |
| -------------------------------------------- | --------- | -------------------------------------------- | ------------------ | -------------------------------------------- | ---------------------------------------------------------------------- |
| [#E41A1C](https://www.colorhexa.com/e41a1c)  | `#E41A1C` | ![](<../../.gitbook/assets/image (87).png>)  | Need To Be Issued  | `<i class="fa fa-exclamation-triangle"></i>` | ![](<../../.gitbook/assets/image (106).png>)                           |
| [#367DB7](https://www.colorhexa.com/367DB7)  | `#367DB7` | ![](<../../.gitbook/assets/image (95).png>)  | Issued             | `<i class="fa fa-truck"></i>`                | <p></p><p><img src="../../.gitbook/assets/image (105).png" alt=""></p> |
| [#ADADAD](https://www.colorhexa.com/ADADAD)  | `#ADADAD` | ![](<../../.gitbook/assets/image (92).png>)  | On Hold            | `<i class="fa fa-clock-o"></i>`              | ![](<../../.gitbook/assets/image (113).png>)                           |
| [#974DA2](https://www.colorhexa.com/974DA2)  | `#974DA2` | ![](<../../.gitbook/assets/image (98).png>)  | Needs GIS          | `<i class="fa fa-map-marker"></i>`           | ![](<../../.gitbook/assets/image (126).png>)                           |
| [#4CAE4](https://www.colorhexa.com/4CAE49)`` | `4CAE49`  | ![](<../../.gitbook/assets/image (103).png>) | Final Review       | `<i class="fa fa-flag-checkered"></i>`       | ![](<../../.gitbook/assets/image (125).png>)                           |
| [#777777](https://www.colorhexa.com/777777)  | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Closed             | `<i class="fa fa-checked-circle"></i>`       | ![](<../../.gitbook/assets/image (109).png>)                           |
| [#777777](https://www.colorhexa.com/777777)  | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Cancelled          | `<i class="fa fa-times"></i>`                | ![](<../../.gitbook/assets/image (110).png>)                           |

### Arterial Management Data Tracker Colors & Icons

| Link                                        | HEX Code  | Swatch                                       | Name        | HTML Code                              | Font Awesome Icons                                                            |
| ------------------------------------------- | --------- | -------------------------------------------- | ----------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Unassigned  | `<i class="fa fa-asterisk"></i>`       | ![](<../../.gitbook/assets/image (120).png>)                                  |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | In Progress | `<i class="fa fa-wrench"></i>`         | <p></p><p><img src="../../.gitbook/assets/image (80).png" alt=""></p>         |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Assigned    | `<i class="fa fa-bullhorn"></i>`       | <p></p><p><img src="../../.gitbook/assets/image (38).png" alt=""></p>         |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Submit      | `<i class="fa fa-flag-checkered"></i>` | <p></p><p><img src="../../.gitbook/assets/image (125).png" alt=""></p>        |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Closed      | `<i class="fa fa-checked-circle"></i>` | <p></p><p><img src="../../.gitbook/assets/image (109).png" alt=""></p><p></p> |
| [#777777](https://www.colorhexa.com/777777) | `#777777` | ![](<../../.gitbook/assets/image (100).png>) | Cancelled   | ------------                           | ------------                                                                  |

### Service Request Colors

| Link                                         | HEX Code     | Swatch                                       | Name              | HMTL Code    | Font Awesome Icons |
| -------------------------------------------- | ------------ | -------------------------------------------- | ----------------- | ------------ | ------------------ |
| [#cd7070](https://www.colorhexa.com/cd7070)  | `#cd7070`    | ![](<../../.gitbook/assets/image (90).png>)  | New               | ------------ | ------------       |
| [#5c68ff](https://www.colorhexa.com/5c68ff)  | `#5c68ff`    | ![](<../../.gitbook/assets/image (124).png>) | In Progress       | ------------ | ------------       |
| [#67b36a](https://www.colorhexa.com/67b36a)  | `#67b36a`    | ![](<../../.gitbook/assets/image (81).png>)  | Repairs Completed | ------------ | ------------       |
| ------------                                 | ------------ | ------------                                 | Close (Resolved)  | ------------ | ------------       |
| ------------                                 | ------------ | ------------                                 | Close (Duplicate) | ------------ | ------------       |

### Finance and Purchasing Colors & Icons

| Link                                          | HEX Code     | Swatch                                       | Name                          | HTML Code                           | Font Awesome Icons                                                     |
| --------------------------------------------- | ------------ | -------------------------------------------- | ----------------------------- | ----------------------------------- | ---------------------------------------------------------------------- |
| [#ff9b9c ](https://www.colorhexa.com/ff9b9c)  | `#ff9b9c`    | ![](<../../.gitbook/assets/image (119).png>) | Not Submitted                 | ------------                        | ------------                                                           |
| [#377eb8](https://www.colorhexa.com/377eb8)   | `#377eb8`    | ![](<../../.gitbook/assets/image (111).png>) | Waiting for Approval          | ------------                        | ------------                                                           |
| [#ff9b9c ](https://www.colorhexa.com/ff9b9c)  | `#ff9b9c`    | ![](<../../.gitbook/assets/image (99).png>)  | Returned                      | ------------                        | ------------                                                           |
| [#6a6565](https://www.colorhexa.com/6a6565)   | `#6a6565`    | ![](<../../.gitbook/assets/image (121).png>) | Rejected                      | ------------                        | ------------                                                           |
| [#41ae76](https://www.colorhexa.com/41ae76)   | `#41ae76`    | ![](<../../.gitbook/assets/image (115).png>) | Budget Review                 | `<i class="fa fa-money"></i>`       | <p></p><p><img src="../../.gitbook/assets/image (114).png" alt=""></p> |
| [#41ae76](https://www.colorhexa.com/41ae76)   | `#41ae76`    | ![](<../../.gitbook/assets/image (101).png>) | Purchase Review               | `<i class="fa fa-clipboard"></i>`   | ![](<../../.gitbook/assets/image (116).png>)                           |
| [#41ae76](https://www.colorhexa.com/41ae76)   | `#41ae76`    | ![](<../../.gitbook/assets/image (93).png>)  | Processing\| Purchasing       | `<i class="fa fa-cogs"></i>`        | ![](<../../.gitbook/assets/image (122).png>)                           |
| [#41ae76](https://www.colorhexa.com/41ae76)   | `#41ae76`    | ![](<../../.gitbook/assets/image (85).png>)  | Processing\| Accounts Payable | `<i class="fa fa-credit-card"></i>` | ![](<../../.gitbook/assets/image (86).png>)                            |
| [#f5901f](https://www.colorhexa.com/f5901f)   | `#f5901f`    | ![](<../../.gitbook/assets/image (89).png>)  | Pending Invoice               | `<i class="fa fa-clock-o"></i>`     | ![](<../../.gitbook/assets/image (113).png>)                           |
| [#6a6565](https://www.colorhexa.com/6a6565)   | `#6a6565`    | ![](<../../.gitbook/assets/image (77).png>)  | Cancelled                     | ------------                        | ------------                                                           |
| ------------                                  | ------------ | ![](<../../.gitbook/assets/image (47).png>)  | Closed                        | ------------                        | `#ADADAD` ![](<../../.gitbook/assets/image (109).png>)``               |

## Layout

### Form Layout

* Follow one column form layout (typically best responsive layout, optimized for tablet/phones)
* Use default settings for layout
* Add Attachments, Add Comments&#x20;
  * (Setup: `Display page in modal popup`)
    * If modal popup, can remove the title of the form as it is redundant

### Button Layout

* Depending on business process we do two things
* Add `menu`, add `new page` for form/button (cleaner look, not as efficient)
* Add `form directly onto page` (not as clean of a look, but usually highly efficient for user especially if they have to enter lots of information)
* More about BUTTON STYLES

## Button Styles

#### Out of the box "buttons"

* Add Menu>Link to a **new page**
* Add Menu>Link to a **existing page**
* Choose **icon** for button
  * Knack references[ Font Awesome 4.7.0](https://fontawesome.com/v4.7.0/icons/)

#### HTML Buttons



![CSS Code - screen shot](<../../.gitbook/assets/image (9) (1) (1).png>)

#### CSS Code:&#x20;

`.block { display: block; width: 20%; border: none; background-color: #4CAE49; color: white; padding: 5px 5px; font-size: 20px; cursor: pointer; text-align: center; }`

* `width` changes the width of the HTML Button
* `background` HTML color code&#x20;
  * ![#80d07e](https://placehold.it/15/80d07e/000000?text=+) `#80d07e`&#x20;
  * &#x20;![#367DB7](https://placehold.it/15/367DB7/000000?text=+) `#367DB7`
* `padding` is the top and bottom border of the HTML Button
  * first number: `5px` (top)
  * second number: `5px` (bottom)
*   `font-size` can change font to different size



#### Trigger function and Details

* Used a trigger function from a Details page and replaced the Link Text with HTML
* In Trigger configuration page, html goes here into this field: `Link Text`

![](<../../.gitbook/assets/image (5).png>)

Enter into `Link Text` field:

`<h2><button class="block><i class="fa fa-plus-circle"></i><strong> New Submission</strong></button></h2>`

Looks like this in the live app

![](<../../.gitbook/assets/image (10).png>)

## Links

### Out of the box "links"

**Option 1:** Add Menu>Link to a **URL**

**Option 2:** Add Rich Text

*
  * Add text for link
  * Click **link** icon on toolbar
  * Click **Insert link**
    * Enter **URL**
    * Enter **Text**
    * Select **Open link in new tab**

### Using field labels & instructions to add links

#### Example 1: Form Title or Instructions

**Option 1:** Link, Link Text and Icon

`<a href="https://atd.knack.com/parking#verify/"> Look up address <i class="fa fa-search"><i></a>`&#x20;

![](<../../.gitbook/assets/image (6).png>)

**Option 2:** Form field label text, link that is an icon

Number of Resident Decals `<a href="https://atd.knack.com/parking#permit-costs/"></i class="fa fa-info-circle"></i></a>`

![](<../../.gitbook/assets/image (8).png>)

**Option 3:** Link and icon that opens in new tab

`<a href="https://purchweb.austintexas.gov/search/RTMATSSelect.cfm" target=_blank> Contract Agreement </i class="fa fa-external-link-square"></i></a>`

![](<../../.gitbook/assets/image (12).png>)
