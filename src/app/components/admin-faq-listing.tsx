import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Edit2, Archive, Eye, MoreVertical, HelpCircle, X, Calendar, CheckSquare, Square, Send } from 'lucide-react';
import { toast } from 'sonner';
import { AdminFAQDetails } from './admin-faq-details';
import { ConfirmationDialog } from './confirmation-dialog';

interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  owner: string;
  publishStatus: boolean;
  entityType: string;
  entitySize: string;
  classifications: string[];
  questionGroups: string[];
  audiences: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

const mockAdminFAQs: AdminFAQ[] = [
  {
    id: '1',
    question: 'ما هي معايير الحوكمة المطلوبة للجهات الحكومية؟',
    answer: 'معايير الحوكمة المطلوبة تشمل الشفافية في الإفصاح المالي، المساءلة الإدارية، وضوح الأدوار والمسؤوليات...',
    owner: 'أحمد محمد',
    publishStatus: true,
    entityType: 'جهة حكومية',
    entitySize: 'كبيرة',
    classifications: ['حوكمة عامة', 'معايير'],
    questionGroups: ['الحوكمة', 'الامتثال'],
    audiences: ['المدراء التنفيذيون', 'مسؤولو الحوكمة'],
    tags: ['معايير', 'حوكمة', 'جهات حكومية'],
    status: 'published',
    createdBy: 'أحمد محمد',
    createdDate: '٢٠٢٤/٠١/١٥',
    lastModified: '٢٠٢٤/٠١/٢٠'
  },
  {
    id: '2',
    question: 'كيف يمكنني إعداد التقارير المالية وفقاً للمعايير المحاسبية؟',
    answer: 'لإعداد التقارير المالية وفقاً للمعايير المحاسبية، يجب اتباع الخطوات التالية...',
    owner: 'فاطمة علي',
    publishStatus: true,
    entityType: 'جهة خاصة',
    entitySize: 'متوسطة',
    classifications: ['تقارير مالية', 'محاسبة'],
    questionGroups: ['التقارير المالية', 'المعايير المحاسبية'],
    audiences: ['المحاسبون', 'المدققون الماليون'],
    tags: ['تقارير', 'محاسبة', 'معايير'],
    status: 'published',
    createdBy: 'فاطمة علي',
    createdDate: '٢٠٢٤/٠١/١٢',
    lastModified: '٢٠٢٤/٠١/١٨'
  },
  {
    id: '3',
    question: 'ما هي المدة الزمنية المطلوبة لتقديم تقييم المخاطر؟',
    answer: 'يجب تقديم تقييم المخاطر بشكل ربع سنوي للمخاطر التشغيلية...',
    owner: 'خالد سعيد',
    publishStatus: false,
    entityType: 'جهة حكومية',
    entitySize: 'صغيرة',
    classifications: ['إدارة المخاطر', 'تقييم'],
    questionGroups: ['المخاطر', 'المواعيد'],
    audiences: ['مدراء المخاطر', 'لجان التدقيق'],
    tags: ['مخاطر', 'مواعيد', 'تقييم'],
    status: 'draft',
    createdBy: 'خالد سعيد',
    createdDate: '٢٠٢٤/٠١/٢٥',
    lastModified: '٢٠٢٤/٠١/٢٥'
  },
  {
    id: '4',
    question: 'ما هي متطلبات الشفافية في الإفصاح المالي؟',
    answer: 'تتطلب الشفافية في الإفصاح المالي نشر التقارير المالية السنوية والربع سنوية...',
    owner: 'نورة حسن',
    publishStatus: true,
    entityType: 'جمعية غير ربحية',
    entitySize: 'متوسطة',
    classifications: ['شفافية', 'إفصاح مالي'],
    questionGroups: ['الشفافية', 'التقارير'],
    audiences: ['مسؤولو الامتثال', 'مدققو خارجيون'],
    tags: ['شفافية', 'إفصاح', 'تقارير'],
    status: 'published',
    createdBy: 'نورة حسن',
    createdDate: '٢٠٢٤/٠١/٠٨',
    lastModified: '٢٠٢٤/٠١/١٥'
  },
  {
    id: '5',
    question: 'كيف يتم تقييم الأداء المؤسسي؟',
    answer: 'يتم تقييم الأداء المؤسسي من خلال عدة مؤشرات رئيسية...',
    owner: 'محمد العتيبي',
    publishStatus: false,
    entityType: 'جهة حكومية',
    entitySize: 'كبيرة',
    classifications: ['أداء مؤسسي', 'مؤشرات'],
    questionGroups: ['تقييم الأداء', 'القياس'],
    audiences: ['الإدارة العليا', 'مسؤولو الأداء'],
    tags: ['أداء', 'تقييم', 'مؤشرات'],
    status: 'archived',
    createdBy: 'محمد العتيبي',
    createdDate: '٢٠٢٣/١٢/٠٠',
    lastModified: '٢٠٢٣/١٢/٢٨'
  }
];

interface AdminFAQListingProps {
  onAddFAQ?: () => void;
  onEditFAQ?: (faqId: string) => void;
}

export function AdminFAQListing({ onAddFAQ, onEditFAQ }: AdminFAQListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'not-published'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewingFAQ, setViewingFAQ] = useState<AdminFAQ | null>(null);
  const [selectedFAQs, setSelectedFAQs] = useState<string[]>([]);

  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'publish' | 'unpublish' | 'bulk-publish' | 'bulk-unpublish' | 'archive' | 'unarchive' | 'bulk-archive' | 'bulk-unarchive' | null;
    faqIds: string[];
  }>({
    isOpen: false,
    type: null,
    faqIds: []
  });

  // Advanced filter states
  const [advancedFilters, setAdvancedFilters] = useState({
    questionName: '',
    entityType: 'all',
    entitySize: 'all',
    questionGroup: 'all',
    classification: 'all',
    answer: '',
    publishStatus: 'all',
    creationDateFrom: '',
    creationDateTo: ''
  });

  // Temporary filter states (for modal)
  const [tempFilters, setTempFilters] = useState(advancedFilters);

  // Get unique values for filters
  const entityTypes = ['all', ...Array.from(new Set(mockAdminFAQs.map(faq => faq.entityType).filter(Boolean)))];
  const entitySizes = ['all', ...Array.from(new Set(mockAdminFAQs.map(faq => faq.entitySize).filter(Boolean)))];
  const questionGroups = ['all', ...Array.from(new Set(mockAdminFAQs.flatMap(faq => faq.questionGroups)))];
  const classifications = ['all', ...Array.from(new Set(mockAdminFAQs.flatMap(faq => faq.classifications)))];

  // Filter FAQs with advanced filters
  const filteredFAQs = mockAdminFAQs.filter(faq => {
    // Basic search
    const matchesBasicSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter - handle published/not-published
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'published' && faq.publishStatus) ||
      (statusFilter === 'not-published' && !faq.publishStatus);
    
    // Basic entity type filter
    const matchesBasicEntityType = selectedEntityType === 'all' || faq.entityType === selectedEntityType;

    // Advanced filters
    const matchesAdvQuestionName = advancedFilters.questionName === '' || 
      faq.question.toLowerCase().includes(advancedFilters.questionName.toLowerCase());
    
    const matchesAdvEntityType = advancedFilters.entityType === 'all' || 
      faq.entityType === advancedFilters.entityType;
    
    const matchesAdvEntitySize = advancedFilters.entitySize === 'all' || 
      faq.entitySize === advancedFilters.entitySize;
    
    const matchesAdvQuestionGroup = advancedFilters.questionGroup === 'all' || 
      faq.questionGroups.includes(advancedFilters.questionGroup);
    
    const matchesAdvClassification = advancedFilters.classification === 'all' || 
      faq.classifications.includes(advancedFilters.classification);
    
    const matchesAdvAnswer = advancedFilters.answer === '' || 
      faq.answer.toLowerCase().includes(advancedFilters.answer.toLowerCase());
    
    const matchesAdvPublishStatus = advancedFilters.publishStatus === 'all' || 
      (advancedFilters.publishStatus === 'published' && faq.publishStatus) ||
      (advancedFilters.publishStatus === 'unpublished' && !faq.publishStatus);

    // Date filtering (simplified for demo)
    const matchesDateFrom = advancedFilters.creationDateFrom === '' || 
      faq.createdDate >= advancedFilters.creationDateFrom;
    
    const matchesDateTo = advancedFilters.creationDateTo === '' || 
      faq.createdDate <= advancedFilters.creationDateTo;

    return matchesBasicSearch && matchesStatus && matchesBasicEntityType &&
           matchesAdvQuestionName && matchesAdvEntityType && matchesAdvEntitySize &&
           matchesAdvQuestionGroup && matchesAdvClassification && matchesAdvAnswer &&
           matchesAdvPublishStatus && matchesDateFrom && matchesDateTo;
  });

  const handleApplyFilters = () => {
    setAdvancedFilters(tempFilters);
    setShowAdvancedFilters(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      questionName: '',
      entityType: 'all',
      entitySize: 'all',
      questionGroup: 'all',
      classification: 'all',
      answer: '',
      publishStatus: 'all',
      creationDateFrom: '',
      creationDateTo: ''
    };
    setTempFilters(resetFilters);
    setAdvancedFilters(resetFilters);
  };

  const handleCancelFilters = () => {
    setTempFilters(advancedFilters);
    setShowAdvancedFilters(false);
  };

  // Count active filters
  const activeFiltersCount = Object.entries(advancedFilters).filter(([key, value]) => {
    return value !== '' && value !== 'all';
  }).length;

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedFAQs.length === filteredFAQs.length) {
      setSelectedFAQs([]);
    } else {
      setSelectedFAQs(filteredFAQs.map(faq => faq.id));
    }
  };

  const handleSelectFAQ = (faqId: string) => {
    if (selectedFAQs.includes(faqId)) {
      setSelectedFAQs(selectedFAQs.filter(id => id !== faqId));
    } else {
      setSelectedFAQs([...selectedFAQs, faqId]);
    }
  };

  const handleBulkPublish = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulk-publish',
      faqIds: selectedFAQs
    });
  };

  const handleBulkUnpublish = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulk-unpublish',
      faqIds: selectedFAQs
    });
  };

  const handleBulkArchive = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulk-archive',
      faqIds: selectedFAQs
    });
  };

  const handleBulkUnarchive = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulk-unarchive',
      faqIds: selectedFAQs
    });
  };

  const handleTogglePublishStatus = (faqId: string) => {
    const faq = mockAdminFAQs.find(f => f.id === faqId);
    if (!faq) return;

    setConfirmDialog({
      isOpen: true,
      type: faq.publishStatus ? 'unpublish' : 'publish',
      faqIds: [faqId]
    });
  };

  const handleToggleArchiveStatus = (faqId: string) => {
    const faq = mockAdminFAQs.find(f => f.id === faqId);
    if (!faq) return;

    setConfirmDialog({
      isOpen: true,
      type: faq.status === 'archived' ? 'unarchive' : 'archive',
      faqIds: [faqId]
    });
  };

  const handleConfirmAction = () => {
    const { type, faqIds } = confirmDialog;

    // Simulate API call
    console.log(`${type} FAQs:`, faqIds);

    // Show success toast
    if (type === 'bulk-publish') {
      toast.success(`تم نشر ${faqIds.length} ${faqIds.length === 1 ? 'سؤال' : 'أسئلة'} بنجاح`);
      setSelectedFAQs([]);
    } else if (type === 'bulk-unpublish') {
      toast.success(`تم إلغاء نشر ${faqIds.length} ${faqIds.length === 1 ? 'سؤال' : 'أسئلة'} بنجاح`);
      setSelectedFAQs([]);
    } else if (type === 'bulk-archive') {
      toast.success(`تم أرشفة ${faqIds.length} ${faqIds.length === 1 ? 'سؤال' : 'أسئلة'} بنجاح`);
      setSelectedFAQs([]);
    } else if (type === 'bulk-unarchive') {
      toast.success(`تم إلغاء أرشفة ${faqIds.length} ${faqIds.length === 1 ? 'سؤال' : 'أسئلة'} بنجاح`);
      setSelectedFAQs([]);
    } else if (type === 'publish') {
      toast.success('تم نشر السؤال بنجاح');
    } else if (type === 'unpublish') {
      toast.success('تم إلغاء نشر السؤال بنجاح');
    } else if (type === 'archive') {
      toast.success('تم أرشفة السؤال بنجاح');
    } else if (type === 'unarchive') {
      toast.success('تم إلغاء أرشفة السؤال بنجاح');
    }

    // Close dialog
    setConfirmDialog({
      isOpen: false,
      type: null,
      faqIds: []
    });
  };

  const handleCancelAction = () => {
    setConfirmDialog({
      isOpen: false,
      type: null,
      faqIds: []
    });
  };

  const getConfirmDialogContent = () => {
    const { type, faqIds } = confirmDialog;
    const count = faqIds.length;

    switch (type) {
      case 'bulk-publish':
        return {
          title: 'تأكيد النشر',
          message: `هل أنت متأكد من رغبتك في نشر ${count} ${count === 1 ? 'سؤال' : 'أسئلة'}؟ سيتمكن المستخدمون من رؤية ${count === 1 ? 'هذا السؤال' : 'هذه الأسئلة'} بعد النشر.`,
          confirmText: 'نشر',
          type: 'success' as const
        };
      case 'bulk-unpublish':
        return {
          title: 'تأكيد إلغاء النشر',
          message: `هل أنت متأكد من رغبتك في إلغاء نشر ${count} ${count === 1 ? 'سؤال' : 'أسئلة'}؟ لن يتمكن المستخدمون من رؤية ${count === 1 ? 'هذا السؤال' : 'هذه الأسئلة'} بعد الإلغاء.`,
          confirmText: 'إلغاء النشر',
          type: 'warning' as const
        };
      case 'bulk-archive':
        return {
          title: 'تأكيد الأرشفة',
          message: `هل أنت متأكد من رغبتك في أرشفة ${count} ${count === 1 ? 'سؤال' : 'أسئلة'}؟ لن يتمكن المستخدمون من رؤية ${count === 1 ? 'هذا السؤال' : 'هذه الأسئلة'} بعد الأرشفة.`,
          confirmText: 'أرشفة',
          type: 'warning' as const
        };
      case 'bulk-unarchive':
        return {
          title: 'تأكيد إلغاء الأرشفة',
          message: `هل أنت متأكد من رغبتك في إلغاء أرشفة ${count} ${count === 1 ? 'سؤال' : 'أسئلة'}؟ سيتمكن المستخدمون من رؤية ${count === 1 ? 'هذا السؤال' : 'هذه الأسئلة'} بعد إلغاء الأرشفة.`,
          confirmText: 'إلغاء الأرشفة',
          type: 'success' as const
        };
      case 'publish':
        return {
          title: 'تأكيد النشر',
          message: 'هل أنت متأكد من رغبتك في نشر هذا السؤال؟ سيتمكن المستخدمون من رؤية هذا السؤال بعد النشر.',
          confirmText: 'نشر',
          type: 'success' as const
        };
      case 'unpublish':
        return {
          title: 'تأكيد إلغاء النشر',
          message: 'هل أنت متأكد من رغبتك في إلغاء نشر هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد الإلغاء.',
          confirmText: 'إلغاء النشر',
          type: 'warning' as const
        };
      case 'archive':
        return {
          title: 'تأكيد الأرشفة',
          message: 'هل أنت متأكد من رغبتك في أرشفة هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد الأرشفة.',
          confirmText: 'أرشفة',
          type: 'warning' as const
        };
      case 'unarchive':
        return {
          title: 'تأكيد إلغاء الأرشفة',
          message: 'هل أنت متأكد من رغبتك في إلغاء أرشفة هذا السؤال؟ سيتمكن المستخدمون من رؤية هذا السؤال بعد إلغاء الأرشفة.',
          confirmText: 'إلغاء الأرشفة',
          type: 'success' as const
        };
      default:
        return {
          title: '',
          message: '',
          confirmText: '',
          type: 'warning' as const
        };
    }
  };

  const dialogContent = getConfirmDialogContent();

  const isAllSelected = filteredFAQs.length > 0 && selectedFAQs.length === filteredFAQs.length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return { bg: 'var(--success-light)', color: 'var(--success)', text: 'منشور' };
      case 'draft':
        return { bg: 'var(--warning-light)', color: 'var(--warning)', text: 'مسودة' };
      case 'archived':
        return { bg: 'var(--muted)', color: 'var(--muted-foreground)', text: 'مؤرشف' };
      default:
        return { bg: 'var(--muted)', color: 'var(--muted-foreground)', text: status };
    }
  };

  const handleAction = (action: string, faqId: string) => {
    console.log(`${action} FAQ:`, faqId);
    setActiveMenuId(null);
    
    if (action === 'preview') {
      const faq = mockAdminFAQs.find(f => f.id === faqId);
      if (faq) {
        setViewingFAQ(faq);
      }
    } else if (action === 'edit' && onEditFAQ) {
      onEditFAQ(faqId);
    } else if (action === 'archive') {
      handleToggleArchiveStatus(faqId);
    }
  };

  const toggleRowExpansion = (faqId: string) => {
    setExpandedRowId(expandedRowId === faqId ? null : faqId);
  };

  // If viewing FAQ details, show details screen
  if (viewingFAQ) {
    return (
      <AdminFAQDetails 
        faq={viewingFAQ} 
        onClose={() => setViewingFAQ(null)}
        onEdit={(faqId) => {
          setViewingFAQ(null);
          if (onEditFAQ) {
            onEditFAQ(faqId);
          }
        }}
        onTogglePublish={(faqId, currentStatus) => {
          handleTogglePublishStatus(faqId);
          // Update local state to reflect the change
          setViewingFAQ({ ...viewingFAQ, publishStatus: !currentStatus });
        }}
        onToggleArchive={(faqId, currentStatus) => {
          handleToggleArchiveStatus(faqId);
          // Update local state to reflect the change
          setViewingFAQ({ ...viewingFAQ, status: currentStatus === 'archived' ? 'published' : 'archived' });
        }}
      />
    );
  }

  return (
    <div className="px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
            إدارة الأسئلة الشائعة
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            إنشاء وإدارة الأسئلة الشائعة للمستخدمين
          </p>
        </div>
        
        <button
          onClick={onAddFAQ}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          <span>إضافة سؤال جديد</span>
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 border-b border-border">
        {['all', 'published', 'not-published'].map((status) => {
          const count = status === 'all' 
            ? mockAdminFAQs.length 
            : status === 'published'
            ? mockAdminFAQs.filter(f => f.publishStatus).length
            : mockAdminFAQs.filter(f => !f.publishStatus).length;
          
          const label = status === 'all' ? 'الكل' : 
                       status === 'published' ? 'منشور' : 'غير منشور';
          
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-6 py-3 transition-colors border-b-2 ${
                statusFilter === status
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="ابحث عن سؤال..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>

        {/* Entity Type Filter */}
        <select
          value={selectedEntityType}
          onChange={(e) => setSelectedEntityType(e.target.value)}
          className="px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <option value="all">جميع أنواع الجهات</option>
          {entityTypes.filter(t => t !== 'all').map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <button 
          onClick={() => {
            setTempFilters(advancedFilters);
            setShowAdvancedFilters(true);
          }}
          className="relative flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>تصفية متقدمة</span>
          {activeFiltersCount > 0 && (
            <span 
              className="absolute -top-2 -left-2 flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full"
              style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
            >
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Results Count */}
      <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'نتيجة' : 'نتائج'}
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir="rtl">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                تصفية متقدمة
              </h2>
              <button
                onClick={handleCancelFilters}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {/* Question Name */}
                <div>
                  <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    اسم السؤال
                  </label>
                  <input
                    type="text"
                    value={tempFilters.questionName}
                    onChange={(e) => setTempFilters({ ...tempFilters, questionName: e.target.value })}
                    placeholder="ابحث عن سؤال..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                {/* Entity Type and Entity Size Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      نوع الجهة
                    </label>
                    <select
                      value={tempFilters.entityType}
                      onChange={(e) => setTempFilters({ ...tempFilters, entityType: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">جميع الأنواع</option>
                      {entityTypes.filter(t => t !== 'all').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      حجم الجهة
                    </label>
                    <select
                      value={tempFilters.entitySize}
                      onChange={(e) => setTempFilters({ ...tempFilters, entitySize: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">جميع الأحجام</option>
                      {entitySizes.filter(s => s !== 'all').map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Question Group and Classification Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      مجموعة الأسئلة
                    </label>
                    <select
                      value={tempFilters.questionGroup}
                      onChange={(e) => setTempFilters({ ...tempFilters, questionGroup: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">جميع المجموعات</option>
                      {questionGroups.filter(g => g !== 'all').map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      التصنيف
                    </label>
                    <select
                      value={tempFilters.classification}
                      onChange={(e) => setTempFilters({ ...tempFilters, classification: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">جميع التصنيفات</option>
                      {classifications.filter(c => c !== 'all').map(classification => (
                        <option key={classification} value={classification}>{classification}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    الإجابة
                  </label>
                  <input
                    type="text"
                    value={tempFilters.answer}
                    onChange={(e) => setTempFilters({ ...tempFilters, answer: e.target.value })}
                    placeholder="ابحث في الإجابة..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>

                {/* Publication Status */}
                <div>
                  <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    حالة النشر
                  </label>
                  <select
                    value={tempFilters.publishStatus}
                    onChange={(e) => setTempFilters({ ...tempFilters, publishStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="published">منشور</option>
                    <option value="unpublished">غير منشور</option>
                  </select>
                </div>

                {/* Creation Date Range */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      تاريخ الإنشاء من
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={tempFilters.creationDateFrom}
                        onChange={(e) => setTempFilters({ ...tempFilters, creationDateFrom: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      تاريخ الإنشاء إلى
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={tempFilters.creationDateTo}
                        onChange={(e) => setTempFilters({ ...tempFilters, creationDateTo: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border">
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                إعادة تعيين
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancelFilters}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  إلغاء
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  تطبيق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {/* Bulk Actions Bar */}
        {selectedFAQs.length > 0 && (
          <div className="bg-primary/10 border-b border-border px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)' }}>
                  {selectedFAQs.length} {selectedFAQs.length === 1 ? 'سؤال محدد' : 'أسئلة محددة'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkPublish}
                  className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                  <span>نشر</span>
                </button>
                <button
                  onClick={handleBulkUnpublish}
                  className="flex items-center gap-2 px-4 py-2 bg-warning text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                  <span>إلغاء النشر</span>
                </button>
                <button
                  onClick={handleBulkArchive}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Archive className="w-4 h-4" />
                  <span>أرشفة</span>
                </button>
                <button
                  onClick={handleBulkUnarchive}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Archive className="w-4 h-4" />
                  <span>إلغاء الأرشفة</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="w-full">
          <thead style={{ backgroundColor: 'var(--muted)' }}>
            <tr>
              <th className="px-6 py-4 w-12">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAll();
                  }}
                  className="flex items-center justify-center w-5 h-5"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                السؤال
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                مجموعة الاسئلة
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                التصنيف
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                نوع الجهة
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                حجم الجهة
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                المالك
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                الوسوم
              </th>
              <th className="px-6 py-4 text-right text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                تاريخ اخر تحديث
              </th>
              <th className="px-6 py-4 text-center text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                الاجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.flatMap((faq, index) => {
                const statusStyle = getStatusStyle(faq.status);
                const isExpanded = expandedRowId === faq.id;
                
                const mainRow = (
                  <tr 
                    key={faq.id}
                    className={`border-t border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                      isExpanded ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => toggleRowExpansion(faq.id)}
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectFAQ(faq.id);
                          }}
                          className="flex items-center justify-center w-5 h-5"
                        >
                          {selectedFAQs.includes(faq.id) ? (
                            <CheckSquare className="w-5 h-5 text-primary" />
                          ) : (
                            <Square className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                            <HelpCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-foreground font-medium mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                              {faq.question}
                            </p>
                            <p className="text-muted-foreground line-clamp-1" style={{ fontSize: 'var(--text-xs)' }}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {faq.questionGroups.slice(0, 2).map((group, i) => (
                            <span 
                              key={`${faq.id}-group-${i}`}
                              className="px-2 py-1 bg-primary/10 text-primary rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              {group}
                            </span>
                          ))}
                          {faq.questionGroups.length > 2 && (
                            <span 
                              className="px-2 py-1 bg-muted text-muted-foreground rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              +{faq.questionGroups.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {faq.classifications.slice(0, 2).map((classification, i) => (
                            <span 
                              key={`${faq.id}-classification-${i}`}
                              className="px-2 py-1 bg-muted text-foreground rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              {classification}
                            </span>
                          ))}
                          {faq.classifications.length > 2 && (
                            <span 
                              className="px-2 py-1 bg-muted text-muted-foreground rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              +{faq.classifications.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full inline-block"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          {faq.entityType || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {faq.entitySize || '-'}
                      </td>
                      <td className="px-6 py-4 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {faq.owner || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.slice(0, 2).map((tag, i) => (
                            <span 
                              key={`${faq.id}-tag-${i}`}
                              className="px-2 py-1 bg-muted text-foreground rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              {tag}
                            </span>
                          ))}
                          {faq.tags.length > 2 && (
                            <span 
                              className="px-2 py-1 bg-muted text-muted-foreground rounded inline-block"
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              +{faq.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {faq.lastModified}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleAction('preview', faq.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="معاينة"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleAction('edit', faq.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleAction('archive', faq.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="أرشفة"
                          >
                            <Archive className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                  
                  const expandedRow = isExpanded ? (
                    <tr key={`${faq.id}-expanded`} className="border-t border-border bg-muted/20">
                      <td colSpan={10} className="px-6 py-6">
                        <div className="grid grid-cols-3 gap-6">
                          {/* Question Groups - Full List */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              مجموعة الاسئلة
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {faq.questionGroups.map((group, i) => (
                                <span 
                                  key={`${faq.id}-group-full-${i}`}
                                  className="px-3 py-1 bg-white border border-border rounded text-foreground"
                                  style={{ fontSize: 'var(--text-xs)' }}
                                >
                                  {group}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Classifications - Full List */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              التصنيف
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {faq.classifications.map((classification, i) => (
                                <span 
                                  key={`${faq.id}-classification-full-${i}`}
                                  className="px-3 py-1 bg-white border border-border rounded text-foreground"
                                  style={{ fontSize: 'var(--text-xs)' }}
                                >
                                  {classification}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Audiences */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              الجمهور
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {faq.audiences.map((audience, i) => (
                                <span 
                                  key={`${faq.id}-audience-${i}`}
                                  className="px-3 py-1 bg-white border border-border rounded text-foreground"
                                  style={{ fontSize: 'var(--text-xs)' }}
                                >
                                  {audience}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Tags - Full List */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              الوسوم
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag, i) => (
                                <span 
                                  key={`${faq.id}-tag-full-${i}`}
                                  className="px-3 py-1 bg-white border border-border rounded text-foreground"
                                  style={{ fontSize: 'var(--text-xs)' }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Publish Status */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              حالة النشر
                            </h4>
                            <span 
                              className={`px-3 py-1 rounded-full inline-block ${
                                faq.publishStatus ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                              }`}
                              style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                            >
                              {faq.publishStatus ? 'منشور' : 'غير منشور'}
                            </span>
                          </div>

                          {/* Status */}
                          <div>
                            <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              الحالة
                            </h4>
                            <span 
                              className="px-3 py-1 rounded-full inline-block"
                              style={{ 
                                fontSize: 'var(--text-xs)', 
                                fontWeight: 500,
                                backgroundColor: statusStyle.bg,
                                color: statusStyle.color
                              }}
                            >
                              {statusStyle.text}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null;
                  
                  return expandedRow ? [mainRow, expandedRow] : [mainRow];
                })
              ) : (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <HelpCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                      لم يتم العثور على أسئلة
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      جرب تعديل معايير البحث أو إضافة سؤال جديد
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title={dialogContent.title}
        message={dialogContent.message}
        confirmText={dialogContent.confirmText}
        cancelText="إلغاء"
        type={dialogContent.type}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
}