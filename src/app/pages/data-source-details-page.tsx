import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Play, Edit, Trash2, Power, ArrowLeft, Plus, Shield, Clock, X, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type EndpointStatus = 'active' | 'inactive' | 'failed';
type DataSourceStatus = 'active' | 'inactive' | 'error';
type AuthType = 'API Key' | 'OAuth 2.0' | 'Basic Auth' | 'Bearer Token';

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
}

interface ActivityLog {
  id: string;
  date: string;
  action: string;
  description: string;
}

interface DataSource {
  id: string;
  systemName: string;
  businessDomain: string;
  status: DataSourceStatus;
  apiVersion: string;
  baseUrl: string;
  authenticationType: AuthType;
  apiKeyName: string;
  authorizationHeader: string;
  endpoints: Endpoint[];
  activityLogs: ActivityLog[];
}

// Mock data
const mockDataSource: DataSource = {
  id: '1',
  systemName: 'Customer Management API',
  businessDomain: 'Customer Relations',
  status: 'active',
  apiVersion: 'v2.1.0',
  baseUrl: 'https://api.example.com/v2',
  authenticationType: 'API Key',
  apiKeyName: 'X-API-Key',
  authorizationHeader: 'Bearer {token}',
  endpoints: [
    {
      id: '1',
      method: 'GET',
      path: '/api/v1/customers',
      parameters: [
        { name: 'limit', type: 'integer', location: 'query', required: false },
        { name: 'offset', type: 'integer', location: 'query', required: false },
      ],
      responses: ['200', '401', '500'],
      status: 'active',
      description: 'Retrieve a list of customers with pagination support'
    },
    {
      id: '2',
      method: 'POST',
      path: '/api/v1/customers',
      parameters: [],
      responses: ['201', '400', '401'],
      status: 'active',
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
      status: 'inactive',
      description: 'Retrieve a specific customer by ID'
    },
    {
      id: '4',
      method: 'DELETE',
      path: '/api/v1/customers/{id}',
      parameters: [
        { name: 'id', type: 'string', location: 'path', required: true }
      ],
      responses: ['204', '404'],
      status: 'failed',
      description: 'Delete a customer record'
    },
  ],
  activityLogs: [
    {
      id: '1',
      date: '2024-03-04 14:32:18',
      action: 'Endpoint Added',
      description: 'Added new endpoint: POST /api/v1/customers'
    },
    {
      id: '2',
      date: '2024-03-04 13:15:42',
      action: 'Endpoint Tested',
      description: 'Successfully tested endpoint: GET /api/v1/customers'
    },
    {
      id: '3',
      date: '2024-03-04 12:08:30',
      action: 'Security Updated',
      description: 'Updated authentication configuration to API Key'
    },
    {
      id: '4',
      date: '2024-03-04 11:45:12',
      action: 'Data Source Created',
      description: 'Data source "Customer Management API" was created'
    },
  ]
};

type TabType = 'endpoints' | 'security' | 'logs';

export function DataSourceDetailsPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();
  const isRTL = language === 'ar';
  
  const [dataSource] = useState<DataSource>(mockDataSource);
  const [activeTab, setActiveTab] = useState<TabType>('endpoints');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [selectedEndpointForParams, setSelectedEndpointForParams] = useState<Endpoint | null>(null);
  const [selectedEndpointForDetails, setSelectedEndpointForDetails] = useState<Endpoint | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(dataSource.endpoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEndpoints = dataSource.endpoints.slice(startIndex, endIndex);

  const handleTestEndpoint = (endpointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Testing endpoint:', endpointId);
  };

  const handleEditEndpoint = (endpointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Editing endpoint:', endpointId);
  };

  const handleDisableEndpoint = (endpointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggling endpoint:', endpointId);
  };

  const handleDeleteEndpoint = (endpointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Deleting endpoint:', endpointId);
  };

  const handleAddEndpoint = () => {
    console.log('Adding new endpoint');
    setShowSuccessBanner(true);
  };

  const handleEditSecurity = () => {
    console.log('Editing security configuration');
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
      case 'active':
        return {
          bg: 'bg-success-light',
          border: 'border-success-border',
          text: 'text-success',
          label: isRTL ? 'نشط' : 'Active'
        };
      case 'inactive':
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          label: isRTL ? 'غير نشط' : 'Inactive'
        };
      case 'failed':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive',
          text: 'text-destructive',
          label: isRTL ? 'فشل' : 'Failed'
        };
    }
  };

  const getDataSourceStatusBadge = (status: DataSourceStatus) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-success-light',
          border: 'border-success-border',
          text: 'text-success',
          label: isRTL ? 'نشط' : 'Active'
        };
      case 'inactive':
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          label: isRTL ? 'غير نشط' : 'Inactive'
        };
      case 'error':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive',
          text: 'text-destructive',
          label: isRTL ? 'خطأ' : 'Error'
        };
    }
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/data-sources')}
        className={`flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
      >
        <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        {isRTL ? 'العودة إلى مصادر البيانات' : 'Back to Data Sources'}
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {dataSource.systemName}
        </h1>
        <p className="text-muted-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>
          {dataSource.businessDomain}
        </p>

        {/* Metadata Section */}
        <div className={`flex flex-wrap items-center gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Status Badge */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'الحالة:' : 'Status:'}
            </span>
            {(() => {
              const badge = getDataSourceStatusBadge(dataSource.status);
              return (
                <span
                  className={`inline-block px-3 py-1 border rounded ${badge.bg} ${badge.border} ${badge.text}`}
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                >
                  {badge.label}
                </span>
              );
            })()}
          </div>

          {/* API Version */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'إصدار API:' : 'API Version:'}
            </span>
            <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {dataSource.apiVersion}
            </span>
          </div>

          {/* Base URL */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              {isRTL ? 'عنوان URL الأساسي:' : 'Base URL:'}
            </span>
            <code
              className="text-primary font-mono bg-muted px-2 py-1 rounded"
              style={{ fontSize: 'var(--text-xs)' }}
              dir="ltr"
            >
              {dataSource.baseUrl}
            </code>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className={`flex border-b border-border ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'endpoints'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {isRTL ? 'نقاط النهاية' : 'Endpoints'}
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {isRTL ? 'الأمان' : 'Security'}
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'logs'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {isRTL ? 'سجلات النشاط' : 'Activity Logs'}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-border rounded-lg shadow-sm">
        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div className="p-8">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                {isRTL ? 'نقاط النهاية' : 'Endpoints'}
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL
                  ? 'إدارة نقاط النهاية المتاحة لمصدر البيانات هذا.'
                  : 'Manage available endpoints for this data source.'}
              </p>
            </div>

            {/* Add Endpoint Button */}
            <div className={`flex mb-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <button
                onClick={handleAddEndpoint}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Plus className="w-4 h-4" />
                {isRTL ? 'إضافة نقطة نهاية' : 'Add Endpoint'}
              </button>
            </div>

            {/* Success Banner */}
            {showSuccessBanner && (
              <div className="mb-4 bg-success-light border border-success-border rounded-lg p-4" dir={isRTL ? 'rtl' : 'ltr'}>
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
                        ? 'نقطة النهاية متاحة الآن ويمكن اختبارها أو تعديلها.'
                        : 'The endpoint is now available and can be tested or edited.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSuccessBanner(false)}
                    className="p-2 text-success hover:bg-success/10 rounded transition-colors"
                    aria-label={isRTL ? 'إغلاق' : 'Close'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Endpoints Table */}
            <div className="border border-border rounded-lg overflow-hidden">
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
                        className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
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
                          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            {endpoint.parameters.length}
                          </span>
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
                          <span
                            className={`inline-block px-3 py-1 border rounded ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}
                            style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                          >
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} style={{ gap: '8px' }}>
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
                                  {isRTL ? 'اختبار' : 'Test'}
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
                                  {isRTL ? 'تعديل' : 'Edit'}
                                </div>
                              )}
                            </div>

                            {/* Disable Button */}
                            <div className="relative">
                              <button
                                onClick={(e) => handleDisableEndpoint(endpoint.id, e)}
                                onMouseEnter={() => setHoveredButton(`disable-${endpoint.id}`)}
                                onMouseLeave={() => setHoveredButton(null)}
                                className="p-2 text-warning hover:bg-warning/10 rounded transition-colors"
                              >
                                <Power className="w-4 h-4" />
                              </button>
                              {hoveredButton === `disable-${endpoint.id}` && (
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
                                  {isRTL ? (endpoint.status === 'active' ? 'تعطيل' : 'تفعيل') : (endpoint.status === 'active' ? 'Disable' : 'Enable')}
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
                                  {isRTL ? 'حذف' : 'Delete'}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={`flex items-center justify-between px-6 py-4 mt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? (
                    <>
                      عرض {startIndex + 1} إلى {Math.min(endIndex, dataSource.endpoints.length)} من {dataSource.endpoints.length} نتيجة
                    </>
                  ) : (
                    <>
                      Showing {startIndex + 1} to {Math.min(endIndex, dataSource.endpoints.length)} of {dataSource.endpoints.length} results
                    </>
                  )}
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {isRTL ? 'السابق' : 'Previous'}
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-white border border-border text-foreground hover:bg-muted'
                        }`}
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {isRTL ? 'التالي' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="p-8">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                {isRTL ? 'تكوين الأمان' : 'Security Configuration'}
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL
                  ? 'عرض وإدارة إعدادات المصادقة لمصدر البيانات هذا.'
                  : 'View and manage authentication settings for this data source.'}
              </p>
            </div>

            {/* Security Info Card */}
            <div className="border border-border rounded-lg p-6 mb-6">
              <div className="space-y-6">
                {/* Authentication Type */}
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'نوع المصادقة' : 'Authentication Type'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                      {dataSource.authenticationType}
                    </span>
                  </div>
                </div>

                {/* API Key Name */}
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'اسم مفتاح API' : 'API Key Name'}
                  </label>
                  <code
                    className="text-foreground font-mono bg-muted px-3 py-2 rounded block"
                    style={{ fontSize: 'var(--text-sm)' }}
                    dir="ltr"
                  >
                    {dataSource.apiKeyName}
                  </code>
                </div>

                {/* Authorization Header */}
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'رأس التفويض' : 'Authorization Header'}
                  </label>
                  <code
                    className="text-foreground font-mono bg-muted px-3 py-2 rounded block"
                    style={{ fontSize: 'var(--text-sm)' }}
                    dir="ltr"
                  >
                    {dataSource.authorizationHeader}
                  </code>
                </div>

                {/* Base URL */}
                <div>
                  <label className="block text-muted-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {isRTL ? 'عنوان URL الأساسي' : 'Base URL'}
                  </label>
                  <code
                    className="text-foreground font-mono bg-muted px-3 py-2 rounded block"
                    style={{ fontSize: 'var(--text-sm)' }}
                    dir="ltr"
                  >
                    {dataSource.baseUrl}
                  </code>
                </div>
              </div>
            </div>

            {/* Edit Security Button */}
            <button
              onClick={handleEditSecurity}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              <Edit className="w-4 h-4" />
              {isRTL ? 'تعديل الأمان' : 'Edit Security'}
            </button>
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'logs' && (
          <div className="p-8">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                {isRTL ? 'سجلات النشاط' : 'Activity Logs'}
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {isRTL
                  ? 'عرض سجل النشاط والتغييرات على مصدر البيانات هذا.'
                  : 'View the activity history and changes to this data source.'}
              </p>
            </div>

            {/* Activity Logs Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th
                      className="px-4 py-3 text-foreground"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {isRTL ? 'التاريخ' : 'Date'}
                    </th>
                    <th
                      className="px-4 py-3 text-foreground"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {isRTL ? 'الإجراء' : 'Action'}
                    </th>
                    <th
                      className="px-4 py-3 text-foreground"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 600, textAlign: isRTL ? 'right' : 'left' }}
                    >
                      {isRTL ? 'الوصف' : 'Description'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSource.activityLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }} dir="ltr">
                            {log.date}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className="inline-block px-3 py-1 bg-primary/10 border border-primary text-primary rounded"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                          {log.description}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}