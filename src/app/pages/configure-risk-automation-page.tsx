import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Play,
  Save,
  Upload,
  ShieldAlert,
  Power,
} from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { useLanguage } from '@/app/contexts/language-context';

// ----- Types -----

interface DefinedRisk {
  id: string;
  riskId: string;
  riskName: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  determination: 'manual' | 'automated';
  automationStatus: 'active' | 'inactive' | null;
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

interface Condition {
  id: string;
  element: string;
  elementType: string;
  operator: string;
  value: string;
  logicalOperator: 'AND' | 'OR';
}

// ----- Mock Data -----

const mockRisks: DefinedRisk[] = [
  { id: '1', riskId: 'RSK-001', riskName: 'Financial Non-Compliance', riskLevel: 'High', determination: 'automated', automationStatus: 'active', businessDomain: 'Finance', queryId: 'QRY-001' },
  { id: '2', riskId: 'RSK-002', riskName: 'Data Privacy Breach', riskLevel: 'Critical', determination: 'automated', automationStatus: 'active', businessDomain: 'Compliance', queryId: 'QRY-002' },
  { id: '3', riskId: 'RSK-003', riskName: 'Operational Downtime', riskLevel: 'Medium', determination: 'manual', automationStatus: null, businessDomain: 'Operations', queryId: null },
  { id: '4', riskId: 'RSK-004', riskName: 'Employee Turnover Risk', riskLevel: 'Low', determination: 'manual', automationStatus: null, businessDomain: 'HR', queryId: null },
  { id: '5', riskId: 'RSK-005', riskName: 'Regulatory Penalty Risk', riskLevel: 'High', determination: 'automated', automationStatus: 'inactive', businessDomain: 'Compliance', queryId: 'QRY-005' },
  { id: '6', riskId: 'RSK-006', riskName: 'Customer Churn Risk', riskLevel: 'Medium', determination: 'automated', automationStatus: 'active', businessDomain: 'CRM', queryId: 'QRY-006' },
  { id: '7', riskId: 'RSK-007', riskName: 'Supply Chain Disruption', riskLevel: 'High', determination: 'manual', automationStatus: null, businessDomain: 'Operations', queryId: null },
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

const operatorsByType: Record<string, { value: string; label: string }[]> = {
  String: [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: 'contains', label: 'Contains' },
  ],
  Number: [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
  ],
  Date: [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: 'After' },
    { value: '<', label: 'Before' },
  ],
};

// ----- Translations -----

const translations = {
  en: {
    backToRisks: 'Back to Risks',
    configureAutomation: 'Configure Risk Automation',
    riskDetails: 'Risk Details',
    riskId: 'Risk ID',
    riskName: 'Risk Name',
    riskLevel: 'Risk Level',
    businessDomain: 'Business Domain',
    determinationMethod: 'Determination Method',
    manualSelection: 'Manual Selection',
    manualDescription: 'Upload an entities file to manually assign entities to this risk.',
    automatedDetermination: 'Automated Determination',
    automatedDescription: 'Build a query to automatically determine affected entities.',
    uploadEntities: 'Upload Entities File',
    uploadHint: 'Drag and drop a CSV or Excel file, or click to browse.',
    browseFiles: 'Browse Files',
    metadataElements: 'Metadata Elements',
    queryWorkspace: 'Query Workspace',
    selectElement: 'Select element',
    selectOperator: 'Select operator',
    enterValue: 'Enter value',
    addCondition: 'Add Condition',
    validateAndExecute: 'Validate & Execute',
    queryValidated: 'Query validated successfully!',
    queryNotValidated: 'Please fill all condition fields before validating.',
    automationActive: 'Automation Active',
    automationInactive: 'Automation Inactive',
    activate: 'Activate',
    deactivate: 'Deactivate',
    save: 'Save',
    cancel: 'Cancel',
    riskNotFound: 'Risk not found',
  },
  ar: {
    backToRisks: 'العودة إلى المخاطر',
    configureAutomation: 'تكوين أتمتة المخاطر',
    riskDetails: 'تفاصيل الخطر',
    riskId: 'معرف الخطر',
    riskName: 'اسم الخطر',
    riskLevel: 'مستوى الخطر',
    businessDomain: 'المجال التجاري',
    determinationMethod: 'طريقة التحديد',
    manualSelection: 'التحديد اليدوي',
    manualDescription: 'قم بتحميل ملف الكيانات لتعيين الكيانات يدويًا لهذا الخطر.',
    automatedDetermination: 'التحديد المؤتمت',
    automatedDescription: 'أنشئ استعلامًا لتحديد الكيانات المتأثرة تلقائيًا.',
    uploadEntities: 'تحميل ملف الكيانات',
    uploadHint: 'اسحب وأفلت ملف CSV أو Excel، أو انقر للتصفح.',
    browseFiles: 'تصفح الملفات',
    metadataElements: 'عناصر البيانات الوصفية',
    queryWorkspace: 'مساحة عمل الاستعلام',
    selectElement: 'اختر عنصرًا',
    selectOperator: 'اختر عامل تشغيل',
    enterValue: 'أدخل القيمة',
    addCondition: 'إضافة شرط',
    validateAndExecute: 'التحقق والتنفيذ',
    queryValidated: 'تم التحقق من الاستعلام بنجاح!',
    queryNotValidated: 'يرجى ملء جميع حقول الشروط قبل التحقق.',
    automationActive: 'الأتمتة نشطة',
    automationInactive: 'الأتمتة غير نشطة',
    activate: 'تفعيل',
    deactivate: 'تعطيل',
    save: 'حفظ',
    cancel: 'إلغاء',
    riskNotFound: 'الخطر غير موجود',
  },
};

// ----- Component -----

export function ConfigureRiskAutomationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const tt = translations[language] || translations.en;

  const risk = mockRisks.find((r) => r.id === id);

  const [method, setMethod] = useState<'manual' | 'automated'>(risk?.determination ?? 'manual');
  const [isActive, setIsActive] = useState(risk?.automationStatus === 'active');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [conditions, setConditions] = useState<Condition[]>([
    { id: '1', element: '', elementType: '', operator: '', value: '', logicalOperator: 'AND' },
  ]);
  const [queryValidated, setQueryValidated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!risk) {
    return (
      <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {tt.riskNotFound}
          </h3>
          <button
            onClick={() => navigate('/admin/risks')}
            className="mt-4 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {tt.backToRisks}
          </button>
        </div>
      </div>
    );
  }

  const riskLevelStyles: Record<string, string> = {
    Critical: 'bg-red-50 text-red-700 border-red-200',
    High: 'bg-orange-50 text-orange-700 border-orange-200',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    Low: 'bg-green-50 text-green-700 border-green-200',
  };

  const toggleGroup = (source: string) => {
    setExpandedGroups((prev) => ({ ...prev, [source]: !prev[source] }));
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { id: Date.now().toString(), element: '', elementType: '', operator: '', value: '', logicalOperator: 'AND' },
    ]);
    setQueryValidated(false);
  };

  const removeCondition = (condId: string) => {
    if (conditions.length > 1) {
      setConditions((prev) => prev.filter((c) => c.id !== condId));
      setQueryValidated(false);
    }
  };

  const updateCondition = (condId: string, field: keyof Condition, value: string) => {
    setConditions((prev) =>
      prev.map((c) => {
        if (c.id !== condId) return c;
        const updated = { ...c, [field]: value };
        // Reset operator + value when element changes
        if (field === 'element') {
          const allElements = metadataGroups.flatMap((g) => g.elements);
          const found = allElements.find((e) => e.name === value);
          updated.elementType = found?.type ?? '';
          updated.operator = '';
          updated.value = '';
        }
        return updated;
      })
    );
    setQueryValidated(false);
  };

  const handleDragElement = (elementName: string) => {
    // Find the first empty condition row and fill it
    const emptyIdx = conditions.findIndex((c) => !c.element);
    if (emptyIdx >= 0) {
      updateCondition(conditions[emptyIdx].id, 'element', elementName);
    } else {
      const allElements = metadataGroups.flatMap((g) => g.elements);
      const found = allElements.find((e) => e.name === elementName);
      const newCond: Condition = {
        id: Date.now().toString(),
        element: elementName,
        elementType: found?.type ?? '',
        operator: '',
        value: '',
        logicalOperator: 'AND',
      };
      setConditions((prev) => [...prev, newCond]);
    }
    setQueryValidated(false);
  };

  const handleValidate = () => {
    const allFilled = conditions.every((c) => c.element && c.operator && c.value);
    if (allFilled) {
      setQueryValidated(true);
      console.log('Query validated:', conditions);
    } else {
      setQueryValidated(false);
      alert(tt.queryNotValidated);
    }
  };

  const handleSave = () => {
    console.log('Save configuration:', {
      riskId: risk.id,
      method,
      isActive,
      conditions: method === 'automated' ? conditions : null,
      uploadedFile: method === 'manual' ? uploadedFile?.name : null,
    });
    navigate('/admin/risks');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const allElements = metadataGroups.flatMap((g) => g.elements);

  const isSaveDisabled = method === 'automated' && !queryValidated;

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back button */}
      <button
        onClick={() => navigate('/admin/risks')}
        className={`flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        {tt.backToRisks}
      </button>

      {/* Page Title */}
      <div className="mb-8">
        <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <ShieldAlert className="w-8 h-8 text-primary" />
          <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {tt.configureAutomation}
          </h1>
        </div>
      </div>

      {/* Risk Details Card */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
        <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
          {tt.riskDetails}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {tt.riskId}
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {risk.riskId}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {tt.riskName}
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {risk.riskName}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {tt.riskLevel}
            </p>
            <Badge className={riskLevelStyles[risk.riskLevel]} style={{ fontSize: 'var(--text-xs)' }}>
              {risk.riskLevel}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}>
              {tt.businessDomain}
            </p>
            <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {risk.businessDomain}
            </p>
          </div>
        </div>
      </div>

      {/* Determination Method Selector */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
        <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
          {tt.determinationMethod}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Manual Option */}
          <button
            onClick={() => { setMethod('manual'); setQueryValidated(false); }}
            className={`p-4 rounded-xl border-2 text-left transition-colors ${
              method === 'manual'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground/30'
            } ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Upload className="w-5 h-5 text-primary" />
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {tt.manualSelection}
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              {tt.manualDescription}
            </p>
          </button>

          {/* Automated Option */}
          <button
            onClick={() => setMethod('automated')}
            className={`p-4 rounded-xl border-2 text-left transition-colors ${
              method === 'automated'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-muted-foreground/30'
            } ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Play className="w-5 h-5 text-primary" />
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {tt.automatedDetermination}
              </span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
              {tt.automatedDescription}
            </p>
          </button>
        </div>
      </div>

      {/* Manual: File Upload */}
      {method === 'manual' && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
          <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {tt.uploadEntities}
          </h2>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-10 cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
          >
            <Upload className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)' }}>
              {tt.uploadHint}
            </p>
            <span className="px-4 py-2 rounded-lg bg-primary text-white" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {tt.browseFiles}
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {uploadedFile && (
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {uploadedFile.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Automated: Query Builder */}
      {method === 'automated' && (
        <>
          {/* Activation Toggle */}
          <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Power className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-muted-foreground'}`} />
                <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isActive ? tt.automationActive : tt.automationInactive}
                </span>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                    isActive
                      ? isRTL ? '-translate-x-6' : 'translate-x-6'
                      : isRTL ? '-translate-x-1' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Query Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Panel: Metadata Elements */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted">
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  {tt.metadataElements}
                </h3>
              </div>
              <div className="p-2 max-h-[500px] overflow-y-auto">
                {metadataGroups.map((group) => (
                  <div key={group.source} className="mb-1">
                    <button
                      onClick={() => toggleGroup(group.source)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                    >
                      {expandedGroups[group.source] ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                      )}
                      <div className="min-w-0">
                        <span className="text-foreground block truncate" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                          {group.source}
                        </span>
                        <span className="text-muted-foreground block" style={{ fontSize: 'var(--text-xs)' }}>
                          {group.domain}
                        </span>
                      </div>
                    </button>
                    {expandedGroups[group.source] && (
                      <div className={`${isRTL ? 'mr-6' : 'ml-6'} mb-2`}>
                        {group.elements.map((el) => (
                          <button
                            key={el.name}
                            onClick={() => handleDragElement(el.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                              {el.name}
                            </span>
                            <Badge variant="outline" className="text-muted-foreground" style={{ fontSize: '10px' }}>
                              {el.type}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Query Workspace */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted">
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                  {tt.queryWorkspace}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {conditions.map((cond, index) => (
                  <div key={cond.id}>
                    {/* Logical Operator connector */}
                    {index > 0 && (
                      <div className="flex justify-center mb-3">
                        <select
                          value={cond.logicalOperator}
                          onChange={(e) => updateCondition(cond.id, 'logicalOperator', e.target.value)}
                          className="px-4 py-1 border border-border rounded-lg bg-white text-foreground text-center"
                          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                        </select>
                      </div>
                    )}

                    {/* Condition Row */}
                    <div className="border border-border rounded-lg p-3 bg-muted/20">
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Element */}
                        <div className="flex-1 min-w-0">
                          <select
                            value={cond.element}
                            onChange={(e) => updateCondition(cond.id, 'element', e.target.value)}
                            className={`w-full h-9 px-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <option value="">{tt.selectElement}</option>
                            {allElements.map((el) => (
                              <option key={el.name} value={el.name}>
                                {el.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Operator */}
                        <div className="w-32">
                          <select
                            value={cond.operator}
                            onChange={(e) => updateCondition(cond.id, 'operator', e.target.value)}
                            disabled={!cond.element}
                            className={`w-full h-9 px-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <option value="">{tt.selectOperator}</option>
                            {(operatorsByType[cond.elementType] || []).map((op) => (
                              <option key={op.value} value={op.value}>
                                {op.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Value */}
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            placeholder={tt.enterValue}
                            value={cond.value}
                            onChange={(e) => updateCondition(cond.id, 'value', e.target.value)}
                            disabled={!cond.operator}
                            className={`w-full h-9 px-3 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${isRTL ? 'text-right' : 'text-left'}`}
                            style={{ fontSize: 'var(--text-sm)' }}
                          />
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeCondition(cond.id)}
                          disabled={conditions.length === 1}
                          className={`p-2 rounded-lg transition-colors shrink-0 ${
                            conditions.length === 1
                              ? 'text-muted-foreground cursor-not-allowed'
                              : 'text-destructive hover:bg-destructive/10'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Condition Button */}
                <button
                  onClick={addCondition}
                  className={`w-full flex items-center justify-center gap-2 mt-2 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Plus className="w-4 h-4" />
                  <span>{tt.addCondition}</span>
                </button>

                {/* Validate & Execute */}
                <div className={`flex mt-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                  <button
                    onClick={handleValidate}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                  >
                    <Play className="w-4 h-4" />
                    <span>{tt.validateAndExecute}</span>
                  </button>
                </div>

                {queryValidated && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-700" style={{ fontSize: 'var(--text-sm)' }}>
                      {tt.queryValidated}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer Actions */}
      <div className={`flex items-center gap-3 mt-8 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
        <button
          onClick={() => navigate('/admin/risks')}
          className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {tt.cancel}
        </button>
        <button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'} ${
            isSaveDisabled
              ? 'bg-primary/50 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Save className="w-4 h-4" />
          <span>{tt.save}</span>
        </button>
      </div>
    </div>
  );
}
