---
description: How to manage performance measures
---

# Performance Measures

[http://transportation.austintexas.io/data-tracker/\#home/performance-measures/](http://transportation.austintexas.io/data-tracker/#home/performance-measures/)

### Object Tables defined

Performance measures are tracked in these objects:

* `performance_measures`

Contains core information about the performance measure, such as the ID, name, and division.

* `performance_measures_fiscal`

Contains information about the performance measure for the given fiscal year. This is the object that needs to be updated on an annual basis, and it contains formulas that roll up the **monthly/quarterly/fiscal** reporting. Performance measures reporting frequency \(monthly/quarterly/annually\) can change from year to year, so that information is also captured here. Relationship: Many performance\_measures\_fiscal relate to one performance\_measure.

* `performance_measures_monthly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_quarterly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_annually`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

### Annual Updates

The `performance_measures_fiscal` must be created on an annual basis so that end-users can append monthly/quarterly/annual reports to them. This is accomplished via batch import to Knack.

By following these steps you will export, modify, and re-import the performance measure data to meet the current fiscal year need.

| Activity Code | Frequency | Measure ID | Measure Name | Measure Goal | Measure Division | Fiscal Year | If the measure is new? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|  |  |  |  |  |  |  |  |

1. Ask Finance to send the performance measures for the current fiscal year in the format specified above.
2. Filter out the measures that are new and have been added to the current fiscal year.
3. Add those measures to the `performance_measures` object. You can do this by Adding a Record if there are not too many.
4. Add a column to the spreadsheet sent by Finance. Name this field `Import_ID.`
5. Calculate the entries in the Import ID field by concatenating `Measure ID,"$,Fiscal Year`
6. In the Knack builder, filter the `performance_measures_fiscal` object for the most recent available `FISCAL_YEAR` and export as CSV from the Data Tracker.
7. Use Excel \(or similar\) to update the `FISCAL_YEAR` column in every row to the current fiscal year.
8. Some of the columns in the CSV are calculated fields that do not need to be imported. Check the builder for the most current relevant fields, but the minimum fields you should include are `REPORT_STATUS`, `FISCAL_YEAR`, `MEASURE_ID`, `FREQUENCY`, `PROPOSED`, `APPROVED`, and `AMENDED`.
9. There is some amount of change in the FY Performance Measures being tracked. Some measures get removed from a Fiscal Year, others get added. Ask contacts in Finance to provide an up-to-date dataset.
10. Your spreadsheet is ready for import. Return to the Knack builder and import your spreadsheet into the `performance_measures_fiscal` object. 
11. MAKE SURE YOU MAP fields properly! Most importantly, the `MEASURE_ID` field must map to the `MEASURE_ID` on the related `performance_measures` object.
12. Finally, you must update the view which displays performance measures to the end-user. Currently this is located at `https://builder.knack.com/atd/amd#pages/scene_565/views/view_1735`. From the builder, navigate to the page views and modify the table filter to the current fiscal year. This ensures that end-users will only see/modify current fiscal year measures.

You're done!

