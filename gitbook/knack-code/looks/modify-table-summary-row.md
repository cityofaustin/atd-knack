---
description: How to change or hide summary rows for table groups
---

# Modify Table Summary Rows

![Mitigation table, grouped by mitigation location, with modified summary rows](../../.gitbook/assets/image%20%28140%29.png)

Grouping records in tables is great for usability, organization, and data points. It allows a user to quickly identify averages and totals \(sums\), or compare and contrast related records. The one downside is that group summary rows duplicate the group name creating a lot of clutter on the table. To simplify this, we remove that group header name from the group summary row and we can either hide it completely or add something that makes more sense. In the mitigation table example above, instead of it being "Header Name \(Mitigation Location\) + Total \(Group Sum\)" we set it to "Location Total".

### The JS

```text
/***************************************************/
/* Change or Hide Summary Row on Mitigation Tables */
/***************************************************/

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

{% endtab %}

{% tab title="2️⃣" %}

{% endtab %}

{% tab title="3️⃣" %}

{% endtab %}

{% tab title="4️⃣" %}

{% endtab %}

{% tab title="5️⃣" %}

{% endtab %}
{% endtabs %}

