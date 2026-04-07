import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, FileText, Type, AlignLeft, List as ListIcon, Table2, Send, Archive } from 'lucide-react';
import { Header } from './header';
import { ConfirmationDialog } from './confirmation-dialog';
import { toast } from 'sonner';

// Mock data structure matching the form builder
const mockPreviewData = {
  title: 'نموذج التقييم المالي',
  registrationNumber: 'KB-2024-001',
  createdBy: 'أحمد محمد',
  date: '2024/01/15',
  isPublished: true,
  isArchived: false,
  criteria: [
    {
      id: '1',
      title: 'المعيار الأول: الشفافية المالية',
      status: 'completed',
      indicators: [
        {
          id: '1-1',
          title: 'المؤشر 1.1: الإفصاح المالي',
          status: 'completed',
          content: [
            { id: 'b1', type: 'heading', data: { text: 'متطلبات الإفصاح المالي' } },
            { id: 'b2', type: 'text', data: { text: 'يجب على المنظمة تقديم تقارير مالية شاملة وشفافة تتضمن جميع الإيرادات والمصروفات بشكل دقيق ومفصل.' } },
            { id: 'b3', type: 'list', data: { listType: 'bullet', items: ['القوائم المالية السنوية', 'تقارير التدقيق الخارجي', 'الإفصاح عن مصادر التمويل'] } },
          ]
        },
        {
          id: '1-2',
          title: 'المؤشر 1.2: النزاهة المالية',
          status: 'completed',
          content: [
            { id: 'b4', type: 'heading', data: { text: 'معايير النزاهة' } },
            { id: 'b5', type: 'text', data: { text: 'الالتزام بأعلى معايير النزاهة في التعاملات المالية وتجنب تضارب المصالح.' } },
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'المعيار الثاني: الحوكمة الإدارية',
      status: 'partial',
      indicators: [
        {
          id: '2-1',
          title: 'المؤشر 2.1: هيكل الحوكمة',
          status: 'completed',
          content: [
            { id: 'b6', type: 'heading', data: { text: 'الهيكل التنظيمي' } },
            { id: 'b7', type: 'text', data: { text: 'وجود هيكل تنظيمي واضح يحدد الأدوار والمسؤوليات.' } },
            { id: 'b8', type: 'table', data: { columns: ['المنصب', 'المسؤولية', 'الصلاحيات'], rows: [['مدير تنفيذي', 'الإدارة العامة', 'كاملة'], ['مدير مالي', 'الشؤون المالية', 'محدودة']] } },
          ]
        },
        {
          id: '2-2',
          title: 'المؤشر 2.2: السياسات والإجراءات',
          status: 'empty',
          content: []
        }
      ]
    },
    {
      id: '3',
      title: 'المعيار الثالث: المساءلة والمحاسبة',
      status: 'empty',
      indicators: [
        {
          id: '3-1',
          title: 'المؤشر 3.1: آليات المساءلة',
          status: 'empty',
          content: []
        }
      ]
    }
  ]
};

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'list' | 'table';
  data: any;
}

interface Indicator {
  id: string;
  title: string;
  status: 'empty' | 'partial' | 'completed';
  content: ContentBlock[];
}

interface Criterion {
  id: string;
  title: string;
  status: 'empty' | 'partial' | 'completed';
  indicators: Indicator[];
}

export function ContentPreviewPage({ onCancel }: { onCancel?: () => void }) {
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set(['1', '2']));
  const [expandedIndicators, setExpandedIndicators] = useState<Set<string>>(new Set(['1-1', '1-2', '2-1']));
  const [isPublished, setIsPublished] = useState(mockPreviewData.isPublished);
  const [isArchived, setIsArchived] = useState(mockPreviewData.isArchived);

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'publish' | 'unpublish' | 'archive' | 'unarchive' | null;
  }>({
    isOpen: false,
    type: null
  });

  const handleTogglePublish = () => {
    setConfirmDialog({
      isOpen: true,
      type: isPublished ? 'unpublish' : 'publish'
    });
  };

  const handleToggleArchive = () => {
    setConfirmDialog({
      isOpen: true,
      type: isArchived ? 'unarchive' : 'archive'
    });
  };

  const handleConfirmAction = () => {
    const { type } = confirmDialog;

    if (type === 'publish') {
      setIsPublished(true);
      toast.success('تم نشر المحتوى بنجاح');
    } else if (type === 'unpublish') {
      setIsPublished(false);
      toast.success('تم إلغاء نشر المحتوى بنجاح');
    } else if (type === 'archive') {
      setIsArchived(true);
      toast.success('تم أرشفة المحتوى بنجاح');
    } else if (type === 'unarchive') {
      setIsArchived(false);
      toast.success('تم إلغاء أرشفة المحتوى بنجاح');
    }

    setConfirmDialog({
      isOpen: false,
      type: null
    });
  };

  const getDialogMessage = () => {
    const { type } = confirmDialog;
    if (type === 'publish') return 'هل أنت متأكد أنك تريد نشر هذا المحتوى؟';
    if (type === 'unpublish') return 'هل أنت متأكد أنك تريد إلغاء نشر هذا المحتوى؟';
    if (type === 'archive') return 'هل أنت متأكد أنك تريد أرشفة هذا المحتوى؟';
    if (type === 'unarchive') return 'هل أنت متأكد أنك تريد إلغاء أرشفة هذا المحتوى؟';
    return '';
  };

  const toggleCriterion = (id: string) => {
    const newSet = new Set(expandedCriteria);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCriteria(newSet);
  };

  const toggleIndicator = (id: string) => {
    const newSet = new Set(expandedIndicators);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIndicators(newSet);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      case 'empty': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'partial': return 'جزئي';
      case 'empty': return 'فارغ';
      default: return status;
    }
  };

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <h3 key={block.id} className="text-foreground text-right mb-3" style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
            {block.data.text}
          </h3>
        );
      case 'text':
        return (
          <p key={block.id} className="text-foreground text-right mb-3 leading-relaxed" style={{ fontSize: 'var(--text-sm)' }}>
            {block.data.text}
          </p>
        );
      case 'list':
        return (
          <ul key={block.id} className="list-disc mr-6 text-right mb-3 space-y-2">
            {block.data.items.map((item: string, idx: number) => (
              <li key={idx} className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'table':
        return (
          <div key={block.id} className="overflow-x-auto mb-3">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  {block.data.columns.map((col: string, idx: number) => (
                    <th key={idx} className="px-4 py-2 border-b border-border text-foreground text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.data.rows.map((row: string[], rowIdx: number) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-2 border-b border-border text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header isSideNavOpen={false} />
      
      <div className="px-8 py-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-foreground text-right mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                {mockPreviewData.title}
              </h1>
              <div className="flex flex-row-reverse items-center gap-4 text-muted-foreground">
                <span style={{ fontSize: 'var(--text-sm)' }}>
                  رقم التسجيل: {mockPreviewData.registrationNumber}
                </span>
                <span style={{ fontSize: 'var(--text-sm)' }}>
                  بواسطة: {mockPreviewData.createdBy}
                </span>
                <span style={{ fontSize: 'var(--text-sm)' }}>
                  التاريخ: {mockPreviewData.date}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePublish}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  isPublished 
                    ? 'bg-orange-600 text-white hover:bg-orange-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Send className="w-4 h-4" />
                {isPublished ? 'إلغاء النشر' : 'نشر'}
              </button>
              
              <button
                onClick={handleToggleArchive}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Archive className="w-4 h-4" />
                {isArchived ? 'إلغاء الأرشفة' : 'أرشفة'}
              </button>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-border text-foreground rounded hover:bg-muted transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  رجوع
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="space-y-4">
            {mockPreviewData.criteria.map((criterion) => (
              <div key={criterion.id} className="border border-border rounded-lg overflow-hidden">
                {/* Criterion Header */}
                <button
                  onClick={() => toggleCriterion(criterion.id)}
                  className="w-full flex items-center justify-between flex-row-reverse p-4 bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>
                      {criterion.title}
                    </span>
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(criterion.status)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {getStatusText(criterion.status)}
                    </span>
                  </div>
                  {expandedCriteria.has(criterion.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* Criterion Content */}
                {expandedCriteria.has(criterion.id) && (
                  <div className="p-4 pr-12 space-y-3">
                    {criterion.indicators.map((indicator) => (
                      <div key={indicator.id} className="border border-border rounded-lg overflow-hidden">
                        {/* Indicator Header */}
                        <button
                          onClick={() => toggleIndicator(indicator.id)}
                          className="w-full flex items-center justify-between flex-row-reverse p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-row-reverse">
                            <ArrowRight className="w-4 h-4 text-primary" />
                            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              {indicator.title}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full ${getStatusColor(indicator.status)}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                              {getStatusText(indicator.status)}
                            </span>
                          </div>
                          {expandedIndicators.has(indicator.id) ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>

                        {/* Indicator Content */}
                        {expandedIndicators.has(indicator.id) && (
                          <div className="p-4 bg-white">
                            {indicator.content.length > 0 ? (
                              <div className="space-y-3">
                                {indicator.content.map(renderContentBlock)}
                              </div>
                            ) : (
                              <p className="text-muted-foreground italic" style={{ fontSize: 'var(--text-sm)' }}>
                                لا يوجد محتوى
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="تأكيد الإجراء"
        message={getDialogMessage()}
        confirmText="تأكيد"
        cancelText="إلغاء"
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null })}
      />
    </div>
  );
}