import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useLanguage } from '@/app/contexts/language-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

interface Rule {
  id: string;
  dataSource: string;
  field: string;
  operator: string;
  value: string;
  logicalOperator: 'AND' | 'OR';
}

const mockDataSources = [
  'Customer Management System',
  'Payment Gateway',
  'Inventory System',
  'Analytics Engine',
  'Email Service',
];

const mockFields = {
  'Customer Management System': ['Customer Name', 'ID Number', 'Status', 'Registration Date'],
  'Payment Gateway': ['Transaction Amount', 'Payment Status', 'Transaction Date'],
  'Inventory System': ['Stock Quantity', 'Minimum Threshold', 'Product Status'],
  'Analytics Engine': ['Performance Score', 'Risk Level'],
  'Email Service': ['Message Count', 'Delivery Status'],
};

const operators = [
  { value: '=', label: '=' },
  { value: '!=', label: '≠' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '≥' },
  { value: '<=', label: '≤' },
  { value: 'contains', label: 'Contains' },
];

export function CreateQueryPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [queryName, setQueryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      dataSource: '',
      field: '',
      operator: '',
      value: '',
      logicalOperator: 'AND',
    },
  ]);

  const addRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      dataSource: '',
      field: '',
      operator: '',
      value: '',
      logicalOperator: 'AND',
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    if (rules.length > 1) {
      setRules(rules.filter((rule) => rule.id !== id));
    }
  };

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const handleSave = (activate: boolean = false) => {
    console.log('Save query:', {
      queryName,
      description,
      status: activate ? 'active' : status,
      rules,
    });
    
    // Show success toast
    if (activate) {
      toast.success(t('queries.success.activated'));
    } else {
      toast.success(t('queries.success.saved'));
    }
    
    navigate('/admin/queries');
  };

  return (
    <div 
      className="px-8 py-6 max-w-7xl mx-auto bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 
          className="text-foreground mb-2" 
          style={{ 
            fontSize: 'var(--text-3xl)', 
            fontWeight: 700
          }}
        >
          {t('queries.create')}
        </h1>
        <p 
          className="text-muted-foreground"
          style={{ 
            fontSize: 'var(--text-base)'
          }}
        >
          {t('queries.form.rulesDescription')}
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        {/* Query Information Card */}
        <Card className="bg-white border border-border">
          <CardHeader>
            <CardTitle 
              className="text-foreground"
              style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 600
              }}
            >
              {t('queries.form.queryInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Query Name */}
              <div className="space-y-2">
                <label 
                  htmlFor="query-name" 
                  className="block text-foreground"
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 600
                  }}
                >
                  {t('queries.form.queryName')}
                </label>
                <input
                  id="query-name"
                  type="text"
                  placeholder="Enter query name"
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label 
                  htmlFor="status" 
                  className="block text-foreground"
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 600
                  }}
                >
                  {t('queries.form.status')}
                </label>
                <Select value={status} onValueChange={(value: 'draft' | 'active') => setStatus(value)}>
                  <SelectTrigger 
                    id="status" 
                    className="h-12"
                    style={{ fontSize: 'var(--text-base)' }}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <label 
                  htmlFor="description" 
                  className="block text-foreground"
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: 600
                  }}
                >
                  {t('queries.form.description')}
                </label>
                <textarea
                  id="description"
                  placeholder="Enter query description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                  rows={3}
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Query Rules Builder */}
        <Card className="bg-white border border-border">
          <CardHeader>
            <CardTitle 
              className="text-foreground"
              style={{ 
                fontSize: 'var(--text-lg)', 
                fontWeight: 600
              }}
            >
              {t('queries.form.queryRules')}
            </CardTitle>
            <CardDescription 
              className="text-muted-foreground"
              style={{ 
                fontSize: 'var(--text-sm)'
              }}
            >
              {t('queries.form.rulesDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rules.map((rule, index) => (
              <div key={rule.id}>
                {/* Logical Operator (for rules after the first one) */}
                {index > 0 && (
                  <div className="flex justify-center mb-3">
                    <Select
                      value={rule.logicalOperator}
                      onValueChange={(value: 'AND' | 'OR') =>
                        updateRule(rule.id, 'logicalOperator', value)
                      }
                    >
                      <SelectTrigger 
                        className="w-28 h-8" 
                        size="sm"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Rule Row - Single Horizontal Block */}
                <div 
                  className="border border-border rounded-lg p-3 bg-muted/20"
                >
                  <div className="flex items-center gap-2">
                    {/* Data Source */}
                    <div className="flex-1 min-w-0">
                      <Select
                        value={rule.dataSource}
                        onValueChange={(value) => {
                          updateRule(rule.id, 'dataSource', value);
                          updateRule(rule.id, 'field', '');
                        }}
                      >
                        <SelectTrigger 
                          className="h-9 bg-white" 
                          size="sm"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          <SelectValue placeholder="Data Source" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockDataSources.map((source) => (
                            <SelectItem key={source} value={source}>
                              {source}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Field */}
                    <div className="flex-1 min-w-0">
                      <Select
                        value={rule.field}
                        onValueChange={(value) => updateRule(rule.id, 'field', value)}
                        disabled={!rule.dataSource}
                      >
                        <SelectTrigger 
                          className="h-9 bg-white" 
                          size="sm"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          {rule.dataSource &&
                            mockFields[rule.dataSource as keyof typeof mockFields]?.map((field) => (
                              <SelectItem key={field} value={field}>
                                {field}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Operator */}
                    <div className="w-32">
                      <Select
                        value={rule.operator}
                        onValueChange={(value) => updateRule(rule.id, 'operator', value)}
                      >
                        <SelectTrigger 
                          className="h-9 bg-white" 
                          size="sm"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {operators.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Value */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        placeholder="Value"
                        value={rule.value}
                        onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                        className="w-full h-9 px-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeRule(rule.id)}
                      disabled={rules.length === 1}
                      className={`p-2 rounded-lg transition-colors shrink-0 ${
                        rules.length === 1
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

            {/* Add Rule Button */}
            <button
              onClick={addRule}
              className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              <span>{t('queries.form.addCondition')}</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-3 mt-8 justify-end">
        <button
          onClick={() => navigate('/admin/queries')}
          className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('queries.form.cancel')}
        </button>
        <button
          onClick={() => handleSave(false)}
          className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('queries.form.saveQuery')}
        </button>
        <button
          onClick={() => handleSave(true)}
          className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('queries.form.saveActivate')}
        </button>
      </div>
    </div>
  );
}