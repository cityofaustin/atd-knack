# Data set inventory

If you need to create a new data set or modify an existing data set, please follow the steps outlined below.

### Creating a new data set

* Open the [Data and Technology Services Portal](https://atd.knack.com/dts)
* Navigate to [Data Inventory - Datasets](https://atd.knack.com/dts#datasets/). 
* Click `+ New Dataset`

Fields to populate:

* **Dataset Name** - Please make sure that the data set name used is the final production name 
  * For example - `Data and Technology Services Portal | PRODUCTION`
* **Description** - Typically we use this description as the production description we use for data set meta data used on ex. \(GISDM\)
* **Notes** - Any special notes on the creation of the data set, discrepancies, disclaimer of quality, etc...
* **Owner Department** - The identified department who is the data manager \(Should be defaulted to "ATD"\)
* **Geometry Type** - If this data set is not spatial, there is an option for "non-spatial"
* **Technical Contact** - The individual or group that is the primary data manager
* **Business Contact** - If there is a power user or primary business stakeholder of the data set 
  * _\(There is functionality to add a new contact person if they're not listed\)_
* **Division** - The identified division that the data set may belong to
* **Tags** - Categories to help identify a data subset

Click the **Submit** Button.

### Modifying a data set

* Search for the data set on the inventory list.
* Click on the hyperlinked Details icon in the Details field.
* In addition to application details, this page also provides information about
  * **Dataset Instances** - datasets in various instances

### Adding a Dataset Instance

* Fill out the fields on the Dataset Instance form:
* **Primary Data Source** - Indicate whether or not the data source is the authoritative version
  * Yes
  * No
* **Source Instance** - This references the data sets that exist in the dataset inventory
* **Host Application** - This references the applications that exist in the application inventory \(below are some examples\)
  * GISMAINTDEV
  * GISMAINT1
  * GISDM
  * File Geodatabase
  * Feature Service
  * CSR 311
  * AMANDA
  * IMMPACT
  * MAXIMO
  * Microsoft Excel
* **Status**
  * ❌ Desired
  * 🚧 Development
  * 🚧 Test
  * ✅ Production
* **Integration Method**
  * None
  * Direct Edit
  * Native/Built-In
  * FME
  * Geodatapusher
  * Script
  * Manual Import/Upload
* **Refresh Frequency**
  * None
  * continuous
  * auto - daily
  * auto - hourly
  * auto - weekly
  * manual / as needed
  * manual / weekly
  * auto - monthly
  * auto - yearly
* **Note** - Any additional information about the data set
* **Feature Class Name** - The authoritative feature class name
* **Dataset URL** - link to the dataset \(ex. REST, Socrata URL\)

Click the "Add New Instance" button to finish.

Adding subsequent data set instances help identify the workflow of how the data set gets published and which environment the data set is edited primarily on.

