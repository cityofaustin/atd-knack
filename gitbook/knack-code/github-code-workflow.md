# GitHub Code Workflow

Knack doesn't have an out-of-the-box way to version control the custom CSS and JS that can be added through the Knack builder interface. Therefore, DTS builders have designed the following workflow to version control this custom code using GitHub.

![](<../../.gitbook/assets/image (2).png>)

### Knack Customizations for Devs

Recording of Dev meeting about [Knack Customization](https://web.microsoftstream.com/video/432459b0-f73d-489a-8643-17610a85aaad). Presentation slides [here](https://docs.google.com/presentation/d/1WoWDRBOJkGvFke940yJRs22hrcj8T5g8GQ8SXcpvB\_s/edit).

## Collaboration Environment (Dev & Apps)

Make sure staging code matches production branch - if not, someone has code that's not deployed

{% tabs %}
{% tab title="1st Step" %}
### Create feature branch off master branch

* Name branch: (Initials\_Issue#\_Feature\_description)
* Test in Knack test environment
* Commit changes to Github

_**Commit messages**: are like change logs, says what the commit does, e.g. "**Add big button to home page**"_
{% endtab %}

{% tab title="2nd Step" %}
### Create pull request (PR) to master branch

* Assign a reviewer
* Link the PR to an issue. See [Github docs](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).OncComment on PR
{% endtab %}

{% tab title="3rd Step" %}
Once code is reviewed:

* Copy code to Knack production environment
* Test it
* Merge pull request
{% endtab %}
{% endtabs %}

###
