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

You will need access to the Reports section in the VZA application and will need an account  set up to access reports in Brazos. Brazos is administered by the Austin Police Department. 

## Process 

### Preparatory Steps

These steps can be carried out either on a PC or in a web browser.

1. Open Vision Zero Datasets on One Drive. You will need to be given permission to access this location on One Drive.

![](https://lh5.googleusercontent.com/AXTVNP2g8H7H4wLMkXiAuCpZ4I7PeWKp3cLI0i6hEcahJ4lk5U77Fv7WDknqg1wfaRZuuHEi843NVCKSvVEow2rC3fkCfA4ItzihbcOIo-giaGLav2KS9sz0j9K2ZvtNS5nfdEBu)



2. Add a suffix to Citation Audit by STEP, Marched\_Assignments\_Citations\_Warnings, notes, vzaofficerassignments to denote the datasets are from previous weeks and can be archived.

![](https://lh6.googleusercontent.com/sl_Uzd9SLazpAEjxoFsRWZ1MUt3gYQalPWWmmf5wbuZvy_3JRuE3rY1oeZ_xVSNZV20mgjNoKHiZ4pGD_swnYopaRPqSVcAwt_sDXDXWJvvXUccE-pnC2iUn7tKE8oRPA-Sahcbw)

3. Archive these datasets - Your One Drive - Vision Zero Datasets - Archive.

![](https://lh4.googleusercontent.com/WD85CjVcPk-L0EBexp61vOdE8MNRNifKS8Kn-EX-OORRj_q_pNQODhb5ENLpbO3QgWCDUrT_RqiUgh89sAaYEF_GlQUq97maxOzCKbxTiZQx1mhsul6xoRpNQ4nKzbnffAuJJEmM)

### Access reports in Brazos

1. Open Brazos and navigate to reports.
2. Open the Audit by STEP report



![](https://lh3.googleusercontent.com/po-wwqhhCa41dFpL00OUlG0jc8TL4D1nMhYu71X5WNlyIg5IuSt9Ns1eEtvDpW0OsiqSTAtcE8Zp6bWv5ZVoH2BQO7noBp50X_kY-f1jwI64q7NbcXY64Jltf7cRXitT-y-vW7q-)

3. This will open a screen that looks like the screenshot below. It might take some time.

![](https://lh3.googleusercontent.com/i_CdBDn5tlFHH0zeeLAPTAjk3raoDMtR9gdYUnDlxqCGW-KGo_Rp125l8DKyepoHQFdV4HUF0KD7g-InIeFSvd2Hbe9igNyP6TAXWZtwXNaZzT1n0-YeTh71dp-bO3BceZbB4xzB)



4. Put in your date range, select All for STEP, and select all for Officers.

5. Click Finish.

6. Once the report loads, click on the icon in the top right corner. Select View in Excel options - View in CSV format.

![](https://lh6.googleusercontent.com/y-YcK8Y2nYlFU7JVm0GXlQ7_HXURwFZVIV05nZofRMXGfZaMykGtED_Rc7IzEPkBgHRqqK3cpXSWoHuGQywAlURdyA2BgPnvbsK3bfvOkBCOrVnQoQsEKO0KfHU3bJUAbUZaRO3k)

7. This table will be downloaded as Citation Audit by STEP, open it in Excel and save it as a CSV. Copy the CSV to `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Reports\Match_Assigments_Citations\Citation Audit by Step`and `OneDrive - City of Austin\Vision Zero Datasets`

### Access Vision Zero officer assignments

1. Open [https://atd.knack.com/vza\#api-views-private/](https://atd.knack.com/vza#api-views-private/)
2. Filter the Officer Assignments table for all assignments that an officer signed up for after January 19, 2021. 

![](../.gitbook/assets/image%20%2831%29.png)

3. Export this table as a CSV. It will download as vzaofficerassignments.csv

4. Move this csv to `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_VZA_Vision_Zero_in_Action\Vision_Zero_in_Action\Reports\Match_Assigments_Citations\VZA Officer Assignments`

### Access Notes

1. Open [https://atd.knack.com/vza\#api-views-private/](https://atd.knack.com/vza#api-views-private/)
2. Filter the Time Logs - Notes table to show all notes after January 19, 2021.

![](../.gitbook/assets/image%20%2832%29.png)

3. Export this table out as a CSV. The table will be downloaded as notes.csv

4. Move this CSV to `OneDrive - City of Austin\Vision Zero Datasets` \(You will need to be granted permission to access this location.



