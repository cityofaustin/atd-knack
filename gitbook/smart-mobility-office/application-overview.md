# Application Overview

## About the Application

Smart Mobility Office application is primarily used for program tracking.

* MetroBike Employee Benefits - POC: Eliza Y.
* Project Tracking for Private sector organizations wishing to propose smart mobility projects - POC: Kat A.

## Key Features / Table of Contents

Has the ability to send custom emails to applicant for new MetroBike promo code membership instructions or renewal promo code instructions.&#x20;

## How to import promo codes

* Program Manager will email spreadsheet to Apps team
* Download spreadsheet
* Review spreadsheet, must have: "Promo Code" and "Expiration Date" included
* Will have to add several fields on the spreadsheet:&#x20;
  * "Type" field to spreadsheet to indicate "ALL" as the universal code that can be assigned to any department and email tenant
  * Add field `Promo Code Status` - and set all records to "Available"
  * Added field `Created_Date` - and set to the date of import
* Create backup copy of `promo_codes_bike_share_benefits` table
* Field match field headings
* Import spreadsheet
* Check table records on back end and front end
* Let Program Manager know that records have been imported

