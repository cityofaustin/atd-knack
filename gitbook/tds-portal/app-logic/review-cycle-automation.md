---
description: How to automate the review cycle number for each submission record
---

# Incrementing Review Cycle Automatically

### Incrementing Cycle Automatically

#### Required Fields in Parent Object \(TIA\_request\)

* Count - Number of Scope Submissions
* Count - Number of Submissions
* Equation - Increment Scope Cycle
* Equation - Increment Submission Cycle

#### Required Fields in Child Object \(TIA\_scope\_submission & TIA\_submission\)

* Text Formula - ScopeCycle
* Number - Scope Cycle
* Text Formula - SubmissionCycle
* Number - Submission Cycle

#### Incrementing the Count Field

```text
{Number of Scope Submissions} + 1
```

#### Pulling Cycle \# into Child Object Text Formula Field

```text
{TIA_scope_submission TIA_request.Increment Scope Cycle}
```

#### Set Number Field to Text Formula if Blank

![](../../.gitbook/assets/image%20%28231%29.png)

{% hint style="warning" %}
Be aware that duplicate cycle numbers can be created if a previous cycle is deleted, therefore reducing the count value.
{% endhint %}

