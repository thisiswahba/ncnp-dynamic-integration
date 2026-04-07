import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, FileText, Type, AlignLeft, List as ListIcon, Table2, Download, Star } from 'lucide-react';

// Mock data structure matching the form builder
const mockPreviewData = {
  title: 'الدليل الشامل للحوكمة والشفافية',
  registrationNumber: 'KB-2024-001',
  createdBy: 'أحمد محمد',
  date: '2024/01/15',
  criteria: [
    {
      id: '1',
      title: 'البند الأول: مقدمة عن الحوكمة',
      status: 'completed',
      indicators: [
        {
          id: '1-1',
          title: 'نظرة عامة',
          status: 'completed',
          content: [
            { id: 'b1', type: 'heading', data: { text: 'ما هي الحوكمة؟' } },
            { id: 'b2', type: 'text', data: { text: 'الحوكمة هي مجموعة من القواعد والإجراءات والعمليات التي يتم من خلالها توجيه المنظمة وإدارتها. تشمل الحوكمة الجيدة الشفافية والمساءلة والعدالة والمسؤولية تجاه جميع أصحاب المصلحة.' } },
            { id: 'b3', type: 'list', data: { listType: 'bullet', items: ['تحديد الأدوار والمسؤوليات بوضوح', 'ضمان الشفافية في اتخاذ القرارات', 'تعزيز المساءلة على جميع المستويات', 'حماية حقوق أصحاب المصلحة'] } },
          ]
        },
        {
          id: '1-2',
          title: 'أهمية الحوكمة',
          status: 'completed',
          content: [
            { id: 'b4', type: 'heading', data: { text: 'لماذا تحتاج المنظمات إلى الحوكمة؟' } },
            { id: 'b5', type: 'text', data: { text: 'تساهم الحوكمة الفعالة في تعزيز الثقة بين المنظمة وأصحاب المصلحة، وتحسين الأداء المؤسسي، وتقليل المخاطر، وضمان الاستدامة طويلة المدى.' } },
            { id: 'b6', type: 'list', data: { listType: 'decimal', items: ['تعزيز الثقة والمصداقية', 'تحسين الأداء المؤسسي', 'إدارة المخاطر بفعالية', 'جذب الاستثمارات والتمويل'] } },
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'البند الثاني: مبادئ الحوكمة الأساسية',
      status: 'partial',
      indicators: [
        {
          id: '2-1',
          title: 'الشفافية والإفصاح',
          status: 'completed',
          content: [
            { id: 'b7', type: 'heading', data: { text: 'متطلبات الشفافية' } },
            { id: 'b8', type: 'text', data: { text: 'يجب على المنظمة توفير معلومات دقيقة وكاملة وفي الوقت المناسب عن أنشطتها المالية والإدارية لجميع أصحاب المصلحة.' } },
            { id: 'b9', type: 'table', data: { columns: ['نوع الإفصاح', 'التكرار', 'الجهة المستفيدة'], rows: [['التقارير المالية', 'سنوي', 'الجمهور العام'], ['تقارير الأداء', 'ربع سنوي', 'مجلس الإدارة'], ['تقارير الحوكمة', 'سنوي', 'الجهات الرقابية']] } },
          ]
        },
        {
          id: '2-2',
          title: 'المساءلة والمحاسبة',
          status: 'completed',
          content: [
            { id: 'b10', type: 'heading', data: { text: 'آليات المساءلة' } },
            { id: 'b11', type: 'text', data: { text: 'تتطلب المساءلة الفعالة وجود أنظمة واضحة لتحديد المسؤوليات ومراقبة الأداء وتطبيق العقوبات والمكافآت بناءً على النتائج.' } },
            { id: 'b12', type: 'list', data: { listType: 'bullet', items: ['إنشاء لجان تدقيق مستقلة', 'تطبيق مؤشرات أداء واضحة', 'إجراء مراجعات دورية', 'تفعيل آليات الإبلاغ عن المخالفات'] } },
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'البند الثالث: تطبيق الحوكمة في المنظمات',
      status: 'completed',
      indicators: [
        {
          id: '3-1',
          title: 'خطوات التطبيق',
          status: 'completed',
          content: [
            { id: 'b13', type: 'heading', data: { text: 'كيف تبدأ بتطبيق الحوكمة؟' } },
            { id: 'b14', type: 'text', data: { text: 'يتطلب تطبيق الحوكمة الفعالة اتباع منهجية منظمة تبدأ بالتقييم الذاتي وتنتهي بالتحسين المستمر.' } },
            { id: 'b15', type: 'list', data: { listType: 'decimal', items: ['تقييم الوضع الحالي للحوكمة', 'تحديد الفجوات والاحتياجات', 'وضع خطة عمل للتحسين', 'تنفيذ السياسات والإجراءات', 'المراقبة والتقييم المستمر'] } },
            { id: 'b16', type: 'table', data: { columns: ['المرحلة', 'المدة الزمنية', 'المخرجات المتوقعة'], rows: [['التقييم الأولي', '1-2 شهر', 'تقرير التقييم'], ['التخطيط', '1 شهر', 'خطة العمل'], ['التنفيذ', '6-12 شهر', 'سياسات وإجراءات'], ['المراقبة', 'مستمر', 'تقارير دورية']] } },
          ]
        }
      ]
    }
  ]
};

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'list' | 'table';
  data: any;
}

interface Indicator {
  id: string;
  title: string;
  status: 'empty' | 'partial' | 'completed';
  content: ContentBlock[];
}

interface Criterion {
  id: string;
  title: string;
  status: 'empty' | 'partial' | 'completed';
  indicators: Indicator[];
}

export function EntityContentDetail({ onCancel }: { onCancel?: () => void }) {
  const [activeSection, setActiveSection] = useState<string>('1');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs.current);
      for (const sectionId of sections) {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCriterion = (id: string) => {
    if (activeSection === id) {
      setActiveSection('');
    } else {
      setActiveSection(id);
    }
  };

  const toggleIndicator = (id: string) => {
    const currentRef = sectionRefs.current[id];
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = (blocks: ContentBlock[]) => {
    if (blocks.length === 0) {
      return (
        <div className="py-6 text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            لا توجد محتويات مضافة
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 py-4">
        {blocks.map((block) => {
          if (block.type === 'heading') {
            return (
              <h3 key={block.id} className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-lg)' }}>
                {block.data.text}
              </h3>
            );
          } else if (block.type === 'text') {
            return (
              <p key={block.id} className="text-foreground text-right leading-relaxed" style={{ fontSize: 'var(--text-base)' }}>
                {block.data.text}
              </p>
            );
          } else if (block.type === 'list') {
            return (
              <ul key={block.id} className={`text-right space-y-2 ${block.data.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pr-6`}>
                {block.data.items.map((item: string, index: number) => (
                  <li key={index} className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          } else if (block.type === 'table') {
            return (
              <div key={block.id} className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ borderColor: 'var(--border)' }}>
                  <thead style={{ backgroundColor: 'var(--muted)' }}>
                    <tr>
                      {block.data.columns.map((col: string, index: number) => (
                        <th 
                          key={index} 
                          className="px-4 py-3 text-right font-semibold text-foreground border"
                          style={{ fontSize: 'var(--text-sm)', borderColor: 'var(--border)' }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.rows.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex} className="border">
                        {row.map((cell: string, cellIndex: number) => (
                          <td 
                            key={cellIndex} 
                            className="px-4 py-3 text-right text-foreground border"
                            style={{ fontSize: 'var(--text-sm)', borderColor: 'var(--border)' }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: { bg: 'var(--success-light)', color: 'var(--success)', text: 'مكتمل' },
      partial: { bg: 'var(--info-light)', color: 'var(--info)', text: 'غير مكتمل' },
      empty: { bg: 'var(--muted)', color: 'var(--muted-foreground)', text: 'فارغ' }
    };
    
    const style = styles[status as keyof typeof styles] || styles.empty;
    
    return (
      <span 
        className="px-3 py-1 rounded-full font-medium"
        style={{ fontSize: 'var(--text-xs)', backgroundColor: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1440px] mx-auto px-8 py-6">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى القائمة</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-bold text-foreground mb-2" style={{ fontSize: 'var(--text-2xl)' }}>
                {mockPreviewData.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                <span>رقم التسجيل: {mockPreviewData.registrationNumber}</span>
                <span>•</span>
                <span>أنشئ بواسطة: {mockPreviewData.createdBy}</span>
                <span>•</span>
                <span>التاريخ: {mockPreviewData.date}</span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Add to Favorites button */}
              <button
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  console.log(isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة');
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors border ${
                  isFavorite
                    ? 'bg-yellow-50 border-yellow-500 text-yellow-700 hover:bg-yellow-100'
                    : 'bg-white border-border text-foreground hover:bg-muted'
                }`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <span>{isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}</span>
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area with Two-Column Layout */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Right Sidebar - Table of Contents (RTL) */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h3 className="text-foreground font-bold mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                جدول المحتويات
              </h3>
              <nav className="space-y-1">
                {mockPreviewData.criteria.map((criterion) => (
                  <button
                    key={criterion.id}
                    onClick={() => scrollToSection(criterion.id)}
                    className={`block w-full text-right px-3 py-2 rounded-lg transition-colors ${
                      activeSection === criterion.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {criterion.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="space-y-12">
              {mockPreviewData.criteria.map((criterion) => (
                <section
                  key={criterion.id}
                  ref={(el) => (sectionRefs.current[criterion.id] = el)}
                  className="scroll-mt-24"
                >
                  {/* Section Title */}
                  <div className="mb-6">
                    <h2 className="font-bold text-foreground mb-2" style={{ fontSize: 'var(--text-xl)' }}>
                      {criterion.title}
                    </h2>
                    <div className="h-1 w-16 bg-primary rounded"></div>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-8">
                    {criterion.indicators.map((indicator) => (
                      <div key={indicator.id} className="space-y-4">
                        {/* Indicator Title */}
                        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>
                          {indicator.title}
                        </h3>

                        {/* Indicator Content Blocks */}
                        {renderContent(indicator.content)}
                      </div>
                    ))}
                  </div>

                  {/* Section Divider */}
                  <div className="mt-12 border-b" style={{ borderColor: 'var(--border)' }}></div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}