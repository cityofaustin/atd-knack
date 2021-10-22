---
description: How to style back links into buttons
---

# Back Link Buttons

![Example Back Button](<../../../.gitbook/assets/image (199).png>)

### The JS

None needed 😎

### The CSS

For each page with a back link

```
#kn-scene_49 .kn-back-link { padding: 5px 10px; border-style: solid; border-width: 1px; border-color: #ebebeb; border-radius: 4px; 
  box-shadow: 0px 0px 0px 0px gray; font-size: 1.1em; background-color: #ebebeb; color: #163f6e; text-align: center; display: inline-block; }
#kn-scene_49 .kn-back-link:hover { opacity: 0.9; cursor: pointer; border-color: gray; }
```

This will additionally remove the link underline for all back links to give a better overall button look. It is best not to remove the link underline if you still plan on using back links instead of having buttons or [removing them completely](https://atd-dts.gitbook.io/atd-knack-operations/knack-code/functionality/remove-back-link). The below ang-link line only needs to be used once.

```
a.ang-link:link {text-decoration: none;}
```

### How to Implement

Adjust the Scene IDs and you are set!
