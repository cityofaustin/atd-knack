# Knack &lt;--&gt; ArcGIS Online Integration

### Adding New Fields to an Existing ArcGIS Online Dataset

This doc describes the process for adding new fields to an existing ArcGIS dataset whose source is a Knack application.

#### 1. Locate the API View

Locate the API view in the Knack application that serves as the source for the ArcGIS dataset. Each of our Knack applications will have a series of views \(aka, pages\) which we call "API Views" and are purpose-built for publishing data from Knack to external sources \(Socrata, ArcGIS Online, etc.\).

If you're unsure which view is the source for a data set, you'll need a developer to review the ETL script which publishes the Knack data to the destination system. They will be able to confirm the page and scene which serves as the source.

The majority of our Socrata and AGOL publishing scripts live in the `atd-data-publshing` repo, and are defined in [this configuration file](https://github.com/cityofaustin/atd-data-publishing/blob/master/transportation-data-publishing/config/knack/config.py).

#### 2. Field Naming

Field naming: In Knack parlance, field names are called "Labels". There are very few restrictions in Knack around how you can name a field. It can have spaces, numbers, mixed case, etc. This is because Knack maintains it's own unique field identifiers which you as a builder cannot modify, e.g. `field_101`, etc.

Crucially, we use the user-defined Knack field label as the field name in the downstream system. In Socrata, these field names are called the "API Field Names", and they must be lower case, with no spaces or special characters. In ArcGIS Online, these fields may be upper or lower case, with no spaces or special characters.

As such, the field "label" of any Knack field which is to be published to an external system should follow these same conventions. Typically, we follow the practice of labeling these fields in upper case with an underscore in lieu of spaces.

_Our Knack &gt;_ ArcGIS _publishing script will convert any Knack field name to lowercase to match ArcGIS Online's expected field format._

#### 3. Update the Knack View

Once you've located the API view in the Knack builder, first verify \(1\) that the fields are named appropriately \(as described above\) and \(2\) if the columns you want to include in the destination dataset are already present in the view. If they fields are not present, add them. Otherwise, continue to the next step.

#### 4. Update ArcGIS Online Dataset

1. Login to [arcgis.com](https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=arcgisonline&display=default&response_type=token&state=%7B%22useLandingPage%22%3Atrue%7D&expiration=20160&locale=en-us&redirect_uri=https%3A%2F%2Fwww.arcgis.com%2Fhome%2Faccountswitcher-callback.html&force_login=true&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri) and navigate to the main page for the feature layer you wish to modify. Click on Data along the top of the page, then Fields at the top right. Check the existing fields to ensure the field\(s\) you wish to add are not already present in the feature layer. To add new fields, click on the + Add button in the top left corner of the page.
2. The Add Field window will open. Fill out the form as follows:
3. **Field Name:** this is the "API Field Name which should exactly match the Knack field label
4. **Display name:** can be the same as the Field Name or a human friendly field label, depending on the use of the feature layer
5. **Type:** choose the appropriate field type
6. **Length:** choose the appropriate field length if the Type is a String
7. **Default Value:** this is an optional field to fill out
8. Click Add New Field to save your changes. The new field will appear at the bottom of the field list.

#### 5. Refresh the Dataset <a id="5-refresh-the-dataset"></a>

In order to refresh the AGOL dataset with values for the new columns, you should run a batch update in the Knack builder to set the modified date of all records to the current date. This will cause the integration script to update the destination datasets the next time it runs.

If the dataset contains more than ~2k rows, ask a dev to manually run the dataset publishing script with a `--replace` command. Contact a dev for help.

