# RPP Migration

Navigate to this folder on the network drive: 

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\reference\RPP Tracking Spreadsheets`

The spreadsheet I've been copying has been "**Sold RPP Permits 2020 - SI**" or one of the other spreadsheets "**Permits\_2020\_GREEN\_ZONE**" and saving as and renaming to the appropriate zone name. 

Example of spreadsheet names:

* "Permits\_2020\_PINK\_ZONE"
* "Permits\_2020\_RED\_ZONE"
* "Permits\_2020\_ORANGE\_ZONE"

## Format original spreadsheet

Fields are currently in this order: 

* **Name** - Extract to use for Contact spreadsheet import
  * There are excel comments/notes that have customer phone numbers used for the Contact spreadsheet
* **Street Name** - Extract to use for Permit Application spreadsheet import
* **Home Address** - Extract to use for Permit Application spreadsheet import
* **Zone \#** -  FIELD NOT USED IN IMPORT
* **"\# of Decals"** - Extract to use for Permit Application spreadsheet import
* **Serial \#** \(this field contains the permit serial \# and the license plate number\)
  * Should be combined to one column field
* **"\# of Hang-Tags"** - Extract to use for Permit Application spreadsheet import
* **Serial \#** \(this field contains the hang tag serials\)
  * Should be combined to one column field
* **Day Passes** \(Used to fill out "Visitor Day Pass" field\)
* **Serial \#** \(this field contains the day pass serials\)
  * Should be combined to one column field
* **Total Permits** - FIELD NOT USED IN IMPORT
* **Revenue Generated** - FIELD NOT USED IN IMPORT
* **Contact Information** - email address \(**Extract to use for Contact spreadsheet import\)**
* **Date Received** - Used to fill out "Submitted Date"
* **Total Transactions** -  FIELD NOT USED IN IMPORT

## Contacts

### Configure "Customer" spreadsheet

1. Take original spreadsheet and filter the "Revenue Generated" field and do not select the "zero values" then extract those customers. 
2. Look for multiple customer in the field \(hint: use Find and search for all "&" or "and" in the name\), reference the first email in the "Contact Information" field and use the customer name as the primary.
3. Check the "Name" field for excel comments/notes that have customer phone numbers and add them to a new field called "Phone".
4. If you notice duplicate customer records, just keep one customer record
5. Go through every record to find decrepancies or notes about the customer \(Ex. Property Mgmt - but lists actual person\)

Reference "**Customers\_GREEN\_164.csv**" - is the format of the Knack `Customer` table

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\import_tables`

Fields to configure: 

* `Name`
* `First`
* `Last`
* `Phone`
* `Email`

### Import Zone Contacts into "Customer" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Follow steps to import
7. 
{% hint style="info" %}
ADD THE REST OF THE ****STEPS WHEN CONFIGURING "**PINK**" ZONE
{% endhint %}

### Export Zone contacts from "Customer" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Export**" at the top, choice to select "**.csv**"

## Permit Application

### Configure "Permit Application" spreadsheet

Reference "**permit\_application\_GREEN\_20200709.csv**" - is the format of the "`permit_application`" object table

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\import_tables`

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

### Import Zone Permit Applications into "permit\_applications" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Follow steps to import
7. Remove unnecessary fields 
8. Make sure all field are mapped to their correct fields

See these configurations:

* **Remove "Order"**
* Map "**Name**" to "`Name>Display Name`"
* Map "**Name of Applicant**" to "`Name>Name of Applicant`"
* **Remove "Resident Address"**
* Map "**Resident Address**" to "`Resident Address: Street 1`"
* **Remove "Resident Address: Street 2"**
* Map "**Resident Address: City**" to "`Resident Address: City`"
* Map "**Resident Address: City**" to "`Resident Address: State`"
* Map "**Resident Address: Zip**" to "`Resident Address: Zipcode`" 
  * \(CHANGE SPREADSHEET TO THIS FIELD NAME\)
* **Remove "Resident Address: Country"**
* **Remove "Resident Address: Latitude"**
* **Remove "Resident Address: Longitude"**
* Map "**RPP Zone**" to "`RPP Zone>Display Name`"
* Map "**Hangtags**" to "`Hang-tags`" 
  * \(CHANGE SPREADSHEET TO THIS FIELD NAME\)

Everything else is mapped automatically.

### Export Zone Permit Applications from "permit\_applications" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Export**" at the top, choice to select "**.csv**"

## Permit spreadsheet

Each record should have an association between the application and permit



