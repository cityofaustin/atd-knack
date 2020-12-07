---
description: >-
  The process to batch copy Vision Zero assignments from one month to another is
  documented below.
---

# Batch Copy Process for VZA Assignments

##  Purpose 

To copy a batch of assignments from one month to another. This helps cut down on repetitive form entry and saves time.

## Permission

Only a VZA System Administrator /Knack Builder can carry out this process.

## Process 1

1 \) Open the Assignments object in Records View in the app

![](https://lh3.googleusercontent.com/ER-fwo6369NFuztrX94iomEAMloZqwcqs1-a_cHxUFQqQdBMcUdjUezIgKAKuAO0VFChM_LhnADyu6AkDs1RCw_3nfbs6AcEfE4bVQJ4K_BJxTISkEQekjtRQQ4d9d9EYhpxcb5Z)

2 \) Exports all records as CSV to create a backup.

![](https://lh3.googleusercontent.com/Hp8zTk-c8ppMkvFCFrM_7oyFHinwxQ5274fe3TxDTwDLzGQ0MX3w6caMmaCs49dUag4lsNMbqpIMxFj0rTNmgXBYS5SRFMHgiSJfAWjehf7X8YfJWm_5z1khA9rW2aosm7iz4G7s)

3 \) Filter assignments for a week \(Monday through Sunday\) using the Assignment Date Time field.

![](https://lh5.googleusercontent.com/rAFuGD_738wxqDo3qaJNk2Uo-Izp311hwChrrlgDsiaC4SEMRwtLNfFB1dOc2mn2d_Qh7tfsbdo1ohbHufRM9XAnVZVaBf2Kvoe5F8LMdpwtSxyEd761ca6tZrKWogmlm8zaazPt)

4 \) Export records to CSV.

![](https://lh6.googleusercontent.com/tHdFWwyxY4ksdjmThRCfP4-KxUCcxmtelhBQ932su3j7cvMQzxE756BSVHL5a566_HogPt-bcPuSiCnwjNqTgZRjPaNyTe4BGgs6K9ehkUrm5uKeDVHumqS6lRF4Fn7uvKcMo27g)

5 \) Open CSV in Excel

6 \) Look for the highest Assignment ID in the Knack assignment object. 

![](https://lh4.googleusercontent.com/NBmn1HHM8iIYZm2ixmbVx1U0DX6X2e6iYwuj3vB1DiRSx25BfGi5_Xc4eVSmUN3in4oYH3RSN71Y9aYudgtFfYXXNYDHoYXDBADMxHyTstmuZ2h2IrrldV7cn7oxODgs7NqdxHOg)

7 \) Number Assignment IDs in the CSV in a series starting from \(Highest Knack Assignment ID +1\).

![](https://lh4.googleusercontent.com/NHPUyEkpNK8B_7aQ7I7Mj0MaTLUmlhcxuKKCn7r8Dd5EuFwkb5_tOjyPOTb6-AG4eO49zunxHU0naKTr_BL6uJfr5Ek46XEpx690C59v_lEVi2VJehfn0ptvVDa-6WMr_ejnB5Nk)

![](https://lh5.googleusercontent.com/fqsDsHfNMW072OTG7z-zR0WVrv_VxgZFbb0RyAovT25zY0HMWVIZtl9A-jJNKJlTPsAtJ3NlBPT7qmmMhtr7Qf5NgIf2zK1vrWPrQSOyRsri5IOOpgZlJPpVIqFB9A5MmcXySjPo)

8 \) Replace the dates in the Assignment Date Time field with dates for the next batch. 

![](https://lh3.googleusercontent.com/ngZC47DUYlYM7Jl4mpvP_ftTgqFXac-VpHmWbVCIH_5joowdcvDuj4E74cLMis4V8hmQ-GnQcIhiFgJCEH6k9zuvawXluQzZNtKTQvxzQdnBt4IBGUEF6EdsiEDUhK5MGdbAAmLi)

![](https://lh5.googleusercontent.com/Cyu35bieavPvYMBHiHCSEY1-GlEavbhYd3y0KivkZM5-RhbuGZKElKkT4sTZ9hUwXAiR6AE4l_U1c1NjowW_rRUVncMxOWR73CmXPQwkLDHJj2Dcktujxo1Fztpxjn_SLEJ3Ub5F)

9 \) Import the CSV for a week into the Assignments object by clicking on Import in the Assignments object Records view. 

![](https://lh6.googleusercontent.com/FNwDOO_AOFOxnjn2yASkks6X6o62Mg5CPVxmDUn7C166fHV-8g7UzQmR6sTlTvAid_1bBeyNpHeNOqREiD-V-UJhCiNrzHwy2LRp6lksh7lET4U9gJmVr1TSyqq_umz0GrbL7rtU)

10 \) Click Upload CSV and navigate to the CSV you modified earlier.

![](https://lh6.googleusercontent.com/Sm3p6wP-A-GWMWXeHuJKHNry3yRQTou8_uJU0rsWFY7xS9Zo6MFlQ3dOSnOiZiaZe3xPL5dw8m0xiOYrooL7XkJ2UDLZKxSCtyiDE5gpPnkPfhORS9tCGizQ8wt18N9J1klGoLjZ)

11 \) For _Does the CSV have a row at the top with a name for each column?_ Choose - Yes, the headers are on Row 1

![](https://lh3.googleusercontent.com/LP6xYQ0lo0Gsug9o1MTC5gtWquvBCX-c0CvRLd3hWbASDDAld-IXiiSuD8-_yXo5g3YPzMAmkCu3l4_sYwOIstrKrNTfzWjKGHULJSyNISKB6rrA69UJU-nfXXJlKmWEqgfVrTf-)

12 \) For Select a field to match Records - Choose Assignment ID

![](https://lh3.googleusercontent.com/LP6xYQ0lo0Gsug9o1MTC5gtWquvBCX-c0CvRLd3hWbASDDAld-IXiiSuD8-_yXo5g3YPzMAmkCu3l4_sYwOIstrKrNTfzWjKGHULJSyNISKB6rrA69UJU-nfXXJlKmWEqgfVrTf-)

13 \) Click Next

14 \) The Assignment ID will be checked. 

![](https://lh5.googleusercontent.com/TnGriKInvoA0RofmGKumZGs3A56ylhmwVvhmvl4UKglPTFFdPLCnWjZIiOaQoQm4Y18V-fSS4RKcONKZvESB1nLzoMwXKH_fQcK-9gvWnuf1P01oMRFxLYmXNw2YSx1rT0-y7Ic7)

15 \) Click Next

![](https://lh6.googleusercontent.com/JEGBhgEdZklNmu5n3pLQ4d6gngBrjfK3EVc-2ifvFpXllGnwFkadfxYcNVtdd9NwimixcDcmKg0g0WD-K57zA0jBGX5Tb2EuPGC7KUnVHprePffGZZJ2EwE4m71n6T5yBnU9uy0M)

![](https://lh3.googleusercontent.com/NK3m1Q3VYWbkthW3Smn5Mjp-TdmybH6Hl9PE2z8HpbIesWR81GNtX7niZrzt5zDYKIFhzpRnw1HQLr43iRUHNaeg-d1DnXPt1HgHitrVfoBl0A9YAAqYzAaLIPyg932Uzk6T7BG_)

16 \) Exclude all calculated fields - text formulas, equations and conditional fields.

17 \) Exclude Additional Information and Additional Information URL \(since this is field which needs an uploaded file\).

18 \) Click Next

19 \) Fill out Field Defaults for Created By and Created Date. 

![](https://lh4.googleusercontent.com/ql0Svb-b5PtVOx3ZfdoekIgJE8x3FvVvPLH1eX46jQoANLfFJfz1KZXPZHE1T155KLGkD5zfI7jSQkNpjszf4d-xo2uTR46k1l_oNT08G-ONJKL3pkVCEBmyhuITyBbFMgFI81Tq)

20 \) Click Next. The records will be imported into the object. 

![](https://lh4.googleusercontent.com/l2FdRI9Is9AawPsUDqVJphIOSKARG4f-pzqDuzOL_27bdTQKjzhcrPZmMuZ93u-2rThkFndnS_D7kw11ijyil1Irh5lYU0f6Bbmcm-FXHifWRzzhvLbrTGZU_3wQ14BcjW8fLZH9)

21 \) Confirm the records have been imported by checking Assignment IDs and the Calendar. 

## Check - QAQC

These fields need to be populated for the next steps in the process to work. In Knack Builder, check to make sure non of these fields are blank.

1. Assignment Date and Time
2. Shift - Morning, Afternoon, Evening
3. Team Number - Team 1, Team 2, Team 3
4. Location
5. APD Sector 



