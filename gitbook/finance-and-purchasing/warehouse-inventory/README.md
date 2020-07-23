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
* The new line item is sent, the `Cancelled` item is no longer there

## Finance and Purchasing App &gt; Warehouse Inventory module

* Inventory Request record is created a status `Ready to Issue`

### Issuing Item

**Warehouse Staff**

* Receives request and reviews inventory request details
  * Items status is `New` 
* Can `Edit` or `Issue` or `Cancel` Inventory line item 

  **Edit** button allows user to edit

  * Choose `Item`
  * Add `Quantity`
  * Add `Comment`

* **Issue** button allows user to
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
  * \(User needs to have `FDU Approver` is "Yes" in the user roles\)
* Click on `Financial Review` in the Inventory Request details page
  * Updated `Task Order`
  * Added `Fund`
  * Added `Department`
  * Added `Unit`

### Need AIMS entry

* Inventory Request status is `Need AIMS entry`
* Change inventory item, Add "AIMS \#" 
* Then Inventory Request status changes to `Completed`

{% hint style="info" %}
**Do a status field map from both applications!!**
{% endhint %}

## Inventory Request Status Definitions \(Warehouse Inventory module\)

| Status | Description |
| :--- | :--- |
| **Not Submitted** | As a customer, added new inventory request but have yet to submit it \(NOT CURRENTLY USING..\) |
| **Ready to Issue** | Request has been submitted for warehouse staff to review |
| **Review Needed** | When warehouse staff has completed the request and inventory has been issued to a technician. Inventory Request as a "**Task Order**" and "**FDU \#"** that needs review |
| **Needs AIMS entry** | When warehouse staff has completed the request and inventory has been issued to a technician, but the inventory item needs to have an AIMS \# associated to it. |
| **Completed** | When warehouse staff has completed the request and inventory has been issued to a technician. Inventory Item has an AIMS \# associated to it. |
| **Cancelled** |  If request is no longer required or needed. |

## Inventory Request Inventory Item Status Definitions \(Warehouse Inventory module\)

| Status | Definitions |
| :--- | :--- |
| **Issued** | When warehouse staff has completed the request and inventory has been issued to a technician.  |
| **Returned** | When technician has brought back unused inventory item to the Warehouse  |
| **Cancelled** | When Warehouse staff has requested that the inventory request item to be "Cancelled". |
| **New** | Request has been submitted for warehouse staff to review |

## Inventory Transaction Status Definitions \(AMD Data Tracker\)

| Status | Definitions |
| :--- | :--- |
| **Not Requested** | As a technician, added new inventory request but have yet to submit it \(NOT CURRENTLY USING..\) |
| **Submitted to Warehouse** | When inventory request has been submitted for warehouse staff to review |
| **Issued** | When inventory has been issued to a technician.  |
| **Return Requested** | When technician has requested a Return on  unused inventory item |
| **Returned** | When technician has brought back unused inventory item to the Warehouse  |
| **Cancelled** | When technician has requested that the inventory request item to be "Cancelled". |

## 

##  

