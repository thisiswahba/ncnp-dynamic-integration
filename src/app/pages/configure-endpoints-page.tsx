import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Play, Edit, Trash2, Plus, AlertCircle, X, Eye } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';
import { AddEndpointForm } from '@/app/components/add-endpoint-form';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type EndpointStatus = 'not-tested' | 'validated' | 'failed';

interface Parameter {
  name: string;
  type: string;
  location: 'query' | 'path' | 'header' | 'body';
  required: boolean;
}

interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  parameters: Parameter[];
  responses: string[];
  status: EndpointStatus;
  description?: string;
  failureReason?: string;
}

const mockEndpoints: Endpoint[] = [
  {
    id: '1',
    method: 'GET',
    path: '/api/v1/customers',
    parameters: [
      { name: 'limit', type: 'integer', location: 'query', required: false },
      { name: 'offset', type: 'integer', location: 'query', required: false },
      { name: 'status', type: 'string', location: 'query', required: false }
    ],
    responses: ['200', '401', '500'],
    status: 'validated',
    description: 'Retrieve a list of customers with pagination support'
  },
  {
    id: '2',
    method: 'POST',
    path: '/api/v1/customers',
    parameters: [],
    responses: ['201', '400', '401'],
    status: 'not-tested',
    description: 'Create a new customer record'
  },
  {
    id: '3',
    method: 'GET',
    path: '/api/v1/customers/{id}',
    parameters: [
      { name: 'id', type: 'string', location: 'path', required: true }
    ],
    responses: ['200', '404'],
    status: 'not-tested',
    description: 'Retrieve a specific customer by ID'
  },
  {
    id: '4',
    method: 'PUT',
    path: '/api/v1/customers/{id}',
    parameters: [
      { name: 'id', type: 'string', location: 'path', required: true }
    ],
    responses: ['200', '400', '404'],
    status: 'not-tested',
    description: 'Update an existing customer record'
  },
  {
    id: '5',
    method: 'DELETE',
    path: '/api/v1/customers/{id}',
    parameters: [
      { name: 'id', type: 'string', location: 'path', required: true }
    ],
    responses: ['204', '404'],
    status: 'failed',
    failureReason: 'Endpoint not reachable',
    description: 'Delete a customer record'
  },
];

export function ConfigureEndpointsPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  const [endpoints, setEndpoints] = useState<Endpoint[]>(mockEndpoints);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [selectedParameters, setSelectedParameters] = useState<Parameter[] | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newlyAddedEndpoint, setNewlyAddedEndpoint] = useState<string | null>(null);
  const [showStep1SuccessBanner, setShowStep1SuccessBanner] = useState(false);
  const [showStep2SuccessBanner, setShowStep2SuccessBanner] = useState(false);
  const itemsPerPage = 10;

  // Check if all endpoints are validated
  const allEndpointsValidated = endpoints.length > 0 && endpoints.every(e => e.status === 'validated');

  const handleTestEndpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Testing endpoint:', id);
    // Simulate testing
    setEndpoints(endpoints.map(ep => 
      ep.id === id ? { ...ep, status: 'validated' as EndpointStatus } : ep
    ));
  };

  const handleViewEndpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Viewing endpoint:', id);
  };

  const handleEditEndpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Editing endpoint:', id);
  };

  const handleDeleteEndpoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEndpoints(endpoints.filter(ep => ep.id !== id));
  };

  const handleAddEndpoint = () => {
    console.log('Adding new endpoint');
    setShowAddForm(true);
  };

  const handleEnroll = () => {
    console.log('Enrolling data source');
    navigate('/admin/data-sources');
  };

  const getMethodColor = (method: HttpMethod): string => {
    switch (method) {
      case 'GET': return 'bg-success text-white';
      case 'POST': return 'bg-primary text-white';
      case 'PUT': return 'bg-warning text-white';
      case 'DELETE': return 'bg-destructive text-white';
      case 'PATCH': return 'bg-[#8B5CF6] text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  const getStatusBadge = (status: EndpointStatus) => {
    switch (status) {
      case 'validated':
        return {
          bg: 'bg-success-light',
          border: 'border-success-border',
          text: 'text-success',
          label: isRTL ? 'تم التحقق' : 'Validated'
        };
      case 'failed':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive',
          text: 'text-destructive',
          label: isRTL ? 'فشل' : 'Failed'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          label: isRTL ? 'لم يتم الاختبار' : 'Not Tested'
        };
    }
  };

  // Pagination
  const totalPages = Math.ceil(endpoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEndpoints = endpoints.slice(startIndex, endIndex);

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {isRTL ? 'إعداد نقاط النهاية' : 'Configure Endpoints'}
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {isRTL 
            ? 'مراجعة والتحقق من صحة نقاط نهاية API قبل تسجيل مصدر البيانات.'
            : 'Review and validate API endpoints before enrolling the data source.'}
        </p>
      </div>

      {/* Stepper */}
      <div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Step 1 */}
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} style={{ gap: '12px' }}>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-success text-white"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            ✓
          </div>
          <span
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 400 }}
          >
            {t('addDataSource.step1')}
          </span>
        </div>

        {/* Separator */}
        <ChevronRight className={`w-5 h-5 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />

        {/* Step 2 */}
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} style={{ gap: '12px' }}>
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            2
          </div>
          <span
            className="text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {t('addDataSource.step2')}
          </span>
        </div>
      </div>

      {/* Step 1 Completion Success Banner */}
      {showStep1SuccessBanner && (
        <div className="mb-8 bg-success-light border border-success-border rounded-lg p-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-1">
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-success" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  {isRTL ? 'تم حفظ تفاصيل مصدر البيانات بنجاح' : 'Data source details saved successfully.'}
                </h4>
              </div>
              <p className="text-success-foreground" style={{ fontSize: 'var(--text-sm)', marginInlineStart: isRTL ? '0' : '28px', marginInlineEnd: isRTL ? '28px' : '0' }}>
                {isRTL 
                  ? 'تم حفظ معلومات مصدر البيانات. يمكنك الآن المتابعة لمراجعة والتحقق من نقاط النهاية.'
                  : 'Your data source information has been saved. You can now proceed to review and validate the endpoints.'}
              </p>
            </div>
            <button
              onClick={() => setShowStep1SuccessBanner(false)}
              className="p-2 text-success hover:bg-success/10 rounded transition-colors"
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 Completion Success Banner */}
      {showStep2SuccessBanner && (
        <div className="mb-8 bg-success-light border border-success-border rounded-lg p-4" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex-1">
              <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-success" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  {isRTL ? 'تم تكوين نقاط النهاية بنجاح' : 'Endpoints configured successfully.'}
                </h4>
              </div>
              <p className="text-success-foreground" style={{ fontSize: 'var(--text-sm)', marginInlineStart: isRTL ? '0' : '28px', marginInlineEnd: isRTL ? '28px' : '0' }}>
                {isRTL 
                  ? 'تم تكوين نقاط النهاية بنجاح. يمكنك الآن المتابعة لتسجيل مصدر البيانات.'
                  : 'Endpoints have been configured successfully. You can now proceed to enroll the data source.'}
              </p>
            </div>
            <button
              onClick={() => setShowStep2SuccessBanner(false)}
              className="p-2 text-success hover:bg-success/10 rounded transition-colors"
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white border border-border rounded-lg shadow-sm">
        <div className="p-8">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'نقاط النهاية المكتشفة' : 'Detected Endpoints'}
            </h2>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {isRTL 
                ? 'قام النظام باستخراج نقاط النهاية من مواصفات API المرفوعة. راجع وتحقق من كل نقطة نهاية قبل التسجيل.'
                : 'The system has extracted endpoints from the uploaded API specification. Review and validate each endpoint before enrollment.'}
            </p>
          </div>

          {/* Validation Alert */}
          {!allEndpointsValidated && (
            <div className="flex items-start gap-3 p-4 mb-6 bg-warning-light border border-warning-border rounded-lg" dir={isRTL ? 'rtl' : 'ltr'}>
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-warning-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL
                  ? 'يجب أن تجتاز جميع نقاط النهاية التحقق قبل السماح بالتسجيل.'
                  : 'All endpoints must be successfully validated before enrolling the data source.'}
              </p>
            </div>
          )}

          {/* Add Endpoint Button */}
          <div className={`flex mb-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <button
              onClick={handleAddEndpoint}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              {isRTL ? 'إضافة نقطة نهاية' : 'Add Endpoint'}
            </button>
          </div>

          {/* Success Notification Banner */}
          {newlyAddedEndpoint && (
            <div className="mb-6 bg-success-light border border-success-border rounded-lg p-4" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-1">
                  <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-success" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                      {isRTL ? 'تمت إضافة نقطة النهاية بنجاح' : 'Endpoint successfully added.'}
                    </h4>
                  </div>
                  <p className="text-success-foreground" style={{ fontSize: 'var(--text-sm)', marginInlineStart: isRTL ? '0' : '28px', marginInlineEnd: isRTL ? '28px' : '0' }}>
                    {isRTL 
                      ? 'تمت إضافة نقطة النهاية وهي جاهزة للاختبار أو التحقق من صحتها.'
                      : 'The endpoint has been added and is ready to be tested or validated.'}
                  </p>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button
                    onClick={(e) => {
                      const mockEvent = { stopPropagation: () => {} } as React.MouseEvent;
                      handleTestEndpoint(newlyAddedEndpoint, mockEvent);
                      setNewlyAddedEndpoint(null);
                    }}
                    className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors whitespace-nowrap"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                  >
                    <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Play className="w-4 h-4" />
                      {isRTL ? 'اختبار نقطة النهاية' : 'Test Endpoint'}
                    </span>
                  </button>
                  <button
                    onClick={() => setNewlyAddedEndpoint(null)}
                    className="p-2 text-success hover:bg-success/10 rounded transition-colors"
                    aria-label={isRTL ? 'إغلاق' : 'Close'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Endpoints Table */}
          {endpoints.length === 0 ? (
            <div className="border border-border rounded-lg p-12 mb-6 flex flex-col items-center justify-center">
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 500 }}>
                {isRTL ? 'لا توجد بيانات' : 'No Data'}
              </p>
              <p className="text-muted-foreground mt-2" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL ? 'لم يتم العثور على نقاط نهاية. أضف نقطة نهاية للبدء.' : 'No endpoints found. Add an endpoint to get started.'}
              </p>
            </div>
          ) : (
          <div className="border border-border rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'الطريقة' : 'Method'}
                  </th>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'المسار' : 'Path'}
                  </th>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'المعاملات' : 'Parameters'}
                  </th>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'الاستجابات' : 'Responses'}
                  </th>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'الحالة' : 'Status'}
                  </th>
                  <th
                    className="px-4 py-3 text-foreground"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {isRTL ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEndpoints.map((endpoint) => {
                  const statusBadge = getStatusBadge(endpoint.status);
                  return (
                    <tr 
                      key={endpoint.id} 
                      onClick={() => setSelectedEndpoint(endpoint)}
                      className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded ${getMethodColor(endpoint.method)}`}
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                        >
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <code
                          className="text-foreground font-mono"
                          style={{ fontSize: 'var(--text-sm)' }}
                          dir="ltr"
                        >
                          {endpoint.path}
                        </code>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedParameters(endpoint.parameters);
                          }}
                          className="text-primary hover:underline"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          {endpoint.parameters.length} {isRTL ? 'معاملات' : 'parameters'}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {endpoint.responses.map((code, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-1 bg-muted border border-border rounded text-foreground"
                              style={{ fontSize: 'var(--text-xs)' }}
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="relative inline-block">
                          <span
                            className={`inline-block px-3 py-1 border rounded ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}
                            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                            onMouseEnter={(e) => endpoint.status === 'failed' ? setHoveredButton(`status-${endpoint.id}`) : null}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            {statusBadge.label}
                          </span>
                          {/* Tooltip for Failed Status */}
                          {endpoint.status === 'failed' && hoveredButton === `status-${endpoint.id}` && (
                            <div 
                              className="absolute z-10 px-3 py-2 bg-accent text-white rounded shadow-lg whitespace-nowrap"
                              style={{ 
                                fontSize: 'var(--text-xs)',
                                bottom: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                marginBottom: '8px'
                              }}
                            >
                              {endpoint.failureReason || (isRTL ? 'فشل التحقق' : 'Validation failed')}
                              <div 
                                className="absolute bg-accent"
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  bottom: '-4px',
                                  left: '50%',
                                  transform: 'translateX(-50%) rotate(45deg)'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} style={{ gap: '8px' }}>
                          {/* View Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => handleViewEndpoint(endpoint.id, e)}
                              onMouseEnter={() => setHoveredButton(`view-${endpoint.id}`)}
                              onMouseLeave={() => setHoveredButton(null)}
                              className="p-2 text-foreground hover:bg-muted rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {hoveredButton === `view-${endpoint.id}` && (
                              <div
                                className="absolute z-10 px-3 py-2 bg-accent text-white rounded shadow-lg whitespace-nowrap"
                                style={{
                                  fontSize: 'var(--text-xs)',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px'
                                }}
                              >
                                {isRTL ? 'عرض نقطة النهاية' : 'View Endpoint'}
                                <div
                                  className="absolute bg-accent"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Test Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => handleTestEndpoint(endpoint.id, e)}
                              onMouseEnter={() => setHoveredButton(`test-${endpoint.id}`)}
                              onMouseLeave={() => setHoveredButton(null)}
                              className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            {hoveredButton === `test-${endpoint.id}` && (
                              <div 
                                className="absolute z-10 px-3 py-2 bg-accent text-white rounded shadow-lg whitespace-nowrap"
                                style={{ 
                                  fontSize: 'var(--text-xs)',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px'
                                }}
                              >
                                {isRTL ? 'اختبار نقطة النهاية' : 'Test Endpoint'}
                                <div 
                                  className="absolute bg-accent"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Edit Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => handleEditEndpoint(endpoint.id, e)}
                              onMouseEnter={() => setHoveredButton(`edit-${endpoint.id}`)}
                              onMouseLeave={() => setHoveredButton(null)}
                              className="p-2 text-foreground hover:bg-muted rounded transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {hoveredButton === `edit-${endpoint.id}` && (
                              <div 
                                className="absolute z-10 px-3 py-2 bg-accent text-white rounded shadow-lg whitespace-nowrap"
                                style={{ 
                                  fontSize: 'var(--text-xs)',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px'
                                }}
                              >
                                {isRTL ? 'تعديل نقطة النهاية' : 'Edit Endpoint'}
                                <div 
                                  className="absolute bg-accent"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Delete Button */}
                          <div className="relative">
                            <button
                              onClick={(e) => handleDeleteEndpoint(endpoint.id, e)}
                              onMouseEnter={() => setHoveredButton(`delete-${endpoint.id}`)}
                              onMouseLeave={() => setHoveredButton(null)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            {hoveredButton === `delete-${endpoint.id}` && (
                              <div 
                                className="absolute z-10 px-3 py-2 bg-accent text-white rounded shadow-lg whitespace-nowrap"
                                style={{ 
                                  fontSize: 'var(--text-xs)',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px'
                                }}
                              >
                                {isRTL ? 'حذف نقطة النهاية' : 'Delete Endpoint'}
                                <div 
                                  className="absolute bg-accent"
                                  style={{
                                    width: '8px',
                                    height: '8px',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%) rotate(45deg)'
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )}

          {/* Pagination */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {isRTL ? 'عرض' : 'Showing'} {startIndex + 1} {isRTL ? 'إلى' : 'to'} {Math.min(endIndex, endpoints.length)} {isRTL ? 'من' : 'of'} {endpoints.length} {isRTL ? 'نقطة نهاية' : 'endpoints'}
            </p>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} style={{ gap: '8px' }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                {t('dataSources.pagination.previous')}
              </button>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                {t('dataSources.pagination.next')}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-6">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => navigate('/admin/data-sources/add')}
              className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {t('addDataSource.back')}
            </button>
            <button
              onClick={handleEnroll}
              disabled={!allEndpointsValidated}
              className={`px-6 py-3 rounded-lg text-white transition-colors ${
                allEndpointsValidated
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {isRTL ? 'تسجيل مصدر البيانات' : 'Enroll Data Source'}
            </button>
          </div>
        </div>
      </div>

      {/* Endpoint Details Modal */}
      {selectedEndpoint && (
        <div 
          className="fixed inset-0 bg-accent/50 flex items-center justify-center z-50"
          onClick={() => setSelectedEndpoint(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                {isRTL ? 'تفاصيل نقطة النهاية' : 'Endpoint Details'}
              </h3>
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Method & Path */}
              <div>
                <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'الطريقة والمسار' : 'Method & Path'}
                </label>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-3 py-1 rounded ${getMethodColor(selectedEndpoint.method)}`}
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <code
                    className="text-foreground font-mono"
                    style={{ fontSize: 'var(--text-base)' }}
                    dir="ltr"
                  >
                    {selectedEndpoint.path}
                  </code>
                </div>
              </div>

              {/* Description */}
              {selectedEndpoint.description && (
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'الوصف' : 'Description'}
                  </label>
                  <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {selectedEndpoint.description}
                  </p>
                </div>
              )}

              {/* Parameters */}
              <div>
                <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'المعاملات' : 'Parameters'} ({selectedEndpoint.parameters.length})
                </label>
                {selectedEndpoint.parameters.length > 0 ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="px-4 py-2 text-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? 'الاسم' : 'Name'}
                          </th>
                          <th className="px-4 py-2 text-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? 'النوع' : 'Type'}
                          </th>
                          <th className="px-4 py-2 text-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? 'الموقع' : 'Location'}
                          </th>
                          <th className="px-4 py-2 text-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? 'مطلوب' : 'Required'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEndpoint.parameters.map((param, idx) => (
                          <tr key={idx} className="border-b border-border last:border-b-0">
                            <td className="px-4 py-2 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{param.name}</td>
                            <td className="px-4 py-2 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{param.type}</td>
                            <td className="px-4 py-2 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{param.location}</td>
                            <td className="px-4 py-2">
                              <span className={`inline-block px-2 py-1 rounded ${param.required ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                                {param.required ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    {isRTL ? 'لا توجد معاملات' : 'No parameters'}
                  </p>
                )}
              </div>

              {/* Response Codes */}
              <div>
                <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'أكواد الاستجابة' : 'Response Codes'}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {selectedEndpoint.responses.map((code, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 bg-muted border border-border rounded text-foreground"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={() => setSelectedEndpoint(null)}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parameters Modal */}
      {selectedParameters && (
        <div 
          className="fixed inset-0 bg-accent/50 flex items-center justify-center z-50"
          onClick={() => setSelectedParameters(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                {isRTL ? 'تفاصيل المعاملات' : 'Parameter Details'}
              </h3>
              <button
                onClick={() => setSelectedParameters(null)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedParameters.length > 0 ? (
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                          {isRTL ? 'اسم المعامل' : 'Parameter Name'}
                        </th>
                        <th className="px-4 py-3 text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                          {isRTL ? 'النوع' : 'Type'}
                        </th>
                        <th className="px-4 py-3 text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                          {isRTL ? 'الموقع' : 'Location'}
                        </th>
                        <th className="px-4 py-3 text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}>
                          {isRTL ? 'مطلوب' : 'Required'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedParameters.map((param, idx) => (
                        <tr key={idx} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-3 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{param.name}</td>
                          <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{param.type}</td>
                          <td className="px-4 py-3">
                            <span className="inline-block px-2 py-1 bg-muted border border-border rounded text-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                              {param.location}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-3 py-1 rounded ${param.required ? 'bg-destructive/10 border border-destructive text-destructive' : 'bg-muted border border-border text-muted-foreground'}`} style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                              {param.required ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? 'لا توجد معاملات لهذه نقطة النهاية' : 'No parameters for this endpoint'}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={() => setSelectedParameters(null)}
                className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Endpoint Form Modal */}
      {showAddForm && (
        <AddEndpointForm
          onClose={() => setShowAddForm(false)}
          onSave={(newEndpoint) => {
            setEndpoints([...endpoints, newEndpoint]);
            setShowAddForm(false);
            setNewlyAddedEndpoint(newEndpoint.id);
          }}
        />
      )}
    </div>
  );
}