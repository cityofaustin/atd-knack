# RPP Migration

## Preparing Original Spreadsheet

[Export Zone Permit Applications from "permit\_applications" object table](https://app.gitbook.com/@atd-dts/s/atd-knack-operations/residential-parking-permit-rpp-program/rpp-migration#export-zone-permit-applications-from-permit_applications-object-table) 

Navigate to this folder on the network drive: 

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\reference\RPP Tracking Spreadsheets`

1. Open the "**Sold RPP Permits 2020 - SI**" Excel spreadsheet
2. Depending on the colored zone you are working with, remove all other sheets from the workbook
3. With only one colored zone sheet remaining, _'Save As'_ : "**Permits\_2020\_**_**COLOR**_**\_ZONE**" \(where color is replaced with the appropriate color you are working with\)
4. Save into the _'2020 RPP Permit Zones'_ folder for reference

\*Note: Be sure NOT to replace or overwrite the original RPP Permits file

## Understanding Original Spreadsheet

Fields are currently in this order: 

* **Name** - Extract to use for Customer spreadsheet import
  * There are excel comments/notes that have customer **phone numbers** used for the Customer spreadsheet import
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
* **Contact Information** - \(Email Address\) Extract to use for Customer spreadsheet import
* **Date Received** - Used to fill out "Submitted Date"
* **Total Transactions** -  FIELD NOT USED IN IMPORT

## Contacts

### Configure "Customer" Spreadsheet

1. With the "**Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet open, select all black rows as well as the 2 totals rows at the bottom and remove from spreadsheet
2. Select Column 'M' \(Revenue Generated\), select 'Sort & Filter' button in the Excel ribbon, select 'Filter' 
3. Select the Filter icon that now appears on the column and exclude the "zero value" \($0.00\) records
4. With the now filtered "**Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file 'Save As' "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" into the **"Revenue Only**" folder
5. Navigate to and open the "**Customers\_COLOR\_TEMPLATE**" spreadsheet file and 'Save As' "**Customers\_COLOR**" with the appropriate color zone you are working with. Save to the **"import\_tables"** folder. Navigate and open the existing "**Customers\_COLOR**" spreadsheet file if it already exists. Fields to configure: 
   * `Full Name`
   * `First Name`
   * `Middle Name`
   * `Last Name`
   * `Phone`
   * `Email`
   * `Notes`
6. With the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file, copy all names and paste values to the 'Full Name' column in the new "**Customers\_COLOR**" spreadsheet file
7. Copy all 'Contact Information' \(emails\) and paste values to the 'Email' column in the new "**Customers\_COLOR**" spreadsheet file
8. Go through the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file and transpose any relevant notes and comments from each row into the 'Notes' column on the "**Customers\_COLOR**" spreadsheet file such as purchase date info or tenant names. If the information from these excel comments and notes are phone numbers, transpose them to the 'Phone' column on the "**Customers\_COLOR**" spreadsheet file
9. If the original record has a property management company as the name yet there is a comment or note that has the owner name for the record, go ahead and replace the business name with the owner name as the 'Full Name'
10. Once all name, phone, email, and notes information has been copied over to the "**Customers\_COLOR**" spreadsheet file, you may close the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file
11. On the "**Customers\_COLOR**" spreadsheet file look for multiple customer names in the 'Full Name' column \(hint: use 'Find and Search' for all "&" or "and" in the name\), reference the first email in the 'Email' field and use the associated customer name as the primary 'Full Name' and remove any other names from the cell. Remove any additional emails from the 'Email' cell that are not the primary email
12. Organize the spreadsheet alphabetically by the 'Full Name' column
13. Check the 'Full Name' field for duplicate customer records and remove the row that features less information. If otherwise the same in all fields, choose either row to remove
14. With the 'Phone' column, 'Find & Replace' all .\(dots\) with -\(dashes\) in all phone numbers
15. Either copy/paste or enter the 'First Name', 'Middle Name', and 'Last Name' information from the 'Full Name' column for all records
16. Lastly, go through every record and verify all fields are formatted and entered correctly. Save file
17. Rename the file to "**Customers\_COLOR\_\#**" where \# is the number of customer records to be imported and 'Save As' a .csv file. Be sure not to include the title row in the number of records.

Reference "**Customers\_GREEN\_164.csv**" - is the format of the Knack `Customer` table

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\import_tables`

### Import Zone Contacts into "Customer" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Upload CSV, select file
7. Leave defaults, click next
8. Map to dropdown to appropriate fields except first full name field
9. check number of customers with no permits linked already in system
10. submit import



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

### Import Zone "permit\_applications" object table to "Customer" object table

Reference "**Customer\_import\_GREEN\_with\_appID.csv**" - is the format of the Knack `Customer` table

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\import_tables`

Fields to have on spreadsheet: 

* `Name` \(Which shows the Display Name: `Ex. 488 | Adam Lescalleet`
* `Application ID`

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Follow steps to import

See these configurations:

* Select a field to match records "`Display Name`" \(first page of "Import new records"\), click "Next"
* Select "match column", click "Next"
* Map "**Application ID**" to `"permit_application>Application ID"`
* **Remove all other unnecessary or blank fields** 

## Permit spreadsheet

Each record should have an association between the application and permit



