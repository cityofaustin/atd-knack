# Page Rules \(TMC\) Transportation Management Center \(AMD CSR\)

Knack back end:  
 **Pages**  


TMC&gt;Details  
 **Page rules:** [https://builder.knack.com/atd/amd\#pages/scene\_428/rules](https://builder.knack.com/atd/amd#pages/scene_428/rules)

\*\*This page has 14 rules. \*\*

| \# | Rule Details |
| :--- | :--- |
| 1 | When `COUNT_FLEX_NOTES` is `0` Action `Hide Views`  Views `Show flex notes menu` |
| 2 | When `CSR_Y_VALUE` is `blank`  Action `Hide Views`  Views `IFRAME - DO NOT MODIFY rich_text` |
| 3 | When `ASSET_ATTACHED` is `No`  Action `Hide Views`  Views:  \* `Add tmc_activity form` \* `Add work_order form` |
| 4 | When `ISSUE_STATUS_DESC` is `NOT` `Closed (Resolved)`  When `ISSUE_STATUS_DESC` is `NOT` `Closed (Duplicate)`  Action `Hide Views`  Views `Re-Open Menu menu` |
| 5 | When `CSR_Y_VALUE` is `0`  Action `Hide Views`  Views `IFRAME - DO NOT MODIFY rich_text` |
| 6 | When `ASSET_ATTACHED` is `No`  Action `Show a message`  Message \(Warning\) `This issue does not have an asset identified` |
| 7 | When `ASSET_ATTACHED` is `Yes`  Action `Hide Views`  Views `Assign Asset form` |
| 8 | When `Accounts > User Roles` `does not contain` `Program Editor`  `Accounts > User Roles` `does not contain` "Technician \| AMD"  `Accounts > User Roles` `does not contain` "Supervisor \| AMD"  Action `Hide Views`  Views: \* `Re-Open Menu menu`  \* `Assign Asset form`  \* `Add tmc_activity form` \* `Add work_order form` |
| 9 | When `ISSUE_STATUS_CODE` is `closed_resolved` Action `Hide Views`  Views `Add tmc_activity form` `Add work_order form` |
| 10 | When `ISSUE_STATUS_CODE` is `closed_duplicate`  Action `Hide Views`  Views: \* `Assign Asset form` \* `Add work_order form` |
| 11 | When `ISSUE_STATUS_CODE` is `closed_resolved`  Action `Hide Views`  Views `Assign Asset form` |
| 12 | When `ISSUE_STATUS_CODE` is `closed_duplicate`  Action `Hide Views`  Views `Assign Asset form` |
| 13 | When `ISSUE_STATUS_CODE` is `closed_311_feedback`  Action `Hide Views`  Views `Re-Open Menu menu` |
| 14 | When `Accounts > User Roles` `does not contain` `System Administrator`  Action `Hide Views`  Views `ASSIGN ASSET - api form` |

