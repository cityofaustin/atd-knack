---
description: How to disable trigger buttons
---

# Disable Trigger Buttons

![Disabling a Submission Button](../../.gitbook/assets/image%20%2847%29%20%281%29.png)



### The JS

This allows us to disable the knack action link that makes these Knack trigger buttons clickable

```text
/****************************************************/
/*** Disable Trigger buttons from being Clickable ***/
/****************************************************/
$(document).on('knack-scene-render.any', function(event, view) {
  var $blockContainerButton = $(".block-container-disabled").parent();
  $blockContainerButton.removeClass("kn-action-link");
})
```



### The CSS

We create another block-container class here to give our disabled trigger buttons a different look from active block-container buttons. Notably, we set the border color and outline color to transparent so when a disabled button is selected, it does not bring attention to itself or shift content on the page by those few pixels. Additionally, we set the button to a lighter gray color and give it some opacity.

```text
.block-container-disabled {
  width: 25%;
  border-color: transparent;
  border-radius: 4px;
  background-color: #cbcbcb;
  color: white;
  padding: 10px 10px;
  font-size: 18px;
  text-align: center;
  opacity: 0.6;
  display: inline-block;
  outline-color: transparent;
}
```

For all the disabled buttons in the application, we will utilize this disabled button effect to change the cursor.

```text
.disabled { cursor: not-allowed; }
```

### How to Implement



{% tabs %}
{% tab title="1️⃣" %}
Create two separate Details views on a page, one for the Enabled button and the other for the Disabled button.

![](../../.gitbook/assets/image%20%2843%29%20%281%29%20%281%29.png)
{% endtab %}

{% tab title="2️⃣" %}
Select Trigger an action and select the pencil to edit the field on the right

![](../../.gitbook/assets/image%20%2849%29.png)
{% endtab %}

{% tab title="3️⃣" %}
At the top, there is a Link Text field where you will put the HTML to call the CSS Button class

![](../../.gitbook/assets/image%20%2848%29.png)
{% endtab %}

{% tab title="4️⃣" %}
We will customize this HTML with any FA icons, images, or text that we want to appear on the Trigger button. We call both of the CSS classes mentioned above.

```text
<button class="block-container-disabled disabled"><i class="fa fa-plus-circle"></i><strong> New Submission</strong></button>
```

For our other view, we simply do the same thing but use our regular enabled button classes. So that this view will only show the disabled button while the other will only show the enabled button. It is important they are separated for our last step.
{% endtab %}

{% tab title="5️⃣" %}
Lastly, we set page rules based on the specific criteria set by your app. In our current example, we use a Sum field for instance to see if any of our Submissions are set to 1 instead of 0 \(Binary Boolean\) by its Status. 

In this scenario we hide the Enabled button view if our Sum field is 1 or more so that only our Disabled button view will show.

![](../../.gitbook/assets/image%20%2844%29.png)
{% endtab %}
{% endtabs %}







