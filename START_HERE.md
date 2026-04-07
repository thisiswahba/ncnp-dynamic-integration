# 🎯 START HERE - Testing the New Components

## Step-by-Step Visual Guide

### Step 1: Launch Your Application
Run your React app as you normally would.

### Step 2: Look for This Button
When the app loads, look in the **top-left corner** of the screen:

```
┌────────────────────────────────────────────────────────────┐
│  [≡]        🧪 وضع الاختبار - المكونات الجديدة              │
│           ↑                                                 │
│      CLICK THIS!                                           │
└────────────────────────────────────────────────────────────┘
```

It's a **purple button** with a test tube icon that says:
> **🧪 وضع الاختبار - المكونات الجديدة**

### Step 3: Click It!
You'll see a test menu that looks like this:

```
┌─────────────────────────────────────────────────────────┐
│            اختبار الوحدات الجديدة                       │
│         Test the Extended Modules                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  المكون 1: تفاصيل السؤال (Question Details)      │  │
│  │  Side sheet for question with linked content     │  │
│  │  ────────────────────────────────────────         │  │
│  │  [✅ مع محتوى]  [📭 بدون محتوى]  [✏️ معدّل]    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  المكون 2: إدارة المحتوى (Content Management)    │  │
│  │  Admin list to manage FAQs & Guidelines          │  │
│  │  ────────────────────────────────────────         │  │
│  │  [عرض قائمة المحتوى]                            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  المكون 3: نموذج المحتوى (Content Form)          │  │
│  │  Add/Edit content modal                           │  │
│  │  ────────────────────────────────────────         │  │
│  │  [➕ وضع الإضافة]  [✏️ وضع التعديل]             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  المكون 4: عرض المستخدم (End User View)          │  │
│  │  Public knowledge base listing                    │  │
│  │  ────────────────────────────────────────         │  │
│  │  [عرض مركز المعرفة]                             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 What Each Button Does

### 1️⃣ Question Details Buttons

**[✅ مع محتوى مرتبط]** → Opens side sheet with 3 linked content items
- Test: Click linked content, enter score, add reason, upload file

**[📭 بدون محتوى مرتبط]** → Opens side sheet with empty state
- Test: Manual override without linked content

**[✏️ معدّل يدوياً]** → Opens side sheet in overridden state
- Test: Already has manual score and reason

---

### 2️⃣ Content Management Button

**[عرض قائمة المحتوى]** → Opens full content management screen
- Test: Search, filter, click rows, use menu, open details side sheet

---

### 3️⃣ Content Form Buttons

**[➕ وضع الإضافة]** → Opens empty form
- Test: Validation, field requirements, conditional fields

**[✏️ وضع التعديل]** → Opens pre-filled form
- Test: Editing existing content

---

### 4️⃣ End User View Button

**[عرض مركز المعرفة]** → Opens public knowledge base
- Test: Search, browse, click cards, view details

---

## 🎯 Quick 2-Minute Test

Want to test everything super fast? Follow this:

1. **Click purple test button** (top-left)
2. **Click "مع محتوى مرتبط"** → Side sheet opens
   - ✅ See 3 linked items
3. **Enter score "95"** → Type a reason → **Click "حفظ وتطبيق"**
   - ✅ Success toast appears
4. **Click "عرض قائمة المحتوى"**
   - ✅ Table displays
5. **Click first row**
   - ✅ Details side sheet opens
6. **Click "وضع الإضافة"**
   - ✅ Form modal opens
7. **Try clicking "نشر"** without filling
   - ✅ See validation errors
8. **Click "عرض مركز المعرفة"**
   - ✅ Knowledge base cards appear

**Done!** You've tested all 6 components in 2 minutes.

---

## 📸 What You Should See

### When You Click the Test Button:
```
You'll see a white screen with:
- Blue header box with title
- 4 white component boxes
- Multiple test buttons in each box
- Blue info box at bottom
```

### When You Open Components:
```
Side Sheets:
- Slide in from LEFT side of screen
- 600-700px wide
- White background
- Scrollable content
- Close button (×) at top

Modals:
- Center of screen
- Max 800px wide
- White background
- Overlay behind
- Close button (×) at top
```

---

## ✅ Design System Check

While testing, verify these CSS variables are being used:

### Open Browser DevTools:
1. **Right-click** any element
2. **Click "Inspect"**
3. **Go to "Computed" tab**
4. **Look for**:
   ```css
   background-color: var(--primary)  ✓
   font-size: var(--text-sm)         ✓
   border-radius: var(--radius)       ✓
   ```

### Font Check:
All Arabic text should use:
```css
font-family: "IBM Plex Sans Arabic", sans-serif
```

### RTL Check:
All text should:
- ✅ Align to the RIGHT
- ✅ Start from the RIGHT
- ✅ Flow RIGHT-to-LEFT

---

## 🚨 Troubleshooting

### Can't Find Purple Button?
- Make sure the app is running
- Check the top-left corner of the screen
- It's next to the menu (≡) button

### Purple Button Not Working?
- Check browser console for errors
- Refresh the page
- Make sure all files are saved

### Components Not Opening?
- Check if you clicked the right button
- Look for error messages in console
- Verify all components are imported correctly

### No Toast Notifications?
- Check if `<Toaster />` is rendered
- Verify sonner package is installed
- Check console for errors

---

## 📋 Quick Checklist

Before you start testing:
- ☐ App is running
- ☐ Browser DevTools open (F12)
- ☐ Console tab visible (to check for errors)
- ☐ Ready to click the purple button!

While testing:
- ☐ Try all buttons in test menu
- ☐ Verify RTL layout (text aligns right)
- ☐ Check CSS variables in DevTools
- ☐ Test form validation
- ☐ Try search and filters
- ☐ Click everything clickable!

After testing:
- ☐ No console errors
- ☐ All interactions smooth
- ☐ Design looks consistent
- ☐ Ready to integrate!

---

## 📚 What to Read Next

After you've clicked around and tested the components:

1. **For Quick Reference:**  
   → Read `/QUICK_TEST_REFERENCE.md`

2. **For Detailed Testing:**  
   → Read `/TESTING_GUIDE.md`

3. **For Component Details:**  
   → Read `/EXTENSION_SUMMARY.md`

4. **For Visual Reference:**  
   → Read `/TEST_VISUAL_CHECKLIST.md`

---

## 🎯 Your Testing Goal

By the end of testing, you should have:

✅ Clicked all test buttons  
✅ Opened all 6 components  
✅ Verified RTL layout  
✅ Checked CSS variables  
✅ Tested form validation  
✅ Tried search/filters  
✅ Seen all states (empty, error, success)  
✅ Confirmed smooth interactions  
✅ Found zero console errors  

---

## 🎉 Ready?

**Here's what to do RIGHT NOW:**

1. **Make sure your app is running**
2. **Look for the purple button** (top-left corner)
3. **Click it**
4. **Start testing!**

That's it! You're ready to go.

---

## 💡 Remember

- **Purple button = Test Mode**
- **Click everything** to see how it works
- **Check DevTools** for CSS variables
- **Verify RTL** (text aligns right)
- **No console errors** = success!

---

## 🚀 Let's Go!

```
┌─────────────────────────────────────┐
│                                     │
│   Click the purple button now! →   │
│   🧪 وضع الاختبار - المكونات الجديدة │
│                                     │
│   It's in the top-left corner      │
│   of your screen                    │
│                                     │
└─────────────────────────────────────┘
```

**Happy Testing!** 🎊

---

**Questions?** Check the other documentation files.  
**Issues?** Look at the console for error messages.  
**Success?** Mark your checklist and start integration!

🎯 **You've got this!**
