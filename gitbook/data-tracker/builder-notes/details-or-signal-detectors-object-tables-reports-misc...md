# DETAILS \| Signal Detectors Object Tables, Reports, misc..

## Signal Detection Status - By Signal Intersection

Object table: `signals`

* There are fields that exist on this table `DETECTION_STATUS`, `DETECTION_STATUS_DATE`
* These are to have the individual detector statuses roll up to the parent \(signals\)
* _See automated process below_

## Signal Detector Status - By Individual Detector

Object table: `signals_detectors`

[_Home&gt;Detectors_](https://atd.knack.com/amd#home/detection-reports/?view_1347_filters=%5B%7B%22value%22%3A%22CBD%20%2F%20NO%20DETECTORS%22%2C%22operator%22%3A%22is%20not%22%2C%22field%22%3A%22field_1527%22%7D%2C%7B%22value%22%3A%22%22%2C%22operator%22%3A%22is%20not%20blank%22%2C%22field%22%3A%22field_1579%22%7D%5D)

* this shows the individual detectors at a signal intersection, shows the detector device status for each device
* there is a link to the `Edit Detection` page that is also accessible from the Signal Details page

## Edit Detection page

* This page shows the various detector devices on a particular signal intersection and also has embedded form to add a new detector
* There is an `+ Add Event` link in the `Edit Detection` table
  * Allows user to select a detection action on a particular device
  * will turn the status into `BROKEN` or `OK`

##  Automated Processes explained

There is a script `detection_status_signals.py` that updates the individual detector device's status and rolls it up to th parent \(signal\). So, if any detector devices at a specific signal ID are broken the entire `Detection Status` for that signal is `BROKEN`.

`signals_detectors` table

* ex. 1 of 4 detectors is `BROKEN`

| SIGNAL ID | DEVICE STATUS | DETECTION STATUS |
| :--- | :--- | :--- |
| 10 | BROKEN | BROKEN |
| 10 | OK | BROKEN |
| 10 | OK | BROKEN |
| 10 | OK | BROKEN |

`signals` table

| SIGNAL ID | LOCATION NAME | DETECTION STATUS |
| :--- | :--- | :--- |
| 10 | KOENIG LN/ GUADALUPE ST | BROKEN |

