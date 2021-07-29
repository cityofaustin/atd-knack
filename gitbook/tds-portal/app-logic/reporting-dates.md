---
description: How to calculate date values for reporting
---

# Calculating Date Values for Reporting

For certain reports there is a need to display, group, or filter data by date values such as Month Name, Month Number, Quarter Number, Fiscal Quarter Number, or Year Number. We utilize several Knack equation functions in order to calculate these date values for each record to fine tune reporting needs for an application due to limited reporting functionality in Knack.

#### Required Fields

* Text Formula - MonthName
* Equation - Month Number
* Equation - Quarter Number
* Equation - Fiscal Quarter Number
* Equation - Year Number

{% hint style="success" %}
These fields can be built in any object where there is a reporting need.
{% endhint %}

{% hint style="info" %}
Equation Type must be set to Numeric for all of these. No other formatting is necessary.
{% endhint %}

#### Created Month Name

The getDateMonthOfYearName function pulls the name of the month for our Case Created Date. Since this is text, we use a text formula.

```text
getDateMonthOfYearName({Case Created Date Time})
```

{% hint style="info" %}
For our equation logic, we utilize Ternary Operators to calculate and set our desired values based on certain conditions. A simple way to remember is whatever precedes the **`?`** is the IF statement, after the **`?`** is the THEN statement, and after the **`:`** is the ELSE statement. Multiple **`:`** can be used to create an ELSE IF statement, which we do below for the Fiscal Quarter equation.
{% endhint %}

#### Created Month Number

The getDateMonth function pulls the month number for our Case Created Date if not blank but sets this equation to blank if Case Created Date is blank

```text
{Case Created Date Time} != 0 ? getDateMonth({Case Created Date Time}) : null
```

#### Created Quarter Number

The getDateQuarter function pulls the quarter number for our Case Created Date if not blank but sets this equation to blank if Case Created Date is blank

```text
{Case Created Date Time} != 0 ? getDateQuarter({Case Created Date Time}) : null
```

#### Created Fiscal Quarter Number

We used the Created Quarter Number equation above to do some basic math to determine the corresponding fiscal quarter. If quarter 4, we subtract 3 since this would be fiscal quarter 1. If quarter is blank we set this to blank but otherwise we add 1 to the quarter number.

| Quarter Number | Fiscal Quarter Number |
| :--- | :--- |
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |
| 4 | 1 |

```text
{createdQuarterNumber}== 4 ? {createdQuarterNumber} - 3 : ({createdQuarterNumber} == 0 ? null : {createdQuarterNumber} + 1)
```

#### Created Year Number

The getDateYear function pulls the year number for our Case Created Date if not blank but sets this equation to blank if Case Created Date is blank

```text
{Case Created Date Time} != 0 ? getDateYear({Case Created Date Time}) : null
```

{% hint style="warning" %}
This is especially important since Knack defaults date years to 1970 and this functionally ruins reporting. We make sure the equation is blank if there is no Created Date.
{% endhint %}

