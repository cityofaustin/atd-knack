# License & Permit Management

## ABOUT LICENSES & PERMITS

A license is tied to a provider account. This is where the license start and end period can be entered. These dates will be the primary start/end dates to the permits associated to the provider.

A provider can hold multiple permits. A permit must be issued if the provider is choosing to deploy devices in a different geographic area. If they decide to change the amount of devices and/or the geographic area a new permit must be issued.

Ex. 100 devices in DAPCZ

* the provider DOESN'T want to change the location or number of devices, than this permit can be renewed.
* the provider DOES want to change either the location or the number of devices, a new permit needs to be created
  * Provider wants to add 50 more units to a geographic area - _150 in DAPCZ_
  * Provider wants to deploy 100 units in new zone, Zone 1 - _100 in Zone 1_

## **License & Permit Statuses**

| `LICENSE STATUS`     | `DESCRIPTION`                                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ACTIVE**           | <p>The license has been deemed active by the SMO Team<br></p>                                                                                                                                                                                    |
| **PENDING APPROVAL** | The license is under review of the SMO Team                                                                                                                                                                                                      |
| **NOT OPERATIONAL**  | At times the provider/SMO Team decide that the provider is to not do any business and will "freeze" the status of the license and all the current permits associated to a provider.                                                              |
| `PERMIT STATUS`      | `DESCRIPTION`                                                                                                                                                                                                                                    |
| **ACTIVE**           | When SMO Team has added a permit to a provider and that provider is able to do business in the specified area with the specified number of units                                                                                                 |
| **EXPIRED**          | The permit has expired due to the permit not being renewed                                                                                                                                                                                       |
| **NOT OPERATIONAL**  | At times the provider/SMO Team decide that the provider is to not do any business and will "freeze" the status of the license and all the current permits associated to a provider. This status is when the license has become "Not Operational" |

## ADD A LICENSE

When you add a Provider, there is a section when you enter the **Start Date** and **Expiration Date** for the provider. This "provider" record generates a License ID number and that license will be tied to the provider. The duration Start/Expiration dates determine the license period. 

### Steps on how to - [ADD A NEW PROVIDER](https://atd-dts.gitbook.io/atd-knack-operations/shared-mobility-operations/application-overview#add-a-new-provider)

## ADD A PERMIT

1\. From the "View Providers Details page"

2\. Click the "**Add Permit**" button

3\. Fill out the Permit information on the form:

* **Device Type:** the type of dock-less mobility device
* **Number of Devices: **the number of units being deployed 
* **Amount Paid: **The amount the permit will be (custom amount because can prorate permit amounts)
* **Zone:** The geographic zone/area that the provider will be deploying units
* **Notes: **any additional notes about the permit
* **Permit Start Date:** This is the first date the permit started regardless of the renewal cycle or the license renewal period.
* `RENEWAL PERIOD - for BACK DATING` - this field is to indicate whether or not a permit is in the Renewal Period allowing a user to access the "Renewal" button. This should be used only if adding historical permits. Should remove from form once licenses & permits are update for all providers.
* `EXPIRED - for BACK DATING` - This is used when entering historical permits, to indicate
* **Permit Expiration Date: **The date the permit should expire

4\. Click the “**Submit**” button to submit the form.

## RENEW PERMIT(S) & LICENSE

Each Provider/License record has a **Start Date** and **Expiration Date** associated, the system will run a task to change the permit field "Renewal Period" (Yes/No). If the Expiration date is within the current month and the permit is active it'll switch the "Renewal Period" to "Yes". 

An email task is set up so that a provider is notified by email 30 days before the Provider's Expiration date. The provider should communicate with the SMO team to determine which permits to "renew" and which to "set to expire". 

This allows the staff (or Provider, depending on the SMO team) to renew the permits they would like or set them to expire. 

![](<../../.gitbook/assets/image (309).png>)

![](<../../.gitbook/assets/image (312).png>)

After the permits have been added, renewed or set to expire the SMO team can go to the License Renewal at the bottom of the page. 

![](<../../.gitbook/assets/image (307).png>)

When the user clicks "Start License Renewal Process" button a dialog box will appear asking if they have reviewed all the permits up for renewal.   

![](<../../.gitbook/assets/image (308).png>)

If a user clicks "**No**", the dialog box will disappear and the user must review the permits and add, renew or set to expire any licenses. 

If a user click "**Yes**", will continue with the renewal process.

The form will ask you to enter the **Start Date** and the **Expiration Date **for the new license renewal cycle.

![](<../../.gitbook/assets/image (311).png>)

Click "**Submit**" when finished. The Provider object table will update the **Start Date** and the **Expiration Date **and make a copy of the license renewal information in the "archived_license" object table. 

## CREATE AN INVOICE

When the permits and licenses have been renewed, then an invoice can be created. 

1\. From the "View Provider Details page"

2\. Click the "**Invoices**" button, will bring you to an Invoices page.

3\. Click the "**Create Invoice**" button, a new invoice record will be create. The invoice date will be generated which is the date of creation, this can be edited later.

4\. Click the Invoice "**Details**" link

5\. From the "View Providers Details page"

### Edit Invoice

1\. From the "View Invoice Details page"

2\. Click the "**Edit Invoice**" button

3\. Edit the Invoice information on the form:

* **Invoice Period:** the date range the invoice is for
* **Invoice Number: **this field can be used to enter a custom invoice number (ex. from Finance)
* **Invoice Date:** this is the created date of the invoice, it can be edited
* **Use Renewal Date? **
  * **Yes: **This allows you to enter in a custom date, used for License and Permit Renewals
  * **No: **This is defaulted, it generated the 30 day due date. (Invoice Date-30 days)
* **Date Payment Received: **Date payment was made
* **Payment Type: **
  * Check
  * ACH
* **Invoice Status:** 
  * UNPAID
  * PENDING
  * PAID

Click "**Submit**" when finished.

### Add Invoice Items

1\. From the "View Invoice Details page"

2\. Click the "**Add Invoice Item**" button

3\. Fill out the Invoice Item information on the form:

* **Provider:** Select the provider the invoice is for, should isolate only one provider on the form (the one this invoice is associated to)
* **Transaction Type:** If a provider isn't checked, you will not see the associated Transaction Types belonging to the provider.
  * License Renewal Fee
  * Permit Renewal Fee
  * Monthly Trip Fee
  * Investigative Fee
  * Impoundment Fee
* **Cost Per Unit**: used to be $30 but is now $40 - adding "$" is unnecessary, just whole number is fine
* **Transaction Note**: this is for internal office staff to leave a note about the transaction

Click "**Submit**" when finished. Add as many invoice items to the invoice as each line will appear on the invoice. 

### Generate Invoice

When all line items have been entered. 

1\. From the "View Invoice Details page"

2\. Click the "**Invoice**" button

It will open up an Invoice page where staff can review the invoice. If staff would like to print, on the top right hand corner of the page is a "Print" page. In Chrome, it will open a Print Preview page. 

![](<../../.gitbook/assets/image (310).png>)

