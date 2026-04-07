# Instructions to Add Question Details Functionality

## ✅ Changes Already Made

1. ✅ Updated imports to include `QuestionDetailsSidesheet` and `ExternalLink` icon
2. ✅ Added `LinkedContent` interface
3. ✅ Extended `Question` interface with new fields:
   - `linkedContent`
   - `aiScore`
   - `manualScore`  
   - `overrideReason`
   - `isOverridden`
4. ✅ Added sample linked content data to first question
5. ✅ Added side sheet state management and handlers
6. ✅ Integrated `QuestionDetailsSidesheet` component at end of FormBuilder return

## 🔧 Remaining Manual Update Needed

**File:** `/src/app/components/form-builder-readonly-structure.tsx`  
**Lines:** Approximately 1818-1833

### Find This Code:

```tsx
<div className="flex items-start justify-between mb-2">
  <button 
    onClick={() => toggleQuestion(criterion.id, indicator.id, practice.id, question.id)}
    className="p-0.5 hover:bg-white rounded transition-colors"
  >
    {question.isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
  </button>
  <div className="flex-1 text-right mr-2">
    <div className="flex items-center gap-1 justify-end mb-1">
      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-200 text-purple-900">
        المستوى 5: السؤال
      </span>
    </div>
    <p className="font-medium text-foreground text-xs">
      {question.title}
    </p>
```

### Replace With:

```tsx
<div className="flex items-start justify-between mb-2">
  <div className="flex items-center gap-1">
    <button 
      onClick={() => toggleQuestion(criterion.id, indicator.id, practice.id, question.id)}
      className="p-0.5 hover:bg-white rounded transition-colors"
    >
      {question.isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
    </button>
    <button
      onClick={() => handleQuestionClick(criterion.id, indicator.id, practice.id, question.id)}
      className="p-0.5 hover:bg-primary/10 rounded transition-colors group"
      title="عرض تفاصيل السؤال"
    >
      <ExternalLink className="w-3 h-3 text-primary group-hover:text-primary/80" />
    </button>
  </div>
  <div className="flex-1 text-right mr-2">
    <div className="flex items-center gap-1 justify-end mb-1 flex-wrap">
      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-200 text-purple-900">
        المستوى 5: السؤال
      </span>
      {/* Linked Content Status Badge */}
      {question.linkedContent && question.linkedContent.length > 0 && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
          ✅ مرتبط بـ {question.linkedContent.length} عناصر
        </span>
      )}
      {/* Override Status Badge */}
      {question.isOverridden && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
          ✏️ معدّل يدوياً
        </span>
      )}
      {/* No Linked Content Badge */}
      {(!question.linkedContent || question.linkedContent.length === 0) && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
          ⚠️ بدون محتوى مرتبط
        </span>
      )}
    </div>
    <button
      onClick={() => handleQuestionClick(criterion.id, indicator.id, practice.id, question.id)}
      className="font-medium text-foreground text-xs hover:text-primary transition-colors text-right w-full block"
    >
      {question.title}
    </button>
```

## 🎯 What This Achieves

### Visual Changes:
1. **ExternalLink Icon Button** - Clickable icon next to expand/collapse chevron
2. **Status Badges** - Shows one of three states:
   - ✅ "مرتبط بـ X عناصر" (blue) - Has linked content
   - ✏️ "معدّل يدوياً" (amber) - Manually overridden
   - ⚠️ "بدون محتوى مرتبط" (orange) - No linked content
3. **Clickable Question Title** - Clicking title also opens side sheet

### Functional Changes:
1. Clicking the ExternalLink icon OR question title opens `QuestionDetailsSidesheet`
2. Side sheet shows:
   - Linked KB content (if any)
   - AI suggested score
   - Manual override form with:
     - Score input (0-100)
     - Mandatory reason textarea
     - Optional attachment upload
   - Save & Apply button
   - Reset to AI suggestion button

## 🧪 How to Test

1. Navigate to  نموذج تقييم (Evaluation Form)
2. Expand معيار 1 → مؤشر 1.1 → ممارسة 1.1.1
3. See the first question "هل توجد سياسات مالية موثقة ومعتمدة؟"
4. Notice the **✅ مرتبط بـ 2 عناصر** badge
5. Click the **ExternalLink icon** or the **question title**
6. Side sheet should open from the left showing:
   - Question title in header
   - 2 linked KB items
   - AI score of 75
   - Manual override form
7. Enter a score (e.g., 85) and reason
8. Click "حفظ وتطبيق"
9. Badge should change to **✏️ معدّل يدوياً**
10. Re-open side sheet - should show your override

## ✅ Verification Checklist

- [ ] ExternalLink icon appears next to chevron
- [ ] Status badges display correctly
- [ ] Clicking icon opens side sheet
- [ ] Clicking title opens side sheet  
- [ ] Side sheet slides from left (600px wide)
- [ ] Linked content displays (2 items)
- [ ] AI score shows (75)
- [ ] Can enter manual score
- [ ] Reason is required when overriding
- [ ] Save button works
- [ ] Reset button works
- [ ] Override badge appears after saving
- [ ] RTL layout maintained throughout
- [ ] All CSS variables used (no hardcoded colors)
- [ ] IBM Plex Sans Arabic font used

## 📝 Notes

- The side sheet reuses the existing `QuestionDetailsSidesheet` component (already created)
- All styling uses CSS design system variables
- Full RTL support maintained
- Only the Question level is modified - no changes to Standard/Indicator/Practice
- The example question has sample data - others will show "بدون محتوى مرتبط"

---

**Status:** Ready to test after manual code update
