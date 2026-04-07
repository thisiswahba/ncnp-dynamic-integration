import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Plus, Eye, MoreVertical, GripVertical, CheckCircle2, Edit2, X, Type, AlignLeft, List, Table2, Trash2, FileText, Link as LinkIcon, Tag, Paperclip, Calendar, Hash, Save, ChevronRight } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'list' | 'table';
  data: any;
}

type ContentStatus = 'empty' | 'completed' | 'partial' | 'editing';
type ViewMode = 'edit' | 'preview';

interface Question {
  id: string;
  title: string;
  isExpanded: boolean;
  status: ContentStatus;
  contentBlocks: ContentBlock[];
  viewMode: ViewMode;
}

interface Practice {
  id: string;
  title: string;
  description: string;
  isExpanded: boolean;
  status: ContentStatus;
  contentBlocks: ContentBlock[];
  viewMode: ViewMode;
  questions: Question[];
}

interface Indicator {
  id: string;
  title: string;
  subtitle: string;
  isExpanded: boolean;
  status: ContentStatus;
  contentBlocks: ContentBlock[];
  viewMode: ViewMode;
  practices: Practice[];
}

interface Criterion {
  id: string;
  title: string;
  isExpanded: boolean;
  status: ContentStatus;
  contentBlocks: ContentBlock[];
  viewMode: ViewMode;
  indicators: Indicator[];
}

// Helper function to get preview summary
function getPreviewSummary(blocks: ContentBlock[]): string {
  if (blocks.length === 0) return '';
  
  const firstBlock = blocks[0];
  if (firstBlock.type === 'text') {
    return firstBlock.data.text?.substring(0, 50) || '';
  } else if (firstBlock.type === 'heading') {
    return firstBlock.data.text?.substring(0, 50) || '';
  } else if (firstBlock.type === 'list') {
    return 'قائمة مضافة';
  } else if (firstBlock.type === 'table') {
    return 'جدول مضاف';
  }
  return '';
}

// Draggable Content Block Component
interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  criterionId: string;
  indicatorId?: string;
  practiceId?: string;
  questionId?: string;
  isPreviewMode?: boolean;
  onUpdateContentBlock: (criterionId: string, blockId: string, data: any, indicatorId?: string, practiceId?: string, questionId?: string) => void;
  onDeleteContentBlock: (criterionId: string, blockId: string, indicatorId?: string, practiceId?: string, questionId?: string) => void;
  onMoveContentBlock: (criterionId: string, dragIndex: number, hoverIndex: number, indicatorId?: string, practiceId?: string, questionId?: string) => void;
}

function DraggableContentBlock({
  block,
  index,
  criterionId,
  indicatorId,
  practiceId,
  questionId,
  isPreviewMode = false,
  onUpdateContentBlock,
  onDeleteContentBlock,
  onMoveContentBlock,
}: DraggableContentBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'contentBlock',
    item: { index, criterionId, indicatorId, practiceId, questionId },
    canDrag: !isPreviewMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'contentBlock',
    hover: (draggedItem: any) => {
      if (!ref.current || isPreviewMode) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Only allow reordering within the same container
      if (draggedItem.criterionId === criterionId && 
          draggedItem.indicatorId === indicatorId &&
          draggedItem.practiceId === practiceId &&
          draggedItem.questionId === questionId) {
        onMoveContentBlock(criterionId, dragIndex, hoverIndex, indicatorId, practiceId, questionId);
        draggedItem.index = hoverIndex;
      }
    },
  });

  if (!isPreviewMode) {
    drag(drop(ref));
  }

  // Preview mode rendering
  if (isPreviewMode) {
    return (
      <div className="mb-3">
        {block.type === 'heading' && (
          <div style={{ fontSize: block.data.level === 1 ? 'var(--text-2xl)' : block.data.level === 2 ? 'var(--text-xl)' : 'var(--text-lg)' }} className="font-bold text-foreground text-right">
            {block.data.text}
          </div>
        )}
        {block.type === 'text' && (
          <p className="text-foreground text-right leading-relaxed" style={{ fontSize: 'var(--text-base)' }}>
            {block.data.text}
          </p>
        )}
        {block.type === 'list' && (
          <ul className={`text-right space-y-1 ${block.data.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pr-6`} dir="rtl">
            {block.data.items.map((item: string, idx: number) => (
              <li key={idx} className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {block.type === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg" dir="rtl">
              <thead className="bg-muted/30">
                <tr>
                  {block.data.columns.map((col: any, colIndex: number) => (
                    <th key={colIndex} className="px-4 py-3 text-right border-b border-border font-semibold" style={{ fontSize: 'var(--text-sm)' }}>
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.data.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex} className="hover:bg-muted/10">
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="px-4 py-3 text-right border-b border-border" style={{ fontSize: 'var(--text-sm)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={`group border border-border rounded-lg p-3 bg-white transition-all hover:shadow-md ${isDragging ? 'opacity-50 shadow-lg' : ''}`}
    >
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <div className="cursor-move p-1.5 hover:bg-muted rounded transition-colors shrink-0 border border-transparent hover:border-border">
          <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDeleteContentBlock(criterionId, block.id, indicatorId, practiceId, questionId)}
          className="p-1 hover:bg-destructive/10 rounded transition-colors shrink-0"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>

        <div className="flex-1">
          {/* Heading Block */}
          {block.type === 'heading' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">عنوان</span>
              </div>
              <div className="flex gap-2 items-center">
                <select
                  value={block.data.level}
                  onChange={(e) => onUpdateContentBlock(criterionId, block.id, { ...block.data, level: Number(e.target.value) }, indicatorId, practiceId, questionId)}
                  className="px-2 py-1 border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                  dir="rtl"
                >
                  <option value={1}>عنوان 1</option>
                  <option value={2}>عنوان 2</option>
                  <option value={3}>عنوان 3</option>
                </select>
                <input
                  type="text"
                  value={block.data.text}
                  onChange={(e) => onUpdateContentBlock(criterionId, block.id, { ...block.data, text: e.target.value }, indicatorId, practiceId, questionId)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                  placeholder="اكتب العنوان هنا"
                  dir="rtl"
                />
              </div>
            </div>
          )}

          {/* Text Block */}
          {block.type === 'text' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-muted-foreground" />
                <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">نص</span>
              </div>
              <textarea
                value={block.data.text}
                onChange={(e) => onUpdateContentBlock(criterionId, block.id, { text: e.target.value }, indicatorId, practiceId, questionId)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                style={{ fontSize: 'var(--text-sm)' }}
                placeholder="اكتب النص هنا"
                dir="rtl"
              />
            </div>
          )}

          {/* List Block */}
          {block.type === 'list' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-muted-foreground" />
                  <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">قائمة</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdateContentBlock(criterionId, block.id, { ...block.data, listType: 'bullet' }, indicatorId, practiceId, questionId)}
                    className={`px-2 py-1 rounded ${block.data.listType === 'bullet' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    نقاط
                  </button>
                  <button
                    onClick={() => onUpdateContentBlock(criterionId, block.id, { ...block.data, listType: 'number' }, indicatorId, practiceId, questionId)}
                    className={`px-2 py-1 rounded ${block.data.listType === 'number' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    أرقام
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {block.data.items.map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span style={{ fontSize: 'var(--text-sm)' }} className="text-muted-foreground shrink-0">
                      {block.data.listType === 'bullet' ? '•' : `${idx + 1}.`}
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...block.data.items];
                        newItems[idx] = e.target.value;
                        onUpdateContentBlock(criterionId, block.id, { ...block.data, items: newItems }, indicatorId, practiceId, questionId);
                      }}
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontSize: 'var(--text-sm)' }}
                      placeholder="عنصر القائمة"
                      dir="rtl"
                    />
                    {block.data.items.length > 1 && (
                      <button
                        onClick={() => {
                          const newItems = block.data.items.filter((_: any, i: number) => i !== idx);
                          onUpdateContentBlock(criterionId, block.id, { ...block.data, items: newItems }, indicatorId, practiceId, questionId);
                        }}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newItems = [...block.data.items, ''];
                  onUpdateContentBlock(criterionId, block.id, { ...block.data, items: newItems }, indicatorId, practiceId, questionId);
                }}
                className="text-primary hover:text-primary/80 font-medium"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                + إضافة عنصر
              </button>
            </div>
          )}

          {/* Table Block - Simplified for space */}
          {block.type === 'table' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-muted-foreground" />
                <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">جدول</span>
              </div>
              <div className="text-muted-foreground text-sm">جدول مضاف</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FormBuilder({ onCancel, onSave, onPreview }: { onCancel: () => void; onSave: () => void; onPreview: () => void }) {
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: '1',
      title: 'معيار 1: الإطار التنظيمي والهيكلي',
      isExpanded: true,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '1-1', 
          title: 'مؤشر 1.1: وجود لوائح وسياسات مالية', 
          subtitle: 'تقييم مدى توفر اللوائح والسياسات المالية المعتمدة', 
          isExpanded: true,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '1-1-1',
              title: 'ممارسة 1.1.1: توثيق السياسات المالية',
              description: 'التحقق من توثيق واعتماد السياسات المالية',
              isExpanded: true,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '1-1-1-1',
                  title: 'هل توجد سياسات مالية موثقة ومعتمدة؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                },
                {
                  id: '1-1-1-2',
                  title: 'متى تم آخر تحديث للسياسات المالية؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            },
            {
              id: '1-1-2',
              title: 'ممارسة 1.1.2: مراجعة السياسات المالية',
              description: 'التأكد من المراجعة الدورية للسياسات',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '1-1-2-1',
                  title: 'ما هي دورية مراجعة السياسات المالية؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        },
        { 
          id: '1-2', 
          title: 'مؤشر 1.2: الفصل بين الصلاحيات', 
          subtitle: 'قياس مدى الفصل بين الصلاحيات المالية والإدارية', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '1-2-1',
              title: 'ممارسة 1.2.1: تحديد الصلاحيات',
              description: 'التحقق من وضوح الصلاحيات المالية',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '1-2-1-1',
                  title: 'هل يوجد مصفوفة صلاحيات مالية محددة؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'معيار 2: إدارة المخاطر المالية',
      isExpanded: false,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '2-1', 
          title: 'مؤشر 2.1: تحديد المخاطر المالية', 
          subtitle: 'قياس مدى القدرة على تحديد وتصنيف المخاطر المالية', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '2-1-1',
              title: 'ممارسة 2.1.1: سجل المخاطر المالية',
              description: 'التحقق من وجود سجل محدث للمخاطر المالية',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '2-1-1-1',
                  title: 'هل يتم تحديث سجل المخاطر المالية بشكل دوري؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                },
                {
                  id: '2-1-1-2',
                  title: 'كم عدد المخاطر المالية المحددة حالياً؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            },
            {
              id: '2-1-2',
              title: 'ممارسة 2.1.2: تقييم المخاطر',
              description: 'قياس آليات تقييم احتمالية وأثر المخاطر',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '2-1-2-1',
                  title: 'ما هي المنهجية المستخدمة لتقييم المخاطر المالية؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        },
        { 
          id: '2-2', 
          title: 'مؤشر 2.2: معالجة المخاطر المالية', 
          subtitle: 'تقييم فعالية خطط معالجة المخاطر المالية', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '2-2-1',
              title: 'ممارسة 2.2.1: خطط المعالجة',
              description: 'التحقق من وجود خطط معتمدة لمعالجة المخاطر',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '2-2-1-1',
                  title: 'هل توجد خطط معالجة موثقة للمخاطر المالية عالية التأثير؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'معيار 3: الرقابة والمراجعة الداخلية',
      isExpanded: false,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '3-1', 
          title: 'مؤشر 3.1: استقلالية المراجعة الداخلية', 
          subtitle: 'قياس استقلالية وفعالية وظيفة المراجعة الداخلية', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '3-1-1',
              title: 'ممارسة 3.1.1: الهيكل التنظيمي',
              description: 'التحقق من الاستقلالية التنظيمية للمراجعة الداخلية',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '3-1-1-1',
                  title: 'لمن ترفع إدارة المراجعة الداخلية تقاريرها؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        },
        { 
          id: '3-2', 
          title: 'مؤشر 3.2: تنفيذ خطة المراجعة السنوية', 
          subtitle: 'تقييم مدى الالتزام بتنفيذ خطة المراجعة المعتمدة', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '3-2-1',
              title: 'ممارسة 3.2.1: نسبة تنفيذ الخطة',
              description: 'قياس نسبة تنفيذ خطة المراجعة السنوية',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '3-2-1-1',
                  title: 'ما هي نسبة إنجاز خطة المراجعة السنوية حتى الآن؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                },
                {
                  id: '3-2-1-2',
                  title: 'كم عدد التقارير المراجعة الصادرة هذا العام؟',
                  isExpanded: false,
                  status: 'empty',
                  contentBlocks: [],
                  viewMode: 'edit'
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  const toggleCriterion = (id: string) => {
    setCriteria(prev => prev.map(crit => 
      crit.id === id ? { ...crit, isExpanded: !crit.isExpanded } : crit
    ));
  };

  const toggleIndicator = (criterionId: string, indicatorId: string) => {
    setCriteria(prev => prev.map(crit =>
      crit.id === criterionId
        ? {
            ...crit,
            indicators: crit.indicators.map(ind =>
              ind.id === indicatorId ? { ...ind, isExpanded: !ind.isExpanded } : ind
            )
          }
        : crit
    ));
  };

  const togglePractice = (criterionId: string, indicatorId: string, practiceId: string) => {
    setCriteria(prev => prev.map(crit =>
      crit.id === criterionId
        ? {
            ...crit,
            indicators: crit.indicators.map(ind =>
              ind.id === indicatorId
                ? {
                    ...ind,
                    practices: ind.practices.map(prac =>
                      prac.id === practiceId ? { ...prac, isExpanded: !prac.isExpanded } : prac
                    )
                  }
                : ind
            )
          }
        : crit
    ));
  };

  const toggleQuestion = (criterionId: string, indicatorId: string, practiceId: string, questionId: string) => {
    setCriteria(prev => prev.map(crit =>
      crit.id === criterionId
        ? {
            ...crit,
            indicators: crit.indicators.map(ind =>
              ind.id === indicatorId
                ? {
                    ...ind,
                    practices: ind.practices.map(prac =>
                      prac.id === practiceId
                        ? {
                            ...prac,
                            questions: prac.questions.map(q =>
                              q.id === questionId ? { ...q, isExpanded: !q.isExpanded } : q
                            )
                          }
                        : prac
                    )
                  }
                : ind
            )
          }
        : crit
    ));
  };

  const toggleViewMode = (criterionId: string, indicatorId?: string, practiceId?: string, questionId?: string) => {
    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      if (!indicatorId) {
        return { ...crit, viewMode: crit.viewMode === 'edit' ? 'preview' : 'edit' };
      }

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          if (!practiceId) {
            return { ...ind, viewMode: ind.viewMode === 'edit' ? 'preview' : 'edit' };
          }

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              if (!questionId) {
                return { ...prac, viewMode: prac.viewMode === 'edit' ? 'preview' : 'edit' };
              }

              return {
                ...prac,
                questions: prac.questions.map(q =>
                  q.id === questionId ? { ...q, viewMode: q.viewMode === 'edit' ? 'preview' : 'edit' } : q
                )
              };
            })
          };
        })
      };
    }));
  };

  const addQuestion = (criterionId: string, indicatorId: string, practiceId: string) => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      title: `سؤال جديد`,
      isExpanded: true,
      status: 'editing',
      contentBlocks: [],
      viewMode: 'edit'
    };

    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              return {
                ...prac,
                questions: [...prac.questions, newQuestion]
              };
            })
          };
        })
      };
    }));
  };

  const addContentBlock = (criterionId: string, type: ContentBlock['type'], indicatorId?: string, practiceId?: string, questionId?: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      data: type === 'heading' 
        ? { text: '', level: 2 }
        : type === 'text'
        ? { text: '' }
        : type === 'list'
        ? { listType: 'bullet', items: [''] }
        : { columns: [{ name: 'العمود 1', type: 'text' }], rows: [['']] }
    };

    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      if (!indicatorId) {
        return { ...crit, contentBlocks: [...crit.contentBlocks, newBlock] };
      }

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          if (!practiceId) {
            return { ...ind, contentBlocks: [...ind.contentBlocks, newBlock] };
          }

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              if (!questionId) {
                return { ...prac, contentBlocks: [...prac.contentBlocks, newBlock] };
              }

              return {
                ...prac,
                questions: prac.questions.map(q =>
                  q.id === questionId ? { ...q, contentBlocks: [...q.contentBlocks, newBlock] } : q
                )
              };
            })
          };
        })
      };
    }));
  };

  const updateContentBlock = (criterionId: string, blockId: string, data: any, indicatorId?: string, practiceId?: string, questionId?: string) => {
    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      if (!indicatorId) {
        return {
          ...crit,
          contentBlocks: crit.contentBlocks.map(block => 
            block.id === blockId ? { ...block, data } : block
          )
        };
      }

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          if (!practiceId) {
            return {
              ...ind,
              contentBlocks: ind.contentBlocks.map(block =>
                block.id === blockId ? { ...block, data } : block
              )
            };
          }

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              if (!questionId) {
                return {
                  ...prac,
                  contentBlocks: prac.contentBlocks.map(block =>
                    block.id === blockId ? { ...block, data } : block
                  )
                };
              }

              return {
                ...prac,
                questions: prac.questions.map(q =>
                  q.id === questionId
                    ? { ...q, contentBlocks: q.contentBlocks.map(block => block.id === blockId ? { ...block, data } : block) }
                    : q
                )
              };
            })
          };
        })
      };
    }));
  };

  const deleteContentBlock = (criterionId: string, blockId: string, indicatorId?: string, practiceId?: string, questionId?: string) => {
    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      if (!indicatorId) {
        return {
          ...crit,
          contentBlocks: crit.contentBlocks.filter(block => block.id !== blockId)
        };
      }

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          if (!practiceId) {
            return { ...ind, contentBlocks: ind.contentBlocks.filter(block => block.id !== blockId) };
          }

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              if (!questionId) {
                return { ...prac, contentBlocks: prac.contentBlocks.filter(block => block.id !== blockId) };
              }

              return {
                ...prac,
                questions: prac.questions.map(q =>
                  q.id === questionId ? { ...q, contentBlocks: q.contentBlocks.filter(block => block.id !== blockId) } : q
                )
              };
            })
          };
        })
      };
    }));
  };

  const moveContentBlock = (criterionId: string, dragIndex: number, hoverIndex: number, indicatorId?: string, practiceId?: string, questionId?: string) => {
    setCriteria(prev => prev.map(crit => {
      if (crit.id !== criterionId) return crit;

      const reorderBlocks = (blocks: ContentBlock[]) => {
        const newBlocks = [...blocks];
        const [removed] = newBlocks.splice(dragIndex, 1);
        newBlocks.splice(hoverIndex, 0, removed);
        return newBlocks;
      };

      if (!indicatorId) {
        return { ...crit, contentBlocks: reorderBlocks(crit.contentBlocks) };
      }

      return {
        ...crit,
        indicators: crit.indicators.map(ind => {
          if (ind.id !== indicatorId) return ind;

          if (!practiceId) {
            return { ...ind, contentBlocks: reorderBlocks(ind.contentBlocks) };
          }

          return {
            ...ind,
            practices: ind.practices.map(prac => {
              if (prac.id !== practiceId) return prac;

              if (!questionId) {
                return { ...prac, contentBlocks: reorderBlocks(prac.contentBlocks) };
              }

              return {
                ...prac,
                questions: prac.questions.map(q =>
                  q.id === questionId ? { ...q, contentBlocks: reorderBlocks(q.contentBlocks) } : q
                )
              };
            })
          };
        })
      };
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background" dir="rtl" style={{ backgroundColor: '#FAFBFC' }}>
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                  <span>قائمة التحصيل</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">نموذج التقييم المالي</span>
                </div>
                <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-2xl)' }}>
                  نموذج المخاطر المالية
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    onSave();
                    toast.success('تم حفظ النموذج بنجاح');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    backgroundColor: 'var(--success)',
                    color: 'white'
                  }}
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ النموذج كاملا</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="bg-white rounded-lg border-2 border-border shadow-sm">
                {/* LEVEL 2: STANDARD (معيار) */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="flex-1 text-right mx-3">
                      <div className="flex items-center gap-2 justify-end mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#FFE082', color: '#7B5A00' }}>
                          المستوى 1: معيار
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-lg)' }}>
                        {criterion.title}
                      </h3>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {criterion.indicators.length} مؤشر • {criterion.indicators.reduce((acc, ind) => acc + ind.practices.length, 0)} ممارسة
                      </p>
                      
                      {!criterion.isExpanded && criterion.contentBlocks.length > 0 && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                            محتوى تمت إضافته
                          </span>
                          <p className="text-muted-foreground text-sm mt-1">{getPreviewSummary(criterion.contentBlocks)}</p>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => toggleCriterion(criterion.id)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      {criterion.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {criterion.isExpanded && (
                    <>
                      {/* Standard Content Area */}
                      <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
                        <div className="flex items-center gap-2 mb-3 justify-end">
                          <button
                            onClick={() => toggleViewMode(criterion.id)}
                            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/50 transition-colors"
                            style={{ fontSize: 'var(--text-xs)' }}
                          >
                            {criterion.viewMode === 'edit' ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>معاينة</span>
                              </>
                            ) : (
                              <>
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>تعديل</span>
                              </>
                            )}
                          </button>
                        </div>

                        {criterion.contentBlocks.length > 0 ? (
                          <div className="space-y-2 mb-4">
                            {criterion.contentBlocks.map((block, index) => (
                              <DraggableContentBlock
                                key={block.id}
                                block={block}
                                index={index}
                                criterionId={criterion.id}
                                isPreviewMode={criterion.viewMode === 'preview'}
                                onUpdateContentBlock={updateContentBlock}
                                onDeleteContentBlock={deleteContentBlock}
                                onMoveContentBlock={moveContentBlock}
                              />
                            ))}
                          </div>
                        ) : criterion.viewMode === 'preview' ? (
                          <div className="text-center py-4 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                            لا يوجد محتوى على هذا المستوى بعد
                          </div>
                        ) : null}

                        {criterion.viewMode === 'edit' && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => addContentBlock(criterion.id, 'heading')}
                              className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white/50"
                              style={{ fontSize: 'var(--text-sm)' }}
                            >
                              <Type className="w-4 h-4" />
                              <span>عنوان</span>
                            </button>
                            <button
                              onClick={() => addContentBlock(criterion.id, 'text')}
                              className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white/50"
                              style={{ fontSize: 'var(--text-sm)' }}
                            >
                              <AlignLeft className="w-4 h-4" />
                              <span>نص</span>
                            </button>
                            <button
                              onClick={() => addContentBlock(criterion.id, 'list')}
                              className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white/50"
                              style={{ fontSize: 'var(--text-sm)' }}
                            >
                              <List className="w-4 h-4" />
                              <span>قائمة</span>
                            </button>
                            <button
                              onClick={() => addContentBlock(criterion.id, 'table')}
                              className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white/50"
                              style={{ fontSize: 'var(--text-sm)' }}
                            >
                              <Table2 className="w-4 h-4" />
                              <span>جدول</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* LEVEL 3: INDICATORS (مؤشرات) */}
                      <div className="space-y-4 pr-6">
                        <h4 className="font-bold text-foreground mb-3" style={{ fontSize: 'var(--text-base)' }}>
                          المؤشرات
                        </h4>
                        
                        {criterion.indicators.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground bg-muted/20 rounded-lg" style={{ fontSize: 'var(--text-sm)' }}>
                            لا يوجد محتوى على هذا المستوى بعد
                          </div>
                        ) : (
                          criterion.indicators.map((indicator) => (
                            <div key={indicator.id} className="border-2 border-blue-200 rounded-lg bg-blue-50/30 p-4">
                              {/* Indicator Header */}
                              <div className="flex items-start justify-between mb-3">
                                <button 
                                  onClick={() => toggleIndicator(criterion.id, indicator.id)}
                                  className="p-1 hover:bg-white rounded transition-colors"
                                >
                                  {indicator.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                <div className="flex-1 text-right mr-3">
                                  <div className="flex items-center gap-2 justify-end mb-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-200 text-blue-900">
                                      المستوى 2: المؤشر
                                    </span>
                                  </div>
                                  <h5 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                                    {indicator.title}
                                  </h5>
                                  <p className="text-muted-foreground text-sm">{indicator.subtitle}</p>
                                  
                                  {!indicator.isExpanded && (
                                    <p className="text-muted-foreground text-xs mt-1">
                                      {indicator.practices.length} ممارسة • {indicator.practices.reduce((acc, p) => acc + p.questions.length, 0)} سؤال
                                    </p>
                                  )}
                                </div>
                              </div>

                              {indicator.isExpanded && (
                                <>
                                  {/* Indicator Content */}
                                  <div className="rounded-lg p-3 mb-4 bg-white border border-blue-200">
                                    <div className="flex items-center gap-2 mb-2 justify-end">
                                      <button
                                        onClick={() => toggleViewMode(criterion.id, indicator.id)}
                                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted transition-colors"
                                        style={{ fontSize: 'var(--text-xs)' }}
                                      >
                                        {indicator.viewMode === 'edit' ? (
                                          <>
                                            <Eye className="w-3 h-3" />
                                            <span>معاينة</span>
                                          </>
                                        ) : (
                                          <>
                                            <Edit2 className="w-3 h-3" />
                                            <span>تعديل</span>
                                          </>
                                        )}
                                      </button>
                                    </div>

                                    {indicator.contentBlocks.length > 0 ? (
                                      <div className="space-y-2 mb-3">
                                        {indicator.contentBlocks.map((block, index) => (
                                          <DraggableContentBlock
                                            key={block.id}
                                            block={block}
                                            index={index}
                                            criterionId={criterion.id}
                                            indicatorId={indicator.id}
                                            isPreviewMode={indicator.viewMode === 'preview'}
                                            onUpdateContentBlock={updateContentBlock}
                                            onDeleteContentBlock={deleteContentBlock}
                                            onMoveContentBlock={moveContentBlock}
                                          />
                                        ))}
                                      </div>
                                    ) : indicator.viewMode === 'preview' ? (
                                      <div className="text-center py-3 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                        لا يوجد محتوى على هذا المستوى بعد
                                      </div>
                                    ) : null}

                                    {indicator.viewMode === 'edit' && (
                                      <div className="flex flex-wrap gap-2">
                                        <button
                                          onClick={() => addContentBlock(criterion.id, 'heading', indicator.id)}
                                          className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                          style={{ fontSize: 'var(--text-xs)' }}
                                        >
                                          <Type className="w-3 h-3" />
                                          <span>عنوان</span>
                                        </button>
                                        <button
                                          onClick={() => addContentBlock(criterion.id, 'text', indicator.id)}
                                          className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                          style={{ fontSize: 'var(--text-xs)' }}
                                        >
                                          <AlignLeft className="w-3 h-3" />
                                          <span>نص</span>
                                        </button>
                                        <button
                                          onClick={() => addContentBlock(criterion.id, 'list', indicator.id)}
                                          className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                          style={{ fontSize: 'var(--text-xs)' }}
                                        >
                                          <List className="w-3 h-3" />
                                          <span>قائمة</span>
                                        </button>
                                        <button
                                          onClick={() => addContentBlock(criterion.id, 'table', indicator.id)}
                                          className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                          style={{ fontSize: 'var(--text-xs)' }}
                                        >
                                          <Table2 className="w-3 h-3" />
                                          <span>جدول</span>
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* LEVEL 4: PRACTICES (ممارسات) */}
                                  <div className="space-y-3 pr-4">
                                    <h6 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                      الممارسات
                                    </h6>
                                    
                                    {indicator.practices.length === 0 ? (
                                      <div className="text-center py-3 text-muted-foreground bg-white/50 rounded" style={{ fontSize: 'var(--text-xs)' }}>
                                        لا يوجد محتوى على هذا المستوى بعد
                                      </div>
                                    ) : (
                                      indicator.practices.map((practice) => (
                                        <div key={practice.id} className="border-2 border-green-200 rounded-lg bg-green-50/30 p-3">
                                          {/* Practice Header */}
                                          <div className="flex items-start justify-between mb-2">
                                            <button 
                                              onClick={() => togglePractice(criterion.id, indicator.id, practice.id)}
                                              className="p-0.5 hover:bg-white rounded transition-colors"
                                            >
                                              {practice.isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                            </button>
                                            <div className="flex-1 text-right mr-2">
                                              <div className="flex items-center gap-2 justify-end mb-1">
                                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-200 text-green-900">
                                                  المستوى 3: الممارسة
                                                </span>
                                              </div>
                                              <h6 className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                                {practice.title}
                                              </h6>
                                              
                                              {!practice.isExpanded && (
                                                <p className="text-muted-foreground text-xs mt-0.5">
                                                  {practice.questions.length} سؤال
                                                </p>
                                              )}
                                            </div>
                                          </div>

                                          {practice.isExpanded && (
                                            <>
                                              {/* LEVEL 5: QUESTIONS (أسئلة) */}
                                              <div className="space-y-2 pr-3">
                                                <div className="flex items-center justify-between mb-2">
                                                  <button
                                                    onClick={() => addQuestion(criterion.id, indicator.id, practice.id)}
                                                    className="flex items-center gap-1 px-2 py-1 border border-dashed border-border rounded hover:bg-white transition-colors text-foreground text-xs"
                                                  >
                                                    <Plus className="w-3 h-3" />
                                                    <span>إضافة سؤال</span>
                                                  </button>
                                                  <h6 className="font-medium text-foreground text-xs">
                                                    الأسئلة
                                                  </h6>
                                                </div>
                                                
                                                {practice.questions.length === 0 ? (
                                                  <div className="text-center py-2 text-muted-foreground bg-white/50 rounded text-xs">
                                                    لا يوجد محتوى على هذا المستوى بعد
                                                  </div>
                                                ) : (
                                                  practice.questions.map((question) => (
                                                    <div key={question.id} className="border-2 border-purple-200 rounded bg-purple-50/30 p-2">
                                                      {/* Question Header */}
                                                      <div className="flex items-start justify-between mb-2">
                                                        <button 
                                                          onClick={() => toggleQuestion(criterion.id, indicator.id, practice.id, question.id)}
                                                          className="p-0.5 hover:bg-white rounded transition-colors"
                                                        >
                                                          {question.isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                        </button>
                                                        <div className="flex-1 text-right mr-2">
                                                          <div className="flex items-center gap-1 justify-end mb-1">
                                                            <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-200 text-purple-900">
                                                              المستوى 4: السؤال
                                                            </span>
                                                          </div>
                                                          <p className="font-medium text-foreground text-xs">
                                                            {question.title}
                                                          </p>
                                                          
                                                          {/* Preview Summary when collapsed */}
                                                          {!question.isExpanded && question.contentBlocks.length > 0 && (
                                                            <div className="mt-1">
                                                              <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-white/60 text-muted-foreground">
                                                                محتوى تمت إضافته
                                                              </span>
                                                              <p className="text-muted-foreground text-xs mt-0.5">
                                                                {getPreviewSummary(question.contentBlocks)}
                                                              </p>
                                                            </div>
                                                          )}
                                                        </div>
                                                      </div>

                                                      {question.isExpanded && (
                                                        <div className="space-y-2">
                                                          {/* Question Title Editor */}
                                                          <div className="bg-white rounded p-2 border border-purple-200">
                                                            <label className="block text-xs font-medium text-muted-foreground mb-1 text-right">
                                                              عنوان السؤال
                                                            </label>
                                                            <input
                                                              type="text"
                                                              value={question.title}
                                                              onChange={(e) => {
                                                                setCriteria(prev => prev.map(c => {
                                                                  if (c.id !== criterion.id) return c;
                                                                  return {
                                                                    ...c,
                                                                    indicators: c.indicators.map(ind => {
                                                                      if (ind.id !== indicator.id) return ind;
                                                                      return {
                                                                        ...ind,
                                                                        practices: ind.practices.map(prac => {
                                                                          if (prac.id !== practice.id) return prac;
                                                                          return {
                                                                            ...prac,
                                                                            questions: prac.questions.map(q =>
                                                                              q.id === question.id ? { ...q, title: e.target.value } : q
                                                                            )
                                                                          };
                                                                        })
                                                                      };
                                                                    })
                                                                  };
                                                                }));
                                                              }}
                                                              className="w-full px-2 py-1.5 border border-border rounded text-right focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs"
                                                              placeholder="اكتب عنوان السؤال هنا"
                                                              dir="rtl"
                                                            />
                                                          </div>

                                                          {/* Question Content Area */}
                                                          <div className="bg-white rounded p-2 border border-purple-200">
                                                            <div className="flex items-center gap-1 mb-2 justify-between">
                                                              <button
                                                                onClick={() => toggleViewMode(criterion.id, indicator.id, practice.id, question.id)}
                                                                className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-muted transition-colors text-xs"
                                                              >
                                                                {question.viewMode === 'edit' ? (
                                                                  <>
                                                                    <Eye className="w-3 h-3" />
                                                                    <span>معاينة</span>
                                                                  </>
                                                                ) : (
                                                                  <>
                                                                    <Edit2 className="w-3 h-3" />
                                                                    <span>تعديل</span>
                                                                  </>
                                                                )}
                                                              </button>
                                                              <label className="text-xs font-medium text-muted-foreground text-right">
                                                                محتوى السؤال (شرح، تعليمات، أمثلة)
                                                              </label>
                                                            </div>

                                                            {/* Content Blocks */}
                                                            {question.contentBlocks.length > 0 ? (
                                                              <div className="space-y-1 mb-2">
                                                                {question.contentBlocks.map((block, index) => (
                                                                  <DraggableContentBlock
                                                                    key={block.id}
                                                                    block={block}
                                                                    index={index}
                                                                    criterionId={criterion.id}
                                                                    indicatorId={indicator.id}
                                                                    practiceId={practice.id}
                                                                    questionId={question.id}
                                                                    isPreviewMode={question.viewMode === 'preview'}
                                                                    onUpdateContentBlock={updateContentBlock}
                                                                    onDeleteContentBlock={deleteContentBlock}
                                                                    onMoveContentBlock={moveContentBlock}
                                                                  />
                                                                ))}
                                                              </div>
                                                            ) : question.viewMode === 'preview' ? (
                                                              <div className="text-center py-3 text-muted-foreground text-xs bg-muted/10 rounded">
                                                                لم يتم إضافة محتوى للسؤال بعد
                                                              </div>
                                                            ) : (
                                                              <div className="text-center py-3 text-muted-foreground text-xs bg-muted/10 rounded border border-dashed border-border">
                                                                لم يتم إضافة محتوى للسؤال بعد
                                                              </div>
                                                            )}

                                                            {/* Add Content Buttons - Only in Edit Mode */}
                                                            {question.viewMode === 'edit' && (
                                                              <div className="flex flex-wrap gap-1">
                                                                <button
                                                                  onClick={() => addContentBlock(criterion.id, 'heading', indicator.id, practice.id, question.id)}
                                                                  className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white text-xs"
                                                                >
                                                                  <Type className="w-3 h-3" />
                                                                  <span>عنوان</span>
                                                                </button>
                                                                <button
                                                                  onClick={() => addContentBlock(criterion.id, 'text', indicator.id, practice.id, question.id)}
                                                                  className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white text-xs"
                                                                >
                                                                  <AlignLeft className="w-3 h-3" />
                                                                  <span>نص</span>
                                                                </button>
                                                                <button
                                                                  onClick={() => addContentBlock(criterion.id, 'list', indicator.id, practice.id, question.id)}
                                                                  className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white text-xs"
                                                                >
                                                                  <List className="w-3 h-3" />
                                                                  <span>قائمة</span>
                                                                </button>
                                                                <button
                                                                  onClick={() => addContentBlock(criterion.id, 'table', indicator.id, practice.id, question.id)}
                                                                  className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white text-xs"
                                                                >
                                                                  <Table2 className="w-3 h-3" />
                                                                  <span>جدول</span>
                                                                </button>
                                                              </div>
                                                            )}

                                                            {/* End User Preview - Answer Input */}
                                                            {question.viewMode === 'preview' && (
                                                              <div className="mt-3 pt-3 border-t border-border">
                                                                <label className="block text-xs font-medium text-foreground mb-1.5 text-right">
                                                                  الإجابة
                                                                </label>
                                                                <textarea
                                                                  disabled
                                                                  rows={3}
                                                                  className="w-full px-2 py-1.5 border border-border rounded text-right bg-muted/30 cursor-not-allowed text-xs"
                                                                  placeholder="سيقوم المستخدم بإدخال الإجابة هنا..."
                                                                  dir="rtl"
                                                                />
                                                                <p className="text-xs text-muted-foreground mt-1 text-right">
                                                                  معاينة النموذج للمستخدم النهائي
                                                                </p>
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  ))
                                                )}
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      ))
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
