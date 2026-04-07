import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/contexts/language-context';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ParameterLocation = 'query' | 'path' | 'header' | 'body';

interface Parameter {
  id: string;
  name: string;
  type: string;
  location: ParameterLocation;
  required: boolean;
  description: string;
}

interface ResponseCode {
  id: string;
  code: string;
  description: string;
}

export function AddEndpointPage() {
  const navigate = useNavigate();
  const { id: dataSourceId } = useParams();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [method, setMethod] = useState<HttpMethod>('GET');
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [responses, setResponses] = useState<ResponseCode[]>([
    { id: '1', code: '200', description: 'Success' }
  ]);

  const addParameter = () => {
    const newParameter: Parameter = {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      location: 'query',
      required: false,
      description: ''
    };
    setParameters([...parameters, newParameter]);
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(p => p.id !== id));
  };

  const updateParameter = (id: string, field: keyof Parameter, value: any) => {
    setParameters(parameters.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const addResponse = () => {
    const newResponse: ResponseCode = {
      id: Date.now().toString(),
      code: '',
      description: ''
    };
    setResponses([...responses, newResponse]);
  };

  const removeResponse = (id: string) => {
    if (responses.length > 1) {
      setResponses(responses.filter(r => r.id !== id));
    }
  };

  const updateResponse = (id: string, field: keyof ResponseCode, value: string) => {
    setResponses(responses.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleSave = () => {
    if (!path.trim()) {
      toast.error(isRTL ? 'الرجاء إدخال مسار نقطة النهاية' : 'Please enter endpoint path');
      return;
    }
    
    console.log('Save endpoint:', { method, path, description, parameters, responses });
    toast.success(isRTL ? 'تمت إضافة نقطة النهاية بنجاح' : 'Endpoint added successfully');
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  const handleCancel = () => {
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back Button */}
      <button
        onClick={handleCancel}
        className={`flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        {isRTL ? 'العودة إلى تفاصيل مصدر البيانات' : 'Back to Data Source Details'}
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {isRTL ? 'إضافة نقطة نهاية جديدة' : 'Add New Endpoint'}
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {isRTL 
            ? 'قم بتكوين نقطة نهاية جديدة لمصدر البيانات الخاص بك'
            : 'Configure a new endpoint for your data source'}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-border rounded-lg shadow-sm p-8 mb-6">
        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
            {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HTTP Method */}
            <div>
              <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {isRTL ? 'طريقة HTTP' : 'HTTP Method'}
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ fontSize: 'var(--text-base)' }}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            {/* Endpoint Path */}
            <div>
              <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {isRTL ? 'مسار نقطة النهاية' : 'Endpoint Path'}
              </label>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder={isRTL ? 'مثال: /api/v1/customers' : 'e.g., /api/v1/customers'}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                style={{ fontSize: 'var(--text-base)' }}
                dir="ltr"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'الوصف' : 'Description'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isRTL ? 'أدخل وصفاً لنقطة النهاية...' : 'Enter endpoint description...'}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              style={{ fontSize: 'var(--text-base)' }}
            />
          </div>
        </div>

        {/* Parameters */}
        <div className="mb-8">
          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'المعاملات' : 'Parameters'}
            </h2>
            <button
              onClick={addParameter}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              {isRTL ? 'إضافة معامل' : 'Add Parameter'}
            </button>
          </div>

          {parameters.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL ? 'لا توجد معاملات. انقر على "إضافة معامل" للبدء.' : 'No parameters yet. Click "Add Parameter" to start.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {parameters.map((param) => (
                <div key={param.id} className="p-4 border border-border rounded-lg bg-muted/20">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {isRTL ? 'الاسم' : 'Name'}
                      </label>
                      <input
                        type="text"
                        value={param.name}
                        onChange={(e) => updateParameter(param.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ fontSize: 'var(--text-sm)' }}
                      />
                    </div>
                    <div>
                      <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {isRTL ? 'النوع' : 'Type'}
                      </label>
                      <select
                        value={param.type}
                        onChange={(e) => updateParameter(param.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <option value="string">String</option>
                        <option value="integer">Integer</option>
                        <option value="boolean">Boolean</option>
                        <option value="array">Array</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {isRTL ? 'الموقع' : 'Location'}
                      </label>
                      <select
                        value={param.location}
                        onChange={(e) => updateParameter(param.id, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <option value="query">Query</option>
                        <option value="path">Path</option>
                        <option value="header">Header</option>
                        <option value="body">Body</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={param.required}
                          onChange={(e) => updateParameter(param.id, 'required', e.target.checked)}
                          className="w-4 h-4 border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          {isRTL ? 'مطلوب' : 'Required'}
                        </span>
                      </label>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => removeParameter(param.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {isRTL ? 'الوصف' : 'Description'}
                    </label>
                    <input
                      type="text"
                      value={param.description}
                      onChange={(e) => updateParameter(param.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Response Codes */}
        <div>
          <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'رموز الاستجابة' : 'Response Codes'}
            </h2>
            <button
              onClick={addResponse}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              {isRTL ? 'إضافة استجابة' : 'Add Response'}
            </button>
          </div>

          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 w-32">
                  <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                    {isRTL ? 'الرمز' : 'Code'}
                  </label>
                  <input
                    type="text"
                    value={response.code}
                    onChange={(e) => updateResponse(response.id, 'code', e.target.value)}
                    placeholder="200"
                    className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                    {isRTL ? 'الوصف' : 'Description'}
                  </label>
                  <input
                    type="text"
                    value={response.description}
                    onChange={(e) => updateResponse(response.id, 'description', e.target.value)}
                    placeholder={isRTL ? 'وصف الاستجابة' : 'Response description'}
                    className="w-full px-3 py-2 border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontSize: 'var(--text-sm)' }}
                  />
                </div>
                <div className="flex-shrink-0 mt-6">
                  <button
                    onClick={() => removeResponse(response.id)}
                    disabled={responses.length === 1}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          {isRTL ? 'حفظ نقطة النهاية' : 'Save Endpoint'}
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-3 border border-border bg-white text-foreground rounded-lg hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}
