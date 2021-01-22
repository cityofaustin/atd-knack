---
description: >-
  This page documents the use of the Tasks functionality in Knack Builder to
  create officer assignment records.
---

# Use of Tasks

## Why create child records

1. **Purpose** - The purpose of creating child records for officer assignments is to make the workflow for officers self assigning assignments as smooth as possible and to avoid user error as much as possible.
2. **Relation between Objects** - In this instance, the assignment object is the parent object and the officer\_assignment object is the child object. 
3. **Number of Child Records** - For every assignment record that is created, related child records have to be created. The number of child records to be created is determined by the number of officers specified by the Scheduler. For example, if the scheduler specifies that she/he wants two officers to be part of the team for an assignment, two child records will need to be created. 
4. **Relevant Information** - The information that must be passed from the assignment record to the officer\_assignment record includes location, as well as date and time. 
5. **Changes to an Assignment** - Any changes that are made in the assignment record, especially pertaining to location and date-time, have to be passed along to the child record. If an officer has signed up for this assignment, the officer should receive a notification about any such changes. ****
6. **Cancelling an Assignment -** If an assignment record is deleted \(the scheduler cancels an assignment\) that should be reflected in the officer task list and calendar, the officer  who has signed up for that officer\_assignment should also receive a notification regarding the cancellation.

## **Why use  Tasks to create child records**

1. Vision Zero assignments are mostly scheduled through the calendar interface or batch copied from one month to another. The scheduler makes some changes to the batch-copied assignments as needed. In some cases,  assignments are cancelled.
2. The most accessible way to create child records is to use the Record Rules functionality in the Form widget.
3. The Form widget is associated with Pages, and batch creation of records does not Pages.
4. However since the Form widget is not used when creating batch records, and the Record Rules functionality is not available when using the Calendar interface to create new assignment records, this approach was not chosen.
5. The less accessible is to use Tasks associated with the object to create child records. 
6. The drawback with using Tasks is that child records are not immediately created, and the changes/ deletion of officer\_assignment child records records does not happen automatically.
7. In a way this is helpful, since time taken to process a form when the form is used to create child records can be tiresome.
8. Shifting the load to an after hours scheduled process can help alleviate that drawback.

## Process

1. In most cases, assignments have teams of two officers. In some cases, a team will be one officer. Signal Engineering assignments may have teams of five officers. 
2. Since a Task cannot reference a field in the object to determine how many child records to create, it can only create one child record at a time. 
3. To create multiple child records based on the field entry for ‘Number of Officers’ in the assignment object, 

   a. A Count field was added to the assignment object -  _Count of Child records_, which counts the number of child records associated with the parent record. 

   b. Two more fields were added to the officer\_assignment object

   1. _Add to My Assignments_ 
   2. _Child Record Number_.

4. The When parameters looked for how many child records were to be created, and how many child records were already created. 
5. When two child records needed to be created, two tasks are needed - 

   a. the first task will look for

   1. Number of Officers = 2
   2. Count of Child Records = 0
   3. It will then label the associated child record with a 2-1

   b. The second task will look for

   1. Number of Officers = 2
   2. Count of Child Records = 1
   3. It will then label the associated child record with a 2-2



   ![](https://lh5.googleusercontent.com/OIC_VIM9v4st5kbr5xOIqrqd6EKXkICgLfp754l-ZliFxZeY6lOwGeRdO2L5BRxNbKpPfS5cw7DFClSMMI8RVbuNCh6rpBBwn6gaRKIZ_46FJr9TSjEMV_7pIA_dbf9QsEfS_-21)

6. At this point the Count of Child Records = 2, and this can be used to check if the right number of child records have been created by comparing with the entry in the Number of Officers Required field.
7. For every child record that was created, the child record number is set to 1, 2-1, 2-2, 3-1, 3-2, 3-3…

![](https://lh5.googleusercontent.com/OIC_VIM9v4st5kbr5xOIqrqd6EKXkICgLfp754l-ZliFxZeY6lOwGeRdO2L5BRxNbKpPfS5cw7DFClSMMI8RVbuNCh6rpBBwn6gaRKIZ_46FJr9TSjEMV_7pIA_dbf9QsEfS_-21)

![](https://lh5.googleusercontent.com/DnxGFVxC7DpoSbcfE1J-S3adxAnHoMaQqEcrY1p8FpMsH1k1F0ZgwSqOq1ObhVINf6hXFCqQhJh7jRuyRWRtkQjSQoypSJ19P1bFzpgmS0p2RBklErTv457l6TPjJ7xpwJgJ5WTk)

