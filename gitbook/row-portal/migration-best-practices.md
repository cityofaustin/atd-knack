---
description: Things I learned during TCP Migration Test with John 4/30/2020
---

# Migration Best Practices

### NOTE TO SELF for TCP MIGRATION

Change display name in Data Tracker to Created By: email

* Text formula field that is the email address Text formula modified email address Text formula email address

ID GEN AUTO INCREMENT - change TO NUMBER, switch back to AUTO INCREMENT after import

SUBMITTER - is Short Text

TEST SEALING ENGINEER ISN'T POPULATING ATTACHMENTS NOT COMING OVER - SCRIPT

## Best Practices

### Connected Records

* We tend to have a lot of connected records to Account records and those don't usually import well
  * _TIP: create a text formula for the **Account Email** so that there is a more concrete way to capture a name in the record_

### Do Not Import

* Anything that is a **calculated** field, no need to import \(if the field has conditional rules to set the field\)
* Anything that is an **equation** field
* If the fields is a **text formula** 

\*\*\*\*

