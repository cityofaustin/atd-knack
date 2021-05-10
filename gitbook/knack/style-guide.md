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

| Link | HEX Code | Swatch | Name | HTML Code | Font Awesome Icons |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [\#ff9b9c](https://www.colorhexa.com/ff9b9c)  | `#ff9b9c` | ![](../.gitbook/assets/image%20%2897%29%20%281%29.png) | Inactive/No | ------------ | ------------ |
| [\#80d07e](https://www.colorhexa.com/80d07e)  | `#80d07e` | ![](../.gitbook/assets/image%20%28102%29.png) | Active/Yes | ------------ | ------------ |
|  |  |  |  |  |  |
| [\#f5901f](https://www.colorhexa.com/f5901f) | `#f5901f`  | ![](../.gitbook/assets/image%20%2894%29%20%283%29.png) | Orange | ------------ | ------------ |
| [\#ff9b9c](www.colorhexa.com/ff9b9c)  | `#ff9b9c` | ![](../.gitbook/assets/image%20%2884%29.png) | Return to Requester | ------------ | ------------ |
| [\#80d07e](https://www.colorhexa.com/80d07e) | `#80d07e` | ![](../.gitbook/assets/image%20%28104%29.png) | Current | ------------ | ------------ |
| [\#4daf4a](https://www.colorhexa.com/4daf4a)  | `#4daf4a` | ![](../.gitbook/assets/image%20%2888%29.png) | Approved | ------------ | ------------ |
| [\#000000](https://www.colorhexa.com/000000)  | `#000000` | ![](../.gitbook/assets/image%20%2882%29.png) | Rejected | ------------ | ------------ |

### Signs & Markings Data Tracker Colors & Icons

<table>
  <thead>
    <tr>
      <th style="text-align:left">Link</th>
      <th style="text-align:left">HEX Code</th>
      <th style="text-align:left">Swatch</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">HTML Code</th>
      <th style="text-align:left">Font Awesome Icons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/e41a1c">#E41A1C</a> 
      </td>
      <td style="text-align:left"><code>#E41A1C</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (87).png" alt/>
      </td>
      <td style="text-align:left">Need To Be Issued</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-exclamation-triangle&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (106).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/367DB7">#367DB7</a>
      </td>
      <td style="text-align:left"><code>#367DB7</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (95).png" alt/>
      </td>
      <td style="text-align:left">Issued</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-truck&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (105).png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/ADADAD">#ADADAD</a> 
      </td>
      <td style="text-align:left"><code>#ADADAD</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (92).png" alt/>
      </td>
      <td style="text-align:left">On Hold</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-clock-o&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (113).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/974DA2">#974DA2</a>
      </td>
      <td style="text-align:left"><code>#974DA2</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (98).png" alt/>
      </td>
      <td style="text-align:left">Needs GIS</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-map-marker&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (125).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/4CAE49">#4CAE4</a>&lt;code&gt;&lt;/code&gt;</td>
      <td
      style="text-align:left"><code>4CAE49</code>
        </td>
        <td style="text-align:left">
          <img src="../.gitbook/assets/image (103).png" alt/>
        </td>
        <td style="text-align:left">Final Review</td>
        <td style="text-align:left"><code>&lt;i class=&quot;fa fa-flag-checkered&quot;&gt;&lt;/i&gt;</code>
        </td>
        <td style="text-align:left">
          <img src="../.gitbook/assets/image (124).png" alt/>
        </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Closed</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-checked-circle&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (109).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Cancelled</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-times&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (110).png" alt/>
      </td>
    </tr>
  </tbody>
</table>

### Arterial Management Data Tracker Colors & Icons

<table>
  <thead>
    <tr>
      <th style="text-align:left">Link</th>
      <th style="text-align:left">HEX Code</th>
      <th style="text-align:left">Swatch</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">HTML Code</th>
      <th style="text-align:left">Font Awesome Icons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Unassigned</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-asterisk&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (120).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">In Progress</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-wrench&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (80).png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Assigned</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-bullhorn&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (38).png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Submit</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-flag-checkered&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (124).png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Closed</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-checked-circle&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (109).png" alt/>
        </p>
        <p></p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://www.colorhexa.com/777777">#777777</a>
      </td>
      <td style="text-align:left"><code>#777777</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (100).png" alt/>
      </td>
      <td style="text-align:left">Cancelled</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
    </tr>
  </tbody>
</table>

### Service Request Colors

| Link | HEX Code | Swatch | Name | HMTL Code | Font Awesome Icons |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [\#cd7070](https://www.colorhexa.com/cd7070) | `#cd7070` | ![](../.gitbook/assets/image%20%2890%29.png) | New | ------------ | ------------ |
| [\#5c68ff](https://www.colorhexa.com/5c68ff) | `#5c68ff` | ![](../.gitbook/assets/image%20%28123%29.png) | In Progress | ------------ | ------------ |
| [\#67b36a](https://www.colorhexa.com/67b36a)  | `#67b36a` | ![](../.gitbook/assets/image%20%2881%29.png) | Repairs Completed | ------------ | ------------ |
| ------------ | ------------ | ------------ | Close \(Resolved\) | ------------ | ------------ |
| ------------ | ------------ | ------------ | Close \(Duplicate\) | ------------ | ------------ |

### Finance and Purchasing Colors & Icons

<table>
  <thead>
    <tr>
      <th style="text-align:left">Link</th>
      <th style="text-align:left">HEX Code</th>
      <th style="text-align:left">Swatch</th>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">HTML Code</th>
      <th style="text-align:left">Font Awesome Icons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">#ff9b9c</td>
      <td style="text-align:left"><code>#ff9b9c</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (119).png" alt/>
      </td>
      <td style="text-align:left">Not Submitted</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
    </tr>
    <tr>
      <td style="text-align:left">#377eb8</td>
      <td style="text-align:left"><code>#377eb8</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (111).png" alt/>
      </td>
      <td style="text-align:left">Waiting for Approval</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------------------</td>
    </tr>
    <tr>
      <td style="text-align:left">#ff9b9c</td>
      <td style="text-align:left"><code>#ff9b9c</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (99).png" alt/>
      </td>
      <td style="text-align:left">Returned</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
    </tr>
    <tr>
      <td style="text-align:left">#6a6565</td>
      <td style="text-align:left"><code>#6a6565</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (121).png" alt/>
      </td>
      <td style="text-align:left">Rejected</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
    </tr>
    <tr>
      <td style="text-align:left">#41ae76</td>
      <td style="text-align:left"><code>#41ae76</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (115).png" alt/>
      </td>
      <td style="text-align:left">Budget Review</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-money&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <p></p>
        <p>
          <img src="../.gitbook/assets/image (114).png" alt/>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">#41ae76</td>
      <td style="text-align:left"><code>#41ae76</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (101).png" alt/>
      </td>
      <td style="text-align:left">Purchase Review</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-clipboard&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (116).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">#41ae76</td>
      <td style="text-align:left"><code>#41ae76</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (93).png" alt/>
      </td>
      <td style="text-align:left">Processing| Purchasing</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-cogs&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (122).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">#41ae76</td>
      <td style="text-align:left"><code>#41ae76</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (85).png" alt/>
      </td>
      <td style="text-align:left">Processing| Accounts Payable</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-credit-card&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (86).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">#f5901f</td>
      <td style="text-align:left"><code>#f5901f</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (89).png" alt/>
      </td>
      <td style="text-align:left">Pending Invoice</td>
      <td style="text-align:left"><code>&lt;i class=&quot;fa fa-clock-o&quot;&gt;&lt;/i&gt;</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (113).png" alt/>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">#6a6565</td>
      <td style="text-align:left"><code>#6a6565</code>
      </td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (77).png" alt/>
      </td>
      <td style="text-align:left">Cancelled</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
    </tr>
    <tr>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left">
        <img src="../.gitbook/assets/image (47).png" alt/>
      </td>
      <td style="text-align:left">Closed</td>
      <td style="text-align:left">------------</td>
      <td style="text-align:left"><code>#ADADAD </code>
        <img src="../.gitbook/assets/image (109).png" alt/>&lt;code&gt;&lt;/code&gt;</td>
    </tr>
  </tbody>
</table>

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

