import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Badge } from '@/app/components/ui/badge';
import { useLanguage } from '@/app/contexts/language-context';

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

const mockRisks: DefinedRisk[] = [
  { id: '1', riskId: 'RSK-001', riskName: 'Financial Non-Compliance', riskLevel: 'High', determination: 'automated', automationStatus: 'active', businessDomain: 'Finance', queryId: 'QRY-001' },
  { id: '2', riskId: 'RSK-002', riskName: 'Data Privacy Breach', riskLevel: 'Critical', determination: 'automated', automationStatus: 'active', businessDomain: 'Compliance', queryId: 'QRY-002' },
  { id: '3', riskId: 'RSK-003', riskName: 'Operational Downtime', riskLevel: 'Medium', determination: 'manual', automationStatus: null, businessDomain: 'Operations', queryId: null },
  { id: '4', riskId: 'RSK-004', riskName: 'Employee Turnover Risk', riskLevel: 'Low', determination: 'manual', automationStatus: null, businessDomain: 'HR', queryId: null },
  { id: '5', riskId: 'RSK-005', riskName: 'Regulatory Penalty Risk', riskLevel: 'High', determination: 'automated', automationStatus: 'inactive', businessDomain: 'Compliance', queryId: 'QRY-005' },
  { id: '6', riskId: 'RSK-006', riskName: 'Customer Churn Risk', riskLevel: 'Medium', determination: 'automated', automationStatus: 'active', businessDomain: 'CRM', queryId: 'QRY-006' },
  { id: '7', riskId: 'RSK-007', riskName: 'Supply Chain Disruption', riskLevel: 'High', determination: 'manual', automationStatus: null, businessDomain: 'Operations', queryId: null },
];

const translations = {
  en: {
    title: 'Defined Risks',
    searchPlaceholder: 'Search by Risk ID or name...',
    colRiskId: 'Risk ID',
    colRiskName: 'Risk Name',
    colRiskLevel: 'Risk Level',
    colDetermination: 'Determination Method',
    colAutomationStatus: 'Automation Status',
    colActions: 'Actions',
    manual: 'Manual',
    automated: 'Automated',
    active: 'Active',
    inactive: 'Inactive',
    viewDetails: 'View Details',
    configureAutomation: 'Configure Automation',
    editQuery: 'Edit Query',
    activateQuery: 'Activate Query',
    deactivateQuery: 'Deactivate Query',
    viewEntities: 'View Entities',
    noData: 'No Data',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    results: 'results',
    previous: 'Previous',
    next: 'Next',
  },
  ar: {
    title: 'المخاطر المحددة',
    searchPlaceholder: 'البحث بمعرف الخطر أو الاسم...',
    colRiskId: 'معرف الخطر',
    colRiskName: 'اسم الخطر',
    colRiskLevel: 'مستوى الخطر',
    colDetermination: 'طريقة التحديد',
    colAutomationStatus: 'حالة الأتمتة',
    colActions: 'الإجراءات',
    manual: 'يدوي',
    automated: 'مؤتمت',
    active: 'نشط',
    inactive: 'غير نشط',
    viewDetails: 'عرض التفاصيل',
    configureAutomation: 'تكوين الأتمتة',
    editQuery: 'تعديل الاستعلام',
    activateQuery: 'تفعيل الاستعلام',
    deactivateQuery: 'تعطيل الاستعلام',
    viewEntities: 'عرض الكيانات',
    noData: 'لا توجد بيانات',
    showing: 'عرض',
    to: 'إلى',
    of: 'من',
    results: 'نتائج',
    previous: 'السابق',
    next: 'التالي',
  },
};

export function DefinedRisksPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const tt = translations[language] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  // Click-outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter risks by riskId and riskName
  const filteredRisks = mockRisks.filter(
    (risk) =>
      risk.riskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      risk.riskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredRisks.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRisks = filteredRisks.slice(startIndex, endIndex);

  const handleToggleStatus = (id: string) => {
    console.log('Toggle automation status for:', id);
  };

  const getRiskLevelBadge = (level: DefinedRisk['riskLevel']) => {
    const styles: Record<DefinedRisk['riskLevel'], string> = {
      Critical: 'bg-red-50 text-red-700 border-red-200',
      High: 'bg-orange-50 text-orange-700 border-orange-200',
      Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Low: 'bg-green-50 text-green-700 border-green-200',
    };
    return (
      <Badge className={styles[level]} style={{ fontSize: 'var(--text-xs)' }}>
        {level}
      </Badge>
    );
  };

  const getDeterminationLabel = (determination: DefinedRisk['determination']) => {
    return determination === 'automated' ? tt.automated : tt.manual;
  };

  const getAutomationStatusBadge = (risk: DefinedRisk) => {
    if (risk.determination === 'manual') {
      return (
        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          -
        </span>
      );
    }
    if (risk.automationStatus === 'active') {
      return (
        <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
          {tt.active}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
        {tt.inactive}
      </Badge>
    );
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="mb-8">
        <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <ShieldAlert className="w-8 h-8 text-primary" />
          <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
            {tt.title}
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            placeholder={tt.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${
              isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'
            }`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      {paginatedRisks.length > 0 ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colRiskId}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colRiskName}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colRiskLevel}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colDetermination}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colAutomationStatus}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {tt.colActions}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedRisks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {risk.riskId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {risk.riskName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getRiskLevelBadge(risk.riskLevel)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {getDeterminationLabel(risk.determination)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getAutomationStatusBadge(risk)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" ref={openMenuId === risk.id ? menuRef : undefined}>
                        <button
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          onClick={() => setOpenMenuId(openMenuId === risk.id ? null : risk.id)}
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {openMenuId === risk.id && (
                          <div className={`absolute z-50 mt-1 w-56 rounded-md border border-border bg-white shadow-lg ${isRTL ? 'left-0' : 'right-0'}`}>
                            <div className="py-1">
                              {/* View Details */}
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  console.log('View details:', risk.id);
                                }}
                              >
                                {tt.viewDetails}
                              </button>

                              {/* Configure Automation (manual risks) */}
                              {risk.determination === 'manual' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    navigate(`/admin/risks/${risk.id}/configure-automation`);
                                  }}
                                >
                                  {tt.configureAutomation}
                                </button>
                              )}

                              {/* Edit Query (automated risks) */}
                              {risk.determination === 'automated' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    navigate(`/admin/risks/${risk.id}/configure-automation`);
                                  }}
                                >
                                  {tt.editQuery}
                                </button>
                              )}

                              {/* Activate Query (automated + inactive) */}
                              {risk.determination === 'automated' && risk.automationStatus === 'inactive' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    handleToggleStatus(risk.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {tt.activateQuery}
                                </button>
                              )}

                              {/* Deactivate Query (automated + active) */}
                              {risk.determination === 'automated' && risk.automationStatus === 'active' && (
                                <button
                                  className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                  onClick={() => {
                                    handleToggleStatus(risk.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {tt.deactivateQuery}
                                </button>
                              )}

                              {/* View Entities */}
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  setOpenMenuId(null);
                                  console.log('View entities:', risk.id);
                                }}
                              >
                                {tt.viewEntities}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={`flex items-center justify-between px-6 py-4 border-t border-border ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <div className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              {tt.showing} {startIndex + 1} {tt.to} {Math.min(endIndex, filteredRisks.length)} {tt.of} {filteredRisks.length} {tt.results}
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded-lg bg-white hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {tt.previous}
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
                {tt.next}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <ShieldAlert className="w-12 h-12 text-muted-foreground" />
            <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              {tt.noData}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
