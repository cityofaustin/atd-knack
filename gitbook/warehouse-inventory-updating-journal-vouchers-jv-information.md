# Warehouse Inventory - Updating Journal Vouchers (JV) information

Finance reviews transactions from Knack and AIMs, she provides a spreadsheet for DTS to only update the JV ID to the transaction records.

## Steps

1. Remove all columns from the spreadsheet except `TXN ID`, `Journal Voucher Date`, and `Journal Voucher ID` . Use "Save As" a CSV file so it can be imported.
2. Pick an `TXN ID` and review record has no `Journal Voucher Status` before import under Report "[Completed Inventory Transaction Report](https://atd.knack.com/amd#inventory-reports/issued/)"
3. Import the CSV file into the `inventory_transactions` object by navigating in Records > Import.&#x20;
   * Does the first row of your data contain column headers? **Yes**
   * Do you want to update existing `inventory_transactions` records with this import? **Yes**
   * Update records where the following rules match: **`TXN ID` matches `Transaction ID` **&#x20;
   * What if no matching record is found to update? **Skip the row and do nothing**
4. Map columns to Knack fields: Map `TXN ID` to `Transaction ID` , the other columns `Journal Voucher ID` and `Journal Voucher Date`

<table><thead><tr><th>KNACK FIELD</th><th>COLUMN</th><th data-hidden></th></tr></thead><tbody><tr><td>TXN ID</td><td>Transaction ID</td><td></td></tr><tr><td>Journal Voucher ID</td><td>Journal Voucher ID</td><td></td></tr><tr><td>Journal Voucher Date</td><td>Journal Voucher Date</td><td></td></tr></tbody></table>

5. The `Journal Voucher Status` field will update automatically from a field rule
6. Pick an `TXN ID` and review record and confirm `Journal Voucher Status` field is updated after import under Report "[Completed Inventory Transaction Report](https://atd.knack.com/amd#inventory-reports/issued/)"

