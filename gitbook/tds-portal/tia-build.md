---
description: Builder Information
---

# TIA | Traffic Impact Analysis

## WORKFLOW <a href="#workflow" id="workflow"></a>

*   Network File Location:&#x20;

    `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_TDSD_Unified_Comment_Tracker\module_TIA\workflow`

    * Workflow and Visio found here


* _TIA Module>workflow_ Google Drive: [`https://drive.google.com/drive/folders/13GdQBj5YNH0aNjw8GNNKOXXad_KZJBIn?usp=sharing`](https://drive.google.com/drive/folders/13GdQBj5YNH0aNjw8GNNKOXXad\_KZJBIn?usp=sharing)``
* Workflow: [`https://drive.google.com/file/d/1L7bUt_935nsjEAG0fpQ41yuYjxUxjzeM/view`](https://drive.google.com/file/d/1L7bUt\_935nsjEAG0fpQ41yuYjxUxjzeM/view)``

## Requester

*   Submits a TIA Review request

    Inputs:

    * **Requester Information**
      * Submitter Name
      * Phone
      * Email
    * **Project Information**
      * TIA Project locations (child records) - Minimum 1 location to be entered
      * Trips per day
    * **Request Information**
      * Project Name
      * Council District
      * Case Type
      * Zoning Case ID/Site Plan ID
      * TIA Needs
      * Comments/Instructions
      * Request for Meeting
      * Meeting Date
      * Describe Availability
    * **TIA Attachments**
      * Attachment Name
      * Attachment Type
      * Attachment
      * Attachment URL
    * **Review application**
      * Ability to review all information entered
    * **Confirmation**
      * Page that explains that your request was submitted and that it must be reviewed my TIA staff
    * EMAIL: Receive email notice of submission

## TIA Reviewer

* Request comes in as `Needs Review` status
* Reviews information entered by requester
* Mainly reviewing request attachments submitted
  * Form Determination form
  * TIA Draft Scope&#x20;
* Can add TIA Comment that is general or scope related
  * ability to email requester once Scope statuses are in:&#x20;
    * `In Review` --> TIA Request status: `In Review`
    * `Revision Required`  --> TIA Request status: `Awaiting Response`
    * `Approved` --> TIA Request status: `Awaiting Response`
* Once the scope has been finalized and Scope status is in `Approved` scope status
* Banner pops up to remind reviewer that Fees need to be paid

### OUTSIDE KNACK APPLICATION PROCESS:&#x20;

* Reviewer goes into AMANDA system, prepares invoice and sends to requester
* Requester goes into AMANDA ABC online portal to pay fees

### IN KNACK

* Requester changes `Fee Status` and added `Fee Paid Date`
* Requester can now click button to `Request Submission`
  * Generates email to requester
    * EMAIL: Requester receives email notice of Scope Approved and now can submit TIA submission
* TIA Review Status changes to `Pending Submittal`

## Back to Requester

* Email to requester has link TIA Request details (Public)
* Follows link in email to `Request Status`
* This will show the TIA Review record they submitted
  * Need to click on `+ New Submission` button
* New submission record is created
* Must fill out:
  * `Attachment Name`
  * `Attachment Type`
  * `Attachment`
  * `Attachment URL`
* Submit all attachments&#x20;
  * EMAIL: Reviewer receives an email notification that TIA submission attachments have been added

## Back to TIA Reviewer

* Reviewer reviews TIA submissions
* Can add TIA Submission Comment that is general or submission related
* Ability to email requester once Scope statuses are in:&#x20;
  * `In Progress`  --> TIA Request status: `In Review`
  * `Revision Required` --> TIA Submission status: `In Review`
    * Submit Comment memo to requester
    * EMAIL: Requester receives an email notification that TIA submission has a Comment memo&#x20;
  * `Completed` --> TIA Submission status: `In Review`
    * Submit Scope Approval memo to requester
    * EMAIL: Requester receives an email notification that TIA submission has been `Completed`
* Reviewer can create **Project Mitigation** records
  * `Mitigation Type`&#x20;
  * `Location`&#x20;
  * `Location ID`
  * `Improvement`&#x20;
  * `Recommendation Notes`
* Reviewer can edit **Project Mitigation** details to indicate **Mitigation Fees Paid**
* Reviewer can edit **TIA Request** and change the status to `Approved`
* Reviewer can edit **TIA Request** and change the status to `Withdrawn/Cancelled`at any time



