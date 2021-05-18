---
description: How to condense a Knack Menu into a categorized Dropdown Menu
---

# Dropdown Menu Buttons

![The TIA Module Dropdown Menu condensed into only 4 buttons, 2 with dropdown navigation](../../.gitbook/assets/image%20%28138%29.png)

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









