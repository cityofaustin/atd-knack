---
description: How to style the close button for modal windows
---

# Modal Close Styling

The default style of the modal close or delete notification button is not very visible. We improve its readability by overwriting some of the Knack CSS with our own.

![Knack styling, white x on light gray only slightly darker than modal header](<../../../.gitbook/assets/image (73).png>)

![We match the button color with the header text to increase clarity and contrast](<../../../.gitbook/assets/image (71).png>)

![For Knack Notification Messages we give a dark gray to match Knack page elements](<../../../.gitbook/assets/image (64).png>)

### The JS

None needed 😎

### The CSS

The `delete` applies to both buttons whereas the `close-modal` only applies to modal windows. The `before` and `after` are the two sticks that make the X. You will notice use `!important` for every element. Since Knack already defines these stylings, we need to be able to overwrite them with our own.

```
/****************************************/
/************ Button Effects ************/
/****************************************/
.delete { border: #adb5bd .2em !important; background-color: #adb5bd !important;}

.close-modal {border: #495057 !important; background-color: #495057 !important;}

.delete:before { background-color: white !important; width: 66% !important; 
    left: 44% !important; height: 3px !important; border-radius: 2px !important;}

.delete:after { background-color: white !important; width: 66% !important; 
    left: 44% !important; height: 3px !important; border-radius: 2px !important;}
```

### How to Implement

If the theme of your application has a different color set, you may want to adjust the colors for the border, background color, or the X color. Otherwise, copy pasta and you are set 👍

