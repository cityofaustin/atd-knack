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

7\) Autofit spreadsheet so you can see all columns. Insert a column left of `Assignment Date Time` column (you will do this for all column inserts), enter formula: `=left(C2,10)`this will capture the date from the original field into column B. Fill Down the column.&#x20;

<div align="center">

<img src="../../.gitbook/assets/image (189).png" alt="">

</div>

8\) Insert another column to the left, column C, and enter formula: `=B2+56` this will create a new date for 56 days later for 8 weeks of assignments or `=B2+84` for 12 weeks. Format the column as a Short Date. Fill Down the column.

![](<../.gitbook/assets/image (8) (1).png>)

9\) Insert another column to the left, column D, and enter formula: `=LEFT(RIGHT(E2,25),5)` this will capture the start time. Fill Down the column.

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

10\) Insert another column to the left, column E, and enter formula: `=LEFT(RIGHT(F2,16),10)` this will capture the end date. Fill Down the column.

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

11\) Insert another column to the left, column F, and enter formula: `=E2+84` similar to Step 8. This will add 12 weeks to each date. Format the column as a Short Date and Fill Down the column.

12\) Insert another column to the left, column G, and enter formula: `=RIGHT(H2,5)` similar to step 9 so we can capture the end time. Fill down the column.

13\) Insert another column, column H, and enter formula: `=CONCATENATE(TEXT(C2,"mm/dd/yy")&" "&TEXT(D2,"hh:mm")&" to "&TEXT(F2,"mm/dd/yy")&" "&TEXT(G2,"hh:mm"))`. Fill Down the column. This combines our new dates with the start & end times.

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

14\) Remove the old <mark style="color:blue;">Assignment Date Time</mark> column I header and title the new column H with <mark style="color:blue;">Assignment Date Time</mark>.

![](<../.gitbook/assets/image (7) (1) (1).png>)

15\) Update the <mark style="color:blue;">Created Date</mark> & <mark style="color:blue;">Created By</mark> for the first row. <mark style="color:blue;">Created By</mark> should be your email. Fill down both columns.&#x20;

16\) Save and Import the CSV  into the Assignments object by clicking on Import in the Assignments object Records view.&#x20;

![](<../../.gitbook/assets/image (183).png>)

17\) Import the modified CSV import file.

![](<../../.gitbook/assets/image (190).png>)

18\) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](<../../.gitbook/assets/image (184).png>)

19\) Do you want to update existing assignments records with this import? Choose - No, you want to insert each row as a new record

![](<../../.gitbook/assets/image (193).png>)

20\) Confirm the field mapping of the columns.&#x20;

![](<../../.gitbook/assets/image (186).png>)

20b)  Make sure all listed columns are mapping correctly:

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

21\) Click **Next** and **Start Import**. The records will be imported into the object.&#x20;

![](<../../.gitbook/assets/image (180).png>)

22\) Confirm all the records have been imported and data populated by filtering the Created Date and checking the Assignments Calendar.

