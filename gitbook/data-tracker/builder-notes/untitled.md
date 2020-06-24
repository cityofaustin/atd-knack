# Editing Signals Work Order \| NEW FORMS

## Background

Previously signal form was split into 2 parts.

Part 1: [https://atd.knack.com/7-feb-2019--test-atd-data-tracker\#work-orders/new-work-order-step-1/](https://atd.knack.com/7-feb-2019--test-atd-data-tracker#work-orders/new-work-order-step-1/) Part 2: There was a pass through table to edit the work order

###  Spring 2019

Configured TEST environment `https://atd.knack.com/7-feb-2019--test-atd-data-tracker#home/` Updated `New Form` for mobile signal work orders for dev team

###  August 2019

Configuring PROD environment `https://atd.knack.com/amd#home/` Add new button for "new work order" Hidden until roll out to technicians Dev team will test in PROD environment Schedule roll out with technicians

##  New Work Order Form - Layout

2 columns

| 1st column | 2nd column |
| :--- | :--- |
|  `ASSET TYPE` - Asset Type |  `signal` - Signal |
|  `WORK TYPE` - Work Type |  `camera` - Camera |
|  `SELF ASSIGNED` - Assign to Self |  `flasher` - Hazard Flasher |
|  `TECHNICIAN LEAD` - Lead Technician |  `school zone` - School Zone |
|  `TECHNICIAN SUPPORT` - Support Techncian\(s\) |  `sensor` - Sensor |
|  `TECH ON SITE` - Already On-Site |  `dms` - DMS |
|  `JOB DESCRIPTION` - Problem Details |  `WORK TYPE TROUBLE CALL` - Problem Reported |
| _\(Note to DTS staff: When Work Type is "Scheduled Work", rename label to "Work Description". Hide Work Type\)_ |  |
| . |  `WORK TYPE SCHEDULE WORK` - Scheduled Work |
| . |  `WORK TYPE OTHER` - Other Work Description |
| . | _Note to DTS staff: Shows up when "Trouble Call" is selected_ |
| . |  `WORK REQUESTED BY` - Reported By |
| . |  `tmc_issue` \(connection\) - CSR \# |
| . |  `SCHEDULE IMMEDIATELY` - Schedule Immediately |
| . |  `WORK SCHEDULED DATE` - Work Schedule Date |
| . |  `task_orders` \(connection\) - Task Order\(s\) |

###  

## FORM RULES

####  Submit Rules

Redirect to existing page - `My Work Orders`

###  DISPLAY RULES

| IF | THEN |
| :--- | :--- |
| 1.`ASSET TYPE` is - Signal | Show/Hide - signal |
| 2.`ASSET TYPE` is - Camera | Show/Hide - camera |
| 3.`ASSET TYPE` is - School Beacon | Show/Hide - school\_zone |
| 4.`ASSET TYPE` is - Digital Messaging Sign \(DMS\) | Show/Hide - dms |
| 5.`ASSET TYPE` is - Sensor | Show/Hide - sensor |
| 6.`ASSET TYPE` is - Hazard Flasher | Show/Hide - flasher |
| 7.`WORK TYPE` is - Trouble Call | Show/Hide - WORK TYPE TROUBLE CALL |
| 8.`WORK TYPE` is - Scheduled Work | Show/Hide - WORK TYPE SCHEDULED WORK |
| 9.`WORK_TYPE_TROUBLE_CALL` is - Other | Show/Hide WORK TYPE OTHER |
| 10.`SCHEDULE IMMEDIATELY` is - Yes | Hide- WORK SCHEDULE DATE |
| 11.`SCHEDULE IMMEDIATELY` is - No | Show - WORK SCHEDULE DATE |
| . | Hide - TECH ON SITE |
| 12.`WORK TYPE` is - Scheduled Work | Rename Label - `JOB DESCRIPTION` - WORK DESCRIPTION |
| 13.`SELF-ASSIGNED` is - No | Show/Hide - TECHNICIAN SUPPORT |

###  RECORD RULES

| Action | When | Values |
| :--- | :--- | :--- |
| 1.Update this record |  `ASSET TYPE` is - Signal |  `ATD LOCATION ID` - connected value - _signals&gt;ATD\_LOCATION\_ID_ |
| 2.Update this record |  `ASSET TYPE` is - Camera |  `ATD LOCATION ID` - connected value - _cameras&gt;ATD\_LOCATION\_ID_ |
| 3.Update this record |  `ASSET TYPE` is - Digital Messaging Sign \(DMS\) |  `ATD LOCATION ID` - connected value - _dms&gt;ATD\_LOCATION\_ID_ |
| 4.Update this record |  `ASSET TYPE` is - Sensor |  `ATD LOCATION ID` - connected value - _travel\_sensors&gt;ATD\_LOCATION\_ID_ |
| 5.Update this record |  `ASSET TYPE` is - School Beacon |  `ATD LOCATION ID` - connected value - _school\_beacon\_zone&gt;ATD\_LOCATION\_ID_ |
| 6.Update this record |  |  `CREATED BY` - logged in, `CREATED DATE`- current date, `MODIFIED BY`-logged in, `MODIFIED DATE`- current date |
| 7.Update this record |  `SELF ASSIGNED` is - Yes |  `TECHNICIAN LEAD`- logged in account |
| 8.Update this record |  `TECHNICIAN LEAD` is - not blank |  `WORK ORDER STATUS`- Assigned |
| 9.Update this record |  `TECH ON SITE` is - Yes |  `WORK ORDER STATUS`- In Progress |
| 10.Insert a connected record - _a `new work order signal time log` connected to this record \(`work order signal time log`&gt;ATD\_LOCATION\_ID_ |  `TECH ON SITE` is - Yes |  `WORKSITE ARRIVE`- current date, `TECHNICIAN` - form value - `TECHNICIAN LEAD` |
| 11.Update this record |  `SCHEDULE IMMEDIATELY` is - Yes |  `WORK SCHEDULE DATE` - current date |

