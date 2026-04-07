import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

interface ExecutionHistory {
  id: string;
  date: string;
  queryName: string;
  resultsCount: number;
  status: 'success' | 'failed';
}

const mockHistory: ExecutionHistory[] = [
  {
    id: '1',
    date: '2026-03-14 10:30 AM',
    queryName: 'Financial Risk Assessment Query',
    resultsCount: 24,
    status: 'success'
  },
  {
    id: '2',
    date: '2026-03-13 02:15 PM',
    queryName: 'Inventory Data Analysis',
    resultsCount: 18,
    status: 'success'
  },
  {
    id: '3',
    date: '2026-03-12 09:00 AM',
    queryName: 'Operations Performance Query',
    resultsCount: 0,
    status: 'failed'
  },
  {
    id: '4',
    date: '2026-03-11 04:45 PM',
    queryName: 'Financial Risk Assessment Query',
    resultsCount: 22,
    status: 'success'
  },
  {
    id: '5',
    date: '2026-03-10 11:20 AM',
    queryName: 'Customer Satisfaction Assessment',
    resultsCount: 31,
    status: 'success'
  }
];

export function QueryHistoryPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination
  const totalPages = Math.ceil(mockHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = mockHistory.slice(startIndex, endIndex);

  const getStatusBadge = (status: 'success' | 'failed') => {
    if (status === 'success') {
      return (
        <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
          {t('queries.success')}
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive-light text-destructive border-destructive-border" style={{ fontSize: 'var(--text-xs)' }}>
        {t('queries.fail')}
      </Badge>
    );
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('queries.historyTitle')}
        </h1>
      </div>

      {/* History Table */}
      <Card className="bg-white border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.date')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.queryName')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.resultsCount')}
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
                {paginatedHistory.map((execution) => (
                  <tr key={execution.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {execution.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {execution.queryName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {execution.resultsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(execution.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                        onClick={() => navigate(`/admin/queries/results/${execution.id}`)}
                        disabled={execution.status === 'failed'}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{t('queries.viewResults')}</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`flex items-center justify-between px-6 py-4 border-t border-border ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {t('pagination.showing')} {startIndex + 1} {t('pagination.to')} {Math.min(endIndex, mockHistory.length)} {t('pagination.of')} {mockHistory.length} {t('pagination.results')}
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
          )}
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-8">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/queries')}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('common.back')}
        </Button>
      </div>
    </div>
  );
}
