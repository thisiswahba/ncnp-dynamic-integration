import { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronDown, MoreVertical, ExternalLink, Eye, Pencil, Power, PowerOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/language-context';
import {
  AutoReplySettingsDialog,
  type AutoReplyMode,
  type AutoReplyContext,
  type AutoReplyQuestion,
  type PreloadedQuery,
} from '@/app/components/auto-reply-settings-dialog';

type LinkedType = 'question' | 'risk';

interface Query {
  id: string;
  queryId: string;
  linkedItem: string;
  linkedType: LinkedType;
  linkedId: string;
  businessDomain: string;
  status: 'activated' | 'deactivated';
  lastUpdated: string;
  createdBy: string;
}

const mockQueries: Query[] = [
  { id: '1', queryId: '#QRY-1001', linkedItem: 'Was the Board of Directors meeting held?', linkedType: 'question', linkedId: '#1001', businessDomain: 'Administrative', status: 'activated', lastUpdated: '24/11/2024', createdBy: 'Mohamed S.' },
  { id: '2', queryId: '#QRY-1002', linkedItem: 'How many years has the organization been operating?', linkedType: 'question', linkedId: '#1002', businessDomain: 'Financial', status: 'activated', lastUpdated: '22/11/2024', createdBy: 'Mohamed S.' },
  { id: '3', queryId: '#QRY-1003', linkedItem: 'Financial Fraud Risk — High Severity', linkedType: 'risk', linkedId: '#R-201', businessDomain: 'Financial', status: 'deactivated', lastUpdated: '20/11/2024', createdBy: 'Sarah A.' },
  { id: '4', queryId: '#QRY-1004', linkedItem: 'Compliance years maintained', linkedType: 'question', linkedId: '#1004', businessDomain: 'Compliance', status: 'activated', lastUpdated: '18/11/2024', createdBy: 'Mohamed S.' },
  { id: '5', queryId: '#QRY-1005', linkedItem: 'Regulatory Violation Risk', linkedType: 'risk', linkedId: '#R-202', businessDomain: 'Compliance', status: 'activated', lastUpdated: '15/11/2024', createdBy: 'Sarah A.' },
  { id: '6', queryId: '#QRY-1006', linkedItem: 'Beneficiaries growth rate', linkedType: 'question', linkedId: '#1006', businessDomain: 'Operations', status: 'deactivated', lastUpdated: '12/11/2024', createdBy: 'Ahmed K.' },
  { id: '7', queryId: '#QRY-1007', linkedItem: 'Service Coverage Risk', linkedType: 'risk', linkedId: '#R-203', businessDomain: 'Operations', status: 'activated', lastUpdated: '10/11/2024', createdBy: 'Ahmed K.' },
];

// Mock expressions for each query — in production these would come from the backend
function mockPreloadedForQuery(query: Query): { question: AutoReplyQuestion; preloaded: PreloadedQuery } {
  const answerOptions =
    query.linkedType === 'question'
      ? [
          { id: 'a1', text: 'Yes, the meeting was held as scheduled.', weight: 100 },
          { id: 'a2', text: 'No, the meeting was not held as scheduled.', weight: 20 },
        ]
      : [
          { id: 'a1', text: 'High — entity flagged', weight: 100 },
          { id: 'a2', text: 'Low — no match', weight: 0 },
        ];
  return {
    question: {
      id: query.linkedId,
      title: query.linkedItem,
      automated: query.status === 'activated',
      answers: answerOptions,
    },
    preloaded: {
      isActive: query.status === 'activated',
      expression: {
        conditions: [
          {
            id: 'c1',
            domain: `${query.businessDomain} Sector`,
            source: query.linkedType === 'question' ? 'Board Governance' : 'Tax Agency',
            element: query.linkedType === 'question' ? 'meeting_held' : 'compliance_score',
            elementType: query.linkedType === 'question' ? 'Boolean' : 'Number',
            operator: query.linkedType === 'question' ? '=' : '>',
            value: query.linkedType === 'question' ? 'true' : '80',
          },
        ],
        connectors: [],
      },
    },
  };
}

const TOTAL_ENTRIES = 127;

type TabKey = 'all' | 'question' | 'risk';

export function QueriesPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<AutoReplyMode>('view');
  const [dialogContext, setDialogContext] = useState<AutoReplyContext>('question');
  const [activeDialogQuery, setActiveDialogQuery] = useState<{ question: AutoReplyQuestion; preloaded: PreloadedQuery } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredQueries = mockQueries.filter((query) => {
    const matchesTab = activeTab === 'all' || query.linkedType === activeTab;
    const matchesSearch =
      query.queryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.linkedItem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = 14;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredQueries.map((q) => q.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = filteredQueries.length > 0 && selectedIds.size === filteredQueries.length;

  const openDialog = (query: Query, mode: AutoReplyMode) => {
    setActiveDialogQuery(mockPreloadedForQuery(query));
    setDialogMode(mode);
    setDialogContext(query.linkedType === 'risk' ? 'risk' : 'question');
    setDialogOpen(true);
    setOpenMenuId(null);
  };

  const handleView = (query: Query) => openDialog(query, 'view');
  const handleEdit = (query: Query) => openDialog(query, 'edit');

  const handleToggleStatus = (id: string) => {
    console.log('Toggle', id);
    setOpenMenuId(null);
  };

  const handleNavigate = (query: Query) => {
    if (query.linkedType === 'question') {
      navigate('/admin/questions');
    } else {
      navigate('/admin/risks');
    }
    setOpenMenuId(null);
  };

  const pageNumbers = () => [totalPages, '...', 3, 2, 1] as (number | string)[];

  const statusCount = {
    all: mockQueries.length,
    question: mockQueries.filter((q) => q.linkedType === 'question').length,
    risk: mockQueries.filter((q) => q.linkedType === 'risk').length,
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('queriesAdmin.title')}
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
          {t('queriesAdmin.subtitle')}
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
            label={t('queriesAdmin.tabs.all')}
            count={statusCount.all}
          />
          <TabButton
            active={activeTab === 'question'}
            onClick={() => {
              setActiveTab('question');
              setCurrentPage(1);
            }}
            label={t('queriesAdmin.tabs.question')}
            count={statusCount.question}
          />
          <TabButton
            active={activeTab === 'risk'}
            onClick={() => {
              setActiveTab('risk');
              setCurrentPage(1);
            }}
            label={t('queriesAdmin.tabs.risk')}
            count={statusCount.risk}
          />
        </div>
      </div>

      {/* Search + Filter */}
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            placeholder={t('queriesAdmin.searchPlaceholder')}
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
          {t('queriesAdmin.searchButton')}
        </button>
        <button
          type="button"
          className={`h-12 px-4 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-foreground ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Filter className="w-4 h-4" />
          <span>{t('queriesAdmin.filter')}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Entries count */}
      <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t('queriesAdmin.entriesInTable')}:{' '}
        </span>
        <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {TOTAL_ENTRIES}
        </span>
      </div>

      {/* Table */}
      {filteredQueries.length > 0 ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto overflow-y-visible">
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
                    t('queriesAdmin.queryId'),
                    t('queriesAdmin.linkedItem'),
                    t('queriesAdmin.type'),
                    t('queriesAdmin.businessDomain'),
                    t('queriesAdmin.status'),
                    t('queriesAdmin.lastUpdated'),
                    t('queriesAdmin.action'),
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
                {filteredQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <Checkbox
                        checked={selectedIds.has(query.id)}
                        onCheckedChange={() => toggleSelect(query.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-foreground font-mono"
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                      >
                        {query.queryId}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <button
                        onClick={() => handleNavigate(query)}
                        className={`text-foreground hover:text-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <span className="block truncate">{query.linkedItem}</span>
                        <span
                          className="text-muted-foreground font-mono"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          {query.linkedId}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          query.linkedType === 'question'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {query.linkedType === 'question'
                          ? t('queriesAdmin.linkedType.question')
                          : t('queriesAdmin.linkedType.risk')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-700 border-gray-200"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {query.businessDomain}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={query.status} t={t} />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-muted-foreground tabular-nums"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {query.lastUpdated}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="relative"
                        ref={openMenuId === query.id ? menuRef : undefined}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            setOpenMenuId(openMenuId === query.id ? null : query.id)
                          }
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {openMenuId === query.id && (
                          <div
                            className={`absolute z-50 mt-1 w-56 rounded-lg border border-border bg-white shadow-lg overflow-hidden ${isRTL ? 'left-0' : 'right-0'}`}
                          >
                            <MenuItem
                              icon={<Eye className="w-4 h-4" />}
                              label={t('queriesAdmin.viewDetails')}
                              onClick={() => handleView(query)}
                              isRTL={isRTL}
                            />
                            <MenuItem
                              icon={<Pencil className="w-4 h-4" />}
                              label={t('queriesAdmin.editDetails')}
                              onClick={() => handleEdit(query)}
                              isRTL={isRTL}
                            />
                            {query.status === 'deactivated' ? (
                              <MenuItem
                                icon={<Power className="w-4 h-4 text-green-600" />}
                                label={t('queriesAdmin.activate')}
                                onClick={() => handleToggleStatus(query.id)}
                                isRTL={isRTL}
                              />
                            ) : (
                              <MenuItem
                                icon={<PowerOff className="w-4 h-4 text-destructive" />}
                                label={t('queriesAdmin.deactivate')}
                                onClick={() => handleToggleStatus(query.id)}
                                isRTL={isRTL}
                                danger
                              />
                            )}
                            <div className="border-t border-border" />
                            <MenuItem
                              icon={<ExternalLink className="w-4 h-4" />}
                              label={t('queriesAdmin.navigateToLinkedItem')}
                              onClick={() => handleNavigate(query)}
                              isRTL={isRTL}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {t('queriesAdmin.empty.title')}
          </h3>
          <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
            {t('queriesAdmin.empty.description')}
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredQueries.length > 0 && (
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
                fontWeight:
                  typeof page === 'number' && page === currentPage ? 600 : 400,
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
      )}

      <AutoReplySettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        question={activeDialogQuery?.question ?? null}
        preloaded={activeDialogQuery?.preloaded ?? null}
        mode={dialogMode}
        context={dialogContext}
        onRequestEdit={() => setDialogMode('edit')}
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

function StatusPill({
  status,
  t,
}: {
  status: Query['status'];
  t: (k: string) => string;
}) {
  if (status === 'activated') {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </span>
        {t('queriesAdmin.statusActive')}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
      style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      {t('queriesAdmin.statusInactive')}
    </span>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  isRTL,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isRTL: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'} ${danger ? 'text-destructive' : 'text-foreground'}`}
      style={{ fontSize: 'var(--text-sm)' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
