---
description: >-
  This page documents the use of the Tasks functionality in Knack Builder to
  send email notifications and reminders.
---

# Use of Tasks for Notifications

## Purpose 

The purpose of using tasks is to create notifications on an automated regular schedule to send reminders to officers on upcoming assignments and to send notifications in case changes are made in the assignments they have signed up for.

## Permissions

Only a Knack Builder / VZA System Administrator can create or edit Tasks.

## Notifications

The notification functionality available in tasks is used for the following reasons - 

### **1. Reminders to the officers** 

 ****Officers are sent two reminder emails,

a. The first one seven days prior to the assignment.

![](../.gitbook/assets/image%20%289%29.png)

b. The second one a day before the assignment. 

![](../.gitbook/assets/image%20%2811%29.png)

### **2. Changes to an Assignment**  

Any changes that are made in the assignment record, especially pertaining to location and date-time, have to be passed along to the child record. If an officer has signed up for this assignment, the officer should receive a notification about any such changes.

![](../.gitbook/assets/image%20%287%29.png)

### **3. Cancelling an Assignment** 

When the scheduler cancels an assignment, the connection between the parent and child is broken and the assignment date time in the officer\_assignment object is no longer populated. If an assignment record is deleted \(the scheduler cancels an assignment\) that should be reflected in the officer task list and calendar, the officer  who has signed up for that officer\_assignment should also receive a notification regarding the cancellation. ****

![](../.gitbook/assets/image%20%2823%29.png)

