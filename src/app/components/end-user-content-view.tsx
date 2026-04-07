import { useState } from 'react';
import { Search, FileText, BookOpen, ChevronLeft, Heart } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'faq' | 'guideline';
  entityType: string;
  audience?: string[];
  excerpt: string;
  isFavorite?: boolean;
}

interface EndUserContentViewProps {
  onViewContent: (id: string) => void;
}

export function EndUserContentView({ onViewContent }: EndUserContentViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Mock data - published content only
  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'كيفية توثيق السياسات المالية',
      type: 'faq',
      entityType: 'جمعية',
      audience: ['مدراء ماليون', 'محاسبون'],
      excerpt: 'يجب أن تكون جميع السياسات المالية موثقة بشكل واضح ومعتمدة من الجهات المختصة...',
    },
    {
      id: '2',
      title: 'دليل إدارة المخاطر المالية',
      type: 'guideline',
      entityType: 'مؤسسة',
      audience: ['إدارة عليا'],
      excerpt: 'تعد إدارة المخاطر المالية عنصراً حاسماً في الحوكمة المالية الفعالة...',
    },
    {
      id: '3',
      title: 'ما هي متطلبات الحوكمة المالية؟',
      type: 'faq',
      entityType: 'جمعية',
      excerpt: 'الحوكمة المالية هي مجموعة من المبادئ والممارسات التي تضمن الشفافية والمساءلة...',
    },
    {
      id: '4',
      title: 'دليل إعداد الميزانية السنوية',
      type: 'guideline',
      entityType: 'مؤسسة',
      audience: ['مدراء ماليون'],
      excerpt: 'الميزانية السنوية هي خطة مالية شاملة تحدد الإيرادات والمصروفات المتوقعة...',
    },
  ];

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)' }}>
            مركز المعرفة
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            اطّلع على الأدلة والأسئلة الشائعة لمساعدتك في عملية التقييم
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-border px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المحتوى..."
                className="w-full h-12 pr-10 pl-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ fontSize: 'var(--text-base)' }}
                dir="rtl"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-12 px-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            >
              <option value="all">جميع الأنواع</option>
              <option value="faq">أسئلة شائعة</option>
              <option value="guideline">أدلة إرشادية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {filteredContent.length > 0 ? (
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  className="w-full p-6 bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all relative group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg shrink-0 ${
                      item.type === 'faq' 
                        ? 'bg-blue-50 group-hover:bg-blue-100' 
                        : 'bg-green-50 group-hover:bg-green-100'
                    } transition-colors`}>
                      {item.type === 'faq' ? (
                        <FileText className={`w-6 h-6 ${item.type === 'faq' ? 'text-blue-600' : 'text-green-600'}`} />
                      ) : (
                        <BookOpen className={`w-6 h-6 ${item.type === 'guideline' ? 'text-green-600' : 'text-blue-600'}`} />
                      )}
                    </div>

                    {/* Content - Clickable */}
                    <button
                      onClick={() => onViewContent(item.id)}
                      className="flex-1 min-w-0 text-right cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-lg)' }}>
                          {item.title}
                        </h3>
                        <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 rotate-180" />
                      </div>

                      <p className="text-muted-foreground text-right mb-3 line-clamp-2" style={{ fontSize: 'var(--text-sm)' }}>
                        {item.excerpt}
                      </p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: item.type === 'faq' ? 'var(--blue-50)' : 'var(--green-50)',
                            color: item.type === 'faq' ? 'var(--blue-700)' : 'var(--green-700)',
                          }}
                        >
                          {item.type === 'faq' ? 'سؤال شائع' : 'دليل إرشادي'}
                        </span>

                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          •
                        </span>

                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          {item.entityType}
                        </span>

                        {item.audience && item.audience.length > 0 && (
                          <>
                            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              •
                            </span>
                            <div className="flex gap-1">
                              {item.audience.slice(0, 2).map((aud, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                                  style={{ fontSize: 'var(--text-xs)' }}
                                >
                                  {aud}
                                </span>
                              ))}
                              {item.audience.length > 2 && (
                                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  +{item.audience.length - 2}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
                      aria-label={favorites.has(item.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          favorites.has(item.id) 
                            ? 'fill-red-600 text-red-600' 
                            : 'text-muted-foreground hover:text-red-600'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2" style={{ fontSize: 'var(--text-lg)' }}>
                لا توجد نتائج
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                جرّب تعديل معايير البحث أو المرشحات
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="px-8 py-8 border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-base)' }}>
              💡 هل تحتاج مساعدة إضافية؟
            </h3>
            <p className="text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
              تصفح الأدلة الإرشادية للحصول على معلومات تفصيلية، أو راجع الأسئلة الشائعة للحصول على إجابات سريعة حول المواضيع الشائعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}