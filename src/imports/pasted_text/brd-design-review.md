Review the current design file and ensure that all user flows and screens required by the BRD are fully covered.

Use only components from the connected Government Design System and maintain the existing layout style and RTL support where applicable.

---

# Step 1 — Audit Existing Screens

Analyze the current frames and map them to the following modules:

Data Sources Module  
Query Builder Module  
Query Execution Module  
Audit / Logs Module  

Identify which required screens already exist and which ones are missing.

---

# Step 2 — Ensure These Screens Exist

## Data Sources Module
Ensure the following screens are present:

Data Sources List  
Add Data Source — Step 1  
Add Data Source — Step 2  
Configure Endpoints  
Add Endpoint  
Edit Endpoint  
Test Endpoint  
Enroll Data Source  
Data Source Details  

Inside Data Source Details ensure tabs exist:

Endpoints  
Security  
Activity Logs  

If Security and Activity Logs are missing, generate them using DS components.

---

## Query Builder Module

Ensure the following screens exist:

Queries List  
Create Query  
Query Rules Builder  
Query Details  

Queries List should include:

Query Name  
Connected Data Sources  
Status  
Last Updated  
Actions

Actions:

View  
Edit  
Activate / Deactivate  
Delete

---

## Query Execution Module

Create screens for running and reviewing queries:

Query Preview / Run Query  

Include:

Run Query button  
Results table showing:

Entity  
Result  
Data Source  

Use DS badges:

PASS  
FAIL

---

## Query Result History

Create a screen:

Execution History

Table columns:

Execution Date  
Query Name  
Results Count  
Execution Status  

Add button:

View Results

---

## Execution Result Details

Create a detailed results page showing:

Entity  
Evaluation Result  
Source Data  
Value

Highlight PASS / FAIL using DS badges.

---

# Step 3 — System Feedback

Add DS alerts and banners for the following events:

Endpoint Added Successfully  
Endpoint Validation Failed  
Query Saved  
Query Activated  
Query Executed Successfully  

---

# Step 4 — Design Consistency

Ensure:

Only Government Design System components are used.  
Tables support pagination.  
Forms follow DS spacing and typography tokens.  
All screens maintain consistent layout and navigation.

---

If any required BRD screen is missing, generate the missing frame and add it to the design file in the correct module section.