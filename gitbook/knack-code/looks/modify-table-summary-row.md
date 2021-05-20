---
description: How to change or hide summary rows for table groups
---

# Modify Table Summary Rows

![Mitigation table, grouped by mitigation location, with modified summary rows](../../.gitbook/assets/image%20%28145%29.png)

Grouping records in tables is great for usability, organization, and data points. It allows a user to quickly identify averages and totals \(sums\), or compare and contrast related records. The one downside is that group summary rows duplicate the group name creating a lot of clutter on the table. To simplify this, we remove that group header name from the group summary row and we can either hide it completely or add something that makes more sense. In the mitigation table example above, instead of it being "Header Name \(Mitigation Location\) + Total \(Group Sum\)" we set it to "Location Total".

### The JS

```text
/*********************************/
/*** Modify Table Summary Rows ***/
/*********************************/

function hideSummaryNameMitigationTable(view_id, replacementText) {
  var $tableRowTotals = $(`#${view_id}`).find("tr.kn-table-totals")
  $tableRowTotals.map(function (index) {
    if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(2)").html(`<strong>${replacementText}</strong>`)
    }
  })
}

// Change Summary Name for Mitigation Tables
$(document).on('knack-scene-render.scene_105', (event) => {
  // Waiting for scene to render instead of view
  // View finishes rendering before table data is loaded
  hideSummaryNameMitigationTable("view_322", "Location Total")
  hideSummaryNameMitigationTable("view_321", "Location Total")
})
```

### The CSS

None needed 😎

### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
When setting up your table, you will need to identify a field you like like to group the object records by and of course add the appropriate filters if applicable. For the mitigation table we sort by the mitigation location and filter by mitigation type for example.

![](../../.gitbook/assets/image%20%28150%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Next, when building your table, you will need to identify a field to use as the summary column. For the mitigation table, we use Cost.

![](../../.gitbook/assets/image%20%28149%29.png)

Additionally, you will need to update the table settings to include a Column Summary

![](../../.gitbook/assets/image%20%28148%29.png)
{% endtab %}

{% tab title="3️⃣" %}
The JS handler will need to be updated with the correct Scene ID and View ID

```text
// Change Summary Name for Mitigation Tables
$(document).on('knack-scene-render.scene_105', (event) => {
```

On our mitigation page, we have 2 tables so we do it for both views. If you only had one table, it would just be a single line with a single View ID. Additionally, here is where you can change the text that will show for the group summary row.

```text
  hideSummaryNameMitigationTable("view_322", "Location Total")
  hideSummaryNameMitigationTable("view_321", "Location Total")
})
```
{% endtab %}

{% tab title="4️⃣" %}
The JS function uses an index to identify where to put the replacement text. This will be adjusted based on how many columns you may have in your table. We want the text to show up on the field column before the field that has the column summary, the Cost field in our example. The function uses an `:eq()` selector to indicate how many columns we have before the column we want to use for the text. In the mitigation table, this would be the Notes column where we have 2 columns before it, the Improvement and Edit columns \(2\).

```text
if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(2)").html(`<strong>${replacementText}</strong>`)
```

If you were to have only a two column table for example with column summary as the second column, it would look like this:

```text
if (index !== $tableRowTotals.length-1) {
      $(this).find("td:eq(0)").html(`<strong>${replacementText}</strong>`)
```

with 0 indicating the first column in the index.
{% endtab %}
{% endtabs %}



