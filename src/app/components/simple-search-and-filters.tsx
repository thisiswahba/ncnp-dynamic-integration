import { Search, SlidersHorizontal, X, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/app/contexts/language-context';

export interface FilterState {
  searchQuery: string;
  entityType: string;
  entitySize: string;
  contentBranch: string;
  publicationStatus: string;
  creationDateFrom: string;
  creationDateTo: string;
}

interface SearchAndFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export function SearchAndFilters({ onFilterChange }: SearchAndFiltersProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Advanced filter states
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    searchQuery: '',
    entityType: 'all',
    entitySize: 'all',
    contentBranch: 'all',
    publicationStatus: 'all',
    creationDateFrom: '',
    creationDateTo: ''
  });

  // Temporary filter states (for modal)
  const [tempFilters, setTempFilters] = useState(advancedFilters);

  const handleSearch = () => {
    const newFilters = { ...advancedFilters, searchQuery };
    setAdvancedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleApplyFilters = () => {
    const newFilters = { ...tempFilters, searchQuery };
    setAdvancedFilters(newFilters);
    setShowAdvancedFilters(false);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      searchQuery: '',
      entityType: 'all',
      entitySize: 'all',
      contentBranch: 'all',
      publicationStatus: 'all',
      creationDateFrom: '',
      creationDateTo: ''
    };
    setTempFilters(resetFilters);
    setAdvancedFilters(resetFilters);
    setSearchQuery('');
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const handleCancelFilters = () => {
    setTempFilters(advancedFilters);
    setShowAdvancedFilters(false);
  };

  // Count active filters (excluding search query and 'all' values)
  const activeFiltersCount = Object.entries(advancedFilters).filter(([key, value]) => {
    return key !== 'searchQuery' && value !== '' && value !== 'all';
  }).length;

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={isRTL ? 'ابحث باسم المحتوى، الوسوم' : 'Search by content name, tags'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className={`w-full px-4 py-2.5 ${isRTL ? 'pr-12' : 'pl-12'} border border-border rounded ${isRTL ? 'text-right' : 'text-left'} bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
          <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-foreground`} />
        </div>
        
        {/* Search button */}
        <button 
          onClick={handleSearch}
          className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors"
        >
          <span style={{ fontSize: 'var(--text-sm)' }}>{isRTL ? 'بحث' : 'Search'}</span>
        </button>
        
        {/* Filter button */}
        <button 
          onClick={() => {
            setTempFilters(advancedFilters);
            setShowAdvancedFilters(true);
          }}
          className="relative flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors min-w-[130px]"
        >
          <SlidersHorizontal className="w-6 h-6" />
          <span style={{ fontSize: 'var(--text-sm)' }}>{isRTL ? 'تصفية' : 'Filter'}</span>
          {activeFiltersCount > 0 && (
            <span 
              className={`absolute -top-2 ${isRTL ? '-left-2' : '-right-2'} flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full`}
              style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
            >
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                {isRTL ? 'تصفية متقدمة' : 'Advanced Filters'}
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
                {/* Entity Type and Entity Size Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {isRTL ? 'نوع الجهة' : 'Entity Type'}
                    </label>
                    <select
                      value={tempFilters.entityType}
                      onChange={(e) => setTempFilters({ ...tempFilters, entityType: e.target.value })}
                      className={`w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</option>
                      <option value="charity">{isRTL ? 'جمعية خيرية' : 'Charity Association'}</option>
                      <option value="government">{isRTL ? 'مؤسسة حكومية' : 'Government Institution'}</option>
                      <option value="private">{isRTL ? 'شركة خاصة' : 'Private Company'}</option>
                      <option value="nonprofit">{isRTL ? 'منظمة غير ربحية' : 'Non-Profit Organization'}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {isRTL ? 'حجم الجهة' : 'Entity Size'}
                    </label>
                    <select
                      value={tempFilters.entitySize}
                      onChange={(e) => setTempFilters({ ...tempFilters, entitySize: e.target.value })}
                      className={`w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">{isRTL ? 'جميع الأحجام' : 'All Sizes'}</option>
                      <option value="small">{isRTL ? 'صغير (أقل من 50 موظف)' : 'Small (Less than 50 employees)'}</option>
                      <option value="medium">{isRTL ? 'متوسط (50-250 موظف)' : 'Medium (50-250 employees)'}</option>
                      <option value="large">{isRTL ? 'كبير (أكثر من 250 موظف)' : 'Large (More than 250 employees)'}</option>
                    </select>
                  </div>
                </div>

                {/* Content Branch and Publication Status Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {isRTL ? 'فرع المحتوى' : 'Content Branch'}
                    </label>
                    <select
                      value={tempFilters.contentBranch}
                      onChange={(e) => setTempFilters({ ...tempFilters, contentBranch: e.target.value })}
                      className={`w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">{isRTL ? 'جميع الفروع' : 'All Branches'}</option>
                      <option value="finance">{isRTL ? 'المالية' : 'Finance'}</option>
                      <option value="hr">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</option>
                      <option value="operations">{isRTL ? 'العمليات' : 'Operations'}</option>
                      <option value="compliance">{isRTL ? 'الالتزام' : 'Compliance'}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {isRTL ? 'حالة النشر' : 'Publication Status'}
                    </label>
                    <select
                      value={tempFilters.publicationStatus}
                      onChange={(e) => setTempFilters({ ...tempFilters, publicationStatus: e.target.value })}
                      className={`w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="all">{isRTL ? 'الكل' : 'All'}</option>
                      <option value="published">{isRTL ? 'منشور' : 'Published'}</option>
                      <option value="draft">{isRTL ? 'مسودة' : 'Draft'}</option>
                      <option value="scheduled">{isRTL ? 'مجدول' : 'Scheduled'}</option>
                    </select>
                  </div>
                </div>

                {/* Date Range Row */}
                <div>
                  <label className={`block text-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'تاريخ الإنشاء' : 'Creation Date'}
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-muted-foreground mb-1 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-xs)' }}>
                        {isRTL ? 'من' : 'From'}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={tempFilters.creationDateFrom}
                          onChange={(e) => setTempFilters({ ...tempFilters, creationDateFrom: e.target.value })}
                          className={`w-full px-4 py-3 ${isRTL ? 'pr-12' : 'pl-12'} border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground`}
                          style={{ fontSize: 'var(--text-sm)' }}
                        />
                        <Calendar className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none`} />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-muted-foreground mb-1 ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-xs)' }}>
                        {isRTL ? 'إلى' : 'To'}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={tempFilters.creationDateTo}
                          onChange={(e) => setTempFilters({ ...tempFilters, creationDateTo: e.target.value })}
                          className={`w-full px-4 py-3 ${isRTL ? 'pr-12' : 'pl-12'} border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground`}
                          style={{ fontSize: 'var(--text-sm)' }}
                        />
                        <Calendar className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between gap-4 px-6 py-4 border-t border-border bg-muted/30`}>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 text-foreground hover:bg-muted rounded-lg transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                {isRTL ? 'إعادة تعيين' : 'Reset'}
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCancelFilters}
                  className="px-6 py-2.5 text-foreground hover:bg-muted rounded-lg transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  {isRTL ? 'تطبيق التصفية' : 'Apply Filters'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
