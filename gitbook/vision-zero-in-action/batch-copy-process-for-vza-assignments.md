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

1\) Open the Assignments object in Records View

![](<../../.gitbook/assets/image (185).png>)

2\) Exports all records as CSV to create a backup.

![](<../../.gitbook/assets/image (181).png>)

3\) Filter assignments for the previous 8 weeks (Monday to Sunday) using the <mark style="color:blue;">Assignment Date Time</mark> field.

Ex. <mark style="color:blue;">Assignment Date Time</mark> is after 01/02/2022 23:59 and <mark style="color:blue;">Assignment Date Time</mark> is before 02/28/2022 00:00

![](<../.gitbook/assets/image (5).png>)

4\) Export records to CSV

5\) Open CSV in Excel and save on the Network Drive as Assignments\_Export\_Date

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Schedules\Assignments`

6\) Save As Assignments\_Import\_Date

7\) Autofit spreadsheet so you can see all columns. Insert a column left of `Assignment Date Time` column, enter formula: `=left(C2,10)`this will capture the date from the original field. Fill Down the column.&#x20;

![](<../../.gitbook/assets/image (189).png>)

8\) Insert another column, enter formula: `=B2+56` this will create a new date for 56 days later (8 weeks). Format as Short Date. Fill Down the column.

![](<../.gitbook/assets/image (8).png>)

9\) Insert another column, enter formula: `=RIGHT(E2,14)` this will capture the time. Fill Down the column.

![](<../../.gitbook/assets/image (187).png>)

10\) Insert another column, enter formula: `=concatenate(text(C2,"mm/dd/yyyy")&" "&text(D2,"hh:mm:ss"))`Fill Down the column.

![](<../../.gitbook/assets/image (196).png>)

Find all overnight shifts that span two days. Simply copy and paste the <mark style="color:blue;">Assignment Date Time</mark> field into column E and adjust the dates to match the sequencing.

![](<../.gitbook/assets/image (3).png>)

11\) Remove the old <mark style="color:blue;">Assignment Date Time</mark> column header and title the new column <mark style="color:blue;">Assignment Date Time</mark>.

![](<../.gitbook/assets/image (7).png>)

12\) Update and Fill the <mark style="color:blue;">Created Date</mark> & <mark style="color:blue;">Created By</mark>. <mark style="color:blue;">Created By</mark> should be your email.

13\) Save and Import the CSV  into the Assignments object by clicking on Import in the Assignments object Records view.&#x20;

![](<../../.gitbook/assets/image (183).png>)

14\) Click Upload CSV and navigate to the CSV you modified earlier.

![](<../../.gitbook/assets/image (190).png>)

15\) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](<../../.gitbook/assets/image (184).png>)

16\) Do you want to update existing assignments records with this import? Choose - No, you want to each row as a new record

![](<../../.gitbook/assets/image (193).png>)

17\) Confirm the field mapping of the columns.&#x20;

![](<../../.gitbook/assets/image (186).png>)

18\) Exclude all calculated fields - text formulas, equations and conditional fields.&#x20;

Here is a list of the fields that will need to be matched -&#x20;

1. Assignment Date and Time
2. Team Number
3. Assignment Type
4. Shift
5. Vision Zero Location - Vision Zero Location \<Display Name
6. Assignment Number
7. Description
8. No of Officers Required

19\) Go down to "**Created By**" and choose "**Email**"

![](<../../.gitbook/assets/image (188).png>)

20\) Click **Next**. The records will be imported into the object.&#x20;

![](<../../.gitbook/assets/image (180).png>)

21\) Confirm the records have been imported by checking Assignment IDs and the Calendar.&#x20;

## Check - QAQC

These fields need to be populated for the next steps in the process to work. In Knack Builder, check to make sure non of these fields are blank.

1. Assignment Date and Time
2. Shift&#x20;
3. Team Number&#x20;
4. Location
5. APD Sector&#x20;
6. Number of Officers
7. Assignment Number

