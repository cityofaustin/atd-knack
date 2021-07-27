# Functionality Guide

### **Reporting Examples**

* Reference: [Data Tracker - TCP Tracking](https://data.mobility.austin.gov/data-tracker/#home/tcp-tracking/tcp-reports/?view_1972_2_filters=%5B%7B%22field%22%3A%22field_2274%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22Current%20Week%22%2C%22type%22%3A%22week%22%7D%5D&view_1972_5_filters=%5B%7B%22field%22%3A%22field_2274%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22Current%20Week%22%2C%22value%22%3A%22%22%2C%22type%22%3A%22week%22%7D%5D&view_1972_6_filters=%5B%7B%22type%22%3A%22month%22%2C%22value%22%3A%22%22%2C%22text%22%3A%22Month%20to%20Date%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22field%22%3A%22field_2274%22%7D%5D&view_1972_7_filters=%5B%7B%22field%22%3A%22field_2274%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22This%20Year%22%2C%22type%22%3A%22year%22%7D%5D&view_1972_8_filters=%5B%7B%22field%22%3A%22field_2251%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22This%20Year%22%2C%22type%22%3A%22year%22%7D%5D&view_1972_9_filters=%5B%7B%22field%22%3A%22field_2251%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22Month%20to%20Date%22%2C%22type%22%3A%22month%22%7D%5D)
* Reference: [Signs Reports](https://atd.knack.com/signs-markings#work-order-signs/reports-signs/?view_3071_0_filters=%5B%7B%22value%22%3A%22%22%2C%22text%22%3A%22Current%20Week%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22field%22%3A%22field_3362%22%2C%22type%22%3A%22week%22%7D%5D)
* Reference: [Markings Reports](https://atd.knack.com/signs-markings#work-orders-markings/markings/work-order-reports-markings/?view_1945_0_filters=%5B%7B%22value%22%3A%22LONG%20LINE%22%2C%22text%22%3A%22Long%20Line%22%2C%22operator%22%3A%22is%22%2C%22field%22%3A%22field_2173%22%7D%5D)
* Reference [Parking Enterprise Reporting Portal \| Citation Reports](https://atd.knack.com/parking-enterprise#parking-citation-tracking/citation-reports/)
* Reference: [Finance and Purchasing System](https://atd.knack.com/finance-purchasing#reporting/?view_97_0_filters=%5B%7B%22field%22%3A%22field_27%22%2C%22operator%22%3A%22is%20during%20the%20current%22%2C%22text%22%3A%22Current%20Month%22%2C%22value%22%3A%22%22%2C%22type%22%3A%22month%22%7D%5D)

### **Converting "Created Date" to Month Name**

1. Create Field: `CREATED_MONTH_FORMULA` 
2. "equation" field type
3. formula: `getDateMonth({CREATED_DATE})`
4. Create Field: `CREATED_MONTH_NUMBER`
5. "number" field type 
6. **Add conditional rule**
   * When every record
   * Set record to \[value\] - `CREATED_MONTH_FORMULA`
7. Create field: `CREATED_MONTH_NAME`
8. "text formula" field type
   * formula: `getDateMonthOfYearName({CREATED_DATE})`

### **Approval Workflow Process**

* Reference \[Finance and Purchasing System\]
* Reference TDS
* Reference \[Signs and Markings Contractor Work Orders\]

### **Comment functionality**

* Reference \[Signs and Markings Operations app\]
* Reference: Finance and Purchasing
* Reference: RPP
* Reference: TDS

### **Copy table records onto table**

* Reference \[Finance and Purchasing System\] - Line Items

### **Copy Record Details**

* Reference \[Finance and Purchasing System\] - _when PR is Closed/Cancelled_

### **Location & Asset relationship**

* Reference \[Data Tracker - Signals\]

### **Work Order Management**

* Reference \[Signs and Markings Operations app\]
* Reference \[AMD Data Tracker\]

