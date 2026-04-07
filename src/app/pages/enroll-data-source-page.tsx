import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/app/contexts/language-context';

interface EndpointSummary {
  id: string;
  method: string;
  path: string;
  status: 'configured' | 'tested' | 'not-tested';
}

// Mock data
const mockDataSource = {
  id: '1',
  systemName: 'Customer Management API',
  businessDomain: 'Customer Relations',
  apiVersion: 'v2.1.0',
  baseUrl: 'https://api.example.com/v2',
  authenticationType: 'API Key',
  endpoints: [
    { id: '1', method: 'GET', path: '/api/v1/customers', status: 'tested' as const },
    { id: '2', method: 'POST', path: '/api/v1/customers', status: 'tested' as const },
    { id: '3', method: 'GET', path: '/api/v1/customers/{id}', status: 'configured' as const },
    { id: '4', method: 'DELETE', path: '/api/v1/customers/{id}', status: 'not-tested' as const },
  ]
};

export function EnrollDataSourcePage() {
  const navigate = useNavigate();
  const { id: dataSourceId } = useParams();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [acknowledgeWarnings, setAcknowledgeWarnings] = useState(false);

  const testedEndpoints = mockDataSource.endpoints.filter(e => e.status === 'tested').length;
  const totalEndpoints = mockDataSource.endpoints.length;
  const hasUntestedEndpoints = mockDataSource.endpoints.some(e => e.status === 'not-tested');

  const handleEnroll = () => {
    if (hasUntestedEndpoints && !acknowledgeWarnings) {
      toast.error(isRTL 
        ? 'يرجى الإقرار بالتحذيرات قبل التسجيل' 
        : 'Please acknowledge the warnings before enrolling'
      );
      return;
    }

    setIsEnrolling(true);

    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false);
      toast.success(isRTL 
        ? 'تم تسجيل مصدر البيانات بنجاح' 
        : 'Data source enrolled successfully'
      );
      navigate('/admin/data-sources');
    }, 2000);
  };

  const handleCancel = () => {
    navigate(`/admin/data-sources/${dataSourceId}`);
  };

  const getStatusBadge = (status: EndpointSummary['status']) => {
    switch (status) {
      case 'tested':
        return {
          bg: 'bg-success-light',
          border: 'border-success-border',
          text: 'text-success',
          label: isRTL ? 'تم الاختبار' : 'Tested'
        };
      case 'configured':
        return {
          bg: 'bg-info-light',
          border: 'border-info-border',
          text: 'text-info',
          label: isRTL ? 'تم التكوين' : 'Configured'
        };
      case 'not-tested':
        return {
          bg: 'bg-warning-light',
          border: 'border-warning-border',
          text: 'text-warning',
          label: isRTL ? 'لم يتم الاختبار' : 'Not Tested'
        };
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-success text-white';
      case 'POST': return 'bg-primary text-white';
      case 'PUT': return 'bg-warning text-white';
      case 'DELETE': return 'bg-destructive text-white';
      case 'PATCH': return 'bg-[#8B5CF6] text-white';
      default: return 'bg-muted text-foreground';
    }
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
          {isRTL ? 'تسجيل مصدر البيانات' : 'Enroll Data Source'}
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {isRTL 
            ? 'راجع التكوين وقم بتسجيل مصدر البيانات لبدء استخدامه'
            : 'Review the configuration and enroll the data source to start using it'}
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-border rounded-lg shadow-sm p-8 mb-6">
        <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
          {isRTL ? 'ملخص مصدر البيانات' : 'Data Source Summary'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'اسم النظام' : 'System Name'}
            </label>
            <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {mockDataSource.systemName}
            </p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'المجال التجاري' : 'Business Domain'}
            </label>
            <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {mockDataSource.businessDomain}
            </p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'إصدار API' : 'API Version'}
            </label>
            <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {mockDataSource.apiVersion}
            </p>
          </div>
          <div>
            <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'نوع المصادقة' : 'Authentication Type'}
            </label>
            <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {mockDataSource.authenticationType}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              {isRTL ? 'عنوان URL الأساسي' : 'Base URL'}
            </label>
            <code 
              className="text-primary font-mono bg-muted px-3 py-2 rounded inline-block"
              style={{ fontSize: 'var(--text-sm)' }}
              dir="ltr"
            >
              {mockDataSource.baseUrl}
            </code>
          </div>
        </div>

        {/* Endpoints Status */}
        <div className="border-t border-border pt-6">
          <h3 className="text-foreground mb-4" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
            {isRTL ? 'حالة نقاط النهاية' : 'Endpoints Status'}
          </h3>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL 
                  ? `${testedEndpoints} من ${totalEndpoints} نقاط نهاية تم اختبارها`
                  : `${testedEndpoints} of ${totalEndpoints} endpoints tested`}
              </span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {Math.round((testedEndpoints / totalEndpoints) * 100)}%
              </span>
            </div>
            <div className={`w-full h-2 bg-muted rounded-full overflow-hidden ${isRTL ? 'flex justify-end' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div 
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${(testedEndpoints / totalEndpoints) * 100}%` }}
              />
            </div>
          </div>

          {/* Endpoints List */}
          <div className="space-y-2">
            {mockDataSource.endpoints.map((endpoint) => {
              const statusBadge = getStatusBadge(endpoint.status);
              return (
                <div 
                  key={endpoint.id} 
                  className={`flex items-center justify-between p-4 bg-muted/30 rounded-lg ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span
                      className={`inline-block px-3 py-1 rounded ${getMethodColor(endpoint.method)}`}
                      style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                    >
                      {endpoint.method}
                    </span>
                    <code 
                      className="text-foreground font-mono"
                      style={{ fontSize: 'var(--text-sm)' }}
                      dir="ltr"
                    >
                      {endpoint.path}
                    </code>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 border rounded ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}
                    style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                  >
                    {statusBadge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Warnings */}
      {hasUntestedEndpoints && (
        <div className="bg-warning-light border border-warning-border rounded-lg p-6 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-warning mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                {isRTL ? 'تحذير: نقاط نهاية غير مختبرة' : 'Warning: Untested Endpoints'}
              </h3>
              <p className="text-warning-foreground mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL 
                  ? 'بعض نقاط النهاية لم يتم اختبارها. يوصى بشدة باختبار جميع نقاط النهاية قبل التسجيل لضمان التكامل السليم.'
                  : 'Some endpoints have not been tested. It is strongly recommended to test all endpoints before enrollment to ensure proper integration.'}
              </p>
              <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <input
                  type="checkbox"
                  checked={acknowledgeWarnings}
                  onChange={(e) => setAcknowledgeWarnings(e.target.checked)}
                  className="w-4 h-4 border-border rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-warning-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL 
                    ? 'أقر بأنني أفهم المخاطر وأريد المتابعة'
                    : 'I acknowledge that I understand the risks and want to proceed'}
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Success Info */}
      {!hasUntestedEndpoints && (
        <div className="bg-success-light border border-success-border rounded-lg p-6 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-success mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                {isRTL ? 'جاهز للتسجيل' : 'Ready for Enrollment'}
              </h3>
              <p className="text-success-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL 
                  ? 'تم اختبار جميع نقاط النهاية بنجاح. مصدر البيانات جاهز للتسجيل.'
                  : 'All endpoints have been successfully tested. The data source is ready for enrollment.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <button
          onClick={handleEnroll}
          disabled={isEnrolling || (hasUntestedEndpoints && !acknowledgeWarnings)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          {isEnrolling ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {isRTL ? 'جاري التسجيل...' : 'Enrolling...'}
            </span>
          ) : (
            isRTL ? 'تسجيل مصدر البيانات' : 'Enroll Data Source'
          )}
        </button>
        <button
          onClick={handleCancel}
          disabled={isEnrolling}
          className="px-6 py-3 border border-border bg-white text-foreground rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}