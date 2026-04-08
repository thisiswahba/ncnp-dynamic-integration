import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronRight, Plus, Trash2, Play, Save, Database, Zap } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useLanguage } from '@/app/contexts/language-context';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  questionId: string;
  questionText: string;
  answerType: string;
  automationStatus: 'manual' | 'automated' | 'pending';
  businessDomain: string;
  queryId: string | null;
}

interface MetadataElement {
  name: string;
  type: 'String' | 'Number' | 'Date';
}

interface MetadataGroup {
  source: string;
  domain: string;
  elements: MetadataElement[];
}

interface QueryCondition {
  id: string;
  element: string;
  elementType: string;
  operator: string;
  value: string;
  connector: 'AND' | 'OR';
}

type ValidationStatus = 'unvalidated' | 'valid' | 'saved';

// ── Mock Data ──────────────────────────────────────────────────────────────────

const mockQuestions: Question[] = [
  { id: '1', questionId: 'Q-001', questionText: 'Does the organization have a financial audit policy?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Finance', queryId: 'QRY-001' },
  { id: '2', questionId: 'Q-002', questionText: 'Is there a documented risk management framework?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Compliance', queryId: 'QRY-005' },
  { id: '3', questionId: 'Q-003', questionText: 'What is the total number of active employees?', answerType: 'Numeric', automationStatus: 'manual', businessDomain: 'HR', queryId: null },
  { id: '4', questionId: 'Q-004', questionText: 'Does the entity maintain a customer complaints log?', answerType: 'Yes/No', automationStatus: 'manual', businessDomain: 'CRM', queryId: null },
  { id: '5', questionId: 'Q-005', questionText: 'What percentage of revenue is allocated to training?', answerType: 'Percentage', automationStatus: 'pending', businessDomain: 'Finance', queryId: null },
  { id: '6', questionId: 'Q-006', questionText: 'Is the data retention policy compliant with regulations?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Compliance', queryId: 'QRY-003' },
  { id: '7', questionId: 'Q-007', questionText: 'Does the organization conduct annual security audits?', answerType: 'Yes/No', automationStatus: 'manual', businessDomain: 'Operations', queryId: null },
  { id: '8', questionId: 'Q-008', questionText: 'What is the average response time for support tickets?', answerType: 'Numeric', automationStatus: 'manual', businessDomain: 'CRM', queryId: null },
];

const metadataGroups: MetadataGroup[] = [
  {
    source: 'Customer Management API',
    domain: 'CRM',
    elements: [
      { name: 'customer_name', type: 'String' },
      { name: 'account_status', type: 'String' },
      { name: 'total_orders', type: 'Number' },
      { name: 'registration_date', type: 'Date' },
    ],
  },
  {
    source: 'Payment Gateway',
    domain: 'Finance',
    elements: [
      { name: 'transaction_count', type: 'Number' },
      { name: 'total_revenue', type: 'Number' },
      { name: 'last_payment_date', type: 'Date' },
      { name: 'payment_status', type: 'String' },
    ],
  },
  {
    source: 'Inventory System',
    domain: 'Operations',
    elements: [
      { name: 'stock_level', type: 'Number' },
      { name: 'warehouse_location', type: 'String' },
      { name: 'last_audit_date', type: 'Date' },
    ],
  },
];

const comparisonOperators = ['=', '\u2260', '>', '<', '\u2265', '\u2264'];
const textOperators = ['CONTAINS', 'STARTS WITH', 'ENDS WITH'];

function getAllElements(): { label: string; value: string; type: string }[] {
  const elements: { label: string; value: string; type: string }[] = [];
  for (const group of metadataGroups) {
    for (const el of group.elements) {
      elements.push({
        label: `${el.name} (${el.type})`,
        value: `${group.source}.${el.name}`,
        type: el.type,
      });
    }
  }
  return elements;
}

function getOperatorsForType(type: string): string[] {
  if (type === 'String') {
    return [...comparisonOperators.slice(0, 2), ...textOperators];
  }
  if (type === 'Date') {
    return comparisonOperators;
  }
  return comparisonOperators;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ConfigureAutomationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const question = mockQuestions.find((q) => q.id === id);
  const allElements = getAllElements();

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [conditions, setConditions] = useState<QueryCondition[]>([]);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('unvalidated');

  const toggleGroup = (source: string) => {
    setExpandedGroups((prev) => ({ ...prev, [source]: !prev[source] }));
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
    setConditions((prev) => [...prev, newCondition]);
    setValidationStatus('unvalidated');
  };

  const removeCondition = (conditionId: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== conditionId));
    setValidationStatus('unvalidated');
  };

  const updateCondition = (conditionId: string, field: keyof QueryCondition, value: string) => {
    setConditions((prev) =>
      prev.map((c) => {
        if (c.id !== conditionId) return c;
        const updated = { ...c, [field]: value };
        // When element changes, update type and reset operator
        if (field === 'element') {
          const match = allElements.find((el) => el.value === value);
          updated.elementType = match?.type ?? '';
          updated.operator = '';
        }
        return updated;
      })
    );
    setValidationStatus('unvalidated');
  };

  const toggleConnector = (conditionId: string) => {
    setConditions((prev) =>
      prev.map((c) =>
        c.id === conditionId
          ? { ...c, connector: c.connector === 'AND' ? 'OR' : 'AND' }
          : c
      )
    );
    setValidationStatus('unvalidated');
  };

  const handleValidateExecute = () => {
    // Simulate validation
    setValidationStatus('valid');
  };

  const handleSave = () => {
    setValidationStatus('saved');
  };

  const handleCancel = () => {
    navigate('/admin/questions');
  };

  const getValidationBadge = () => {
    switch (validationStatus) {
      case 'unvalidated':
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            {t('configureAutomation.status.unvalidated')}
          </Badge>
        );
      case 'valid':
        return (
          <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
            {t('configureAutomation.status.valid')}
          </Badge>
        );
      case 'saved':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200" style={{ fontSize: 'var(--text-xs)' }}>
            {t('configureAutomation.status.saved')}
          </Badge>
        );
    }
  };

  if (!question) {
    return (
      <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-muted-foreground">{t('questionAutomation.noData')}</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back Button & Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/questions')}
          className={`flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          {t('configureAutomation.back')}
        </button>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <Zap className="w-6 h-6 text-primary" />
          <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {t('configureAutomation.title')}
          </h1>
          {getValidationBadge()}
        </div>
      </div>

      {/* Question Details Card */}
      <div className="bg-white rounded-xl border border-border p-6 shadow-sm mb-6">
        <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
          {t('configureAutomation.questionDetails')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {t('questionAutomation.questionId')}
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {question.questionId}
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {t('questionAutomation.questionText')}
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {question.questionText}
            </p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                {t('questionAutomation.answerType')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {question.answerType}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                {t('questionAutomation.businessDomain')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {question.businessDomain}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Query Builder Section */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {t('configureAutomation.queryBuilder')}
          </h2>
        </div>

        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} min-h-[500px]`}>
          {/* Left Panel — Metadata Elements */}
          <div className={`w-72 shrink-0 bg-muted/50 border-border ${isRTL ? 'border-l' : 'border-r'}`}>
            <div className="p-4 border-b border-border">
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Database className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {t('configureAutomation.metadataElements')}
                </h3>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[450px]">
              {metadataGroups.map((group) => (
                <div key={group.source} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => toggleGroup(group.source)}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-muted/80 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      {expandedGroups[group.source] ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
                      )}
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                        {group.source}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: '10px' }}>
                      {group.domain}
                    </Badge>
                  </button>
                  {expandedGroups[group.source] && (
                    <div className={`pb-2 ${isRTL ? 'pr-8 pl-4' : 'pl-8 pr-4'}`}>
                      {group.elements.map((element) => (
                        <div
                          key={element.name}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer text-foreground ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                          style={{ fontSize: 'var(--text-xs)' }}
                          onClick={() => {
                            // Add a new condition pre-filled with this element
                            const newCondition: QueryCondition = {
                              id: crypto.randomUUID(),
                              element: `${group.source}.${element.name}`,
                              elementType: element.type,
                              operator: '',
                              value: '',
                              connector: 'AND',
                            };
                            setConditions((prev) => [...prev, newCondition]);
                            setValidationStatus('unvalidated');
                          }}
                        >
                          <span className="font-mono text-foreground">{element.name}</span>
                          <span className="text-muted-foreground">({element.type})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel — Query Workspace */}
          <div className="flex-1 p-6">
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {t('configureAutomation.queryWorkspace')}
              </h3>
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

            {/* Conditions */}
            {conditions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {t('configureAutomation.noConditions')}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {conditions.map((condition, index) => (
                  <div key={condition.id}>
                    {/* Connector toggle between conditions */}
                    {index > 0 && (
                      <div className="flex justify-center my-2">
                        <button
                          onClick={() => toggleConnector(condition.id)}
                          className="px-3 py-1 rounded-full text-xs font-semibold border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors"
                        >
                          {condition.connector}
                        </button>
                      </div>
                    )}

                    {/* Condition Card */}
                    <div className="bg-muted/30 rounded-lg border border-border p-4">
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Element Select */}
                        <div className="flex-1">
                          <select
                            value={condition.element}
                            onChange={(e) => updateCondition(condition.id, 'element', e.target.value)}
                            className={`w-full h-9 rounded-md border border-border bg-white px-3 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <option value="">{t('configureAutomation.selectElement')}</option>
                            {allElements.map((el) => (
                              <option key={el.value} value={el.value}>
                                {el.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Operator Select */}
                        <div className="w-40">
                          <select
                            value={condition.operator}
                            onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                            className={`w-full h-9 rounded-md border border-border bg-white px-3 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                            disabled={!condition.element}
                          >
                            <option value="">{t('configureAutomation.selectOperator')}</option>
                            {condition.elementType &&
                              getOperatorsForType(condition.elementType).map((op) => (
                                <option key={op} value={op}>
                                  {op}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* Value Input */}
                        <div className="flex-1">
                          <Input
                            type="text"
                            placeholder={t('configureAutomation.enterValue')}
                            value={condition.value}
                            onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                            className={`h-9 ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                          />
                        </div>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
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
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex items-center gap-3 mt-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <Button
          onClick={handleValidateExecute}
          disabled={conditions.length === 0}
          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Play className="w-4 h-4" />
          {t('configureAutomation.validateExecute')}
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={validationStatus !== 'valid'}
          className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Save className="w-4 h-4" />
          {t('configureAutomation.save')}
        </Button>
        <Button
          variant="ghost"
          onClick={handleCancel}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {t('configureAutomation.cancel')}
        </Button>
      </div>
    </div>
  );
}
