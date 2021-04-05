# Contractor Work Order Tracking

**Problem**: Signs and Markings needed a way to track contractor work orders and wanted to track it in the same system where they track their existing Signs and Markings work orders. 

**Solution**: Add an area to the SMB Tracker for Contractor tracking

## Build Information

#### New! Object tables created

* `contract_vendor` \(just Contract Vendor information\)
* `contract_bid_items` \(Items that are on the contract with different unit prices depending on contractor\)
* `contractor_inspections` \(table that tracks the inspection status information\)
* `contractor_materials_log` \(table that tracks what items "materials" were used in the assigned project\)
* `contractor_work_order` \(table that has all pertinent work order information\)

#### Existing tables used

* `work_orders_signs_markings_attachments` \(for inspection photo images\)
* `work_orders_signs_markings_time_logs` \(bc Kati A. was already pulling date from Work History page and the existing date resided in this object table\)

**Connections**

* **street\_names** \(for contractor work order object - Street, From/To Street in order to not have typos on location names.
* **accounts** \(audit fields: Created Date/By, Modified Date/By\)

[SMB Contractor Status Matrix](https://drive.google.com/file/d/1OTWQ8NzBe0_7QojCVpS9YN8qZ-0o01kA/view)

![](../../.gitbook/assets/image%20%2828%29.png)

![](../../.gitbook/assets/image%20%2827%29.png)



