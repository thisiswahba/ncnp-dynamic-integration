import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, BookOpen, FileText, Calendar, Eye, Star, ChevronDown, ChevronUp, X, AlertCircle, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, EyeOff } from 'lucide-react';
import { EntityFAQListing } from '@/app/components/entity-faq-listing';
import { useLanguage } from '@/app/contexts/language-context';

type ContentType = 'guide' | 'assessment' | 'faq';
type EntityType = 'association' | 'institution' | 'government' | 'other';
type SortField = 'title' | 'date';
type SortDirection = 'asc' | 'desc';

interface ContentItem {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  type: ContentType;
  icon: any;
  tags: string[];
  tagsEn: string[];
  entityType: EntityType;
  questions?: string[];
  lastModified?: string;
}

export function EntityKnowledgeBase({ onViewContent }: { onViewContent?: () => void }) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const [activeTab, setActiveTab] = useState<'available' | 'favorites' | 'faq'>('available');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentFilter, setContentFilter] = useState<'all' | 'guide' | 'assessment'>('all');
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem('knowledgeBaseFavorites');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [favoriteSubTab, setFavoriteSubTab] = useState<'content' | 'faq'>('content');
  const [readStatus, setReadStatus] = useState<Set<number>>(() => {
    // Load read status from localStorage
    const stored = localStorage.getItem('knowledgeBaseReadStatus');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Advanced search and filter states
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<EntityType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 10;

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    // Persist to localStorage
    localStorage.setItem('knowledgeBaseFavorites', JSON.stringify(Array.from(newFavorites)));
  };

  const toggleReadStatus = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newReadStatus = new Set(readStatus);
    if (newReadStatus.has(id)) {
      newReadStatus.delete(id);
    } else {
      newReadStatus.add(id);
    }
    setReadStatus(newReadStatus);
    // Persist to localStorage
    localStorage.setItem('knowledgeBaseReadStatus', JSON.stringify(Array.from(newReadStatus)));
  };

  const contentCards: ContentItem[] = [
    {
      id: 1,
      title: 'نموذج تقييم المخاطر المالية',
      titleEn: 'Financial Risk Assessment Model',
      description: 'تقييم شامل للمخاطر المالية المحتملة في المؤسسات الحكومية',
      descriptionEn: 'Comprehensive assessment of potential financial risks in government institutions',
      date: '2024-01-15',
      type: 'assessment',
      icon: FileText,
      tags: ['تقييم المخاطر', 'المخاطر المالية'],
      tagsEn: ['Risk Assessment', 'Financial Risks'],
      entityType: 'government',
      questions: ['ما هي المخاطر المالية؟', 'كيف يتم تقييم المخاطر؟'],
      questionsEn: ['What are financial risks?', 'How is risk assessment conducted?']
    },
    {
      id: 2,
      title: 'دليل إعداد القوائم المالية',
      titleEn: 'Guide to Preparing Financial Statements',
      description: 'دليل كامل لإعداد القوائم المالية وفقاً للمعايير المحاسبية الحكومية',
      descriptionEn: 'Comprehensive guide to preparing financial statements according to government accounting standards',
      date: '2024-01-10',
      type: 'guide',
      icon: BookOpen,
      tags: ['القوائم المالية', 'المعايير المحاسبية'],
      tagsEn: ['Financial Statements', 'Accounting Standards'],
      entityType: 'government',
    },
    {
      id: 3,
      title: 'نموذج تقييم الأداء المالي',
      titleEn: 'Financial Performance Assessment Model',
      description: 'نموذج لقياس وتقييم الأداء المالي للجهات الحكومية',
      descriptionEn: 'Model for measuring and assessing financial performance of government entities',
      date: '2024-01-05',
      type: 'assessment',
      icon: FileText,
      tags: ['الأداء المالي', 'الجهات الحكومية'],
      tagsEn: ['Financial Performance', 'Government Entities'],
      entityType: 'government',
    },
    {
      id: 4,
      title: 'دليل التدقيق الداخلي',
      titleEn: 'Internal Audit Guide',
      description: 'إرشادات وإجراءات التدقيق الداخلي للحسابات الحكومية',
      descriptionEn: 'Guidelines and procedures for internal audit of government accounts',
      date: '2023-12-28',
      type: 'guide',
      icon: BookOpen,
      tags: ['التدقيق الداخلي', 'الحسابات الحكومية'],
      tagsEn: ['Internal Audit', 'Government Accounts'],
      entityType: 'government',
    },
    {
      id: 5,
      title: 'دليل المحاسبة للجمعيات',
      titleEn: 'Accounting Guide for Associations',
      description: 'دليل شامل للمحاسبة في الجمعيات والمؤسسات غير الربحية',
      descriptionEn: 'Comprehensive guide to accounting in associations and non-profit organizations',
      date: '2023-12-15',
      type: 'guide',
      icon: BookOpen,
      tags: ['المحاسبة', 'الجمعيات'],
      tagsEn: ['Accounting', 'Associations'],
      entityType: 'association',
    },
    {
      id: 6,
      title: 'نموذج تقييم الامتثال',
      titleEn: 'Compliance Assessment Model',
      description: 'نموذج لتقييم مستوى الامتثال للوائح المالية',
      descriptionEn: 'Model for assessing compliance with financial regulations',
      date: '2023-12-01',
      type: 'assessment',
      icon: FileText,
      tags: ['الامتثال', 'اللوائح المالية'],
      tagsEn: ['Compliance', 'Financial Regulations'],
      entityType: 'institution',
    },
  ];

  // All available tags
  const availableTags = Array.from(new Set(contentCards.flatMap(card => card.tags)));

  // Filter content based on search query and filters
  const filteredAndSearchedCards = useMemo(() => {
    let filtered = contentCards;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(query) ||
        card.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (card.questions && card.questions.some(q => q.toLowerCase().includes(query)))
      );
    }

    // Filter by content type
    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter(card => selectedContentTypes.includes(card.type));
    }

    // Filter by entity type
    if (selectedEntityTypes.length > 0) {
      filtered = filtered.filter(card => selectedEntityTypes.includes(card.entityType));
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(card => selectedTags.some(tag => card.tags.includes(tag)));
    }

    // Filter by date range
    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter(card => new Date(card.date) >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo);
      filtered = filtered.filter(card => new Date(card.date) <= to);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortField === 'title') {
        const comparison = a.title.localeCompare(b.title, 'ar');
        return sortDirection === 'asc' ? comparison : -comparison;
      } else {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
    });

    return filtered;
  }, [contentCards, searchQuery, selectedContentTypes, selectedEntityTypes, selectedTags, dateFrom, dateTo, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSearchedCards.length / itemsPerPage);
  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSearchedCards.slice(start, start + itemsPerPage);
  }, [filteredAndSearchedCards, currentPage]);

  // Reset filters
  const resetFilters = () => {
    setSelectedContentTypes([]);
    setSelectedEntityTypes([]);
    setSelectedTags([]);
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  // Handle filter change
  const toggleContentType = (type: ContentType) => {
    setSelectedContentTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleEntityType = (type: EntityType) => {
    setSelectedEntityTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getContentTypeLabel = (type: ContentType) => {
    switch (type) {
      case 'guide': return 'دليل';
      case 'assessment': return 'نموذج تقييم';
      case 'faq': return 'أسئلة شائعة';
    }
  };

  const getEntityTypeLabel = (type: EntityType) => {
    switch (type) {
      case 'association': return 'جمعية';
      case 'institution': return 'مؤسسة';
      case 'government': return 'جهة حكومية';
      case 'other': return 'أخرى';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA');
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() || selectedContentTypes.length > 0 || 
    selectedEntityTypes.length > 0 || selectedTags.length > 0 || dateFrom || dateTo;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-6 max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-foreground mb-6" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          قاعدة المعرفة
        </h1>

        {/* Search and Filter Area - Global (always visible) */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث بالكلمات المفتاحية أو العبارات..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pr-12 pl-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                isFilterExpanded ? 'bg-primary text-white' : 'bg-white border border-border text-foreground hover:bg-muted'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>فلاتر متقدمة</span>
              {isFilterExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Filter Panel */}
          {isFilterExpanded && (
            <div className="bg-white border border-border rounded-lg p-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Type Filter */}
                <div>
                  <label className="block text-foreground mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    نوع المحتوى
                  </label>
                  <div className="space-y-2">
                    {(['guide', 'assessment', 'faq'] as ContentType[]).map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedContentTypes.includes(type)}
                          onChange={() => toggleContentType(type)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          {getContentTypeLabel(type)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Entity Type Filter */}
                <div>
                  <label className="block text-foreground mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    نوع الجهة
                  </label>
                  <div className="space-y-2">
                    {(['association', 'institution', 'government', 'other'] as EntityType[]).map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedEntityTypes.includes(type)}
                          onChange={() => toggleEntityType(type)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          {getEntityTypeLabel(type)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-foreground mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    نطاق التاريخ
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        من تاريخ
                      </label>
                      <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => {
                          setDateFrom(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                        إلى تاريخ
                      </label>
                      <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => {
                          setDateTo(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="block text-foreground mb-3" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    الوسوم
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {availableTags.map(tag => (
                      <label key={tag} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          {tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-6 py-2 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <X className="w-4 h-4" />
                  إعادة تعيين
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs - Hidden when search/filters are active */}
        {!hasActiveFilters && (
          <>
            <div className="flex gap-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab('available')}
                className={`px-6 py-3 transition-colors border-b-2 ${
                  activeTab === 'available'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
              >
                المحتوى المتاح
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-3 transition-colors border-b-2 ${
                  activeTab === 'faq'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
              >
                الاسئلة الشائعة
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-3 transition-colors border-b-2 ${
                  activeTab === 'favorites'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
              >
                المحتوى المفضل
              </button>
            </div>

            {/* Sub-tabs for Favorites */}
            {activeTab === 'favorites' && (
              <div className="flex gap-2 mb-6 mr-8">
                <button
                  onClick={() => setFavoriteSubTab('content')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    favoriteSubTab === 'content'
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-foreground hover:bg-muted'
                  }`}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                >
                  المحتوى
                </button>
                <button
                  onClick={() => setFavoriteSubTab('faq')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    favoriteSubTab === 'faq'
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-foreground hover:bg-muted'
                  }`}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                >
                  الأسئلة الشائعة
                </button>
              </div>
            )}
          </>
        )}

        {/* Results Table View - Show when search/filters are active */}
        {hasActiveFilters && (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            {isSearching ? (
              // Loading skeleton
              <div className="p-8">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            ) : filteredAndSearchedCards.length === 0 ? (
              // Empty state
              <div className="flex items-center gap-3 p-6 bg-yellow-50 border-r-4 border-yellow-400">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <p className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  لا توجد نتائج مطابقة لمعايير البحث
                </p>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full" dir="rtl">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th
                          className="px-6 py-4 text-right cursor-pointer hover:bg-muted/80"
                          onClick={() => handleSort('title')}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                              اسم المحتوى
                            </span>
                            {sortField === 'title' && (
                              <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 text-right">
                          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                            النوع
                          </span>
                        </th>
                        <th
                          className="px-6 py-4 text-right cursor-pointer hover:bg-muted/80"
                          onClick={() => handleSort('date')}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                              تاريخ النشر
                            </span>
                            {sortField === 'date' && (
                              <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 text-right">
                          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                            رابط الوصول
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedCards.map((card) => (
                        <tr key={card.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <button
                              onClick={onViewContent}
                              className="text-primary hover:underline text-right"
                              style={{ fontSize: 'var(--text-base)', fontWeight: 500 }}
                            >
                              {card.title}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              {getContentTypeLabel(card.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              {formatDate(card.date)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={onViewContent}
                              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                            >
                              <span>عرض</span>
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      عرض {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSearchedCards.length)} من {filteredAndSearchedCards.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronsRight className="w-4 h-4 text-foreground" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                          السابق
                        </span>
                      </button>
                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'bg-white border border-border text-foreground hover:bg-muted'
                            }`}
                            style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                          التالي
                        </span>
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-border bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronsLeft className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Content Cards - Show when no search/filters are active */}
        {activeTab === 'available' && !hasActiveFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer"
                  onClick={onViewContent}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        card.type === 'assessment' ? 'bg-blue-50' : 'bg-green-50'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          card.type === 'assessment' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      className={`p-2 rounded-full ${
                        favorites.has(card.id) ? 'bg-primary text-white' : 'bg-white border border-border text-foreground'
                      }`}
                      onClick={(e) => toggleFavorite(card.id, e)}
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span style={{ fontSize: 'var(--text-xs)' }}>تاريخ النشر: {formatDate(card.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span style={{ fontSize: 'var(--text-xs)' }}>آخر تحديث: {formatDate(card.lastModified || card.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className={`p-2 rounded-lg transition-colors ${
                          readStatus.has(card.id) ? 'bg-muted text-muted-foreground' : 'bg-green-50 text-green-600'
                        }`}
                        onClick={(e) => toggleReadStatus(card.id, e)}
                        title={readStatus.has(card.id) ? 'تعليم كمقروء' : 'تعليم كغير مقروء'}
                      >
                        {readStatus.has(card.id) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" onClick={onViewContent}>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>عرض</span>
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Favorites Tab Content */}
        {activeTab === 'favorites' && (
          <>
            {favoriteSubTab === 'content' ? (
              <>
                {contentCards.filter(card => favorites.has(card.id)).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contentCards.filter(card => favorites.has(card.id)).map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.id}
                          className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer"
                          onClick={onViewContent}
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${
                                card.type === 'assessment' ? 'bg-blue-50' : 'bg-green-50'
                              }`}>
                                <Icon className={`w-6 h-6 ${
                                  card.type === 'assessment' ? 'text-blue-600' : 'text-green-600'
                                }`} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                                  {card.title}
                                </h3>
                              </div>
                            </div>
                            <button
                              className={`p-2 rounded-full ${
                                favorites.has(card.id) ? 'bg-primary text-white' : 'bg-white border border-border text-foreground'
                              }`}
                              onClick={(e) => toggleFavorite(card.id, e)}
                            >
                              <Star className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Card Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span style={{ fontSize: 'var(--text-xs)' }}>تاريخ النشر: {formatDate(card.date)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span style={{ fontSize: 'var(--text-xs)' }}>آخر تحديث: {formatDate(card.lastModified || card.date)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                className={`p-2 rounded-lg transition-colors ${
                                  readStatus.has(card.id) ? 'bg-muted text-muted-foreground' : 'bg-green-50 text-green-600'
                                }`}
                                onClick={(e) => toggleReadStatus(card.id, e)}
                                title={readStatus.has(card.id) ? 'تعليم كمقروء' : 'تعليم كغير مقروء'}
                              >
                                {readStatus.has(card.id) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" onClick={onViewContent}>
                                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>عرض</span>
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="bg-white rounded-lg border border-border p-12 max-w-md w-full text-center">
                      <div className="mb-6">
                        <Star className="w-16 h-16 text-muted-foreground mx-auto" />
                      </div>
                      <h3 className="text-foreground mb-3" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                        لا يوجد محتوى مفضل
                      </h3>
                      <p className="text-muted-foreground mb-6" style={{ fontSize: 'var(--text-base)' }}>
                        لم تقم بإضافة أي محتوى إلى المفضلة بعد. ابدأ بتصفح المحتوى المتاح وأضف ما يهمك.
                      </p>
                      <button 
                        onClick={() => setActiveTab('available')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
                      >
                        تصفح المحتوى المتاح
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EntityFAQListing showOnlyFavorites={true} />
            )}
          </>
        )}

        {/* FAQ Tab Content */}
        {activeTab === 'faq' && (
          <EntityFAQListing />
        )}
      </div>
    </div>
  );
}