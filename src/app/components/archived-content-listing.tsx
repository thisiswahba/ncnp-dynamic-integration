import { Eye, ArchiveRestore, CheckSquare, Square } from 'lucide-react';
import { useState } from 'react';
import { ConfirmationDialog } from './confirmation-dialog';
import { toast } from 'sonner';

interface ArchivedContentRow {
  id: number;
  contentName: string;
  contentLevel: string;
  entityType: string;
  entitySize: string;
  contentBranch: string;
  owner: string;
  tag: string;
  archiveDate: string;
}

const mockArchivedData: ArchivedContentRow[] = [
  { 
    id: 1, 
    contentName: 'دليل الحوكمة المالية للجمعيات',
    contentLevel: 'المستوى 1: معيار',
    entityType: 'جمعية خيرية',
    entitySize: 'كبيرة',
    contentBranch: 'دليل',
    owner: 'أحمد محمد',
    tag: 'حوكمة',
    archiveDate: '2024/01/20'
  },
  { 
    id: 2, 
    contentName: 'نموذج تقييم المخاطر المالية',
    contentLevel: 'المستوى 2: المؤشر',
    entityType: 'مؤسسة حكومية',
    entitySize: 'متوسطة',
    contentBranch: 'نموذج تقييم',
    owner: 'سارة أحمد',
    tag: 'مخاطر',
    archiveDate: '2024/01/18'
  },
  { 
    id: 3, 
    contentName: 'سياسات الشفافية والإفصاح',
    contentLevel: 'المستوى 1: معيار',
    entityType: 'جمعية خيرية',
    entitySize: 'صغيرة',
    contentBranch: 'دليل',
    owner: 'محمد علي',
    tag: 'شفافية',
    archiveDate: '2024/01/15'
  },
  { 
    id: 4, 
    contentName: 'نموذج تقييم الأداء المؤسسي',
    contentLevel: 'المستوى 3: الممارسة',
    entityType: 'شركة خاصة',
    entitySize: 'كبيرة',
    contentBranch: 'نموذج تقييم',
    owner: 'فاطمة خالد',
    tag: 'أداء',
    archiveDate: '2024/01/12'
  },
  { 
    id: 5, 
    contentName: 'إرشادات إدارة الموارد البشرية',
    contentLevel: 'المستوى 2: المؤشر',
    entityType: 'مؤسسة حكومية',
    entitySize: 'متوسطة',
    contentBranch: 'دليل',
    owner: 'عبدالله حسن',
    tag: 'موارد بشرية',
    archiveDate: '2024/01/10'
  },
];

interface ArchivedContentListingProps {
  onViewContent?: (contentId: string) => void;
}

export function ArchivedContentListing({ onViewContent }: ArchivedContentListingProps) {
  const [data, setData] = useState(mockArchivedData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'unarchive' | 'bulk-unarchive' | null;
    contentId: number | null;
  }>({
    isOpen: false,
    type: null,
    contentId: null,
  });

  const handleToggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(row => row.id));
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleUnarchive = (contentId: number) => {
    setConfirmDialog({
      isOpen: true,
      type: 'unarchive',
      contentId
    });
  };

  const handleBulkUnarchive = () => {
    if (selectedIds.length === 0) {
      toast.error('الرجاء تحديد محتوى واحد على الأقل');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      type: 'bulk-unarchive',
      contentId: null
    });
  };

  const confirmAction = () => {
    const { type, contentId } = confirmDialog;

    if (type === 'unarchive' && contentId !== null) {
      setData(prev => prev.filter(row => row.id !== contentId));
      const contentName = data.find(row => row.id === contentId)?.contentName;
      toast.success(`تم استعادة "${contentName}" من الأرشيف بنجاح`);
    } else if (type === 'bulk-unarchive') {
      setData(prev => prev.filter(row => !selectedIds.includes(row.id)));
      toast.success(`تم استعادة ${selectedIds.length} عنصر من الأرشيف بنجاح`);
      setSelectedIds([]);
    }

    setConfirmDialog({ isOpen: false, type: null, contentId: null });
  };

  const getDialogMessage = () => {
    const { type, contentId } = confirmDialog;
    if (type === 'unarchive' && contentId) {
      const contentName = data.find(row => row.id === contentId)?.contentName;
      return `هل أنت متأكد أنك تريد استعادة "${contentName}" من الأرشيف؟`;
    }
    if (type === 'bulk-unarchive') {
      return `هل أنت متأكد أنك تريد استعادة ${selectedIds.length} عنصر من الأرشيف؟`;
    }
    return '';
  };

  return (
    <>
      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" dir="rtl">
          <div className="flex items-center justify-between flex-row-reverse">
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              تم تحديد {selectedIds.length} عنصر
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBulkUnarchive}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <ArchiveRestore className="w-4 h-4" />
                <span>استعادة من الأرشيف</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir="rtl">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-center">
                  <button onClick={handleToggleSelectAll} className="flex items-center justify-center">
                    {selectedIds.length === data.length && data.length > 0 ? (
                      <CheckSquare className="w-5 h-5 text-primary" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  اسم المحتوى
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  مستوى المحتوى
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  نوع الجهة
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  حجم الجهة
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  فرع المحتوى
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  المالك
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  الوسم
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  تاريخ الأرشفة
                </th>
                <th className="px-6 py-4 text-right text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleToggleSelect(row.id)} className="flex items-center justify-center">
                      {selectedIds.includes(row.id) ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {row.contentName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.contentLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.entityType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.entitySize}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.contentBranch}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.owner}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800"
                      style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                    >
                      {row.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {row.archiveDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => onViewContent?.(row.id.toString())}
                        className="p-2 hover:bg-muted rounded-lg transition-colors group"
                        title="عرض"
                      >
                        <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </button>
                      <button
                        onClick={() => handleUnarchive(row.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors group"
                        title="استعادة من الأرشيف"
                      >
                        <ArchiveRestore className="w-5 h-5 text-muted-foreground group-hover:text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="استعادة من الأرشيف"
        message={getDialogMessage()}
        confirmText="استعادة"
        cancelText="إلغاء"
        type="success"
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null, contentId: null })}
      />
    </>
  );
}