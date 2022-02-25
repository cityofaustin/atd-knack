---
description: >-
  The document will guide you through the process to batch copy Vision Zero
  assignments.
---

# Batch Copy Process for VZA Assignments

\
Purpose&#x20;
-------------

To copy a batch of assignments from one month to another. This helps cut down on repetitive form entry and saves time.

## Permission

Only a VZA Admin / Knack Builder can carry out this process.

## Process

1 ) Open the `Assignments` object in Records View

![](<../../.gitbook/assets/image (185).png>)

2 ) Exports all records as CSV to create a backup.

![](<../../.gitbook/assets/image (181).png>)

3 ) Filter assignments for the previous 8 weeks (Monday to Sunday) using the Assignment Date Time field.

Ex. `Assignment Date Time` is after 01/02/2022 23:59 and `Assignment Date Time` is before 02/28/2022 00:00

![](<../.gitbook/assets/image (5).png>)

4 ) Export records to CSV., Save on Network Drive as Assignments\__Export_\_Date `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Schedules\Assignments`

5 ) Open CSV in Excel

6 ) Add 1 fields to the left of `Assignment Date Time` column, enter formula: `=left(C2,10)`this will capture the date from the original field. Use the "Fill Down" function or drag the field to populate the rest of the records.&#x20;

![](<../../.gitbook/assets/image (189).png>)

7 ) Add 1 field to the right of the "New date field", enter formula: `B2+28` this will create a new date for 28 days later. Use the "Fill Down" function or drag the field to populate the rest of the records. Copy and Paste records As Value. Delete the "New date field".

![](<../../.gitbook/assets/image (191).png>)

8 ) Add 1 field to the right of "Date +28 days" column, enter formula: `=RIGHT(D2,14)` this will capture the time you need to have.

![](<../../.gitbook/assets/image (187).png>)

9 ) Add 1 field to the right of the "Time" column, enter formula: `=concatenate(text(B2,"mm/dd/yyyy")&" "&text(C2,"hh:mm:ss"))`Use the "Fill Down" function or drag the field to populate the rest of the records. Copy and Paste records As Value. Delete the "Date+28 days" and "Time" columns.

![](<../../.gitbook/assets/image (196).png>)

{% hint style="info" %}
Look for shifts that are overnight shifts, see example below. These must be manually updated. Find and Replace is the best tool to use.
{% endhint %}

![](<../../.gitbook/assets/image (197).png>)

10 ) Delete the old "Assignment Date Time" cell records and Title the new column "Assignment Date Time". Deleted "Modified By", "Modified Date", "Shift Label".&#x20;



11 ) Fill in "Created Date", copy same date for all records. Add your email to the "Created By" field. Then Save and Close .csv

12 ) Import the CSV for a week into the Assignments object by clicking on Import in the Assignments object Records view.&#x20;

![](<../../.gitbook/assets/image (183).png>)

10 ) Click Upload CSV and navigate to the CSV you modified earlier.

![](<../../.gitbook/assets/image (190).png>)

11 ) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](<../../.gitbook/assets/image (184).png>)

12 ) Do you want to update existing assignments records with this import? Choose - No, you want to each row as a new record

![](<../../.gitbook/assets/image (193).png>)

13 ) Confirm the field mapping of the columns.&#x20;

![](<../../.gitbook/assets/image (186).png>)

14 ) Exclude all calculated fields - text formulas, equations and conditional fields.&#x20;

Here is a list of the fields that will need to be matched -&#x20;

1. Assignment Date and Time
2. Team Number
3. Assignment Type
4. Shift
5. Vision Zero Location - Vision Zero Location \<Display Name
6. Assignment Number
7. Description
8. No of Officers Required

15 ) Go down to "**Created By**" and choose "**Email**"

![](<../../.gitbook/assets/image (188).png>)

19 ) Click **Next**. The records will be imported into the object.&#x20;

![](<../../.gitbook/assets/image (180).png>)

22 ) Confirm the records have been imported by checking Assignment IDs and the Calendar.&#x20;

## Check - QAQC

These fields need to be populated for the next steps in the process to work. In Knack Builder, check to make sure non of these fields are blank.

1. Assignment Date and Time
2. Shift&#x20;
3. Team Number&#x20;
4. Location
5. APD Sector&#x20;
6. Number of Officers
7. Assignment Number

