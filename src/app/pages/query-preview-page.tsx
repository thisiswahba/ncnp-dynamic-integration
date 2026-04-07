import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Play, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/contexts/language-context';

interface ExecutionResult {
  entity: string;
  result: 'PASS' | 'FAIL';
  dataSource: string;
  value?: string;
}

const mockResults: ExecutionResult[] = [
  {
    entity: 'Entity A - Riyadh',
    result: 'PASS',
    dataSource: 'Finance API',
    value: '150,000'
  },
  {
    entity: 'Entity B - Jeddah',
    result: 'FAIL',
    dataSource: 'Finance API',
    value: '75,000'
  },
  {
    entity: 'Entity C - Dammam',
    result: 'PASS',
    dataSource: 'Finance API',
    value: '200,000'
  },
  {
    entity: 'Entity D - Mecca',
    result: 'PASS',
    dataSource: 'Finance API',
    value: '125,000'
  }
];

export function QueryPreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [results, setResults] = useState<ExecutionResult[] | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsExecuting(false);
      toast.success(t('queries.success.executed'));
    }, 1500);
  };

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
          {t('queries.previewTitle')}
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {t('queries.previewSubtitle')}
        </p>
      </div>

      {/* Execute Button */}
      <div className="mb-6">
        <Button
          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          onClick={handleExecuteQuery}
          disabled={isExecuting}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Play className="w-5 h-5" />
          <span>{isExecuting ? t('common.loading') : t('queries.executeQuery')}</span>
        </Button>
      </div>

      {/* Results Table */}
      {results && results.length > 0 ? (
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
                        {t('queries.dataSource')}
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
                  {results.map((row, index) => (
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
                          {row.dataSource}
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
          </CardContent>
        </Card>
      ) : results && results.length === 0 ? (
        <Alert className="border-warning bg-warning-light">
          <AlertCircle className="w-5 h-5 text-warning-foreground" />
          <AlertDescription className="text-warning-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            {t('queries.noResultsMessage')}
          </AlertDescription>
        </Alert>
      ) : null}

      {/* Back Button */}
      <div className="mt-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/queries/${id}`)}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('common.back')}
        </Button>
      </div>
    </div>
  );
}