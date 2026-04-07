import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Tag, Calendar, Building2, Layers, Heart } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  questionGroups?: string[];
  classifications?: string[];
  entityType?: string;
  entitySize?: string;
  lastModified?: string;
}

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'ما هي معايير الحوكمة المطلوبة للجهات الحكومية؟',
    answer: 'معايير الحوكمة المطلوبة تشمل الشفافية في الإفصاح المالي، المساءلة الإدارية، وضوح الأدوار والمسؤوليات، تطبيق معايير الأداء، وآليات الرقابة الداخلية. يجب على جميع الجهات الحكومية الالتزام بهذه المعايير وفقاً للائحة التنفيذية الصادرة من الجهات الرقابية.',
    category: 'الحوكمة',
    tags: ['معايير', 'حوكمة', 'جهات حكومية'],
    questionGroups: ['الحوكمة', 'الامتثال'],
    classifications: ['حوكمة عامة', 'معايير'],
    entityType: 'جهة حكومية',
    entitySize: 'كبيرة',
    lastModified: '٢٠٢٤/٠١/٢٠'
  },
  {
    id: '2',
    question: 'كيف يمكنني إعداد التقارير المالية وفقاً للمعايير المحاسبية؟',
    answer: 'لإعداد التقارير المالية وفقاً للمعايير المحاسبية، يجب اتباع الخطوات التالية: 1) جمع البيانات المالية من جميع الأقسام، 2) تصنيف المعاملات وفقاً للمعايير المحاسبية، 3) إعداد الميزانية والقوائم المالية، 4) مراجعة البيانات من قبل المدقق الداخلي، 5) الحصول على الموافقات اللازمة قبل النشر.',
    category: 'التقارير المالية',
    tags: ['تقارير', 'محاسبة', 'معايير'],
    questionGroups: ['التقارير المالية', 'المعايير المحاسبية'],
    classifications: ['تقارير مالية', 'محاسبة'],
    entityType: 'جهة خاصة',
    entitySize: 'متوسطة',
    lastModified: '٢٠٢٤/٠١/١٨'
  },
  {
    id: '3',
    question: 'ما هي المدة الزمنية المطلوبة لتقديم تقييم المخاطر؟',
    answer: 'يجب تقديم تقييم المخاطر بشكل ربع سنوي للمخاطر التشغيلية، وبشكل نصف سنوي للمخاطر المالية الاستراتيجية. في حالة حدوث أي تغييرات جوهرية أو مخاطر طارئة، يجب تقديم تقرير استثنائي فوري للجهات المعنية خلال 48 ساعة من اكتشاف المخاطر.',
    category: 'إدارة المخاطر',
    tags: ['مخاطر', 'مواعيد', 'تقييم'],
    questionGroups: ['المخاطر', 'المواعيد'],
    classifications: ['إدارة المخاطر', 'تقييم'],
    entityType: 'جهة حكومية',
    entitySize: 'صغيرة',
    lastModified: '٢٠٢٤/٠١/٢٥'
  },
  {
    id: '4',
    question: 'ما هي متطلبات الشفافية في الإفصاح المالي؟',
    answer: 'تتطلب الشفافية في الإفصاح المالي نشر التقارير المالية السنوية والربع سنوية، الإفصاح عن المعاملات المالية الكبيرة، نشر تقارير الأداء المالي، والإفصاح عن أي التزامات أو ديون مستقبلية. يجب أن تكون جميع المعلومات دقيقة ومحدثة ومتاحة لجميع أصحاب المصلحة.',
    category: 'الشفافية',
    tags: ['شفافية', 'إفصاح', 'تقارير'],
    questionGroups: ['الشفافية', 'التقارير'],
    classifications: ['شفافية', 'إفصاح مالي'],
    entityType: 'جمعية غير ربحية',
    entitySize: 'متوسطة',
    lastModified: '٢٠٢٤/٠١/١٥'
  },
  {
    id: '5',
    question: 'كيف يتم تقييم الأداء المؤسسي؟',
    answer: 'يتم تقييم الأداء المؤسسي من خلال عدة مؤشرات رئيسية: 1) مؤشرات الأداء المالي (ROI, ROE)، 2) مؤشرات الكفاءة التشغيلية، 3) مستوى تحقيق الأهداف الاستراتيجية، 4) رضا أصحاب المصلحة، 5) الالتزام بمعايير الحوكمة. يتم إجراء التقييم بشكل ربع سنوي مع مراجعة شاملة سنوية.',
    category: 'تقييم الأداء',
    tags: ['أداء', 'تقييم', 'مؤشرات'],
    questionGroups: ['تقييم الأداء', 'القياس'],
    classifications: ['أداء مؤسسي', 'مؤشرات'],
    entityType: 'جهة حكومية',
    entitySize: 'كبيرة',
    lastModified: '٢٠٢٣/١٢/٢٨'
  },
  {
    id: '6',
    question: 'ما هو دور لجنة التدقيق الداخلي؟',
    answer: 'لجنة التدقيق الداخلي مسؤولة عن مراجعة العمليات المالية والإدارية، التحقق من الالتزام بالسياسات والإجراءات، تقييم فعالية أنظمة الرقابة الداخلية، متابعة تنفيذ التوصيات، وتقديم تقارير دورية لمجلس الإدارة. تجتمع اللجنة بشكل شهري وتصدر تقريراً ربع سنوياً.',
    category: 'التدقيق',
    tags: ['تدقيق', 'رقابة', 'لجان'],
    questionGroups: ['التدقيق', 'الرقابة'],
    classifications: ['تدقيق داخلي', 'رقابة'],
    entityType: 'جهة حكومية',
    entitySize: 'متوسطة',
    lastModified: '٢٠٢٤/٠٢/٠٥'
  },
  {
    id: '7',
    question: 'كيف يمكن الإبلاغ عن المخالفات المالية؟',
    answer: 'يمكن الإبلاغ عن المخالفات المالية من خلال عدة قنوات: 1) نظام البلاغات الإلكتروني المخصص، 2) البريد الإلكتروني الرسمي للجنة التدقيق، 3) الخط الساخن المتاح على مدار الساعة، 4) تقديم بلاغ مكتوب مباشرة لرئيس لجنة التدقيق. جميع البلاغات سرية ويتم التعامل معها بأعلى درجات الخصوصية.',
    category: 'الامتثال',
    tags: ['مخالفات', 'بلاغات', 'سرية'],
    questionGroups: ['الامتثال', 'البلاغات'],
    classifications: ['امتثال', 'مخالفات مالية'],
    entityType: 'جهة خاصة',
    entitySize: 'كبيرة',
    lastModified: '٢٠٢٤/٠٢/١٠'
  },
  {
    id: '8',
    question: 'ما هي الوثائق المطلوبة لإعداد الميزانية السنوية؟',
    answer: 'الوثائق المطلوبة تشمل: 1) البيانات المالية للسنة السابقة، 2) خطة العمل والأهداف الاستراتيجية، 3) تقديرات الإيرادات المتوقعة، 4) قائمة بالمشاريع والنفقات المخطط لها، 5) تقارير الأداء المالي للثلاث سنوات الماضية، 6) دراسات الجدوى للمشاريع الجديدة، 7) موافقات الجهات المعنية.',
    category: 'الميزانية',
    tags: ['ميزانية', 'وثائق', 'تخطيط'],
    questionGroups: ['الميزانية', 'التخطيط المالي'],
    classifications: ['ميزانية', 'تخطيط'],
    entityType: 'جهة حكومية',
    entitySize: 'صغيرة',
    lastModified: '٢٠٢٤/٠١/٣٠'
  }
];

export function EntityFAQListing({ showOnlyFavorites = false }: { showOnlyFavorites?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem('faqFavorites');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(mockFAQs.map(faq => faq.category)))];

  // Filter FAQs based on search, category, and favorites
  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesFavorites = !showOnlyFavorites || favorites.has(faq.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const toggleFAQ = (id: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQs(newExpanded);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    // Save favorites to localStorage
    localStorage.setItem('faqFavorites', JSON.stringify(Array.from(newFavorites)));
  };

  return (
    <div className="px-8 py-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          الأسئلة الشائعة
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          ابحث عن إجابات للأسئلة الشائعة حول الحوكمة والامتثال
        </p>
      </div>

      {/* Category Tabs - Improved Design */}
      <div className="mb-6">
        <div className="flex gap-1 border-b border-border">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 transition-all border-b-2 ${
                selectedCategory === category
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
              style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
            >
              {category === 'all' ? 'الكل' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
          {filteredFAQs.length} {filteredFAQs.length === 1 ? 'سؤال' : 'أسئلة'}
        </span>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedFAQs.has(faq.id);
            
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-lg border transition-all ${
                  isExpanded 
                    ? 'border-primary shadow-md' 
                    : 'border-border hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                {/* Question Header */}
                <div className="w-full px-6 py-5 flex items-start gap-4 text-right">
                  {/* Icon */}
                  <div className={`p-2.5 rounded-lg flex-shrink-0 transition-colors ${
                    isExpanded ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>

                  {/* Content - Clickable to expand */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex-1 min-w-0 text-right"
                  >
                    {/* Question */}
                    <h3 className="text-foreground text-right mb-3" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                      {faq.question}
                    </h3>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-2">
                      {/* Question Groups */}
                      {faq.questionGroups?.slice(0, 2).map((group, i) => (
                        <span 
                          key={`group-${i}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          <Layers className="w-3 h-3" />
                          {group}
                        </span>
                      ))}
                      {(faq.questionGroups?.length || 0) > 2 && (
                        <span 
                          className="inline-flex items-center px-2.5 py-1 bg-muted text-muted-foreground rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          +{(faq.questionGroups?.length || 0) - 2}
                        </span>
                      )}
                      
                      {/* Classifications */}
                      {faq.classifications?.slice(0, 1).map((classification, i) => (
                        <span 
                          key={`classification-${i}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          <Tag className="w-3 h-3" />
                          {classification}
                        </span>
                      ))}
                      {(faq.classifications?.length || 0) > 1 && (
                        <span 
                          className="inline-flex items-center px-2.5 py-1 bg-muted text-muted-foreground rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          +{(faq.classifications?.length || 0) - 1}
                        </span>
                      )}
                      
                      {/* Entity Type */}
                      {faq.entityType && (
                        <span 
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          <Building2 className="w-3 h-3" />
                          {faq.entityType}
                        </span>
                      )}
                      
                      {/* Entity Size */}
                      {faq.entitySize && (
                        <span 
                          className="px-2.5 py-1 bg-green-50 text-green-600 rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          {faq.entitySize}
                        </span>
                      )}
                      
                      {/* Last Updated Date */}
                      {faq.lastModified && (
                        <span 
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-md"
                          style={{ fontSize: 'var(--text-xs)', fontWeight: 500 }}
                        >
                          <Calendar className="w-3 h-3" />
                          {faq.lastModified}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(faq.id, e)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                    aria-label={favorites.has(faq.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites.has(faq.id) 
                          ? 'fill-red-600 text-red-600' 
                          : 'text-muted-foreground hover:text-red-600'
                      }`}
                    />
                  </button>

                  {/* Chevron - Clickable to expand */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex-shrink-0 pt-1"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Answer Content (Expanded) */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border">
                    {/* Answer Text */}
                    <div className="pt-5 pb-6">
                      <p className="text-foreground text-right leading-relaxed" style={{ fontSize: 'var(--text-sm)', lineHeight: '1.8' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg border border-border p-16 text-center">
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
                لم يتم العثور على أسئلة
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                جرب تعديل معايير البحث أو اختيار فئة مختلفة
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}