---
description: https://github.com/cityofaustin/atd-knack/tree/master/code
---

# Code Version Control

### [Github Repo](https://github.com/cityofaustin/atd-knack/tree/master/code) - Knack Code

![Main code folder of the app code](<../../.gitbook/assets/image (4).png>)

### Copying the code from the TEST application

* From the Knack builder, copy the contents of the JS or CSS file that you have modified.

### Navigate to ATD-Knack [GitHub Repo](https://github.com/cityofaustin/atd-knack/tree/master/code)&#x20;

![Sub folder of data-tracker](<../../.gitbook/assets/image (3).png>)

* ATD-Knack [GitHub Repo](https://github.com/cityofaustin/atd-knack/tree/master/code) where all Knack app code is maintained.&#x20;
* **ATD-Knack**>**Code**>**App Name**>.css or .js file
  1. Click the "code" folder
  2. Select the app name you're working on (ex. sandbox-app)
  3. Select the "**.css**" or "**.js**" folder
  4. Click on the **pencil** icon at the top right of the page to edit the code

### Creating a Commit

* Replace the contents of the file with the new code version that you copied from the test application
* At the bottom of the page, write a descriptive **title **and **summary **of what changes you made, and why.

### Creating a branch from a commit

1. Choose the option **"**Create **a new branch **for this commit and start a pull request"
2. Give the new branch a meaningful name,&#x20;
   1. "name-issue ID-simple-title-of-change" - `dianamartin-6100-css-code-change-to-document`
3. Click **"Propose changes"**

### Creating a Pull Request

* A pull request is automatically created on the next screen, confirm your pull request by clicking the green **"Create pull request"** button.

### Assign a Reviewer

* Lastly, you should assign a reviewer to check your code.&#x20;
* On the right side of the page find the **cog **icon next to "**Reviewers",** and select one of your colleagues to review the code (preferably from your own team first, then Dev team)

{% hint style="info" %}
Post a slack on the "**atd-knack**" channel to see if one of your colleagues is available to review
{% endhint %}

![Example of a pull request with an assigned Reviewer](<../../.gitbook/assets/image (160).png>)

### Reviewing a Pull Request

You will receive an email from GitHub if you're assigned to review a pull request

![Example of email received when you've been assigned](<../../.gitbook/assets/image (157).png>)

### Approving Pull Request

* Navigate to the pull request
* Under the "Commit" tab, click the commit name to open
* Click the "**+**" sign beside the green highlighted code to "**Add a single comment**" or "**Start a review**"

![](<../../.gitbook/assets/image (159).png>)

* Once you're done reviewing, click the "**Finish your review**" button on the top right
* Enter in some comments, click "**Approve**" and click "**Submit review**"

![](<../../.gitbook/assets/image (161).png>)

{% hint style="warning" %}
Remember: Pull request authors can't "**Approve**" their own pull requests!
{% endhint %}

### Pull Request Approved - Add Code to Production

![Example of "Approved" pull request](<../../.gitbook/assets/image (175).png>)

* Wait for the pull request to be approved
* once it’s approved, copy/paste your code in the Knack TEST environment to PROD environment
* make sure the code is working

### Merging Branches

* Click "**Merge pull request**" to merge your changes to the master branch

![](<../../.gitbook/assets/image (166).png>)

* Will be prompted to "**Confirm merge**"



![](<../../.gitbook/assets/image (168).png>)

* You will see this next message that your pull request was successfully merged and closed

![](<../../.gitbook/assets/image (163).png>)

### Deleting Branches

1. Option 1: Click the "**Delete branch**" in the message prompt
2. Option 2: Navigate to main repo page "**atd-knack**"

![](<../../.gitbook/assets/image (172).png>)

* Beside the "master" drop down, click "**branches**"
* Find the branch you name and click the "Delete" icon

![](<../../.gitbook/assets/image (164).png>)



