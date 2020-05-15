# ArcGIS Online Integration

### Adding New Fields to an Existing ArcGIS Online Datset

This doc describes the process for adding new fields to an existing Socrata dataset whose source is a Knack application.

#### 1. Locate the API View

Locate the API view in the Knack application that serves as the source for the Socrata dataset. Each of our Knack applications will have a series of views \(aka, pages\) which we call "API Views" and are purpose-built for publishing data from Knack to external sources \(Socrata, ArcGIS Online, etc.\).

If you're unsure which view is the source for a data set, you'll need a developer to review the ETL script which publishes the Knack data to the destination system. They will be able to confirm the page and scene which serves as the source.

The majority of our Socrata and AGOL publishing scripts live in the `atd-data-publshing` repo, and are defined in [this configuration file](https://github.com/cityofaustin/atd-data-publishing/blob/master/transportation-data-publishing/config/knack/config.py).

#### 2. Field Naming

Field naming: In Knack parlance, field names are called "Labels". There are very few restrictions in Knack around how you can name a field. It can have spaces, numbers, mixed case, etc. This is because Knack maintains it's own unique field identifiers which you as a builder cannot modify, e.g. `field_101`, etc.

Crucially, we use the user-defined Knack field label as the field name in the downstream system. In Socrata, these field names are called the "API Field Names", and they must be lower case, with no spaces or special characters. In ArcGIS Online, these fields may be upper or lower case, with no spaces or special characters.

As such, the field "label" of any Knack field which is to be published to an external system should follow these same conventions. Typically, we follow the practice of labeling these fields in upper case with an underscore in lieu of spaces.

_Our Knack &gt; Socrata publishing script will convert any Knack field name to lowercase to match Socrata's expected field format._

\_\_

#### 3. Update the Knack View

Once you've located the API view in the Knack builder, first verify \(1\) that the fields are named appropriately \(as described above\) and \(2\) if the columns you want to include in the destination dataset are already present in the view. If they fields are not present, add them. Otherwise, continue to the next step.

#### 4. Update ArcGIS Online Dataset

1. Login to [data.austintexas.gov ](https://data.austintexas.gov/)and navigate to the `Primer` page of the dataset you wish to modify. Scroll down to the`Columns in this Dataset`section and verify that the fields you wish to add are not present in the dataset. To add new fields, click on the blue `Edit`button in the top right corner of the Primer page.
2. Click on the button below `Review & Configure Data`. From the configuration editor, click the `Add Column` button. Fill out the form fields as follows:
3. **Display Name:** A human-friendly field label
4. **Field name:** this is the "API Field Name" which should exactly match the Knack field label \(_with the exception that value should be lower case. See note in step \#2._\)
5. **Description:** a detailed description of what values the field contains, the purpose it serves, etc.
6. **Source Column:** Select "No Source column"
7. **Type:** choose the appropriate field type.
8. Click `Save`to save your changes. Return to the Primer page, and click the blue `Update` button in the top-right of the page to publish the dataset changes.

#### 5. Refresh the Dataset <a id="5-refresh-the-dataset"></a>

In order to refresh the Socrata dataset with values for the new columns, a dev will need to manually run the dataset publishing script with a `--replace` command. Contact a dev for help.

