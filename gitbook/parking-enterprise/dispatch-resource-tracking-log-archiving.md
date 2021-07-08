# Dispatch Resource Tracking Log Archiving

## Background

The Parking Enforcement Officers have a tracking log that is tied to their Resource Tracking page. Each officer's actions have an audit log tied. After a month has passed the systems automated task runs and marks the record "Status" as "Marked for Deletion". 

There a number of parking enforcement officers and their audit logs can generate a lot of records quickly, the supervisors said that keeping the tracking logs for a month is sufficient. We hid the logs that are not in an "Active" status. 

Dispatch Resource Tracking logs can be deleted under these conditions: 

* The records "Status" is "**Marked for Deletion**" 
* The log record is more than **one months old**

### **Delete Tracking log from Parking Enterprise Portal**

1. Log into Parking Enterprise Portal  application
2. Navigate to `dispatch_resource_tracking_log` object
3. As a validation check, we first filter the object to see how many records will be deleted. Use the object filters to select records that meet the following criteria:
   1. `Status` is Marked for Deletion
   2. `CREATED_DATE` is before `<one months ago>`  _\(ex. if Today's date is 7/8/21, enter 6/8/21\)_
4. After applying the filters, verify that the results appear as expected, and _note how many records will be deleted_.
5. Now it's time to batch delete the tracking log records. From the `dispatch_resource_tracking_log` records view in the builder, click on the **Delete** drop-down, and choose **Batch Delete**
6. Apply the same filters as defined in step 3, and click **Next**. On the next screen you will be prompted to confirm the delete. Verify that the \# of records to be deleted matches the results from step 4.
7. Click **Delete Records** to confirm your delete.
8. Lastly, update the [DTS Change Log](http://atd.knack.com/dts#change-log/) and note how many records were deleted.

### Document GitHub Issue

We have a template to use in the atd-data-tech repo

Use the `<current month>` to name the issue, for example January 2020 for the November 1st 2019 date referenced below.

![](../.gitbook/assets/image%20%28177%29.png)



\*\*\*\*





