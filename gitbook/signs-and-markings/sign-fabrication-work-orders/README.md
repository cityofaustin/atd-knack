# Sign Fabrication Work Orders

**Problem**: Signs and Markings needed a way to track sign fabrication work that hadn't been tracked. They wanted to track it in the same system where they track their existing Signs and Markings work orders.&#x20;

**Solution**: Add an new module to the SMB Tracker for Sign Fabrication Sign Request work order management

## Build Information:&#x20;

#### New! Object tables created

* `work_orders_sign_fabrication` (just Sign Fabrication Request information)

#### Existing tables used

* `work_orders_signs_markings_attachments` (for work order images)
* `work_orders_signs_markings_comments` (for work order comments)
* `work_orders_signs_markings_time_logs `(bc wanted to track labor and add to sign fabrication invoice)
* `invoice_items` (to generate line items for the invoice, similar to reimbursement process)

**Connections**

* **accounts **(audit fields: Created Date/By, Modified Date/By)
