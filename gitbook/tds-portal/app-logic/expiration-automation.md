---
description: How to calculate and set an expiration date
---

# Calculating an Expiration Date

Knowing when something expires is super helpful so when you want to set a specific expiration date you can use something like:

![](../../.gitbook/assets/image%20%28240%29.png)

As long as our date value is not blank we add 10 years to that date to determine an expiration date determined by our Date Type and the number we add.

```text
{Mitigation Fees Paid Date} !=0 ? {Mitigation Fees Paid Date} + 10 : null
```

You can opt out of using Time but if you choose hours as your Date Type, its probably best to include Time in your result unless you are only doing 24 hour increments.

![](../../.gitbook/assets/image%20%28222%29.png)

