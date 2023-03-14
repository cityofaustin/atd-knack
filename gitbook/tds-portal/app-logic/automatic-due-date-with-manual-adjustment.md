---
description: How to set a due date automatically with the ability to manually override it
---

# Automatic Due Date with Manual Adjustment

**Required Fields - Parent object**

* Date/Time - Cycle Assigned Date/Time or Cycle Submitted Date/Time
* Equation - Calculate Auto Due Date
* Date/Time - Cycle Due Date
* Yes/No - Cycle Due Date Adjusted
* Date/Time - Cycle Due Date Override or Adjust Cycle Due Date

<figure><img src="../../.gitbook/assets/image (8).png" alt=""><figcaption><p>Parent object - Review Cycle</p></figcaption></figure>

**Required Fields - Child object (if you want to pass a single due date to all connected records)**

* Text Formula - Cycle Due Date
* Date/Time - Due Date
* Yes/No - Due Date Adjusted
* Date/Time - Due Date Override or Adjust Due Date

<figure><img src="../../.gitbook/assets/image (11).png" alt=""><figcaption><p>Child Object - connected Reviews</p></figcaption></figure>

<details>

<summary>Calculating the Auto Due Date</summary>

Depending on use case, we need either an Assigned Date or a Submitted Date for the cycle to give us a starting date to calculate our due date from. We calculate from that date based on whats required by the process. In this example we use 10 days but in some scenarios you may likely use something like 7 days for a week, 14 days for 2 weeks, 28-31 days for a month, 60 days for 2 months, 90-91 days for a quarter, or 365 days for a year.

```
{Cycle Assigned Date Time} !=0 ? {Cycle Assigned Date Time} + 10 : null
```

With ternary operators we indicate here that if the Assigned Date is not blank to add 10 days to it for the Due Date, else, leave the date blank.

Be sure to set the Equation Type to Date, Date Type to days, and Result Type to Date. We also ignore time for the purpose of this example but it is an available option.

</details>

<details>

<summary>Preparing the Due Dates</summary>

Once we have our Equation in place, we set our Cycle Auto Due Date field to it.

If you are passing the due date down to any child records as well, you will set its Text Formula to the parent object's Cycle Auto Due Date. Then with the Child's own Due Date Auto field, we set it to that Text Formula if it is not blank and the Due Date Auto is blank.

</details>

<details>

<summary>Overriding/Adjusting the Auto Due Date</summary>

This can be one of two ways; either by inline editing in a table, via a form submit, or both.

When using the inline editing option, the downside is both the Auto Due Date and the Due Date Override fields must be present. We use record rules & display rules for when a date is entered to Adjust the due date. We bold the field and strikethrough the Auto Due Date to give the visual cues that the date has been overridden/adjusted.&#x20;

<img src="../../.gitbook/assets/image (3).png" alt="" data-size="original">

These display rules can be applied even if you decide to only adjust the dates with a form submit. For this display rule to work, we set the yes/no field to yes to indicate it has been adjusted. If the Due Date Adjusted is yes, then these display rules apply.

If we use a form submit, we create a menu button for the action:

![](<../../.gitbook/assets/image (7).png>)

Which opens up a modal page with a form submit to mark the due date as adjusted with yes and to give the field a date value.

![](<../../.gitbook/assets/image (1).png>)

If you want the ability to adjust all due dates for connected child records, record rules must be added accordingly

![](<../../.gitbook/assets/image (10).png>)

</details>
