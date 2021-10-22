---
description: How to sum child object booleans to use for conditional logic
---

# Roll up Child Object Conditionals

#### Required Fields in Child Object

* Number - Status Boolean

{% hint style="info" %}
You will create a Number field for each Status you would like to roll up to the Parent Object
{% endhint %}

We add two conditional rules to each Number field to turn them functionally into Boolean fields. If the child status is that specific status, we set the field value to 1, otherwise it remains 0.

![Example of Scope Status Approved Boolean conditionals](<../../../.gitbook/assets/image (279).png>)

#### Required Fields in Parent Object

* Sum - Sum Child Object Status

{% hint style="info" %}
Again, we create a Sum field for each Child Status we are summing
{% endhint %}

We choose the corresponding child field to sum

![](<../../../.gitbook/assets/image (278).png>)

#### Utilizing these Fields

Now that we have these Number and Sum fields setup, we can use them for any logic rules in the app such as page rules, display rules, etc.

For the above example, when Scope Submission is Approved (greater than 0) we have a page rule that hides a trigger button view so that a customer can no longer submit any more scope submissions.

![](<../../../.gitbook/assets/image (277).png>)

{% hint style="info" %}
This is more elaborate than just adding actual Yes/No Boolean fields but regular Boolean fields do not allow us the flexibility to create conditional rules with them. Additionally, this method allows us to have multiple records with the same status and the Sum field will accurately reflect that whereas Yes's and No's cannot be summed.
{% endhint %}
