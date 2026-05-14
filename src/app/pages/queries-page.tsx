import { useState } from 'react';
import { Search, Filter, ChevronDown, Pencil } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/language-context';
import {
  AutoReplySettingsDialog,
  type AutoReplyAnswer,
  type AutoReplyContext,
  type AutoReplyQuestion,
  type Condition,
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
  { id: '6', queryId: '#QRY-1006', linkedItem: 'Beneficiaries growth rate', linkedType: 'question', linkedId: '#1006', businessDomain: 'Operations', status: 'activated', lastUpdated: '12/11/2024', createdBy: 'Ahmed K.' },
  { id: '7', queryId: '#QRY-1007', linkedItem: 'Service Coverage Risk', linkedType: 'risk', linkedId: '#R-203', businessDomain: 'Operations', status: 'activated', lastUpdated: '10/11/2024', createdBy: 'Ahmed K.' },
];

// Mock expressions for each query — in production these would come from the backend.
// The "question" variant exercises the nested Predefined Answers tree so the
// auto-reply settings dialog renders the full Figma design (branching answers
// with a sub-question + nested options).
/**
 * Predefined answers used by the simple demo queries (#QRY-1001 / 1002).
 * Same three options so the rules can map deterministically:
 *   - balance < 10000                 → Answer 1
 *   - balance > 10000 AND area = sa   → Answer 2
 *   - else                            → Answer 3
 */
const DEMO_ANSWERS: AutoReplyAnswer[] = [
  { id: 'a1', text: 'Answer 1 — balance below threshold', weight: 60 },
  { id: 'a2', text: 'Answer 2 — balance above threshold and area = SA', weight: 30 },
  { id: 'a3', text: 'Answer 3 — fallback when no rule matches', weight: 10 },
];

/**
 * Predefined answers used by the focused OR-demo query (#QRY-1004).
 */
const DEMO_ANSWERS_OR: AutoReplyAnswer[] = [
  { id: 'a1', text: 'Answer 1 — covered region', weight: 70 },
  { id: 'a2', text: 'Answer 2 — out-of-region fallback', weight: 30 },
];

/**
 * Predefined answers used by the kitchen-sink demo (#QRY-1006). Six
 * outcomes so every rule in the comprehensive query maps to its own
 * answer (a1…a6).
 */
const DEMO_ANSWERS_KITCHEN_SINK: AutoReplyAnswer[] = [
  { id: 'a1', text: 'Answer 1 — fully active and well-funded', weight: 25 },
  { id: 'a2', text: 'Answer 2 — high-coverage region', weight: 20 },
  { id: 'a3', text: 'Answer 3 — manager match with valid licence', weight: 15 },
  { id: 'a4', text: 'Answer 4 — compliance flag', weight: 15 },
  { id: 'a5', text: 'Answer 5 — dormant entity', weight: 15 },
  { id: 'a6', text: 'Answer 6 — fallback (no rule matched)', weight: 10 },
];

function mockPreloadedForQuery(query: Query): { question: AutoReplyQuestion; preloaded: PreloadedQuery } {
  // Pick the appropriate rule set + answers vocabulary based on which
  // demo this row is meant to showcase.
  let answers: AutoReplyAnswer[];
  let conditions: Condition[];

  if (query.queryId === '#QRY-1006') {
    // Kitchen-sink: every BR Scenario 2 operator category + parens +
    // multiple separate IFs + ELSE in a single query.
    answers = DEMO_ANSWERS_KITCHEN_SINK;
    conditions = [
      // Rule 1 — IF total_revenue ≥ 1000000 AND tax_status = 'active'
      //           OR last_filing_date BETWEEN 2024-01-01 AND 2024-12-31
      //         THEN Answer 1
      {
        id: 'r1',
        domain: 'Financial Sector',
        source: 'Tax Agency',
        element: 'total_revenue',
        elementType: 'Number',
        operator: '≥',
        value: '1000000',
        andClauses: [
          {
            domain: 'Financial Sector',
            source: 'Tax Agency',
            element: 'tax_status',
            elementType: 'String',
            operator: '=',
            value: 'active',
            connector: 'AND',
          },
          {
            domain: 'Financial Sector',
            source: 'Tax Agency',
            element: 'last_filing_date',
            elementType: 'Date',
            operator: 'BETWEEN',
            value: '2024-01-01',
            value2: '2024-12-31',
            connector: 'OR',
          },
        ],
        answerId: 'a1',
      },

      // Rule 2 — IF ( area = 'sa' OR area = 'wa' )
      //            AND beneficiaries_count > 500
      //         THEN Answer 2
      {
        id: 'r2',
        domain: 'Operations Sector',
        source: 'NCNP Registry',
        element: 'area',
        elementType: 'String',
        operator: '=',
        value: 'sa',
        openParen: true,
        closeParen: true,
        andClauses: [
          {
            domain: 'Operations Sector',
            source: 'NCNP Registry',
            element: 'area',
            elementType: 'String',
            operator: '=',
            value: 'wa',
            connector: 'OR',
          },
          {
            domain: 'Operations Sector',
            source: 'NCNP Registry',
            element: 'beneficiaries_count',
            elementType: 'Number',
            operator: '>',
            value: '500',
            connector: 'AND',
          },
        ],
        answerId: 'a2',
      },

      // Rule 3 — IF manager_name CONTAINS 'Mohamed'
      //            AND license_status IS NOT NULL
      //         THEN Answer 3
      {
        id: 'r3',
        domain: 'Administrative Sector',
        source: 'HR Management',
        element: 'manager_name',
        elementType: 'String',
        operator: 'CONTAINS',
        value: 'Mohamed',
        andClauses: [
          {
            domain: 'Financial Sector',
            source: 'MFA',
            element: 'license_status',
            elementType: 'String',
            operator: 'IS NOT NULL',
            connector: 'AND',
          },
        ],
        answerId: 'a3',
      },

      // Rule 4 — IF compliance_score < 50 THEN Answer 4
      {
        id: 'r4',
        domain: 'Financial Sector',
        source: 'MFA',
        element: 'compliance_score',
        elementType: 'Number',
        operator: '<',
        value: '50',
        answerId: 'a4',
      },

      // Rule 5 — IF tax_status ≠ 'active' AND meeting_held = false
      //         THEN Answer 5
      {
        id: 'r5',
        domain: 'Financial Sector',
        source: 'Tax Agency',
        element: 'tax_status',
        elementType: 'String',
        operator: '≠',
        value: 'active',
        andClauses: [
          {
            domain: 'Administrative Sector',
            source: 'Board Governance',
            element: 'meeting_held',
            elementType: 'Boolean',
            operator: '=',
            value: 'false',
            connector: 'AND',
          },
        ],
        answerId: 'a5',
      },

      // Rule 6 — ELSE THEN Answer 6
      { id: 'r6', isElse: true, answerId: 'a6' },
    ];
  } else if (query.queryId === '#QRY-1004') {
    // Minimal OR demo — one IF rule with two area clauses joined by OR,
    // plus a catch-all ELSE.
    answers = DEMO_ANSWERS_OR;
    conditions = [
      {
        id: 'c1',
        domain: 'Operations Sector',
        source: 'NCNP Registry',
        element: 'area',
        elementType: 'String',
        operator: '=',
        value: 'sa',
        andClauses: [
          {
            domain: 'Operations Sector',
            source: 'NCNP Registry',
            element: 'area',
            elementType: 'String',
            operator: '=',
            value: 'wa',
            connector: 'OR',
          },
        ],
        answerId: 'a1',
      },
      { id: 'c2', isElse: true, answerId: 'a2' },
    ];
  } else if (query.queryId === '#QRY-1002') {
    // Two-rule AND + ELSE demo (user's original example).
    answers = DEMO_ANSWERS;
    conditions = [
      {
        id: 'c1',
        domain: 'Financial Sector',
        source: 'Tax Agency',
        element: 'balance',
        elementType: 'Number',
        operator: '>',
        value: '10000',
        andClauses: [
          {
            domain: 'Operations Sector',
            source: 'NCNP Registry',
            element: 'area',
            elementType: 'String',
            operator: '=',
            value: 'sa',
            connector: 'AND',
          },
        ],
        answerId: 'a2',
      },
      { id: 'c2', isElse: true, answerId: 'a3' },
    ];
  } else {
    // Default demo (#QRY-1001 and everything else):
    // Rule 1: IF balance < 10000 THEN Answer 1
    answers = DEMO_ANSWERS;
    conditions = [
      {
        id: 'c1',
        domain: 'Financial Sector',
        source: 'Tax Agency',
        element: 'balance',
        elementType: 'Number',
        operator: '<',
        value: '10000',
        answerId: 'a1',
      },
    ];
  }

  return {
    question: {
      id: query.linkedId,
      title: query.linkedItem,
      automated: query.status === 'activated',
      answers,
    },
    preloaded: {
      isActive: query.status === 'activated',
      expression: {
        conditions,
        connectors: [],
      },
    },
  };
}

const TOTAL_ENTRIES = 127;

export function QueriesPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<AutoReplyContext>('question');
  const [activeDialogQuery, setActiveDialogQuery] = useState<{ question: AutoReplyQuestion; preloaded: PreloadedQuery } | null>(null);

  const filteredQueries = mockQueries.filter((query) => {
    const matchesSearch =
      query.queryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.linkedItem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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

  /**
   * Single row action: open the Auto Reply Settings sheet. The dialog itself
   * owns the View / Edit tab strip; activate/deactivate already lives inside
   * the body's Predefined Answers section.
   */
  const handleOpenRow = (query: Query) => {
    setActiveDialogQuery(mockPreloadedForQuery(query));
    setDialogContext(query.linkedType === 'risk' ? 'risk' : 'question');
    setDialogOpen(true);
  };

  const pageNumbers = () => [totalPages, '...', 3, 2, 1] as (number | string)[];

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
                      <div
                        className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <span className="block truncate">{query.linkedItem}</span>
                        <span
                          className="text-muted-foreground font-mono"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          {query.linkedId}
                        </span>
                      </div>
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
                      {/* Single row action — opens the Auto Reply Settings sheet.
                          View / Edit toggle + Activate switch live inside the dialog. */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenRow(query)}
                        className={`h-8 inline-flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        {t('queriesAdmin.openAction')}
                      </Button>
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
        mode="edit"
        context={dialogContext}
      />
    </div>
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

