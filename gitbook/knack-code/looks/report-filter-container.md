---
description: >-
  How to restrict the container size for reporting filters to prevent report
  shifting
---

# Report Filters Container Size

![Two reports side by side no matter how many filters are added](<../../../.gitbook/assets/image (151).png>)

### The JS

None needed 😎

### The CSS

```
/*Prevents Report Filters from increasing report container size and pushing 2nd report down*/
#view_679 .kn-records-nav { max-width: 630px; }
```

### How to Implement

We simple define the `max-width` of the left report (our Bar chart) to its defined dimensions under Chart Properties.

![](<../../../.gitbook/assets/image (146).png>)

The View ID will need to be updated accordingly

```
#view_679 .kn-records-nav { max-width: 630px; }
```

For reference the second report, our Pie chart in the example above, is sized so both reports can fit side by side on the page.

![](<../../../.gitbook/assets/image (147).png>)
