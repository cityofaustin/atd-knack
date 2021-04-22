---
description: >-
  This document will guide you through the steps of updating reports on officer
  assignments from the Vision Zero in Action (VZA) application and
  citations/warning from Brazos.
---

# Update reports in Power BI

## Purpose

To update reports in Power BI related to VZA assignments and citations/warnings recorded in Brazos by officers to support invoicing and data analysis.

## Permissions 

You will need access to the [Reports](https://atd.knack.com/vza#api-views-private/?view_539_page=1) section in the VZA application and will need an account  set up to access [reports in Brazos](https://my.brazostech.com/PublicSafety/Reports.aspx). Brazos is administered by the Austin Police Department. 

## Timeline

Right now, the process is run manually each week. The need to do this process depends on officers having signed up for assignments in the previous weeks. If no officers signed up for assignments in the prior week, there is no need to update the reports. 

Another factor related to time to bear in mind is that officers don't always sync their devices at the cadence required for weekly updates to the reports. Sometimes the officers might have issued citations and warning during an assignment, but those do not get recorded in Brazos till they sync their device. So reports need to be renewed completely instead of adding snapshots over time.

## Process to update reports in Power BI

### Preparatory Steps

These steps can be carried out either on a PC or in a web browser.

1. Open Vision Zero Datasets on One Drive. You will need to be given permission to access this location on One Drive.
2. Add a suffix to Citation Audit by STEP, Marched\_Assignments\_Citations\_Warnings, notes, vzaofficerassignments to denote the datasets are from previous weeks and can be archived.

![](https://lh6.googleusercontent.com/sl_Uzd9SLazpAEjxoFsRWZ1MUt3gYQalPWWmmf5wbuZvy_3JRuE3rY1oeZ_xVSNZV20mgjNoKHiZ4pGD_swnYopaRPqSVcAwt_sDXDXWJvvXUccE-pnC2iUn7tKE8oRPA-Sahcbw)

3. Archive these datasets - Your One Drive - Vision Zero Datasets - Archive.

![](https://lh4.googleusercontent.com/WD85CjVcPk-L0EBexp61vOdE8MNRNifKS8Kn-EX-OORRj_q_pNQODhb5ENLpbO3QgWCDUrT_RqiUgh89sAaYEF_GlQUq97maxOzCKbxTiZQx1mhsul6xoRpNQ4nKzbnffAuJJEmM)

### Access reports in Brazos

1. Open [Brazos](https://my.brazostech.com/Home/brazospg/36/ctl/Login/Default.aspx) and navigate to reports.
2. Open the Audit by STEP report



![](https://lh3.googleusercontent.com/po-wwqhhCa41dFpL00OUlG0jc8TL4D1nMhYu71X5WNlyIg5IuSt9Ns1eEtvDpW0OsiqSTAtcE8Zp6bWv5ZVoH2BQO7noBp50X_kY-f1jwI64q7NbcXY64Jltf7cRXitT-y-vW7q-)

3. This will open a screen that looks like the screenshot below. It might take some time.

![](https://lh3.googleusercontent.com/i_CdBDn5tlFHH0zeeLAPTAjk3raoDMtR9gdYUnDlxqCGW-KGo_Rp125l8DKyepoHQFdV4HUF0KD7g-InIeFSvd2Hbe9igNyP6TAXWZtwXNaZzT1n0-YeTh71dp-bO3BceZbB4xzB)



4. Put in your date range, select All for STEP, and select all for Officers.

5. Click Finish.

6. Once the report loads, click on the icon in the top right corner. Select View in Excel options - View in CSV format.

![](https://lh6.googleusercontent.com/y-YcK8Y2nYlFU7JVm0GXlQ7_HXURwFZVIV05nZofRMXGfZaMykGtED_Rc7IzEPkBgHRqqK3cpXSWoHuGQywAlURdyA2BgPnvbsK3bfvOkBCOrVnQoQsEKO0KfHU3bJUAbUZaRO3k)

7. This table will be downloaded as Citation Audit by STEP, open it in Excel and save it as a CSV. Copy the CSV to the Vision Zero Datasets folder in One Drive.

### Access Vision Zero officer assignments

1. Open [https://atd.knack.com/vza\#api-views-private/](https://atd.knack.com/vza#api-views-private/)
2. Filter the Officer Assignments table for all assignments after January 19, 2021. 

![](../.gitbook/assets/image%20%28107%29.png)

3. Export this table as a CSV. It will download as vzaofficerassignments.csv

4. Move this csv to the Vision Zero Datasets folder in One Drive.

### Access Notes

1. Open [https://atd.knack.com/vza\#api-views-private/](https://atd.knack.com/vza#api-views-private/)
2. Filter the Time Logs - Notes table to show all notes after January 19, 2021.

3. Export this table out as a CSV. The table will be downloaded as notes.csv

4. Move this CSV to `OneDrive - City of Austin\Vision Zero Datasets` \(You will need to be granted permission to access this location.

### Join VZA assignments and Brazos citations/warnings

To update the Power BI report, click on Refresh in the top ribbon of the Power BI report in Power BI Desktop.



## Process to create reports in Power BI

The process needed to get to this point is documented below in case any changes need to be made in the future. 

### For VZA Assignments 1

This datasource is used to connect to the citations/warning dataset from Brazos. The process needed to create a common key to connect to the citations/ warnings is documented below. 

1. Connect to the vzaofficerassignments csv in the Vision Zero folder in One Drive.
2. Extract the length of the Officer Assignments Date Time field.
3. Depending on if the assignment starts and ends on the same day, or over two days, the length of the string in that field will be 25 or 36 characters. \(mm:dd:yyyy hh:mm:ss to hh:mm:ss or mm:dd:yyyy hh:mm:ss to mm:dd:yyyy hh:mm:ss\). We will use this field to create a conditional column later in this process. 
4. Extract the text before the first space delimiter from the Officer Assignments Date Time field. Rename this field to Assignment Start Date 1
5. Extract the text between the first space and second space delimiter from the Start of the input in the Officer Assignments Date Time field. Rename this field to Assignment Start Time 1.
6. Extract the text before the first space delimiter from the end of the input in the Officer Assignments Date Time field. Rename this field to Assignment End Time.
7. Extract the text after the ‘to’ delimiter. Rename this column Assignment End Date and Time 1.
8. Create a custom column by concatenating Assignment Start Date and Assignment End Time to create Assignment End Date and Time 1.
9. Create a conditional column Assignment End Date and Time with the condition if Length is 25, then point to Assignment End Date and Time 1, if not then point to Assignment End Date and Time 2.
10. Create a custom column with Assignment Start Date 1 and Assignment Start Time 1. Rename it to Assignment Start Date and Time. 
11. Convert the Assignment Start Date and Time, and Assignment End Date and Time to Date and Time format. 
12. Create a custom field Assignment Duration 1 to calculate the hours in each assignment by subtracting Assignment Start Date and Time 1 from Assignment End Date and Time. 
13. Convert this field to Hours format.
14. Create a custom field call Create List with this formula = List.DateTimes\(\[Assignment Start Date and Time\],\[Hours\],\#duration\(0,1,0,0\)\)
15. Explode the list by expanding to new rows.
16. Copy the Create List field using the Duplicate Column function.
17. Convert the field to a Date and Time field. While holding the field selected, click on Date in the model ribbon, select Date Only. Rename this field Assignment Date.Convert to a Text field. 
18. Copy the Create List field again using the Duplicate Column function. 
19. Convert the field to a Date and Time field. While holding the field selected, click on Time in the model ribbon and select Time Only. Rename this field Top of the Start Hour. Convert to a text field. 
20. Create a Custom Column by concatenating Badge Number Assignment Date and Top of the Start Hour. Rename this field Assignment Join ID. 
21. Run remove duplicates on the Assignment Join ID field.

### **For Citation Audit by Step**

1. Connect to the Citations Audit by STEP csv in One Drive. 
2. Change the field type for Unique ID to Text. 
3. Duplicate the Time field to create Time-Copy.
4. Rename the Date field to Citation Date.
5. Rename the Time field to Citation Time.
6. Select the Time-Copy field and then navigate to Transform - Hour - Start of the Hour.
7. Rename this field Top of the Start Hour.
8. Duplicate the field Top of the Start Hour and convert it to a text field.
9. Create a custom column with this formula - \[Officer Badge No\]&" "&\[\#"Date - Copy"\]&" "&\[\#"Top of the Start Hour - Copy"\].
10. Rename the field Assignment Join ID.

### Create the relationship between the two datasets

1. Close and Apply in Power Query Editor to apply and save the queries and data transformations. 
2. Click on Modeling and then select Manage Relationships.
3. Set a relationship between VZA Assignments 1 and Citation Audit by Step using the Assignment Join ID fields and set the cardinality as One to Many \(one VZA Assignment record to many Citation Audit by STEP records\).







