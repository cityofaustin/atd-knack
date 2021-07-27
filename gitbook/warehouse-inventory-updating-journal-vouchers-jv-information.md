# Warehouse Inventory  - Updating Journal Vouchers \(JV\) information

Van reviews transactions from Knack and AIMs, she provides a spreadsheet to DTS to update the JV ID to the transaction records.

## Steps

1. Remove all columns from the spreadsheet except `TXN ID`, `Journal Voucher Date`, and `Journal Voucher ID`
2. Pick an `TXN ID` and review record has no `Journal Voucher Status` before import under Report "[Completed Inventory Transaction Report](https://atd.knack.com/amd#inventory-reports/issued/)"
3. Import the file into the `inventory_transactions` object. 
4. Match on `TXN ID` and map `Transaction ID` the other columns `Journal Voucher ID` and `Journal Voucher Date`
5. The `Journal Voucher Status` field will update automatically from a field rule
6. Pick an `TXN ID` and review record and confirm `Journal Voucher Status` field is updated after import under Report "[Completed Inventory Transaction Report](https://atd.knack.com/amd#inventory-reports/issued/)"



