="58241"}
Refine the Create Query (إنشاء استعلام) screen using ONLY components from the connected Government Design System.

Do not create new custom styles or components.  
Use DS form inputs, dropdowns, buttons, alerts, and layout tokens.

Maintain RTL layout and Arabic labels.

---

# Page Goal

This page allows administrators to define query rules using connected data sources.

Each rule consists of:

Data Source → Field → Operator → Value

Rules can be combined with AND / OR logic.

---

# Section 1 — Query Information

Use a DS Card component.

Title:
معلومات الاستعلام

Fields:

اسم الاستعلام (Text Input)

الوصف (Textarea)

الحالة (Dropdown)
Options:
مسودة
نشط

Arrange fields in a two column responsive layout.

---

# Section 2 — Query Rules

Use a DS Card component.

Title:
قواعد الاستعلام

Description:
أضف شروط متعددة لتحديد منطق الاستعلام.

---

# Rule Builder Layout

Each rule should appear as a single horizontal rule block with aligned inputs.

Structure:

[ مصدر البيانات ] [ الحقل ] [ المعامل ] [ القيمة ] [ حذف ]

Components:

مصدر البيانات  
Dropdown listing connected APIs

الحقل  
Dropdown populated dynamically based on selected data source

المعامل  
Dropdown containing operators

Operators:

=  
≠  
>  
<  
≥  
≤  
يحتوي على

القيمة  
Text input or numeric input depending on field type

حذف  
Icon button

---

# Visual Rule Container

Wrap each rule row inside a DS subtle container or bordered block to visually group the rule.

Spacing between rule blocks should be consistent.

---

# Logical Connector

Between rules display a DS dropdown connector.

Options:

و (AND)  
أو (OR)

Center this connector visually between rule blocks.

---

# Add Rule Action

Below the rules section include a DS Secondary Button:

+ إضافة شرط

Clicking this adds a new rule row.

---

# Rule Interaction

Allow multiple rules to be added dynamically.

Example layout:

Rule 1  
[ مصدر البيانات ] [ الحقل ] [ المعامل ] [ القيمة ]

و (AND)

Rule 2  
[ مصدر البيانات ] [ الحقل ] [ المعامل ] [ القيمة ]

---

# Footer Actions

Add footer buttons aligned to page edge.

Secondary Button:
إلغاء

Primary Button:
حفظ الاستعلام

Optional Primary Button:
حفظ وتفعيل

---

# UX Improvements

Ensure rule inputs align horizontally and have consistent widths.

Make dropdowns visually equal height.

Reduce excessive whitespace in the rule area.

Add subtle separators between rule blocks.

---

# Design Rules

Use only the Government Design System components.

Maintain RTL layout and Arabic interface.

Ensure spacing, typography, and form controls follow D