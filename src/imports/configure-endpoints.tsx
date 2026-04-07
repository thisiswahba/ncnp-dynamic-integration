Create Step 2 of the "Add Data Source" flow using ONLY components from the connected Government Design System library.

Do not create custom components or styles.
Use DS components for layout, table, buttons, badges, alerts, and pagination.

Page Header:
Title: Configure Endpoints
Description: Review and validate API endpoints before enrolling the data source.

Stepper (DS Stepper Component):
Step 1: Data Source Details (completed)
Step 2: Endpoints Configuration (current step)

Main Layout:
Use a DS Card container.

Section Title:
Detected Endpoints

Description:
The system has extracted endpoints from the uploaded API specification. Review and validate each endpoint before enrollment.

Endpoints Table (DS Table Component)

Columns:
Method
Path
Parameters
Responses
Status
Actions

Column behavior:

Method
- Show HTTP method badge (GET, POST)

Path
- Text value of endpoint path

Parameters
- Display number of parameters
- Clicking opens parameter details modal

Responses
- Display response codes summary (e.g. 200, 404)

Status
- Use DS Badge component
Values:
Not Tested
Validated
Failed

Actions column:
Use DS Icon Buttons or Action Menu

Available actions:
Test Endpoint
Edit Endpoint
Delete Endpoint

Row interaction:
Clicking Test Endpoint triggers endpoint validation.

Add Endpoint Action:
Place a DS Secondary Button above the table:
Label: Add Endpoint
This opens an endpoint creation form.

Pagination:
Use DS Pagination component under the table.

Validation Notice:
Use DS Alert component above the table.

Message:
At least one endpoint must pass validation before enrollment is allowed.

Footer Actions:

Left:
Back button (DS Secondary Button)

Right:
Enroll Data Source (DS Primary Button)

Behavior:
Enroll button is disabled until at least one endpoint has status "Validated".