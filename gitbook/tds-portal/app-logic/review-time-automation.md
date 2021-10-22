---
description: >-
  How to calculate review time for a review cycle, average review time, and on
  time percentage
---

# Calculating Review Time

#### Required Fields - Child Object

* Date/Time - Submitted Date Time
* Date/Time - Review Started Date Time
* Date/Time - Review Completed Date Time
* Equation - Total Days
* Equation - Days Under Review
* Equation - Days Idle
* Multiple Choice - Review On Time

#### Date Time Fields

These fields capture action timestamps when a record is created/submitted and when the reviewer either starts or finishes a review process. Make sure to set them up to capture time so we can accurately capture and calculate the review time. Be sure to not default date or time.

![](<../../../.gitbook/assets/image (212).png>)

{% hint style="info" %}
For these equations, Equation Type must be set to Numeric and we add 2 Decimal Places
{% endhint %}

#### Total Days

If the Review Completed Date is blank, we used the netWorkDays function to calculate the time difference between the Submitted Date and Current Date with the currentTime function. Otherwise, if Review Completed Date is not blank, we use the netWorkDays function to calculate the business days from Submitted Date to Review Completed Date.

```
{Scope Review Completed Date Time} == 0 ? netWorkDays({Scope Submitted Date Time},currentTime()) : netWorkDays({Scope Submitted Date Time},{Scope Review Completed Date Time})
```

{% hint style="info" %}
netWorkDays function does not count Saturday or Sunday when determining time.
{% endhint %}

#### Days Under Review

If the Review Completed Date is blank, we used the netWorkDays function to calculate the time difference between the Review Started Date and Current Date with the currentTime function. Otherwise, if Review Completed Date is not blank, we use the netWorkDays function to calculate the business days from Review Started Date to Review Completed Date.

```
{Scope Review Completed Date Time} == 0 ? netWorkDays({Scope Review Started Date Time},currentTime()) : netWorkDays({Scope Review Started Date Time},{Scope Review Completed Date Time})
```

#### Days Idle

If the Review Started Date is blank, we used the netWorkDays function to calculate the time difference between the Submitted Date and Current Date with the currentTime function. Otherwise, if Review Started Date is not blank, we use the netWorkDays function to calculate the business days from Submitted Date to Review Started Date.

```
{Scope Review Started Date Time} == 0 ? netWorkDays({Scope Submitted Date Time},currentTime()) : netWorkDays({Scope Submitted Date Time},{Scope Review Started Date Time})
```

#### Review On Time

We setup this field as a Multiple Choice instead of a Yes/No in case there becomes a third option in the future. Right now we want to figure out if a review is on time or not on time. We setup two conditionals based on the Days Idle equation to determine if the review started less than 28 days after being submitted or if the review started after 28 days of being submitted.

![](<../../../.gitbook/assets/image (236).png>)

{% hint style="info" %}
The On Time field could also be setup to determine if the Days Under Review or the Total Days values exceed certain day thresholds.
{% endhint %}



#### Required Fields - Parent Object

* Average - Average Days Under Review
* Average - Average Days Idle
* Average - Average Total Duration
* Count - Number of On Time Reviews
* Equation - Percentage of On Time Reviews
* Number - Reviews On Time %

#### Average Fields

For these Average fields we set them up with 1 decimal place and some filters to make sure the value is not 0 or blank. We use these averages for reporting to give us a general sense of how long reviews are taking on average during different stages of the process.

![](<../../../.gitbook/assets/image (246).png>)

#### Number of On Time Reviews

We simply just count the number of review records where the Review On Time value is On Time

#### Percentage of On Time Reviews

We take the count field Number of On Time Reviews and divide it by the count field Number of Reviews (the total). We make sure to set this to two Decimal Places to give us a more precise percentage.

#### Reviews On Time %

We set the Number Format to % and set it the the Percentage of On Time Reviews equation

![](<../../../.gitbook/assets/image (257).png>)

{% hint style="info" %}
The On Time % can be used for an entire case or per reviewer for example.
{% endhint %}

![](<../../../.gitbook/assets/image (264).png>)

![](<../../../.gitbook/assets/image (213).png>)
