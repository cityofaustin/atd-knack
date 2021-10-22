---
description: Old guide - 12/10/2019, moved over 10/29/2020.
---

# Data Tracker | Annual Signal and PHB Request Ranking

![](<../../../.gitbook/assets/image (18).png>)

## Overview

Every year, AMD ranks [all active ("Under Evaluation") requests for Traffic Signals and Pedestrian Hybrid Beacons](https://data.mobility.austin.gov/data-tracker/#home/signal-requests/?view\_39\_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field\_2022%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%22UNDER%20EVALUATION%22%2C%22field\_name%22%3A%22REQUEST\_STATUS%22%7D%5D%7D\&view\_39\_page=1).

In Data Tracker, requests are stored in the `signal_requests` object and evaluations are in a connected object. Since criteria are different for PHBs and signals, there are stored separately in `signal_requests_phb_evals` and `signal_requests_traffic_eval`.

### Bulk Create the evaluation records

To expedite the process for AMD, we bulk create evaluation records. This can be done using the following steps:

* Export two CSVs of all requests "Under evaluation", one for signals and one for PHBs
* In Excel, delete all columns besides `REQUEST_ID`
* Add two new columns, `RANK_ROUND_MO` and `RANK_ROUND_YEAR`
* Set `RANK_ROUND_MO` values to `DEC` and `RANK_ROUND_YEAR` values to `2019` (current year)

![](<../../../.gitbook/assets/image (19).png>)

Import the CSVs to the `signal_requests_phb_evals` and `signal_requests_traffic_eval` tables. Under _Select a field to match records_ select _Don't match, add all imported records_.

![](<../../../.gitbook/assets/image (15).png>)

&#x20;Map `REQUEST_ID` to `SIGNAL_REQUEST>REQUEST_ID`.

![](<../../../.gitbook/assets/image (17).png>)

Et voilà! Now you have nice evaluation records ready to go. These can be edited using the Edit link on the Details page.&#x20;

![](<../../../.gitbook/assets/image (16).png>)

