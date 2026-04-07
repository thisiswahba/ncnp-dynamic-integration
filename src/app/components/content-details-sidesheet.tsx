import { X, ExternalLink, FileText, BookOpen, Edit2, Link as LinkIcon } from 'lucide-react';

interface LinkedQuestion {
  id: string;
  title: string;
  standardName: string;
  indicatorName: string;
  practiceName: string;
}

interface ContentDetailsData {
  id: string;
  title: string;
  type: 'faq' | 'guideline';
  status: 'draft' | 'published';
  entityType: string;
  entitySize?: string;
  audience?: string[];
  tags?: string[];
  content: string;
  lastModified: string;
  createdBy: string;
  linkedQuestions: LinkedQuestion[];
}

interface ContentDetailsSidesheetProps {
  isOpen: boolean;
  onClose: () => void;
  content: ContentDetailsData | null;
  onEdit: (id: string) => void;
  onNavigateToQuestion: (questionId: string) => void;
}

export function ContentDetailsSidesheet({
  isOpen,
  onClose,
  content,
  onEdit,
  onNavigateToQuestion,
}: ContentDetailsSidesheetProps) {
  if (!isOpen || !content) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Side Sheet */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-[700px] bg-white shadow-2xl z-50 overflow-y-auto"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 z-10">
          <div className="flex items-start justify-between mb-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex-1 mr-4">
              <div className="flex items-center gap-3 mb-2">
                {content.type === 'faq' ? (
                  <FileText className="w-6 h-6 text-primary" />
                ) : (
                  <BookOpen className="w-6 h-6 text-primary" />
                )}
                <h2 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-xl)' }}>
                  {content.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: content.type === 'faq' ? 'var(--blue-50)' : 'var(--green-50)',
                    color: content.type === 'faq' ? 'var(--blue-700)' : 'var(--green-700)',
                  }}
                >
                  {content.type === 'faq' ? 'سؤال شائع' : 'محتوى دليل'}
                </span>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: content.status === 'published' ? 'var(--green-50)' : 'var(--gray-100)',
                    color: content.status === 'published' ? 'var(--green-700)' : 'var(--gray-700)',
                  }}
                >
                  {content.status === 'published' ? 'منشور' : 'مسودة'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onEdit(content.id)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <span className="font-medium">تعديل</span>
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Content Body */}
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-base)' }}>
              محتوى النص
            </h3>
            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <p className="text-foreground text-right leading-relaxed whitespace-pre-wrap" style={{ fontSize: 'var(--text-sm)' }}>
                {content.content}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Metadata Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-base)' }}>
              البيانات الوصفية
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                  نوع الجهة
                </span>
                <span className="text-foreground text-right block font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                  {content.entityType}
                </span>
              </div>

              {content.entitySize && (
                <div className="space-y-1">
                  <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                    حجم الجهة
                  </span>
                  <span className="text-foreground text-right block font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                    {content.entitySize}
                  </span>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                  آخر تعديل
                </span>
                <span className="text-foreground text-right block font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                  {content.lastModified}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                  تم الإنشاء بواسطة
                </span>
                <span className="text-foreground text-right block font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                  {content.createdBy}
                </span>
              </div>
            </div>

            {/* Audience */}
            {content.audience && content.audience.length > 0 && (
              <div className="space-y-2">
                <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                  الجمهور
                </span>
                <div className="flex flex-wrap gap-2">
                  {content.audience.map((aud, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full"
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-muted-foreground text-right block" style={{ fontSize: 'var(--text-xs)' }}>
                  الوسوم
                </span>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-muted rounded-full text-foreground"
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Linked Evaluation Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-base)' }}>
                الأسئلة المرتبطة في نماذج التقييم
              </h3>
              <LinkIcon className="w-4 h-4 text-muted-foreground" />
            </div>

            {content.linkedQuestions.length > 0 ? (
              <div className="space-y-3">
                {content.linkedQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => onNavigateToQuestion(question.id)}
                    className="w-full p-4 bg-muted/20 hover:bg-muted/30 rounded-lg border border-border transition-colors text-right group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                          {question.title}
                        </p>
                        <div className="flex items-center gap-2 text-muted-foreground text-right flex-wrap" style={{ fontSize: 'var(--text-xs)' }}>
                          <span>{question.standardName}</span>
                          <span>←</span>
                          <span>{question.indicatorName}</span>
                          <span>←</span>
                          <span>{question.practiceName}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-muted/10 rounded-lg border border-dashed border-border text-center">
                <LinkIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لم يتم ربط هذا المحتوى بأي أسئلة تقييم
                </p>
              </div>
            )}
          </div>

          {/* Usage Note */}
          {content.linkedQuestions.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                💡 هذا المحتوى مستخدم في {content.linkedQuestions.length} سؤال تقييم. أي تعديل على هذا المحتوى سيظهر في جميع الأسئلة المرتبطة.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
