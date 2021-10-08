# Application Overview

### About the Application

Information about this application, it's key stakeholders, and functionality can be found [here. ](https://app.zenhub.com/workspaces/data--technology-services-5caf7dc6ecad11531cc418ef/issues/cityofaustin/atd-data-tech/1192)

### Workflow

The workflow for this application is in the process of being documented on this [Miro Board](https://miro.com/app/board/o9J_lU6H3zc=/).

### Enhancements

Code for the enhancements made to this application can be found [here](https://github.com/cityofaustin/atd-knack/tree/master/code). 

## TABLE OF CONTENTS

* About Licenses & Permits
* Home Page
* Providers
  * Add a New Provider
  * Add a License
  * Add Permits
  * How to Renew Permits
  * Creating Invoices
* Fees/Payments
* Trip Data
* Reports
* My License

## ABOUT LICENSES & PERMITS

A license is tied to a provider account. This is where the license start and end period can be entered. These dates will be the primary start/end dates to the permits associated to the provider.

A provider can hold multiple permits. A permit must be issued if the provider is choosing to deploy devices in a different geographic area. If they decide to change the amount of devices and/or the geographic area a new permit must be issued.

Ex. 100 devices in DAPCZ

* the provider DOESN'T want to change the location or number of devices, than this permit can be renewed.
* the provider DOES want to change either the location or the number of devices, a new permit needs to be created
  * Provider wants to add 50 more units to a geographic area - _150 in DAPCZ_
  * Provider wants to deploy 100 units in new zone, Zone 1 - _100 in Zone 1_

## HOME PAGE

This page is intended to be a quick summary page to review various information like number of active permits, expiring licenses, permits, track expiring bonds, insurances and impound fees.

The overall workflow is: 

1. A user creates a provider record/license record.
2. User creates permits for provider and specifies the quantity of units and location
3. User creates Bonds, Insurances records
4. Monthly Trip fees are generated, Impound fees are created \(if applicable\)
5. An invoice is created, the user adds Invoice Items to generate the line items for the invoice
6. User sends invoice to providers
7. Provider pays invoice
8. SMO team user updates invoice and tracks payment dates

### License & Permit Statuses

| `LICENSE STATUS` | `DESCRIPTION` |
| :--- | :--- |
| **ACTIVE** | The license has been deemed active by the SMO Team  |
| **PENDING APPROVAL** | The license is under review of the SMO Team |
| **NOT OPERATIONAL** | At times the provider/SMO Team decide that the provider is to not do any business and will "freeze" the status of the license and all the current permits associated to a provider. |
| `PERMIT STATUS` | `DESCRIPTION` |
| **ACTIVE** | When SMO Team has added a permit to a provider and that provider is able to do business in the specified area with the specified number of units |
| **EXPIRED** | The permit has expired due to the permit not being renewed |
| **NOT OPERATIONAL** | At times the provider/SMO Team decide that the provider is to not do any business and will "freeze" the status of the license and all the current permits associated to a provider. This status is when the license has become "Not Operational" |

## PROVIDERS

From the “Providers” [page](https://atd.knack.com/smo#providers/) you can view all your Providers and their DBA Name, License Status and Address. You have the ability to click on the "Details" link to explore more details about the providers. 

### ADD A NOTE

1. From the "View Providers Details page"

2. Click the "**Add Notes**" button

3. Fill out the note form:

* **Note Date**: is populated
* **Note**: Add comment or note here

4. Click the “Submit” button to submit the form.

### ADD A NEW PROVIDER

1. From the "View Providers Details page"

2. Click the "**Add New Provider**" button

3. Fill out the Provider information on the form:

* **Doing Business As:** alternate name company goes by \| _Required_.
* **Company Name:** Legal Name of company
* **Address**: Company Address
* **Start Date:** The date the company's license was activated \| _Required_.
* **Expiration Date**: The date the company's license expires \| _Required_.
* **Provider License Status:** Company's license status \| _Required_.

4. Click the “**Submit**” button to submit the form.  
You will be taken back to the Provider page where you can click the "Details" link.

## FEES/PAYMENTS

1. From the “Home” page: [https://atd.knack.com/smo\#home/](https://atd.knack.com/smo#home/)
2. You can view all fees/payments by clicking under “Fees/Payments” tab

There are menu buttons for: 

* **ACH Information**: This page shows the ACH Information so it's easy to reference when speaking to a Provider
* **Impoundments**: This is a page that tracks any impoundment events that happen with provider devices. Tracks the dates, number of units to be impounded, fee amount and fee due dates. 

​On this page you can see all provider Invoices and individual Transactions. The transactions are filtered by the transaction type: 

* Investigative Fee
* License Renewals
* Permit Renewal Fee
* Impoundment Fee
* Monthly Trip Fee

## TRIP DATA

1. From the “Home” page: [https://atd.knack.com/smo\#home/](https://atd.knack.com/smo#home/)
2. You can view all Monthly Trip data by clicking under “**Trip Data**” tab

There are menu buttons for:

* **Add New Monthly Trip Record**

The first table "Monthly Trip Comparison" shows the Trip Totals from the COA Total Trips, Ride Report Total Trips, Provider - Reported Total Trips, Official Total Trips and the Source - Official Total Trips.

The second table "City of Austin \(CoA\) Monthly Trips Stats" shows the trip information like Total Trips Distance, Average Trip Distance, Trips - Zero Distance, Trips - Long Distance, CoA Total Trips. 

## REPORTS

1. From the “Home” page: [https://atd.knack.com/smo\#home/](https://atd.knack.com/smo#home/)
2. You can view Report data by clicking under “**Reports**” tab

There is a table "Total Active Permits by Provider" that shows the active permits for each Provider annually.   


There is also an Advanced Search permits function to allow a user to search for permits by various fields.

Search Fields:

* Provider
* Device Type
* Permit Type
* Permit Status
* Zone
* Keyword Search
* License ID
* Permit ID
* Permit Start Date
* Permit Expiration Date
* Date Last Renewed

Search results show table that can be exported 

## MY LICENSE

1. From the “Home” page: [https://atd.knack.com/smo\#home/](https://atd.knack.com/smo#home/)

2. You can view provider license by clicking under “**My License**” tab

This page is specifically for the Providers \(if/when they are granted access t​o the system\)

They would be able to see: 

* **Bonds**: What bonds they have and when they are expiring
* **Insurances**: What Insurances they have and when they are expiring
* **Provider Contacts**: Who is listed as the provider contact for the company
* **Active Permits**: Any permits that are in "Active" statuses
* **Expired Permits**: Any permits that are in an "Expired" status

