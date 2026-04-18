import { useEffect, useState, forwardRef, useRef } from 'react';
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
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

// ── Types ──────────────────────────────────────────────────────────────────────

interface SubQuestion {
  id: string;
  title: string;
}

export interface AutoReplyQuestion {
  id: string;
  title: string;
  subQuestions?: SubQuestion[];
  answers: { id: string; text: string; weight: number }[];
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

interface Condition {
  id: string;
  domain?: string;
  source?: string;
  element?: string;
  elementType?: ElementDataType;
  operator?: string;
  value?: string;
}

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
          { name: 'beneficiaries_count', type: 'Number' },
          { name: 'services_count', type: 'Number' },
          { name: 'sector', type: 'String' },
        ],
      },
    ],
  },
];

function operatorsForType(type?: ElementDataType): string[] {
  if (!type) return [];
  if (type === 'String')
    return ['=', '\u2260', 'CONTAINS', 'STARTS WITH', 'ENDS WITH', 'IS NULL', 'IS NOT NULL'];
  if (type === 'Number' || type === 'Date')
    return ['=', '\u2260', '>', '<', '\u2265', '\u2264', 'BETWEEN', 'NOT BETWEEN'];
  if (type === 'Boolean') return ['=', '\u2260'];
  return ['=', '\u2260'];
}

function valueRequiresInput(operator?: string): boolean {
  if (!operator) return true;
  return !['IS NULL', 'IS NOT NULL', 'IS EMPTY', 'NOT EMPTY'].includes(operator);
}

function isConditionComplete(c: Condition): boolean {
  if (!c.domain || !c.source || !c.element || !c.operator) return false;
  if (valueRequiresInput(c.operator) && !c.value) return false;
  return true;
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
  const isReadOnly = mode === 'view';
  const isRisk = context === 'risk';

  const [activeSubQuestionId, setActiveSubQuestionId] = useState<string>('main');
  const [isAutomationActive, setIsAutomationActive] = useState<boolean>(false);
  const [hasStartedBuilding, setHasStartedBuilding] = useState<boolean>(false);
  const [expression, setExpression] = useState<Expression>({
    conditions: [emptyCondition()],
    connectors: [],
  });
  const [openedPicker, setOpenedPicker] = useState<{ id: string; step: PickerStep } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inquiryResult, setInquiryResult] = useState<InquiryResult | null>(null);
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
      setActiveSubQuestionId('main');
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
    }
  }, [open, question, preloaded]);

  const displayedAnswers = question?.answers ?? [];

  const updateCondition = (id: string, patch: Partial<Condition>) => {
    setExpression((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
    setInquiryResult(null);
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
  };

  const addCondition = (connector: 'AND' | 'OR') => {
    setExpression((prev) => ({
      conditions: [...prev.conditions, emptyCondition()],
      connectors: [...prev.connectors, connector],
    }));
    setInquiryResult(null);
  };

  const toggleConnector = (index: number) => {
    setExpression((prev) => ({
      ...prev,
      connectors: prev.connectors.map((c, i) => (i === index ? (c === 'AND' ? 'OR' : 'AND') : c)),
    }));
    setInquiryResult(null);
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
  const allComplete = expression.conditions.every(isConditionComplete);

  const checkInquiry = () => {
    if (!allComplete) {
      setInquiryResult({ success: false, message: t('autoReply.inquiry.incomplete') });
      return;
    }
    if (!displayedAnswers.length) {
      setInquiryResult({ success: false, message: t('autoReply.inquiry.noAnswers') });
      return;
    }
    const resolved = displayedAnswers[0];
    setInquiryResult({ success: true, answer: resolved.text, elapsedMs: 248 });
  };

  const handleSave = () => {
    if (!question) return;
    if (isAutomationActive && !hasAnyComplete) {
      setInquiryResult({ success: false, message: t('autoReply.save.needsQuery') });
      return;
    }
    onSave?.(expression, inquiryResult?.answer ?? '');
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
        {/* Header — eyebrow + title */}
        <div className="px-6 pt-6 pb-5 border-b border-border/60">
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
                  if (mode === 'view') {
                    return isRisk ? t('autoReply.titleViewRisk') : t('autoReply.titleView');
                  }
                  if (mode === 'edit') {
                    return isRisk ? t('autoReply.titleEditRisk') : t('autoReply.titleEdit');
                  }
                  return isRisk ? t('autoReply.titleRisk') : t('autoReply.title');
                })()}
              </h2>
            </div>
            {isReadOnly && (
              <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span
                  className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-muted border border-border text-muted-foreground uppercase"
                  style={{ fontSize: '10px', letterSpacing: '0.1em', fontWeight: 600 }}
                >
                  <Lock className="w-3 h-3" />
                  {t('autoReply.readOnly')}
                </span>
                {onRequestEdit && (
                  <button
                    type="button"
                    onClick={onRequestEdit}
                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.97] ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {t('autoReply.switchToEdit')}
                  </button>
                )}
              </div>
            )}
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
              />
              <div
                className={`rounded-xl border border-border/70 bg-muted/30 px-4 py-3 text-foreground leading-snug ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {question.title}
              </div>
            </div>

            {/* Sub Question */}
            {question.subQuestions && question.subQuestions.length > 0 && (
              <div>
                <SectionEyebrow step="02" label={t('autoReply.subQuestion')} isRTL={isRTL} />
                <div className="relative">
                  <select
                    value={activeSubQuestionId}
                    onChange={(e) => setActiveSubQuestionId(e.target.value)}
                    disabled={isReadOnly}
                    className={`w-full h-11 bg-white border border-border/70 rounded-xl px-4 text-foreground appearance-none transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-muted/30 disabled:cursor-not-allowed ${isRTL ? 'text-right pr-4 pl-10' : 'text-left pl-4 pr-10'}`}
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <option value="main">{t('autoReply.mainQuestion')}</option>
                    {question.subQuestions.map((sq) => (
                      <option key={sq.id} value={sq.id}>
                        {sq.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'left-4' : 'right-4'}`}
                  />
                </div>
              </div>
            )}

            {/* Predefined Answers */}
            <div>
              <div
                className={`flex items-end justify-between mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <SectionEyebrow
                  step="03"
                  label={isRisk ? t('autoReply.predefinedScoresRange') : t('autoReply.predefinedAnswers')}
                  isRTL={isRTL}
                  noMargin
                />
                <label
                  className={`flex items-center gap-3 cursor-pointer select-none ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
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

              {/* Card stack (not a table) */}
              <div className="rounded-xl border border-border/70 divide-y divide-border/60 overflow-hidden bg-white">
                {displayedAnswers.map((answer, i) => (
                  <div
                    key={answer.id}
                    className={`group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/30 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className="w-6 h-6 shrink-0 rounded-md bg-muted text-muted-foreground flex items-center justify-center font-mono"
                      style={{ fontSize: '11px', fontWeight: 600 }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <p
                      className={`flex-1 text-foreground leading-snug ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {answer.text}
                    </p>
                    <span
                      className="inline-flex items-center gap-0.5 px-2.5 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono tabular-nums"
                      style={{ fontSize: '11px', fontWeight: 600 }}
                    >
                      {answer.weight}
                      <span className="text-emerald-500/70">%</span>
                    </span>
                  </div>
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
                  <div
                    className={`flex items-end justify-between mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <SectionEyebrow
                      step="04"
                      label={t('autoReply.autoQuerySettings')}
                      required
                      isRTL={isRTL}
                      noMargin
                    />
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                      style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                    >
                      <Info className="w-3.5 h-3.5" />
                      {t('autoReply.tabForInstructions')}
                    </button>
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
                        />
                      )}
                    </div>

                    {/* Check Inquiry footer inside canvas */}
                    {!isReadOnly && (
                      <div
                        className={`relative flex items-center justify-end gap-2 px-4 py-3 border-t border-border/60 bg-white/60 backdrop-blur-sm ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <button
                          type="button"
                          onClick={checkInquiry}
                          disabled={!hasAnyComplete}
                          className={`inline-flex items-center gap-2 h-10 px-5 rounded-lg font-medium bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_12px_rgba(22,101,52,0.2)] hover:-translate-y-px active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          <Sparkles className="w-4 h-4" />
                          {t('autoReply.checkInquiry')}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Inquiry Result */}
                  {inquiryResult && (
                    <div ref={inquiryRef}>
                      <InquiryResultPanel result={inquiryResult} t={t} isRTL={isRTL} />
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
                  className="h-9 px-5 font-medium"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  {t('autoReply.save')}
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Section Eyebrow ───────────────────────────────────────────────────────────

function SectionEyebrow({
  step,
  label,
  required,
  isRTL,
  noMargin,
}: {
  step: string;
  label: string;
  required?: boolean;
  isRTL: boolean;
  noMargin?: boolean;
}) {
  return (
    <div className={`${noMargin ? '' : 'mb-2.5'} ${isRTL ? 'text-right' : 'text-left'}`}>
      <p
        className="uppercase text-muted-foreground font-medium"
        style={{ fontSize: '10px', letterSpacing: '0.12em' }}
      >
        {`Step ${step}`}
      </p>
      <h3
        className="text-foreground mt-0.5"
        style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.005em' }}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
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
}

function ExpressionEditor(props: ExpressionEditorProps) {
  const { expression, addCondition, isRTL, t, isReadOnly } = props;
  return (
    <div className="flex flex-col gap-1">
      {expression.conditions.map((condition, idx) => (
        <div key={condition.id}>
          {idx > 0 && (
            <Connector
              connector={expression.connectors[idx - 1]}
              onToggle={() => props.toggleConnector(idx - 1)}
              isRTL={isRTL}
            />
          )}
          <ConditionBlock
            {...props}
            condition={condition}
            isFirst={idx === 0}
            t={t}
          />
        </div>
      ))}
      {!isReadOnly && (
        <div className={`flex items-center gap-2 pt-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addCondition('AND')}
            className={`h-7 px-2.5 flex items-center gap-1 bg-white/80 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            <Plus className="w-3 h-3" />
            AND
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addCondition('OR')}
            className={`h-7 px-2.5 flex items-center gap-1 bg-white/80 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            <Plus className="w-3 h-3" />
            OR
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

// ── Condition Block ───────────────────────────────────────────────────────────

interface ConditionBlockProps extends ExpressionEditorProps {
  condition: Condition;
  isFirst: boolean;
}

function ConditionBlock({
  condition,
  isFirst,
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

  return (
    <div
      className={`group relative flex flex-wrap items-center gap-1.5 px-2 py-2 rounded-xl transition-colors hover:bg-white/70 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {isFirst && (
        <span
          className="text-muted-foreground px-1 font-mono italic"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {t('autoReply.editor.if')}
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
          />
        </SlotPopover>
      )}

      {/* Value */}
      {condition.operator && valueRequiresInput(condition.operator) && (
        <input
          type="text"
          value={condition.value ?? ''}
          onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
          placeholder={t('autoReply.editor.enterValue')}
          readOnly={isReadOnly}
          className={`h-8 px-2.5 rounded-lg border border-border bg-white text-foreground w-24 font-mono tabular-nums outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all duration-150 read-only:bg-muted/40 read-only:cursor-default ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '13px' }}
        />
      )}

      {/* Remove (hover-reveal) */}
      {!isReadOnly && (
        <button
          type="button"
          onClick={() => removeCondition(condition.id)}
          className={`h-7 w-7 ${isRTL ? 'mr-auto' : 'ml-auto'} inline-flex items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-150`}
          aria-label={t('autoReply.editor.removeCondition')}
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>
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

// ── Slot Popover wrapper ──────────────────────────────────────────────────────

function SlotPopover({
  open,
  onOpenChange,
  trigger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="p-0 w-60 max-h-72 overflow-hidden flex flex-col rounded-lg border border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)] bg-white"
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
}: {
  type?: ElementDataType;
  onPick: (op: string) => void;
  t: (k: string) => string;
}) {
  const ops = operatorsForType(type);
  return (
    <>
      <ListHeader title={t('autoReply.editor.chooseOperator')} isRTL={false} />
      <div className="p-2 grid grid-cols-3 gap-1">
        {ops.map((op) => (
          <button
            key={op}
            onClick={() => onPick(op)}
            className="px-2 py-1.5 rounded-md border border-border hover:bg-muted hover:border-primary/30 text-foreground transition-colors font-mono"
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            {op}
          </button>
        ))}
      </div>
    </>
  );
}
