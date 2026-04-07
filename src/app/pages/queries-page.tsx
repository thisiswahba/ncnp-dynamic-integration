import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useLanguage } from '@/app/contexts/language-context';

interface Query {
  id: string;
  queryId: string;
  linkedItem: string;
  businessDomain: string;
  status: 'activated' | 'deactivated';
}

const mockQueries: Query[] = [
  { id: '1', queryId: 'QRY-001', linkedItem: 'Financial Risk Assessment', businessDomain: 'Finance', status: 'activated' },
  { id: '2', queryId: 'QRY-002', linkedItem: 'Inventory Data Compliance', businessDomain: 'Operations', status: 'activated' },
  { id: '3', queryId: 'QRY-003', linkedItem: 'Customer Satisfaction Risk', businessDomain: 'CRM', status: 'deactivated' },
  { id: '4', queryId: 'QRY-004', linkedItem: 'Operational Performance Check', businessDomain: 'Operations', status: 'activated' },
  { id: '5', queryId: 'QRY-005', linkedItem: 'Regulatory Compliance Query', businessDomain: 'Compliance', status: 'deactivated' },
  { id: '6', queryId: 'QRY-006', linkedItem: 'Email Service Monitoring', businessDomain: 'Communication', status: 'activated' },
];

export function QueriesPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  // Click-outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter queries by queryId and linkedItem
  const filteredQueries = mockQueries.filter((query) =>
    query.queryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    query.linkedItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredQueries.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQueries = filteredQueries.slice(startIndex, endIndex);

  const handleView = (id: string) => {
    navigate(`/admin/queries/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/queries/${id}/edit`);
  };

  const handleToggleStatus = (id: string) => {
    console.log('Toggle status for:', id);
    // Add your logic here
  };

  const getStatusBadge = (status: Query['status']) => {
    switch (status) {
      case 'activated':
        return (
          <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
            {t('queries.active')}
          </Badge>
        );
      case 'deactivated':
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            {t('queries.disabled')}
          </Badge>
        );
    }
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('queries.listTitle')}
        </h1>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="text"
            placeholder={t('queries.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      {paginatedQueries.length > 0 ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.queryId')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.linkedItem')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.businessDomain')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.status')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.actions')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {query.queryId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {query.linkedItem}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {query.businessDomain}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(query.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" ref={openMenuId === query.id ? menuRef : undefined}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setOpenMenuId(openMenuId === query.id ? null : query.id)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {openMenuId === query.id && (
                          <div className={`absolute z-50 mt-1 w-56 rounded-md border border-border bg-white shadow-lg ${isRTL ? 'left-0' : 'right-0'}`}>
                            <div className="py-1">
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  handleView(query.id);
                                  setOpenMenuId(null);
                                }}
                              >
                                {t('queries.viewQueryDetails')}
                              </button>
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  handleEdit(query.id);
                                  setOpenMenuId(null);
                                }}
                              >
                                {t('queries.editQueryDetails')}
                              </button>
                              {query.status === 'deactivated' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    handleToggleStatus(query.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {t('queries.activateQuery')}
                                </button>
                              )}
                              {query.status === 'activated' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    handleToggleStatus(query.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {t('queries.deactivateQuery')}
                                </button>
                              )}
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  setOpenMenuId(null);
                                }}
                              >
                                {t('queries.navigateToLinkedItem')}
                              </button>
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

          {/* Pagination — always shown */}
          <div className={`flex items-center justify-between px-6 py-4 border-t border-border ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {t('pagination.showing')} {startIndex + 1} {t('pagination.to')} {Math.min(endIndex, filteredQueries.length)} {t('pagination.of')} {filteredQueries.length} {t('pagination.results')}
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {t('pagination.previous')}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-9"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {t('pagination.next')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              {t('queries.noQueries')}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
