# Create a Connection Link Field to View a Searched Record

Typically an identifying field on a record or a text formula can be used as a Link Field for Search Results. A common problem is we often want search results to be more raw in their data presentation so the data can be exported and more useful in Excel. By default, Table views have the option to link to records and pages with a link field or icon, unfortunately Search Result views do not have the same options. Therefore if we want similar functionality, we have to create a Field specifically for linking.

Create a Short Text field and create a Conditional Rule if you would like the Field to display link text to select. In this example we default it to "View"

![](<../../../.gitbook/assets/image (204).png>)

Be sure to add the field to your Search Results columns for your Search view.

Edit the Column Header with a name, icon html, or left blank depending on what is best.

![](<../../../.gitbook/assets/image (203).png>)

Set the Connection Link according to the Search Results records you are displaying. For this example, we link the Mitigation record to the Mitigation Details page where it lives.

Lastly you may optionally setup display rules so that you can display icons instead of text if you wanted just like Table views, or hide the link based on certain conditions.

Additionally, if the case record no longer exists, since we build this on the parent object, the link will no longer show.

![](<../../../.gitbook/assets/image (208).png>)
