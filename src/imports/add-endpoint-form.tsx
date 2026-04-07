Create an "Add Endpoint" form using ONLY components from the connected Government Design System.

Do not create custom components.

This form opens as a DS Modal or Side Panel from the Configure Endpoints screen.

Title:
Add Endpoint

Description:
Define a new API endpoint to connect to the data source.

Form Fields

HTTP Method
- DS Select dropdown
Options:
GET
POST
PUT
DELETE
PATCH

Endpoint Path
- DS Text Input
Placeholder:
/api/v1/resource

Description
- DS Textarea
Optional

Parameters Section

Allow adding multiple parameters.

Each parameter row contains:
Parameter Name (text input)
Type (dropdown: string, number, boolean, object)
Location (dropdown: query, path, header, body)
Required (toggle)

Button:
+ Add Parameter

Responses Section

Allow adding response codes.

Each response row contains:
Status Code (text input)
Description (text input)

Button:
+ Add Response

Footer Buttons

Cancel (DS Secondary Button)

Save Endpoint (DS Primary Button)