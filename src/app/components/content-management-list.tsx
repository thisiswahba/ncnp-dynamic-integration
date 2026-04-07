import { useState } from 'react';
import { Search, Filter, Eye, Edit2, FileText, BookOpen, MoreVertical } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';
import { LanguageSwitcher } from '@/app/components/language-switcher';

interface ContentItem {
  id: string;
  title: string;
  titleEn: string;
  type: 'faq' | 'guideline';
  status: 'draft' | 'published';
  entityType: string;
  entityTypeEn: string;
  lastModified: string;
  linkedQuestions: number;
}

interface ContentManagementListProps {
  onViewContent: (id: string) => void;
  onEditContent: (id: string) => void;
  onCreateNew: () => void;
  onAddFAQ?: () => void;
}

export function ContentManagementList({
  onViewContent,
  onEditContent,
  onCreateNew,
  onAddFAQ,
}: ContentManagementListProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Mock data
  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'كيفية توثيق السياسات المالية',
      titleEn: 'How to Document Financial Policies',
      type: 'faq',
      status: 'published',
      entityType: 'جمعية',
      entityTypeEn: 'Association',
      lastModified: '2024-01-15',
      linkedQuestions: 3,
    },
    {
      id: '2',
      title: 'دليل إدارة المخاطر المالية',
      titleEn: 'Financial Risk Management Guide',
      type: 'guideline',
      status: 'published',
      entityType: 'مؤسسة',
      entityTypeEn: 'Institution',
      lastModified: '2024-01-14',
      linkedQuestions: 5,
    },
    {
      id: '3',
      title: 'ما هي متطلبات الحوكمة المالية؟',
      titleEn: 'What are Financial Governance Requirements?',
      type: 'faq',
      status: 'draft',
      entityType: 'جمعية',
      entityTypeEn: 'Association',
      lastModified: '2024-01-13',
      linkedQuestions: 0,
    },
  ];

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleMenuClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-2xl)' }}>
              إدارة المحتوى
            </h1>
            <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              إدارة الأسئلة الشائعة ومحتوى الأدلة
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              fontSize: 'var(--text-sm)'
            }}
          >
            + إضافة محتوى جديد
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-8 py-4 bg-white border-b border-border">
        <div className="flex gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المحتوى..."
              className="w-full h-10 pr-10 pl-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ fontSize: 'var(--text-sm)' }}
              dir="rtl"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-10 px-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{ fontSize: 'var(--text-sm)' }}
            dir="rtl"
          >
            <option value="all">جميع الأنواع</option>
            <option value="faq">سؤال شائع</option>
            <option value="guideline">محتوى دليل</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
            style={{ fontSize: 'var(--text-sm)' }}
            dir="rtl"
          >
            <option value="all">جميع الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="px-8 py-6">
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full" dir="rtl">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  العنوان
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  النوع
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  الحالة
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  نوع الجهة
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  الأسئلة المرتبطة
                </th>
                <th className="px-4 py-3 text-right font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  آخر تعديل
                </th>
                <th className="px-4 py-3 text-center font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.length > 0 ? (
                filteredContent.map((item) => (
                  <tr 
                    key={item.id}
                    className="border-b border-border hover:bg-muted/10 transition-colors cursor-pointer"
                    onClick={() => onViewContent(item.id)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.type === 'faq' ? (
                          <FileText className="w-5 h-5 text-primary shrink-0" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-primary shrink-0" />
                        )}
                        <span className="font-medium text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: item.type === 'faq' ? 'var(--blue-50)' : 'var(--green-50)',
                          color: item.type === 'faq' ? 'var(--blue-700)' : 'var(--green-700)',
                        }}
                      >
                        {item.type === 'faq' ? 'سؤال شائع' : 'محتوى دليل'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: item.status === 'published' ? 'var(--green-50)' : 'var(--gray-100)',
                          color: item.status === 'published' ? 'var(--green-700)' : 'var(--gray-700)',
                        }}
                      >
                        {item.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                      {item.entityType}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                      {item.linkedQuestions > 0 ? (
                        <span className="font-medium text-foreground">{item.linkedQuestions}</span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                      {item.lastModified}
                    </td>
                    <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <button
                          onClick={(e) => handleMenuClick(e, item.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-muted-foreground" />
                        </button>

                        {openMenuId === item.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div 
                              className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-border z-20"
                              style={{ top: '100%' }}
                            >
                              <button
                                onClick={() => {
                                  onViewContent(item.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-right"
                              >
                                <span className="flex-1 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  عرض
                                </span>
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => {
                                  onEditContent(item.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-right"
                              >
                                <span className="flex-1 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                  تعديل
                                </span>
                                <Edit2 className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
                      لا يوجد محتوى متاح
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}