---
description: How to make your Knack app more mobile friendly
---

# CODE: Mobile Optimization

Navigate to the bottom of this article if you would like to copy and paste the entire mobile template

## Form Views

### Increase size of form submit buttons

```text
    /* Increase size of buttons with type="submit" */
  button[type="submit"] {
    height: 64px !important;
    font-size: 32px !important;
    min-width: fit-content;
    width: 100%;
  }
```

### Increase font size for form field labels

```text
 /* Increase font size of form field labels */
  .kn-label {
    font-size: 22px;
  }

  .kn-detail-body {
    font-size: 22px;
  }
  
  .kn-read-only {
    font-size: 22px;
  }
```

### Increase height of text fields

```text
/* Increase height of text fields */
  input[type="text"] {
    height: 48px !important;
    font-size: 22px !important;
  }
```

### Increase height of email fields

```text
/* Increase height of email fields */
  input[type="email"] {
    height: 48px !important;
    font-size: 22px !important;
  }
```

### Increase font size of checkbox options

```text
 /* Increase font size of checkbox options */
  .option.checkbox {
    font-size: 22px;
  }
```

## Screen Selection

### Increase size of back links at bottom of pages

```text
 /* Increase size of back links at bottom of pages */
  a.ang-link {
      font-size: 22px !important;
  }
```

### Increase height of selected fields

```text
/* Increase height of select fields */
  .chzn-single {
    height: 48px !important;
  }

  .kn-select {
    height: 48px !important;
  }

  select {
    height: 48px !important;
    font-size: 22px !important;
  }
```

### Increase height of container surrounding selected fields

```text
/* Increase height of container surrounding select fields */
  .chzn-container {
    height: 48px;
    font-size: 22px !important;
  }

  .chzn-container > a > span {
    font-size: 22px !important;
  }

  /* Increase font size of dropdown text in select fields */
  .chzn-drop {
    font-size: 22px !important;
  }
```

## FA Icons

### Increase size of Font Awesome icons

```text
  /* Increase size of Font Awesome icons */
  .icon .fa {
      font-size: 22px !important;
  }
```

## Buttons

### Increase size of search button

```text
 /* Increase size of search button */
  .kn-button.search {
    height: 48px;
  }   
```

### Increase default menu button size

```text
/* Increase default menu button size */
  .kn-button
  {
    height: 48px !important;
    font-size: 22px !important;
  }
```

### Increase default size of "Choose File" button

```text
/* Increase font size of Choose File button */
  input[type="file"] {
    height: 48px !important;
    font-size: 22px !important;
}
.custom-file-upload {
    border: 3px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
```

## **CSS Full Template**

This code block has all the CSS knack form changes in it. Can copy and paste into CSS editor in Knack and will see the changes in the mobile environment.

```text
/*********************************/
/********* Mobile Styling ********/
/*********************************/
@media (max-width: 800px) {

/* Form Views */
  /* Increase size of buttons with type="submit" */
  button[type="submit"] {
    height: 64px !important;
    font-size: 32px !important;
    min-width: fit-content;
    width: 100%;
  }
  /* Increase font size of form field labels */
  .kn-label {
    font-size: 22px;
  }
  .kn-detail-body {
    font-size: 22px;
  }
  .kn-read-only {
    font-size: 22px;
  }
  /* Increase height of text fields */
  input[type="text"] {
    height: 48px !important;
    font-size: 22px !important;
  }
  /* Increase height of email fields */
  input[type="email"] {
    height: 48px !important;
    font-size: 22px !important;
  }
   /* Increase font size of checkbox options */
  .option.checkbox {
    font-size: 22px;
  }
 /* Increase font size of Choose File button */
  input[type="file"] {
    height: 48px !important;
    font-size: 22px !important;
  }
  .custom-file-upload {
    border: 3px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
  }

/* Screen Selection */
  /* Increase size of back links at bottom of pages */
  a.ang-link {
      font-size: 22px !important;
  }
  /* Increase height of selected field */
  .chzn-single {
    height: 48px !important;
  }
  .kn-select {
    height: 48px !important;
  }
  select {
    height: 48px !important;
    font-size: 22px !important;
  }
  /* Increase height of container surrounding selected field */
  .chzn-container {
    height: 48px;
    font-size: 22px !important;
  }
  .chzn-container > a > span {
    font-size: 22px !important;
  }
  /* Increase font size of dropdown text in selected field */
  .chzn-drop {
    font-size: 22px !important;
  }

/* FA Icons */
  /* Increase size of Font Awesome icons */
  .icon .fa {
      font-size: 22px !important;
  }

/* Buttons */
  /* Increase size of search button */
  .kn-button.search {
    height: 48px;
  }
   /* Increase default menu button size */
  .kn-button
  {
    height: 48px !important;
    font-size: 22px !important;
  }

}/* End Mobile Styling */
```

### Active in these Applications

| Mobile Code | TDS | RPP | Data Tracker | Signs & Markings | Banners | ROW | DTS | HR | Finance | Parking Enterprise | VZA | SMO |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Submit Buttons | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| Form Labels | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| Form Fields | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| Screen Selections | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| FA Icons | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| File Buttons | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| Menu Buttons | No | Yes |  | Yes |  | No |  |  |  |  |  |  |
| Search Buttons | No | Yes |  | Yes |  | No |  |  |  |  |  |  |



