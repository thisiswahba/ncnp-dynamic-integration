# 🚀 Quick Test Reference Card

## How to Start Testing (30 seconds)

1. **Launch your app**
2. **Look for this purple button** in the top left:
   ```
   🧪 وضع الاختبار - المكونات الجديدة
   ```
3. **Click it**
4. **Test each component** from the menu

---

## 6 Components to Test

| # | Component | What It Does | Test Button |
|---|-----------|--------------|-------------|
| 1 | **Question Details** | Side sheet for questions with linked content & manual override | 3 scenario buttons |
| 2 | **Content Management** | Admin list to manage FAQs & Guidelines | "عرض قائمة المحتوى" |
| 3 | **Content Form** | Add/Edit content modal | 2 mode buttons |
| 4 | **End User List** | Public knowledge base listing | "عرض مركز المعرفة" |
| 5 | **End User Details** | Read-only content view | Auto-opens from #4 |
| 6 | **Content Details** | Admin content details side sheet | Auto-opens from #2 |

---

## Quick Test Flow (5 minutes)

### 1️⃣ Question Details (30 sec)
- Click "مع محتوى مرتبط" → See 3 linked items
- Enter score "95" → Add reason "test"
- Click "حفظ وتطبيق" → See success toast ✅

### 2️⃣ Content Management (60 sec)
- Click "عرض قائمة المحتوى" → See table
- Search "سياسات" → Results filter
- Click first row → Side sheet opens
- See linked questions section → Click question
- Close → Click ⋮ menu → Click "تعديل"
- Form opens in edit mode ✅

### 3️⃣ Content Form (60 sec)
- Click "وضع الإضافة" → Empty form
- Select "سؤال شائع" → Card highlights
- Try submit → See validation errors
- Fill title, entity type, content
- Select "جمعية" → Entity size appears
- Click "نشر" → Success toast ✅

### 4️⃣ End User Views (60 sec)
- Click "عرض مركز المعرفة" → See cards
- Search "مالية" → Results filter
- Click first card → Details page
- See formatted content
- Click "العودة" → Back to list ✅

### 5️⃣ Design System (60 sec)
- Right-click any element → Inspect
- Check Computed styles
- Verify: `var(--primary)`, `var(--text-sm)`, etc.
- Confirm: IBM Plex Sans Arabic font ✅

---

## 3 Key Things to Verify

### ✅ RTL Layout
- All text aligns **right**
- Icons on **right side**
- Side sheets slide from **left**

### ✅ CSS Variables
Open DevTools → Should see:
- `background-color: var(--primary)` ← Good ✓
- `background-color: #3B82F6` ← Bad ✗

### ✅ Validation
- Empty required fields → Error messages
- Invalid score → Error
- Missing reason on override → Error

---

## Common Test Scenarios

| Scenario | Where | Expected |
|----------|-------|----------|
| Empty state | Question with no content | Shows message |
| Validation error | Form with empty required field | Red border + error text |
| Success action | Save any form | Green toast notification |
| Long text | Content with 500+ chars | Scrolls/wraps properly |
| Multi-select | Entity types dropdown | Multiple items selected |
| Conditional field | Select جمعية | Entity size appears |
| Tag management | Add audience tags | Pills appear/remove |

---

## Quick Keyboard Tests

| Key | Expected Behavior |
|-----|-------------------|
| Tab | Moves focus through fields |
| Enter | Submits form / Adds tag |
| Escape | Closes modal/side sheet |
| Space | Toggles dropdown |

---

## Red Flags 🚩

Watch out for:
- ❌ Hardcoded colors (should use CSS vars)
- ❌ Left-aligned text (should be right)
- ❌ Missing validation on required fields
- ❌ No error messages
- ❌ Side sheet doesn't close
- ❌ Console errors
- ❌ Font not IBM Plex Sans Arabic

---

## Quick Fixes

### If CSS variables not working:
1. Check `/src/styles/theme.css` exists
2. Verify variables are defined
3. Refresh browser

### If RTL broken:
1. Check `dir="rtl"` on container
2. Verify `text-right` classes used
3. Check `justify-end` for flex items

### If validation not working:
1. Check required fields marked with `*`
2. Verify error state in component
3. Check validation logic

---

## Test Completion Checklist

**5-Minute Test:**
- ☐ All 6 components opened
- ☐ No visual glitches
- ☐ RTL layout correct
- ☐ Forms validate
- ☐ Side sheets work
- ☐ Toast notifications appear

**Full Test (~30 min):**
- ☐ Every button clicked
- ☐ Every state tested
- ☐ CSS variables verified
- ☐ Keyboard navigation tested
- ☐ Empty states checked
- ☐ Error states checked
- ☐ Success flows complete

---

## Need More Details?

📖 **Full Testing Guide:** `/TESTING_GUIDE.md`  
📋 **Component Details:** `/EXTENSION_SUMMARY.md`  
🔧 **Integration Help:** See summary for API connection points

---

## Quick Command Reference

```bash
# If you need to check files
ls /src/app/components/*.tsx

# Key files created:
# - question-details-sidesheet.tsx
# - content-management-list.tsx
# - content-details-sidesheet.tsx
# - content-form.tsx
# - end-user-content-view.tsx
# - end-user-content-details.tsx
# - module-extensions-test.tsx (test interface)
```

---

## Support

**All components working?** ✅ Ready for integration!  
**Found issues?** Check `/TESTING_GUIDE.md` for detailed troubleshooting  
**Need changes?** Components are in `/src/app/components/`

---

**Happy Testing! 🎉**

*Remember: Purple button top-left → Click → Test each component → Done!*
