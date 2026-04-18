import { useState } from 'react';
import { Search, Filter, ChevronDown, ShieldAlert } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/language-context';
import {
  AutoReplySettingsDialog,
  type AutoReplyQuestion,
} from '@/app/components/auto-reply-settings-dialog';

type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
type Determination = 'manual' | 'automated';
type AutomationStatus = 'active' | 'inactive' | 'unconfigured';

interface DefinedRisk {
  id: string;
  riskId: string;
  riskName: string;
  fullTitle: string;
  riskLevel: RiskLevel;
  determination: Determination;
  automationStatus: AutomationStatus;
  businessDomain: string;
  queryId: string | null;
  dateAdded: string;
  createdBy: string;
  criteria: { id: string; text: string; weight: number }[];
}

const mockRisks: DefinedRisk[] = [
  {
    id: '1',
    riskId: '#RSK-201',
    riskName: 'Financial Fraud',
    fullTitle: 'Financial Fraud Risk — High Severity',
    riskLevel: 'High',
    determination: 'automated',
    automationStatus: 'active',
    businessDomain: 'Financial',
    queryId: '#QRY-1003',
    dateAdded: '20/11/2024',
    createdBy: 'Sarah A.',
    criteria: [
      { id: 'c1', text: 'High — entity has multiple violations', weight: 100 },
      { id: 'c2', text: 'Medium — entity has 1-2 violations', weight: 50 },
      { id: 'c3', text: 'Low — entity has no violations', weight: 0 },
    ],
  },
  {
    id: '2',
    riskId: '#RSK-202',
    riskName: 'Regulatory Violation',
    fullTitle: 'Regulatory Violation Risk',
    riskLevel: 'Critical',
    determination: 'automated',
    automationStatus: 'active',
    businessDomain: 'Compliance',
    queryId: '#QRY-1005',
    dateAdded: '15/11/2024',
    createdBy: 'Sarah A.',
    criteria: [
      { id: 'c4', text: 'Critical — compliance score below 40', weight: 100 },
      { id: 'c5', text: 'Warning — compliance score 40-70', weight: 60 },
      { id: 'c6', text: 'Safe — compliance score above 70', weight: 0 },
    ],
  },
  {
    id: '3',
    riskId: '#RSK-203',
    riskName: 'Service Coverage',
    fullTitle: 'Service Coverage Risk',
    riskLevel: 'Medium',
    determination: 'automated',
    automationStatus: 'inactive',
    businessDomain: 'Operations',
    queryId: '#QRY-1007',
    dateAdded: '10/11/2024',
    createdBy: 'Ahmed K.',
    criteria: [
      { id: 'c7', text: 'High — under 100 beneficiaries', weight: 100 },
      { id: 'c8', text: 'Low — above 1000 beneficiaries', weight: 0 },
    ],
  },
  {
    id: '4',
    riskId: '#RSK-204',
    riskName: 'Operational Downtime',
    fullTitle: 'Operational Downtime Risk',
    riskLevel: 'Medium',
    determination: 'manual',
    automationStatus: 'unconfigured',
    businessDomain: 'Operations',
    queryId: null,
    dateAdded: '08/11/2024',
    createdBy: 'Ahmed K.',
    criteria: [
      { id: 'c9', text: 'High — downtime > 8 hours', weight: 100 },
      { id: 'c10', text: 'Medium — 2–8 hours', weight: 50 },
      { id: 'c11', text: 'Low — under 2 hours', weight: 10 },
    ],
  },
  {
    id: '5',
    riskId: '#RSK-205',
    riskName: 'Employee Turnover',
    fullTitle: 'Employee Turnover Risk',
    riskLevel: 'Low',
    determination: 'manual',
    automationStatus: 'unconfigured',
    businessDomain: 'HR',
    queryId: null,
    dateAdded: '05/11/2024',
    createdBy: 'Mohamed S.',
    criteria: [
      { id: 'c12', text: 'High — turnover > 25% annually', weight: 100 },
      { id: 'c13', text: 'Low — turnover < 5%', weight: 10 },
    ],
  },
];

const TOTAL_ENTRIES = 42;

type TabKey = 'all' | 'automated' | 'manual';

export function DefinedRisksPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<AutoReplyQuestion | null>(null);

  const totalPages = 5;

  const filteredRisks = mockRisks.filter((risk) => {
    const matchesTab = activeTab === 'all' || risk.determination === activeTab;
    const matchesSearch =
      risk.riskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      risk.riskName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const statusCount = {
    all: mockRisks.length,
    automated: mockRisks.filter((r) => r.determination === 'automated').length,
    manual: mockRisks.filter((r) => r.determination === 'manual').length,
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filteredRisks.map((r) => r.id)));
    else setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = filteredRisks.length > 0 && selectedIds.size === filteredRisks.length;

  const handleActivateAutomation = (risk: DefinedRisk) => {
    setActiveQuestion({
      id: risk.riskId,
      title: risk.fullTitle,
      automated: risk.automationStatus === 'active',
      answers: risk.criteria,
    });
    setDialogOpen(true);
  };

  const getRiskLevelBadge = (level: RiskLevel) => {
    const styles: Record<RiskLevel, string> = {
      Critical: 'bg-red-50 text-red-700 border-red-200',
      High: 'bg-orange-50 text-orange-700 border-orange-200',
      Medium: 'bg-amber-50 text-amber-700 border-amber-200',
      Low: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    return (
      <Badge
        variant="outline"
        className={styles[level]}
        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
      >
        {t(`definedRisks.level.${level.toLowerCase()}`)}
      </Badge>
    );
  };

  const getStatusPill = (risk: DefinedRisk) => {
    if (risk.determination === 'manual') {
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
          style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          {t('definedRisks.manual')}
        </span>
      );
    }
    if (risk.automationStatus === 'active') {
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
          style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          {t('definedRisks.autoActive')}
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {t('definedRisks.autoInactive')}
      </span>
    );
  };

  const pageNumbers = () => [totalPages, '...', 3, 2, 1] as (number | string)[];

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-6">
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <ShieldAlert className="w-6 h-6 text-primary" />
          <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t('definedRisks.title')}
          </h1>
        </div>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
          {t('definedRisks.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <TabButton
            active={activeTab === 'all'}
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
            label={t('definedRisks.tabs.all')}
            count={statusCount.all}
          />
          <TabButton
            active={activeTab === 'automated'}
            onClick={() => {
              setActiveTab('automated');
              setCurrentPage(1);
            }}
            label={t('definedRisks.tabs.automated')}
            count={statusCount.automated}
          />
          <TabButton
            active={activeTab === 'manual'}
            onClick={() => {
              setActiveTab('manual');
              setCurrentPage(1);
            }}
            label={t('definedRisks.tabs.manual')}
            count={statusCount.manual}
          />
        </div>
      </div>

      {/* Search + Filter */}
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            placeholder={t('definedRisks.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full h-12 bg-white border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-colors ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <button
          type="button"
          className="h-12 px-6 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {t('definedRisks.searchButton')}
        </button>
        <button
          type="button"
          className={`h-12 px-4 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-foreground ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Filter className="w-4 h-4" />
          <span>{t('definedRisks.filter')}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Entries count */}
      <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t('definedRisks.entriesInTable')}:{' '}
        </span>
        <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {TOTAL_ENTRIES}
        </span>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-4 w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                  />
                </th>
                {[
                  t('definedRisks.riskId'),
                  t('definedRisks.riskName'),
                  t('definedRisks.riskLevel'),
                  t('definedRisks.businessDomain'),
                  t('definedRisks.determination'),
                  t('definedRisks.dateAdded'),
                  t('definedRisks.action'),
                ].map((label) => (
                  <th
                    key={label}
                    className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <span
                      className="text-foreground"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                    >
                      {label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedIds.has(risk.id)}
                      onCheckedChange={() => toggleSelect(risk.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-foreground font-mono"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                    >
                      {risk.riskId}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p
                      className="text-foreground truncate"
                      style={{ fontSize: 'var(--text-sm)' }}
                      title={risk.fullTitle}
                    >
                      {risk.riskName}
                    </p>
                    <p
                      className="text-muted-foreground truncate"
                      style={{ fontSize: 'var(--text-xs)' }}
                      title={risk.fullTitle}
                    >
                      {risk.fullTitle}
                    </p>
                  </td>
                  <td className="px-6 py-4">{getRiskLevelBadge(risk.riskLevel)}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-700 border-gray-200"
                      style={{ fontSize: 'var(--text-xs)' }}
                    >
                      {risk.businessDomain}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">{getStatusPill(risk)}</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-muted-foreground tabular-nums"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {risk.dateAdded}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handleActivateAutomation(risk)}
                      className="bg-primary hover:bg-primary/90 text-white h-9"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                    >
                      {risk.determination === 'automated'
                        ? t('definedRisks.manageAutomation')
                        : t('definedRisks.activateAutomation')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6" dir="ltr">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="h-9 w-9"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
        </Button>
        {pageNumbers().map((page, idx) => (
          <Button
            key={`${page}-${idx}`}
            variant={typeof page === 'number' && page === currentPage ? 'default' : 'ghost'}
            size="sm"
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`h-9 min-w-9 px-3 ${
              typeof page === 'number' && page === currentPage
                ? 'bg-transparent text-primary border-b-2 border-primary rounded-none hover:bg-transparent'
                : ''
            }`}
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: typeof page === 'number' && page === currentPage ? 600 : 400,
            }}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="h-9 w-9"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </Button>
      </div>

      <AutoReplySettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        question={activeQuestion}
        context="risk"
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative py-3 flex items-center gap-2 transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
      style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
    >
      <span>{label}</span>
      <span
        className={`inline-flex items-center justify-center min-w-6 h-5 px-1.5 rounded-full tabular-nums transition-colors ${
          active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        }`}
        style={{ fontSize: '11px', fontWeight: 600 }}
      >
        {count}
      </span>
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary rounded-full" />
      )}
    </button>
  );
}
