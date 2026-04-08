import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useLanguage } from '@/app/contexts/language-context';

interface Question {
  id: string;
  questionId: string;
  questionText: string;
  answerType: string;
  automationStatus: 'manual' | 'automated' | 'pending';
  businessDomain: string;
  queryId: string | null;
}

const mockQuestions: Question[] = [
  { id: '1', questionId: 'Q-001', questionText: 'Does the organization have a financial audit policy?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Finance', queryId: 'QRY-001' },
  { id: '2', questionId: 'Q-002', questionText: 'Is there a documented risk management framework?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Compliance', queryId: 'QRY-005' },
  { id: '3', questionId: 'Q-003', questionText: 'What is the total number of active employees?', answerType: 'Numeric', automationStatus: 'manual', businessDomain: 'HR', queryId: null },
  { id: '4', questionId: 'Q-004', questionText: 'Does the entity maintain a customer complaints log?', answerType: 'Yes/No', automationStatus: 'manual', businessDomain: 'CRM', queryId: null },
  { id: '5', questionId: 'Q-005', questionText: 'What percentage of revenue is allocated to training?', answerType: 'Percentage', automationStatus: 'pending', businessDomain: 'Finance', queryId: null },
  { id: '6', questionId: 'Q-006', questionText: 'Is the data retention policy compliant with regulations?', answerType: 'Yes/No', automationStatus: 'automated', businessDomain: 'Compliance', queryId: 'QRY-003' },
  { id: '7', questionId: 'Q-007', questionText: 'Does the organization conduct annual security audits?', answerType: 'Yes/No', automationStatus: 'manual', businessDomain: 'Operations', queryId: null },
  { id: '8', questionId: 'Q-008', questionText: 'What is the average response time for support tickets?', answerType: 'Numeric', automationStatus: 'manual', businessDomain: 'CRM', queryId: null },
];

export function QuestionAutomationPage() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
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

  // Filter questions by questionId and questionText
  const filteredQuestions = mockQuestions.filter((question) =>
    question.questionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

  const handleConfigureAutomation = (id: string) => {
    navigate(`/admin/questions/${id}/configure-automation`);
  };

  const handleViewQuery = (id: string) => {
    const question = mockQuestions.find((q) => q.id === id);
    if (question?.queryId) {
      navigate(`/admin/queries/${question.queryId}`);
    }
  };

  const handleEditQuery = (id: string) => {
    const question = mockQuestions.find((q) => q.id === id);
    if (question?.queryId) {
      navigate(`/admin/queries/${question.queryId}/edit`);
    }
  };

  const handleDeactivate = (id: string) => {
    console.log('Deactivate automation for:', id);
  };

  const getStatusBadge = (status: Question['automationStatus']) => {
    switch (status) {
      case 'automated':
        return (
          <Badge className="bg-success-light text-success border-success-border" style={{ fontSize: 'var(--text-xs)' }}>
            <Zap className="w-3 h-3" />
            {t('questionAutomation.status.automated')}
          </Badge>
        );
      case 'manual':
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            {t('questionAutomation.status.manual')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200" style={{ fontSize: 'var(--text-xs)' }}>
            {t('questionAutomation.status.pending')}
          </Badge>
        );
    }
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('questionAutomation.title')}
        </h1>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="text"
            placeholder={t('questionAutomation.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
      </div>

      {/* Data Table */}
      {paginatedQuestions.length > 0 ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.questionId')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.questionText')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.answerType')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.automationStatus')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.businessDomain')}
                    </span>
                  </th>
                  <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                      {t('questionAutomation.actions')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {question.questionId}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <span className="text-foreground line-clamp-2" style={{ fontSize: 'var(--text-sm)' }}>
                        {question.questionText}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {question.answerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(question.automationStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {question.businessDomain}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" ref={openMenuId === question.id ? menuRef : undefined}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setOpenMenuId(openMenuId === question.id ? null : question.id)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {openMenuId === question.id && (
                          <div className={`absolute z-50 mt-1 w-56 rounded-md border border-border bg-white shadow-lg ${isRTL ? 'left-0' : 'right-0'}`}>
                            <div className="py-1">
                              <button
                                className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                onClick={() => {
                                  handleConfigureAutomation(question.id);
                                  setOpenMenuId(null);
                                }}
                              >
                                {t('questionAutomation.configureAutomation')}
                              </button>
                              {question.automationStatus === 'automated' && (
                                <>
                                  <button
                                    className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                    onClick={() => {
                                      handleViewQuery(question.id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    {t('questionAutomation.viewQuery')}
                                  </button>
                                  <button
                                    className={`w-full px-4 py-2 text-sm text-foreground hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                    onClick={() => {
                                      handleEditQuery(question.id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    {t('questionAutomation.editQuery')}
                                  </button>
                                  <button
                                    className={`w-full px-4 py-2 text-sm text-destructive hover:bg-muted ${isRTL ? 'text-right' : 'text-left'}`}
                                    onClick={() => {
                                      handleDeactivate(question.id);
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    {t('questionAutomation.deactivate')}
                                  </button>
                                </>
                              )}
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
              {t('pagination.showing')} {startIndex + 1} {t('pagination.to')} {Math.min(endIndex, filteredQuestions.length)} {t('pagination.of')} {filteredQuestions.length} {t('pagination.results')}
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {t('pagination.previous')}
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-9"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {t('pagination.next')}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              {t('questionAutomation.noData')}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
