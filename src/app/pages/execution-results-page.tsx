import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useLanguage } from '@/app/contexts/language-context';

interface ResultDetail {
  entity: string;
  result: 'PASS' | 'FAIL';
  source: string;
  value: string;
}

const mockResults: ResultDetail[] = [
  {
    entity: 'Entity A - Riyadh',
    result: 'PASS',
    source: 'Finance API',
    value: '150,000'
  },
  {
    entity: 'Entity B - Jeddah',
    result: 'FAIL',
    source: 'Finance API',
    value: '75,000'
  },
  {
    entity: 'Entity C - Dammam',
    result: 'PASS',
    source: 'Finance API',
    value: '200,000'
  },
  {
    entity: 'Entity A - Riyadh',
    result: 'PASS',
    source: 'Vendor Registry',
    value: 'Active'
  },
  {
    entity: 'Entity B - Jeddah',
    result: 'PASS',
    source: 'Vendor Registry',
    value: 'Active'
  },
  {
    entity: 'Entity C - Dammam',
    result: 'PASS',
    source: 'Vendor Registry',
    value: 'Active'
  }
];

const dataSources = ['Finance API', 'Vendor Registry'];

export function ExecutionResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter by data source
  const filteredResults = selectedSource === 'all' 
    ? mockResults 
    : mockResults.filter(r => r.source === selectedSource);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const getResultBadge = (result: 'PASS' | 'FAIL') => {
    if (result === 'PASS') {
      return (
        <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
          {t('queries.pass')}
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
          {t('queries.executionResultsTitle')}
        </h1>
      </div>

      {/* Filter Section */}
      <div className="mb-6 max-w-xs">
        <label htmlFor="source-filter" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t('queries.filterBySource')}
        </label>
        <Select value={selectedSource} onValueChange={(value) => {
          setSelectedSource(value);
          setCurrentPage(1);
        }}>
          <SelectTrigger id="source-filter" style={{ fontSize: 'var(--text-sm)' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('queries.allSources')}</SelectItem>
            {dataSources.map((source) => (
              <SelectItem key={source} value={source}>{source}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Table */}
      <Card className="bg-white border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.entity')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.result')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.source')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('queries.value')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedResults.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {row.entity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getResultBadge(row.result)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {row.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {row.value}
                      </span>
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
                {t('pagination.showing')} {startIndex + 1} {t('pagination.to')} {Math.min(endIndex, filteredResults.length)} {t('pagination.of')} {filteredResults.length} {t('pagination.results')}
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
          onClick={() => navigate('/admin/queries/history')}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('common.back')}
        </Button>
      </div>
    </div>
  );
}
