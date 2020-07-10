# RPP Migration

Navigate to this folder on the network drive: 

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\reference\RPP Tracking Spreadsheets`

The spreadsheet I've been copying has been "**Sold RPP Permits 2020 - SI**" or one of the other spreadsheets "**Permits\_2020\_GREEN\_ZONE**" and saving as and renaming to the appropriate zone name. 

Example of spreadsheet names:

* "Permits\_2020\_PINK\_ZONE"
* "Permits\_2020\_RED\_ZONE"
* "Permits\_2020\_ORANGE\_ZONE"

## Contacts

### Configure "Contact" spreadsheet

Reference "**Customers\_GREEN\_164.csv**" - is the format of the Knack `Customer` table

Fields to configure: 

* `Name`
* `First`
* `Last`
* `Phone`
* `Email`

### Import Zone Contacts into "Contacts" object table

### Export Zone contacts from "Contacts" object table

## Permit Application

### Configure "Permit Application" spreadsheet

Reference "**permit\_application\_GREEN\_20200709.csv**" - is the format of the "`permit_application`" object table

Fields to configure: 

| Name | Display Name - from Customer table |
| :--- | :--- |
|  | Ex. `447 | Aaron Harter` |
| Name of Applicant | "Name" on the original permit spreadsheet |
| Resident Address | Must concatenate "Home Address" & "Street Name" |
| Resident Address: Street 1 |  |
| Resident Address: Street 2 |  |
| Resident Address:  City |  |
| Resident Address: State |  |
| Resident Address: Zip |  |
| Resident Address: Country | NOT POPULATED, DON'T IMPORT |
| Resident Address: Latitude | NOT POPULATED, DON'T IMPORT |
| Resident Address: Longitude | NOT POPULATED, DON'T IMPORT |
| RPP Zone | Display Name - from RPP Zone table |
| Resident Decals | "\# of Decals" on the original permit spreadsheet |
| Hangtags | "\# of Hang-Tags" on the original permit spreadsheet |
| Visitor Day Pass | "Day Pass" on the original permit spreadsheet |
| Submitted Date | "Date Received" on the original permit spreadsheet |
| Number of Vehicles Registering |  |
| License Plate 1 |  |
| State 1 | Texas |
| License Plate 2 |  |
| State 2 | Texas |
| License Plate 3 |  |
| State 3 | Texas |
| License Plate 4 |  |
| State 4 | Texas |

## Format original spreadsheet

Fields are currently in this order: 

* **Name - Extract to use for Contact spreadsheet import**
  * There are excel comments/notes that have customer phone numbers used for the Contact spreadsheet
* **Street Name**
* **Home Address**
* **Zone \#**
* **"\# of Decals"**
* **Serial \#** \(this field contains the permit serial \# and the license plate number\)
* **"\# of Hang-Tags"**
* **Serial \#** \(this field contains the hang tag serials\)
* **Day Passes** \(Used to fill out "Visitor Day Pass" field\)
* **Serial \#** \(this field contains the day pass serials\)
* **Total Permits** - FIELD NOT USED IN IMPORT
* **Revenue Generated** - FIELD NOT USED IN IMPORT
* **Contact Information** - email address \(**Extract to use for Contact spreadsheet import\)**
* **Date Received** - Used to fill out "Submitted Date"
* **Total Transactions** -  FIELD NOT USED IN IMPORT



## Permit spreadsheet

Each record should have an association between the application and permit



