# Adding a new inventory item

Ex. `80166700001 | Sign, electronic display, LED, color, programmable, complete system | EACH | 5390-2400-2350| Object code 7730`

1. Add to **"inventory\_items"**

## **FIELDS TO POPULATE**

* ATD\_INVENTORY\_ID: unique ID for inventory item \(manually created, broke from Data Tracker\)
* FDU: Reference to object code, not really FDU number
* Object: Object code that is used by Finance staff
* CATEGORY: Arterial Management category \(list here\)
* ITEM\_NAME: Name of inventory item
* UNIT\_COST: Cost of item
* STOCK\_NUM: Stock Number
* Commodity Code: \(connection to **"Commodity Code"**\)
* BUSINESS\_UNIT: work group name \(Ex. ARTERIAL MANAGEMENT, MARKINGS\)
* UNIT\_OF\_MEASURE: Unit of item \(Ex. EACH, FEET\)

1. Add to **"commodities"** object table Fill out every field in **"+New Record form"**

