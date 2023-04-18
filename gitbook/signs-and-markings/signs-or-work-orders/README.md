# Signs | Work Orders

**Problem**: Signs and Markings needed a way to track signs work orders

**Solution**: Add an area to the Signs and Markings Operations App for Signs Work Orders

## Build Information&#x20;

### Object tables used

* `dosa_tracking` (table that tracks DOSAs)
* `inventory_items` (table of inventory item materials used for signs)
* `work_orders_signs` (table of signs work orders)
* `work_order_signs_locations` (table of sign locations)
* `work_orders_signs_asset_spec` (table of sign specifications)
* `work_orders_signs_asset_spec_actual` (table of sign specifications to report)
* `work_orders_signs_markings_attachments` (table of plans and/or photos for work order)
* `work_orders_signs_markings_comments` (table of comments made for work order)
* `work_orders_signs_markings_time_log` (table that tracks time worked)

### Connections

* `csr_issues` (for work orders signs object - table that tracks issues of CSRs)&#x20;
* `csr_flex_notes` (for work orders signs object - table of flex notes of CSRs)
* `reimburseable_tracking` (for work orders signs object - table that tracks reimburseables)
* `street_names` (for work orders markings object - Street, From/To Street in order to not have typos on location names.)
* `fleet_vehicles` (table of fleet vehicle options for time log object)
* `accounts` (audit fields: Created Date/By, Modified Date/By)
