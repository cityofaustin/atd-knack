---
description: How to style Detail View labels to be more mobile friendly
---

# Detail Labels





### The JS

None needed 😎

### The CSS

```text
#view_1606 .kn-detail-label { background-color: transparent; min-width: 0% !important; }

/*OR*/

#view_1255 .kn-detail-label { background-color: transparent; min-width: 45% !important; max-width: 10% !important; }
```

### How to Implement

Adjust the View ID and you are set. Depending on the fields, field length, field type, and \# of columns, you will choose one of the two CSS lines above, that works best for that Detail View. For example, the first line is used for applicant information formatted as two columns whereas the second line is used for a view that has a single column.

