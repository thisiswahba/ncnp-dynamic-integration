import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/language-context';
import {
  AutoReplySettingsDialog,
  type AutoReplyQuestion,
} from '@/app/components/auto-reply-settings-dialog';

interface Question {
  id: string;
  questionId: string;
  questionTitle: string;
  dateAdded: string;
  createdBy: string;
  dataSource: string;
  automationType: 'manual' | 'auto';
  answerType: string;
  businessDomain: string;
  queryId: string | null;
  fullTitle: string;
  subQuestions?: { id: string; title: string }[];
  answers: { id: string; text: string; weight: number }[];
}

const mockQuestions: Question[] = [
  {
    id: '1',
    questionId: '#1001',
    questionTitle: 'Is there an increase in the num....?',
    fullTitle: 'Was the Board of Directors meeting held on 01/01/2025?',
    dateAdded: '24/11/2024',
    createdBy: 'Mohamed S.',
    dataSource: 'Tax Agency',
    automationType: 'manual',
    answerType: 'Yes/No',
    businessDomain: 'Finance',
    queryId: null,
    subQuestions: [
      { id: 's1', title: 'Were all required members in attendance?' },
      { id: 's2', title: 'Were the minutes of the meeting documented?' },
    ],
    answers: [
      { id: 'a1', text: 'Yes, the meeting was held as scheduled.', weight: 100 },
      { id: 'a2', text: 'No, the meeting was not held as scheduled.', weight: 20 },
    ],
  },
  {
    id: '2',
    questionId: '#1002',
    questionTitle: 'Approximately how many years ...?',
    fullTitle: 'Approximately how many years has the organization been operating?',
    dateAdded: '24/11/2024',
    createdBy: 'Mohamed S.',
    dataSource: 'Tax Agency',
    automationType: 'auto',
    answerType: 'Numeric',
    businessDomain: 'Finance',
    queryId: 'QRY-001',
    answers: [
      { id: 'a3', text: 'Less than 2 years', weight: 10 },
      { id: 'a4', text: '2 - 5 years', weight: 40 },
      { id: 'a5', text: 'More than 5 years', weight: 100 },
    ],
  },
  {
    id: '3',
    questionId: '#1003',
    questionTitle: 'Approximately how many years of ...?',
    fullTitle: 'Approximately how many years of experience does the management have?',
    dateAdded: '24/11/2024',
    createdBy: 'Mohamed S.',
    dataSource: 'MFA',
    automationType: 'manual',
    answerType: 'Numeric',
    businessDomain: 'Compliance',
    queryId: null,
    answers: [
      { id: 'a6', text: 'Less than 3 years', weight: 20 },
      { id: 'a7', text: '3 - 7 years', weight: 50 },
      { id: 'a8', text: 'More than 7 years', weight: 100 },
    ],
  },
  {
    id: '4',
    questionId: '#1004',
    questionTitle: 'Approximately how many years of ...?',
    fullTitle: 'Approximately how many years of compliance has been maintained?',
    dateAdded: '24/11/2024',
    createdBy: 'Mohamed S.',
    dataSource: 'MFA',
    automationType: 'auto',
    answerType: 'Numeric',
    businessDomain: 'Compliance',
    queryId: 'QRY-002',
    answers: [
      { id: 'a9', text: 'Less than 1 year', weight: 0 },
      { id: 'a10', text: '1 - 3 years', weight: 50 },
      { id: 'a11', text: 'More than 3 years', weight: 100 },
    ],
  },
  {
    id: '5',
    questionId: '#1005',
    questionTitle: 'Approximately how many years of ...?',
    fullTitle: 'Approximately how many years of reporting has been done?',
    dateAdded: '24/11/2024',
    createdBy: 'Mohamed S.',
    dataSource: 'NCNP',
    automationType: 'manual',
    answerType: 'Numeric',
    businessDomain: 'Operations',
    queryId: null,
    answers: [
      { id: 'a12', text: 'Less than 1 year', weight: 0 },
      { id: 'a13', text: '1 - 3 years', weight: 50 },
      { id: 'a14', text: 'More than 3 years', weight: 100 },
    ],
  },
];

const TOTAL_ENTRIES = 300;

export function QuestionAutomationPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<AutoReplyQuestion | null>(null);

  const filteredQuestions = mockQuestions.filter((question) =>
    question.questionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.questionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = 60;

  const handleActivateAutoReplies = (question: Question) => {
    setActiveQuestion({
      id: question.id,
      title: question.fullTitle,
      subQuestions: question.subQuestions,
      answers: question.answers,
      automated: question.automationType === 'auto',
    });
    setDialogOpen(true);
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredQuestions.map((q) => q.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allSelected = filteredQuestions.length > 0 && selectedIds.size === filteredQuestions.length;

  const getAutomationBadge = (type: Question['automationType']) => {
    if (type === 'auto') {
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200" style={{ fontSize: 'var(--text-xs)' }}>
          {t('questionAutomation.type.auto')}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200" style={{ fontSize: 'var(--text-xs)' }}>
        {t('questionAutomation.type.manual')}
      </Badge>
    );
  };

  const pageNumbers = () => {
    const pages: (number | string)[] = [];
    pages.push(totalPages);
    pages.push('...');
    pages.push(3);
    pages.push(2);
    pages.push(1);
    return pages;
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {t('questionAutomation.title')}
        </h1>
      </div>

      {/* Tab */}
      <div className="border-b border-border mb-6">
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            className="px-1 py-3 border-b-2 border-primary text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {t('questionAutomation.tab.questionBank')}
          </button>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            placeholder={t('questionAutomation.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full h-12 bg-white border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-colors ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <button
          type="button"
          className="h-12 px-6 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {t('questionAutomation.searchButton')}
        </button>
        <button
          type="button"
          className={`h-12 px-4 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-foreground ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Filter className="w-4 h-4" />
          <span>{t('questionAutomation.filter')}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Entries count */}
      <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t('questionAutomation.entriesInTable')}:{' '}
        </span>
        <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {TOTAL_ENTRIES}
        </span>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-4 w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                  />
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.questionId')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.questionTitle')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.dateAdded')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.createdBy')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.dataSource')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.automationType')}
                  </span>
                </th>
                <th className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {t('questionAutomation.action')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedIds.has(question.id)}
                      onCheckedChange={() => toggleSelect(question.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                      {question.questionId}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {question.questionTitle}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {question.dateAdded}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {question.createdBy}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200" style={{ fontSize: 'var(--text-xs)' }}>
                      {question.dataSource}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {getAutomationBadge(question.automationType)}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handleActivateAutoReplies(question)}
                      className="bg-primary hover:bg-primary/90 text-white h-9"
                      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                    >
                      {t('questionAutomation.activateAutoReplies')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6" dir="ltr">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="h-9 w-9"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
        </Button>
        {pageNumbers().map((page, idx) => (
          <Button
            key={`${page}-${idx}`}
            variant={typeof page === 'number' && page === currentPage ? 'default' : 'ghost'}
            size="sm"
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
            className={`h-9 min-w-9 px-3 ${
              typeof page === 'number' && page === currentPage
                ? 'bg-transparent text-primary border-b-2 border-primary rounded-none hover:bg-transparent'
                : ''
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: typeof page === 'number' && page === currentPage ? 600 : 400 }}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="h-9 w-9"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </Button>
      </div>

      <AutoReplySettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        question={activeQuestion}
      />
    </div>
  );
}
