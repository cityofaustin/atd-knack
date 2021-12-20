---
description: >-
  This page documents the use of the Tasks functionality in Knack Builder to
  create officer assignment records.
---

# Use Tasks for Creating Child Records

## Overview

1. **Purpose** - The purpose of creating child records for officer assignments is to make the workflow for officers self assigning assignments as smooth as possible and to avoid user error as much as possible.
2. **Relation between Objects** - In this instance, the assignment object is the parent object and the officer\_assignment object is the child object.&#x20;
3. **Number of Child Records** - For every assignment record that is created, related child records have to be created. The number of child records to be created is determined by the number of officers specified by the Scheduler. For example, if the scheduler specifies that she/he wants two officers to be part of the team for an assignment, two child records will need to be created.&#x20;
4. **Relevant Information** - The information that must be passed from the assignment record to the officer\_assignment record includes location, as well as date and time.&#x20;

## **Purpose of using Tasks to create child records**

1. Vision Zero assignments are mostly scheduled through the calendar interface or batch copied from one month to another. The scheduler makes some changes to the batch-copied assignments as needed. In some cases,  assignments are cancelled.
2. The most accessible way to create child records is to use the Record Rules functionality in the Form widget.
3. The Form widget is associated with Pages, and batch creation of records does not Pages.
4. However since the Form widget is not used when creating batch records, and the Record Rules functionality is not available when using the Calendar interface to create new assignment records, this approach was not chosen.
5. The less accessible is to use Tasks associated with the object to create child records.&#x20;
6. The drawback with using Tasks is that child records are not immediately created, and the changes/ deletion of officer\_assignment child records records does not happen automatically.
7. In a way this is helpful, since time taken to process a form when the form is used to create child records can be tiresome. Shifting the load to an after hours scheduled process can help alleviate that drawback.

## Permissions&#x20;

Only a Knack Builder / VZA System Administrator can create or edit Tasks.

## Process to create child records&#x20;

1. In most cases, assignments have teams of two officers. In some cases, a team will be one officer. Signal Engineering assignments may have teams of five officers.&#x20;
2. Since a Task cannot reference a field in the object to determine how many child records to create, it can only create one child record at a time.&#x20;
3.  To create multiple child records based on the field entry for ‘Number of Officers’ in the assignment object,&#x20;

    a. A Count field was added to the assignment object -  _Count of Child records_, which counts the number of child records associated with the parent record.&#x20;

    b. Two more fields were added to the officer\_assignment object

    1. _Add to My Assignments_&#x20;
    2. _Child Record Number_.
4. The When parameters looked for how many child records were to be created, and how many child records were already created.&#x20;
5.  When two child records needed to be created, two tasks are needed -&#x20;

    a. the first task will look for

    1. Number of Officers = 2
    2. Count of Child Records = 0
    3. It will then label the associated child record with a 2-1

    b. The second task will look for

    1. Number of Officers = 2
    2. Count of Child Records = 1
    3. It will then label the associated child record with a 2-2



    ![](https://lh5.googleusercontent.com/OIC\_VIM9v4st5kbr5xOIqrqd6EKXkICgLfp754l-ZliFxZeY6lOwGeRdO2L5BRxNbKpPfS5cw7DFClSMMI8RVbuNCh6rpBBwn6gaRKIZ\_46FJr9TSjEMV\_7pIA\_dbf9QsEfS\_-21)
6. At this point the Count of Child Records = 2, and this can be used to check if the right number of child records have been created by comparing with the entry in the Number of Officers Required field.
7. For every child record that was created, the child record number is set to 1, 2-1, 2-2, 3-1, 3-2, 3-3…

![](https://lh5.googleusercontent.com/DnxGFVxC7DpoSbcfE1J-S3adxAnHoMaQqEcrY1p8FpMsH1k1F0ZgwSqOq1ObhVINf6hXFCqQhJh7jRuyRWRtkQjSQoypSJ19P1bFzpgmS0p2RBklErTv457l6TPjJ7xpwJgJ5WTk)

## Changes in assignment details

When the scheduler makes changes to the assignment - location or date/time, these changes need to be reflected accurately in the officer-assignment child records. These changes were carried through when the child records were created using the Record Rules functionality in the Form widget. However, this does not happen with child records using Tasks, so a Task was created to look for any records that were modified and to carry over changes to associated child records.

To make sure associated changes are carried over to the child records, this task has been created - Modify Child Records. A screenshot of the parameters is included below.

![](https://lh5.googleusercontent.com/lMZYtpefivXaXKgwMHkVvhyE-n3DzCxtss-yLHlhpGlqqxhcWUM\_S8x5g-zYeGi\_03bO\_O9cfCSzX2tANQR7IgkpbVmMT150Gc8Vm0K-OKWKytCVHeCqmF914dbP\_K23pS4mTFoJ)

