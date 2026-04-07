import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/contexts/language-context';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Parameter {
  name: string;
  type: string;
  location: 'query' | 'path' | 'header' | 'body';
  required: boolean;
  value: string;
}

interface TestResult {
  success: boolean;
  statusCode: number;
  responseTime: number;
  responseBody: any;
  headers: Record<string, string>;
  error?: string;
}

// Mock endpoint data
const mockEndpoint = {
  id: '1',
  method: 'GET' as HttpMethod,
  path: '/api/v1/customers',
  description: 'Retrieve a list of customers with pagination support',
  parameters: [
    { name: 'limit', type: 'integer', location: 'query' as const, required: false, value: '' },
    { name: 'offset', type: 'integer', location: 'query' as const, required: false, value: '' },
  ]
};

export function TestEndpointPage() {
  const navigate = useNavigate();
  const { id: dataSourceId, endpointId } = useParams();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [parameters, setParameters] = useState<Parameter[]>(mockEndpoint.parameters);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const updateParameterValue = (index: number, value: string) => {
    const updated = [...parameters];
    updated[index].value = value;
    setParameters(updated);
  };

  const handleTest = () => {
    setIsTesting(true);
    setTestResult(null);

    // Simulate API test - randomly succeed or fail for demo
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccess) {
        const mockResult: TestResult = {
          success: true,
          statusCode: 200,
          responseTime: 145,
          responseBody: {
            data: [
              { id: 1, name: 'Customer A', email: 'customer.a@example.com' },
              { id: 2, name: 'Customer B', email: 'customer.b@example.com' },
              { id: 3, name: 'Customer C', email: 'customer.c@example.com' },
            ],
            pagination: {
              total: 50,
              limit: 10,
              offset: 0
            }
          },
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '999',
            'Cache-Control': 'no-cache'
          }
        };

        setTestResult(mockResult);
        toast.success(isRTL ? 'تم اختبار نقطة النهاية بنجاح' : 'Endpoint tested successfully');
      } else {
        const mockResult: TestResult = {
          success: false,
          statusCode: 401,
          responseTime: 89,
          responseBody: {
            error: 'Unauthorized',
            message: 'Invalid API key or authentication failed'
          },
          headers: {
            'Content-Type': 'application/json',
            'WWW-Authenticate': 'Bearer'
          },
          error: 'Authentication validation failed'
        };

        setTestResult(mockResult);
        toast.error(isRTL ? 'فشل التحقق من صحة نقطة النهاية' : 'Endpoint validation failed');
      }
      
      setIsTesting(false);
    }, 2000);
  };

  const handleCancel = () => {
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-success';
    if (statusCode >= 400 && statusCode < 500) return 'text-warning';
    return 'text-destructive';
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
          {isRTL ? 'اختبار نقطة النهاية' : 'Test Endpoint'}
        </h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          {isRTL 
            ? 'قم باختبار نقطة النهاية عن طريق إدخال المعاملات المطلوبة'
            : 'Test the endpoint by entering the required parameters'}
        </p>

        {/* Endpoint Info */}
        <div className="inline-flex items-center gap-4 bg-muted/30 px-4 py-3 rounded-lg">
          <span
            className="inline-block px-3 py-1 rounded bg-primary text-white"
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
          >
            {mockEndpoint.method}
          </span>
          <code
            className="text-foreground font-mono"
            style={{ fontSize: 'var(--text-sm)' }}
            dir="ltr"
          >
            {mockEndpoint.path}
          </code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Request Configuration */}
        <div>
          <div className="bg-white border border-border rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'معاملات الطلب' : 'Request Parameters'}
            </h2>

            {parameters.length === 0 ? (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? 'لا توجد معاملات مطلوبة لهذه النقطة' : 'No parameters required for this endpoint'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {parameters.map((param, index) => (
                  <div key={index}>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <label className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {param.name}
                      </label>
                      {param.required && (
                        <span className="text-destructive" style={{ fontSize: 'var(--text-xs)' }}>*</span>
                      )}
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        ({param.type})
                      </span>
                      <span 
                        className="px-2 py-0.5 bg-muted border border-border rounded text-muted-foreground"
                        style={{ fontSize: 'var(--text-xs)' }}
                      >
                        {param.location}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={param.value}
                      onChange={(e) => updateParameterValue(index, e.target.value)}
                      placeholder={isRTL ? 'أدخل القيمة...' : 'Enter value...'}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontSize: 'var(--text-base)' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test Button */}
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
          >
            {isTesting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isRTL ? 'جاري الاختبار...' : 'Testing...'}
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {isRTL ? 'تشغيل الاختبار' : 'Run Test'}
              </>
            )}
          </button>
        </div>

        {/* Right Column - Test Results */}
        <div>
          <div className="bg-white border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-foreground mb-4" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'نتائج الاختبار' : 'Test Results'}
            </h2>

            {!testResult ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL 
                    ? 'انقر على "تشغيل الاختبار" لرؤية النتائج'
                    : 'Click "Run Test" to see results'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status */}
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  testResult.success ? 'bg-success-light border border-success-border' : 'bg-destructive/10 border border-destructive'
                } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  {testResult.success ? (
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={testResult.success ? 'text-success' : 'text-destructive'} style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                      {testResult.success 
                        ? (isRTL ? 'نجح الاختبار' : 'Test Successful')
                        : (isRTL ? 'فشل الاختبار' : 'Test Failed')}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {isRTL ? 'رمز الحالة' : 'Status Code'}
                    </p>
                    <p className={`${getStatusColor(testResult.statusCode)}`} style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                      {testResult.statusCode}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                      {isRTL ? 'وقت الاستجابة' : 'Response Time'}
                    </p>
                    <p className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                      {testResult.responseTime}ms
                    </p>
                  </div>
                </div>

                {/* Response Headers */}
                <div>
                  <h3 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                    {isRTL ? 'رؤوس الاستجابة' : 'Response Headers'}
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono max-h-32 overflow-y-auto" dir="ltr">
                    {Object.entries(testResult.headers).map(([key, value]) => (
                      <div key={key} className="text-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                        <span className="text-primary">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Body */}
                <div>
                  <h3 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                    {isRTL ? 'محتوى الاستجابة' : 'Response Body'}
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono max-h-64 overflow-y-auto" dir="ltr">
                    <pre className="text-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {JSON.stringify(testResult.responseBody, null, 2)}
                    </pre>
                  </div>
                </div>

                {testResult.error && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-destructive" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {isRTL ? 'خطأ:' : 'Error:'} {testResult.error}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      <div className="mt-6">
        <button
          onClick={handleCancel}
          className="px-6 py-3 border border-border bg-white text-foreground rounded-lg hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          {isRTL ? 'إغلاق' : 'Close'}
        </button>
      </div>
    </div>
  );
}