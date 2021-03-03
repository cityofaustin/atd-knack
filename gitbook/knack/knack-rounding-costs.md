---
description: A workaround and custom JS solution to rounding Knack costs and tax correctly
---

# Rounding Knack Costs Correctly

Unfortunately Knack uses some faulty JavaScript that causes tax or cost calculations in Knack apps to be off by one cent \($0.01\) when a certain condition is met. This condition is met when calculating cost by tax \(8.25% as .0825\) where the resulting value leaves .005 \(five one-thousandths\) and it must decide to round up or down. Knack Default rounding incorrectly rounds. 005 values down instead of up. If we changed Default rounding to round up instead, this would make our other values that are rounding correctly to then round incorrectly and therefore, in order for all values to round correctly, below is the current workaround.

**Example:** When you multiply $110 x 1.0825 \(cost x tax\) = $119.075 Knack rounds this incorrectly to $119.07 instead of $119.08

If you plan on calculating costs or tax in your app, you should make sure these adjustments are implemented so figures round correctly.

### Workaround

1. Add .001 to costs \(one one-thousandth\) that you plan to calculate tax for
   * using the above example, a cost of $110 should be shown as $110.001 on the back end. Since this is only one tenth of a penny, it will not adversely adjust the cost. You will still see $110 or $110.00 on the front end.
2. Adjust Tax Amount equation field to have 3 decimal places \(instead of 2\)
   * using the above example, a calculated tax of $9.075 would show as $9.075 instead of $9.07 or $9.08

By following these two steps calculated totals will round correctly such as tax amount, total tax, and total costs.

For more information on how JavaScript can be correctly levied to round values correctly, feel free to explore this article: [http://www.jacklmoore.com/notes/rounding-in-javascript/](http://www.jacklmoore.com/notes/rounding-in-javascript/)

### A Better Solution

The rounding problem can be avoided by using numbers represented in exponential notation:

```text
Number(Math.round(1.005+'e2')+'e-2'); // 1.01
```

And to abstract that into something more usable:

```text
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

round(1.005, 2); // 1.01
```

