import { useState, useEffect } from 'react';
import { X, Search, Plus, Trash2, BookOpen, HelpCircle, FileText, AlertCircle } from 'lucide-react';

// Types for linked content
export interface LinkedContent {
  id: string;
  contentType: 'rules-guidelines' | 'evaluation-forms' | 'faq';
  contentName: string;
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
  level5?: string;
  questionTitle?: string;
  questionId?: string;
}

interface QuestionLinkingModalProps {
  onClose: () => void;
  onSave: (linkedItems: LinkedContent[]) => void;
  existingLinks?: LinkedContent[];
}

// Mock data - Replace with real data from your API
const mockContentData = {
  'rules-guidelines': [
    { id: 'rg1', name: 'دليل الحوكمة المؤسسية', hasLevels: true, hasQuestions: true },
    { id: 'rg2', name: 'دليل الشفافية والمساءلة', hasLevels: true, hasQuestions: false },
    { id: 'rg3', name: 'دليل الموارد البشرية', hasLevels: true, hasQuestions: true },
  ],
  'evaluation-forms': [
    { id: 'ef1', name: 'نموذج تقييم الأداء المؤسسي', hasLevels: true, hasQuestions: true },
    { id: 'ef2', name: 'نموذج التقييم الذاتي', hasLevels: true, hasQuestions: true },
  ],
  'faq': [
    { id: 'faq1', name: 'أسئلة شائعة - الحوكمة', hasLevels: false, hasQuestions: true },
    { id: 'faq2', name: 'أسئلة شائعة - التمويل', hasLevels: false, hasQuestions: true },
    { id: 'faq3', name: 'أسئلة شائعة - الشفافية', hasLevels: false, hasQuestions: true },
  ]
};

const mockLevels = {
  rg1: {
    level1: ['المعيار الأول', 'المعيار الثاني', 'المعيار الثالث'],
    level2: ['المؤشر 1.1', 'المؤشر 1.2', 'المؤشر 1.3'],
    level3: ['الممارسة 1.1.1', 'الممارسة 1.1.2'],
    level4: ['التفصيل الأول', 'التفصيل الثاني'],
    level5: ['البند الأول', 'البند الثاني'],
  },
  ef1: {
    level1: ['المحور الأول', 'المحور الثاني'],
    level2: ['البند 1.1', 'البند 1.2'],
  }
};

const mockQuestions = {
  rg1: [
    { id: 'q1', title: 'ما هي آليات الحوكمة المتبعة؟' },
    { id: 'q2', title: 'كيف يتم اختيار أعضاء مجلس الإدارة؟' },
  ],
  faq1: [
    { id: 'q1', title: 'ما المقصود بالحوكمة المؤسسية؟' },
    { id: 'q2', title: 'ما هي متطلبات تشكيل مجلس الإدارة؟' },
  ]
};

export function QuestionLinkingModal({ onClose, onSave, existingLinks = [] }: QuestionLinkingModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contentBranch, setContentBranch] = useState<'rules-guidelines' | 'evaluation-forms' | 'faq' | ''>('');
  const [selectedContent, setSelectedContent] = useState('');
  const [level1, setLevel1] = useState('');
  const [level2, setLevel2] = useState('');
  const [level3, setLevel3] = useState('');
  const [level4, setLevel4] = useState('');
  const [level5, setLevel5] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [linkedItems, setLinkedItems] = useState<LinkedContent[]>(existingLinks);
  const [duplicateError, setDuplicateError] = useState(false);

  // Reset dependent fields when branch changes
  useEffect(() => {
    setSelectedContent('');
    setLevel1('');
    setLevel2('');
    setLevel3('');
    setLevel4('');
    setLevel5('');
    setSelectedQuestion('');
    setDuplicateError(false);
  }, [contentBranch]);

  // Reset levels when content changes
  useEffect(() => {
    setLevel1('');
    setLevel2('');
    setLevel3('');
    setLevel4('');
    setLevel5('');
    setSelectedQuestion('');
    setDuplicateError(false);
  }, [selectedContent]);

  // Reset dependent levels
  useEffect(() => {
    setLevel2('');
    setLevel3('');
    setLevel4('');
    setLevel5('');
  }, [level1]);

  useEffect(() => {
    setLevel3('');
    setLevel4('');
    setLevel5('');
  }, [level2]);

  useEffect(() => {
    setLevel4('');
    setLevel5('');
  }, [level3]);

  useEffect(() => {
    setLevel5('');
  }, [level4]);

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'rules-guidelines':
        return 'دليل القواعد والإرشادات';
      case 'evaluation-forms':
        return 'نماذج التقييم';
      case 'faq':
        return 'الأسئلة الشائعة (FAQ)';
      default:
        return '';
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'rules-guidelines':
        return <BookOpen className="w-4 h-4" />;
      case 'evaluation-forms':
        return <FileText className="w-4 h-4" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const checkDuplicate = () => {
    const newItem = {
      contentType: contentBranch,
      contentName: selectedContent,
      level1,
      level2,
      level3,
      level4,
      level5,
      questionId: selectedQuestion,
    };

    return linkedItems.some(item => 
      item.contentType === newItem.contentType &&
      item.contentName === newItem.contentName &&
      item.level1 === newItem.level1 &&
      item.level2 === newItem.level2 &&
      item.level3 === newItem.level3 &&
      item.level4 === newItem.level4 &&
      item.level5 === newItem.level5 &&
      item.questionId === newItem.questionId
    );
  };

  const handleAddLink = () => {
    if (checkDuplicate()) {
      setDuplicateError(true);
      return;
    }

    const contentData = mockContentData[contentBranch as keyof typeof mockContentData]?.find(c => c.id === selectedContent);
    const questionData = selectedQuestion && mockQuestions[selectedContent as keyof typeof mockQuestions]?.find(q => q.id === selectedQuestion);

    const newLink: LinkedContent = {
      id: Date.now().toString(),
      contentType: contentBranch as any,
      contentName: contentData?.name || '',
      level1: level1 || undefined,
      level2: level2 || undefined,
      level3: level3 || undefined,
      level4: level4 || undefined,
      level5: level5 || undefined,
      questionTitle: questionData?.title || undefined,
      questionId: selectedQuestion || undefined,
    };

    setLinkedItems([...linkedItems, newLink]);
    
    // Reset form
    setContentBranch('');
    setSelectedContent('');
    setLevel1('');
    setLevel2('');
    setLevel3('');
    setLevel4('');
    setLevel5('');
    setSelectedQuestion('');
    setDuplicateError(false);
  };

  const handleRemoveLink = (id: string) => {
    setLinkedItems(linkedItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave(linkedItems);
    onClose();
  };

  const isAddButtonEnabled = () => {
    if (!contentBranch || !selectedContent) return false;
    
    const contentData = mockContentData[contentBranch as keyof typeof mockContentData]?.find(c => c.id === selectedContent);
    
    // If content has levels, at least level 1 should be selected
    if (contentData?.hasLevels && !level1) return false;
    
    // If content has questions, a question should be selected
    if (contentData?.hasQuestions && !selectedQuestion) return false;
    
    return true;
  };

  const filteredContent = contentBranch ? mockContentData[contentBranch as keyof typeof mockContentData]?.filter(content => {
    if (!searchQuery) return true;
    return content.name.toLowerCase().includes(searchQuery.toLowerCase());
  }) : [];

  const showLevels = contentBranch && contentBranch !== 'faq' && selectedContent;
  const selectedContentData = selectedContent ? mockContentData[contentBranch as keyof typeof mockContentData]?.find(c => c.id === selectedContent) : null;
  const showQuestions = selectedContentData?.hasQuestions;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            ربط سؤال التقييم بمحتوى قاعدة المعرفة / الأسئلة الشائعة
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Search Box */}
            <div>
              <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                البحث
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث بالاسم أو الوسم أو التصنيف"
                  className="w-full pr-10 pl-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  style={{ fontSize: 'var(--text-base)' }}
                  dir="rtl"
                />
              </div>
            </div>

            {/* Content Branch */}
            <div>
              <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                فرع المحتوى <span className="text-red-500">*</span>
              </label>
              <select
                value={contentBranch}
                onChange={(e) => setContentBranch(e.target.value as any)}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                style={{ fontSize: 'var(--text-base)' }}
                dir="rtl"
              >
                <option value="">اختر فرع المحتوى</option>
                <option value="rules-guidelines">دليل القواعد والإرشادات</option>
                <option value="evaluation-forms">نماذج التقييم</option>
                <option value="faq">الأسئلة الشائعة (FAQ)</option>
              </select>
            </div>

            {/* Content Name */}
            <div>
              <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                اسم المحتوى <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedContent}
                onChange={(e) => setSelectedContent(e.target.value)}
                disabled={!contentBranch}
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground disabled:bg-muted disabled:cursor-not-allowed"
                style={{ fontSize: 'var(--text-base)' }}
                dir="rtl"
              >
                <option value="">اختر المحتوى</option>
                {filteredContent?.map((content) => (
                  <option key={content.id} value={content.id}>
                    {content.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selection - Only for Rules & Guidelines and Evaluation Forms */}
            {showLevels && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  تحديد المستويات
                </h3>

                {/* Level 1 */}
                <div>
                  <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    المستوى الأول <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={level1}
                    onChange={(e) => setLevel1(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    style={{ fontSize: 'var(--text-base)' }}
                    dir="rtl"
                  >
                    <option value="">اختر المستوى الأول</option>
                    {mockLevels[selectedContent as keyof typeof mockLevels]?.level1?.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Level 2 */}
                {level1 && mockLevels[selectedContent as keyof typeof mockLevels]?.level2 && (
                  <div>
                    <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      المستوى الثاني
                    </label>
                    <select
                      value={level2}
                      onChange={(e) => setLevel2(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-base)' }}
                      dir="rtl"
                    >
                      <option value="">اختر المستوى الثاني</option>
                      {mockLevels[selectedContent as keyof typeof mockLevels]?.level2?.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Level 3 */}
                {level2 && mockLevels[selectedContent as keyof typeof mockLevels]?.level3 && (
                  <div>
                    <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      المستوى الثالث
                    </label>
                    <select
                      value={level3}
                      onChange={(e) => setLevel3(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-base)' }}
                      dir="rtl"
                    >
                      <option value="">اختر المستوى الثالث</option>
                      {mockLevels[selectedContent as keyof typeof mockLevels]?.level3?.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Level 4 */}
                {level3 && mockLevels[selectedContent as keyof typeof mockLevels]?.level4 && (
                  <div>
                    <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      المستوى الرابع
                    </label>
                    <select
                      value={level4}
                      onChange={(e) => setLevel4(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-base)' }}
                      dir="rtl"
                    >
                      <option value="">اختر المستوى الرابع</option>
                      {mockLevels[selectedContent as keyof typeof mockLevels]?.level4?.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Level 5 */}
                {level4 && mockLevels[selectedContent as keyof typeof mockLevels]?.level5 && (
                  <div>
                    <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      المستوى الخامس
                    </label>
                    <select
                      value={level5}
                      onChange={(e) => setLevel5(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      style={{ fontSize: 'var(--text-base)' }}
                      dir="rtl"
                    >
                      <option value="">اختر المستوى الخامس</option>
                      {mockLevels[selectedContent as keyof typeof mockLevels]?.level5?.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Question Selection */}
            {showQuestions && (
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  السؤال <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedQuestion}
                  onChange={(e) => setSelectedQuestion(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  style={{ fontSize: 'var(--text-base)' }}
                  dir="rtl"
                >
                  <option value="">اختر السؤال</option>
                  {mockQuestions[selectedContent as keyof typeof mockQuestions]?.map((question) => (
                    <option key={question.id} value={question.id}>
                      {question.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Duplicate Error */}
            {duplicateError && (
              <div className="flex items-start gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-yellow-800" style={{ fontSize: 'var(--text-sm)' }}>
                  ⚠️ هذا المحتوى مرتبط مسبقًا بهذا السؤال
                </p>
              </div>
            )}

            {/* Add Link Button */}
            <div>
              <button
                onClick={handleAddLink}
                disabled={!isAddButtonEnabled() || duplicateError}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
              >
                <Plus className="w-5 h-5" />
                إضافة الربط
              </button>
            </div>

            {/* Linked Items List */}
            {linkedItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-foreground pb-2 border-b border-border" style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                  المحتوى المرتبط بهذا السؤال
                </h3>

                <div className="space-y-3">
                  {linkedItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start gap-4 p-4 bg-white border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      {/* Icon */}
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        {getContentIcon(item.contentType)}
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span 
                                className="px-2 py-1 bg-primary/10 text-primary rounded"
                                style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                              >
                                {getContentTypeLabel(item.contentType)}
                              </span>
                            </div>
                            <h4 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                              {item.contentName}
                            </h4>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveLink(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            aria-label="حذف الربط"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-600" />
                          </button>
                        </div>

                        {/* Levels */}
                        {(item.level1 || item.level2 || item.level3 || item.level4 || item.level5) && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.level1 && (
                              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                {item.level1}
                              </span>
                            )}
                            {item.level2 && (
                              <>
                                <span className="text-muted-foreground">{'>'}</span>
                                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {item.level2}
                                </span>
                              </>
                            )}
                            {item.level3 && (
                              <>
                                <span className="text-muted-foreground">{'>'}</span>
                                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {item.level3}
                                </span>
                              </>
                            )}
                            {item.level4 && (
                              <>
                                <span className="text-muted-foreground">{'>'}</span>
                                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {item.level4}
                                </span>
                              </>
                            )}
                            {item.level5 && (
                              <>
                                <span className="text-muted-foreground">{'>'}</span>
                                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {item.level5}
                                </span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Question */}
                        {item.questionTitle && (
                          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            السؤال: {item.questionTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
          >
            حفظ الروابط
          </button>
        </div>
      </div>
    </div>
  );
}
