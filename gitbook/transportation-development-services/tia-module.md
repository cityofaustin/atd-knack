---
description: >-
  Traffic Impact Analysis module of the Transportation Development Services
  (TDS) Tracker
---

# TIA Module

## WORKFLOW <a id="workflow"></a>

* Network File Location: 

  `G:\ATD\ATD_GIS\02_ENT_APPLICATIONS\app_TDSD_Unified_Comment_Tracker\module_TIA\workflow`

  * Workflow and Visio found here

* _TIA Module&gt;workflow_ Google Drive: [`https://drive.google.com/drive/folders/13GdQBj5YNH0aNjw8GNNKOXXad_KZJBIn?usp=sharing`](https://drive.google.com/drive/folders/13GdQBj5YNH0aNjw8GNNKOXXad_KZJBIn?usp=sharing)\`\`

## Current State 7/23/20

### Internal Usability Testing

Lots of functionality has been built in the application and has been shown to the main stakeholders we are working with, but it hasn't been tested with other users. Tracy is supposed to set-up Usability Testing to confirm the features build out are accepted by the stakeholders. 

If you go into ZenHub and filter `TIA Module` then you will see all the feature issues in the `Review/QA`pipeline. 47 issues are waiting for user acceptance. 

I anticipate that Tracy will bring one of the App builders into this project, but I'm not certain.

### In Progress tasks to keep an eye on

* The last builder huddle meeting we had around TIA Mitigation Locations/mapping we talked about building out an ArcGIS Online \(AGOL\) web map/app. 
  * Using the Vision Zero \(VZ\) polygon layers 
* I got the polygon layer from Mateo
* I have the polygon layer to Jaime in a geojsn format
  * She's trying to convert it to ESRI geojson format, last I heard it wasn't converting
* Might need to check in on this to see how this is going 

### Backlog Features

There are some backlog features in the `Backlog` pipeline that have to do with the Migitation mapping, External Group Commenting and a few other things. Not sure if you'll have to work on any of it or we'll wait until Phase 2 to build out these features.

## Requester

* Submits a TIA Review request

  Inputs:

  * **Requester Information**
    * Submitter Name
    * Phone
    * Email
  * **Project Information**
    * TIA Project locations \(child records\) - Minimum 1 location to be entered
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
  * TIA Draft Scope 
* Can add TIA Comment that is general or scope related
  * ability to email requester once Scope statuses are in: 
    * `In Review` --&gt; TIA Request status: `In Review`
    * `Revision Required`  --&gt; TIA Request status: `Awaiting Response`
    * `Approved` --&gt; TIA Request status: `Awaiting Response`
* Once the scope has been finalized and Scope status is in `Approved` scope status
* Banner pops up to remind reviewer that Fees need to be paid

### OUTSIDE KNACK APPLICATION PROCESS: 

* Reviewer goes into AMANDA system, prepares invoice and sends to requester
* Requester goes into AMANDA ABC online portal to pay fees

### IN KNACK

* Requester changes `Fee Status` and added `Fee Paid Date`
* Requester can now click button to `Request Submission`
  * Generates email to requester
    * EMAIL: Requester receives email notice of Scope Approved and now can submit TIA submission
* TIA Review Status changes to `Pending Submittal`

## Back to Requester

* Email to requester has link TIA Request details \(Public\)
* Follows link in email to `Request Status`
* This will show the TIA Review record they submitted
  * Need to click on `+ New Submission` button
* New submission record is created
* Must fill out:
  * `Attachment Name`
  * `Attachment Type`
  * `Attachment`
  * `Attachment URL`
* Submit all attachments 
  * EMAIL: Reviewer receives an email notification that TIA submission attachments have been added

## Back to TIA Reviewer

* Reviewer reviews TIA submissions
* Can add TIA Submission Comment that is general or submission related
* Ability to email requester once Scope statuses are in: 
  * `In Progress`  --&gt; TIA Request status: `In Review`
  * `Revision Required` --&gt; TIA Submission status: `In Review`
    * Submit Comment memo to requester
    * EMAIL: Requester receives an email notification that TIA submission has a Comment memo 
  * `Completed` --&gt; TIA Submission status: `In Review`
    * Submit Scope Approval memo to requester
    * EMAIL: Requester receives an email notification that TIA submission has been `Completed`
* Reviewer can create **Project Mitigation** records
  * `Mitigation Type` 
  * `Location` 
  * `Location ID`
  * `Improvement` 
  * `Recommendation Notes`
* Reviewer can edit **Project Mitigation** details to indicate **Mitigation Fees Paid**
* Reviewer can edit **TIA Request** and change the status to `Approved`
* Reviewer can edit **TIA Request** and change the status to `Withdrawn/Cancelled`at any time





