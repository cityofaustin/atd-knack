# Warehouse Inventory

## Workflow from AMD Work Order

## AMD Data Tracker app

### **Item is requested**

#### **Technician**

* Creates work order
* Adds Inventory Item
  * Choose `Item`
  * Add `Quantity`
  * Select `Source`
  * Add `Comment`
* Record is created status `Submitted to Warehouse`
  * Can `Cancel` request
* When you `Cancel`
  * Record status is `Cancelled`
  * Can `Edit` request
    * Choose `Item`
    * Add `Quantity`
    * Select `Source`
    * Add `Comment`
  * When a line item is `Cancelled` that item on the Warehouse Inventory module is also `Cancelled`
* When you `Edit` the record
* The new line item is sent, the Cancelled item is no longer there

## Finance and Purchasing App &gt; Warehouse Inventory module

* Inventory Request record is created a status `Ready to Issue`

### Issuing Item

**Warehouse Staff**

* Receives request and reviews inventory request details
  * Items status is `New` 
* Can `Edit` or `Issue` or `Cancel` Inventory line item 

  Edit button allows user to edit

  * Choose `Item`
  * Add `Quantity`
  * Add `Comment`

* Issue button allows user to
  * Choose `Issued From`
  * Choose `Issued To`
  * Add `Quantity`
  * Add `Comment`
* Clicks `Issue` button
* Inventory Item status changes to `Issued`
* Can `Return`Inventory line item 

  Return button allows user to 

  * Enter `Quantity Returned`
  * Select `Returned By`

### Reviewing Needed

* Inventory Request status is `Review Needed`
* Financial Review needs to be done
* Click on `Financial Review` in the Inventory Request
  * Updated `Task Order`
  * Added `Fund`
  * Added `Department`
  * Added `Unit`

### Need AIMS entry

* Inventory Request status is `Need AIMS entry`

{% hint style="warning" %}
HOW DO YOU CLOSE THIS? Ask John! 
{% endhint %}

## \(Old\) Workflow

`User` --&gt; `Supervisor` --&gt; `Warehouse Staff`

**User**

* User creates Inventory Request - `NOT SUBMITTED`
* Submits to Supervisor: `WAITING FOR APPROVAL`

**Supervisor**

* Reviews inventory request and approves - `SUBMITTED`

**Warehouse Staff**

* Receives request and begins pulling inventory items - `PROCESSING`
* Requested inventory items have been pulled and issued to technician - `COMPLETED`

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

