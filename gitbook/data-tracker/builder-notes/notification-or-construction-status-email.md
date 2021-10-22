# NOTIFICATION | Construction Status Email

We have an email notification configured on the `signals` object table. There are 2 tasks configured to send custom email notifications to people on distribution list.

Example of settings:

## &#x20;Task 1:

* Task Name: `Send Construction Status Email`
* Schedule: `Daily`

### **Action**

Action: `Send custom email` When:

* &#x20;`CONSTRUCTION NOTE TRANSMITTED` - is `No`

### **Send**

To: custom email to - \[INSERT EMAIL HERE]

### **Message**

* From Name: Arterial Management Notifications
* From Email: no-reply@ ----
* Subject: `Signal Construction Update: {LOCATION_NAME}`
* Message:

Construction status of {SIGNAL\_NAME} has been updated Signal Type: {SIGNAL\_TYPE} Status: {SIGNAL\_STATUS} Note: {CONSTRUCTION\_NOTE} Location: {LOCATION\_NAME} [Signal Construction Project Map](https://data.mobility.austin.gov/signal-projects/)

_This message has been generated automatically by the ATD Data Tracker. To unsubscribe, contact _[_diana.martin@austintexas.gov_](mailto:diana.martin@austintexas.gov)_._

## &#x20;Task 2:

* Task Name: `Reset Construction Status`
* Schedule: `Daily`

### **Action**

Action: `update each record` When:

* &#x20;`CONSTRUCTION NOTE TRANSMITTED` - is `No`

### **Send**

To: custom email to - \[INSERT EMAIL HERE]

### **Values**

* &#x20;`CONSTRUCTION NOTE PREVIOUS` - to a field value - `CONSTRUCTION NOTE`
* &#x20;`SIGNAL STATUS PREVIOUS` - to a field value - `SIGNAL STATUS`
