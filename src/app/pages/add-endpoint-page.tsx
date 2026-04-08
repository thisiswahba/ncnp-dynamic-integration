import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Plus, Trash2, ChevronDown } from 'lucide-react';
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
  type: string;
  schema: string;
  description: string;
}

const methodColors: Record<HttpMethod, string> = {
  GET: 'bg-emerald-600 text-white',
  POST: 'bg-blue-600 text-white',
  PUT: 'bg-amber-600 text-white',
  DELETE: 'bg-red-600 text-white',
  PATCH: 'bg-violet-600 text-white',
};

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
    { id: '1', code: '200', type: 'application/json', schema: '', description: 'Success' }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addParameter = () => {
    setParameters([...parameters, {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      location: 'query',
      required: false,
      description: ''
    }]);
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
    setResponses([...responses, {
      id: Date.now().toString(),
      code: '',
      type: 'application/json',
      schema: '',
      description: ''
    }]);
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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!path.trim()) {
      newErrors.path = isRTL ? 'مسار نقطة النهاية مطلوب' : 'Endpoint path is required';
    }
    parameters.forEach((p) => {
      if (!p.name.trim()) {
        newErrors[`param-name-${p.id}`] = isRTL ? 'مطلوب' : 'Required';
      }
    });
    responses.forEach((r) => {
      if (!r.code.trim()) {
        newErrors[`resp-code-${r.id}`] = isRTL ? 'مطلوب' : 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    console.log('Save endpoint:', { method, path, description, parameters, responses });
    toast.success(isRTL ? 'تمت إضافة نقطة النهاية بنجاح' : 'Endpoint added successfully');
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  const handleCancel = () => {
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back Link */}
      <button
        onClick={handleCancel}
        className={`flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        style={{ fontSize: 'var(--text-sm)' }}
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        {isRTL ? 'العودة إلى تفاصيل مصدر البيانات' : 'Back to Data Source Details'}
      </button>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          {isRTL ? 'إضافة نقطة نهاية جديدة' : 'Add New Endpoint'}
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
          {isRTL ? 'قم بتعريف نقطة النهاية الجديدة ومعاملاتها واستجاباتها' : 'Define the new endpoint, its parameters, and expected responses.'}
        </p>
      </div>

      {/* ── Section 1: Endpoint Definition ── */}
      <section className="bg-white border border-border rounded-xl shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
            {isRTL ? 'تعريف نقطة النهاية' : 'Endpoint Definition'}
          </h2>
        </div>
        <div className="p-6">
          {/* Method + Path on one row */}
          <div className="flex gap-4 mb-5">
            <div className="w-40 flex-shrink-0">
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Method
              </label>
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as HttpMethod)}
                  className={`w-full appearance-none px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary font-mono font-semibold ${methodColors[method]} cursor-pointer`}
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
                <ChevronDown className="absolute top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ right: isRTL ? 'auto' : '12px', left: isRTL ? '12px' : 'auto', color: 'white' }} />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-muted-foreground mb-1.5" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Path <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={path}
                onChange={(e) => { setPath(e.target.value); setErrors({ ...errors, path: '' }); }}
                placeholder="/api/v1/customers"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono ${errors.path ? 'border-destructive' : 'border-border'}`}
                style={{ fontSize: 'var(--text-sm)' }}
                dir="ltr"
              />
              {errors.path && <p className="text-destructive mt-1" style={{ fontSize: 'var(--text-xs)' }}>{errors.path}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-muted-foreground mb-1.5" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'الوصف' : 'Description'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isRTL ? 'وصف مختصر لنقطة النهاية...' : 'Brief description of this endpoint...'}
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </div>

          {/* Status badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'الحالة' : 'Status'}
            </span>
            <span className="inline-flex px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'لم يتم الاختبار' : 'Not Tested'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Parameters ── */}
      <section className="bg-white border border-border rounded-xl shadow-sm mb-6">
        <div className={`px-6 py-4 border-b border-border flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
              {isRTL ? 'المعاملات' : 'Parameters'}
            </h2>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {parameters.length}
            </span>
          </div>
          <button
            onClick={addParameter}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            <Plus className="w-3.5 h-3.5" />
            {isRTL ? 'إضافة معامل' : 'Add Parameter'}
          </button>
        </div>
        <div className="p-6">
          {parameters.length === 0 ? (
            <div className="text-center py-10 rounded-lg border-2 border-dashed border-border">
              <p className="text-muted-foreground mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL ? 'لا توجد معاملات بعد' : 'No parameters defined yet'}
              </p>
              <button
                onClick={addParameter}
                className="text-primary hover:underline"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {isRTL ? '+ إضافة أول معامل' : '+ Add first parameter'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Table header */}
              <div className={`grid gap-3 px-4 ${isRTL ? 'text-right' : 'text-left'}`} style={{ gridTemplateColumns: '1fr 120px 120px 80px 70px 40px' }}>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isRTL ? 'الاسم' : 'Name'}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isRTL ? 'النوع' : 'Type'}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isRTL ? 'في' : 'In'}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isRTL ? 'مطلوب' : 'Req'}
                </span>
                <span></span>
                <span></span>
              </div>
              {parameters.map((param) => (
                <div key={param.id} className="grid gap-3 px-4 py-3 bg-muted/20 border border-border rounded-lg items-center" style={{ gridTemplateColumns: '1fr 120px 120px 80px 70px 40px' }}>
                  <div>
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => { updateParameter(param.id, 'name', e.target.value); setErrors({ ...errors, [`param-name-${param.id}`]: '' }); }}
                      placeholder="param_name"
                      className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary font-mono ${errors[`param-name-${param.id}`] ? 'border-destructive' : 'border-border'}`}
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </div>
                  <select
                    value={param.type}
                    onChange={(e) => updateParameter(param.id, 'type', e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <option value="string">String</option>
                    <option value="int">Integer</option>
                    <option value="float">Float</option>
                    <option value="bool">Boolean</option>
                  </select>
                  <select
                    value={param.location}
                    onChange={(e) => updateParameter(param.id, 'location', e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <option value="query">Query</option>
                    <option value="path">Path</option>
                    <option value="header">Header</option>
                    <option value="body">Body</option>
                  </select>
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={param.required}
                      onChange={(e) => updateParameter(param.id, 'required', e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                  </div>
                  <div></div>
                  <button
                    onClick={() => removeParameter(param.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 3: Responses ── */}
      <section className="bg-white border border-border rounded-xl shadow-sm mb-8">
        <div className={`px-6 py-4 border-b border-border flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
              {isRTL ? 'الاستجابات' : 'Responses'}
            </h2>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {responses.length}
            </span>
          </div>
          <button
            onClick={addResponse}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            <Plus className="w-3.5 h-3.5" />
            {isRTL ? 'إضافة استجابة' : 'Add Response'}
          </button>
        </div>
        <div className="p-6">
          {/* Table header */}
          <div className={`grid gap-3 px-4 mb-2 ${isRTL ? 'text-right' : 'text-left'}`} style={{ gridTemplateColumns: '100px 160px 1fr 1fr 40px' }}>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'الرمز' : 'Code'}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'النوع' : 'Type'}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'المخطط' : 'Schema'}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isRTL ? 'الوصف' : 'Description'}
            </span>
            <span></span>
          </div>
          <div className="space-y-3">
            {responses.map((response) => (
              <div key={response.id} className="grid gap-3 px-4 py-3 bg-muted/20 border border-border rounded-lg items-center" style={{ gridTemplateColumns: '100px 160px 1fr 1fr 40px' }}>
                <input
                  type="text"
                  value={response.code}
                  onChange={(e) => { updateResponse(response.id, 'code', e.target.value); setErrors({ ...errors, [`resp-code-${response.id}`]: '' }); }}
                  placeholder="200"
                  className={`px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary font-mono ${errors[`resp-code-${response.id}`] ? 'border-destructive' : 'border-border'}`}
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <select
                  value={response.type}
                  onChange={(e) => updateResponse(response.id, 'type', e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <option value="application/json">application/json</option>
                  <option value="text/plain">text/plain</option>
                  <option value="text/html">text/html</option>
                  <option value="application/xml">application/xml</option>
                </select>
                <input
                  type="text"
                  value={response.schema}
                  onChange={(e) => updateResponse(response.id, 'schema', e.target.value)}
                  placeholder='{"type": "object"}'
                  className="px-3 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  style={{ fontSize: 'var(--text-sm)' }}
                  dir="ltr"
                />
                <input
                  type="text"
                  value={response.description}
                  onChange={(e) => updateResponse(response.id, 'description', e.target.value)}
                  placeholder={isRTL ? 'وصف الاستجابة' : 'Response description'}
                  className="px-3 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <button
                  onClick={() => removeResponse(response.id)}
                  disabled={responses.length === 1}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Action Buttons ── */}
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {isRTL ? 'حفظ نقطة النهاية' : 'Save Endpoint'}
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 border border-border bg-white text-foreground rounded-lg hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}
