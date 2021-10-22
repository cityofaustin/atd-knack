# RPP Migration

## Preparing Original Spreadsheet

[Export Zone Permit Applications from "permit\_applications" object table](https://app.gitbook.com/@atd-dts/s/atd-knack-operations/residential-parking-permit-rpp-program/rpp-migration#export-zone-permit-applications-from-permit\_applications-object-table)&#x20;

Navigate to this folder on the network drive:&#x20;

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\reference\RPP Tracking Spreadsheets`

1. Open the "**Sold RPP Permits 2020 - SI**" Excel spreadsheet
2. Depending on the colored zone you are working with, remove all other sheets from the workbook
3. With only one colored zone sheet remaining, _'Save As'_ : "**Permits\_2020\_**_**COLOR**_**\_ZONE**" (where color is replaced with the appropriate color you are working with)
4. Save into the _'2020 RPP Permit Zones'_ folder for reference

\*Note: Be sure NOT to replace or overwrite the original RPP Permits file

## Understanding Original Spreadsheet

Fields are currently in this order:&#x20;

* **Name **- Extract to use for Customer spreadsheet import
  * There are excel comments/notes that have customer **phone numbers** used for the Customer spreadsheet import
* **Street Name **- Extract to use for Permit Application spreadsheet import
* **Home Address **- Extract to use for Permit Application spreadsheet import
* **Zone # **-  FIELD NOT USED IN IMPORT
* **"# of Decals" **- Extract to use for Permit Application spreadsheet import
* **Serial #** (this field contains the permit serial # and the license plate number)
  * Should be combined to one column field
* **"# of Hang-Tags" **- Extract to use for Permit Application spreadsheet import
* **Serial #** (this field contains the hang tag serials)
  * Should be combined to one column field
* **Day Passes **(Used to fill out "Visitor Day Pass" field)
* **Serial #** (this field contains the day pass serials)
  * Should be combined to one column field
* **Total Permits** - FIELD NOT USED IN IMPORT
* **Revenue Generated** - FIELD NOT USED IN IMPORT
* **Contact Information** - (Email Address) Extract to use for Customer spreadsheet import
* **Date Received** - Used to fill out "Submitted Date"
* **Total Transactions** -  FIELD NOT USED IN IMPORT

## Contacts

### Configure "Customer" Spreadsheet

1. With the "**Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet open, select all black rows as well as the 2 totals rows at the bottom and remove from spreadsheet
2. Select Column 'M' (Revenue Generated), select 'Sort & Filter' button in the Excel ribbon, select 'Filter'&#x20;
3. Select the Filter icon that now appears on the column and exclude the "zero value" ($0.00) records
4. With the now filtered "**Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file 'Save As' "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" into the **"Revenue Only**" folder
5. Navigate to and open the "**Customers\_COLOR\_TEMPLATE**" spreadsheet file and 'Save As' "**Customers\_COLOR**" with the appropriate color zone you are working with. Save to the **"import\_tables"** folder. Navigate and open the existing "**Customers\_COLOR**" spreadsheet file if it already exists. Fields to configure:
   * Name
   * Name of Applicant: First
   * Name of Applicant: Middle
   * Name of Applicant: Last
   * Phone
   * Email
   * Notes
6. With the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file, copy all names and paste values to the 'Full Name' column in the new "**Customers\_COLOR**" spreadsheet file
7. Select the 'Contact Information' (emails) column, right click, and select 'Remove Hyperlinks'
8. Copy all 'Contact Information' (emails) and paste values to the 'Email' column in the new "**Customers\_COLOR**" spreadsheet file
9. Go to the 'Review' tab in Excel, select the 'Notes' icon, and select 'Convert to Comments'. This will make it so notes are easier to read and copy
10. Go through the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file and transpose any relevant notes and comments from each row into the 'Notes' column on the "**Customers\_COLOR**" spreadsheet file such as purchase date info, address info, or tenant names. If the information from these excel comments and notes are phone numbers, transpose them to the 'Phone' column on the "**Customers\_COLOR**" spreadsheet file
11. If the original record has a property management company as the name yet there is a comment or note that has the owner name for the record, go ahead and replace the business name with the owner name as the 'Full Name'
12. Once all name, phone, email, and notes information has been copied over to the "**Customers\_COLOR**" spreadsheet file, you may close the "**Revenue\_Permits\_2020\_**_**COLOR**_**\_ZONE**" spreadsheet file
13. On the "**Customers\_COLOR**" spreadsheet file look for multiple customer names in the 'Full Name' column (hint: use 'Find and Search' for all "&" or "and" in the name), reference the first email in the 'Email' field and use the associated customer name as the primary 'Full Name' and remove any other names from the cell. Remove any additional emails from the 'Email' cell that are not the primary email
14. Organize the spreadsheet alphabetically by the 'Full Name' column
15. Check the 'Full Name' field for duplicate customer records and remove the row that features less information. If otherwise the same in all fields, choose either row to remove
16. With the 'Phone' column, 'Find & Replace' all .(dots) with -(dashes) in all phone numbers
17. Either copy/paste or enter the 'Name of Applicant: First', 'Name of Applicant: Middle', and 'Name of Applicant: Last' information from the 'Full Name' column for all records
18. Lastly, go through every record and verify all fields are formatted and entered correctly. Save file
19. Rename the file to "**Customers\_COLOR\_#**" where # is the number of customer records to be imported and 'Save As' a .csv file. Be sure not to include the title row in the number of records.

Reference "**Customers\_GREEN\_163.csv**" - as the format of the Knack `Customer` table

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
ADD THE REST OF THE** **STEPS WHEN CONFIGURING "**PINK**" ZONE
{% endhint %}

### Export Zone contacts from "Customer" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Export**" at the top, choice to select "**.csv**"

## Permit Application

### Configure "Permit Application" Spreadsheet

Reference "**permit\_application\_GREEN\_20200709.csv**" - is the format of the "`permit_application`" object table

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_RPP_Residential_Parkiing_Permit_Program\import_tables`

Fields to configure:&#x20;

| Name                           | Display Name - from Customer table                  |
| ------------------------------ | --------------------------------------------------- |
|                                | Ex. `447 \| Aaron Harter`                           |
| Name of Applicant              | "Name" on the original permit spreadsheet           |
| Resident Address               | Must concatenate "Home Address" & "Street Name"     |
| Resident Address: Street 1     |                                                     |
| Resident Address: Street 2     |                                                     |
| Resident Address:  City        |                                                     |
| Resident Address: State        |                                                     |
| Resident Address: Zip          |                                                     |
| Resident Address: Country      | NOT POPULATED, DON'T IMPORT                         |
| Resident Address: Latitude     | NOT POPULATED, DON'T IMPORT                         |
| Resident Address: Longitude    | NOT POPULATED, DON'T IMPORT                         |
| RPP Zone                       | Display Name - from RPP Zone table                  |
| Resident Decals                | "# of Decals" on the original permit spreadsheet    |
| Hangtags                       | "# of Hang-Tags" on the original permit spreadsheet |
| Visitor Day Pass               | "Day Pass" on the original permit spreadsheet       |
| Submitted Date                 | "Date Received" on the original permit spreadsheet  |
| Number of Vehicles Registering |                                                     |
| License Plate 1                |                                                     |
| State 1                        | Texas                                               |
| License Plate 2                |                                                     |
| State 2                        | Texas                                               |
| License Plate 3                |                                                     |
| State 3                        | Texas                                               |
| License Plate 4                |                                                     |
| State 4                        | Texas                                               |

### Import Zone Permit Applications into "permit\_applications" object table

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Follow steps to import
7. Remove unnecessary fields&#x20;
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
* Map "**Resident Address: Zip**" to "`Resident Address: Zipcode`"&#x20;
  * (CHANGE SPREADSHEET TO THIS FIELD NAME)
* **Remove "Resident Address: Country"**
* **Remove "Resident Address: Latitude"**
* **Remove "Resident Address: Longitude"**
* Map "**RPP Zone**" to "`RPP Zone>Display Name`"
* Map "**Hangtags**" to "`Hang-tags`"&#x20;
  * (CHANGE SPREADSHEET TO THIS FIELD NAME)

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

Fields to have on spreadsheet:&#x20;

* `Name `(Which shows the Display Name: `Ex. 488 | Adam Lescalleet`
* `Application ID`

1. Open builder
2. Navigate under "**Data**" tab
3. Go to "`customer`" object table
4. Click "**Records**" at the top
5. Click "**Import**" at the top
6. Follow steps to import

See these configurations:

* Select a field to match records "`Display Name`" (first page of "Import new records"), click "Next"
* Select "match column", click "Next"
* Map "**Application ID**" to `"permit_application>Application ID"`
* **Remove all other unnecessary or blank fields **

## Permits Spreadsheet

### Understanding Permits Spreadsheet

Fields are currently in this order:&#x20;

* **Name **- The concatenated 'customer ID | customer name' from the "Customer Export" spreadsheet
* **Renewal Year **- Actually a month value. The same value for the entire zone
* **Permit Type **- One of 3 types: 'Residential Parking Permit | decal', Residential Parking Permit | hang tag', or 'Day Pass'
* **Total Day Passes **- The total number of Day Passes for that customer. If more than 20, create a new record for the remaining day passes and corresponding serial numbers
* **Serial Numbers** - The 4 or 5 digit serial number that corresponds with an individual pass. For Day Passes, this value will be a range of serial number that corresponds with the total number of Day passes
* **Issued Date **- Is actually the 'Date Received' value for the customer application
* **Date Received** - FIELD NOT USED IN IMPORT. Copied to the 'Issued Date' column
* **Total Permits **- FIELD NOT USED IN IMPORT. Total of Decal and Hang Tag permits. You may update to include the Day Passes in the total as reference but be aware this column will be removed.
* **"# of Decals" **- FIELD NOT USED IN IMPORT. Number of Decal Permits for customer. Max 4 Decal Permits per application with some exceptions made for 6
  * Some areas within a zone may have alternate restrictions such as the Mueller area in Pink zone, which has a Max of 2 Decal Permits. Some exceptions may apply
* **Serial #** - FIELD NOT USED IN IMPORT. Serial Numbers and License Plate Numbers for each Decal Permit
* **"# of Hang-Tags" **- FIELD NOT USED IN IMPORT. Number of Hang Tag Permits for customer. Max 4 Hang Tag Permits per application with some exceptions made for 6
  * Some areas within a zone may have alternate restrictions such as the Mueller area in Pink zone, which has a Max of 2 Hang Tag Permits. Some exceptions may apply
* **Serial # **- FIELD NOT USED IN IMPORT. Serial Numbers for each Hang Tag Permit. May show as a range value and and must be entered individually when copied over to the 'Serial Numbers' column for each Hang Tag permit record row for the customer
* **Day Passes** - FIELD NOT USED IN IMPORT. Number of Day Passes for customer. Max 20 Day Pass Permits per application with some exceptions made for 40
  * Day Passes are usually allotted to customers who represent organizations, property management, or business entities
* **Serial #**- FIELD NOT USED IN IMPORT. A range of Serial Numbers for all Day Pass Permits
* **Total Transactions** -  FIELD NOT USED IN IMPORT.&#x20;

### Configure "Permits" Spreadsheet

Each record should have an association between the application and permit

1. On both the **"Permits\_COLOR"** spreadsheet and **"Customer Export"** spreadsheet, make sure your records are ordered alphabetically. This will allow us to match the Name to the Name field on the **"Customer Export"** spreadsheet that includes the concatenated Customer ID for each Name as well as the Application ID in the 'permit\_applications' column. Fields to configure:
   * Issued By
   * permit\_applications (do not rename field)
   * Name
   * Renewal Year
   * Permit Type
   * Total Day Passes
   * Serial Numbers
   * Issued Date
2.  On the **"Permits\_COLOR"** spreadsheet select the row number for each record and right click and insert ('I' key) for how many total permits there are for that customer. So if total permits for a customer is 4, you will need to insert 3 additional rows below that record so we can separate each permit for all customers

    Note: For Day Passes, we will only dedicate one row for each grouping of up to 20 day passes&#x20;
3. Add 2 more columns, 'Issued By' as column 'A' and 'permit\_applications' as column 'B' in front of the 'Name' column
4. For the 'Issued By' column, fill in your name (Knack RPP Reviewer or Builder Admin) and drag the cell to fill in the column for all records
5.  For the 'permit\_applications' field, we will need to enter the 8 digit Permit Application number. (This permit application number may need to change to a 9 digit number should the number of applications exceed 10,000 in a given year). The Permit Application number and the Name with the concatenated Application ID (appID) can both be found and transposed from the  **"Customer Export"** spreadsheet. Copy both the corresponding Application ID in the 'permit\_applications' column and the corresponding Name in the 'Name' column over the old 'Name' value for all records

    **Note:** Some customers may have more than one application associated with them
6. For 'Renewal Year' column select or enter 2 cells worth of values, select both, and drag that selection with the bottom right square to apply to the entire column since renewal year will be the same for all customers in the same zone
7. Skip over 'Permit Type', 'Total Day Passes', and 'Serial Numbers" columns for now
8. Transpose the 'Date Received' value over to the 'Issued Date' column next to it on the same record row for all records with 'Date Received'
9. (Optional) Make sure the 'Total Permits' column displays accurately the total number of permits when referencing for your record rows
10. Select the row number for each record and right click and insert ('I' key) for how many total permits there are for that customer. Naturally the insert function will insert a row above the selected record so you can either start from bottom to top or simply just skip the first record row. So if 'Total Permits' for a customer is 4, you will need to insert 3 additional rows below that record so we can separate each permit for all customers

    **Note:** For Day Passes, we will only dedicate one row for each grouping of up to 20 day passes
11. Copy each customer record row or columns 'A' to 'H' for each customer record, select all corresponding empty rows below that customer and paste. Do for all records.
12. Transpose the Decal Serial Numbers, Hang-Tag Serial Numbers, and Day Pass Serial Numbers from the right columns (columns 'K' to 'O') to their individual rows under 'Serial Numbers' column 'G'. You may copy and paste, manually enter, or use the 'Fill Series' option to transpose serial numbers. Remember to just paste the range of serial numbers for up to 20 day passes on its specific row.

    **Note:** If a customer is associated with multiple applications, be sure that the corresponding serial numbers match accordingly
13. Enter the 'Total Day Passes' column with the total day pass values from column 'O' 'Day Passes' on the specific last row for that customer name where the Day Pass Serial Numbers are entered in the 'Serial Numbers' column 'G'
14. For the 'Permit Type' column, now enter the value 'Day Pass' on each respective record row that has the 'Total Day Passes' and 'Serial Numbers' for Day Passes
15. For the 'Permit Type' column, now enter the value 'Residential Parking Permit | decal' for each respective record row that has 'Serial Numbers' for only Decal Permits
16. For the 'Permit Type' column, now enter the value 'Residential Parking Permit | hang tag' for each respective record row that has 'Serial Numbers' for only Hang Tag Permits (the remaining empty cells in the 'Permit Type' column)
17. Double check and verify all copied or entered data matches accordingly
18. Remove all reference columns from the spreadsheet, columns 'I' through 'Q' to finalize the spreadsheet. Save file
19. Rename the file to "**Permits\_COLOR\_#**" where # is the number of permit records to be imported and 'Save As' a .csv file. Be sure not to include the title row in the number of records.

### Import "Permits" CSV

