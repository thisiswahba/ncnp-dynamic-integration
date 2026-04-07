import { useState, useEffect, useRef } from 'react';
import { Search, Plus, MoreVertical, Power, Eye, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/contexts/language-context';

interface DataSource {
  id: string;
  systemName: string;
  businessDomain: string;
  apiVersion: string;
  endpointsCount: number;
  status: 'active' | 'inactive';
}

const mockDataSources: DataSource[] = [
  {
    id: '1',
    systemName: 'Customer Management API',
    businessDomain: 'CRM',
    apiVersion: 'v2.1',
    endpointsCount: 24,
    status: 'active'
  },
  {
    id: '2',
    systemName: 'Payment Gateway',
    businessDomain: 'Finance',
    apiVersion: 'v3.0',
    endpointsCount: 12,
    status: 'active'
  },
  {
    id: '3',
    systemName: 'Inventory System',
    businessDomain: 'Operations',
    apiVersion: 'v1.5',
    endpointsCount: 18,
    status: 'active'
  },
  {
    id: '4',
    systemName: 'Analytics Engine',
    businessDomain: 'Business Intelligence',
    apiVersion: 'v2.0',
    endpointsCount: 8,
    status: 'inactive'
  },
  {
    id: '5',
    systemName: 'Email Service',
    businessDomain: 'Communication',
    apiVersion: 'v1.2',
    endpointsCount: 6,
    status: 'active'
  }
];

export function DataSourcesPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; right: number } | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const itemsPerPage = 10;

  // Filter data sources by search query
  const filteredDataSources = mockDataSources.filter((ds) =>
    ds.systemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredDataSources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDataSources = filteredDataSources.slice(startIndex, endIndex);

  const handleToggleStatus = (id: string) => {
    console.log('Toggle status for:', id);
    // Add your logic here
  };

  const handleViewDetails = (id: string) => {
    console.log('View details for:', id);
    // Add your logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('dataSources.title')}
        </h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${
            isRTL ? 'right-4' : 'left-4'
          }`} />
          <input
            type="text"
            placeholder={t('dataSources.search')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${
              isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'
            }`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>

        {/* Add Data Source Button */}
        <button
          onClick={() => navigate('/admin/data-sources/add')}
          className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          <span>{t('dataSources.add')}</span>
        </button>
      </div>

      {/* Data Table */}
      {paginatedDataSources.length > 0 ? (
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-visible">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('dataSources.systemName')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('dataSources.businessDomain')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('dataSources.status')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('dataSources.actions')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedDataSources.map((ds) => (
                  <tr key={ds.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/data-sources/${ds.id}`)}
                        className="text-primary hover:text-primary/80 transition-colors hover:underline text-left"
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                      >
                        {ds.systemName}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {ds.businessDomain}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full ${
                          ds.status === 'active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                      >
                        {t(`dataSources.${ds.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          ref={(el) => (buttonRefs.current[ds.id] = el)}
                          onClick={(e) => {
                            e.stopPropagation();
                            const newMenuId = openMenuId === ds.id ? null : ds.id;
                            setOpenMenuId(newMenuId);
                            if (newMenuId && buttonRefs.current[ds.id]) {
                              const rect = buttonRefs.current[ds.id]!.getBoundingClientRect();
                              setMenuPosition({
                                top: rect.bottom + window.scrollY,
                                left: rect.left + window.scrollX,
                                right: window.innerWidth - rect.right + window.scrollX
                              });
                            }
                          }}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-muted-foreground" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenuId === ds.id && menuPosition && (
                          <div
                            className="fixed w-48 bg-white border border-border rounded-lg shadow-lg z-50"
                            style={{
                              top: `${menuPosition.top}px`,
                              left: isRTL ? 'auto' : `${menuPosition.left}px`,
                              right: isRTL ? `${menuPosition.right}px` : 'auto'
                            }}
                          >
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleViewDetails(ds.id);
                                  setOpenMenuId(null);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-2 text-foreground hover:bg-muted transition-colors ${
                                  isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                                }`}
                                style={{ fontSize: 'var(--text-sm)' }}
                              >
                                <Eye className="w-4 h-4" />
                                <span>{t('dataSources.viewDetails')}</span>
                              </button>
                              <button
                                onClick={() => {
                                  navigate(`/admin/data-sources/${ds.id}`);
                                  setOpenMenuId(null);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-2 text-foreground hover:bg-muted transition-colors ${
                                  isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                                }`}
                                style={{ fontSize: 'var(--text-sm)' }}
                              >
                                <Pencil className="w-4 h-4" />
                                <span>{t('dataSources.edit')}</span>
                              </button>
                              {ds.status === 'active' && (
                                <button
                                  onClick={() => {
                                    handleToggleStatus(ds.id);
                                    setOpenMenuId(null);
                                  }}
                                  className={`flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-muted transition-colors ${
                                    isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                                  }`}
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  <Power className="w-4 h-4" />
                                  <span>{t('dataSources.deactivate')}</span>
                                </button>
                              )}
                              {ds.status === 'inactive' && (
                                <button
                                  onClick={() => {
                                    handleToggleStatus(ds.id);
                                    setOpenMenuId(null);
                                  }}
                                  className={`flex items-center gap-3 w-full px-4 py-2 text-green-600 hover:bg-muted transition-colors ${
                                    isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                                  }`}
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  <Power className="w-4 h-4" />
                                  <span>{t('dataSources.activate')}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={`flex items-center justify-between px-6 py-4 border-t border-border ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {t('dataSources.pagination.showing')} {startIndex + 1} {t('dataSources.pagination.to')}{' '}
                {Math.min(endIndex, filteredDataSources.length)} {t('dataSources.pagination.of')}{' '}
                {filteredDataSources.length} {t('dataSources.pagination.results')}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                >
                  {t('dataSources.pagination.previous')}
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-white border border-border text-foreground hover:bg-muted'
                      }`}
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                >
                  {t('dataSources.pagination.next')}
                </button>
              </div>
            </div>
          </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {t('dataSources.empty.title')}
          </p>
        </div>
      )}
    </div>
  );
}