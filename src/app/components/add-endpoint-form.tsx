import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ParameterType = 'string' | 'number' | 'boolean' | 'object';
type ParameterLocation = 'query' | 'path' | 'header' | 'body';

interface Parameter {
  id: string;
  name: string;
  type: ParameterType;
  location: ParameterLocation;
  required: boolean;
}

interface Response {
  id: string;
  statusCode: string;
  description: string;
}

interface AddEndpointFormProps {
  onClose: () => void;
  onSave: (endpoint: any) => void;
}

export function AddEndpointForm({ onClose, onSave }: AddEndpointFormProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [method, setMethod] = useState<HttpMethod>('GET');
  const [path, setPath] = useState('');
  const [description, setDescription] = useState('');
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [errors, setErrors] = useState<{ path?: string }>({});

  const addParameter = () => {
    const newParam: Parameter = {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      location: 'query',
      required: false
    };
    setParameters([...parameters, newParam]);
  };

  const updateParameter = (id: string, field: keyof Parameter, value: any) => {
    setParameters(parameters.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(p => p.id !== id));
  };

  const addResponse = () => {
    const newResponse: Response = {
      id: Date.now().toString(),
      statusCode: '',
      description: ''
    };
    setResponses([...responses, newResponse]);
  };

  const updateResponse = (id: string, field: keyof Response, value: string) => {
    setResponses(responses.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const removeResponse = (id: string) => {
    setResponses(responses.filter(r => r.id !== id));
  };

  const handleSave = () => {
    // Validation
    const newErrors: { path?: string } = {};
    
    if (!path.trim()) {
      newErrors.path = isRTL ? 'المسار مطلوب' : 'Path is required';
    } else if (!path.startsWith('/')) {
      newErrors.path = isRTL ? 'يجب أن يبدأ المسار بـ /' : 'Path must start with /';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create endpoint object
    const endpoint = {
      id: Date.now().toString(),
      method,
      path,
      description,
      parameters: parameters.filter(p => p.name.trim()),
      responses: responses.filter(r => r.statusCode.trim()),
      status: 'not-tested' as const
    };

    onSave(endpoint);
  };

  return (
    <div 
      className="fixed inset-0 bg-accent/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-foreground mb-1" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'إضافة نقطة نهاية' : 'Add Endpoint'}
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {isRTL ? 'تعريف نقطة نهاية API جديدة للاتصال بمصدر البيانات.' : 'Define a new API endpoint to connect to the data source.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* HTTP Method */}
          <div>
            <label htmlFor="method" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'طريقة HTTP' : 'HTTP Method'} <span className="text-destructive">*</span>
            </label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
              style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
              dir={isRTL ? 'rtl' : 'ltr'}
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
            <label htmlFor="path" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'مسار نقطة النهاية' : 'Endpoint Path'} <span className="text-destructive">*</span>
            </label>
            <input
              id="path"
              type="text"
              value={path}
              onChange={(e) => {
                setPath(e.target.value);
                setErrors({ ...errors, path: undefined });
              }}
              placeholder="/api/v1/resource"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-mono ${
                errors.path ? 'border-destructive' : 'border-border'
              }`}
              style={{ fontSize: 'var(--text-base)', textAlign: 'left' }}
              dir="ltr"
            />
            {errors.path && (
              <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                {errors.path}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'الوصف' : 'Description'} <span className="text-muted-foreground" style={{ fontWeight: 400 }}>({isRTL ? 'اختياري' : 'Optional'})</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isRTL ? 'أدخل وصف نقطة النهاية' : 'Enter endpoint description'}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
              style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          {/* Parameters Section */}
          <div className="border-t border-border pt-6">
            <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {isRTL ? 'المعاملات' : 'Parameters'}
              </h3>
              <button
                onClick={addParameter}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                {isRTL ? 'إضافة معامل' : 'Add Parameter'}
              </button>
            </div>

            {parameters.length > 0 ? (
              <div className="space-y-3">
                {parameters.map((param) => (
                  <div 
                    key={param.id} 
                    className="bg-muted/30 border border-border rounded-lg p-4"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Parameter Name */}
                      <div>
                        <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {isRTL ? 'اسم المعامل' : 'Parameter Name'}
                        </label>
                        <input
                          type="text"
                          value={param.name}
                          onChange={(e) => updateParameter(param.id, 'name', e.target.value)}
                          placeholder={isRTL ? 'مثال: limit' : 'e.g., limit'}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                          style={{ fontSize: 'var(--text-sm)', textAlign: isRTL ? 'right' : 'left' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      </div>

                      {/* Parameter Type */}
                      <div>
                        <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {isRTL ? 'النوع' : 'Type'}
                        </label>
                        <select
                          value={param.type}
                          onChange={(e) => updateParameter(param.id, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                          style={{ fontSize: 'var(--text-sm)', textAlign: isRTL ? 'right' : 'left' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <option value="string">{isRTL ? 'نص' : 'String'}</option>
                          <option value="number">{isRTL ? 'رقم' : 'Number'}</option>
                          <option value="boolean">{isRTL ? 'منطقي' : 'Boolean'}</option>
                          <option value="object">{isRTL ? 'كائن' : 'Object'}</option>
                        </select>
                      </div>

                      {/* Parameter Location */}
                      <div>
                        <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {isRTL ? 'الموقع' : 'Location'}
                        </label>
                        <select
                          value={param.location}
                          onChange={(e) => updateParameter(param.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                          style={{ fontSize: 'var(--text-sm)', textAlign: isRTL ? 'right' : 'left' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <option value="query">Query</option>
                          <option value="path">Path</option>
                          <option value="header">Header</option>
                          <option value="body">Body</option>
                        </select>
                      </div>

                      {/* Required Toggle */}
                      <div className="flex items-end justify-between">
                        <div>
                          <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                            {isRTL ? 'مطلوب' : 'Required'}
                          </label>
                          <button
                            onClick={() => updateParameter(param.id, 'required', !param.required)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              param.required ? 'bg-primary' : 'bg-muted border border-border'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                param.required 
                                  ? (isRTL ? 'translate-x-[-6px]' : 'translate-x-6') 
                                  : (isRTL ? 'translate-x-[-1px]' : 'translate-x-1')
                              }`}
                            />
                          </button>
                        </div>

                        {/* Delete Parameter Button */}
                        <button
                          onClick={() => removeParameter(param.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          title={isRTL ? 'حذف المعامل' : 'Delete parameter'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL ? 'لا توجد معاملات. انقر على "إضافة معامل" لإضافة معامل جديد.' : 'No parameters. Click "Add Parameter" to add one.'}
              </p>
            )}
          </div>

          {/* Responses Section */}
          <div className="border-t border-border pt-6">
            <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                {isRTL ? 'أكواد الاستجابة' : 'Responses'}
              </h3>
              <button
                onClick={addResponse}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                {isRTL ? 'إضافة استجابة' : 'Add Response'}
              </button>
            </div>

            {responses.length > 0 ? (
              <div className="space-y-3">
                {responses.map((response) => (
                  <div 
                    key={response.id} 
                    className="bg-muted/30 border border-border rounded-lg p-4"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-end gap-3">
                      {/* Status Code */}
                      <div className="flex-shrink-0" style={{ width: '120px' }}>
                        <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {isRTL ? 'كود الحالة' : 'Status Code'}
                        </label>
                        <input
                          type="text"
                          value={response.statusCode}
                          onChange={(e) => updateResponse(response.id, 'statusCode', e.target.value)}
                          placeholder="200"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                          style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}
                          dir="ltr"
                        />
                      </div>

                      {/* Description */}
                      <div className="flex-1">
                        <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                          {isRTL ? 'الوصف' : 'Description'}
                        </label>
                        <input
                          type="text"
                          value={response.description}
                          onChange={(e) => updateResponse(response.id, 'description', e.target.value)}
                          placeholder={isRTL ? 'مثال: نجح الطلب' : 'e.g., Success'}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white"
                          style={{ fontSize: 'var(--text-sm)', textAlign: isRTL ? 'right' : 'left' }}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                      </div>

                      {/* Delete Response Button */}
                      <button
                        onClick={() => removeResponse(response.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        title={isRTL ? 'حذف الاستجابة' : 'Delete response'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL ? 'لا توجد استجابات. انقر على "إضافة استجابة" لإضافة استجابة جديدة.' : 'No responses. Click "Add Response" to add one.'}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {isRTL ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {isRTL ? 'حفظ نقطة النهاية' : 'Save Endpoint'}
          </button>
        </div>
      </div>
    </div>
  );
}
