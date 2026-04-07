# 🎨 Visual Testing Checklist

## Your Testing Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  🧪 MODULE EXTENSIONS TEST MODE                             │
│  ═══════════════════════════════════════════════════════    │
│                                                              │
│  Click the purple button to enter test mode →               │
│  🧪 وضع الاختبار - المكونات الجديدة                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Layout Map

```
┌──────────────────────────────────────────────────────────────┐
│                     TEST MENU                                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  المكون 1: تفاصيل السؤال (Question Details)        │    │
│  │  ────────────────────────────────────────────       │    │
│  │  [✅ مع محتوى]  [📭 بدون محتوى]  [✏️ معدّل]      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  المكون 2: إدارة المحتوى (Content Management)      │    │
│  │  ────────────────────────────────────────────       │    │
│  │  [عرض قائمة المحتوى]                              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  المكون 3: نموذج المحتوى (Content Form)            │    │
│  │  ────────────────────────────────────────────       │    │
│  │  [➕ وضع الإضافة]  [✏️ وضع التعديل]               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  المكون 4: عرض المستخدم (End User View)            │    │
│  │  ────────────────────────────────────────────       │    │
│  │  [عرض مركز المعرفة]                               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Side Sheet Anatomy (600-700px from left)

```
┌─────────────────────────┐
│ [×]            [Edit]   │ ← Header with close & action
├─────────────────────────┤
│                         │
│  📋 Content Section 1   │ ← Scrollable content
│  ────────────────────   │
│  • Item 1               │
│  • Item 2               │
│                         │
│  ─────────────────────  │ ← Divider
│                         │
│  📋 Content Section 2   │
│  ────────────────────   │
│  More content...        │
│                         │
├─────────────────────────┤
│ [Primary] [Secondary]   │ ← Sticky footer actions
└─────────────────────────┘
```

---

## Form Layout Pattern

```
┌───────────────────────────────────────┐
│  [×]         Form Title               │
│  Subtitle text here                   │
├───────────────────────────────────────┤
│                                       │
│  Field Label *                        │
│  ┌─────────────────────────────────┐ │
│  │ Input field...                  │ │
│  └─────────────────────────────────┘ │
│  ⚠️ Error message (if invalid)        │
│                                       │
│  Field Label                          │
│  ┌─────────────────────────────────┐ │
│  │ Dropdown ▼                      │ │
│  └─────────────────────────────────┘ │
│                                       │
│  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │ Tag1 ×│ │ Tag2 ×│ │ Tag3 ×│      │
│  └──────┘  └──────┘  └──────┘       │
│                                       │
├───────────────────────────────────────┤
│  [Primary Action] [Cancel]            │
└───────────────────────────────────────┘
```

---

## Content Card Pattern (End User)

```
┌─────────────────────────────────────────────┐
│  ┌───┐                             [→]     │
│  │ 📄│  Title of Content                   │
│  └───┘                                      │
│         Excerpt text here showing a        │
│         preview of the content...          │
│                                             │
│         [FAQ] • جمعية • [Tag1] [Tag2]      │
└─────────────────────────────────────────────┘
                    ↑
              Hover: border turns blue
```

---

## Table Pattern (Content List)

```
┌──────────────────────────────────────────────────────────────┐
│  Title      │ Type  │ Status │ Entity │ Questions │ Date  │ ⋮│
├──────────────────────────────────────────────────────────────┤
│ 📄 Content 1│ [FAQ] │ [Pub]  │ جمعية  │     3     │ 01/15 │ ⋮│
│ 📚 Content 2│ [Gui] │ [Dft]  │ مؤسسة  │     —     │ 01/14 │ ⋮│
└──────────────────────────────────────────────────────────────┘
                                                               ↑
                                                    Click for menu:
                                                    • عرض
                                                    • تعديل
                                                    • أرشفة
```

---

## Badge Types

```
Status Badges:
┌──────┐  ┌──────┐
│ منشور │  │ مسودة │
└──────┘  └──────┘
  Green      Gray

Type Badges:
┌────────────┐  ┌────────────┐
│ سؤال شائع  │  │ محتوى دليل │
└────────────┘  └────────────┘
    Blue          Green

Override Badge:
┌─────────────┐
│ معدّل يدوياً │
└─────────────┘
    Amber
```

---

## Empty State Pattern

```
       ┌──────────────┐
       │              │
       │      📭      │
       │              │
       │  لا توجد     │
       │   بيانات     │
       │              │
       └──────────────┘
```

---

## Color Coding Guide

### 🎨 Primary Actions
```
┌──────────────┐
│   Primary    │  ← var(--primary) background
└──────────────┘     var(--primary-foreground) text
```

### ⚠️ Destructive Actions
```
┌──────────────┐
│   Archive    │  ← text-destructive
└──────────────┘     hover:bg-destructive/10
```

### ✅ Success Actions
```
┌──────────────┐
│     Save     │  ← var(--success) background
└──────────────┘     white text
```

---

## Typography Scale

```
var(--text-xs)    → 12px  → Helper text, badges
var(--text-sm)    → 14px  → Body text, buttons
var(--text-base)  → 16px  → Input text, paragraphs  
var(--text-lg)    → 18px  → Section headers
var(--text-xl)    → 20px  → Page headers
var(--text-2xl)   → 24px  → Main titles
var(--text-3xl)   → 30px  → Hero titles
```

---

## Spacing Examples

```
Gap Sizes:
gap-1  → 0.25rem (4px)
gap-2  → 0.5rem  (8px)
gap-3  → 0.75rem (12px)
gap-4  → 1rem    (16px)
gap-6  → 1.5rem  (24px)

Padding:
p-2   → 0.5rem  (8px)
p-4   → 1rem    (16px)
p-6   → 1.5rem  (24px)
p-8   → 2rem    (32px)
```

---

## RTL Layout Check

### ✅ Correct RTL
```
                                    [Button] Label ←
    [×]                                     العنوان ←
                             المحتوى يبدأ من اليمين ←
```

### ❌ Wrong (LTR)
```
→ Label [Button]
→ Title
→ Content starts from left
```

---

## Component States Visual Guide

### Input States
```
Normal:   ┌──────────────┐
          │ Input...     │
          └──────────────┘

Focus:    ┌──────────────┐  ← Blue ring
          │ Input...     │
          └──────────────┘

Error:    ┌──────────────┐  ← Red border
          │ Input...     │
          └──────────────┘
          ⚠️ Error message
```

### Button States
```
Normal:   [  Button  ]
Hover:    [  Button  ]  ← Darker
Disabled: [  Button  ]  ← 50% opacity, no cursor
```

### Dropdown States
```
Closed:   ┌──────────────┐
          │ Select... ▼  │
          └──────────────┘

Open:     ┌──────────────┐  ← Accent underline
          │ Select... ▲  │
          └──────────────┘
          ┌──────────────┐
          │ ✓ Option 1   │
          │   Option 2   │
          └──────────────┘
```

---

## Interactive Elements Check

```
☐ Buttons respond to hover
☐ Inputs show focus ring
☐ Dropdowns open/close
☐ Side sheets slide smoothly
☐ Modals center properly
☐ Tags can be added/removed
☐ Tables are scrollable
☐ Cards have hover state
```

---

## Responsive Breakpoints

```
Mobile:     320px - 640px   (Not primary focus)
Tablet:     640px - 1024px  (Partially supported)
Desktop:    1024px+         (Full support) ✅
```

---

## Browser Testing Matrix

```
┌──────────┬─────────┬──────────┬──────────┐
│ Browser  │ Version │ Priority │ Status   │
├──────────┼─────────┼──────────┼──────────┤
│ Chrome   │ Latest  │ High     │ ☐ Test   │
│ Firefox  │ Latest  │ High     │ ☐ Test   │
│ Safari   │ Latest  │ Medium   │ ☐ Test   │
│ Edge     │ Latest  │ Medium   │ ☐ Test   │
└──────────┴─────────┴──────────┴──────────┘
```

---

## Final Visual Checklist

### Typography
- ☐ All Arabic text uses IBM Plex Sans Arabic
- ☐ Font sizes use CSS variables
- ☐ Text aligns right (RTL)
- ☐ Line heights are readable

### Colors
- ☐ All colors use CSS variables
- ☐ Badges use semantic colors
- ☐ Hover states visible
- ☐ Error states red
- ☐ Success states green

### Layout
- ☐ Side sheets 600-700px width
- ☐ Modals centered
- ☐ Forms maximum 800px
- ☐ Content maximum 3xl for reading
- ☐ Proper spacing throughout

### Components
- ☐ Buttons have hover effects
- ☐ Inputs have focus states
- ☐ Dropdowns positioned correctly
- ☐ Tags display as pills
- ☐ Badges rounded with proper colors
- ☐ Icons sized correctly (w-4, w-5, w-6)

### Interactions
- ☐ Click feedback visible
- ☐ Loading states smooth
- ☐ Transitions not jarring
- ☐ Toast notifications appear top-center
- ☐ Modals/sheets close with X or overlay click

---

**Print this checklist and mark items as you test!** ✓

---

## Quick Screenshot Test

Take screenshots of:
1. ✅ Question side sheet with content
2. ✅ Content management table
3. ✅ Content form filled out
4. ✅ End user content cards
5. ✅ Content details page
6. ✅ Empty states

Compare with design system specs.

---

**Ready to test? Start with the purple button!** 🧪
