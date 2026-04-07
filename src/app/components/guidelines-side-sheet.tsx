import { X, ChevronDown, ChevronUp, FileText, ExternalLink, Download } from 'lucide-react';
import { useState } from 'react';

interface GuidelinesSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Guidelines Side Sheet Component
 * Displays content guidelines when user clicks "الارشادات"
 * Uses design system CSS variables and IBM Plex Sans Arabic font
 */
export function GuidelinesSideSheet({ isOpen, onClose }: GuidelinesSideSheetProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    '1': true,
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock guidelines content
  const guidelines = {
    title: 'إرشادات الإجابة',
    sections: [
      {
        id: '1',
        title: 'الإفصاح المالي',
        content: [
          { 
            type: 'heading', 
            text: 'متطلبات الإفصاح المالي' 
          },
          { 
            type: 'text', 
            text: 'يجب على المنظمة تقديم تقارير مالية شاملة وشفافة تتضمن جميع الإيرادات والمصروفات بشكل دقيق ومفصل.' 
          },
          { 
            type: 'list', 
            listType: 'bullet',
            items: [
              'القوائم المالية السنوية',
              'تقارير التدقيق الخارجي',
              'الإفصاح عن مصادر التمويل'
            ]
          },
          {
            type: 'link',
            text: 'الدليل الإرشادي للحوكمة المالية',
            url: 'https://example.com/guide'
          }
        ]
      },
      {
        id: '2',
        title: 'النزاهة المالية',
        content: [
          { 
            type: 'heading', 
            text: 'معايير النزاهة' 
          },
          { 
            type: 'text', 
            text: 'الالتزام بأعلى معايير النزاهة في التعاملات المالية وتجنب تضارب المصالح.' 
          },
          {
            type: 'list',
            listType: 'numbered',
            items: [
              'تعيين لجنة مستقلة للمراجعة المالية',
              'وضع سياسات واضحة لتضارب المصالح',
              'الإفصاح الكامل عن أي علاقات مالية'
            ]
          },
          {
            type: 'table',
            headers: ['البند', 'المتطلب', 'المستوى'],
            rows: [
              ['الشفافية', 'إفصاح كامل', 'إلزامي'],
              ['التدقيق', 'مراجعة خارجية', 'إلزامي'],
              ['التقارير', 'تقارير دورية', 'موصى به']
            ]
          }
        ]
      },
      {
        id: '3',
        title: 'الوثائق المطلوبة',
        content: [
          { 
            type: 'heading', 
            text: 'قائمة الوثائق الإلزامية' 
          },
          { 
            type: 'list', 
            listType: 'bullet',
            items: [
              'نسخة من السجل التجاري للمنظمة',
              'القوائم المالية المدققة للسنة المالية الأخيرة',
              'تقرير مراجع الحسابات الخارجي',
              'سياسات الحوكمة المالية المعتمدة'
            ]
          },
          {
            type: 'attachment',
            fileName: 'نموذج_التقييم_المالي.pdf',
            fileSize: '2.5 MB',
            fileType: 'PDF'
          },
          {
            type: 'attachment',
            fileName: 'قائمة_المتطلبات.xlsx',
            fileSize: '1.2 MB',
            fileType: 'Excel'
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Side Sheet */}
      <div 
        className={`fixed left-0 top-0 h-full w-[480px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
            {guidelines.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-73px)] px-6 py-6">
          <div className="space-y-4">
            {guidelines.sections.map((section) => (
              <div key={section.id} className="border border-border rounded-lg overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-right"
                >
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                    {section.title}
                  </span>
                  {expandedSections[section.id] ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Section Content */}
                {expandedSections[section.id] && (
                  <div className="px-4 py-4 space-y-4 bg-white">
                    {section.content.map((block, idx) => (
                      <div key={idx}>
                        {block.type === 'heading' && (
                          <h3 
                            className="text-foreground mb-2" 
                            style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)' }}
                          >
                            {block.text}
                          </h3>
                        )}
                        {block.type === 'text' && (
                          <p 
                            className="text-foreground leading-relaxed" 
                            style={{ fontSize: 'var(--text-base)' }}
                          >
                            {block.text}
                          </p>
                        )}
                        {block.type === 'list' && block.listType === 'bullet' && (
                          <ul className="space-y-2 mr-5">
                            {block.items?.map((item, itemIdx) => (
                              <li 
                                key={itemIdx} 
                                className="text-foreground flex items-start gap-2"
                                style={{ fontSize: 'var(--text-base)' }}
                              >
                                <span className="text-primary mt-1.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {block.type === 'list' && block.listType === 'numbered' && (
                          <ol className="space-y-2 mr-5 list-decimal list-inside">
                            {block.items?.map((item, itemIdx) => (
                              <li 
                                key={itemIdx} 
                                className="text-foreground"
                                style={{ fontSize: 'var(--text-base)' }}
                              >
                                {item}
                              </li>
                            ))}
                          </ol>
                        )}
                        {block.type === 'link' && (
                          <a
                            href={block.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                            style={{ fontSize: 'var(--text-base)' }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{block.text}</span>
                          </a>
                        )}
                        {block.type === 'table' && (
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-border rounded">
                              <thead>
                                <tr className="bg-muted/30">
                                  {block.headers?.map((header, headerIdx) => (
                                    <th
                                      key={headerIdx}
                                      className="px-4 py-2 border border-border text-foreground text-right"
                                      style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}
                                    >
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {block.rows?.map((row, rowIdx) => (
                                  <tr key={rowIdx} className="hover:bg-muted/10 transition-colors">
                                    {row.map((cell, cellIdx) => (
                                      <td
                                        key={cellIdx}
                                        className="px-4 py-2 border border-border text-foreground text-right"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {block.type === 'attachment' && (
                          <div className="flex items-center justify-between p-3 border border-border rounded bg-muted/10 hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                  {block.fileName}
                                </div>
                                <div className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                  {block.fileType} • {block.fileSize}
                                </div>
                              </div>
                            </div>
                            <button
                              className="p-2 hover:bg-primary/10 rounded transition-colors"
                              aria-label="تحميل الملف"
                            >
                              <Download className="w-5 h-5 text-primary" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}