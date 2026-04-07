import { Eye, Edit, Archive, Send, CheckSquare, Square } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ConfirmationDialog } from './confirmation-dialog';
import { toast } from 'sonner';
import { FilterState } from './simple-search-and-filters';
import { useLanguage } from '@/app/contexts/language-context';

interface TableRow {
  id: number;
  contentName: string;
  contentNameEn: string;
  contentLevel: string;
  contentLevelEn: string;
  entityType: string;
  entityTypeEn: string;
  entitySize: string;
  entitySizeEn: string;
  contentBranch: string;
  contentBranchEn: string;
  owner: string;
  ownerEn: string;
  tag: string;
  tagEn: string;
  creationDate: string;
  isPublished: boolean;
  isArchived: boolean;
}

const mockData: TableRow[] = [
  { 
    id: 1, 
    contentName: 'نموذج التقييم المالي',
    contentNameEn: 'Financial Assessment Form',
    contentLevel: 'المستوى 1: معيار',
    contentLevelEn: 'Level 1: Standard',
    entityType: 'جمعية خيرية',
    entityTypeEn: 'Charity Association',
    entitySize: 'كبيرة',
    entitySizeEn: 'Large',
    contentBranch: 'نموذج تقييم',
    contentBranchEn: 'Assessment Form',
    owner: 'أحمد محمد',
    ownerEn: 'Ahmed Mohammed',
    tag: 'تقييم',
    tagEn: 'Assessment',
    creationDate: '2024/01/15',
    isPublished: true,
    isArchived: false
  },
  { 
    id: 2, 
    contentName: 'معايير الحوكمة',
    contentNameEn: 'Governance Standards',
    contentLevel: 'المستوى 2: المؤشر',
    contentLevelEn: 'Level 2: Indicator',
    entityType: 'مؤسسة حكومية',
    entityTypeEn: 'Government Institution',
    entitySize: 'متوسطة',
    entitySizeEn: 'Medium',
    contentBranch: 'دليل',
    contentBranchEn: 'Guide',
    owner: 'سارة أحمد',
    ownerEn: 'Sara Ahmed',
    tag: 'حوكمة',
    tagEn: 'Governance',
    creationDate: '2024/01/14',
    isPublished: false,
    isArchived: false
  },
  { 
    id: 3, 
    contentName: 'دليل الامتثال',
    contentNameEn: 'Compliance Guide',
    contentLevel: 'المستوى 1: معيار',
    contentLevelEn: 'Level 1: Standard',
    entityType: 'شركة خاصة',
    entityTypeEn: 'Private Company',
    entitySize: 'صغيرة',
    entitySizeEn: 'Small',
    contentBranch: 'دليل',
    contentBranchEn: 'Guide',
    owner: 'محمد علي',
    ownerEn: 'Mohammed Ali',
    tag: 'امتثال',
    tagEn: 'Compliance',
    creationDate: '2024/01/13',
    isPublished: true,
    isArchived: false
  },
  { 
    id: 4, 
    contentName: 'نموذج تقييم الأداء',
    contentNameEn: 'Performance Assessment Form',
    contentLevel: 'المستوى 3: الممارسة',
    contentLevelEn: 'Level 3: Practice',
    entityType: 'جمعية خيرية',
    entityTypeEn: 'Charity Association',
    entitySize: 'متوسطة',
    entitySizeEn: 'Medium',
    contentBranch: 'نموذج تقييم',
    contentBranchEn: 'Assessment Form',
    owner: 'فاطمة خالد',
    ownerEn: 'Fatima Khaled',
    tag: 'أداء',
    tagEn: 'Performance',
    creationDate: '2024/01/12',
    isPublished: true,
    isArchived: false
  },
  { 
    id: 5, 
    contentName: 'دليل إدارة المخاطر',
    contentNameEn: 'Risk Management Guide',
    contentLevel: 'المستوى 4: السؤال',
    contentLevelEn: 'Level 4: Question',
    entityType: 'مؤسسة حكومية',
    entityTypeEn: 'Government Institution',
    entitySize: 'كبيرة',
    entitySizeEn: 'Large',
    contentBranch: 'دليل',
    contentBranchEn: 'Guide',
    owner: 'عبدالله حسن',
    ownerEn: 'Abdullah Hassan',
    tag: 'مخاطر',
    tagEn: 'Risks',
    creationDate: '2024/01/11',
    isPublished: false,
    isArchived: false
  },
];

export function DataTable({ onPreview, filters }: { onPreview?: () => void; filters?: FilterState }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [data, setData] = useState(mockData);
  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'publish' | 'unpublish' | 'archive' | 'unarchive' | 'bulk-publish' | 'bulk-unpublish' | 'bulk-archive' | 'bulk-unarchive' | null;
    contentId: number | null;
  }>({
    isOpen: false,
    type: null,
    contentId: null,
  });

  // Apply filters
  useEffect(() => {
    if (!filters) {
      setFilteredData(data);
      return;
    }

    let filtered = [...data];

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(row => 
        (isRTL ? row.contentName : row.contentNameEn).toLowerCase().includes(query) ||
        (isRTL ? row.tag : row.tagEn).toLowerCase().includes(query) ||
        (isRTL ? row.owner : row.ownerEn).toLowerCase().includes(query)
      );
    }

    // Entity type filter
    if (filters.entityType && filters.entityType !== 'all') {
      filtered = filtered.filter(row => row.entityType === filters.entityType);
    }

    // Entity size filter
    if (filters.entitySize && filters.entitySize !== 'all') {
      filtered = filtered.filter(row => row.entitySize === filters.entitySize);
    }

    // Content branch filter
    if (filters.contentBranch && filters.contentBranch !== 'all') {
      filtered = filtered.filter(row => row.contentBranch === filters.contentBranch);
    }

    // Publication status filter
    if (filters.publicationStatus && filters.publicationStatus !== 'all') {
      if (filters.publicationStatus === 'published') {
        filtered = filtered.filter(row => row.isPublished);
      } else if (filters.publicationStatus === 'draft') {
        filtered = filtered.filter(row => !row.isPublished);
      }
    }

    // Date range filter
    if (filters.creationDateFrom) {
      const fromDate = new Date(filters.creationDateFrom);
      filtered = filtered.filter(row => new Date(row.creationDate) >= fromDate);
    }
    if (filters.creationDateTo) {
      const toDate = new Date(filters.creationDateTo);
      filtered = filtered.filter(row => new Date(row.creationDate) <= toDate);
    }

    setFilteredData(filtered);
  }, [filters, data, isRTL]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(row => row.id));
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handlePublish = (id: number) => {
    setConfirmDialog({ isOpen: true, type: 'publish', contentId: id });
  };

  const handleUnpublish = (id: number) => {
    setConfirmDialog({ isOpen: true, type: 'unpublish', contentId: id });
  };

  const handleArchive = (id: number) => {
    setConfirmDialog({ isOpen: true, type: 'archive', contentId: id });
  };

  const handleBulkPublish = () => {
    setConfirmDialog({ isOpen: true, type: 'bulk-publish', contentId: null });
  };

  const handleBulkUnpublish = () => {
    setConfirmDialog({ isOpen: true, type: 'bulk-unpublish', contentId: null });
  };

  const handleBulkArchive = () => {
    setConfirmDialog({ isOpen: true, type: 'bulk-archive', contentId: null });
  };

  const confirmAction = () => {
    const { type, contentId } = confirmDialog;
    
    if (type === 'publish' && contentId) {
      setData(data.map(row => row.id === contentId ? { ...row, isPublished: true } : row));
      toast.success(isRTL ? 'تم نشر المحتوى بنجاح' : 'Content published successfully');
    } else if (type === 'unpublish' && contentId) {
      setData(data.map(row => row.id === contentId ? { ...row, isPublished: false } : row));
      toast.success(isRTL ? 'تم إلغاء نشر المحتوى بنجاح' : 'Content unpublished successfully');
    } else if (type === 'archive' && contentId) {
      setData(data.map(row => row.id === contentId ? { ...row, isArchived: true } : row));
      toast.success(isRTL ? 'تم أرشفة المحتوى بنجاح' : 'Content archived successfully');
    } else if (type === 'bulk-publish') {
      setData(data.map(row => selectedIds.includes(row.id) ? { ...row, isPublished: true } : row));
      toast.success(isRTL ? `تم نشر ${selectedIds.length} محتوى بنجاح` : `${selectedIds.length} items published successfully`);
      setSelectedIds([]);
    } else if (type === 'bulk-unpublish') {
      setData(data.map(row => selectedIds.includes(row.id) ? { ...row, isPublished: false } : row));
      toast.success(isRTL ? `تم إلغاء نشر ${selectedIds.length} محتوى بنجاح` : `${selectedIds.length} items unpublished successfully`);
      setSelectedIds([]);
    } else if (type === 'bulk-archive') {
      setData(data.map(row => selectedIds.includes(row.id) ? { ...row, isArchived: true } : row));
      toast.success(isRTL ? `تم أرشفة ${selectedIds.length} محتوى بنجاح` : `${selectedIds.length} items archived successfully`);
      setSelectedIds([]);
    }
    
    setConfirmDialog({ isOpen: false, type: null, contentId: null });
  };

  const getDialogMessage = () => {
    const { type } = confirmDialog;
    if (type === 'publish') return isRTL ? 'هل أنت متأكد أنك تريد نشر هذا المحتوى؟' : 'Are you sure you want to publish this content?';
    if (type === 'unpublish') return isRTL ? 'هل أنت متأكد أنك تريد إلغاء نشر هذا المحتوى؟' : 'Are you sure you want to unpublish this content?';
    if (type === 'archive') return isRTL ? 'هل أنت متأكد أنك تريد أرشفة هذا المحتوى؟' : 'Are you sure you want to archive this content?';
    if (type === 'bulk-publish') return isRTL ? `هل أنت متأكد أنك تريد نشر ${selectedIds.length} محتوى؟` : `Are you sure you want to publish ${selectedIds.length} items?`;
    if (type === 'bulk-unpublish') return isRTL ? `هل أنت متأكد أنك تريد إلغاء نشر ${selectedIds.length} محتوى؟` : `Are you sure you want to unpublish ${selectedIds.length} items?`;
    if (type === 'bulk-archive') return isRTL ? `هل أنت متأكد أنك تريد أرشفة ${selectedIds.length} محتوى؟` : `Are you sure you want to archive ${selectedIds.length} items?`;
    return '';
  };

  return (
    <>
      <div className="overflow-x-auto">
        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="bg-primary/10 border-b border-border px-6 py-3 flex items-center justify-between">
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? `${selectedIds.length} محتوى محدد` : `${selectedIds.length} items selected`}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkPublish}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <Send className="w-4 h-4" />
                {isRTL ? 'نشر' : 'Publish'}
              </button>
              <button
                onClick={handleBulkUnpublish}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <Send className="w-4 h-4" />
                {isRTL ? 'إلغاء النشر' : 'Unpublish'}
              </button>
              <button
                onClick={handleBulkArchive}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <Archive className="w-4 h-4" />
                {isRTL ? 'أرشفة' : 'Archive'}
              </button>
            </div>
          </div>
        )}

        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-center">
                <button onClick={handleSelectAll}>
                  {selectedIds.length === filteredData.length && filteredData.length > 0 ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'اسم المحتوى' : 'Content Name'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'مستوى المحتوى' : 'Content Level'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'نوع الجهة' : 'Entity Type'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'حجم الجهة' : 'Entity Size'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'فرع المحتوى' : 'Content Branch'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'المالك' : 'Owner'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'الوسم' : 'Tag'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'تاريخ الإنشاء' : 'Creation Date'}
              </th>
              <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'} text-muted-foreground`} style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                {isRTL ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleSelectRow(row.id)}>
                    {selectedIds.includes(row.id) ? (
                      <CheckSquare className="w-5 h-5 text-primary" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? row.contentName : row.contentNameEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? row.contentLevel : row.contentLevelEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? row.entityType : row.entityTypeEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? row.entitySize : row.entitySizeEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? row.contentBranch : row.contentBranchEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? row.owner : row.ownerEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                    {isRTL ? row.tag : row.tagEn}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {row.creationDate}
                  </span>
                </td>
                <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={onPreview}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title={isRTL ? 'عرض' : 'View'}
                    >
                      <Eye className="w-4 h-4 text-foreground" />
                    </button>
                    <button 
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title={isRTL ? 'تعديل' : 'Edit'}
                    >
                      <Edit className="w-4 h-4 text-foreground" />
                    </button>
                    {row.isPublished ? (
                      <button 
                        onClick={() => handleUnpublish(row.id)}
                        className="p-2 hover:bg-muted rounded transition-colors"
                        title={isRTL ? 'إلغاء النشر' : 'Unpublish'}
                      >
                        <Send className="w-4 h-4 text-orange-600" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePublish(row.id)}
                        className="p-2 hover:bg-muted rounded transition-colors"
                        title={isRTL ? 'نشر' : 'Publish'}
                      >
                        <Send className="w-4 h-4 text-green-600" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleArchive(row.id)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title={isRTL ? 'أرشفة' : 'Archive'}
                    >
                      <Archive className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {isRTL ? 'لا توجد نتائج' : 'No results found'}
            </p>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title={isRTL ? 'تأكيد الإجراء' : 'Confirm Action'}
        message={getDialogMessage()}
        confirmText={isRTL ? 'تأكيد' : 'Confirm'}
        cancelText={isRTL ? 'إلغاء' : 'Cancel'}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null, contentId: null })}
      />
    </>
  );
}
