import { useEffect, useMemo, useState, forwardRef, useRef } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Badge } from '@/app/components/ui/badge';
import {
  Info,
  ChevronDown,
  ChevronRight,
  X as CloseIcon,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Sparkles,
  Clock,
  Lock,
  Pencil,
  Variable,
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

// ── Types ──────────────────────────────────────────────────────────────────────

interface SubQuestion {
  id: string;
  title: string;
}

export interface AutoReplyAnswer {
  id: string;
  text: string;
  weight: number;
  /**
   * Optional nested sub-question that branches off this answer.
   * Enables the tree structure for "Predefined Answers".
   */
  subQuestion?: AutoReplySubBranch;
}

export interface AutoReplySubBranch {
  id: string;
  title: string;
  answers: AutoReplyAnswer[];
}

export interface AutoReplyQuestion {
  id: string;
  title: string;
  subQuestions?: SubQuestion[];
  answers: AutoReplyAnswer[];
  automated?: boolean;
}

type ElementDataType = 'Number' | 'String' | 'Date' | 'Boolean';

interface CatalogElement {
  name: string;
  type: ElementDataType;
}

interface CatalogSystem {
  name: string;
  elements: CatalogElement[];
}

interface CatalogWorkField {
  name: string;
  systems: CatalogSystem[];
}

/**
 * One IF clause — the same shape as the parent Condition minus the
 * rule-level metadata (id, answerId, parens). Used by `andClauses` to
 * inline AND-joined sub-conditions within the same rule.
 */
export interface ConditionClause {
  domain?: string;
  source?: string;
  element?: string;
  elementType?: ElementDataType;
  operator?: string;
  value?: string;
  value2?: string;
}

export interface Condition {
  id: string;
  domain?: string;
  source?: string;
  element?: string;
  elementType?: ElementDataType;
  operator?: string;
  /** Right-hand side literal (single value, or lower bound for range ops). */
  value?: string;
  /** Upper bound for range operators (BETWEEN / NOT BETWEEN). */
  value2?: string;
  /**
   * Additional clauses joined to the primary clause with AND. All clauses
   * must match for the rule's IF to be considered true. Renders inline as
   *   `<primary> AND <clause₁> AND <clause₂>…`
   */
  andClauses?: ConditionClause[];
  /**
   * THEN — id of the predefined answer this rule resolves to when its IF
   * condition matches at runtime. Each If is an independent rule; the first
   * rule whose IF matches wins and its THEN answer is returned.
   */
  answerId?: string;
  /**
   * Marks the rule as the catch-all `ELSE` branch — it has no IF clauses
   * and resolves to its `answerId` when no preceding rule matched. Only
   * one else rule is meaningful and it should be the last rule.
   */
  isElse?: boolean;
  /**
   * Manual parentheses grouping. Renders `(` before the condition when
   * `openParen` is true and `)` after when `closeParen` is true. Operates
   * purely on visual structure — `isConditionComplete` and inquiry logic
   * are unaffected by paren state.
   */
  openParen?: boolean;
  closeParen?: boolean;
}

export type OperatorCategory = 'comparison' | 'text' | 'nullEmpty' | 'range';

export interface OperatorOption {
  symbol: string;
  category: OperatorCategory;
}

const OPERATOR_CATEGORY_ORDER: OperatorCategory[] = [
  'comparison',
  'text',
  'range',
  'nullEmpty',
];

interface Expression {
  conditions: Condition[];
  connectors: ('AND' | 'OR')[];
}

type PickerStep = 'domain' | 'source' | 'element' | 'operator' | 'value';

interface InquiryResult {
  success: boolean;
  message?: string;
  answer?: string;
  elapsedMs?: number;
}

// ── Validation (BR 1.x / BR 2.x / BR 3.x) ─────────────────────────────────────

export type ValidationStatus = 'unvalidated' | 'valid' | 'invalid';

export type IemCode =
  | 'IEM160'
  | 'IEM161'
  | 'IEM162'
  | 'IEM163'
  | 'IEM164'
  // Test input parameter errors (BR 1.x — Test Endpoints)
  | 'IEM165' // mandatory test input missing
  | 'IEM166' // test input does not match expected data type
  | 'IEM167' // endpoint unreachable / timeout
  | 'IEM168' // endpoint authentication / authorization failed
  | 'IEM169'; // unexpected response from endpoint

export interface ValidationError {
  code: IemCode;
  /**
   * `condition` errors attach to a specific row, `expression` errors are
   * global to the canvas, `testInput` errors attach to a specific test
   * input field (keyed by `inputKey`).
   */
  scope: 'condition' | 'expression' | 'testInput';
  conditionId?: string;
  inputKey?: string;
}

// ── Reference Catalog ─────────────────────────────────────────────────────────

const catalog: CatalogWorkField[] = [
  {
    name: 'Administrative Sector',
    systems: [
      {
        name: 'Board Governance',
        elements: [
          { name: 'last_meeting_date', type: 'Date' },
          { name: 'meeting_held', type: 'Boolean' },
          { name: 'attendees_count', type: 'Number' },
        ],
      },
      {
        name: 'HR Management',
        elements: [
          { name: 'employees_count', type: 'Number' },
          { name: 'manager_name', type: 'String' },
        ],
      },
    ],
  },
  {
    name: 'Financial Sector',
    systems: [
      {
        name: 'Tax Agency',
        elements: [
          { name: 'balance', type: 'Number' },
          { name: 'total_revenue', type: 'Number' },
          { name: 'last_filing_date', type: 'Date' },
          { name: 'tax_status', type: 'String' },
        ],
      },
      {
        name: 'MFA',
        elements: [
          { name: 'compliance_score', type: 'Number' },
          { name: 'license_status', type: 'String' },
        ],
      },
    ],
  },
  {
    name: 'Operations Sector',
    systems: [
      {
        name: 'NCNP Registry',
        elements: [
          { name: 'area', type: 'String' },
          { name: 'beneficiaries_count', type: 'Number' },
          { name: 'services_count', type: 'Number' },
          { name: 'sector', type: 'String' },
        ],
      },
    ],
  },
];

/**
 * Returns the operators that are valid for a given Metadata element type,
 * grouped by category. Drives Scenario 4 (Operator Compatibility) and
 * Scenario 2 (Operator Categories) from [B09.U22].
 */
function operatorsForType(type?: ElementDataType): OperatorOption[] {
  if (!type) return [];

  const equality: OperatorOption[] = [
    { symbol: '=', category: 'comparison' },
    { symbol: '\u2260', category: 'comparison' },
  ];
  const standardNullEmpty: OperatorOption[] = [
    { symbol: 'IS NULL', category: 'nullEmpty' },
    { symbol: 'IS NOT NULL', category: 'nullEmpty' },
  ];

  if (type === 'String') {
    return [
      ...equality,
      { symbol: 'CONTAINS', category: 'text' },
      { symbol: 'NOT CONTAINS', category: 'text' },
      { symbol: 'STARTS WITH', category: 'text' },
      { symbol: 'ENDS WITH', category: 'text' },
      ...standardNullEmpty,
      { symbol: 'IS EMPTY', category: 'nullEmpty' },
      { symbol: 'NOT EMPTY', category: 'nullEmpty' },
    ];
  }

  if (type === 'Number' || type === 'Date') {
    return [
      ...equality,
      { symbol: '>', category: 'comparison' },
      { symbol: '<', category: 'comparison' },
      { symbol: '\u2265', category: 'comparison' },
      { symbol: '\u2264', category: 'comparison' },
      { symbol: 'BETWEEN', category: 'range' },
      { symbol: 'NOT BETWEEN', category: 'range' },
      ...standardNullEmpty,
    ];
  }

  if (type === 'Boolean') {
    return [...equality, ...standardNullEmpty];
  }

  return equality;
}

function valueRequiresInput(operator?: string): boolean {
  if (!operator) return true;
  return !['IS NULL', 'IS NOT NULL', 'IS EMPTY', 'NOT EMPTY'].includes(operator);
}

function isRangeOperator(operator?: string): boolean {
  return operator === 'BETWEEN' || operator === 'NOT BETWEEN';
}

/**
 * True when one clause (primary or AND'd) has all the picker fields it
 * needs to evaluate at runtime. The clause shape mirrors a `Condition` but
 * without rule-level fields.
 */
function isClauseComplete(c: ConditionClause): boolean {
  if (!c.domain || !c.source || !c.element || !c.operator) return false;
  if (!valueRequiresInput(c.operator)) return true;
  if (isRangeOperator(c.operator)) return !!c.value && !!c.value2;
  return !!c.value;
}

function isConditionComplete(c: Condition): boolean {
  // THEN answer is part of completeness for every rule — a rule without an
  // outcome can't resolve to anything at runtime.
  if (!c.answerId) return false;
  // The catch-all ELSE rule has no IF clauses; the answerId alone is enough.
  if (c.isElse) return true;
  if (!isClauseComplete(c)) return false;
  return (c.andClauses ?? []).every(isClauseComplete);
}

// ── Audit Trail (BR 1.9 — Test Endpoints) ─────────────────────────────────────

interface TestAuditEntry {
  user: string;
  /** Year supplied as a test input alongside the user identity. */
  year: string;
  event: 'Test Endpoint';
  time: string;
  questionId: string;
}

/**
 * BR 1.9 — record who clicked Test, what event, and when. Persists to
 * sessionStorage so the entry survives modal-close within the session, and
 * mirrors it to the console for visibility. Real wiring would POST this to
 * a server-side audit log.
 */
function recordTestAuditEntry(
  inputs: { userId: string; year: string },
  questionId: string
): void {
  const entry: TestAuditEntry = {
    user: inputs.userId,
    year: inputs.year,
    event: 'Test Endpoint',
    time: new Date().toISOString(),
    questionId,
  };
  try {
    const raw = sessionStorage.getItem('autoReply.testAuditTrail');
    const trail = raw ? (JSON.parse(raw) as TestAuditEntry[]) : [];
    trail.push(entry);
    sessionStorage.setItem(
      'autoReply.testAuditTrail',
      JSON.stringify(trail.slice(-50))
    );
  } catch {
    // sessionStorage unavailable — fall through to console only
  }
  // eslint-disable-next-line no-console
  console.info('[audit] Test Endpoint', entry);
}

// ── Static Validation (B09.U24) ───────────────────────────────────────────────

/** BR 1.3 — operator must be in the set returned by `operatorsForType`. */
function isOperatorCompatible(c: Condition): boolean {
  if (!c.operator) return true; // Caught separately by completeness
  const allowed = operatorsForType(c.elementType).map((o) => o.symbol);
  return allowed.includes(c.operator);
}

/** BR 1.4 — referenced metadata element must exist within the chosen domain. */
function isElementResolvable(c: Condition): boolean {
  if (!c.domain || !c.source || !c.element) return true; // Caught by completeness
  const domain = catalog.find((d) => d.name === c.domain);
  if (!domain) return false;
  const source = domain.systems.find((s) => s.name === c.source);
  if (!source) return false;
  return source.elements.some((e) => e.name === c.element);
}

/**
 * BR 1.5 — parens must be both structurally well-formed (no close before open)
 * and balanced (total opens = total closes).
 */
function inspectParens(expression: Expression): {
  balanced: boolean;
  structural: boolean;
} {
  let depth = 0;
  let structural = true;
  for (const c of expression.conditions) {
    if (c.openParen) depth++;
    if (c.closeParen) {
      depth--;
      if (depth < 0) {
        structural = false;
        // Reset so we don't keep cascading the error
        depth = 0;
      }
    }
  }
  return { balanced: depth === 0, structural };
}

/**
 * Runs every BR 1.x check on the expression and returns the list of
 * issues found. An empty array means the query is valid.
 */
function validateExpression(expression: Expression): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const c of expression.conditions) {
    // BR 1.2 — completeness / syntax
    if (!isConditionComplete(c)) {
      errors.push({ code: 'IEM160', scope: 'condition', conditionId: c.id });
      // Skip the rest of this condition — further errors would be noisy.
      continue;
    }
    // BR 1.4 — element resolvable inside chosen Business Domain
    if (!isElementResolvable(c)) {
      errors.push({ code: 'IEM162', scope: 'condition', conditionId: c.id });
    }
    // BR 1.3 — operator compatible with element data type
    if (!isOperatorCompatible(c)) {
      errors.push({ code: 'IEM161', scope: 'condition', conditionId: c.id });
    }
  }

  // BR 1.5 — paren structure (open-before-close) and balance
  const parens = inspectParens(expression);
  if (!parens.structural) {
    errors.push({ code: 'IEM163', scope: 'expression' });
  } else if (!parens.balanced) {
    errors.push({ code: 'IEM164', scope: 'expression' });
  }

  return errors;
}

// ── Runtime Inputs (BR 1.x / BR 2.x) ──────────────────────────────────────────

/**
 * Describes a single runtime input the admin must supply when previewing
 * a query. Each unique element referenced by the expression becomes one
 * entry — duplicates are collapsed so the dialog stays terse.
 */
interface RuntimeInputDef {
  /** Stable key — `domain|source|element` — used as a record key. */
  key: string;
  /** Element name (e.g. `meeting_held`). */
  element: string;
  /** Element data type so the dialog renders the right control + validates. */
  type: ElementDataType;
  /** Lightweight breadcrumb for the label. */
  domain: string;
  source: string;
}

function collectRuntimeInputs(expression: Expression): RuntimeInputDef[] {
  const seen = new Set<string>();
  const out: RuntimeInputDef[] = [];
  for (const c of expression.conditions) {
    if (!c.element || !c.elementType || !c.domain || !c.source) continue;
    const key = `${c.domain}|${c.source}|${c.element}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      key,
      element: c.element,
      type: c.elementType,
      domain: c.domain,
      source: c.source,
    });
  }
  return out;
}

function coerceForCompare(
  raw: string | undefined,
  type: ElementDataType
): { ok: boolean; value: unknown } {
  if (raw === undefined || raw === '') return { ok: true, value: undefined };
  if (type === 'Number') {
    const n = Number(raw);
    return Number.isFinite(n) ? { ok: true, value: n } : { ok: false, value: raw };
  }
  if (type === 'Date') {
    const t = Date.parse(raw);
    return Number.isFinite(t) ? { ok: true, value: t } : { ok: false, value: raw };
  }
  if (type === 'Boolean') {
    if (raw === 'true') return { ok: true, value: true };
    if (raw === 'false') return { ok: true, value: false };
    return { ok: false, value: raw };
  }
  return { ok: true, value: raw };
}

function evaluateOneCondition(
  c: Condition,
  runtimeRaw: string | undefined
): boolean {
  const type = c.elementType ?? 'String';
  const { value: lhs } = coerceForCompare(runtimeRaw, type);
  const { value: rhs } = coerceForCompare(c.value, type);
  const { value: rhs2 } = coerceForCompare(c.value2, type);

  switch (c.operator) {
    case '=':
      return lhs === rhs;
    case '≠':
      return lhs !== rhs;
    case '>':
      return (lhs as number) > (rhs as number);
    case '<':
      return (lhs as number) < (rhs as number);
    case '≥':
      return (lhs as number) >= (rhs as number);
    case '≤':
      return (lhs as number) <= (rhs as number);
    case 'CONTAINS':
      return String(lhs ?? '').includes(String(rhs ?? ''));
    case 'NOT CONTAINS':
      return !String(lhs ?? '').includes(String(rhs ?? ''));
    case 'STARTS WITH':
      return String(lhs ?? '').startsWith(String(rhs ?? ''));
    case 'ENDS WITH':
      return String(lhs ?? '').endsWith(String(rhs ?? ''));
    case 'IS NULL':
      return runtimeRaw === undefined || runtimeRaw === '' || runtimeRaw === null;
    case 'IS NOT NULL':
      return !(runtimeRaw === undefined || runtimeRaw === '' || runtimeRaw === null);
    case 'IS EMPTY':
      return runtimeRaw === '';
    case 'NOT EMPTY':
      return runtimeRaw !== '' && runtimeRaw !== undefined && runtimeRaw !== null;
    case 'BETWEEN':
      return (
        lhs !== undefined && rhs !== undefined && rhs2 !== undefined &&
        (lhs as number) >= (rhs as number) && (lhs as number) <= (rhs as number)
      );
    case 'NOT BETWEEN':
      return (
        lhs !== undefined && rhs !== undefined && rhs2 !== undefined &&
        !((lhs as number) >= (rhs as number) && (lhs as number) <= (rhs as number))
      );
    default:
      return false;
  }
}

/**
 * Walks `expression.conditions` left to right, evaluating each one against
 * the runtime input values, then folds the results using the configured
 * AND / OR connectors and the per-condition openParen / closeParen flags.
 *
 * Implementation note: we build a string of `true`/`false`/`&&`/`||`/`(`/`)`
 * and run it through the JavaScript expression engine via `Function`.
 * Inputs to that engine are always coerced booleans we just computed —
 * no untrusted strings are interpolated.
 */
function evaluateExpression(
  expression: Expression,
  runtimeValues: Record<string, string>
): boolean {
  if (expression.conditions.length === 0) return false;

  let openCount = 0;
  let closeCount = 0;
  const parts: string[] = [];

  expression.conditions.forEach((c, i) => {
    if (i > 0) {
      const conn = expression.connectors[i - 1];
      parts.push(conn === 'AND' ? '&&' : '||');
    }
    if (c.openParen) {
      parts.push('(');
      openCount++;
    }
    const key = `${c.domain}|${c.source}|${c.element}`;
    const raw = runtimeValues[key];
    parts.push(String(evaluateOneCondition(c, raw)));
    if (c.closeParen) {
      parts.push(')');
      closeCount++;
    }
  });

  // Defensively balance — if the admin opened/closed without the other side
  // we silently pad to keep evaluation total. The UI surfaces structural
  // problems separately; we never throw here.
  while (closeCount < openCount) {
    parts.push(')');
    closeCount++;
  }
  while (openCount < closeCount) {
    parts.unshift('(');
    openCount++;
  }

  try {
    // eslint-disable-next-line no-new-func
    return Boolean(new Function(`return (${parts.join(' ')});`)());
  } catch {
    return false;
  }
}

// ── Pill Component ────────────────────────────────────────────────────────────

interface PillProps {
  label: string;
  placeholder: string;
  isSet: boolean;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'element' | 'operator';
}

const Pill = forwardRef<HTMLButtonElement, PillProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ label, placeholder, isSet, onClick, disabled, variant = 'element', ...rest }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-1.5 h-8 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[0.97]';

    if (!isSet) {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`${base} px-3 min-w-[120px] border border-dashed border-border text-muted-foreground bg-white/40 hover:border-primary/40 hover:text-foreground hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed`}
          style={{ fontSize: 'var(--text-xs)' }}
          {...rest}
        >
          {placeholder}
        </button>
      );
    }

    if (variant === 'operator') {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={`${base} min-w-[44px] px-2.5 border border-primary/30 text-primary bg-primary/10 font-mono font-semibold hover:bg-primary/15 hover:-translate-y-px active:translate-y-0`}
          style={{ fontSize: '13px' }}
          {...rest}
        >
          {label}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`${base} px-3 border border-emerald-200/70 text-emerald-900 bg-emerald-50/80 hover:border-emerald-300 hover:bg-emerald-50 hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-none`}
        style={{ fontSize: 'var(--text-xs)' }}
        {...rest}
      >
        {label}
      </button>
    );
  }
);
Pill.displayName = 'Pill';

// ── Component ─────────────────────────────────────────────────────────────────

export type AutoReplyMode = 'configure' | 'view' | 'edit';
export type AutoReplyContext = 'question' | 'risk';

export interface PreloadedQuery {
  expression: Expression;
  isActive: boolean;
  answerId?: string;
}

interface AutoReplySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: AutoReplyQuestion | null;
  mode?: AutoReplyMode;
  context?: AutoReplyContext;
  preloaded?: PreloadedQuery | null;
  onSave?: (expression: Expression, answer: string) => void;
  /** Fired the first time the admin switches to Edit from the tab strip. */
  onRequestEdit?: () => void;
}

function emptyCondition(): Condition {
  return { id: crypto.randomUUID() };
}

export function AutoReplySettingsDialog({
  open,
  onOpenChange,
  question,
  mode = 'configure',
  context = 'question',
  preloaded = null,
  onSave,
  onRequestEdit,
}: AutoReplySettingsDialogProps) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const isRisk = context === 'risk';
  // Mode is internally controllable — the prop seeds the initial value but
  // the user can flip between View / Edit via the header segmented control.
  const [currentMode, setCurrentMode] = useState<AutoReplyMode>(mode);
  useEffect(() => {
    if (open) setCurrentMode(mode);
  }, [open, mode]);
  const isReadOnly = currentMode === 'view';

  const [isAutomationActive, setIsAutomationActive] = useState<boolean>(false);
  const [hasStartedBuilding, setHasStartedBuilding] = useState<boolean>(false);
  const [expression, setExpression] = useState<Expression>({
    conditions: [emptyCondition()],
    connectors: [],
  });
  const [openedPicker, setOpenedPicker] = useState<{ id: string; step: PickerStep } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inquiryResult, setInquiryResult] = useState<InquiryResult | null>(null);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('unvalidated');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [executionError, setExecutionError] = useState<string | null>(null);
  // Test inputs — User ID + Year. Both are mandatory parameters (BR 1.8),
  // are captured in the audit trail (BR 1.9), and gate Save until filled.
  const [testUserId, setTestUserId] = useState<string>('');
  const [testYear, setTestYear] = useState<string>('');
  const inquiryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!inquiryResult || !inquiryRef.current) return;
    const el = inquiryRef.current;
    requestAnimationFrame(() => {
      let scroller: HTMLElement | null = el.parentElement;
      while (scroller) {
        const s = getComputedStyle(scroller);
        if (s.overflowY === 'auto' || s.overflowY === 'scroll') break;
        scroller = scroller.parentElement;
      }
      if (scroller) {
        const target = el.offsetTop + el.offsetHeight - scroller.clientHeight + 24;
        scroller.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }, [inquiryResult]);

  useEffect(() => {
    if (open && question) {
      if (preloaded) {
        setIsAutomationActive(preloaded.isActive);
        setExpression(preloaded.expression);
        setHasStartedBuilding(true);
      } else {
        setIsAutomationActive(!!question.automated);
        setHasStartedBuilding(!!question.automated);
        setExpression({ conditions: [emptyCondition()], connectors: [] });
      }
      setOpenedPicker(null);
      setSearchTerm('');
      setInquiryResult(null);
      // Each open starts in the unvalidated state per BR 3 default.
      setValidationStatus('unvalidated');
      setValidationErrors([]);
      setExecutionError(null);
      setTestUserId('');
      setTestYear('');
    }
  }, [open, question, preloaded]);

  // Any change to the expression invalidates prior validation results.
  // Status flips back to 'unvalidated' so the admin must re-run the gate.
  // Test inputs reset too — the shape may have changed.
  const markUnvalidated = () => {
    setValidationStatus('unvalidated');
    setValidationErrors([]);
    setExecutionError(null);
    setTestInputs({});
  };

  const displayedAnswers = question?.answers ?? [];

  const updateCondition = (id: string, patch: Partial<Condition>) => {
    setExpression((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
    setInquiryResult(null);
    markUnvalidated();
  };

  const removeCondition = (id: string) => {
    setExpression((prev) => {
      const idx = prev.conditions.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const nextConditions = [...prev.conditions];
      nextConditions.splice(idx, 1);
      const nextConnectors = [...prev.connectors];
      if (idx > 0) nextConnectors.splice(idx - 1, 1);
      else if (nextConnectors.length > 0) nextConnectors.splice(0, 1);
      return {
        conditions: nextConditions.length === 0 ? [emptyCondition()] : nextConditions,
        connectors: nextConnectors,
      };
    });
    setInquiryResult(null);
    markUnvalidated();
  };

  const addCondition = (connector: 'AND' | 'OR') => {
    setExpression((prev) => ({
      conditions: [...prev.conditions, emptyCondition()],
      connectors: [...prev.connectors, connector],
    }));
    setInquiryResult(null);
    markUnvalidated();
  };

  const toggleConnector = (index: number) => {
    setExpression((prev) => ({
      ...prev,
      connectors: prev.connectors.map((c, i) => (i === index ? (c === 'AND' ? 'OR' : 'AND') : c)),
    }));
    setInquiryResult(null);
    markUnvalidated();
  };

  const pickValue = (step: PickerStep, value: string, extras?: Partial<Condition>) => {
    if (!openedPicker) return;
    const id = openedPicker.id;
    if (step === 'domain') {
      updateCondition(id, {
        domain: value,
        source: undefined,
        element: undefined,
        elementType: undefined,
        operator: undefined,
        value: undefined,
      });
      setOpenedPicker({ id, step: 'source' });
    } else if (step === 'source') {
      updateCondition(id, {
        source: value,
        element: undefined,
        elementType: undefined,
        operator: undefined,
        value: undefined,
      });
      setOpenedPicker({ id, step: 'element' });
    } else if (step === 'element') {
      updateCondition(id, {
        element: value,
        elementType: extras?.elementType,
        operator: undefined,
        value: undefined,
      });
      setOpenedPicker({ id, step: 'operator' });
    } else if (step === 'operator') {
      updateCondition(id, { operator: value });
      setOpenedPicker(null);
    }
    setSearchTerm('');
  };

  const startFirstCondition = () => {
    setHasStartedBuilding(true);
  };

  const hasAnyComplete = expression.conditions.some(isConditionComplete);

  // Collect distinct (element + type) pairs the query references — these are
  // the runtime inputs the admin needs to provide for a preview run.
  const runtimeInputDefs = useMemo<RuntimeInputDef[]>(
    () => collectRuntimeInputs(expression),
    [expression]
  );

  /**
   * Validates the mandatory test inputs — User ID and Year. Each empty
   * (or whitespace-only) field surfaces its own IEM 165 inline (BR 1.8).
   */
  const validateTestInputs = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (testUserId.trim().length === 0) {
      errors.push({ code: 'IEM165', scope: 'testInput', inputKey: 'userId' });
    }
    if (testYear.trim().length === 0) {
      errors.push({ code: 'IEM165', scope: 'testInput', inputKey: 'year' });
    }
    return errors;
  };

  /**
   * BR 1.1 — Entry point for Validate.
   *
   * Runs ONLY structural validation (BR 1.2–1.5). The Test Input + audit
   * trail belong to the Save step, so this just confirms that the rules
   * are well-formed. On success the status flips to `valid`, the
   * "Query is Valid" banner appears, and the Test Input section becomes
   * visible so the admin can supply the User ID and save.
   */
  const handleValidateAndExecute = () => {
    setExecutionError(null);

    const structuralErrors = validateExpression(expression);
    if (structuralErrors.length > 0) {
      setValidationErrors(structuralErrors);
      setValidationStatus('invalid');
      setInquiryResult(null);
      return;
    }

    if (!displayedAnswers.length) {
      setValidationErrors([]);
      setValidationStatus('invalid');
      setInquiryResult({ success: false, message: t('autoReply.inquiry.noAnswers') });
      return;
    }

    // BR 3.1 — passed structural validation. Test Input + execution happen
    // on Save; see `handleSave`.
    setValidationErrors([]);
    setValidationStatus('valid');
    setInquiryResult(null);
  };


  /**
   * Save = the actual write. Gates on:
   *   1. Validation status is `valid` (Validate was clicked + structure OK).
   *   2. Test Input (User ID) is filled — surfaces as IEM 165 inline.
   * On success: BR 1.9 audit trail entry, then `onSave` and close.
   */
  const handleSave = () => {
    if (!question) return;

    // Auto-reply turned off — nothing query-related to validate; just save.
    if (!isAutomationActive) {
      onSave?.(expression, '');
      onOpenChange(false);
      return;
    }

    // Block until Validate has been clicked and the rules pass structure.
    if (validationStatus !== 'valid') {
      setInquiryResult({ success: false, message: t('autoReply.save.needsQuery') });
      return;
    }

    // BR 1.8 — Test Input (User ID) must be supplied before saving.
    const inputErrors = validateTestInputs();
    if (inputErrors.length > 0) {
      setValidationErrors(inputErrors);
      return;
    }
    setValidationErrors([]);

    // BR 1.9 — record the audit trail entry, then hand off to the host.
    recordTestAuditEntry(
      { userId: testUserId.trim(), year: testYear.trim() },
      question.id
    );
    onSave?.(expression, '');
    onOpenChange(false);
  };

  if (!question) return null;

  const expressionHasContent =
    hasStartedBuilding ||
    expression.conditions.length > 1 ||
    !!expression.conditions[0].domain ||
    !!expression.conditions[0].operator;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRTL ? 'left' : 'right'}
        className="sm:max-w-[640px] w-full p-0 grid grid-rows-[auto_1fr_auto] gap-0"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header — eyebrow + title + View/Edit tab strip */}
        <div className="px-6 pt-6 border-b border-border/60">
          <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-1 min-w-0">
              <p
                className={`text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {isRisk ? t('autoReply.eyebrowRisk') : t('autoReply.eyebrow')} · {question.id}
              </p>
              <h2
                className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                style={{
                  fontSize: '22px',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {(() => {
                  if (currentMode === 'view') {
                    return isRisk ? t('autoReply.titleViewRisk') : t('autoReply.titleView');
                  }
                  if (currentMode === 'edit') {
                    return isRisk ? t('autoReply.titleEditRisk') : t('autoReply.titleEdit');
                  }
                  return isRisk ? t('autoReply.titleRisk') : t('autoReply.title');
                })()}
              </h2>
            </div>
          </div>

          {/* View / Edit mode tabs — sit on the header's bottom border so the
              active underline visually merges with it. Larger touch target
              than a segmented control, easier to scan. */}
          <div
            role="tablist"
            aria-label={t('autoReply.modeAriaLabel')}
            className={`flex items-center gap-1 mt-5 -mb-px ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}
          >
            {(['view', 'edit'] as const).map((modeKey) => {
              const selected = currentMode === modeKey;
              const IconComp = modeKey === 'view' ? Lock : Pencil;
              return (
                <button
                  key={modeKey}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrentMode(modeKey);
                    if (modeKey === 'edit') onRequestEdit?.();
                  }}
                  className={`group relative inline-flex items-center gap-2 h-11 px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-t-md ${
                    selected
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <IconComp className="w-4 h-4" />
                  {modeKey === 'view'
                    ? t('autoReply.modeView')
                    : t('autoReply.modeEdit')}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-all ${
                      selected ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto">
          <div className="px-6 py-6 space-y-7">
            {/* Question field */}
            <div>
              <SectionEyebrow
                step="01"
                label={isRisk ? t('autoReply.risk') : t('autoReply.question')}
                isRTL={isRTL}
                t={t}
              />
              <div
                className={`rounded-xl border border-border/70 bg-muted/30 px-4 py-3 text-foreground leading-snug ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {question.title}
              </div>
            </div>

            {/* Predefined Answers (Step 02 — sub-questions appear inline as
                branches inside each answer card, per the design) */}
            <div>
              {/* Header — rely on parent `dir` for visual order; no manual
                  flex-row-reverse hack so Arabic puts eyebrow on the right
                  and the toggle on the left automatically. */}
              <div className="flex items-end justify-between mb-3">
                <SectionEyebrow
                  step="02"
                  label={isRisk ? t('autoReply.predefinedScoresRange') : t('autoReply.predefinedAnswers')}
                  isRTL={isRTL}
                  noMargin
                  t={t}
                />
                <label
                  className="flex items-center gap-3 cursor-pointer select-none"
                  dir="ltr"
                >
                  <span
                    className="text-foreground font-medium"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {t('autoReply.activateDeactivate')}
                  </span>
                  <Switch
                    checked={isAutomationActive}
                    onCheckedChange={setIsAutomationActive}
                    disabled={isReadOnly}
                    className="!h-6 !w-11 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40 [&>[data-slot=switch-thumb]]:!size-5 [&>[data-slot=switch-thumb]]:!bg-white [&>[data-slot=switch-thumb]]:shadow-sm [&[data-state=checked]>[data-slot=switch-thumb]]:translate-x-[22px] [&[data-state=unchecked]>[data-slot=switch-thumb]]:translate-x-0.5"
                  />
                </label>
              </div>

              {/* Predefined Answers tree */}
              <div className="space-y-3">
                {displayedAnswers.map((answer) => (
                  <AnswerNode
                    key={answer.id}
                    answer={answer}
                    depth={0}
                    isRTL={isRTL}
                  />
                ))}
              </div>
            </div>

            {/* Auto Query Settings — grid-rows reveal */}
            <div
              className={`grid transition-all ease-[cubic-bezier(0.16,1,0.3,1)] duration-500 ${
                isAutomationActive
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden min-h-0">
                <div>
                  <div className="flex items-end justify-between mb-3 gap-3">
                    <SectionEyebrow
                      step="03"
                      label={t('autoReply.autoQuerySettings')}
                      required
                      isRTL={isRTL}
                      noMargin
                      t={t}
                    />
                    <div className="flex items-center gap-3">
                      <QueryStatusBadge
                        status={validationStatus}
                        t={t}
                        isRTL={isRTL}
                      />
                      <InstructionsPopover isRTL={isRTL} t={t} />
                    </div>
                  </div>

                  {/* Canvas */}
                  <div
                    className="relative rounded-2xl bg-gradient-to-b from-muted/40 to-muted/10 ring-1 ring-border/60 ring-inset shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    {/* dot grid */}
                    <div
                      className="absolute inset-0 opacity-[0.35] pointer-events-none"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    <div className="relative p-4 min-h-[160px]">
                      {!expressionHasContent ? (
                        <EmptyEditor
                          onStart={startFirstCondition}
                          t={t}
                          isRTL={isRTL}
                        />
                      ) : (
                        <ExpressionEditor
                          expression={expression}
                          openedPicker={openedPicker}
                          setOpenedPicker={setOpenedPicker}
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          removeCondition={removeCondition}
                          addCondition={addCondition}
                          toggleConnector={toggleConnector}
                          updateCondition={updateCondition}
                          pickValue={pickValue}
                          isRTL={isRTL}
                          t={t}
                          isReadOnly={isReadOnly}
                          answers={displayedAnswers}
                          errors={validationErrors}
                        />
                      )}
                    </div>

                    {/* BR 1.1 — Validate & Execute (footer inside canvas) */}
                    {!isReadOnly && (
                      <div
                        className={`relative flex items-center justify-end gap-2 px-4 py-3 border-t border-border/60 bg-white/60 backdrop-blur-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <button
                          type="button"
                          onClick={handleValidateAndExecute}
                          disabled={!hasAnyComplete}
                          className={`inline-flex items-center gap-2 h-10 px-5 rounded-lg font-medium bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_12px_rgba(22,101,52,0.2)] hover:-translate-y-px active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {t('autoReply.validate.execute')}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Expression-scoped validation errors (paren issues) */}
                  {validationErrors.some((e) => e.scope === 'expression') && (
                    <ul
                      className={`mt-3 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      aria-live="polite"
                    >
                      {validationErrors
                        .filter((e) => e.scope === 'expression')
                        .map((err, idx) => (
                          <li
                            key={`${err.code}-${idx}`}
                            className={`flex items-start gap-1.5 text-destructive ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                            style={{ fontSize: '12px' }}
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              <span className="font-mono font-semibold mr-1.5">
                                {err.code}
                              </span>
                              {t(`autoReply.iem.${err.code}`)}
                            </span>
                          </li>
                        ))}
                    </ul>
                  )}

                  {/* BR 5.1 — Execution failure banner (BNM 0) */}
                  {executionError && (
                    <div
                      role="alert"
                      className="mt-3 rounded-xl border border-destructive/40 bg-destructive/[0.06] px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-200"
                    >
                      <div
                        className={`flex items-start gap-2.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <p
                            className="text-destructive uppercase font-semibold"
                            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
                          >
                            <span className="font-mono mr-1.5">BNM 0</span>
                            {t('autoReply.exec.failedHeader')}
                          </p>
                          <p
                            className="text-foreground mt-0.5"
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            {executionError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/*
                    Success cluster — order matters per the latest design:
                      1. "Query is Valid" banner sits directly under the canvas
                      2. Query Preview field shows the readable form of the query
                      3. Test Input (User ID *) is the last gate before Save
                    The block is only mounted when structural validation passes.
                  */}
                  {validationStatus === 'valid' && (
                    <div ref={inquiryRef} className="mt-4 space-y-4">
                      <QueryResultBanner
                        result={{ success: true, message: t('autoReply.queryValid.body') }}
                        title={t('autoReply.queryValid.title')}
                        t={t}
                        isRTL={isRTL}
                      />
                      <QueryPreviewField question={question.title} t={t} isRTL={isRTL} />
                      <TestInputsSection
                        userId={testUserId}
                        year={testYear}
                        onChangeUserId={setTestUserId}
                        onChangeYear={setTestYear}
                        errors={validationErrors}
                        isReadOnly={!!isReadOnly}
                        isRTL={isRTL}
                        t={t}
                      />
                    </div>
                  )}

                  {inquiryResult && validationStatus !== 'valid' && (
                    <div ref={inquiryRef} className="mt-4">
                      <QueryResultBanner result={inquiryResult} t={t} isRTL={isRTL} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <p
            className="text-muted-foreground"
            style={{ fontSize: '11px' }}
          >
            {isReadOnly ? t('autoReply.footerHintView') : t('autoReply.footerHint')}
          </p>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            {isReadOnly ? (
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-9 px-5 font-medium"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {t('autoReply.close')}
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="h-9 px-4 font-medium"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {t('autoReply.cancel')}
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={
                    isAutomationActive &&
                    (validationStatus !== 'valid' ||
                      testUserId.trim().length === 0 ||
                      testYear.trim().length === 0)
                  }
                  className="h-9 px-5 font-medium"
                  style={{ fontSize: 'var(--text-sm)' }}
                  title={
                    isAutomationActive && validationStatus !== 'valid'
                      ? t('autoReply.save.needsQuery')
                      : undefined
                  }
                >
                  {t('autoReply.save')}
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>

      {/*
        RuntimeInputDialog is intentionally not mounted in preview mode —
        the design calls for an inline result banner instead of a popup.
        The component remains in the file for the real-integration path.
      */}
    </Sheet>
  );
}

// ── Answer Node (recursive tree) ──────────────────────────────────────────────

interface AnswerNodeProps {
  answer: AutoReplyAnswer;
  depth: number;
  isRTL: boolean;
}

function AnswerNode({ answer, depth, isRTL }: AnswerNodeProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(depth === 0);
  const hasBranch = !!answer.subQuestion && answer.subQuestion.answers.length > 0;

  // Top-level rows are the light grey "card" surface from the Figma design.
  // Nested rows sit inside that card as white pills with a hairline border.
  const isTopLevel = depth === 0;
  const surfaceClass = isTopLevel
    ? 'rounded-xl bg-[#f9f9f9] overflow-hidden'
    : 'rounded-xl bg-white border border-[#eee] overflow-hidden';
  const rowPaddingY = isTopLevel ? 'py-3' : 'py-2';
  const titleSize = isTopLevel ? '16px' : '14px';

  const RowTag = hasBranch ? 'button' : 'div';

  return (
    <div className={surfaceClass}>
      <RowTag
        type={hasBranch ? 'button' : undefined}
        onClick={hasBranch ? () => setIsExpanded((v) => !v) : undefined}
        className={`w-full flex items-center gap-3 px-4 ${rowPaddingY} ${
          hasBranch ? 'cursor-pointer hover:bg-black/[0.02] active:bg-black/[0.04]' : 'cursor-default'
        } ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
      >
        {/* Weight pill — sits at the leading edge in either direction */}
        <span
          className="inline-flex items-center justify-center px-2.5 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium tabular-nums shrink-0"
          style={{ fontSize: '12px', fontWeight: 500 }}
        >
          {answer.weight}%
        </span>

        {/* Text + #id stacked, aligned to start of the row */}
        <div
          className={`flex-1 min-w-0 flex flex-col gap-0.5 ${
            isRTL ? 'items-end' : 'items-start'
          }`}
        >
          <span
            className="text-foreground leading-tight truncate max-w-full"
            style={{ fontSize: titleSize, fontWeight: 500 }}
          >
            {answer.text}
          </span>
          <span className="text-[#64748b] leading-none" style={{ fontSize: '12px' }}>
            #{answer.id}
          </span>
        </div>

        {/* Trailing chevron only when this answer has a nested sub-question */}
        {hasBranch && (
          <ChevronDown
            className={`w-5 h-5 text-[#384250] shrink-0 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        )}
      </RowTag>

      {/* Nested branch — sub-question label + child answers */}
      {hasBranch && answer.subQuestion && (
        <div
          className={`grid transition-all ease-[cubic-bezier(0.16,1,0.3,1)] duration-300 ${
            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className={`px-4 pb-4 space-y-2.5 ${isRTL ? 'text-right' : 'text-left'}`}>
              {/* Sub-question label as a soft green pill */}
              <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <span
                  className="inline-flex items-center px-2.5 h-6 rounded-full bg-[rgba(27,131,84,0.09)] text-[#085d3a] font-medium"
                  style={{ fontSize: '13px' }}
                >
                  {answer.subQuestion.title}
                </span>
              </div>

              {/* Recursive children */}
              <div className="space-y-2">
                {answer.subQuestion.answers.map((child) => (
                  <AnswerNode key={child.id} answer={child} depth={depth + 1} isRTL={isRTL} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Query Status Badge (BR 3.1) ───────────────────────────────────────────────

function QueryStatusBadge({
  status,
  t,
  isRTL,
}: {
  status: ValidationStatus;
  t: (key: string) => string;
  isRTL: boolean;
}) {
  const variant = (() => {
    if (status === 'valid') {
      return {
        ring: 'ring-emerald-200/70',
        bg: 'bg-emerald-50/70',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
      };
    }
    if (status === 'invalid') {
      return {
        ring: 'ring-destructive/40',
        bg: 'bg-destructive/5',
        text: 'text-destructive',
        dot: 'bg-destructive',
      };
    }
    return {
      ring: 'ring-border',
      bg: 'bg-muted/50',
      text: 'text-muted-foreground',
      dot: 'bg-muted-foreground/60',
    };
  })();

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full ring-1 ring-inset ${variant.ring} ${variant.bg} ${variant.text} ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}
      role="status"
      aria-label={`${t('autoReply.status.label')}: ${t(`autoReply.status.${status}`)}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${variant.dot}`} aria-hidden="true" />
      <span className="uppercase" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
        {t('autoReply.status.label')}
      </span>
      <span className="font-mono">{t(`autoReply.status.${status}`)}</span>
    </span>
  );
}

// ── Instructions Popover ──────────────────────────────────────────────────────

/**
 * Anchored guide that explains how to build a query and which operators are
 * available per data type. Pure content surface — does not interact with the
 * expression state.
 */
function InstructionsPopover({
  isRTL,
  t,
}: {
  isRTL: boolean;
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);

  const categories: Array<{
    id: 'comparison' | 'text' | 'range' | 'nullEmpty';
    tone: 'primary' | 'amber' | 'blue' | 'rose';
    symbols: string[];
  }> = [
    {
      id: 'comparison',
      tone: 'primary',
      symbols: ['=', '≠', '>', '<', '≥', '≤'],
    },
    {
      id: 'text',
      tone: 'blue',
      symbols: ['CONTAINS', 'NOT CONTAINS', 'STARTS WITH', 'ENDS WITH'],
    },
    {
      id: 'range',
      tone: 'amber',
      symbols: ['BETWEEN', 'NOT BETWEEN'],
    },
    {
      id: 'nullEmpty',
      tone: 'rose',
      symbols: ['IS NULL', 'IS NOT NULL', 'IS EMPTY', 'NOT EMPTY'],
    },
  ];

  const toneClasses: Record<typeof categories[number]['tone'], string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
          aria-label={t('autoReply.instructions.title')}
        >
          <Info className="w-3.5 h-3.5" />
          {t('autoReply.instructions.button')}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={isRTL ? 'start' : 'end'}
        sideOffset={8}
        className="w-[400px] max-h-[520px] overflow-y-auto p-0 rounded-xl border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] bg-white"
      >
        {/* Header */}
        <div
          className={`px-4 py-3 border-b border-border/60 bg-muted/40 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <p
            className="text-muted-foreground uppercase font-semibold"
            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
          >
            {t('autoReply.instructions.eyebrow')}
          </p>
          <h3
            className="text-foreground mt-0.5"
            style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.005em' }}
          >
            {t('autoReply.instructions.title')}
          </h3>
          <p
            className="text-muted-foreground mt-1 leading-snug"
            style={{ fontSize: '11px' }}
          >
            {t('autoReply.instructions.subtitle')}
          </p>
        </div>

        {/* How to build — numbered steps */}
        <div className={`px-4 py-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p
            className="text-muted-foreground uppercase font-semibold mb-2"
            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
          >
            {t('autoReply.instructions.howToHeader')}
          </p>
          <ol className="space-y-2">
            {['step1', 'step2', 'step3', 'step4'].map((stepKey, idx) => (
              <li
                key={stepKey}
                className={`flex items-start gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground font-mono"
                  style={{ fontSize: '10px', fontWeight: 700 }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span
                  className="text-foreground leading-snug"
                  style={{ fontSize: '12px' }}
                >
                  {t(`autoReply.instructions.${stepKey}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Operator categories */}
        <div className={`px-4 py-3 border-t border-border/60 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p
            className="text-muted-foreground uppercase font-semibold mb-2"
            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
          >
            {t('autoReply.instructions.operatorsHeader')}
          </p>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id}>
                <div
                  className={`flex items-baseline gap-2 mb-1.5 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}
                >
                  <p
                    className="text-foreground font-semibold"
                    style={{ fontSize: '12px' }}
                  >
                    {t(`autoReply.editor.opCategory.${cat.id}`)}
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: '11px' }}
                  >
                    {t(`autoReply.instructions.cat.${cat.id}.note`)}
                  </p>
                </div>
                <div
                  className={`flex flex-wrap gap-1 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}
                >
                  {cat.symbols.map((s) => (
                    <span
                      key={s}
                      className={`inline-flex items-center px-2 h-6 rounded-md border font-mono ${toneClasses[cat.tone]}`}
                      style={{ fontSize: '11px', fontWeight: 600 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p
                  className="text-muted-foreground mt-1.5 italic"
                  style={{ fontSize: '11px', lineHeight: 1.4 }}
                >
                  {t(`autoReply.instructions.cat.${cat.id}.example`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className={`px-4 py-3 border-t border-border/60 bg-muted/30 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p
            className="text-muted-foreground uppercase font-semibold mb-2"
            style={{ fontSize: '10px', letterSpacing: '0.1em' }}
          >
            {t('autoReply.instructions.tipsHeader')}
          </p>
          <ul className="space-y-1.5">
            {[
              { key: 'tipMultipleIfs', icon: '+' },
              { key: 'tipParens', icon: '( )' },
              { key: 'tipValidate', icon: '✓' },
            ].map(({ key, icon }) => (
              <li
                key={key}
                className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-md bg-primary/10 text-primary font-mono"
                  style={{ fontSize: '10px', fontWeight: 700 }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span
                  className="text-foreground leading-snug"
                  style={{ fontSize: '11px' }}
                >
                  {t(`autoReply.instructions.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ── Section Eyebrow ───────────────────────────────────────────────────────────

function SectionEyebrow({
  step,
  label,
  required,
  isRTL,
  noMargin,
  t,
}: {
  step: string;
  label: string;
  required?: boolean;
  isRTL: boolean;
  noMargin?: boolean;
  t?: (key: string) => string;
}) {
  const stepWord = t ? t('autoReply.step') : 'Step';
  return (
    <div className={`${noMargin ? '' : 'mb-2.5'} ${isRTL ? 'text-right' : 'text-left'}`}>
      <p
        className="uppercase text-muted-foreground font-medium"
        style={{ fontSize: '10px', letterSpacing: '0.12em' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {`${stepWord} ${step}`}
      </p>
      <h3
        className="text-foreground mt-0.5"
        style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.005em' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {label}
        {required && <span className="text-destructive ms-1">*</span>}
      </h3>
    </div>
  );
}

// ── Empty Editor ──────────────────────────────────────────────────────────────

function EmptyEditor({
  onStart,
  t,
  isRTL,
}: {
  onStart: () => void;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  return (
    <button
      onClick={onStart}
      className={`group w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-white/80 transition-all duration-200 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <kbd
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-border font-mono text-sm text-muted-foreground shadow-[0_1px_0_rgba(0,0,0,0.04)] group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200"
      >
        /
      </kbd>
      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p
          className="text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {t('autoReply.editor.emptyTitle')}
        </p>
        <p
          className="text-muted-foreground mt-0.5"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {t('autoReply.editor.emptyHint')}
        </p>
      </div>
    </button>
  );
}

// ── Query Result Banner (Figma 8:3354) ────────────────────────────────────────

/**
 * Inline result banner that replaces the popup in B09.U24 preview mode.
 * Light-green pill for matched answers, soft-red for failure. Sits directly
 * below the query builder canvas.
 */
function QueryResultBanner({
  result,
  title,
  t,
  isRTL,
}: {
  result: InquiryResult;
  /** Optional title override — defaults to the localized "Query Result" label. */
  title?: string;
  t: (key: string) => string;
  isRTL: boolean;
}) {
  const success = result.success;
  const heading = title ?? t('autoReply.queryResult.title');
  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-2xl px-5 py-4 ${
        success
          ? 'bg-[#ecfdf3] ring-1 ring-emerald-200/60 ring-inset'
          : 'bg-rose-50 ring-1 ring-rose-200/60 ring-inset'
      }`}
    >
      <div className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
        <p
          className={`${success ? 'text-primary' : 'text-rose-700'}`}
          style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.25 }}
        >
          {heading}
        </p>
        <p
          className="text-foreground mt-1"
          style={{ fontSize: 'var(--text-base)', fontWeight: 500, lineHeight: 1.45 }}
        >
          {success ? (result.answer ?? result.message) : result.message}
        </p>
        {success && result.elapsedMs != null && (
          <p
            className={`text-muted-foreground mt-2 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ fontSize: 'var(--text-xs)' }}
          >
            <Clock className="w-3 h-3" />
            {t('autoReply.resolvedIn').replace('{ms}', String(result.elapsedMs))}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Read-only "Query Preview" field that shows the human-readable form of the
 * executed query. For Question Automation this is just the question title.
 */
function QueryPreviewField({
  question,
  t,
  isRTL,
}: {
  question: string;
  t: (key: string) => string;
  isRTL: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${isRTL ? 'items-end' : 'items-start'}`}>
      <label
        className="text-foreground"
        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
      >
        {t('autoReply.queryPreview.label')}
      </label>
      <div
        className={`w-full rounded-md bg-muted/60 px-4 h-10 inline-flex items-center ${isRTL ? 'justify-end text-right' : 'justify-start text-left'}`}
      >
        <p
          className="text-muted-foreground truncate"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {question}
        </p>
      </div>
    </div>
  );
}

// ── Inquiry Result ────────────────────────────────────────────────────────────

function InquiryResultPanel({
  result,
  t,
  isRTL,
}: {
  result: InquiryResult;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  if (result.success) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-white to-white p-5 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100/20 to-transparent pointer-events-none" />
        <div className={`relative flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="relative shrink-0 mt-0.5">
            <span
              className="absolute inset-0 rounded-full bg-emerald-500/25"
              style={{
                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1',
              }}
            />
            <div className="relative w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p
              className="uppercase text-emerald-700 font-semibold"
              style={{ fontSize: '10px', letterSpacing: '0.12em' }}
            >
              {t('autoReply.inquiryResultMatched')}
            </p>
            <p
              className="text-foreground mt-1 leading-snug"
              style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
            >
              {result.answer}
            </p>
            {result.elapsedMs != null && (
              <p
                className={`text-muted-foreground mt-2 flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                style={{ fontSize: 'var(--text-xs)' }}
              >
                <Clock className="w-3 h-3" />
                {t('autoReply.resolvedIn').replace('{ms}', String(result.elapsedMs))}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-white to-white p-5 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p
            className="uppercase text-rose-700 font-semibold"
            style={{ fontSize: '10px', letterSpacing: '0.12em' }}
          >
            {t('autoReply.inquiryResult')}
          </p>
          <p
            className="text-foreground mt-1"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {result.message}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Expression Editor ─────────────────────────────────────────────────────────

interface ExpressionEditorProps {
  expression: Expression;
  openedPicker: { id: string; step: PickerStep } | null;
  setOpenedPicker: (v: { id: string; step: PickerStep } | null) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  removeCondition: (id: string) => void;
  addCondition: (connector: 'AND' | 'OR') => void;
  toggleConnector: (index: number) => void;
  updateCondition: (id: string, patch: Partial<Condition>) => void;
  pickValue: (step: PickerStep, value: string, extras?: Partial<Condition>) => void;
  isRTL: boolean;
  t: (key: string) => string;
  isReadOnly?: boolean;
  /** Predefined Answers the THEN dropdown selects from. */
  answers: AutoReplyAnswer[];
  /**
   * Active validation errors. The editor highlights the conditions referenced
   * by `conditionId` and shows the matching IEM message under them. Expression
   * scoped errors (paren issues) are rendered by the parent below the canvas.
   */
  errors?: ValidationError[];
}

function ExpressionEditor(props: ExpressionEditorProps) {
  const { expression, addCondition, isRTL, t, isReadOnly, errors } = props;
  return (
    // Each If is a self-contained rule — no AND/OR connector between rules.
    // Stack them as independent cards; at runtime the first IF whose condition
    // matches wins, and its THEN answer is returned.
    <div className="flex flex-col gap-3">
      {expression.conditions.map((condition) => {
        const rowErrors = (errors ?? []).filter(
          (e) => e.scope === 'condition' && e.conditionId === condition.id
        );
        return (
          <ConditionBlock
            key={condition.id}
            {...props}
            condition={condition}
            t={t}
            rowErrors={rowErrors}
          />
        );
      })}
      {!isReadOnly && (
        <div
          className={`flex items-center gap-2 pt-2 flex-wrap ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <Button
            variant="outline"
            size="sm"
            // `AND` is now an inert placeholder for the legacy API — the connector
            // array is unused at render time; preserved so old expressions load.
            onClick={() => addCondition('AND')}
            className={`h-8 px-3 flex items-center gap-1.5 bg-white/80 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            title={t('autoReply.editor.addAnotherIfTitle')}
          >
            <Plus className="w-3.5 h-3.5" />
            {t('autoReply.editor.addAnotherIf')}
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Connector (typographic) ───────────────────────────────────────────────────

function Connector({
  connector,
  onToggle,
  isRTL,
}: {
  connector: 'AND' | 'OR';
  onToggle: () => void;
  isRTL: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 my-0.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-px h-4 bg-border ${isRTL ? 'mr-4' : 'ml-4'}`} />
      <button
        type="button"
        onClick={onToggle}
        className="uppercase font-mono font-semibold text-muted-foreground hover:text-foreground px-2 py-0.5 rounded hover:bg-muted transition-colors"
        style={{ fontSize: '10px', letterSpacing: '0.15em' }}
      >
        {connector}
      </button>
      <div className="flex-1 h-px bg-border/60" />
    </div>
  );
}

// ── Condition Clause Row (read-only AND sub-clause inside a rule card) ───────

interface ConditionClauseRowProps {
  clause: ConditionClause;
  isRTL: boolean;
  t: (key: string) => string;
}

/**
 * Renders one AND-joined sub-clause beneath the primary clause inside a
 * rule card. Visual parity with the primary pills row but read-only —
 * the picker isn't extended to edit clauses in this iteration. Layout:
 *   `AND  <domain>  /  <source>  /  <element>  <op>  <value>`
 */
function ConditionClauseRow({ clause, isRTL, t }: ConditionClauseRowProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <span
        className="uppercase font-mono font-semibold text-muted-foreground px-2 py-0.5 rounded bg-muted/60"
        style={{ fontSize: '10px', letterSpacing: '0.15em' }}
      >
        {t('autoReply.editor.and')}
      </span>
      <Pill label={clause.domain ?? ''} placeholder="—" isSet onClick={() => {}} />
      <Separator />
      <Pill label={clause.source ?? ''} placeholder="—" isSet onClick={() => {}} />
      <Separator />
      <Pill label={clause.element ?? ''} placeholder="—" isSet onClick={() => {}} />
      {clause.operator && (
        <Pill
          label={clause.operator}
          placeholder="—"
          isSet
          variant="operator"
          onClick={() => {}}
        />
      )}
      {valueRequiresInput(clause.operator) && clause.value && (
        <Pill
          label={
            isRangeOperator(clause.operator) && clause.value2
              ? `${clause.value} – ${clause.value2}`
              : clause.value
          }
          placeholder="—"
          isSet
          onClick={() => {}}
        />
      )}
    </div>
  );
}

// ── Condition Block ───────────────────────────────────────────────────────────

interface ConditionBlockProps extends ExpressionEditorProps {
  condition: Condition;
  rowErrors?: ValidationError[];
}

function ConditionBlock({
  condition,
  openedPicker,
  setOpenedPicker,
  searchTerm,
  setSearchTerm,
  removeCondition,
  updateCondition,
  pickValue,
  isRTL,
  t,
  isReadOnly,
  rowErrors,
  answers,
}: ConditionBlockProps) {
  const activeStep =
    !isReadOnly && openedPicker?.id === condition.id ? openedPicker.step : null;

  const handleOpen = (step: PickerStep) => {
    setOpenedPicker({ id: condition.id, step });
    setSearchTerm('');
  };

  const handleClose = (step: PickerStep) => {
    setOpenedPicker((prev) =>
      prev?.id === condition.id && prev.step === step ? null : prev
    );
  };

  const hasError = !!rowErrors && rowErrors.length > 0;
  const isElseRule = !!condition.isElse;
  return (
    // Self-contained IF (or catch-all ELSE) rule card. No connectors between
    // rules — each card is independent and carries its own THEN answer.
    <div
      className={`group relative rounded-2xl bg-white/80 ring-1 ring-inset transition-colors ${
        hasError
          ? 'ring-destructive/50 bg-destructive/5'
          : 'ring-border/60 hover:ring-primary/20'
      }`}
      aria-invalid={hasError || undefined}
    >
      {/* IF / ELSE header strip */}
      <div
        className={`flex items-center justify-between px-4 pt-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <span
          className="inline-flex items-center gap-1.5 text-primary font-mono uppercase"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/15"
            aria-hidden="true"
          >
            {isElseRule ? '↳' : '?'}
          </span>
          {isElseRule ? t('autoReply.editor.else') : t('autoReply.editor.if')}
        </span>
        {!isReadOnly && (
          <button
            type="button"
            onClick={() => removeCondition(condition.id)}
            className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-150"
            aria-label={t('autoReply.editor.removeCondition')}
          >
            <CloseIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* IF body — pills row. Suppressed entirely for ELSE rules. */}
      {!isElseRule && (
      <div
        className={`flex flex-wrap items-center gap-1.5 px-4 pb-3 pt-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      >
      {/* Open paren — manual grouping for Scenario 3 */}
      {condition.openParen && (
        <span
          className="text-primary font-mono font-bold select-none"
          style={{ fontSize: '18px', lineHeight: 1 }}
          aria-hidden="true"
        >
          (
        </span>
      )}

      {/* Domain */}
      <SlotPopover
        open={activeStep === 'domain'}
        onOpenChange={(o) => (o ? handleOpen('domain') : handleClose('domain'))}
        trigger={
          <Pill
            label={condition.domain ?? ''}
            placeholder={t('autoReply.editor.pickDomain')}
            isSet={!!condition.domain}
            onClick={() => {}}
          />
        }
      >
        <DomainList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onPick={(d) => pickValue('domain', d)}
          t={t}
          isRTL={isRTL}
        />
      </SlotPopover>

      <Separator />

      {/* Source */}
      <SlotPopover
        open={activeStep === 'source'}
        onOpenChange={(o) => {
          if (!condition.domain) return;
          o ? handleOpen('source') : handleClose('source');
        }}
        trigger={
          <Pill
            label={condition.source ?? ''}
            placeholder={t('autoReply.editor.pickSource')}
            isSet={!!condition.source}
            disabled={!condition.domain}
            onClick={() => {}}
          />
        }
      >
        <SourceList
          domain={condition.domain}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onPick={(s) => pickValue('source', s)}
          t={t}
          isRTL={isRTL}
        />
      </SlotPopover>

      <Separator />

      {/* Element */}
      <SlotPopover
        open={activeStep === 'element'}
        onOpenChange={(o) => {
          if (!condition.source) return;
          o ? handleOpen('element') : handleClose('element');
        }}
        trigger={
          <Pill
            label={condition.element ?? ''}
            placeholder={t('autoReply.editor.pickElement')}
            isSet={!!condition.element}
            disabled={!condition.source}
            onClick={() => {}}
          />
        }
      >
        <ElementList
          domain={condition.domain}
          source={condition.source}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onPick={(name, type) => pickValue('element', name, { elementType: type })}
          t={t}
          isRTL={isRTL}
        />
      </SlotPopover>

      {/* Operator */}
      {condition.element && (
        <SlotPopover
          open={activeStep === 'operator'}
          onOpenChange={(o) => (o ? handleOpen('operator') : handleClose('operator'))}
          width="w-72"
          trigger={
            <Pill
              label={condition.operator ?? ''}
              placeholder={t('autoReply.editor.pickOperator')}
              isSet={!!condition.operator}
              variant="operator"
              onClick={() => {}}
            />
          }
        >
          <OperatorList
            type={condition.elementType}
            onPick={(op) => pickValue('operator', op)}
            t={t}
            isRTL={isRTL}
          />
        </SlotPopover>
      )}

      {/* Value (type-aware per BR 1.3) */}
      {condition.operator && valueRequiresInput(condition.operator) && (
        <ValueInput
          condition={condition}
          isRTL={isRTL}
          isReadOnly={!!isReadOnly}
          t={t}
          onChange={(patch) => updateCondition(condition.id, patch)}
        />
      )}

      {/* Close paren — manual grouping for Scenario 3 */}
      {condition.closeParen && (
        <span
          className="text-primary font-mono font-bold select-none"
          style={{ fontSize: '18px', lineHeight: 1 }}
          aria-hidden="true"
        >
          )
        </span>
      )}

      {/* Inline paren toggles — visible only when relevant in single-rule layouts */}
      {!isReadOnly && (
        <span
          className={`inline-flex items-center gap-0.5 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
        >
          <button
            type="button"
            onClick={() =>
              updateCondition(condition.id, { openParen: !condition.openParen })
            }
            aria-pressed={!!condition.openParen}
            aria-label={t('autoReply.editor.toggleOpenParen')}
            title={t('autoReply.editor.toggleOpenParen')}
            className={`h-7 w-7 inline-flex items-center justify-center rounded-md font-mono font-semibold transition-all duration-150 ${
              condition.openParen
                ? 'text-primary bg-primary/10 hover:bg-primary/15 opacity-100'
                : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground'
            }`}
            style={{ fontSize: '14px' }}
          >
            (
          </button>
          <button
            type="button"
            onClick={() =>
              updateCondition(condition.id, { closeParen: !condition.closeParen })
            }
            aria-pressed={!!condition.closeParen}
            aria-label={t('autoReply.editor.toggleCloseParen')}
            title={t('autoReply.editor.toggleCloseParen')}
            className={`h-7 w-7 inline-flex items-center justify-center rounded-md font-mono font-semibold transition-all duration-150 ${
              condition.closeParen
                ? 'text-primary bg-primary/10 hover:bg-primary/15 opacity-100'
                : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground'
            }`}
            style={{ fontSize: '14px' }}
          >
            )
          </button>
        </span>
      )}
      </div>
      )}

      {/* Inline AND-joined sub-clauses — rendered read-only beneath the
          primary pills row. Each clause renders the same picker labels
          ({domain · source · element · operator · value}) prefixed with
          an `AND` chip. Editing/adding clauses inside the dialog is out of
          scope for this iteration — clauses arrive via preloaded data. */}
      {!isElseRule && condition.andClauses && condition.andClauses.length > 0 && (
        <div
          className={`flex flex-col gap-1.5 px-4 pb-3 -mt-1 ${isRTL ? 'items-end' : 'items-start'}`}
        >
          {condition.andClauses.map((clause, idx) => (
            <ConditionClauseRow
              key={idx}
              clause={clause}
              isRTL={isRTL}
              t={t}
            />
          ))}
        </div>
      )}

      {/* THEN section — answer the rule resolves to when its IF matches */}
      <ThenSection
        condition={condition}
        answers={answers}
        isRTL={isRTL}
        isReadOnly={!!isReadOnly}
        onChange={(answerId) => updateCondition(condition.id, { answerId })}
        t={t}
      />

      {/* BR 2.1 / 2.2 — inline IEM messages for this condition */}
      {hasError && (
        <ul
          className={`pb-3 px-4 space-y-0.5 ${isRTL ? 'text-right' : 'text-left'}`}
          aria-live="polite"
        >
          {rowErrors!.map((err, idx) => (
            <li
              key={`${err.code}-${idx}`}
              className={`text-destructive flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row'}`}
              style={{ fontSize: '11px' }}
            >
              <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
              <span>
                <span className="font-mono font-semibold mr-1.5">{err.code}</span>
                {t(`autoReply.iem.${err.code}`)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Separator() {
  return (
    <span
      className="text-muted-foreground/40 font-mono select-none"
      style={{ fontSize: '12px' }}
    >
      /
    </span>
  );
}

// ── THEN Section — answer mapping for an IF rule ──────────────────────────────

interface ThenSectionProps {
  condition: Condition;
  answers: AutoReplyAnswer[];
  isRTL: boolean;
  isReadOnly: boolean;
  onChange: (answerId: string) => void;
  t: (key: string) => string;
}

/**
 * THEN renders below the IF row inside the same rule card. The admin maps
 * the matching IF to one of the predefined answers — that answer is what
 * the auto-reply system returns when this rule wins at runtime.
 */
function ThenSection({
  condition,
  answers,
  isRTL,
  isReadOnly,
  onChange,
  t,
}: ThenSectionProps) {
  const selected = answers.find((a) => a.id === condition.answerId);
  return (
    <div
      className={`border-t border-border/60 bg-muted/20 px-4 py-3 rounded-b-2xl flex flex-col gap-2 ${isRTL ? 'text-right items-end' : 'text-left items-start'}`}
    >
      <span
        className="inline-flex items-center gap-1.5 text-primary font-mono uppercase"
        style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
      >
        <span
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/15"
          aria-hidden="true"
        >
          ➜
        </span>
        {t('autoReply.editor.then')}
      </span>

      <div className="relative w-full">
        <select
          value={condition.answerId ?? ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={isReadOnly || answers.length === 0}
          aria-label={t('autoReply.editor.thenSelectAria')}
          className={`w-full h-10 bg-white border border-border rounded-lg pr-9 pl-3 text-foreground appearance-none transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-muted/40 disabled:cursor-not-allowed ${
            condition.answerId ? '' : 'text-muted-foreground'
          } ${isRTL ? 'text-right pl-3 pr-9' : 'text-left pl-3 pr-9'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <option value="" disabled>
            {answers.length === 0
              ? t('autoReply.editor.thenNoAnswers')
              : t('autoReply.editor.thenPlaceholder')}
          </option>
          {answers.map((a) => (
            <option key={a.id} value={a.id}>
              {a.text}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}
        />
        {selected && (
          <span
            className="inline-flex items-center px-2 h-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono tabular-nums mt-1.5"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            {selected.weight}%
          </span>
        )}
      </div>
    </div>
  );
}

// ── Value Input (type-aware per BR 1.3) ───────────────────────────────────────

interface ValueInputProps {
  condition: Condition;
  isRTL: boolean;
  isReadOnly: boolean;
  onChange: (patch: Partial<Condition>) => void;
  t: (key: string) => string;
}

function ValueInput({ condition, isRTL, isReadOnly, onChange, t }: ValueInputProps) {
  const type = condition.elementType ?? 'String';
  const isRange = isRangeOperator(condition.operator);

  // Shared classnames so every variant feels like one family.
  const baseClass = `h-8 px-2.5 rounded-lg border border-border bg-white text-foreground font-mono tabular-nums outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-150 read-only:bg-muted/40 read-only:cursor-default disabled:bg-muted/40 disabled:cursor-not-allowed ${isRTL ? 'text-right' : 'text-left'}`;

  // Boolean → dropdown answers the original question: it should be a dropdown,
  // not a free-form input — the operator only accepts true/false.
  if (type === 'Boolean') {
    return (
      <select
        value={condition.value ?? ''}
        onChange={(e) => onChange({ value: e.target.value })}
        disabled={isReadOnly}
        aria-label={`${condition.element ?? 'value'} — ${condition.operator ?? ''}`}
        className={`${baseClass} w-28 pr-7 appearance-none cursor-pointer`}
        style={{ fontSize: '13px' }}
      >
        <option value="" disabled>
          {t('autoReply.editor.pickValue')}
        </option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    );
  }

  // Single-input number / date / text.
  if (!isRange) {
    const htmlType = type === 'Number' ? 'number' : type === 'Date' ? 'date' : 'text';
    return (
      <input
        type={htmlType}
        value={condition.value ?? ''}
        onChange={(e) => onChange({ value: e.target.value })}
        placeholder={t('autoReply.editor.enterValue')}
        readOnly={isReadOnly}
        aria-label={`${condition.element ?? 'value'} — ${condition.operator ?? ''}`}
        className={`${baseClass} ${type === 'Date' ? 'w-40' : 'w-24'}`}
        style={{ fontSize: '13px' }}
      />
    );
  }

  // Range — two inputs joined by "and". Number / Date supported; falls back to text.
  const rangeHtmlType = type === 'Number' ? 'number' : type === 'Date' ? 'date' : 'text';
  return (
    <span className={`inline-flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      <input
        type={rangeHtmlType}
        value={condition.value ?? ''}
        onChange={(e) => onChange({ value: e.target.value })}
        placeholder={t('autoReply.editor.rangeFrom')}
        readOnly={isReadOnly}
        aria-label={`${condition.element ?? 'value'} — ${condition.operator ?? ''} (lower bound)`}
        className={`${baseClass} ${type === 'Date' ? 'w-36' : 'w-20'}`}
        style={{ fontSize: '13px' }}
      />
      <span
        className="text-muted-foreground uppercase font-mono"
        style={{ fontSize: '10px', letterSpacing: '0.15em' }}
      >
        {t('autoReply.editor.rangeAnd')}
      </span>
      <input
        type={rangeHtmlType}
        value={condition.value2 ?? ''}
        onChange={(e) => onChange({ value2: e.target.value })}
        placeholder={t('autoReply.editor.rangeTo')}
        readOnly={isReadOnly}
        aria-label={`${condition.element ?? 'value'} — ${condition.operator ?? ''} (upper bound)`}
        className={`${baseClass} ${type === 'Date' ? 'w-36' : 'w-20'}`}
        style={{ fontSize: '13px' }}
      />
    </span>
  );
}

// ── Test Inputs Section (BR 1.x — Test Endpoints) ─────────────────────────────

interface TestInputsSectionProps {
  userId: string;
  year: string;
  onChangeUserId: (next: string) => void;
  onChangeYear: (next: string) => void;
  errors: ValidationError[];
  isReadOnly: boolean;
  isRTL: boolean;
  t: (key: string) => string;
}

/**
 * Two mandatory test inputs supplied before Save:
 *   - User ID — the identity the query is tested under
 *   - Year — the temporal scope for the query
 * Each empty field surfaces its own IEM 165 inline (BR 1.8); both
 * values are written to the audit trail (BR 1.9).
 */
function TestInputsSection({
  userId,
  year,
  onChangeUserId,
  onChangeYear,
  errors,
  isReadOnly,
  isRTL,
  t,
}: TestInputsSectionProps) {
  const errUser = errors.find(
    (e) => e.scope === 'testInput' && e.inputKey === 'userId'
  );
  const errYear = errors.find(
    (e) => e.scope === 'testInput' && e.inputKey === 'year'
  );

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between mb-3">
        <SectionEyebrow
          step="04"
          label={t('autoReply.testInputs.label')}
          required
          isRTL={isRTL}
          noMargin
          t={t}
        />
        <span
          className="text-muted-foreground"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {t('autoReply.testInputs.subtitle')}
        </span>
      </div>

      <div
        className={`rounded-xl border border-border/70 bg-white/70 p-3 grid grid-cols-1 md:grid-cols-2 gap-3 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <TestInputField
          id="test-input-user-id"
          label={t('autoReply.testInputs.userIdLabel')}
          requiredLabel={t('autoReply.testInputs.required')}
          placeholder={t('autoReply.testInputs.userIdPlaceholder')}
          value={userId}
          onChange={onChangeUserId}
          error={errUser}
          readOnly={isReadOnly}
          isRTL={isRTL}
          t={t}
        />
        <TestInputField
          id="test-input-year"
          label={t('autoReply.testInputs.yearLabel')}
          requiredLabel={t('autoReply.testInputs.required')}
          placeholder={t('autoReply.testInputs.yearPlaceholder')}
          value={year}
          onChange={onChangeYear}
          error={errYear}
          readOnly={isReadOnly}
          inputMode="numeric"
          isRTL={isRTL}
          t={t}
        />
      </div>
    </div>
  );
}

interface TestInputFieldProps {
  id: string;
  label: string;
  requiredLabel: string;
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
  error?: ValidationError;
  readOnly?: boolean;
  inputMode?: 'numeric' | 'text';
  isRTL: boolean;
  t: (key: string) => string;
}

function TestInputField({
  id,
  label,
  requiredLabel,
  placeholder,
  value,
  onChange,
  error,
  readOnly,
  inputMode,
  isRTL,
  t,
}: TestInputFieldProps) {
  return (
    <div>
      <div
        className={`flex items-baseline gap-2 mb-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <label
          htmlFor={id}
          className="text-foreground font-mono"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {label}
        </label>
        <span
          className="text-destructive font-mono"
          style={{ fontSize: '10px', fontWeight: 600 }}
          aria-hidden="true"
        >
          {requiredLabel}
        </span>
      </div>

      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        aria-invalid={!!error}
        autoComplete="off"
        className={`w-full h-10 px-3 rounded-lg bg-white text-foreground border outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150 ${
          error
            ? 'border-destructive focus:border-destructive'
            : 'border-border focus:border-primary/60'
        } ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ fontSize: '14px' }}
      />

      {error && (
        <p
          className={`mt-1.5 text-destructive flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: '11px' }}
          aria-live="polite"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            <span className="font-mono font-semibold mr-1.5">{error.code}</span>
            {t(`autoReply.iem.${error.code}`)}
          </span>
        </p>
      )}
    </div>
  );
}

// ── Slot Popover wrapper ──────────────────────────────────────────────────────

function SlotPopover({
  open,
  onOpenChange,
  trigger,
  children,
  width = 'w-60',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  /** Tailwind width utility for the popover content (e.g. `w-60`, `w-72`). */
  width?: string;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className={`p-0 ${width} max-h-80 overflow-hidden flex flex-col rounded-lg border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)] bg-white`}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

// ── Lists ─────────────────────────────────────────────────────────────────────

function ListHeader({ title, isRTL }: { title: string; isRTL: boolean }) {
  return (
    <div className="px-3 py-2 border-b border-border/60 bg-muted/40">
      <div
        className={`text-muted-foreground uppercase font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ fontSize: '10px', letterSpacing: '0.1em' }}
      >
        {title}
      </div>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
  isRTL,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  isRTL: boolean;
}) {
  return (
    <div className="px-2 pt-2 pb-1.5">
      <div className="relative">
        <Search
          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none ${isRTL ? 'right-2.5' : 'left-2.5'}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-8 bg-muted/50 border border-transparent rounded-md outline-none focus:bg-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-foreground transition-all ${isRTL ? 'pr-8 pl-2 text-right' : 'pl-8 pr-2 text-left'}`}
          style={{ fontSize: 'var(--text-xs)' }}
          autoFocus
        />
      </div>
    </div>
  );
}

function ListRow({
  children,
  onClick,
  isRTL,
  trailing,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isRTL: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-1.5 text-foreground hover:bg-primary/5 flex items-center justify-between transition-colors rounded-md mx-1 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
      style={{ fontSize: '13px', width: 'calc(100% - 8px)' }}
    >
      <span>{children}</span>
      {trailing}
    </button>
  );
}

function DomainList({
  searchTerm,
  setSearchTerm,
  onPick,
  t,
  isRTL,
}: {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onPick: (d: string) => void;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  const filtered = catalog.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <ListHeader title={t('autoReply.editor.chooseWorkField')} isRTL={isRTL} />
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t('autoReply.editor.search')}
        isRTL={isRTL}
      />
      <div className="overflow-y-auto">
        {filtered.map((d) => (
          <ListRow
            key={d.name}
            onClick={() => onPick(d.name)}
            isRTL={isRTL}
            trailing={
              <ChevronRight
                className={`w-3.5 h-3.5 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`}
              />
            }
          >
            {d.name}
          </ListRow>
        ))}
      </div>
    </>
  );
}

function SourceList({
  domain,
  searchTerm,
  setSearchTerm,
  onPick,
  t,
  isRTL,
}: {
  domain?: string;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onPick: (s: string) => void;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  const systems =
    catalog
      .find((d) => d.name === domain)
      ?.systems.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];
  return (
    <>
      <ListHeader title={t('autoReply.editor.chooseSystem')} isRTL={isRTL} />
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t('autoReply.editor.search')}
        isRTL={isRTL}
      />
      <div className="overflow-y-auto">
        {systems.map((s) => (
          <ListRow
            key={s.name}
            onClick={() => onPick(s.name)}
            isRTL={isRTL}
            trailing={
              <ChevronRight
                className={`w-3.5 h-3.5 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`}
              />
            }
          >
            {s.name}
          </ListRow>
        ))}
      </div>
    </>
  );
}

function ElementList({
  domain,
  source,
  searchTerm,
  setSearchTerm,
  onPick,
  t,
  isRTL,
}: {
  domain?: string;
  source?: string;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onPick: (name: string, type: ElementDataType) => void;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  const elements =
    catalog
      .find((d) => d.name === domain)
      ?.systems.find((s) => s.name === source)
      ?.elements.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? [];
  return (
    <>
      <ListHeader title={t('autoReply.editor.chooseDescription')} isRTL={isRTL} />
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t('autoReply.editor.search')}
        isRTL={isRTL}
      />
      <div className="overflow-y-auto">
        {elements.map((e) => (
          <ListRow
            key={e.name}
            onClick={() => onPick(e.name, e.type)}
            isRTL={isRTL}
            trailing={
              <Badge
                variant="outline"
                className="text-muted-foreground font-mono"
                style={{ fontSize: '10px' }}
              >
                {e.type}
              </Badge>
            }
          >
            <span className="font-mono" style={{ fontSize: '13px' }}>
              {e.name}
            </span>
          </ListRow>
        ))}
      </div>
    </>
  );
}

function OperatorList({
  type,
  onPick,
  t,
  isRTL,
}: {
  type?: ElementDataType;
  onPick: (op: string) => void;
  t: (k: string) => string;
  isRTL: boolean;
}) {
  const ops = operatorsForType(type);

  // Group operators by category while preserving operator order inside each group.
  const grouped = ops.reduce<Record<OperatorCategory, OperatorOption[]>>(
    (acc, op) => {
      const bucket = acc[op.category] ?? [];
      bucket.push(op);
      acc[op.category] = bucket;
      return acc;
    },
    {} as Record<OperatorCategory, OperatorOption[]>
  );

  return (
    <>
      <ListHeader title={t('autoReply.editor.chooseOperator')} isRTL={isRTL} />
      <div className="overflow-y-auto py-2">
        {OPERATOR_CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          // Symbol-only categories (comparison) tile tighter; word categories breathe.
          const isCompactCategory = cat === 'comparison';
          return (
            <div key={cat} className="px-2 pb-2 last:pb-1">
              <div
                className={`px-1 pb-1 text-muted-foreground uppercase font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: '10px', letterSpacing: '0.1em' }}
              >
                {t(`autoReply.editor.opCategory.${cat}`)}
              </div>
              <div
                className={`grid gap-1 ${isCompactCategory ? 'grid-cols-3' : 'grid-cols-2'}`}
              >
                {items.map((op) => (
                  <button
                    key={op.symbol}
                    type="button"
                    onClick={() => onPick(op.symbol)}
                    className="px-2 py-1.5 rounded-md border border-border hover:bg-muted hover:border-primary/30 text-foreground transition-colors font-mono truncate"
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                    title={op.symbol}
                  >
                    {op.symbol}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Runtime Input Dialog (BR 1.x / BR 2.x) ────────────────────────────────────

interface RuntimeInputDialogProps {
  open: boolean;
  onClose: () => void;
  inputs: RuntimeInputDef[];
  onSubmit: (values: Record<string, string>) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

interface FieldState {
  value: string;
  error: string | null;
}

function htmlInputTypeFor(t: ElementDataType): string {
  if (t === 'Number') return 'number';
  if (t === 'Date') return 'date';
  return 'text';
}

function validateField(value: string, type: ElementDataType): string | null {
  // BR 2.1 — required
  if (value === '' || value === undefined) return 'errorRequired';
  // BR 2.2 — type validation
  if (type === 'Number' && !Number.isFinite(Number(value))) return 'errorType';
  if (type === 'Date' && !Number.isFinite(Date.parse(value))) return 'errorType';
  if (type === 'Boolean' && value !== 'true' && value !== 'false') return 'errorType';
  return null;
}

function RuntimeInputDialog({
  open,
  onClose,
  inputs,
  onSubmit,
  t,
  isRTL,
}: RuntimeInputDialogProps) {
  const [fields, setFields] = useState<Record<string, FieldState>>({});

  // Reset field state whenever the dialog opens or the input set changes.
  useEffect(() => {
    if (!open) return;
    const next: Record<string, FieldState> = {};
    inputs.forEach((i) => {
      next[i.key] = { value: '', error: null };
    });
    setFields(next);
  }, [open, inputs]);

  if (!open) return null;

  const setFieldValue = (key: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: { value, error: null },
    }));
  };

  const handleSubmit = () => {
    // BR 2.3 — block submission until everything passes both checks
    const validated: Record<string, FieldState> = {};
    let anyError = false;
    inputs.forEach((i) => {
      const current = fields[i.key]?.value ?? '';
      const err = validateField(current, i.type);
      validated[i.key] = { value: current, error: err };
      if (err) anyError = true;
    });
    setFields(validated);
    if (anyError) return;

    // BR 2.4 — proceed
    const values: Record<string, string> = {};
    inputs.forEach((i) => {
      values[i.key] = validated[i.key].value;
    });
    onSubmit(values);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('autoReply.runtime.title')}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <button
        type="button"
        aria-label={t('autoReply.runtime.cancel')}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px] animate-in fade-in duration-150"
      />

      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-card rounded-2xl border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`flex items-start gap-3 px-6 pt-6 pb-4 border-b border-border/60 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Variable className="w-5 h-5" />
          </div>
          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3
              className="text-foreground"
              style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.005em' }}
            >
              {t('autoReply.runtime.title')}
            </h3>
            <p
              className="text-muted-foreground mt-1 leading-snug"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              {t('autoReply.runtime.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('autoReply.runtime.cancel')}
            className="shrink-0 w-8 h-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors inline-flex items-center justify-center"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Body — dynamically generated fields per BR 1.3 */}
        <div className="overflow-y-auto px-6 py-5">
          {inputs.length === 0 ? (
            <p
              className={`text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {t('autoReply.runtime.noElements')}
            </p>
          ) : (
            <div className="space-y-4">
              {inputs.map((def) => {
                const state = fields[def.key] ?? { value: '', error: null };
                const hasError = !!state.error;
                return (
                  <div key={def.key}>
                    {/* BR 1.4 — clear label per field */}
                    <div
                      className={`flex items-baseline gap-2 mb-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <label
                        htmlFor={`runtime-${def.key}`}
                        className="text-foreground font-mono"
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                      >
                        {def.element}
                      </label>
                      <span
                        className="text-muted-foreground uppercase font-mono"
                        style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                      >
                        {def.type}
                      </span>
                      <span
                        className="text-destructive font-mono"
                        style={{ fontSize: '10px', fontWeight: 600 }}
                        aria-hidden="true"
                      >
                        {t('autoReply.runtime.required')}
                      </span>
                      <span
                        className={`text-muted-foreground/70 truncate ${isRTL ? 'mr-auto text-left' : 'ml-auto text-right'}`}
                        style={{ fontSize: '11px' }}
                      >
                        {def.domain} · {def.source}
                      </span>
                    </div>

                    {def.type === 'Boolean' ? (
                      <select
                        id={`runtime-${def.key}`}
                        value={state.value}
                        onChange={(e) => setFieldValue(def.key, e.target.value)}
                        aria-invalid={hasError}
                        className={`w-full h-10 px-3 rounded-lg bg-white text-foreground border outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150 font-mono ${
                          hasError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary/60'
                        } ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: '14px' }}
                      >
                        <option value="" disabled>
                          {t('autoReply.editor.pickValue')}
                        </option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input
                        id={`runtime-${def.key}`}
                        type={htmlInputTypeFor(def.type)}
                        value={state.value}
                        onChange={(e) => setFieldValue(def.key, e.target.value)}
                        placeholder={t('autoReply.editor.enterValue')}
                        aria-invalid={hasError}
                        className={`w-full h-10 px-3 rounded-lg bg-white text-foreground border outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150 font-mono ${
                          hasError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary/60'
                        } ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: '14px' }}
                      />
                    )}

                    {hasError && (
                      <p
                        className={`mt-1.5 text-destructive flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                        style={{ fontSize: '11px' }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {t(`autoReply.runtime.${state.error}`)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-2 px-6 py-4 border-t border-border/60 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <Button
            variant="ghost"
            onClick={onClose}
            className="h-9 px-4 font-medium"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {t('autoReply.runtime.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={inputs.length === 0}
            className={`h-9 px-5 font-medium inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('autoReply.runtime.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
}
