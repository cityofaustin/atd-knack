# Special Functions/Codes

## Custom Code in Signs and Markings (SMD) Data Tracker

### Pulling Requester division into the "Requester" field automatically&#x20;

* LOCATION: New Signs Work Order - [`https://builder.knack.com/atd/signs-markings#pages/scene_1045/views/view_2633`](https://builder.knack.com/atd/signs-markings#pages/scene\_1045/views/view\_2633)
*   LOCATION: New Markings Work Order -&#x20;

    [`https://builder.knack.com/atd/signs-markings#pages/scene_711/views/view_1880`](https://builder.knack.com/atd/signs-markings#pages/scene\_711/views/view\_1880)
* BEHAVIOR:  User account set to "Transportation Engineering" in accounts table - when they create a new work order the Requester field will automatically populate with "Transportation Engineering" based on the logged in user. (**Viewer** roles only!)
* REASON: Users create so many work orders it is one less field they have to populate that we already capture when creating their accounts

ex. User account set to "Transportation Engineering" in accounts table - when they create a new work order the Requester field will automatically populate with "Transportation Engineering" based on the logged in user.

![This division is being populated here under the "Requester" field, user doesn't have to populate it ](<../../../.gitbook/assets/image (46).png>)

### **Attachments, showing up as "Plans", "Regulations" instead of the file name**

* LOCATION: Signs Work Order table (Main) - [`https://builder.knack.com/atd/signs-markings#pages/scene_1027`](https://builder.knack.com/atd/signs-markings#pages/scene\_1027)
* CUSTOMIZATION: File Type is populated and it replaces the File Name to reduce table bloat
* REASON: File names can be long and take up lots of screen space, to save screen real estate and make table more simplified and readable

![Simple Name for Attachments, using Attachment Type to show on main table](<../../../.gitbook/assets/image (52).png>)

![Real name of attachments, some a very long and take up too much space](<../../../.gitbook/assets/image (50).png>)

### Work Order Details, Status colors, showing up in the details portion

* LOCATION: Signs Work Order Details page - [`https://builder.knack.com/atd/signs-markings#pages/scene_1028`](https://builder.knack.com/atd/signs-markings#pages/scene\_1028)
* CUSTOMIZATION: Work Order Status has background color that matches the display colors on the Work Order tables
* REASON: Users associate the work order colors to the work order statuses, easier to know what status a work order is at a glance

![](<../../../.gitbook/assets/image (51).png>)

### Geographic Map/Location Functionality

* LOCATION: Signs Work Order Details page - [`https://builder.knack.com/atd/signs-markings#pages/scene_1028`](https://builder.knack.com/atd/signs-markings#pages/scene\_1028)
* BEHAVIOR: This affects only Signs Work Orders. Location map appears, Add Location fields are (hidden), When `Add location` button is clicked, it passes through the `Longitude`, `Latitude` fields and then creates map markers that links the `Location Details Page` , `Spatial ID`, `Latitude`, `Longitude` on the map instead of just the Locations table
* REASON: This allows the user to not have to go to the Locations table to figure out which location to choose when added asset information. There are many times where there are more locations on a work order.

![](<../../../.gitbook/assets/image (41).png>)

### "Back to Top" icon/enlarged text&#x20;

* LOCATION: Signs Work Order Details page - [`https://builder.knack.com/atd/signs-markings#pages/scene_1028`](https://builder.knack.com/atd/signs-markings#pages/scene\_1028)(Visible at bottom of page)
* CUSTOMIZATION: Custom icon and enlarged text to navigate user back to top of page
* REASON: to help user not have to scroll all the way up to review information or click submit

![](<../../../.gitbook/assets/image (34).png>)

### "Back to View Work Order Details" icon/enlarged text&#x20;

* &#x20;LOCATION: Signs Work Order Details page - [`https://builder.knack.com/atd/signs-markings#pages/scene_1039`](https://builder.knack.com/atd/signs-markings#pages/scene\_1039)(Visible at bottom of page)
* CUSTOMIZATION: Custom icon and enlarged text to navigate user back to previous page
* REASON: to help user navigate back to previous page as it is not obvious at at the bottom of the page

## Mobile Optimizations

### Code to determine what environment a user was in to recognize when to enable mobile optimizations

### Menu Buttons - Globally Enlarged

![](<../../../.gitbook/assets/image (37).png>)

### Form Field Headings - Globally Enlarged

![](<../../../.gitbook/assets/image (35).png>)

### Form Fields- Globally Enlarged

![](<../../../.gitbook/assets/image (39).png>)

### Form Selections (Drop downs) - Global Enlarged

![](<../../../.gitbook/assets/image (42).png>)

### Submit Button - Globally Enlarged

![](<../../../.gitbook/assets/image (40).png>)
