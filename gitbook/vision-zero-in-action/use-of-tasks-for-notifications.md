---
description: >-
  This page documents the use of the Tasks functionality in Knack Builder to
  send email notifications and reminders.
---

# Use Tasks for Notifications

## Purpose&#x20;

The purpose of using tasks is to create notifications on an automated regular schedule to send reminders to officers on upcoming assignments and to send notifications in case changes are made in the assignments they have signed up for.

## Permissions

Only a Knack Builder / VZA System Administrator can create or edit Tasks.

## Process

The notification functionality available in tasks is used for the following reasons -&#x20;

### **1. Reminders to the officers **

** **Officers are sent two reminder emails,

a. The first one seven days prior to the assignment.

![](<../../.gitbook/assets/image (9).png>)

b. The second one a day before the assignment.&#x20;

![](<../../.gitbook/assets/image (11).png>)

### **2. Changes to an Assignment** &#x20;

Any changes that are made in the assignment record, especially pertaining to location and date-time, have to be passed along to the child record. If an officer has signed up for this assignment, the officer should receive a notification about any such changes.

![](<../../.gitbook/assets/image (7).png>)

### **3. Cancelling an Assignment**&#x20;

When the scheduler cancels an assignment, the connection between the parent and child is broken and the assignment date time in the officer\_assignment object is no longer populated. If an assignment record is deleted (the scheduler cancels an assignment) that should be reflected in the officer task list and calendar, the officer  who has signed up for that officer\_assignment should also receive a notification regarding the cancellation.** **

![](<../../.gitbook/assets/image (23).png>)
