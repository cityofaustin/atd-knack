# CSR configuration prep in Knack

This doc describes the process for adding new tables and pages to an existing Knack application to prep for CSR integration.&#x20;

This process involves:

* Importing 3 tables
* Setting up field matching during import
* Reviewing all 3 tables again to configure text formulas, equations, multiple choice selections and connection fields

### Importing tables

1. Use the CSR table templates found in the network drive: `ATD\ATD_GIS\02_ENT_APPLICATIONS\KNACK\CSR_Configuration`
   * **TEMPLATE\_csr\_flex\_notes** (least amount of fields)
   * **TEMPLATE\_csr\_activities**
   * **TEMPLATE\_csr\_issues** (most amount of fields)

All templates only have field headers, will document the field mapping for each table

### Field Mapping for tables

When importing from a table the "Map Columns" section auto defaults everything to "Link"

## csr\_flex\_notes

![](<../.gitbook/assets/image (2) (1).png>)

### Connections - csr\_flex\_notes

* [ ] For field `SR PARENT`

<!---->

* Create a connection link to `csr_issues` (when that table is created)

### Text Formulas - csr\_flex\_notes

* [ ] For `ATTACHMENT_LINK`

```
<a href="{FLEX_ATTRIBUTE_VALUE}" target="_blank">View Attachment</a>
```

* [ ] For `ISSUE_STATUS_CODE`

<!---->

* {csr\_flex\_note SR PARENT.ISSUE\_STATUS\_CODE}

### Conditional Rules - csr\_flex\_notes

* [ ] For field `FLEX_ATTRIBUTE_VALUE_DISPLAY`:&#x20;

**Rule 1**

* FLEX\_QUESTION\_CODE contains `SRATTACH`
* FLEX\_ATTRIBUTE\_VALUE **is not blank**
  * Set **to field value -** `ATTACHMENT_LINK`

**Rule 2**

* FLEX\_QUESTION\_CODE does NOT contains `SRATTACH`
  * Set **to field value -** `FLEX_ATTRIBUTE_VALUE`

## csr\_activities

![](<../.gitbook/assets/image (1) (1).png>)

### Multiple Choice- csr\_activities

* [ ] For field `CSR_ACTIVITY` (see standard choices)
  * Conduct Investigation
  * Contact Citizen
  * Dispatch Technician/Crew
  * Repair/Replace
  * Attach Image
  * Send Email
  * Close Issue (Duplicate)
  * Close Issue (Resolved)
  * 311 Feedback
* [ ] For field `ENGINEER_AREA`
  * NORTH
  * CENTRAL
  * SOUTH
* [ ] For field `ISSUE_STATUS_CODE_SNAPSHOT`
  * csr\_feedback
  * closed\_duplicate
  * closed\_resolved
  * in\_progress
  * repairs\_complete
* [ ] For field `PROCESS_STATE_ESB`
  * SENT&#x20;
  * DO\_NOT\_SEND&#x20;
  * READY\_TO\_SEND
* [ ] ``

### Connections - csr\_activities

* [ ] For field `CREATED_BY` - use standard audit field guidance (Accounts)
* [ ] For field `csr_issue` - when that table is created)

### Text Formulas - csr\_activities

* [ ] For field`CSR_ACTIVITY_DATETIME_UNIX_MILLS`
  * `formatDate({CSR_ACTIVITY_DATETIME},x)`
* [ ] For field `SR_NUMBER`
  * `{csr_activity csr_issue.SR_NUMBER_csr}`
* [ ] For field `LOCATION_NAME`
  * `{csr_activity csr_issue.Location}`
* [ ] For field `ISSUE_STATUS_CODE`
  * `{csr_activity csr_issue.STATUS_CODE_csr}`
* [ ] For field `ISSUE_STATUS_DESC`
  * `{csr_activity csr_issue.STATUS_DESC_csr}`
* [ ] For field `EMI_ID`
  * `{csr_activity csr_issue.EMI_ID_csr}`
* [ ] For field ATD Issued ID{csr\_activity csr\_issue.ATD\_ISSUE\_ID}
  * `{csr_activity csr_issue.ATD_ISSUE_ID}`
* [ ] For field `Issue Description`
  * `{csr_activity csr_issue.CSR_DETAILS_csr}`

### Conditional Rules - csr\_activities

* [ ] For field `PROCESS_STATE_ESB:`

**Rule 1**

* SR\_NUMBER is **blank**
  * Set **to custom value -** `DO_NOT_SEND`
