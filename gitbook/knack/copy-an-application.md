---
description: >-
  How to successfully set up a new Test Environment for an existing Knack
  application
---

# Copy an Application

* **Notify the Apps Team using the Slack channel `atd-knack.`**

<figure><img src="../.gitbook/assets/1_CopyApp (1).png" alt=""><figcaption></figcaption></figure>

* &#x20;**Log into Knack Builder using the Transportation Data Enterprise account (Knack Builder – Primary Account) using 1Password.**
* **Search for the application you want to copy.**

<figure><img src="../.gitbook/assets/3_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **From the gear icon dropdown, select Copy.**

<figure><img src="../.gitbook/assets/4_CoptApp.png" alt=""><figcaption></figcaption></figure>

* **Change the new app name and pause tasks (if applicable).**\
  Knack will automatically append Copy to the end of the name. Edit this out and use the format  PRODUCTION or TEST | DD MMM YYYY | \[APPLICATION NAME].

<figure><img src="../.gitbook/assets/5_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **An immediate confirmation will display.**&#x20;

<figure><img src="../.gitbook/assets/6_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **Copying the app will take time.** \
  Knack will send an email to the Transportation Data Enterprise account when done.\
  You may want to let the service desk primary know that you’re expecting the email confirmation from Knack.

<figure><img src="../.gitbook/assets/7_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **Add the new environment to the** [**DTS Portal listing of applications**](https://atd.knack.com/dts#applications)**.**  \
  Select the PRODUCTION environment you have copied and **Add Environment**. &#x20;

<figure><img src="../.gitbook/assets/8_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **Add the details about the new environment.**\
  To find the Application ID, go to the app > Settings > API and Code.

<figure><img src="../.gitbook/assets/9_CopyApp.png" alt=""><figcaption></figcaption></figure>

* **IF APPLICABLE: Delete the old environment from Knack and add Date Deleted to the DTS Portal record.**
