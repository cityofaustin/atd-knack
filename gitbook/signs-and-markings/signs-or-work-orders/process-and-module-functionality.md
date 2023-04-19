# Process & Module Functionality

## Current Process

* Requester fills out work order information and location information
* Work Order status is ON HOLD as plans need to be attached unless requester is:
  * 311 SR
  * Maintenance
* Work Order status is NEED TO BE ISSUED after ON HOLD status is removed
  * Happens when REQUESTER adds attachment where they type of attachment is Plans as a PDF
* Supervisor or technician reviews work order information and issues work order to technician
* Technician reviews job details assigned and does work in field
* Technician fills out locations, time, assets, materials, DOSAs (Daily Operation Safety Assessments), and submits for review when job is done
* Work order status is set to FINAL REVIEW
* Supervisor reviews work orders in FINAL REVIEW status and closes work order if passes final review

## Module Functionality

### New Work Order

* Requester creates "New Work Order" - enters work order and location information

### Signs Work Order page (Main/Parent page)

* Work Order records on table view grouped by requester
  * Default filter view is work orders in NEED TO BE ISSUED status
* Ability to click on details page from table view

#### Requester

* Can see status/details through My Work Orders | Created tab
* Advanced Search option or main page table view to look for specific work order

#### Supervisor

* Can see status/details through main page table
  * Looks at work orders in NEED TO BE ISSUED status
* Can issue work to specific technician in work order details page
  * Modal: Select `Assigned To`
  * Can put work orders on hold

#### Technician

* Can see list of work orders issued to technician
* Can issue work orders to themselves

### Work Order Details page

* Top level menu (Add DOSA, Add Attachment, Add Comment, Edit, Cancel, Hold, Issue, Close)
* Table to show comments
  * Requesters, supervisors, and technicians can add comments
* Table to show all attachments in work order
* Table to view DOSAs
  * Technician can add DOSA by checking yes on setup traffic control, checked (PPE), and noting any hazards
* Table and map view to show locations
  * Technicians add location points on the map and a reference photo using their tablet device
  * Technicians also add asset information from the drop down menu such as action, name message, and direction
* Table to view time for the job
  * Technician add time such as technician(s), vehicle(s), hours worked, minutes worked, and date worked
* Table to view materials for the job
  * Technician add materials and quantity

### Locations Details page

* Shows Spatial ID, address, and reference photo of location
* Map view of location
* Can `Add Photo` of location or change photo of location
* Table view of assets at the location
* Form view to enter asset information
  * Action - Whether the asset will be install, remove, repair, relocate, tree trim, or inspected
  * Asset Name - the name of the asset where action is occurring
    * Not filled out if Action is `Inspected`
    * Not filled out if Action is `Tree Trim`
  * Asset Condition - condition of the asset
    * Not filled out if Action is `Install`
    * Not filled out if Action is `Tree Trim`
  * Direction facing - the cardinal direction the asset is facing for the location
    * Not filled out if Action is `Inspected`
    * Not filled out if Action is `Tree Trim`

### Asset List page

* Table view of assets with MUTCD codes, sub category, asset cost, and photo

