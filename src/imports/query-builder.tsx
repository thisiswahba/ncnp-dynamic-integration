Create a Query Builder page using ONLY components from the connected Government Design System.

Do not create custom styles.

Page Header:
Title: Create Query  
Description: Define automated rules using connected data sources.

Form Section:

Query Name (text input)  
Description (textarea)  
Status (dropdown: Draft / Active)

---

Query Logic Builder

Create a DS Card titled Query Rules.

Allow adding multiple rule rows.

Each row contains:

Data Source (dropdown)  
Field (dropdown)  
Operator (dropdown)  
Value (text input)

Operators include:

=  
!=  
>  
<  
>=  
<=  
contains  

Allow grouping conditions with AND / OR.

Provide button:

+ Add Rule

---

Preview Section

DS Card titled Query Preview

Include button:

Run Query

Display table results:

Entity  
Result

Use DS badges:

PASS (success)  
FAIL (danger)

---

Footer Actions

Cancel  
Save Query  
Save & Activate

Use DS Button components.