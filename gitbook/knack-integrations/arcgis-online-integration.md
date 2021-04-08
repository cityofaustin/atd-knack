# ArcGIS Online Integration

### Adding New Fields to an Existing ArcGIS Online Dataset

This doc describes the process for adding new fields to an existing ArcGIS dataset whose source is a Knack application. These integrations are powered by [`atd-knack-services`](https://github.com/cityofaustin/atd-knack-services) and are scheduled by Airflow.

In a nutshell, this process involves:

* Adding the new field to Knack API view that is the source for the integration
* Adding the new field to the AGOL feature service that will receive the data
* Asking a dev to manually trigger an ETL job to update the data in AGOL.

#### 1. Locate the API View

Locate the API view in the Knack application that serves as the source for the ArcGIS dataset. Each of our Knack applications will have a series of views \(aka, pages\) which we call "API Views" and are purpose-built for publishing data from Knack to external sources \(Socrata, ArcGIS Online, etc.\).

To locate the API view, review this [configuration file](https://github.com/cityofaustin/atd-knack-services/blob/production/services/config/knack.py) and locate the view ID for the dataset in question. This view ID will look something like this: `view_101`. You can use the [Knack Explorer](https://knack-explorer.austinmobility.io/) to search by this view ID and bring up the editing page in Knack builder.

#### 2. Field Naming

TL;DR: **The field names in Knack need to exactly match, except for capitalization, the field names in AGOL and Socrata**

In Knack parlance, field names are called "Labels". There are very few restrictions in Knack around how you can name a field. It can have spaces, numbers, mixed case, etc. This is because Knack maintains it's own unique field identifiers which you as a builder cannot modify, e.g. `field_101`, etc.

Crucially, we use the user-defined Knack field label as the field name in the downstream system. In Socrata, these field names are called the "API Field Names", and they must be lower case, with no spaces or special characters. In ArcGIS Online, these fields may be upper or lower case, with no spaces or special characters.

As such, the field "label" of any Knack field which is to be published to an external system should follow these same conventions.

#### 3. Update the Knack View

Once you've located the API view in the Knack builder, first verify \(1\) that the fields are named appropriately \(as described above\) and \(2\) if the columns you want to include in the destination dataset are already present in the view. If they fields are not present, add them. Otherwise, continue to the next step.

#### 4. Update ArcGIS Online Dataset

1. Login to [arcgis.com](https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=arcgisonline&display=default&response_type=token&state=%7B%22useLandingPage%22%3Atrue%7D&expiration=20160&locale=en-us&redirect_uri=https%3A%2F%2Fwww.arcgis.com%2Fhome%2Faccountswitcher-callback.html&force_login=true&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri) and navigate to the main page for the feature layer you wish to modify. Click on Data along the top of the page, then Fields at the top right. Check the existing fields to ensure the field\(s\) you wish to add are not already present in the feature layer. To add new fields, click on the + Add button in the top left corner of the page.
2. The Add Field window will open. Fill out the form as follows:
3. **Field Name:** this is the "API Field Name which should exactly match the Knack field label
4. **Display name:** can be the same as the Field Name or a human friendly field label, depending on the use of the feature layer
5. **Type:** choose the appropriate field type. For text fields, be sure to set the right character limit. You should err on the side of more characters. 
6. **Length:** choose the appropriate field length if the Type is a String
7. **Default Value:** this is an optional field to fill out
8. Click Add New Field to save your changes. The new field will appear at the bottom of the field list.

#### 5. Refresh the Dataset <a id="5-refresh-the-dataset"></a>

Ask a dev to manually run both the `metadata_to_postgrest` and `records_postgrest` scripts for this dataset, and let them know that the data needs to be fully refreshed. The dev should run the script by omitting the `--date` flag in run command.

