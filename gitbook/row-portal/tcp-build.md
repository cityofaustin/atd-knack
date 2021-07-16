---
description: Builder Information
---

# TCP \| Traffic Control Plans

This module is currently in the [Data Tracker application](https://data.mobility.austin.gov/data-tracker/#), called `Traffic Control Plans`.

### Basic Structure

* `+ TCP record created (Parent)`- Status reflects what TCP submission status is
  * `TCP submission entry`- Status: `Returned`
  * `TCP submission entry`- Status: `Review In Progress`

On `tcp_tracking_submissions` object table

### Fields:

* `STATUS APPROVED` - w/ conditional rules
  * \(SUBMISSION STATUS is `APPROVED`, custom value = 1; SUBMISSION STATUS is not `APPROVED`, custom value = 0\)
* `STATUS RETURNED`- w/ conditional rules
  * \(SUBMISSION STATUS is `RETURNED`, custom value = 1; 
  * SUBMISSION STATUS is not `RETURNED`, custom value = 0\)
* `STATUS REVIEW IN PROGRESS`- w/ conditional rules 
  * \(SUBMISSION STATUS is `REVIEW IN PROGRESS`, custom value = 1; 
  * SUBMISSION STATUS is not `REVIEW IN PROGRESS`, custom value = 0\)
* `STATUS PENDING`- w/ conditional rules 
  * \(SUBMISSION STATUS is `PENDING`, custom value = 1; 
  * SUBMISSION STATUS is not `PENDING`, custom value = 0\)
* `STATUS REJECTED`- w/ conditional rules 
  * \(SUBMISSION STATUS is `REJECTED`, custom value = 1; 
  * SUBMISSION STATUS is not `REJECTED`, custom value = 0\)
* `STATUS NO REVIEW REQUIRED` - w/ conditional rules 
  * \(SUBMISSION STATUS is `NO REVIEW REQUIRED`, custom value = 1; 
  * SUBMISSION STATUS is not `NO REVIEW REQUIRED`, custom value = 0\)

#### Status roll-up

When a TCP submission is added to a TCP record, the parent TCP record status should reflect the last TCP submission

IN PROGRESS: Dev team will help code an small enhancement where when the submission line's status is updated, it will update the parent record.

#### Reporting

10 day business day due date Table: `tcp_tracking_submission` Field:

* `DAYS_ELAPSED` - populated by script \(see Data Publication log: `tcp_business_days`
* `ELAPSED LESS THAN 10` - conditional rules set. _Used for reporting table_
* `ELAPSED 10 TO 15` - conditional rules set. _Used for reporting table_
* `ELAPSED 15 PLUS` - conditional rules set. _Used for reporting table_

Reports: **Average Review Time \(Business Days\)** & **Average Review Time by Month \(Business Days\)**

