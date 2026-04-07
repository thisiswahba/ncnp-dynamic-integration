# 🚀 START HERE - Evaluation Form Extension

## ✅ What's Been Done

I've extended **ONLY the existing نموذج تقييم (Evaluation Form)** screen to add Question details functionality.

**NO new dashboards, cards, or modules were created** - just modified the existing form!

---

## 🎯 One Simple Manual Step

There's **ONE small code update** you need to make manually:

### 📍 Location:
**File:** `/src/app/components/form-builder-readonly-structure.tsx`  
**Search for:** `المستوى 5: السؤال`  
**Line:** Approximately 1828

### 🔧 What to Do:

**See full instructions in:**  
→ `/QUESTION_MODIFICATION_INSTRUCTIONS.md`

**Quick summary:**
1. Add an ExternalLink icon button next to the expand/collapse chevron
2. Add status badges (linked content count, override indicator, warning)
3. Make the question title clickable

**Takes:** ~2 minutes to copy-paste

---

## 🧪 After the Manual Update - Test It!

### Step 1: Navigate to the Form
1. Go to نموذج تقييم (Evaluation Form)
2. Expand: **معيار 1** → **مؤشر 1.1** → **ممارسة 1.1.1**

### Step 2: See the New Features
Look at the first question: "هل توجد سياسات مالية موثقة ومعتمدة؟"

You should see:
- ✅ **Blue badge:** "مرتبط بـ 2 عناصر"
- 🔗 **ExternalLink icon** next to the chevron
- **Clickable title**

### Step 3: Open Question Details
Click either:
- The ExternalLink icon 🔗
- OR the question title

**Result:** Side sheet slides in from the left!

### Step 4: Explore the Side Sheet

You'll see:
1. **Question title** in header
2. **Linked KB Content** section showing 2 items:
   - "كيفية توثيق السياسات المالية" (FAQ)
   - "دليل إدارة السياسات والإجراءات" (Guideline)
3. **AI Score** showing 75 in blue box
4. **Manual Override** section with:
   - Score input (0-100)
   - Reason textarea
   - File upload
5. **Actions:**
   - "حفظ وتطبيق" (Save & Apply)
   - "إعادة تعيين" (Reset)

### Step 5: Test Override
1. Enter score: **85**
2. Enter reason: **"test override"**
3. Click **"حفظ وتطبيق"**

**Result:**
- ✅ Success toast appears
- Side sheet closes
- Badge changes to: ✏️ **"معدّل يدوياً"** (amber)

### Step 6: Verify Override
1. Click the question again
2. Side sheet opens showing:
   - Your score: 85
   - Your reason: "test override"  
   - AI suggestion: 75

### Step 7: Reset Override
1. Click **"إعادة تعيين"** button
2. Score returns to 75
3. Reason clears
4. Close and reopen - badge gone!

### Step 8: Test Other Questions
1. Look at other questions (they have no linked content)
2. See **⚠️ "بدون محتوى مرتبط"** (orange badge)
3. Open side sheet - empty state shows
4. Can still override score

---

## ✅ What You Should See

### Question Card (Collapsed):
```
┌────────────────────────────────────────────┐
│ [▼][🔗]  المستوى 5: السؤال   ✅ مرتبط بـ 2 عناصر │
│           هل توجد سياسات مالية موثقة؟      │
└────────────────────────────────────────────┘
```

### Question Card (Overridden):
```
┌────────────────────────────────────────────┐
│ [▼][🔗]  المستوى 5: السؤال   ✏️ معدّل يدوياً  │
│           هل توجد سياسات مالية موثقة؟      │
└────────────────────────────────────────────┘
```

### Question Card (No Content):
```
┌────────────────────────────────────────────┐
│ [▼][🔗]  المستوى 5: السؤال  ⚠️ بدون محتوى مرتبط │
│           متى تم آخر تحديث للسياسات؟       │
└────────────────────────────────────────────┘
```

### Side Sheet (600px from left):
```
┌──────────────────────────────────┐
│  [×]         تفاصيل السؤال        │
│  هل توجد سياسات مالية موثقة؟    │
├──────────────────────────────────┤
│                                   │
│  📋 الأدلة والمصادر              │
│  ┌────────────────────────────┐  │
│  │ 📄 كيفية توثيق السياسات... │  │
│  │    [سؤال شائع] • دليل...   │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │ 📚 دليل إدارة السياسات...  │  │
│  │    [محتوى دليل] • معيار... │  │
│  └────────────────────────────┘  │
│                                   │
│  ─────────────────────────────── │
│                                   │
│  ✏️ التعديل اليدوي                │
│  ┌────────────────────────────┐  │
│  │ اقتراح الذكاء: 75          │  │
│  └────────────────────────────┘  │
│  النتيجة *: [ 85 ]              │
│  السبب *: [test override...]    │
│  مرفق: [رفع مرفق]               │
│                                   │
├──────────────────────────────────┤
│  [حفظ وتطبيق] [إعادة تعيين]      │
└──────────────────────────────────┘
```

---

## 🎨 Design Features

### ✅ RTL Layout
- Side sheet slides from **LEFT** (correct for RTL)
- All text aligns **RIGHT**
- Icons positioned for RTL

### ✅ CSS Design System
- All colors: `var(--primary)`, `var(--blue-700)`, etc.
- All text: `var(--text-sm)`, `var(--text-base)`, etc.
- Font: IBM Plex Sans Arabic
- No hardcoded values!

### ✅ Badges
- **Blue** (✅): Linked content count
- **Amber** (✏️): Manual override active
- **Orange** (⚠️): No linked content

---

## 🐛 Troubleshooting

### Badge not showing?
→ Check the manual code update was done correctly

### Side sheet not opening?
→ Check browser console for errors  
→ Verify `QuestionDetailsSidesheet` component imported

### Validation not working?
→ Enter score and reason before clicking save

### Toast not appearing?
→ Verify `<Toaster />` component is rendered in App

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `/QUESTION_MODIFICATION_INSTRUCTIONS.md` | **← Manual update instructions** |
| `/EVALUATION_FORM_EXTENSION_SUMMARY.md` | Full implementation details |
| `/START_HERE_EVALUATION_FORM.md` | This file (quick start) |

---

## ✅ Quick Checklist

### Before Testing:
- [ ] Made the manual code update
- [ ] App is running
- [ ] No console errors

### Testing:
- [ ] Navigate to first question
- [ ] See blue "مرتبط بـ 2 عناصر" badge
- [ ] See ExternalLink icon
- [ ] Click icon → side sheet opens
- [ ] See 2 linked items
- [ ] See AI score 75
- [ ] Enter score 85 and reason
- [ ] Click save → toast appears
- [ ] Badge changes to "معدّل يدوياً"
- [ ] Reopen → shows override
- [ ] Click reset → clears override
- [ ] Check other questions → show warning badge

### Design:
- [ ] RTL layout correct
- [ ] Arabic text throughout
- [ ] IBM Plex Sans Arabic font
- [ ] CSS variables used
- [ ] Side sheet 600px wide
- [ ] Smooth animations

---

## 🎉 You're Done When...

✅ You can click a question and see the side sheet  
✅ Side sheet shows linked KB content  
✅ Can override the AI score  
✅ Badges update correctly  
✅ Everything is in Arabic/RTL  
✅ No console errors  

---

**Need help?** Check `/QUESTION_MODIFICATION_INSTRUCTIONS.md` for detailed steps!

**Ready to integrate?** All components use your existing design system - just update your backend API connections when ready!

🚀 **Happy testing!**
