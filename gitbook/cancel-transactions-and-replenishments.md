# Cancel Transactions & Replenishments

## Cancel Transaction

Go to back end, `inventory_transactions`  go to `CANCELLED` field and switch from "No" to "Yes"

* this will update the `CANCELLED_TXN` field from "0" to "1"
* this will update `Transaction Status` from "Completed" to "Cancelled"

{% hint style="warning" %}
Can't change a transaction once it's been Journal Vouchered (JV)

If it has been JV'd, then an "Adjustment" action must be performed in Knack and the Finance team will need to reconcile the adjustments
{% endhint %}

## Cancel Replenishment

Go to back end, `inventory_transactions`  go to `Replenishment`field and switch from "Completed" to "Will not replenish"

