# 🧪 Testing Guide - Module Extensions

## Quick Start

### Option 1: Use the Built-in Test Interface (Recommended)

1. **Launch the application**
2. **Look for the purple "🧪 وضع الاختبار - المكونات الجديدة" button** in the top left corner
3. **Click it** to enter Test Mode

You'll see a menu with all 6 new components ready to test!

---

## Test Mode Menu

The test interface provides buttons to test each component in different states:

### 🎯 Component 1: Question Details Side Sheet

**Test Scenarios:**

1. **✅ مع محتوى مرتبط (With Linked Content)**
   - Shows 3 linked Knowledge Base items
   - AI score: 85
   - Test the manual override functionality
   - Try adding a reason and score

2. **📭 بدون محتوى مرتبط (No Linked Content)**
   - Shows empty state
   - Still allows manual override

3. **✏️ معدّل يدوياً (Manually Overridden)**
   - Pre-filled with override data
   - Shows override badge
   - Current score: 90 (vs AI: 75)
   - Has existing reason

**What to Test:**
- ✅ Side sheet slides in from left
- ✅ Linked content displays with correct badges
- ✅ Click on linked content items
- ✅ Score input validation (0-100)
- ✅ Required reason when overriding
- ✅ File upload works
- ✅ Reset button clears to AI score
- ✅ Save button validates and shows success toast
- ✅ Close button works

---

### 📋 Component 2: Content Management List

**Click "عرض قائمة المحتوى" to test:**

**What to Test:**
- ✅ Active/Archived tabs switch
- ✅ Search bar filters content
- ✅ Type filter (All, FAQ, Guideline)
- ✅ Status filter (All, Published, Draft)
- ✅ Table displays all columns correctly
- ✅ Click row to open Content Details side sheet
- ✅ Click ⋮ menu to see actions (View, Edit, Archive)
- ✅ "+ إضافة محتوى جديد" button opens form

**Mock Data Included:**
- 3 content items with different types and statuses
- Linked questions counts
- Entity types

---

### 📝 Component 3: Content Form

**Test Scenarios:**

1. **➕ وضع الإضافة (Create Mode)**
   - Empty form
   - Test validation

2. **✏️ وضع التعديل (Edit Mode)**
   - Pre-filled with mock data
   - Test editing flow

**What to Test:**
- ✅ Content type selection (FAQ vs Guideline)
- ✅ Visual card highlighting
- ✅ Title input validation
- ✅ Entity Types multi-select dropdown
- ✅ Entity Size shows ONLY when جمعية is selected
- ✅ Entity Size clears when جمعية is deselected
- ✅ Content textarea validation
- ✅ Audience tags (press Enter to add)
- ✅ Internal tags (press Enter to add)
- ✅ Tag removal (click X)
- ✅ "نشر" saves as published
- ✅ "حفظ كمسودة" saves as draft
- ✅ Validation errors show inline
- ✅ Modal closes properly

**Validation Tests:**
1. Try submitting empty form → should show errors
2. Add only title → should require entity type
3. Select جمعية → should require entity size
4. Fill all required fields → should allow submit

---

### 👥 Component 4: End User View

**Click "عرض مركز المعرفة" to test:**

**What to Test:**
- ✅ Clean, centered header
- ✅ Search bar filters content
- ✅ Type filter works
- ✅ Content cards display nicely
- ✅ Card hover effects
- ✅ Type icons (FAQ vs Guideline) with colors
- ✅ Badges show correctly
- ✅ Audience tags display (max 2 shown)
- ✅ Click card to view details
- ✅ Empty state when no results
- ✅ Help section at bottom

**Mock Data:**
- 4 published content items
- Mix of FAQs and Guidelines
- Various entity types and audiences

---

### 📄 Component 5: End User Content Details

**Automatically opens when clicking a content card in End User View**

**What to Test:**
- ✅ Breadcrumb back button works
- ✅ Large type icon displays
- ✅ Title and badges show
- ✅ Metadata displays correctly
- ✅ Last modified date
- ✅ Audience tags
- ✅ Content body formatted properly:
  - Headings (bold, larger)
  - Numbered lists
  - Bullet lists
  - Paragraphs
- ✅ Help section at bottom
- ✅ RTL text alignment

---

### 📊 Component 6: Content Details Side Sheet

**Opens when clicking "View" in Content Management List**

**What to Test:**
- ✅ Side sheet slides from left (700px wide)
- ✅ Header with type icon and title
- ✅ Type and status badges
- ✅ Edit button works
- ✅ Content body section displays text
- ✅ Metadata section shows:
  - Entity Type
  - Entity Size
  - Last Modified
  - Created By
  - Audience tags
  - Internal tags
- ✅ **Linked Evaluation Questions section**:
  - Lists 2 mock questions
  - Shows breadcrumb (Standard → Indicator → Practice → Question)
  - Click to navigate (shows toast)
  - Empty state when no links
- ✅ Usage warning shows when content is linked
- ✅ Close button works

---

## 🎨 Design System Testing

### Colors
Open DevTools and inspect elements to verify CSS variables are used:

**Primary Colors:**
```css
background-color: var(--primary)
color: var(--primary-foreground)
border-color: var(--border)
background-color: var(--muted)
```

**Semantic Colors:**
```css
color: var(--destructive)
background-color: var(--success)
```

### Typography
All text should use:
```css
font-family: IBM Plex Sans Arabic, sans-serif
font-size: var(--text-sm)
font-size: var(--text-base)
font-size: var(--text-lg)
/* etc. */
```

### Spacing & Borders
```css
border-radius: var(--radius)
box-shadow: var(--elevation-sm)
```

**How to Verify:**
1. Right-click any element → Inspect
2. Look at Computed styles
3. Should see CSS variables, not hardcoded values

---

## 🧩 Testing Each State

### Empty States
- ✅ Question with no linked content
- ✅ Content list with no results
- ✅ End user search with no matches
- ✅ Content with no linked questions

### Loading States
- ✅ Check for smooth transitions
- ✅ Toast notifications on save

### Error States
- ✅ Form validation errors
- ✅ Required field indicators (red asterisks)
- ✅ Inline error messages

### Success States
- ✅ Toast notifications on save
- ✅ Confirmation messages

---

## 🔍 Detailed Testing Checklist

### Question Details Side Sheet

| Test Case | Expected Result | ✓ |
|-----------|----------------|---|
| Open side sheet | Slides in from left smoothly | ☐ |
| Show linked content | 3 items display with badges | ☐ |
| No linked content | Empty state shows | ☐ |
| AI score display | Blue box with score 85 | ☐ |
| Enter invalid score | Error message appears | ☐ |
| Override without reason | Error: "السبب مطلوب" | ☐ |
| Upload file | File name displays | ☐ |
| Click reset | Score returns to AI value | ☐ |
| Click save | Success toast appears | ☐ |
| Close side sheet | Slides out, closes properly | ☐ |

### Content Management List

| Test Case | Expected Result | ✓ |
|-----------|----------------|---|
| Switch tabs | Content updates | ☐ |
| Search content | Results filter | ☐ |
| Type filter | Shows only selected type | ☐ |
| Click row | Side sheet opens | ☐ |
| Click menu | Dropdown appears | ☐ |
| Click View | Opens side sheet | ☐ |
| Click Edit | Opens form in edit mode | ☐ |
| Click Archive | Success toast | ☐ |

### Content Form

| Test Case | Expected Result | ✓ |
|-----------|----------------|---|
| Select FAQ | Card highlights blue | ☐ |
| Select Guideline | Card highlights green | ☐ |
| Empty title submit | Error: "العنوان مطلوب" | ☐ |
| No entity type | Error message | ☐ |
| Select جمعية | Entity size field appears | ☐ |
| Deselect جمعية | Entity size field hides | ☐ |
| Add audience tag | Tag pill appears | ☐ |
| Remove tag | Tag removed | ☐ |
| Click نشر | Form submits, success toast | ☐ |
| Click مسودة | Form submits as draft | ☐ |

### End User Views

| Test Case | Expected Result | ✓ |
|-----------|----------------|---|
| Search content | Results filter | ☐ |
| Click card | Details page opens | ☐ |
| View content | Formatted properly | ☐ |
| Back button | Returns to list | ☐ |
| Empty search | Empty state shows | ☐ |

---

## 🌐 RTL Testing

### Visual Checks
- ✅ All text aligns right
- ✅ Icons on correct side (right)
- ✅ Dropdowns open in correct direction
- ✅ Side sheets slide from left
- ✅ Menus positioned correctly
- ✅ Breadcrumbs flow right-to-left

### Browser Testing
Test in:
- ✅ Chrome
- ✅ Firefox  
- ✅ Safari
- ✅ Edge

---

## 📱 Responsive Testing

While components are desktop-focused, verify:
- ✅ Side sheets work on different screen sizes
- ✅ Tables scroll horizontally if needed
- ✅ Forms are usable on tablets
- ✅ Content is readable

---

## ♿ Accessibility Testing

### Keyboard Navigation
- ✅ Tab through all interactive elements
- ✅ Enter/Space activates buttons
- ✅ Escape closes modals/side sheets
- ✅ Arrow keys in dropdowns

### Screen Reader
- ✅ Labels are descriptive
- ✅ Buttons have aria-label where needed
- ✅ Error messages are announced

---

## 🎯 Integration Testing

Once you're ready to integrate:

1. **Import components into your actual forms**
2. **Connect to real API endpoints**
3. **Add actual data fetching**
4. **Test with production data**
5. **Verify state persistence**

---

## 🐛 Common Issues to Check

### CSS Variables
- ✅ All colors use `var(--*)` not hardcoded hex
- ✅ Font sizes use `var(--text-*)` 
- ✅ Spacing is consistent

### RTL Layout
- ✅ `dir="rtl"` on all container divs
- ✅ `text-right` classes used
- ✅ Icons positioned correctly

### Validation
- ✅ Required fields marked with *
- ✅ Error messages in Arabic
- ✅ Inline validation works

### Performance
- ✅ No lag when opening side sheets
- ✅ Smooth transitions
- ✅ Fast filtering/search

---

## 📝 Feedback Collection

While testing, note:
1. **Visual issues** - Does it match your design system?
2. **Functional issues** - Does everything work?
3. **UX issues** - Is the flow intuitive?
4. **Performance** - Any slowdowns?
5. **Missing features** - Anything else needed?

---

## ✅ Test Completion Checklist

- ☐ All 6 components tested
- ☐ All states verified (empty, error, success)
- ☐ RTL layout confirmed
- ☐ CSS variables used throughout
- ☐ IBM Plex Sans Arabic font displays
- ☐ Validation working correctly
- ☐ Toast notifications appear
- ☐ Side sheets animate smoothly
- ☐ Dropdowns position correctly
- ☐ Forms submit properly
- ☐ No console errors
- ☐ Responsive on different screens
- ☐ Keyboard navigation works
- ☐ Ready for integration

---

## 🚀 Next Steps After Testing

1. **Fix any issues found**
2. **Adjust CSS variables if needed** in `/src/styles/theme.css`
3. **Connect to your backend API**
4. **Add to your actual evaluation forms**
5. **Deploy and test in staging**
6. **Gather user feedback**
7. **Iterate and improve**

---

## 💡 Tips

- **Use Browser DevTools** to inspect CSS variables
- **Test with different data** (long titles, many tags, etc.)
- **Try edge cases** (0 items, 100 items, special characters)
- **Test performance** on slower devices
- **Get feedback from Arabic speakers** on text clarity

---

**Happy Testing! 🎉**

For questions or issues, refer to `/EXTENSION_SUMMARY.md` for component details.
