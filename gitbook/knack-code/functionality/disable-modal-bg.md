---
description: >-
  How to disable a modal background click/touch to prevent accidental modal
  close
---

# Disable Modal Background Click/Touch

![If we click/touch the black background the modal window stays open](../../.gitbook/assets/image%20%2857%29.png)

Often we use modals to present forms/applications in a way that makes sense. This code will allow us prevent intentional or accidental closure of modal windows by touching or clicking the black background layer around the modal window. This is especially useful when a form or page has a lot of user entry where data entry can be lost if the modal window is accidentally closed before submitting.

### The JS

```text
/***************************************************************/
/*** Disable the ability to Click/Touch outside a Modal Page ***/
/***************************************************************/
$(document).on('knack-scene-render.any', function(event, scene) {
    $('.kn-modal-bg').off('click');
});
```

### The CSS

None needed 😎

### How to Implement

No adjustments needed, copy pasta and you are set 👍

