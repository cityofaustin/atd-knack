---
description: >-
  The document will guide you through the process to batch copy Vision Zero
  assignments from one month to another.
---

# Batch Copy Process for VZA Assignments

##  Purpose 

To copy a batch of assignments from one month to another. This helps cut down on repetitive form entry and saves time.

## Permission

Only a VZA System Administrator /Knack Builder can carry out this process.

## Process

1 \) Open the `Assignments` object in Records View in the app

![](../.gitbook/assets/image%20%28185%29.png)

2 \) Exports all records as CSV to create a backup.

![](../.gitbook/assets/image%20%28181%29.png)

3 \) Filter assignments for a week \(Monday through Sunday\) using the Assignment Date Time field.

Ex. `Assignment Date Time` is after 07/5/2021 and `Assignment Date Time` is before 07/11/2021 

![](../.gitbook/assets/image%20%28192%29.png)

4 \) Export records to CSV., Save on Network Drive `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Schedules\Assignments`

![](../.gitbook/assets/image%20%28182%29.png)

5 \) Open CSV in Excel

6 \) Add 1 fields to the left of `Assignment Date Time` column, enter formula: `=left(D2,10)`this will capture the date from the original field. Use the "Fill Down" function or drag the field to populate the rest of the records. 

7 \) Add 1 field to the right of the "New date field", enter formula: `B2+28` this will create a new date for 28 days later. Use the "Fill Down" function or drag the field to populate the rest of the records. Copy and Paste records As Value. Delete the "New date field".

8 \) Add 1 field to the right of "Date +28 days" column, enter formula: `=RIGHT(D2,14)` this will capture the time you need to have.

9 \) Add 1 field to the right of the "Time" column, enter formula: `=concatenate(text(B2,"mm/dd/yyyy")&" "&text(C2,"hh:mm:ss"))`Use the "Fill Down" function or drag the field to populate the rest of the records. Copy and Paste records As Value. Delete the "Date+28 days" and "Time" columns.

10 \) Delete the old "Assignment Date Time" cell records and Title the new column "Assignment Date Time". Deleted "Modified By", "Modified Date", "Shift Label". 

11 \) Fill in "Created Date", copy same date for all records. Add your email to the "Created By" field. Then Save and Close .csv

12 \) Import the CSV for a week into the Assignments object by clicking on Import in the Assignments object Records view. 

![](../.gitbook/assets/image%20%28183%29.png)

10 \) Click Upload CSV and navigate to the CSV you modified earlier.

![](../.gitbook/assets/image%20%28188%29.png)

11 \) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](../.gitbook/assets/image%20%28184%29.png)

12 \) Do you want to update existing assignments records with this import? Choose - No, you want to each row as a new record

![](../.gitbook/assets/image%20%28190%29.png)

13 \) Confirm the field mapping of the columns. 

![](../.gitbook/assets/image%20%28186%29.png)

14 \) Exclude all calculated fields - text formulas, equations and conditional fields. 

Here is a list of the fields that will need to be matched - 

1. Assignment Date and Time
2. Team Number
3. Assignment Type
4. Shift
5. Vision Zero Location - Vision Zero Location &lt;Display Name
6. Assignment Number
7. Description
8. No of Officers Required

15 \) Go down to "**Created By**" and choose "**Email**"

![](../.gitbook/assets/image%20%28187%29.png)

19 \) Click **Next**. The records will be imported into the object. 

![](../.gitbook/assets/image%20%28180%29.png)

22 \) Confirm the records have been imported by checking Assignment IDs and the Calendar. 

## Check - QAQC

These fields need to be populated for the next steps in the process to work. In Knack Builder, check to make sure non of these fields are blank.

1. Assignment Date and Time
2. Shift 
3. Team Number 
4. Location
5. APD Sector 
6. Number of Officers
7. Assignment Number



