---
description: Camera management
---

# Cameras

For VIP visits, we are asked to disable the CCTV stills feed on specified dates and times. This process has two steps - one to disable image publishing from all cameras before the VIP visit, and then to turn on image publishing from all cameras \(with some exceptions\) after the VIP visit.

### **1. Disable cameras.**

* In Knack, open Data Tracker and then the cameras object.
* Click on Records.
* Export the records out as a CSV to maintain a record of which specific cameras were turned off at that point in time.
* Open CSV and cross check with Knack object to ensure entries match up. 
* Yes on `DISABLE_IMAGE_PUBLISH` means the camera is turned off
* Click on `Update`,  click `Next`, without filtering for records, and get to the `Update Camera Records`page. 
* Set `DISABLE_IMAGE_PUBLISH` to `Yes` by clicking on `Check this Box to Disable Image Publication to Public Sites`. 
* Set `MODIFIED_BY` to your name.
* Set `MODIFIED_DATE` to Current Date and Time \(default\). 
* Click `Next`
* Click `Update Records`. The update will take a couple of minutes.
* Open [Data Publication Log](https://data.mobility.austin.gov/publisher/) and search for `cameras_socrata` to look for the last time the script ran. The script runs every hour. Set a reminder to check if the script runs successfully the next time.
* Check on the `kits_cctv_push` script. The script runs every hour. Set a reminder to check if the script runs successfully the next time.
* If the script runs successfully, open [Data and Performance Hub](https://data.mobility.austin.gov/device-status/) and check on the cameras, by looking at the time stamp on the image.

### **2. Enable Cameras**

* In Knack, open Data Tracker and then the cameras object.
* Click on `Records`.
* Navigate to the `DISABLE_IMAGE_PUBLISH field`. The default is set to `No`. Selecting `Yes` means the camera image publication process is disabled.
* Click on `Update` and then `Next`.
* Under Update cameras records ,
* Set the field `DISABLE_IMAGE_PUBLISH` to \(unchecked\) Check This Box to Disable Image Publication to Public Sites
* Set the field `MODIFIED_BY` to your name
* Set the field `MODIFIED_DATE` to current time
* Finish the process. 
* Open the CSV created earlier, take the list that are exceptions - Disable Image Publish is Yes and then paste the list in Excel. 
* If the list comes in as a row, convert the text to columns and then paste special - transpose the data to rows. Insert a row at the top, put in a header - camera\_id
* Save as a CSV.
* Go back to the cameras object in Data Tracker. Click on `Import`, `Upload CSV`, select the `CSV`.  For ‘Does the CSV have a row at the top with a name for each column? Let the default be `Yes, the headers are on row 1`
* For Select a field to match records, select `CAMERA_ID`.  Continue through the process, under Advanced Options, for Field Defaults, select `DISABLE_IMAGE_PUBLISH` and set the default for those records to `Yes`. 
* Click on `Submit` Import. 
* Check a few of the records from the list to ensure the process has succeeded.

### 3. Confirmation

* Go to [Data Publication Log](https://data.mobility.austin.gov/publisher/). Search for cameras\_socrata, check when that script ran and if it was a success. Then search for kits\_cctv\_push, check when that script last ran and the status. 
* Go to the [Data and Performance Hub](https://data.mobility.austin.gov/device-status/), and check on the cameras, by looking at the time stamp on the image.

