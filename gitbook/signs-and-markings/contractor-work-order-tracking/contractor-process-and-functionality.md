# Process & Functionality

## Current Process

* SMB Staff uses GIS to identify which street sections need maintenance
* Hands off spreadsheet to Project Manager who submits to Contractor so they know what assignments to do
* Contractor does work in field
* Contractor fills out paper "Daily Work Ticket"
* SMB Staff \(Inspector\) field checks projects and identifies any issues or approves work
  * any corrections are emailed/texted, no streamlined papertrail available
* Inspector submits to Project Manager when approved
* Project Manager reviews tickets, compiles total costs and materials to see how much to pay
  * Receives invoice from Contractor
* Reviews invoice spreadsheet/PDF for any discrepancies
* Goes through the invoice process 

## Future/Digital Version

* SMB Staff uses GIS to identify which street sections need maintenance
* \(DIGITIZE\) Hands off spreadsheet to Project Manager who submits to Contractor so they know what assignments to do
* Contractor does work in field
* \(DIGITIZE\) Contractor fills out paper "Daily Work Ticket"
* \(DIGITIZE\) SMB Staff \(Inspector\) field checks projects and identifies any issues or approves work
  * any corrections are emailed/texted, no streamlined papertrail available
* \(DIGITIZE\) Inspector submits to Project Manager when approved
* \(DIGITIZE\) Project Manager reviews tickets, compiles total costs and materials to see how much to pay
  * Receives invoice from Contractor
* Reviews invoice spreadsheet/PDF for any discrepancies
* Goes through the invoice process 

## Module Functionality

### New Work Order

* SMB Staff creates "New Work Order" - enters location information and work assignment numbers, feature ID \(way to relate back to GIS data layer\)

### Contractor Work Orders page \(Main/Parent table\)

**SMB Staff**

* Work Order records compiled on table view
* Ability to quickly "**Issue**" from the table view
  * modal, select `Assigned To` - contractor system account, will update `Assigned Contractor` field

**Contractor** 

* Only assigned work order records compiled on table view \(won't see other contractor records\)

### Work Order Details page

This page has all the work order information

* Top level menu \(Edit, Add Photo, Issue, Add Inspection, Approve, Close\)
* Table to show any photo attachments
* Table to show inspections
* Table to show Dates Worked
* Table to show Materials Used
* Details containing digital Signatures

### **Edit button**

Allows staff to update any work order information that may be incorrect

### Photo Attachment

* both SMB staff and contractor can upload photos

**SMB Staff**

* User can click `Add Photo` and then take a photo from their mobile device or upload an existing photo from a gallery

**Contractor**

* Contractor can click `Add Photo` and then take a photo from their mobile device or upload an existing photo from a gallery

### Issue Work Order button

* SMB Staff will have button on their page to `Issue` work order. \(similar to SMB Supervisor/Assigner\)
* The button just changes status from "NEED TO BE ISSUED" to "ISSUED"

### Submit Work Order button

**Contractor**

* Contractor will have button on their page to `Submit for Review`. \(similar to Markings technicians\)
* Captures the `Submitted Date` \(date contractor submits work order to ATD\), `Submitted By`
* They will be required to electronically sign before the form can be submitted

### Inspections

**SMB Staff**

* Can create a new inspection record, update `Inspect, Inspection Status`, add `Inspection Issue/Comment`, triggers field for follow-up

**Contractor**

* Will see the created records on their page, can edit the inspection record by only commenting and updating the status. 
* When status is updated the follow-up status will change to `Ready to Inspect` so that the SMB inspector can see there is a follow-up inspection required.

### Approve

* SMB Inspector will have button on their page to `Approve`. \(_similar to SMB technicians_\)
* This will mean they have inspected the location/project and no issues are present
* They will be required to electronically sign the approval

### Close

SMB staff can change status from "Approved" to "Closed"



