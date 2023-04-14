# Process & Functionality

## Current Process

* SMD Staff uses GIS to identify which street sections need maintenance
* SMD staff submits work order information and issues work orders for contractor to view
* Contractor reviews work orders assigned and does work in field
* Contractor fills out daily work logs and submits for review when work is done
* Inspector field checks projects and identifies any issues or approves work
  * They put in whether the work was inspected, the inspection status, and inspection notes
* Inspector approves work order if passes inspection and signs approval digitally
* Project Manager reviews work orders in approved status, total cost is automatically compiled from the daily work logs the contractor filled out
  * Receives invoice from Contractor
* Reviews invoice spreadsheet/PDF for any discrepancies
* Goes through the invoice process&#x20;

## Module Functionality

### New Work Order

* SMD Staff creates "New Work Order" - enters location information and work assignment numbers, feature ID (way to relate back to GIS data layer)

### Contractor Work Orders page (Main/Parent table)

**SMD Staff**

* Work Order records compiled on table view
* Ability to quickly "**Issue**" from the table view
  * modal, select `Assigned To` - contractor system account, will update `Assigned Contractor` field

**Contractor**&#x20;

* Only assigned work order records compiled on table view (won't see other contractor records)

### Work Order Details page

This page has all the work order information

* Top level menu (Edit, Add Photo, Issue, Add Inspection, Approve, Close)
* Table to show any photo attachments
* Table to show inspections
* Table to show Dates Worked
* Table to show Materials Used
* Details containing digital Signatures

### **Edit button**

Allows staff to update any work order information that may be incorrect

### Photo Attachment

* Both SMD staff and contractor can upload photos

**SMD Staff**

* User can click `Add Photo` and then take a photo from their mobile device or upload an existing photo from a gallery

**Contractor**

* Contractor can click `Add Photo` and then take a photo from their mobile device or upload an existing photo from a gallery

### Issue Work Order button

* SMD Staff will have button on their page to `Issue` work order. (similar to SMD Supervisor/Assigner)
* The button just changes status from "NEED TO BE ISSUED" to "ISSUED"

### Submit Work Order button

**Contractor**

* Contractor will have button on their page to `Submit for Review`. (similar to Markings technicians)
* Captures the `Submitted Date` (date contractor submits work order to TPW), `Submitted By`
* They will be required to electronically sign before the form can be submitted

### Inspections

**Inspector**

* Can create a new inspection record, update `Inspect, Inspection Status`, add `Inspection Issue/Comment`, triggers field for follow-up

**Contractor**

* Will see the created records on their page, can edit the inspection record by only commenting and updating the status.&#x20;
* When status is updated the follow-up status will change to `Ready to Inspect` so that the SMD inspector can see there is a follow-up inspection required.

### Approve

* SMD Inspector will have button on their page to `Approve`. (_similar to SMD technicians_)
* This will mean they have inspected the location/project and no issues are present
* They will be required to electronically sign the approval

### Close

SMD staff can change status from "Approved" to "Closed"

## Old Workflow&#x20;

Network Location: `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_Signs_and_Markings`

PDF Workflow: **SMB\_Tracker\_contractor\_workflow\_20201113** (Is going to be updated by SMB 5/27/21)

## Old Process

* SMD Staff uses GIS to identify which street sections need maintenance
* Hands off spreadsheet to Project Manager who submits to Contractor so they know what assignments to do
* Contractor does work in field
* Contractor fills out paper "Daily Work Ticket"
* SMD Staff (Inspector) field checks projects and identifies any issues or approves work
  * Any corrections are emailed/texted, no streamlined paper trail available
* Inspector submits to Project Manager when approved
* Project Manager reviews tickets, compiles total costs and materials to see how much to pay
  * Receives invoice from Contractor
* Reviews invoice spreadsheet/PDF for any discrepancies
* Goes through the invoice process&#x20;
