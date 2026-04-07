import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

interface QueryRule {
  dataSource: string;
  field: string;
  operator: string;
  value: string;
  logicalOperator?: 'AND' | 'OR';
}

// Mock data
const mockQuery = {
  id: '1',
  name: 'Financial Risk Assessment Query',
  description: 'Automated query to identify entities with outstanding balances exceeding threshold and active vendor status',
  status: 'active' as const,
  createdAt: '2026-01-15',
  lastExecution: '2026-03-14 10:30 AM',
  rules: [
    {
      dataSource: 'Finance API',
      field: 'outstanding_balance',
      operator: '>',
      value: '100000',
      logicalOperator: 'AND' as const
    },
    {
      dataSource: 'Vendor Registry',
      field: 'status',
      operator: '=',
      value: 'Active'
    }
  ]
};

export function QueryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
            {t('queries.active')}
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-warning-light text-warning-foreground border-warning-border" style={{ fontSize: 'var(--text-xs)' }}>
            {t('queries.draft')}
          </Badge>
        );
      default:
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
          {t('queries.detailsTitle')}
        </h1>
      </div>

      {/* Query Metadata Card */}
      <Card className="bg-white border border-border mb-6">
        <CardHeader>
          <CardTitle className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {mockQuery.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {t('queries.description')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {mockQuery.description}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {t('queries.status')}
              </p>
              <div>{getStatusBadge(mockQuery.status)}</div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {t('queries.createdAt')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {new Date(mockQuery.createdAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {t('queries.lastExecution')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {mockQuery.lastExecution}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Query Rules Card */}
      <Card className="bg-white border border-border mb-6">
        <CardHeader>
          <CardTitle className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {t('queries.rulesSection')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockQuery.rules.map((rule, index) => (
              <div key={index}>
                {index > 0 && rule.logicalOperator && (
                  <div className="flex justify-center my-3">
                    <Badge variant="outline" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {rule.logicalOperator}
                    </Badge>
                  </div>
                )}
                <div className="border border-border rounded-lg p-4 bg-muted/20">
                  <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Badge className="bg-primary/10 text-primary" style={{ fontSize: 'var(--text-sm)' }}>
                      {rule.dataSource}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {rule.field}
                    </span>
                    <Badge variant="outline" style={{ fontSize: 'var(--text-sm)' }}>
                      {rule.operator}
                    </Badge>
                    <span className="text-foreground px-3 py-1 bg-white border border-border rounded-md" style={{ fontSize: 'var(--text-sm)' }}>
                      {rule.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/queries')}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('common.back')}
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/queries/${id}/edit`)}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('queries.editQuery')}
        </Button>
        <Button
          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          onClick={() => navigate(`/admin/queries/${id}/preview`)}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Play className="w-4 h-4" />
          <span>{t('queries.runQuery')}</span>
        </Button>
      </div>
    </div>
  );
}
