---
description: How to manage performance measures
---

# Performance Measures

[http://transportation.austintexas.io/data-tracker/#home/performance-measures/](http://transportation.austintexas.io/data-tracker/#home/performance-measures/)

### Object Tables defined

Performance measures are tracked in these objects:

* `performance_measures`

Contains core information about the performance measure, such as the ID, name, and division.

* `performance_measures_fiscal`

Contains information about the performance measure for the given fiscal year. This is the object that needs to be updated on an annual basis, and it contains formulas that roll up the **monthly/quarterly/fiscal** reporting. Performance measures reporting frequency (monthly/quarterly/annually) can change from year to year, so that information is also captured here. Relationship: Many performance\_measures\_fiscal relate to one performance\_measure.

* `performance_measures_monthly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_quarterly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_annually`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

### Annual Updates

The `performance_measures_fiscal` must be created on an annual basis so that end-users can append monthly/quarterly/annual reports to them. This is accomplished via batch import to Knack.

By following these steps you will import the performance measure data to meet the current fiscal year needs.

| Activity Code | Frequency | Measure ID | Measure Name                                                                   | Measure Goal | Measure Division                   | Measure Type | If the measure is new? | Fiscal Year |
| ------------- | --------- | ---------- | ------------------------------------------------------------------------------ | ------------ | ---------------------------------- | ------------ | ---------------------- | ----------- |
| 32TP          | Annually  | 9195       | Percent of affordable housing available within 1/2 mile of transit and bicycle | 91           | Transportation Systems Development | Average      | New                    | 2021        |

1.  Ask Finance to send the performance measures for the current fiscal year in the format specified above. Check if these fields are needed -&#x20;

    `REPORT_STATUS`, `PROPOSED`, and `AMENDED`.
2. Also ask Finance if any new division names need to be added, or if current measures have been moved to different divisions.
3. Filter out the measures that are new and have been added to the current fiscal year.
4. Add the new measures to the `performance_measures` object first.&#x20;
   1. You can do this by "Adding a Record" if there are not too many.
5. Add a column to the spreadsheet sent by Finance. Name this field `Import_ID.`
6. Calculate the entries in the Import ID field by concatenating `Measure ID,"$,Fiscal Year`
7. You might also need to update all the entries under Fiscal Year.
8. Open the performance\_measures fiscal object in the Records view.
9. Import the CSV.&#x20;
10. For Select a field to match records - select Import\_ID.
11. Map the following fields. Most importantly, the `MEASURE_ID` field must map to the `MEASURE_ID` on the related `performance_measures` object.
12. Measure ID - Measure ID>Measure ID
13. Frequency - Frequency
14. Measure Name - Measure ID>Measure Name
15. Measure Type - Measure ID>Measure>Measure Type
16. Measure Goal - Approved
17. Fiscal Year - Fiscal Year
18. Click `Next`
19. For default fields, select Created By (your name), Created Date (today's date). (This will help keep track of which records get added).
20. Let the process run.&#x20;
21. Do some QAQC to make sure the right number of records got added, that there are no duplicates.
22. Update the view which displays performance measures to the end-user. Currently this is located at [`https://builder.knack.com/atd/amd/pages/scene_565/views/view_1735/table`](https://builder.knack.com/atd/amd/pages/scene\_565/views/view\_1735/table). From the builder, navigate to the page views and modify the table filter to the current fiscal year. This ensures that end-users will only see/modify current fiscal year measures.
23. Update the Fiscal Year filters for the three eCombs reports. Here is the link to the scene - [`https://builder.knack.com/atd/amd/pages/scene_833`](https://builder.knack.com/atd/amd/pages/scene\_833)``

You're done!
