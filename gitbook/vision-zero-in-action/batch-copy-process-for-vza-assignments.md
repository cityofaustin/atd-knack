---
description: >-
  The document will guide you through the process to batch copy Vision Zero
  assignments.
---

# Batch Copy Process for VZA Assignments

\
Purpose&#x20;
-------------

To copy a batch of assignments to eliminate form entry.

## Process

1\) Open the **Assignments** object in Records View

![](<../../.gitbook/assets/image (185).png>)

2\) Exports all records as CSV to create a backup.

![](<../../.gitbook/assets/image (181).png>)

3\) Filter assignments for the previous 8 or 12 weeks (Monday to Monday) using the <mark style="color:blue;">Assignment Date Time</mark> field.

Ex. <mark style="color:blue;">Assignment Date Time</mark> is after 01/02/2022 **04:00** and <mark style="color:blue;">Assignment Date Time</mark> is before 02/28/2022 **04:01** (we do Monday at 4am since there is an overnight shift that often runs until this time)

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

4\) Export records to CSV

5\) Open CSV in Excel and save on the Network Drive as Assignments\_Export\_Date

`G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Schedules\Assignments`

6\) Save As Assignments\_Import\_Date

7\) Autofit spreadsheet so you can see all columns. Insert a column left of `Assignment Date Time` column (you will do this for all column inserts), enter formula: `=left(C2,10)`this will capture the date from the original field. Fill Down the column.&#x20;

![](<../../.gitbook/assets/image (189).png>)

8\) Insert another column to the left, column C, and enter formula: `=B2+56` this will create a new date for 56 days later for 8 weeks of assignments or `=B2+84` for 12 weeks. Format as Short Date. Fill Down the column.

![](<../.gitbook/assets/image (8) (1).png>)

9a) Insert another column to the left, column D, and enter formula: `=LEFT(RIGHT(E2,14),9)` this will capture the start time. Fill Down the column. For assignments that extend overnight, we will update this formula to `=LEFT(RIGHT(E2,25),9)` for those specific records and manually update the cell reference. Ignore the inconsistent formula error. You may copy one entered cell for all the other overnight records.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

9b) Insert another column to the left, column E, and enter formula: `=RIGHT(F2,5)` this will capture the end time. Fill Down the column.

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

10a) Insert another column, column F, and enter formula: `=CONCATENATE(TEXT(C2,"mm/dd/yy")&" "&TEXT(D2,"hh:mm")&TEXT(E2,"hh:mm"))`. Fill Down the column. This combines our new date with the start & end times. For assignments that extend overnight, we will update this formula to `=CONCATENATE(TEXT(C13,"mm/dd/yy")&" "&TEXT(D13,"hh:mm")&TEXT(C13,"mm/dd/yy")&" "&TEXT(E13,"hh:mm"))` for those specific records and manually update the cell reference. Ignore the inconsistent formula error. You may copy one entered cell for all the other overnight records.

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

10b) To complete the overnight shifts, we will need to update the second date by one day for these records. Copy column F, and Paste as Values. Now we can manually update the end dates for each record.

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>



11\) Remove the old <mark style="color:blue;">Assignment Date Time</mark> column header and title the new column <mark style="color:blue;">Assignment Date Time</mark>.

![](<../.gitbook/assets/image (7) (1) (1).png>)

12\) Update the <mark style="color:blue;">Created Date</mark> & <mark style="color:blue;">Created By</mark> for the first row. <mark style="color:blue;">Created By</mark> should be your email. Delete the <mark style="color:blue;">Modified Date</mark> & <mark style="color:blue;">Modified By</mark> columns. Fill down both columns.

13\) Save and Import the CSV  into the Assignments object by clicking on Import in the Assignments object Records view.&#x20;

![](<../../.gitbook/assets/image (183).png>)

14\) Import the modified CSV import file.

![](<../../.gitbook/assets/image (190).png>)

15\) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](<../../.gitbook/assets/image (184).png>)

16\) Do you want to update existing assignments records with this import? Choose - No, you want to insert each row as a new record

![](<../../.gitbook/assets/image (193).png>)

17\) Confirm the field mapping of the columns.&#x20;

![](<../../.gitbook/assets/image (186).png>)

18\)  Make sure all listed columns are mapping correctly:

1. Assignment Date and Time
2. Team Number
3. Assignment Type
4. Shift
5. Vision Zero Location - Vision Zero Location > set as Display Name
6. Assignment Number
7. Description
8. No of Officers Required
9. Created Date
10. Created By > set as Email

![](<../../.gitbook/assets/image (188).png>)

20\) Click **Next** and **Start Import**. The records will be imported into the object.&#x20;

![](<../../.gitbook/assets/image (180).png>)

21\) Confirm the records have been imported and data populated by checking Assignment IDs and the Calendar.&#x20;

