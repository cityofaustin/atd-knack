---
description: >-
  How to enter a percentage as a whole number and then convert it to a decimal
  value for calculations & reporting
---

# Converting an Entered Percentage to a Percentage Value

This conversion eliminates the complexity of having to enter percentages as decimal values and instead reviewers can enter them as whole numbers. For example, 65 instead of .65

#### Required Fields

* Number - Percentage Entry
* Equation - Percentage Calculation
* Number -  Percentage Value

#### Percentage Entry

Setup the Number field as a whole number with no decimals

#### Percentage Calculation

If Percentage Entry field is blank we set it to 100% by default. This is specific to the app so that reviewers dont have to enter 100 for everything that is 100%. If the Percentage Entry does have a value, we multiply it by 0.01 to get our decimal value.

```text
{Mitigation Share % Entry} == 0 ? {Mitigation Share % Entry} + 1.00 : {Mitigation Share % Entry} * 0.01
```

#### Percentage Value

Make sure to setup this Number field to the % Number Format.

![](../../.gitbook/assets/image%20%28258%29.png)

And set it to the Equation field

![](../../.gitbook/assets/image%20%28209%29.png)

