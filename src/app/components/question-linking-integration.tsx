import { useState } from 'react';
import { Link2, Edit2 } from 'lucide-react';
import { QuestionLinkingModal, type LinkedContent } from './question-linking-modal';
import { LinkedContentDisplay } from './linked-content-display';
import { toast } from 'sonner';

/**
 * Question Linking Integration Component
 * 
 * This component demonstrates how to integrate the Question Linking Modal
 * into your form builder. Add this component to your question edit/create screen.
 */

interface QuestionWithLinks {
  id: string;
  title: string;
  linkedContent: LinkedContent[];
}

export function QuestionLinkingIntegration() {
  const [showLinkingModal, setShowLinkingModal] = useState(false);
  const [question, setQuestion] = useState<QuestionWithLinks>({
    id: 'q1',
    title: 'ما هي آليات الحوكمة المؤسسية المتبعة في المنظمة؟',
    linkedContent: []
  });

  const handleSaveLinks = (linkedItems: LinkedContent[]) => {
    setQuestion(prev => ({
      ...prev,
      linkedContent: linkedItems
    }));
    toast.success('تم حفظ الروابط بنجاح');
  };

  const handleViewLinkedContent = (item: LinkedContent) => {
    toast.info(`فتح المحتوى: ${item.contentName}`);
    // Here you would open the content in a new tab or side panel
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Question Title Example */}
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              عنوان السؤال
            </label>
            <input
              type="text"
              value={question.title}
              onChange={(e) => setQuestion(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            />
          </div>
        </div>

        {/* Link Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLinkingModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            <Link2 className="w-4 h-4" />
            ربط بمحتوى قاعدة المعرفة
          </button>

          {question.linkedContent.length > 0 && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {question.linkedContent.length} محتوى مرتبط
            </span>
          )}
        </div>

        {/* Display Linked Content */}
        <LinkedContentDisplay 
          linkedItems={question.linkedContent}
          onViewContent={handleViewLinkedContent}
        />
      </div>

      {/* Instructions Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-blue-900 mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>
          كيفية ربط السؤال بالمحتوى المرجعي
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="text-blue-600">1.</span>
            <span>انقر على زر "ربط بمحتوى قاعدة المعرفة"</span>
          </li>
          <li className="flex items-start gap-2 text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="text-blue-600">2.</span>
            <span>اختر فرع المحتوى (دليل، نموذج، أو أسئلة شائعة)</span>
          </li>
          <li className="flex items-start gap-2 text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="text-blue-600">3.</span>
            <span>حدد المحتوى والمستوى والسؤال المرتبط</span>
          </li>
          <li className="flex items-start gap-2 text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="text-blue-600">4.</span>
            <span>انقر على "إضافة الربط" لإضافة المحتوى إلى القائمة</span>
          </li>
          <li className="flex items-start gap-2 text-blue-800" style={{ fontSize: 'var(--text-sm)' }}>
            <span className="text-blue-600">5.</span>
            <span>احفظ الروابط عند الانتهاء</span>
          </li>
        </ul>
      </div>

      {/* Example: Multiple Questions */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          أمثلة على الأسئلة المرتبطة
        </h3>
        
        <div className="space-y-4">
          {/* Example 1 */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-foreground flex-1" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                هل يوجد مجلس إدارة منتخب ومعتمد وفقاً للأنظمة؟
              </h4>
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="تعديل الروابط"
              >
                <Edit2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <LinkedContentDisplay 
              linkedItems={[
                {
                  id: '1',
                  contentType: 'rules-guidelines',
                  contentName: 'دليل الحوكمة المؤسسية',
                  level1: 'المعيار الأول',
                  level2: 'المؤشر 1.1',
                  questionTitle: 'ما هي متطلبات تشكيل مجلس الإدارة؟'
                },
                {
                  id: '2',
                  contentType: 'faq',
                  contentName: 'أسئلة شائعة - الحوكمة',
                  questionTitle: 'كيف يتم انتخاب أعضاء مجلس الإدارة؟'
                }
              ]}
              onViewContent={handleViewLinkedContent}
            />
          </div>

          {/* Example 2 */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="text-foreground flex-1" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                هل تلتزم المنظمة بإعداد ونشر التقارير المالية السنوية؟
              </h4>
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="تعديل الروابط"
              >
                <Edit2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <LinkedContentDisplay 
              linkedItems={[
                {
                  id: '3',
                  contentType: 'rules-guidelines',
                  contentName: 'دليل الشفافية والمساءلة',
                  level1: 'المعيار الثاني',
                  level2: 'المؤشر 2.1',
                  questionTitle: 'ما هي متطلبات التقارير المالية؟'
                },
                {
                  id: '4',
                  contentType: 'evaluation-forms',
                  contentName: 'نموذج تقييم الأداء المؤسسي',
                  level1: 'المحور الأول',
                  questionTitle: 'متطلبات الشفافية المالية'
                }
              ]}
              onViewContent={handleViewLinkedContent}
            />
          </div>
        </div>
      </div>

      {/* Linking Modal */}
      {showLinkingModal && (
        <QuestionLinkingModal
          onClose={() => setShowLinkingModal(false)}
          onSave={handleSaveLinks}
          existingLinks={question.linkedContent}
        />
      )}
    </div>
  );
}
