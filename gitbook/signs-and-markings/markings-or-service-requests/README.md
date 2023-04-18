# Markings | Service Requests

**Problem**: Signs and Markings needed a way to create work orders based on markings service requests submitted via the 3-1-1 app

**Solution**: Add an area to the Signs & Markings Operations App for Markings | Service Requests and create work orders based on information submitted using 3-1-1

## Build Information

### Object tables used

* `csr_activities` (table of activities the technician submitted for the CSR)
* `csr_issues` (table that tracks issues of CSRs)&#x20;
* `csr_flex_notes` (table of flex notes the requester submitted for the CSR)

### Connections

* `work_orders_markings` (table of markings work orders)
* `work_orders_markings_jobs` (table of jobs used in markings work orders)
* `work_orders_signs_markings_time_log` (table that tracks time worked)
* `work_orders_signs_markings_comments` (table of comments made for work order)
