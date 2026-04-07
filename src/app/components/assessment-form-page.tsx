import { useState } from 'react';
import { Bell, Globe, ChevronDown, Upload, Save } from 'lucide-react';
import { GuidelinesSideSheet } from './guidelines-side-sheet';
import logoImage from 'figma:asset/eb19f4f5c91e0812549c9957d951987bdc36b318.png';

interface AssessmentFormPageProps {
  onBack?: () => void;
  onSave?: () => void;
}

/**
 * Assessment Form Page Component
 * Form filling interface for entities to complete assessments
 * Uses design system CSS variables and IBM Plex Sans Arabic font
 */
export function AssessmentFormPage({ onBack, onSave }: AssessmentFormPageProps) {
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    question1: 'yes',
    question2: '',
  });

  const handleSave = () => {
    console.log('Form saved:', formData);
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Top Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Right Side - User Info */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <button className="flex items-center gap-2 hover:bg-muted rounded-lg px-3 py-2 transition-colors">
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>العربية</span>
              <Globe className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  أحمد محمود
                </div>
                <div className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  مدير الجهة
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                أم
              </div>
            </div>
          </div>

          {/* Left Side - Logo */}
          <div>
            <img src={logoImage} alt="شعار المركز الوطني للقطاع غير الربحي" className="h-12" />
          </div>
        </div>
      </header>

      {/* Action Bar */}
      <div className="bg-white border-b border-border px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Save className="w-4 h-4 text-foreground" />
            <span className="text-foreground">احفظ كمسودة</span>
          </button>
          
          <div className="text-info" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="bg-warning-light text-warning-foreground px-3 py-1 rounded-full">
              تقديم نموذج تجريبي
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Form Area */}
          <div className="flex-1">
            {/* Form Title */}
            <div className="mb-6">
              <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-semibold)' }}>
                قم بتعبئة الأسئلة التالية
              </h1>
              <div className="flex items-center gap-2 text-primary" style={{ fontSize: 'var(--text-sm)' }}>
                <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span>16/16</span>
              </div>
            </div>

            {/* Question 1 */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-foreground flex-1" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                  الأسئلة هل تم اتخاذ القرارات المناسبة للحد من الإضرار العام أو تغيير الأعمال؟
                </h3>
                <button
                  onClick={() => setIsGuidelinesOpen(true)}
                  className="text-primary hover:underline flex-shrink-0 mr-4"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  الارشادات
                </button>
              </div>

              {/* Radio Options */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="question1"
                    value="yes"
                    checked={formData.question1 === 'yes'}
                    onChange={(e) => setFormData({ ...formData, question1: e.target.value })}
                    className="w-5 h-5 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>نعم</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="question1"
                    value="no"
                    checked={formData.question1 === 'no'}
                    onChange={(e) => setFormData({ ...formData, question1: e.target.value })}
                    className="w-5 h-5 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>لم يتم اختيارنا مجانًا أو عفوياً حتى الآن</span>
                </label>
              </div>

              {/* Response Field */}
              <div className="mb-4">
                <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                  تبرير الإجابة (اختياري)
                </label>
                <textarea
                  className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  placeholder="النص المُدخل"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  رفع المرفقات
                </label>
                <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                  Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/20 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <div className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      اسم الملف.CSV
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="mb-8 pb-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-foreground flex-1" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                  الأسئلة هل تم اتخاذ دعم محاسب الإدارة السابق أو أدب أخطائها في الإجتماع الأول بعد تغيير الأعضاء؟
                </h3>
                <button
                  onClick={() => setIsGuidelinesOpen(true)}
                  className="text-primary hover:underline flex-shrink-0 mr-4"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  الارشادات
                </button>
              </div>

              {/* Radio Options */}
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="question2"
                    value="yes"
                    checked={formData.question2 === 'yes'}
                    onChange={(e) => setFormData({ ...formData, question2: e.target.value })}
                    className="w-5 h-5 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>نعم</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="question2"
                    value="no"
                    checked={formData.question2 === 'no'}
                    onChange={(e) => setFormData({ ...formData, question2: e.target.value })}
                    className="w-5 h-5 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>لم يتم اختيارنا مجانًا أو عفوياً حتى الآن</span>
                </label>
              </div>

              {/* Response Field */}
              <div className="mb-4">
                <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)' }}>
                  تبرير الإجابة (اختياري)
                </label>
                <textarea
                  className="w-full border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  placeholder="النص المُدخل"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  رفع المرفقات
                </label>
                <div className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                  Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
                </div>
                
                {/* Upload Button */}
                <button className="w-full bg-primary text-primary-foreground py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                  <Upload className="w-5 h-5" />
                  تحميل الملفات
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-6">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded hover:opacity-90 transition-opacity" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                التالي
              </button>
            </div>
          </div>

          {/* Right Sidebar - Progress Navigation */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-6">
              <div className="bg-muted/30 rounded-lg p-6 border border-border">
                <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
                  نموذج تقييم المخاطر المالية
                </h2>
                
                {/* Progress Tree */}
                <div className="mt-6 space-y-4">
                  {/* Level 1 - Active */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center flex-shrink-0">
                        <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>1</span>
                      </div>
                      <div className="w-0.5 h-16 bg-primary mt-1"></div>
                    </div>
                    <div className="pt-1.5">
                      <div className="text-primary" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                        القسم المعياري
                      </div>
                    </div>
                  </div>

                  {/* Level 2 - Sub items */}
                  <div className="mr-5 space-y-2">
                    <button
                      onClick={() => setIsGuidelinesOpen(true)}
                      className="flex items-center gap-2 text-right hover:bg-muted/50 px-2 py-1 rounded transition-colors w-full"
                    >
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-primary flex-shrink-0"></div>
                      <span className="text-primary" style={{ fontSize: 'var(--text-sm)' }}>اسم المؤشر</span>
                      <button className="text-primary mr-auto hover:underline" style={{ fontSize: 'var(--text-xs)' }}>
                        الارشادات
                      </button>
                    </button>

                    {/* Practice items */}
                    <div className="mr-4 space-y-1.5">
                      <div className="flex items-center gap-2 bg-success-light px-2 py-1.5 rounded">
                        <span className="text-success" style={{ fontSize: 'var(--text-sm)' }}>اسم الممارسة ٢</span>
                        <button
                          onClick={() => setIsGuidelinesOpen(true)}
                          className="text-success mr-auto hover:underline"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          الارشادات
                        </button>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>اسم الممارسة ٢</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>اسم الممارسة ٣</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <div className="w-3 h-3 rounded-full border-2 border-border bg-white flex-shrink-0"></div>
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>اسم المؤشر</span>
                    </div>
                  </div>

                  {/* Level 1 - Inactive items */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-border bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>2</span>
                    </div>
                    <div className="pt-1.5">
                      <div className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
                        القسم المعياري
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-border bg-white flex items-center justify-center flex-shrink-0">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>3</span>
                    </div>
                    <div className="pt-1.5">
                      <div className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
                        القسم المعياري
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Side Sheet */}
      <GuidelinesSideSheet isOpen={isGuidelinesOpen} onClose={() => setIsGuidelinesOpen(false)} />
    </div>
  );
}