Create a Data Source Details / Management page for an API integration platform using ONLY components from the connected Government Design System library.

Do not create custom styles or components.  
Use DS layout, typography, badges, tables, tabs, alerts, buttons, and tooltips.

---

## Page Context
This page appears after a Data Source has been enrolled.  
It allows administrators to manage endpoints, security settings, and activity logs for that integration.

---

# Layout Structure

Use the standard DS Admin Layout with:

- Top navigation header
- Page container
- Tab navigation
- Card section for endpoint management

---

# Header Section

Include a breadcrumb or navigation link:

Back to Data Sources

Main Title:
Customer Management API

Subtitle:
Customer Relations

Metadata Row using DS badges or metadata components:

Status: Active (DS success badge)

API Version: v2.1.0

Base URL: https://api.example.com/v2

---

# Tabs Navigation (DS Tabs)

Create three tabs:

Endpoints  
Security  
Activity Logs  

Default active tab: Endpoints

---

# Endpoints Tab

Use a DS Card container titled:

Endpoints

Description:
Manage available endpoints for this data source.

Primary Action Button:
Add Endpoint

Use DS Primary Button component.

---

# Endpoint Table

Use DS Data Table component.

Columns:

Method  
Path  
Parameters  
Responses  
Status  
Actions

---

## Method Column

Display HTTP methods using DS Badge component.

Colors:

GET → success  
POST → primary  
PUT → warning  
DELETE → danger  

---

## Path Column

Display endpoint path text.

Example:
/api/v1/customers  
/api/v1/customers/{id}

---

## Parameters Column

Display clickable parameter count.

Example:
2 parameters

Clicking opens a DS Modal showing parameter details.

Modal table columns:

Parameter Name  
Type  
Location (query / path / header / body)  
Required

---

## Responses Column

Display response codes as DS small badges.

Examples:

200  
401  
500

---

## Status Column

Use DS Badge component.

States:

Active  
Inactive  
Failed

Failed state should include DS Tooltip explaining failure reason.

Example tooltip messages:

Authentication failed  
Endpoint unreachable  
Unexpected response code

---

## Actions Column

Use DS Icon Buttons with tooltips.

Actions:

Test Endpoint  
Edit Endpoint  
Disable Endpoint  
Delete Endpoint

Tooltips must display the action label.

Icons:

▶ Test Endpoint  
✏ Edit Endpoint  
⏻ Disable Endpoint  
🗑 Delete Endpoint

---

# Table Features

Enable row hover highlight.

Allow clicking a row to open a DS Modal displaying full endpoint details.

Modal contents:

Method  
Path  
Parameters list  
Response codes  
Description

---

# Pagination

Add DS Pagination component below the table.

Default page size: 10 endpoints.

Controls:

Previous  
Page numbers  
Next

---

# Security Tab

Display authentication configuration.

Section title:
Security Configuration

Fields displayed:

Authentication Type  
API Key Name  
Authorization Header  
Base URL

Include button:

Edit Security

Use DS Secondary Button.

---

# Activity Logs Tab

Display DS Data Table.

Columns:

Date  
Action  
Description

Example rows:

Feb 12 — Endpoint Tested — GET /api/v1/customers  
Feb 11 — Endpoint Updated — PUT /api/v1/customers/{id}  
Feb 10 — Data Source Created — API registered

---

# UX Behaviors

Add endpoint success banner using DS Alert component.

Type: Success

Message:
Endpoint successfully added.

Description:
The endpoint is now available and can be tested or edited.

Place alert above the endpoints table.

---

# Design Rules

Use only the connected Government Design System components.  
Follow DS spacing and typography tokens.  
Do not create custom UI styles.  
Ensure components are responsive and consistent with enterprise admin interfaces.