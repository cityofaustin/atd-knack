---
description: >-
  This page documents the use of the Tasks functionality in Knack Builder to
  create officer assignment records.
---

# Use of Tasks

## Create Child Records



1. **Purpose** - The purpose of creating child records for officer assignments is to make the workflow for officers self assigning assignments as smooth as possible and to avoid user error as much as possible.
2. **Relation between Objects** - In this instance, the assignment object is the parent object and the officer\_assignment object is the child object. 
3. **Number of Child Records** - For every assignment record that is created, related child records have to be created. The number of child records to be created is determined by the number of officers specified by the Scheduler. For example, if the scheduler specifies that she/he wants two officers to be part of the team for an assignment, two child records will need to be created. 
4. **Relevant Information** - The information that must be passed from the assignment record to the officer\_assignment record includes location, as well as date and time. 
5. **Changes to an Assignment** - Any changes that are made in the assignment record, especially pertaining to location and date-time, have to be passed along to the child record. If an officer has signed up for this assignment, the officer should receive a notification about any such changes. ****
6. **Cancelling an Assignment -** If an assignment record is deleted \(the scheduler cancels an assignment\) that should be reflected in the officer task list and calendar, the officer  who has signed up for that officer\_assignment should also receive a notification regarding the cancellation.

\*\*\*\*

