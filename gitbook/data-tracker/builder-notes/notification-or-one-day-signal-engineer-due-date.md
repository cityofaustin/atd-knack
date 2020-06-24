# NOTIFICATION \| One Day Signal Engineer Due Date

We have an email notification configured on the `tmc_issues` object table. There are 5 tasks configured to send custom email notifications to the Signal Engineers in their respective service areas.

The Service Requests are tagged with which Engineer Area they're in and also what the Due Date is. These notifications tell you 1 day ahead of the due date to review the service request.

Example of settings:

## **Task**

Task Name: `EmailNotifyCentral` Schedule: `Daily`

### **Action**

Action: `Send custom email` When:

*  `ONE DAY NOTIFY DATE` - is `today`
*  `ISSUE STATUS CODE` - is `pending engineer review`
*  `SIGNAL ENGINEERING AREA` - contains `CENTRAL`

### **Send**

To: custom email to - \[INSERT EMAIL HERE\]

### **Message**

* From Name: Data Tracker
* From Email: no-reply@ ----
* Subject: `Service Request {SR NUMBER} is due tomorrow` or `One Day Notify NW Area`
* Message:
  * `The CSR #{SR_NUMBER} for signal {SIGNAL} is due on {DUE_DATE}, one day from today. This CSR is for the NORTHWEST AREA.`

