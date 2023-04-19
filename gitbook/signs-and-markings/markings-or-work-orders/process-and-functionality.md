# Process & Module Functionality

## Current Process

* Requester fills out work order information and location information
  * SBO/WHEREABOUTS: Fills out SBO Completed Date and markings that need to be reinstalled based on Work Groups
* Work Order status is ON HOLD as plans need to be attached unless requester is:
  * 311 SR
  * SBO Whereabouts
    * Subtype: Utility Cuts, Concrete Work, or Pothole Repair
  * Maintenance
* Work Order status is NEED TO BE ISSUED after ON HOLD status is removed
  * Happens when REQUESTER adds attachment where they type of attachment is Plans as a PDF
* Markings supervisor reviews work order information and issues work order to technician
* Technician reviews job details assigned and does work in field
* Technician fills out time, specifications, materials, DOSAs (Daily Operation Safety Assessments), and submits for review when job is done
* When all jobs in the work order are completed, work order status is set to FINAL REVIEW
* Supervisor reviews work orders in FINAL REVIEW status and closes work order if passes final review

## Module Functionality

### New Work Order

* Requester creates "New Work Order" - enters work order and location information

### Markings Work Order page (Main/Parent page)

* Work Order records on table view grouped by requester
  * Default filter view is work orders in NEED TO BE ISSUED status
* Ability to click on details page from table view

#### Requester

* Can see status/details through My Work Orders | Created tab
* Advanced Search option or main page table view to look for specific work order

#### Supervisor

* Can schedule jobs through Work Schedule > Manage Schedule
  * Modal: Select `Scheduled Time` and `Assigned To`&#x20;
  * Lets requesters know the scheduled work for the week and work planning for supervisors
* Can see status/details through main page table
  * Looks at work orders in NEED TO BE ISSUED status
* Can issue jobs to specific technicians in work order details page
  * Modal: Select `Assigned To`
  * Can add jobs and put work orders on hold

#### Technician

* Can see list of jobs issued to technician

### Work Order Details page

This page has all the work order information

* Top level menu (Add Attachment, Add Comment, Edit, Cancel, Hold, Issue Jobs, Close)
* Table to show any comments
  * Requesters, supervisors, and technicians can add comments
* Table to show jobs and to click on jobs details
* Table to show attachments
  * Requesters, supervisors, and technicians can add attachments

### Job Details page

This page has all the work order information

* Top level menu (Cancel, DOSA, Attach, Comment, Complete)
* Table to show all comments for job
* Table to show all attachments in work order
* Table to view DOSAs
  * Technician can add DOSA by checking yes on setup traffic control, checked (PPE), and noting any hazards
* Table to view time for the job
  * Technician add time such as technician(s), vehicle(s), hours worked, minutes worked, and date worked
* Table to view specifications for the job
  * Technician add specifications and quantity
* Table to view materials for the job
  * Technician add materials and quantity

### Work Schedule page

This page has all the work schedule information

* Top level menu (Manage Schedule)
* Calendar view of scheduled markings work for this week and next week
  * Modal: Shows schedule date, requester, requester ID, work group, coordination, what is issued to, links to work order detail and job detail
  * Can add Non-operational events
* Table view of scheduled markings work
  * Column for scheduled date
* Table view of non-operational events
  * Can delete non-operational events

### Manage Schedule page

This page has all the work scheduled/unscheduled information

* Table view of unscheduled markings jobs
  * Edit modal: Supervisor can set scheduled date and assign to specific technician
* Table view of scheduled markings jobs
  * Edit modal: Supervisor can change scheduled date and change technician assigned
* Calendar view of scheduled markings jobs
  * Edit Modal: Supervisor can change scheduled date and change technician assigned
  * Can add non-operational events
* Table view of non-operational events
  * Can delete non-operational events

### Jobs | Markings page

This page has all the jobs information

* Top level menu (New Work Order, All Work Orders, Work Schedule)
* Table view of jobs grouped by work group
  * Default filter is jobs in the ISSUED status
* Buttons to filter jobs by work group

### Reports page

This page has reports information for performance measures

* Top level menu (Unstriped streets, Markings Time Labor Vehicle Report, Specifications by Month, Work History, Reimbursements)
* Bar chart view of task status the last 30 days
* Search view of specifications
* Table view of materials
  * Can filter by item and requester
* Table view of markings project reimbursements
  * Modal: Reimbursements received

#### Unstriped Streets Report

* Table view of work orders by SBO/Whereabouts and ATSD
  * Columns on projected 2 weeks, 30 days, 60 days, and 90 days
* Table view of commented by wrok group

#### Markings Time Labor Vehicle Report

* Table view of jobs grouped by work order with count of jobs, time logs, vehicles, technicians, and completed date
* Table view of time logs for signs work orders and time work orders with count of time logs, vehicles, technicians, and total technician hours

#### Specification by Month

* Table view of long line specification by month
  * Total sum of footage
* Table view of short line specification by month
  * Total sum of short line
* Table view of specialty markings specifications by month
  * Total sum of specialty markings

#### Work History

* Search view of time logs by keyword search, date worked,  job ID, and contractor work asignment ID

#### Reimbursements

* Table view of reimbursements with columns for invoice, labor, comments, and approval

