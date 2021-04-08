---
description: How to successfully setup and import your records into a Knack object
---

# Importing Records

### Check all field types and fix during import 

this will make life easier once the object is created, instead of changing the field types after creation

### Importing connection fields

* connect to `text formula` that is of the connection - connection field
* can't connect directly to a connection field, the import won't work.

### **Importing CSVs**

* CSVs larger than 250 MB cannot be imported. 
* CSVs should be broken down into subsets of around 10,000 records to help import times and prevent time-outs. 
* Number of fields can affect import times, especially with large amounts of data. 
* Empty fields still need to be indexed, so removing empty fields could improve import times. 

