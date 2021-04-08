# GitHub Code Workflow

Knack doesn't have an out-of-the-box way to version control the custom CSS and JS that can be added through the Knack builder interface. Therefore, DTS builders have designed the following workflow to version control this custom code using GitHub.

![](../.gitbook/assets/image%20%282%29.png)

### Knack Customizations for Devs

Recording of Dev meeting about [Knack Customization](https://web.microsoftstream.com/video/432459b0-f73d-489a-8643-17610a85aaad). Presentation slides [here](https://docs.google.com/presentation/d/1WoWDRBOJkGvFke940yJRs22hrcj8T5g8GQ8SXcpvB_s/edit).

## Collaboration Environment \(Dev & Apps\)

Make sure staging code matches staging branch - if not, someone has code that's not deployed

{% tabs %}
{% tab title="1st Step" %}
### Create feature branch off staging \(Dev\)

* Name branch: \(Initials\_Issue\#\_Feature\_description\)
* Test in test environment
* Then, Commit work

_**Commit messages**: are like change logs, says what the commit does, e.g. "**Add big button to home page**"_
{% endtab %}

{% tab title="2nd Step" %}
### Create pull request \(PR\) to staging, assign reviewers \(Dev\)
{% endtab %}

{% tab title="3rd Step" %}
### Review PR \(Apps\)

* Comment on PR
* Merge to Staging branch
{% endtab %}

{% tab title="4th Step" %}
### Copy Staging to Production environment \(Apps\)

* If code passes
* Open PR to merge Staging branch into Production branch
{% endtab %}

{% tab title="5th Step" %}
### Review PR \(Apps\)

* and Merge
{% endtab %}
{% endtabs %}

### 

