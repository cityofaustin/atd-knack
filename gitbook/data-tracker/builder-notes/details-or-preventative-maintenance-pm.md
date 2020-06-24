# DETAILS \| Preventative Maintenance \(PM\)

##  Asset Management

1.  _Home&gt;Signals&gt;Signal Details&gt;_ \(Under `Preventative Maintenance` table\)

> form embedded:

*  `Completed Date` Date selector
*  `Completed By` choice list
*  `Submit` button

##  Current Process

The signal technicians use the Fulcrum application on their tablets to perform the Preventative Maintenance checks. Fulcrum gets updated, we used to have an integration from Fulcrum to Knack, but we turned it off since duplicates kept being created. The technicians update the Preventative Maintenance table record on a Signals Details page.

##  Automated Processes explained

When a new PM record is created by a technician in the Data Tracker, it updates the `modified date` and the `PM year` of the signal. When the `signals_agol` script runs, it updates the `PM YEAR` from the . When the script runs, it pushes the updated signal data to in ArcGIS Online \(AGOL\).

