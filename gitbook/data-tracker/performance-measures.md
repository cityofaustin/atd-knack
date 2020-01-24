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

Contains information about the performance measure for the given fiscal year. This is the object that needs to be updated on an annual basis, and it contains formulas that roll up the **monthly/quarterly/fiscal** reporting. Performance measures reporting frequency \(monthly/quarterly/annually\) can change from year to year, so that information is also capture here. Relationship: Many performance\_measures\_fiscal relate to one performance\_measure.

* `performance_measures_monthly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_quarterly`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

* `performance_measures_annually`

User-submitted entries which provide the actual reported values for each performance measure. Many performance\_measures\_monthly relates to one performance\_measures\_fiscal.

### Annual Updates

The `performance_measures_fiscal` must be created on an annual basis so that end-users can append monthly/quarterly/annual reports to them. This is accomplished via batch import to Knack, and can be done for multiple fiscal years at once, with the expectation that some measures will have to be manually added or removed based on department determination.

By following these steps you will export, modify, and re-import the performance measure data to meet the current fiscal year need.

1. In the Knack builder, filter the `performance_measures_fiscal` object for the most recent available `FISCAL_YEAR` and export as CSV from the Data Tracker.
2. Use Excel \(or similar\) to update the `FISCAL_YEAR` column in every row to the current fiscal year.
3. Some of the columns in the CSV are calculated fields that do not need to be imported. Check the builder for the most current relevant fields, but the minimum fields you should include are `REPORT_STATUS`, `FISCAL_YEAR`, `MEASURE_ID`, `FREQUENCY`, `PROPOSED`, `APPROVED`, and `AMENDED`.
4. Optionally repeat these steps to include additional future fiscal years in your spreadsheet. E.g., you can do `FY20`, `21`, and `22` at the same time.
5. Your spreadsheet is ready for import. Return to the Knack builder and import your spreadsheet into the `performance_measures_annually` object. 
6. MAKE SURE YOU MAP fields properly! Most importantly, the `MEASURE_ID` field must map to the `MEASURE_ID` on the related `performance_measures` object.
7. Finally, you must update the view which displays performance measures to the end-user. Currently this is located at `https://builder.knack.com/atd/amd#pages/scene_565/views/view_1735`. From the builder, navigate to the page views and modify the table filter to the current fiscal year. This ensures that end-users will only see/modify current fiscal year measures.

You're done!

