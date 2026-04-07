import { ChevronRight, FileText, BookOpen, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';

interface EndUserContentDetailsProps {
  contentId: string;
  onBack: () => void;
}

export function EndUserContentDetails({ contentId, onBack }: EndUserContentDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Mock data - would come from API based on contentId
  const content = {
    id: contentId,
    title: 'كيفية توثيق السياسات المالية',
    type: 'faq' as const,
    entityType: 'جمعية',
    audience: ['مدراء ماليون', 'محاسبون'],
    lastModified: '2024-01-15',
    content: `يجب أن تكون جميع السياسات المالية موثقة بشكل واضح ومعتمدة من الجهات المختصة. تشمل هذه السياسات:

**السياسات الأساسية:**

1. سياسة المشتريات والعقود
2. سياسة الصرف والتحويلات المالية
3. سياسة الاستثمار وإدارة الأصول
4. سياسة إدارة المخاطر المالية

**عملية التوثيق:**

يجب أن يتم توثيق كل سياسة مالية من خلال:
• إعداد وثيقة رسمية تحتوي على جميع التفاصيل والإجراءات
• اعتماد الوثيقة من مجلس الإدارة أو الجهة المختصة
• نشر السياسة وتعميمها على جميع الموظفين المعنيين
• المراجعة الدورية للسياسة (على الأقل مرة واحدة سنوياً)

**الوثائق المطلوبة:**

عند توثيق السياسات المالية، يجب التأكد من توفر:
- نسخة موقعة من السياسة المعتمدة
- قرار الاعتماد الصادر من الجهة المختصة
- محاضر اجتماعات لجنة المراجعة
- سجل التحديثات والتعديلات

**أفضل الممارسات:**

• استخدام لغة واضحة وبسيطة في صياغة السياسات
• تضمين أمثلة عملية توضيحية
• تحديد المسؤوليات والصلاحيات بوضوح
• وضع آليات للمتابعة والتقييم`,
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border px-8 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى مركز المعرفة</span>
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-lg ${
              content.type === 'faq' 
                ? 'bg-blue-50' 
                : 'bg-green-50'
            }`}>
              {content.type === 'faq' ? (
                <FileText className="w-7 h-7 text-blue-600" />
              ) : (
                <BookOpen className="w-7 h-7 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="font-bold text-foreground text-right flex-1" style={{ fontSize: 'var(--text-2xl)' }}>
                  {content.title}
                </h1>
                {/* Favorite Button */}
                <button
                  onClick={toggleFavorite}
                  className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                  aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isFavorite 
                        ? 'fill-red-600 text-red-600' 
                        : 'text-muted-foreground hover:text-red-600'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: content.type === 'faq' ? 'var(--blue-50)' : 'var(--green-50)',
                    color: content.type === 'faq' ? 'var(--blue-700)' : 'var(--green-700)',
                  }}
                >
                  {content.type === 'faq' ? 'سؤال شائع' : 'دليل إرشادي'}
                </span>

                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  •
                </span>

                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {content.entityType}
                </span>

                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  •
                </span>

                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  آخر تحديث: {content.lastModified}
                </span>
              </div>

              {content.audience && content.audience.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                    الجمهور المستهدف:
                  </span>
                  <div className="flex gap-1">
                    {content.audience.map((aud, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-border p-8">
            <div 
              className="prose prose-sm max-w-none text-right"
              dir="rtl"
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: '1.75',
              }}
            >
              {content.content.split('\n').map((paragraph, idx) => {
                // Handle headings
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  const text = paragraph.replace(/\*\*/g, '');
                  return (
                    <h3 
                      key={idx} 
                      className="font-bold text-foreground text-right mt-6 mb-3"
                      style={{ fontSize: 'var(--text-lg)' }}
                    >
                      {text}
                    </h3>
                  );
                }
                
                // Handle numbered lists
                if (/^\d+\./.test(paragraph)) {
                  return (
                    <p key={idx} className="text-foreground text-right my-2 pr-6">
                      {paragraph}
                    </p>
                  );
                }
                
                // Handle bullet lists
                if (paragraph.startsWith('•')) {
                  return (
                    <p key={idx} className="text-foreground text-right my-2 pr-6">
                      {paragraph}
                    </p>
                  );
                }
                
                // Handle dashes
                if (paragraph.startsWith('-')) {
                  return (
                    <p key={idx} className="text-foreground text-right my-2 pr-6">
                      {paragraph}
                    </p>
                  );
                }
                
                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-foreground text-right my-4">
                      {paragraph}
                    </p>
                  );
                }
                
                // Empty lines
                return <div key={idx} className="h-2" />;
              })}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
              💡 <strong>هل كان هذا المحتوى مفيداً؟</strong> يمكنك الرجوع إلى مركز المعرفة للحصول على المزيد من الأدلة والأسئلة الشائعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}