# Markings | Work Orders

**Problem**: Signs and Markings needed a way to track markings work orders

**Solution**: Add an area to the Signs and Markings Operations App for Markings Work Orders

## Build Information

### Object tables used

* `dosa_tracking` (table that tracks DOSAs)
* `work_orders_markings` (table of markings work orders)
* `work_orders_signs_markings_attachments` (table of plans and/or photos for work order)
* `work_orders_signs_markings_comments` (table of comments made for work order)
* `work_orders_markings_specification` (table of marking specifications)
* `invoice_items` (table that tracks invoice items for markings materials)
* `work_orders_markings_jobs` (table of jobs used in markings work orders)
* `work_orders_signs_markings_time_log` (table that tracks time worked)

### Connections

* `csr_issues` (for work orders markings object - table that tracks issues of CSRs)&#x20;
* `csr_flex_notes` (for work orders markings object - table of flex notes of CSRs)
* `reimburseable_tracking` (for work orders markings object - table that tracks reimburseables)
* `street_names` (for work orders markings object - Street, From/To Street in order to not have typos on location names.)
* `street_segments` (for when work orders markings object GIS QA status is 0)
* `fleet_vehicles` (table of fleet vehicle options for time log object)
* `accounts` (audit fields: Created Date/By, Modified Date/By)

