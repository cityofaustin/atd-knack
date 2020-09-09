# Sign up / Available Assignments (scene_208)

## Custom table and sign up buttons (view_466)

### Create API view for fetching `officer_assignments`

1. Add new page and title it "API views" and use the following settings

![Create API view](images/api_view.png)

2. In the `officer_assignments` table settings within the API view page, make sure the following columns are present in the table:

- Assigned Officers ID
- Assigned Officer
- Assignment Date Time
- Officer Assignment Date Time
- Location
- Time
- Officer Shift Label
- Date
- Send email action **(this column is setup in Step 4)**

![API view columns](images/api_view_columns.png)

3. In the `officer_assignments` table settings, add the following sort parameters in the "Data Source" tab. **These options are crucial for the custom JS to group `officer_assignments` together into Officer Shifts for the sign up buttons on the front end.**

![API view sorting](images/api_view_sorting.png)

4. In the `officer_assignments` table settings, add an action link by selecting: Columns > Links > Trigger an action. Use the following settings. The email title and body can be customized as needed with free text and `officer_assignment` fields specific to the record in the table.

![Action Link setup](images/action_link_setup.png)

![Action Link details](images/action_link_details.png)

### Update app-specific details in the custom JS

1. When adding this code to a new instance, the variables defined in the `appSpecifics` object must be updated. The `view` and `scene` for the API view can be found in the `officer_assignments` table settings within the API view page (in the url).

### Triggering the action links in the `officer_assignments` API view table

1. Within the custom JS, the action links can be triggered by sending a `PUT` request to the `officer_assignments` API view with the expected payload. **The `PUT` request endpoint URL must include the record id as shown below since this request triggers an email with details specific to a `officer_assignment` record.**

```
var putUrl =
    "https://api.knack.com/v1/pages/" +
    appSpecifics.apiTableScene +
    "/views/" +
    appSpecifics.apiTableView +
    "/records/";

// This payload was developed from observing the request and payload sent by Knack
// after clicking an action link added to an app view.

var payload = {
    action_link_index: 0,
    id: recordId
};

$.ajax({
    url: putUrl + recordId,
    type: "PUT",
    data: JSON.stringify(payload),
    headers: headers,
    success: function (res) {
        console.log(res);
    }
});
```
