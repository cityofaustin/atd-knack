---
description: How to remove the hyperlinked back link at the bottom of pages
---

# Remove Back Links

![Example Back Link](../../.gitbook/assets/image%20%28153%29.png)

There may be instances where this back link detracts from the user experience. One such example is within an multi-page application process where a user should not be able to navigate back or maybe a parent page you do not want users to access.

### The JS

None needed 😎

### The CSS

```text
#kn-scene_309 .kn-back-link {
  display: none;
}
```

### How to Implement

Adjust the Scene ID and you are set!

