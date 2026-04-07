Create the "Add Data Source" page using ONLY components from the connected Government Design System library.

Do not create custom styles or components.
Use DS layout, form fields, buttons, and stepper components.

Page layout:
Use the standard DS admin page layout with a page header and form card.

Page Header:
Title: Add Data Source
Description: Register a new external system API to enable automated queries and risk evaluation.

Stepper (DS Stepper Component):
Step 1: Data Source Details
Step 2: Endpoints Configuration

Current step: Step 1

Main Form Container:
Use a DS Card component.

Section 1 — Data Source Details

Fields:
System Name
- DS Text Input
- Required

Business Domain
- DS Select Dropdown
- Required

Security Key
- DS Password Input
- Required
- Masked field

Section 2 — API Configuration Method

Use DS Radio Group

Options:
Upload OpenAPI YAML
Manual Entry

Behavior:

If "Upload OpenAPI YAML" selected:
Show DS File Upload component
Label: Upload OpenAPI YAML file
Accepted formats: .yaml .yml

If "Manual Entry" selected:
Show additional DS inputs:

API Name (text input)
Base URL (text input)
API Version (text input)
Description (textarea optional)

Footer Actions (DS Button components):

Secondary Button:
Back

Primary Button:
Next

Next button behavior:
Disabled until all required fields are completed.