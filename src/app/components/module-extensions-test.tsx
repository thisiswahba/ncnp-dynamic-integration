import { useState } from 'react';
import { QuestionDetailsSidesheet } from './question-details-sidesheet';
import { ContentManagementList } from './content-management-list';
import { ContentDetailsSidesheet } from './content-details-sidesheet';
import { ContentForm } from './content-form';
import { EndUserContentView } from './end-user-content-view';
import { EndUserContentDetails } from './end-user-content-details';
import { toast } from 'sonner';

type ViewMode = 'menu' | 'question-sidesheet' | 'content-list' | 'content-form-create' | 'content-form-edit' | 'end-user-view' | 'end-user-details';

export function ModuleExtensionsTest() {
  const [currentView, setCurrentView] = useState<ViewMode>('menu');
  
  // Question Sidesheet States
  const [isQuestionSidesheetOpen, setIsQuestionSidesheetOpen] = useState(false);
  const [questionScenario, setQuestionScenario] = useState<'with-content' | 'no-content' | 'overridden'>('with-content');
  
  // Content Details Sidesheet States
  const [isContentDetailsSidesheetOpen, setIsContentDetailsSidesheetOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  
  // Content Form States
  const [isContentFormOpen, setIsContentFormOpen] = useState(false);
  const [contentFormMode, setContentFormMode] = useState<'create' | 'edit'>('create');
  
  // End User States
  const [endUserContentId, setEndUserContentId] = useState<string | null>(null);

  // Mock data for different scenarios
  const mockLinkedContent = {
    'with-content': [
      {
        id: '1',
        title: 'كيفية توثيق السياسات المالية',
        type: 'faq' as const,
        source: 'دليل الحوكمة المالية',
      },
      {
        id: '2',
        title: 'دليل إدارة المخاطر المالية',
        type: 'guideline' as const,
        source: 'معيار الحوكمة - المؤشر الثاني',
      },
      {
        id: '3',
        title: 'متطلبات الشفافية المالية',
        type: 'faq' as const,
        source: 'دليل الشفافية والإفصاح',
      },
    ],
    'no-content': [],
    'overridden': [
      {
        id: '1',
        title: 'كيفية توثيق السياسات المالية',
        type: 'faq' as const,
        source: 'دليل الحوكمة المالية',
      },
    ],
  };

  const mockContentDetails = {
    id: '1',
    title: 'كيفية توثيق السياسات المالية',
    type: 'faq' as const,
    status: 'published' as const,
    entityType: 'جمعية',
    entitySize: 'متوسطة',
    audience: ['مدراء ماليون', 'محاسبون'],
    tags: ['حوكمة', 'سياسات', 'توثيق'],
    content: `يجب أن تكون جميع السياسات المالية موثقة بشكل واضح ومعتمدة من الجهات المختصة. تشمل هذه السياسات:

السياسات الأساسية:
1. سياسة المشتريات والعقود
2. سياسة الصرف والتحويلات المالية
3. سياسة الاستثمار وإدارة الأصول

يجب أن يتم توثيق كل سياسة مالية من خلال:
• إعداد وثيقة رسمية تحتوي على جميع التفاصيل
• اعتماد الوثيقة من مجلس الإدارة
• نشر السياسة على جميع الموظفين المعنيين`,
    lastModified: '2024-01-15',
    createdBy: 'أحمد محمد',
    linkedQuestions: [
      {
        id: 'q1',
        title: 'هل تم توثيق جميع السياسات المالية بشكل رسمي؟',
        standardName: 'معيار الحوكمة المالية',
        indicatorName: 'مؤشر السياسات والإجراءات',
        practiceName: 'ممارسة التوثيق والاعتماد',
      },
      {
        id: 'q2',
        title: 'هل تتم مراجعة السياسات المالية بشكل دوري؟',
        standardName: 'معيار الحوكمة المالية',
        indicatorName: 'مؤشر المراجعة الدورية',
        practiceName: 'ممارسة التحديث المستمر',
      },
    ],
  };

  const mockEditData = {
    title: 'كيفية توثيق السياسات المالية',
    type: 'faq' as const,
    entityTypes: ['جمعية', 'مؤسسة'],
    entitySize: 'متوسطة',
    audience: ['مدراء ماليون', 'محاسبون'],
    tags: ['حوكمة', 'سياسات'],
    content: 'يجب أن تكون جميع السياسات المالية موثقة بشكل واضح...',
  };

  // Handlers
  const handleQuestionSave = (data: { score: number; reason: string; attachment?: File }) => {
    console.log('Question override saved:', data);
    toast.success('تم حفظ التعديل بنجاح');
    setIsQuestionSidesheetOpen(false);
  };

  const handleContentSave = (data: any, saveAs: 'draft' | 'published') => {
    console.log('Content saved:', { data, saveAs });
    toast.success(saveAs === 'published' ? 'تم نشر المحتوى بنجاح' : 'تم حفظ المسودة بنجاح');
    setIsContentFormOpen(false);
  };

  const handleContentView = (id: string) => {
    setSelectedContentId(id);
    setIsContentDetailsSidesheetOpen(true);
  };

  const handleContentEdit = (id: string) => {
    setContentFormMode('edit');
    setIsContentFormOpen(true);
    setIsContentDetailsSidesheetOpen(false);
  };

  const handleContentArchive = (id: string) => {
    console.log('Archive content:', id);
    toast.success('تم أرشفة المحتوى بنجاح');
  };

  const handleNavigateToQuestion = (questionId: string) => {
    console.log('Navigate to question:', questionId);
    toast.info('سيتم الانتقال إلى السؤال');
  };

  const handleEndUserViewContent = (id: string) => {
    setEndUserContentId(id);
    setCurrentView('end-user-details');
  };

  const handleEndUserBack = () => {
    setCurrentView('end-user-view');
    setEndUserContentId(null);
  };

  // Render test menu
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-background p-8" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border-2 border-primary p-8 mb-6">
            <h1 className="font-bold text-foreground text-center mb-2" style={{ fontSize: 'var(--text-3xl)' }}>
              اختبار الوحدات الجديدة
            </h1>
            <p className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-base)' }}>
              اختر أحد المكونات لعرضه واختباره
            </p>
          </div>

          <div className="space-y-6">
            {/* MODULE 1: Question Sidesheet */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-xl)' }}>
                المكون 1: تفاصيل السؤال (Question Details)
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                Side sheet يظهر عند النقر على سؤال في نموذج التقييم
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setQuestionScenario('with-content');
                    setIsQuestionSidesheetOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  ✅ مع محتوى مرتبط (3 عناصر)
                </button>
                <button
                  onClick={() => {
                    setQuestionScenario('no-content');
                    setIsQuestionSidesheetOpen(true);
                  }}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity border border-border"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  📭 بدون محتوى مرتبط
                </button>
                <button
                  onClick={() => {
                    setQuestionScenario('overridden');
                    setIsQuestionSidesheetOpen(true);
                  }}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors border border-amber-300"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  ✏️ معدّل يدوياً
                </button>
              </div>
            </div>

            {/* MODULE 2: Content Management */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-xl)' }}>
                المكون 2: إدارة المحتوى (Content Management)
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                قائمة المحتوى مع البحث والفلاتر والإجراءات
              </p>
              <button
                onClick={() => setCurrentView('content-list')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                عرض قائمة المحتوى
              </button>
            </div>

            {/* MODULE 3: Content Form */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-xl)' }}>
                المكون 3: نموذج المحتوى (Content Form)
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                نموذج إضافة أو تعديل محتوى (FAQ أو دليل)
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setContentFormMode('create');
                    setIsContentFormOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  ➕ وضع الإضافة
                </button>
                <button
                  onClick={() => {
                    setContentFormMode('edit');
                    setIsContentFormOpen(true);
                  }}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity border border-border"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  ✏️ وضع التعديل
                </button>
              </div>
            </div>

            {/* MODULE 4: End User Views */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-xl)' }}>
                المكون 4: عرض المستخدم النهائي (End User View)
              </h2>
              <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                مركز المعرفة للمستخدمين النهائيين (قراءة فقط)
              </p>
              <button
                onClick={() => setCurrentView('end-user-view')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                عرض مركز المعرفة
              </button>
            </div>
          </div>

          {/* Design System Info */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="font-bold text-foreground mb-2" style={{ fontSize: 'var(--text-lg)' }}>
              💡 ملاحظات الاختبار
            </h3>
            <ul className="space-y-2 text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
              <li>• جميع المكونات تستخدم متغيرات CSS من نظام التصميم</li>
              <li>• الخط المستخدم: IBM Plex Sans Arabic</li>
              <li>• التخطيط كامل من اليمين إلى اليسار (RTL)</li>
              <li>• افتح Developer Tools لرؤية القيم المستخدمة</li>
              <li>• جرّب تعديل المتغيرات في /src/styles/theme.css</li>
            </ul>
          </div>
        </div>

        {/* Render opened components */}
        <QuestionDetailsSidesheet
          isOpen={isQuestionSidesheetOpen}
          onClose={() => setIsQuestionSidesheetOpen(false)}
          questionTitle="هل تم توثيق جميع السياسات المالية بشكل رسمي ومعتمد من الجهات المختصة؟"
          linkedContent={mockLinkedContent[questionScenario]}
          aiScore={questionScenario === 'overridden' ? 75 : 85}
          currentScore={questionScenario === 'overridden' ? 90 : undefined}
          overrideReason={questionScenario === 'overridden' ? 'تم العثور على وثائق إضافية تثبت الاعتماد الكامل' : undefined}
          isOverridden={questionScenario === 'overridden'}
          onSave={handleQuestionSave}
        />

        <ContentForm
          isOpen={isContentFormOpen}
          onClose={() => setIsContentFormOpen(false)}
          onSave={handleContentSave}
          initialData={contentFormMode === 'edit' ? mockEditData : undefined}
          mode={contentFormMode}
        />
      </div>
    );
  }

  // Render Content List view
  if (currentView === 'content-list') {
    return (
      <>
        <ContentManagementList
          onViewContent={handleContentView}
          onEditContent={handleContentEdit}
          onArchiveContent={handleContentArchive}
          onCreateNew={() => {
            setContentFormMode('create');
            setIsContentFormOpen(true);
          }}
        />
        
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentView('menu')}
            className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors shadow-lg"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            ← العودة للقائمة
          </button>
        </div>

        <ContentDetailsSidesheet
          isOpen={isContentDetailsSidesheetOpen}
          onClose={() => setIsContentDetailsSidesheetOpen(false)}
          content={mockContentDetails}
          onEdit={handleContentEdit}
          onNavigateToQuestion={handleNavigateToQuestion}
        />

        <ContentForm
          isOpen={isContentFormOpen}
          onClose={() => setIsContentFormOpen(false)}
          onSave={handleContentSave}
          initialData={contentFormMode === 'edit' ? mockEditData : undefined}
          mode={contentFormMode}
        />
      </>
    );
  }

  // Render End User View
  if (currentView === 'end-user-view') {
    return (
      <>
        <EndUserContentView onViewContent={handleEndUserViewContent} />
        
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentView('menu')}
            className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors shadow-lg"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            ← العودة للقائمة
          </button>
        </div>
      </>
    );
  }

  // Render End User Details
  if (currentView === 'end-user-details' && endUserContentId) {
    return (
      <>
        <EndUserContentDetails
          contentId={endUserContentId}
          onBack={handleEndUserBack}
        />
        
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentView('menu')}
            className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors shadow-lg"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            ← العودة للقائمة
          </button>
        </div>
      </>
    );
  }

  return null;
}
