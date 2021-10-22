---
description: How to style action triggers like Knack Buttons instead of a text link
---

# Trigger Buttons

![Before](<../../../.gitbook/assets/image (174).png>)

![As a Button](<../../../.gitbook/assets/image (170).png>)

### The CSS

We define the stylings below so they mimic the look of Knack menu buttons

```
/***************************************/
/*********** Trigger Buttons ***********/
/***************************************/
.trigger-button {
  border-style: solid;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px gray;
  background-color: #ebebeb;
  color: #163f6e;
  padding: 5px 10px;
  font-size: 1.1em;
  text-align: center;
  display: inline-block;
}

.trigger-button:hover {
  cursor: pointer;
  opacity: 0.9;
  border-color: gray;
}
```

### The HTML

We call the button class we have above, include an fa icon, and set the button label

```
<button class="trigger-button"><i class="fa fa-plus-square"></i> New Record</button>
```

### How to Implement

{% tabs %}
{% tab title="1️⃣" %}
Copy pasta the CSS. This styling will apply to all trigger buttons where you apply the html

```
.trigger-button {
  border-style: solid;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px gray;
  background-color: #ebebeb;
  color: #163f6e;
  padding: 5px 10px;
  font-size: 1.1em;
  text-align: center;
  display: inline-block;
}

.trigger-button:hover {
  cursor: pointer;
  opacity: 0.9;
  border-color: gray;
}
```
{% endtab %}

{% tab title="2️⃣" %}
Select the Trigger you want to update with html

![](<../../../.gitbook/assets/image (167).png>)

Use a `<button>` tag to set the button class

```
<button class="trigger-button">
```
{% endtab %}

{% tab title="3️⃣" %}
Set your fa icon

```
<i class="fa fa-plus-square"></i>
```
{% endtab %}

{% tab title="4️⃣" %}
Set your trigger text after your icon if not already present

```
New Record
```

Lastly, be sure to close your `<button>` tag

```
</button>
```
{% endtab %}
{% endtabs %}
