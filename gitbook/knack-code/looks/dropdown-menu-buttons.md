---
description: How to condense a Knack Menu into a categorized Dropdown Menu
---

# Dropdown Menu Buttons

![The TIA Module Dropdown Menu condensed into only 4 buttons, 2 with dropdown navigation](../../.gitbook/assets/image%20%28140%29.png)

### The JS

```text
/****************************************/
/*** Dropdown Menu Buttons Navigation ***/
/****************************************/

function dropdownMenuItem(recordId, route, iconName, linkName) {
  return (
    `<li class="kn-button">\
      <a href="#tia-requests/tia-case-details/${recordId}/${route}/${recordId}">\
        <span class="icon is-small"> \
          <i class="fa ${iconName}" /> \
        </span>\
        <span>${linkName}</span>\
      </a>\
    </li>`)
}

$(document).on('knack-view-render.view_744', function(event, view, record) {
  var recordId = view.scene.scene_id;

  $(`<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
          <span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
          ${dropdownMenuItem(recordId, "tia-mitigation-details", "fa-file-text-o", "Mitigations")}\
          ${dropdownMenuItem(recordId, "memo-builder", "fa-medium", "Memo Builder")}\
          ${dropdownMenuItem(recordId, "tia-case-log", "fa-briefcase", "Case Log")}\
        </ul>\
      </li>\
      <li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
        <a href="#tia-requests/tia-case-details/${recordId}/edit-tia-case-details/${recordId}" data-kn-slug="#update-case-details">\
          <span class="nav-dropdown-link">Update Case Details</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" /> \
        </a>\
        <ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
          ${dropdownMenuItem(recordId, "edit-tia-case-details", "fa-edit", "Edit Case Details & Notes")}\
          ${dropdownMenuItem(recordId, "assign-case-reviewers", "fa-users", "Assign Case Reviewers")}\
          ${dropdownMenuItem(recordId, "change-tia-case-status", "fa-retweet", "Approve or Change Case Status")}\
          ${dropdownMenuItem(recordId, "connected-cases", "fa-link", "Connect Cases")}\
        </ul>\
      </li>\
      ${dropdownMenuItem(recordId, "edit-tia-fee-status-reviewer", "fa-dollar", "Fees")}\
      ${dropdownMenuItem(recordId, "add-tia-communication", "fa-plus-circle", "Communication")}\
    </ul>\
  </div>`).appendTo("#view_744")
})
```



### The CSS

We style the menu buttons to be similar to how the default Knack styling is. We also hide the original menu view if screen size is 800px or larger but hide our custom dropdown menu on smaller screens. This allows for easier navigation on mobile without the dropdowns, but also easier navigation on desktop with the dropdowns.

```text
/****************************************/
/*** Dropdown Menu Buttons Navigation ***/
/****************************************/

/* hide custom menu if on mobile */
@media (max-width: 799px) {
  #tia-menu-list {
    display: none;
  }
}

/* hide knack menu buttons if on desktop */
@media (min-width: 799px) {
  #view_163 {
    display: none;
  }
}

/*list, list item, and button stylings*/
#tia-menu-list {
  border-bottom: 0 !important
}

#tia-menu-list li {
  margin-right: .5em;
  box-shadow: 0px 2px 4px 0px gray;
}

#tia-menu-list .kn-button a {
  color: #163f6e;
  font-size: 1.1em;
  border-bottom: 0;
  padding-top:3px;
}

.tia-dropdown-menu-list .kn-button {
  border-radius: 0;
}

.tia-dropdown-menu-list li {
  border: 0;
  margin-right: 0 !important;
} 

.tia-dropdown-menu-list li:hover {
  background-color: rgb(235,235,235);
}
```



### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
Create a Menu view as normal and update it accordingly with your navigation. Create a second Menu view without any buttons, this will house the custom dropdown menu.

![](../../.gitbook/assets/image%20%28142%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Update the url route in the JS function so it matches your page navigation

```text
<a href="#tia-requests/tia-case-details/${recordId}/${route}/${recordId}">\
```
{% endtab %}

{% tab title="3️⃣" %}
Update the JS handler with the correct View ID of the empty view for the custom dropdown menu

```text
$(document).on('knack-view-render.view_744', function(event, view, record) {
```

and also at the bottom of the handler for the View ID that it appends to

```text
</div>`).appendTo("#view_744")
```
{% endtab %}

{% tab title="4️⃣" %}
Update the div class and the unordered list ID to what you would like to call them

```text
<div class="details-dropdown-menu tabs">\
    <ul id="tia-menu-list">\
```

If the class or ID are updated, be sure to update the corresponding CSS for all instances

```text
#tia-menu-list {
```
{% endtab %}

{% tab title="5️⃣" %}
Update the list class and unordered list classes to what you would like to call them

```text
<li class="tia-dropdown-menu kn-dropdown-menu kn-button">\
```

```text
<ul class="kn-dropdown-menu-list tia-dropdown-menu-list" style="min-width: 152px; margin: 0;">\
```
{% endtab %}

{% tab title="6️⃣" %}
Update the url route and slug for each of your lists \(dropdown buttons\). In this example, we have 2.

```text
<a href="#tia-requests/tia-case-details/${recordId}/tia-case-management/${recordId}" data-kn-slug="#case-management">\
```

Additionally, update the span classes for each of these lists \(dropdown buttons\) with the appropriate button label and icon

```text
<span class="nav-dropdown-link">Case Management</span>\
          <span class="kn-dropdown-icon fa fa-caret-down" />\
```
{% endtab %}

{% tab title="7️⃣" %}
We now update the JS handlers for each individual list item / button with the appropriate page url,  fa icon, and button label.

```text
${dropdownMenuItem(recordId, "tia-case-management", "fa-archive", "Scope & Submissions")}\
```
{% endtab %}

{% tab title="8️⃣" %}
Lastly, we update the View ID for the original menu view that we will be hiding in the CSS

```text
/* hide knack menu buttons if on desktop */
@media (min-width: 799px) {
  #view_163 {
    display: none;
  }
}
```
{% endtab %}
{% endtabs %}







