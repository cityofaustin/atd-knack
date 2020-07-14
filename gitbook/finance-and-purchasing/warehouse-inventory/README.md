# Warehouse Inventory

## Workflow

`User` --&gt; `Supervisor` --&gt; `Warehouse Staff`

**User**

* User creates Inventory Request - `NOT SUBMITTED`
* Submits to Supervisor: `WAITING FOR APPROVAL`

**Supervisor**

* Reviews inventory request and approves - `SUBMITTED`

**Warehouse Staff**

* Receives request and begins pulling inventory items - `PROCESSING`
* Requested inventory items have been pulled and issued to technician - \`COMPLETED'

## Status Definitions

| Status | Description |
| :--- | :--- |
| **NOT SUBMITTED** | As a customer, added new inventory request but have yet to submit it |
| **WAITING FOR APPROVAL** | User \(technician\) has clicked the **Submit for Approval** button to get supervisor approval on their request. |
| **SUBMITTED** | Supervisor approval was **"YES"**, request has been submitted for warehouse staff to review |
| **PROCESSING** | Warehouse staff is working on request and hasn't finished the inventory request fulfillment |
| **COMPLETED** | When warehouse staff has completed the request and inventory has been issued to a technician |
| **CANCELLED** | If request is no longer required or needed. |

##  

