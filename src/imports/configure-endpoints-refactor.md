Refine the existing "Configure Endpoints" screen using ONLY components from the connected Government Design System.

Do not create new styles or components.
Use DS components for alerts, badges, table, buttons, pagination, and tooltips.

Keep the current layout and structure, but apply the following improvements.

--------------------------------

1. Validation Rule Alert

Add a DS Alert component above the endpoints table.

Type: Warning

Message:
"At least one endpoint must be successfully validated before enrolling the data source."

--------------------------------

2. Enroll Button Behavior

Update the "Enroll Data Source" button behavior.

Rules:
- Disabled if no endpoint has status "Validated"
- Enabled once at least one endpoint has status "Validated"

Show disabled button state using DS button component.

--------------------------------

3. Pagination

Add DS Pagination component under the endpoints table.

Pagination rules:
- Default page size: 10 endpoints
- Controls: Previous, Page Numbers, Next

--------------------------------

4. Parameter Details Interaction

Update the "Parameters" column behavior.

Make the parameter count clickable.

Example:
"3 parameters"

When clicked:
Open a DS Modal component displaying parameter details.

Modal contents:
Parameter Name
Type
Location (query / path / header / body)
Required (Yes / No)

--------------------------------

5. Endpoint Validation Feedback

Enhance the "Failed" endpoint status.

Add tooltip interaction on Failed badge.

Tooltip examples:
"Authentication failed"
"Endpoint not reachable"
"Unexpected response code"

Use DS Tooltip component.

--------------------------------

6. Action Icons

Ensure each action icon has DS Tooltip.

Icons:

Test Endpoint
Edit Endpoint
Delete Endpoint

Tooltip labels:
"Test Endpoint"
"Edit Endpoint"
"Delete Endpoint"

--------------------------------

7. Method Badge Consistency

Ensure HTTP methods use DS Badge component.

Colors:
GET → success
POST → primary
PUT → warning
DELETE → danger

--------------------------------

8. Table Interaction

Allow clicking the endpoint row to open a DS Modal showing full endpoint details:

Method
Path
Parameters
Response Codes
Description

--------------------------------

Maintain the current layout hierarchy:
Header
Stepper
Detected Endpoints section
Endpoints table
Footer actions