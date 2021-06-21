# Warehouse Inventory  - Updating Journal Vouchers \(JV\) information

Van reviews transactions from Knack and AIMs, she provides a spreadsheet to DTS to update the JV ID to the transaction records.

## Steps

1. Remove all columns from the spreadsheet except `TXN ID`, `Journal Voucher Date`, and `Journal Voucher ID`
2. Import the file into the `inventory_transactions` object. 
3. Match on `TXN ID` and map the other columns
4. The JV status field will update automatically from a field rule
5. Confirm that the JV status field is updated

