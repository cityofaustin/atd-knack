---
description: How to style back links into buttons
---

# Back Link Buttons

![a Back Link Button styled like other Knack buttons](../../.gitbook/assets/image%20%28152%29.png)

### The JS

None needed 😎

### The CSS

For each page with a back link

```text
#kn-scene_49 .kn-back-link { padding: 5px 10px; border-style: solid; border-width: 1px; border-color: #ebebeb; border-radius: 4px; 
  box-shadow: 0px 2px 4px 0px gray; font-size: 1.1em; background-color: #ebebeb; color: #163f6e; text-align: center; display: inline-block; }
#kn-scene_49 .kn-back-link:hover { opacity: 0.9; cursor: pointer; border-color: gray; }
```

This will additionally remove the link underline for all back links to give a better overall button look. It is best not to remove the link underline if you still plan on using back links instead of having buttons or [removing them completely](https://atd-dts.gitbook.io/atd-knack-operations/knack-code/functionality/remove-back-link). Only needs to be used once.

```text
a.ang-link:link {text-decoration: none;}
```

### How to Implement

Adjust the Scene IDs and you are set!

