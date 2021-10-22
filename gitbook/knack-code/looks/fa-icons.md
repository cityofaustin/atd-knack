---
description: How to insert and adjust Font Awesome Icon positioning
---

# Font Awesome Icons

![Map Marker Icon being used with a section title](<../../../.gitbook/assets/image (67).png>)

![Home Icon being set with the icon selector for a Menu or Parent page](<../../../.gitbook/assets/image (69).png>)

![Plus Circle Icon being set with the icon selector for a Menu view (button)](<../../../.gitbook/assets/image (68).png>)

Knack provides the Font Awesome 4 library as a way to incorporate icons into applications and help reinforce language and look of application elements such as menus or titles shown above.\
\
[Font Awesome 4.7 icons](https://fontawesome.com/v4.7.0/)

### The JS

None needed 😎

### The CSS

These stylings allow us to adjust the position of icons as rendered. For the most part, we use baseline which centers the icon vertically on the block line as shown in the examples above.

```
/****************************************/
/************* Icon Effects *************/
/****************************************/
.fa { vertical-align: baseline; }

.fa-bot { vertical-align: text-bottom; }

.fa-top { vertical-align: text-top; }
```

### The HTML

To incorporate icons into your text, trigger buttons, or custom buttons, you will need to add

```
<i class="fa fa-map-marker"></i>
```

fa is the CSS class being called above followed by the fa-icon-name

### How to Implement

Simply select the icon you want with the icon selector for menus and parent pages

![](<../../../.gitbook/assets/image (70).png>)

or place within your application next to text (or by themselves) in titles or buttons

![Placing the HTML in the View Title](<../../../.gitbook/assets/image (72).png>)

### To Note

* Knack provides only version 4.7 of the FA library currently. [Font Awesome Version 5 icons](https://fontawesome.com/icons?d=gallery\&p=2\&m=free) are available but not yet integrated with Knack.
* The New Knack Builder no longer renders markup on the builder side so you will want to double check that your HTML code is working and your icon is rendering on the live view.
