Create the remaining Query Management module screens for the platform using ONLY components from the connected Government Design System.

Do not create custom UI styles or components.  
Use DS tables, cards, forms, tabs, alerts, pagination, badges, buttons, and modals.  
Maintain RTL layout and Arabic labels.

The goal is to complete the Query lifecycle after query creation.

---

# Screen 1 — Queries List

Page Title:
الاستعلامات

Description:
إدارة الاستعلامات الآلية المبنية باستخدام مصادر البيانات المتصلة.

Primary Button:
+ إنشاء استعلام

Use DS Data Table.

Columns:

اسم الاستعلام  
مصادر البيانات  
الحالة  
آخر تحديث  
الإجراءات

Status badges:

نشط  
مسودة  
معطل

Actions (icon buttons with tooltips):

عرض  
تعديل  
تفعيل / تعطيل  
حذف

Add search field above table:

Placeholder:
البحث في الاستعلامات

Add pagination under table.

---

# Screen 2 — Query Details

Page Title:
تفاصيل الاستعلام

Show metadata section:

اسم الاستعلام  
الوصف  
الحالة  
تاريخ الإنشاء  
آخر تنفيذ

Use DS Card.

Section:
قواعد الاستعلام

Display the rules in readable format:

مصدر البيانات  
الحقل  
المعامل  
القيمة

Example layout:

[ Finance API ] [ outstanding_balance ] [ > ] [ 100000 ]

AND

[ Vendor Registry ] [ status ] [ = ] [ Active ]

Buttons:

تعديل الاستعلام  
تشغيل الاستعلام

---

# Screen 3 — Query Preview / Execution

Page Title:
معاينة الاستعلام

Description:
تشغيل الاستعلام على البيانات الحالية لمراجعة النتائج.

Primary Button:
تشغيل الاستعلام

Results Table:

الكيان  
النتيجة  
مصدر البيانات

Result badges:

نجاح (PASS)  
فشل (FAIL)

Include DS Alert if no results are found.

---

# Screen 4 — Query Results History

Page Title:
سجل تنفيذ الاستعلامات

Use DS Table.

Columns:

التاريخ  
اسم الاستعلام  
عدد النتائج  
الحالة

Status badges:

نجاح  
فشل

Add button:

عرض النتائج

---

# Screen 5 — Execution Result Details

Page Title:
تفاصيل نتائج التنفيذ

Display DS table.

Columns:

الكيان  
النتيجة  
المصدر  
القيمة

Use badges for PASS / FAIL.

Add filter dropdown:

مصدر البيانات

---

# System Feedback

Add DS success alerts for:

تم حفظ الاستعلام بنجاح

تم تفعيل الاستعلام

تم تشغيل الاستعلام بنجاح

---

# Design Requirements

Use only the connected Government Design System components.

Maintain RTL Arabic layout.

Follow DS spacing tokens and typography rules.

Ensure all tables support pagination and responsive layout.