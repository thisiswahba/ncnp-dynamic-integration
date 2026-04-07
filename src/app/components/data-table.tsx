import { Eye, Edit, Archive, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

interface TableRow {
  id: number;
  contentName: string;
  entityType: string;
  entitySize: string;
  entitySizeStatus: 'medium' | 'large' | 'small';
  contentBranch: string;
  owner: string;
  tag: string;
  creationDate: string;
  lastUpdated: string;
  isPublished: boolean;
  isArchived: boolean;
}

const mockData: TableRow[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  contentName: 'محتوى جديد',
  entityType: 'جمعية خيرية',
  entitySize: 'متوسطة',
  entitySizeStatus: 'medium',
  contentBranch: 'نموذج تقييم',
  owner: 'أحمد محمد',
  tag: 'وسم',
  creationDate: '11/1/2026',
  lastUpdated: '15/1/2026',
  isPublished: i % 2 === 0,
  isArchived: false,
}));

export function DataTable() {
  const [data, setData] = useState(mockData);

  const handleTogglePublish = (id: number) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, isPublished: !row.isPublished } : row
      )
    );
  };

  const handleToggleArchive = (id: number) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, isArchived: !row.isArchived } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full" dir="rtl">
        <thead className="bg-muted">
          <tr className="border-b border-t border-border">
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[180px]">
              اسم المحتوى
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[130px]">
              نوع الجهة
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[130px]">
              حجم الجهة
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[135px]">
              فرع المحتوى
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[125px]">
              المالك
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[125px]">
              الوسم
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[125px]">
              تاريخ الإنشاء
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[125px]">
              آخر تحديث
            </th>
            <th className="px-4 py-2 text-xs font-medium text-muted-foreground text-right border-r border-border min-w-[200px]">
              الإجراء
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="px-4 py-2 text-foreground text-right">
                {row.contentName}
              </td>
              <td className="px-4 py-2 text-foreground text-right">
                {row.entityType}
              </td>
              <td className="px-4 py-2 text-right">
                <span className="inline-flex items-center gap-2 px-2 py-1 bg-[#fffaeb] text-[#93370d] rounded-full text-sm">
                  <span>{row.entitySize}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93370d]" />
                </span>
              </td>
              <td className="px-4 py-2 text-foreground text-right">
                {row.contentBranch}
              </td>
              <td className="px-4 py-2 text-foreground text-right">
                {row.owner}
              </td>
              <td className="px-4 py-2 text-right">
                <span className="inline-block px-2 py-1 bg-[#f9fafb] border border-[#e5e7eb] rounded text-[#1f2a37] text-xs">
                  {row.tag}
                </span>
              </td>
              <td className="px-4 py-2 text-foreground text-right">
                {row.creationDate}
              </td>
              <td className="px-4 py-2 text-foreground text-right">
                {row.lastUpdated}
              </td>
              <td className="px-4 py-2 text-right">
                <div className="flex items-center gap-2 justify-end">
                  {/* Edit */}
                  <button 
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    title="تعديل"
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {/* Display */}
                  <button 
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    title="عرض"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {/* Archive */}
                  <button 
                    onClick={() => handleToggleArchive(row.id)}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    title={row.isArchived ? 'إلغاء الأرشفة' : 'أرشفة'}
                  >
                    <Archive className={`w-4 h-4 ${row.isArchived ? 'text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  
                  {/* Publish/Unpublish */}
                  <button 
                    onClick={() => handleTogglePublish(row.id)}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    title={row.isPublished ? 'إلغاء النشر' : 'نشر'}
                  >
                    {row.isPublished ? (
                      <ToggleRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}