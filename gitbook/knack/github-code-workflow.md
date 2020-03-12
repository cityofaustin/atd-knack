# GitHub Code Workflow

Knack doesn't have an out-of-the-box way to version control the custom CSS and JS that can be added through the Knack builder interface. Consequently, DTS builders have designed the following workflow to version control this custom code using GitHub.

![](../.gitbook/assets/image%20%281%29.png)

## Collaboration environment \(Dev & Apps\)

Make sure staging code matches staging branch - if not, someone has code that's not deployed

### 1: Create feature branch off staging \(DEV\)

* Name branch: \(Initials\_Issue\#\_Feature\_description\)
* Test in test environment
* Then, Commit work

_**Commit messages**: are like change logs, says what the commit does, e.g. "**Add big button to home page**"_

### 2: Create pull request \(PR\) to staging, assign reviews \(DEV\)

### 3: Review PR \(APPS\)

* Comment on PR
* Merge to Staging branch

### 4: Copy Staging to Production environment \(APPS\)

* If code passes
* Open PR to merge Staging branch into Production branch

### 5: Review PR \(APPS\)

* and Merge 

_!! NEED DEV/APPS TO REVIEW THIS WORKFLOW AGAIN_ !!

