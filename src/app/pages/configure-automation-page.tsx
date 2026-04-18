import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Play,
  Save,
  Zap,
  FileText,
  Sparkles,
  Layers,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';
import { useLanguage } from '@/app/contexts/language-context';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Answer {
  id: string;
  text: string;
  weight: number;
}

interface QuestionNode {
  id: string;
  title: string;
  answerType: 'Yes/No' | 'Numeric' | 'Percentage' | 'Multiple Choice';
  automated: boolean;
  answers: Answer[];
  children?: QuestionNode[];
}

interface MetadataElement {
  name: string;
  type: 'String' | 'Number' | 'Date';
  source: string;
}

interface MetadataGroup {
  source: string;
  domain: string;
  elements: { name: string; type: 'String' | 'Number' | 'Date' }[];
}

interface QueryCondition {
  id: string;
  element: string;
  elementType: string;
  operator: string;
  value: string;
  connector: 'AND' | 'OR';
}

type ValidationStatus = 'unvalidated' | 'valid' | 'invalid' | 'saved';

// ── Mock Data ─────────────────────────────────────────────────────────────────

const mockQuestionTree: Record<string, QuestionNode> = {
  '1': {
    id: '#1001',
    title: 'Is there an increase in the number of services provided?',
    answerType: 'Yes/No',
    automated: false,
    answers: [
      { id: 'a1', text: 'Yes', weight: 10 },
      { id: 'a2', text: 'No', weight: 0 },
    ],
    children: [
      {
        id: '#1001.1',
        title: 'If yes, by how much percentage did services increase?',
        answerType: 'Percentage',
        automated: true,
        answers: [
          { id: 'a3', text: '0 – 25%', weight: 2 },
          { id: 'a4', text: '26 – 50%', weight: 5 },
          { id: 'a5', text: '51 – 75%', weight: 7 },
          { id: 'a6', text: 'More than 75%', weight: 10 },
        ],
      },
      {
        id: '#1001.2',
        title: 'In which sectors did the increase occur?',
        answerType: 'Multiple Choice',
        automated: false,
        answers: [
          { id: 'a7', text: 'Education', weight: 5 },
          { id: 'a8', text: 'Health', weight: 8 },
          { id: 'a9', text: 'Social Services', weight: 3 },
        ],
      },
      {
        id: '#1001.3',
        title: 'What is the total number of additional beneficiaries?',
        answerType: 'Numeric',
        automated: true,
        answers: [
          { id: 'a10', text: 'Less than 100', weight: 1 },
          { id: 'a11', text: '100 – 500', weight: 3 },
          { id: 'a12', text: '501 – 1000', weight: 6 },
          { id: 'a13', text: 'More than 1000', weight: 10 },
        ],
      },
    ],
  },
  '2': {
    id: '#1002',
    title: 'Approximately how many years has the organization been operating?',
    answerType: 'Numeric',
    automated: true,
    answers: [
      { id: 'a14', text: 'Less than 2 years', weight: 1 },
      { id: 'a15', text: '2 – 5 years', weight: 4 },
      { id: 'a16', text: 'More than 5 years', weight: 10 },
    ],
  },
  '3': {
    id: '#1003',
    title: 'Approximately how many years of experience does the management have?',
    answerType: 'Numeric',
    automated: false,
    answers: [
      { id: 'a17', text: 'Less than 3 years', weight: 2 },
      { id: 'a18', text: '3 – 7 years', weight: 5 },
      { id: 'a19', text: 'More than 7 years', weight: 10 },
    ],
  },
  '4': {
    id: '#1004',
    title: 'Approximately how many years of compliance has been maintained?',
    answerType: 'Numeric',
    automated: true,
    answers: [
      { id: 'a20', text: 'Less than 1 year', weight: 0 },
      { id: 'a21', text: '1 – 3 years', weight: 5 },
      { id: 'a22', text: 'More than 3 years', weight: 10 },
    ],
  },
  '5': {
    id: '#1005',
    title: 'Approximately how many years of reporting has been done?',
    answerType: 'Numeric',
    automated: false,
    answers: [
      { id: 'a23', text: 'Less than 1 year', weight: 0 },
      { id: 'a24', text: '1 – 3 years', weight: 5 },
      { id: 'a25', text: 'More than 3 years', weight: 10 },
    ],
  },
};

const metadataGroups: MetadataGroup[] = [
  {
    source: 'Tax Agency',
    domain: 'Finance',
    elements: [
      { name: 'tax_registration_year', type: 'Number' },
      { name: 'total_revenue', type: 'Number' },
      { name: 'last_filing_date', type: 'Date' },
      { name: 'tax_status', type: 'String' },
    ],
  },
  {
    source: 'MFA',
    domain: 'Compliance',
    elements: [
      { name: 'registration_date', type: 'Date' },
      { name: 'compliance_score', type: 'Number' },
      { name: 'license_status', type: 'String' },
    ],
  },
  {
    source: 'NCNP',
    domain: 'Operations',
    elements: [
      { name: 'beneficiaries_count', type: 'Number' },
      { name: 'services_count', type: 'Number' },
      { name: 'sector', type: 'String' },
      { name: 'last_update', type: 'Date' },
    ],
  },
];

const comparisonOperators = ['=', '\u2260', '>', '<', '\u2265', '\u2264'];
const textOperators = ['CONTAINS', 'STARTS WITH', 'ENDS WITH'];

function getAllElements(): MetadataElement[] {
  const elements: MetadataElement[] = [];
  for (const group of metadataGroups) {
    for (const el of group.elements) {
      elements.push({
        name: el.name,
        type: el.type,
        source: group.source,
      });
    }
  }
  return elements;
}

function getOperatorsForType(type: string): string[] {
  if (type === 'String') {
    return [...comparisonOperators.slice(0, 2), ...textOperators];
  }
  return comparisonOperators;
}

function elementValue(element: MetadataElement): string {
  return `${element.source}.${element.name}`;
}

// ── Tree Node Component ───────────────────────────────────────────────────────

interface TreeNodeProps {
  node: QuestionNode;
  depth: number;
  selectedId: string;
  expandedIds: Set<string>;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
  automationEnabled: Record<string, boolean>;
}

function TreeNode({
  node,
  depth,
  selectedId,
  expandedIds,
  onSelect,
  onToggleExpand,
  isRTL,
  t,
  automationEnabled,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isAuto = automationEnabled[node.id];

  return (
    <>
      <button
        onClick={() => onSelect(node.id)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
          isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
        } ${isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground'}`}
        style={{
          [isRTL ? 'paddingRight' : 'paddingLeft']: `${12 + depth * 16}px`,
          fontSize: 'var(--text-sm)',
        }}
      >
        {hasChildren ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            className="flex items-center justify-center w-4 h-4 shrink-0 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            )}
          </span>
        ) : (
          <span className="w-4 h-4 shrink-0" />
        )}
        <FileText
          className={`w-4 h-4 shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}
        />
        <span className="flex-1 truncate" style={{ fontWeight: isSelected ? 600 : 500 }}>
          {node.id}
        </span>
        {isAuto && (
          <span
            title={t('configureAutomation.tree.auto')}
            className="w-2 h-2 rounded-full bg-blue-500 shrink-0"
          />
        )}
      </button>
      {hasChildren && isExpanded && (
        <>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              isRTL={isRTL}
              t={t}
              automationEnabled={automationEnabled}
            />
          ))}
        </>
      )}
    </>
  );
}

// ── Page Component ────────────────────────────────────────────────────────────

export function ConfigureAutomationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const rootQuestion = mockQuestionTree[id ?? '1'] ?? mockQuestionTree['1'];
  const allElements = getAllElements();

  const questionMap = useMemo(() => {
    const map = new Map<string, QuestionNode>();
    const walk = (node: QuestionNode) => {
      map.set(node.id, node);
      node.children?.forEach(walk);
    };
    walk(rootQuestion);
    return map;
  }, [rootQuestion]);

  const [selectedId, setSelectedId] = useState<string>(rootQuestion.id);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([rootQuestion.id]));
  const [automationEnabled, setAutomationEnabled] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    questionMap.forEach((q, qid) => {
      map[qid] = q.automated;
    });
    return map;
  });
  const [conditions, setConditions] = useState<Record<string, QueryCondition[]>>({});
  const [answerMapping, setAnswerMapping] = useState<Record<string, string>>({});
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('unvalidated');

  const selectedQuestion = questionMap.get(selectedId) ?? rootQuestion;
  const selectedConditions = conditions[selectedId] ?? [];
  const isAutomationOn = automationEnabled[selectedId] ?? false;
  const selectedAnswerKey = answerMapping[selectedId] ?? '';

  // ── Handlers ────────────────────────────────────────────────────────────────

  const toggleExpand = (nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  };

  const toggleAutomation = (enabled: boolean) => {
    setAutomationEnabled((prev) => ({ ...prev, [selectedId]: enabled }));
    setValidationStatus('unvalidated');
  };

  const addCondition = () => {
    const newCondition: QueryCondition = {
      id: crypto.randomUUID(),
      element: '',
      elementType: '',
      operator: '',
      value: '',
      connector: 'AND',
    };
    setConditions((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newCondition],
    }));
    setValidationStatus('unvalidated');
  };

  const removeCondition = (conditionId: string) => {
    setConditions((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] ?? []).filter((c) => c.id !== conditionId),
    }));
    setValidationStatus('unvalidated');
  };

  const updateCondition = (conditionId: string, field: keyof QueryCondition, value: string) => {
    setConditions((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] ?? []).map((c) => {
        if (c.id !== conditionId) return c;
        const updated = { ...c, [field]: value };
        if (field === 'element') {
          const match = allElements.find((el) => elementValue(el) === value);
          updated.elementType = match?.type ?? '';
          updated.operator = '';
        }
        return updated;
      }),
    }));
    setValidationStatus('unvalidated');
  };

  const toggleConnector = (conditionId: string) => {
    setConditions((prev) => ({
      ...prev,
      [selectedId]: (prev[selectedId] ?? []).map((c) =>
        c.id === conditionId
          ? { ...c, connector: c.connector === 'AND' ? 'OR' : 'AND' }
          : c
      ),
    }));
    setValidationStatus('unvalidated');
  };

  const handleValidateExecute = () => {
    setValidationStatus('valid');
  };

  const handleSave = () => {
    setValidationStatus('saved');
  };

  const handleCancel = () => {
    navigate('/admin/questions');
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="px-8 py-6 max-w-[1400px] mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/questions')}
          className={`flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          {t('configureAutomation.back')}
        </button>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                {t('configureAutomation.title')}
              </h1>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {rootQuestion.id} · {rootQuestion.title}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Button variant="outline" onClick={handleCancel} style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
              {t('configureAutomation.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
            >
              <Save className="w-4 h-4" />
              {t('configureAutomation.saveAll')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout: Tree + Details */}
      <div className="grid grid-cols-[280px_1fr] gap-6">
        {/* Tree Panel */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden h-fit sticky top-6">
          <div className={`flex items-center gap-2 px-4 py-3 border-b border-border ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {t('configureAutomation.tree.title')}
            </h2>
          </div>
          <div className="p-2 max-h-[700px] overflow-y-auto">
            <TreeNode
              node={rootQuestion}
              depth={0}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={setSelectedId}
              onToggleExpand={toggleExpand}
              isRTL={isRTL}
              t={t}
              automationEnabled={automationEnabled}
            />
          </div>
          {/* Legend */}
          <div className={`px-4 py-3 border-t border-border flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              {t('configureAutomation.tree.autoLegend')}
            </span>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-6">
          {/* Section 1: Question Summary */}
          <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white"
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                >
                  1
                </span>
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  {t('configureAutomation.sections.question')}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {selectedQuestion.id}
                </span>
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {selectedQuestion.answerType}
                </Badge>
                {isAutomationOn && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {t('configureAutomation.status.automated')}
                  </Badge>
                )}
              </div>
              <p className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, lineHeight: 1.4 }}>
                {selectedQuestion.title}
              </p>
            </div>
          </section>

          {/* Section 2: Predefined Answers (READ ONLY) */}
          <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white"
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                  >
                    2
                  </span>
                  <h3 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                    {t('configureAutomation.sections.answers')}
                  </h3>
                </div>
                <div
                  className={`flex items-center gap-1.5 text-muted-foreground ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t('configureAutomation.answers.readOnly')}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div
                className={`flex items-start gap-2 p-3 mb-4 rounded-lg bg-blue-50 border border-blue-100 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-blue-900" style={{ fontSize: 'var(--text-xs)', lineHeight: 1.5 }}>
                  {t('configureAutomation.answers.helper')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedQuestion.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="bg-muted/30 border border-border rounded-lg p-3"
                  >
                    <p
                      className="text-foreground mb-2 truncate"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                      title={answer.text}
                    >
                      {answer.text}
                    </p>
                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <span
                        className="text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.weight')}:
                      </span>
                      <span
                        className="inline-flex items-center justify-center min-w-6 h-5 px-1.5 rounded bg-primary/10 text-primary"
                        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                      >
                        {answer.weight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Auto Query Settings */}
          <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white"
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                  >
                    3
                  </span>
                  <h3 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                    {t('configureAutomation.sections.autoQuery')}
                  </h3>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span
                    className={isAutomationOn ? 'text-primary' : 'text-muted-foreground'}
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {isAutomationOn
                      ? t('configureAutomation.enabled')
                      : t('configureAutomation.disabled')}
                  </span>
                  <Switch checked={isAutomationOn} onCheckedChange={toggleAutomation} />
                </div>
              </div>
            </div>

            {!isAutomationOn ? (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  {t('configureAutomation.automationOff')}
                </p>
                <p
                  className="text-muted-foreground max-w-md mx-auto"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {t('configureAutomation.automationOffHint')}
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                {/* Helper: explain what we are building */}
                <div
                  className={`flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-blue-900" style={{ fontSize: 'var(--text-xs)', lineHeight: 1.5 }}>
                    {t('configureAutomation.autoQuery.helper')}
                  </p>
                </div>

                {/* Query conditions */}
                <div>
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <label className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {t('configureAutomation.autoQuery.whenLabel')}
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCondition}
                      className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <Plus className="w-4 h-4" />
                      {t('configureAutomation.addCondition')}
                    </Button>
                  </div>

                  {selectedConditions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-border rounded-lg">
                      <p className="text-foreground mb-1" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                        {t('configureAutomation.noConditions')}
                      </p>
                      <p
                        className="text-muted-foreground max-w-sm"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.noConditionsHint')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedConditions.map((condition, index) => (
                        <div key={condition.id}>
                          {index > 0 && (
                            <div className="flex justify-center my-1.5">
                              <button
                                onClick={() => toggleConnector(condition.id)}
                                className="px-3 py-1 rounded-full border border-border bg-white hover:bg-muted text-foreground transition-colors"
                                style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                              >
                                {condition.connector}
                              </button>
                            </div>
                          )}
                          <div className="bg-muted/30 rounded-lg border border-border p-3">
                            <div
                              className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                              <div className="flex-1">
                                <select
                                  value={condition.element}
                                  onChange={(e) =>
                                    updateCondition(condition.id, 'element', e.target.value)
                                  }
                                  className={`w-full h-10 rounded-md border border-border bg-white px-3 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                                  style={{ fontSize: 'var(--text-sm)' }}
                                >
                                  <option value="">
                                    {t('configureAutomation.selectElement')}
                                  </option>
                                  {metadataGroups.map((group) => (
                                    <optgroup key={group.source} label={group.source}>
                                      {group.elements.map((el) => (
                                        <option
                                          key={`${group.source}.${el.name}`}
                                          value={`${group.source}.${el.name}`}
                                        >
                                          {el.name} ({el.type})
                                        </option>
                                      ))}
                                    </optgroup>
                                  ))}
                                </select>
                              </div>
                              <div className="w-32">
                                <select
                                  value={condition.operator}
                                  onChange={(e) =>
                                    updateCondition(condition.id, 'operator', e.target.value)
                                  }
                                  className={`w-full h-10 rounded-md border border-border bg-white px-3 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  disabled={!condition.element}
                                >
                                  <option value="">{t('configureAutomation.operator')}</option>
                                  {condition.elementType &&
                                    getOperatorsForType(condition.elementType).map((op) => (
                                      <option key={op} value={op}>
                                        {op}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <div className="flex-1">
                                <Input
                                  type="text"
                                  placeholder={t('configureAutomation.enterValue')}
                                  value={condition.value}
                                  onChange={(e) =>
                                    updateCondition(condition.id, 'value', e.target.value)
                                  }
                                  className={`h-10 bg-white ${isRTL ? 'text-right' : 'text-left'}`}
                                  style={{ fontSize: 'var(--text-sm)' }}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-muted-foreground hover:text-destructive shrink-0"
                                onClick={() => removeCondition(condition.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Answer mapping */}
                <div className={`flex items-center gap-2 py-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <ArrowRight
                    className={`w-4 h-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`}
                  />
                  <label className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('configureAutomation.autoQuery.thenLabel')}
                  </label>
                </div>

                <div className="bg-muted/30 rounded-lg border border-border p-3">
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span
                      className="text-muted-foreground shrink-0"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {t('configureAutomation.autoQuery.answerWith')}:
                    </span>
                    <select
                      value={selectedAnswerKey}
                      onChange={(e) =>
                        setAnswerMapping((prev) => ({
                          ...prev,
                          [selectedId]: e.target.value,
                        }))
                      }
                      className={`flex-1 h-10 rounded-md border border-border bg-white px-3 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <option value="">
                        {t('configureAutomation.autoQuery.selectAnswer')}
                      </option>
                      {selectedQuestion.answers.map((answer) => (
                        <option key={answer.id} value={answer.id}>
                          {answer.text} · {t('configureAutomation.weight')} {answer.weight}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Footer: validate */}
                <div
                  className={`flex items-center justify-between pt-3 border-t border-border ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {t('configureAutomation.queryStatus')}:
                    </span>
                    {validationStatus === 'unvalidated' && (
                      <Badge
                        variant="outline"
                        className="bg-muted text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.status.unvalidated')}
                      </Badge>
                    )}
                    {validationStatus === 'valid' && (
                      <Badge
                        className="bg-green-50 text-green-700 border-green-200"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.status.valid')}
                      </Badge>
                    )}
                    {validationStatus === 'invalid' && (
                      <Badge
                        className="bg-red-50 text-red-700 border-red-200"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.status.invalid')}
                      </Badge>
                    )}
                    {validationStatus === 'saved' && (
                      <Badge
                        className="bg-blue-50 text-blue-700 border-blue-200"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {t('configureAutomation.status.saved')}
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={handleValidateExecute}
                    disabled={selectedConditions.length === 0 || !selectedAnswerKey}
                    className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    <Play className="w-4 h-4" />
                    {t('configureAutomation.validateExecute')}
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
