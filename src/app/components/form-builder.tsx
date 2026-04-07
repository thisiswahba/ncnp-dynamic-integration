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

          {/* Table Block */}
          {block.type === 'table' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-muted-foreground" />
                <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">جدول</span>
              </div>
              <div className="overflow-auto max-h-96 border border-border rounded-lg">
                <table className="w-full" dir="rtl">
                  <thead className="bg-muted/30 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-right border-b border-border w-12 bg-muted/30">
                        {/* Empty header cell for row actions */}
                      </th>
                      {block.data.columns.map((col: any, colIndex: number) => (
                        <th key={colIndex} className="px-3 py-2 text-right border-b border-border relative group bg-muted/30">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (block.data.columns.length > 1) {
                                    const newCols = block.data.columns.filter((_: any, i: number) => i !== colIndex);
                                    const newRows = block.data.rows.map((row: string[]) => 
                                      row.filter((_: string, i: number) => i !== colIndex)
                                    );
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, columns: newCols, rows: newRows }, indicatorId, practiceId, questionId);
                                  }
                                }}
                                className="p-1 hover:bg-destructive/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                                title="حذف العمود"
                              >
                                <X className="w-3 h-3 text-destructive" />
                              </button>
                              <input
                                type="text"
                                value={col.name}
                                onChange={(e) => {
                                  const newCols = [...block.data.columns];
                                  newCols[colIndex] = { ...col, name: e.target.value };
                                  onUpdateContentBlock(criterionId, block.id, { ...block.data, columns: newCols }, indicatorId, practiceId, questionId);
                                }}
                                className="flex-1 px-2 py-1 bg-transparent font-medium text-right focus:outline-none focus:bg-white focus:border focus:border-primary rounded"
                                style={{ fontSize: 'var(--text-sm)' }}
                                dir="rtl"
                              />
                            </div>
                            <div className="relative">
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                {(col.type === 'text' || !col.type) && <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
                                {col.type === 'tag' && <Tag className="w-3.5 h-3.5 text-secondary" />}
                                {col.type === 'link' && <LinkIcon className="w-3.5 h-3.5 text-primary" />}
                                {col.type === 'attachment' && <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />}
                                {col.type === 'date' && <Calendar className="w-3.5 h-3.5 text-muted-foreground" />}
                                {col.type === 'number' && <Hash className="w-3.5 h-3.5 text-muted-foreground" />}
                              </div>
                              <select
                                value={col.type || 'text'}
                                onChange={(e) => {
                                  const newCols = [...block.data.columns];
                                  newCols[colIndex] = { ...col, type: e.target.value };
                                  onUpdateContentBlock(criterionId, block.id, { ...block.data, columns: newCols }, indicatorId, practiceId, questionId);
                                }}
                                className="w-full pl-8 pr-2 py-1 bg-white border border-border rounded text-right focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
                                style={{ fontSize: 'var(--text-xs)' }}
                                dir="rtl"
                              >
                                <option value="text">📝 نص</option>
                                <option value="tag">🏷️ وسم</option>
                                <option value="link">🔗 رابط</option>
                                <option value="attachment">📎 مرفق</option>
                                <option value="date">📅 تاريخ</option>
                                <option value="number">🔢 رقم</option>
                              </select>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.rows.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        <td className="px-2 py-2 border-b border-border text-center bg-white">
                          <button
                            onClick={() => {
                              if (block.data.rows.length > 1) {
                                const newRows = block.data.rows.filter((_: any, i: number) => i !== rowIndex);
                                onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                              }
                            }}
                            className="p-1 hover:bg-destructive/10 rounded transition-colors"
                            title="حذف الصف"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </button>
                        </td>
                        {row.map((cell: string, cellIndex: number) => {
                          const columnType = block.data.columns[cellIndex]?.type || 'text';
                          return (
                            <td key={cellIndex} className="px-3 py-2 border-b border-border bg-white">
                              {columnType === 'tag' && (
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) => {
                                    const newRows = [...block.data.rows];
                                    newRows[rowIndex][cellIndex] = e.target.value;
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                  }}
                                  className="w-full px-2 py-1 text-right focus:outline-none bg-secondary/10 border border-secondary rounded"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  placeholder="وسم"
                                  dir="rtl"
                                />
                              )}
                              {columnType === 'link' && (
                                <input
                                  type="url"
                                  value={cell}
                                  onChange={(e) => {
                                    const newRows = [...block.data.rows];
                                    newRows[rowIndex][cellIndex] = e.target.value;
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                  }}
                                  className="w-full px-2 py-1 text-right focus:outline-none focus:bg-muted/30 rounded text-primary underline"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  placeholder="https://"
                                  dir="rtl"
                                />
                              )}
                              {columnType === 'attachment' && (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => {
                                      const newRows = [...block.data.rows];
                                      newRows[rowIndex][cellIndex] = e.target.value;
                                      onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                    }}
                                    className="flex-1 px-2 py-1 text-right focus:outline-none focus:bg-muted/30 rounded"
                                    style={{ fontSize: 'var(--text-sm)' }}
                                    placeholder="اسم الملف"
                                    dir="rtl"
                                  />
                                </div>
                              )}
                              {columnType === 'date' && (
                                <input
                                  type="date"
                                  value={cell}
                                  onChange={(e) => {
                                    const newRows = [...block.data.rows];
                                    newRows[rowIndex][cellIndex] = e.target.value;
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                  }}
                                  className="w-full px-2 py-1 text-right focus:outline-none focus:bg-muted/30 rounded"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  dir="rtl"
                                />
                              )}
                              {columnType === 'number' && (
                                <input
                                  type="number"
                                  value={cell}
                                  onChange={(e) => {
                                    const newRows = [...block.data.rows];
                                    newRows[rowIndex][cellIndex] = e.target.value;
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                  }}
                                  className="w-full px-2 py-1 text-right focus:outline-none focus:bg-muted/30 rounded"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  dir="rtl"
                                />
                              )}
                              {columnType === 'text' && (
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) => {
                                    const newRows = [...block.data.rows];
                                    newRows[rowIndex][cellIndex] = e.target.value;
                                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: newRows }, indicatorId, practiceId, questionId);
                                  }}
                                  className="w-full px-2 py-1 text-right focus:outline-none focus:bg-muted/30 rounded"
                                  style={{ fontSize: 'var(--text-sm)' }}
                                  dir="rtl"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newRow = new Array(block.data.columns.length).fill('');
                    onUpdateContentBlock(criterionId, block.id, { ...block.data, rows: [...block.data.rows, newRow] }, indicatorId, practiceId, questionId);
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  + إضافة صف
                </button>
                <button
                  onClick={() => {
                    const newColumn = { name: `العمود ${block.data.columns.length + 1}`, type: 'text' };
                    const newRows = block.data.rows.map((row: string[]) => [...row, '']);
                    onUpdateContentBlock(criterionId, block.id, { 
                      ...block.data, 
                      columns: [...block.data.columns, newColumn],
                      rows: newRows
                    }, indicatorId, practiceId, questionId);
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  + إضافة عمود
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FormBuilder({ onCancel, onSave, onPreview }: { onCancel: () => void; onSave: () => void; onPreview: () => void }) {
  const [assessmentTitle] = useState('نموذج المخاطر المالية');
  const [previewContent, setPreviewContent] = useState<{ blocks: ContentBlock[], title: string } | null>(null);
  const [showIndicators, setShowIndicators] = useState<{ [key: string]: boolean }>({});
  const [showPractices, setShowPractices] = useState<{ [key: string]: boolean }>({});
  
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: '1',
      title: 'معيار 1: المعيار المالي',
      isExpanded: true,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '1-1', 
          title: 'مؤشر 1: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: [
            {
              id: '1-1-1',
              title: 'ممارسة 1: ممارسة مالية',
              isExpanded: false,
              status: 'empty',
              contentBlocks: [],
              viewMode: 'edit',
              questions: [
                {
                  id: '1-1-1-1',
                  title: 'سؤال 1: سؤال مالي',
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
          title: 'مؤشر 2: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'completed',
          contentBlocks: [],
          viewMode: 'edit',
          practices: []
        },
        { 
          id: '1-3', 
          title: 'مؤشر 3: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'editing',
          contentBlocks: [],
          viewMode: 'edit',
          practices: []
        },
      ]
    },
    {
      id: '2',
      title: 'معيار 2: المعيار المالي',
      isExpanded: false,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '2-1', 
          title: 'مؤشر 1: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: []
        },
        { 
          id: '2-2', 
          title: 'مؤشر 2: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: []
        },
      ]
    },
    {
      id: '3',
      title: 'معيار 3: المعيار المالي',
      isExpanded: false,
      status: 'empty',
      contentBlocks: [],
      viewMode: 'edit',
      indicators: [
        { 
          id: '3-1', 
          title: 'مؤشر 1: مؤشر', 
          subtitle: 'مالي', 
          isExpanded: false,
          status: 'empty',
          contentBlocks: [],
          viewMode: 'edit',
          practices: []
        },
      ]
    },
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

  const toggleIndicatorsSection = (criterionId: string) => {
    setShowIndicators(prev => ({
      ...prev,
      [criterionId]: !prev[criterionId]
    }));
  };

  const togglePracticesSection = (indicatorId: string) => {
    setShowPractices(prev => ({
      ...prev,
      [indicatorId]: !prev[indicatorId]
    }));
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
      title: `سؤال ${Date.now()}: سؤال جديد`,
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

  const getStatusIcon = (status: ContentStatus) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />;
    } else if (status === 'partial') {
      return (
        <div className="relative w-5 h-5">
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2 A10 10 0 0 1 12 22" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
      );
    } else if (status === 'editing') {
      return <Edit2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-border bg-white" />;
  };

  const handleShowPreview = (blocks: ContentBlock[], title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (blocks.length > 0) {
      setPreviewContent({ blocks, title });
    }
  };

  const handleSaveCriterion = (criterionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const criterion = criteria.find(c => c.id === criterionId);
    if (criterion) {
      toast.success(`تم حفظ ${criterion.title} بنجاح`);
    }
  };

  const handleSaveIndicator = (criterionId: string, indicatorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const criterion = criteria.find(c => c.id === criterionId);
    const indicator = criterion?.indicators.find(i => i.id === indicatorId);
    if (indicator) {
      toast.success(`تم حفظ ${indicator.title} بنجاح`);
    }
  };

  const renderPreviewContent = (blocks: ContentBlock[]) => {
    return blocks.map((block) => {
      if (block.type === 'heading') {
        const HeadingTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            key={block.id} 
            className="font-bold text-foreground text-right mb-3" 
            style={{ fontSize: block.data.level === 1 ? 'var(--text-2xl)' : block.data.level === 2 ? 'var(--text-xl)' : 'var(--text-lg)' }}
          >
            {block.data.text}
          </HeadingTag>
        );
      } else if (block.type === 'text') {
        return (
          <p key={block.id} className="text-foreground text-right leading-relaxed mb-4" style={{ fontSize: 'var(--text-base)' }}>
            {block.data.text}
          </p>
        );
      } else if (block.type === 'list') {
        const ListTag = block.data.listType === 'bullet' ? 'ul' : 'ol';
        return (
          <ListTag key={block.id} className={`text-right space-y-2 mb-4 ${block.data.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pr-6`} dir="rtl">
            {block.data.items.map((item: string, idx: number) => (
              <li key={idx} className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                {item}
              </li>
            ))}
          </ListTag>
        );
      } else if (block.type === 'table') {
        return (
          <div key={block.id} className="overflow-x-auto mb-4">
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
        );
      }
      return null;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background" dir="rtl" style={{ backgroundColor: '#FAFBFC' }}>
        {/* Header with Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                  <span>قائمة التحصيل</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">إضافة محتوى لنموذج المخاطر المالية</span>
                </div>
                <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-2xl)' }}>
                  إضافة محتوى لنموذج المخاطر المالية
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
          <h2 className="font-bold text-foreground mb-6" style={{ fontSize: 'var(--text-xl)' }}>
            كل المعايير
          </h2>

          <div className="space-y-4">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="bg-white rounded-lg border border-border overflow-hidden">
                {/* Criterion Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <div className="flex-1 text-right mx-3">
                      <h3 className="font-bold text-foreground mb-1" style={{ fontSize: 'var(--text-lg)' }}>
                        {criterion.title}
                      </h3>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {criterion.indicators.length} ممارسات و مؤشرات مختلفة
                      </p>
                      
                      {/* Preview Summary when collapsed */}
                      {!criterion.isExpanded && criterion.contentBlocks.length > 0 && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground mb-1">
                            محتوى تمت إضافته
                          </span>
                          <p className="text-muted-foreground text-sm">{getPreviewSummary(criterion.contentBlocks)}</p>
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

                  {/* Criterion Content Area */}
                  {criterion.isExpanded && (
                    <div className={`rounded-lg p-4 mb-4 ${criterion.viewMode === 'preview' ? 'bg-muted/10' : ''}`} style={{ backgroundColor: criterion.viewMode === 'edit' ? '#FFF8E1' : undefined, border: criterion.viewMode === 'edit' ? '1px solid #FFE082' : '1px solid var(--border)' }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FFE082', color: '#7B5A00' }}>
                            معيار
                          </span>
                          {/* Edit/Preview Toggle */}
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
                        <h4 className="font-semibold text-foreground flex-1 text-right mr-3" style={{ fontSize: 'var(--text-base)' }}>
                          {criterion.title}
                        </h4>
                      </div>

                      <p className="text-muted-foreground text-right mb-4" style={{ fontSize: 'var(--text-sm)' }}>
                        اتباع اوسمات معينة لوصف المخاطر المالي من خلال اضافات، مؤشرات، ملفيات او خيارات.
                      </p>

                      {/* Content Blocks */}
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
                          لم يتم إضافة محتوى بعد
                        </div>
                      ) : null}

                      {/* Add Content Buttons - Only in Edit Mode */}
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

                      {/* Action Buttons - Show when content exists and in Edit Mode */}
                      {criterion.contentBlocks.length > 0 && criterion.viewMode === 'edit' && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                          <button
                            onClick={(e) => handleShowPreview(criterion.contentBlocks, criterion.title, e)}
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white"
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <Eye className="w-4 h-4" />
                            <span>معاينة</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info(`تم حفظ ${criterion.title} كمسودة`);
                            }}
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white"
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>حفظ كمسودة</span>
                          </button>
                          <button
                            onClick={(e) => handleSaveCriterion(criterion.id, e)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium"
                            style={{ 
                              fontSize: 'var(--text-sm)',
                              backgroundColor: 'var(--success)',
                              color: 'white'
                            }}
                          >
                            <Save className="w-4 h-4" />
                            <span>حفظ</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Indicators Toggle */}
                  {criterion.isExpanded && (
                    <>
                      <button
                        onClick={() => toggleIndicatorsSection(criterion.id)}
                        className="flex items-center justify-between w-full p-3 hover:bg-muted/30 rounded-lg transition-colors"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${showIndicators[criterion.id] ? 'rotate-180' : ''}`} />
                        <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                          تفاصيل المؤشرات
                        </span>
                      </button>

                      {/* Indicators List */}
                      {showIndicators[criterion.id] && (
                        <div className="mt-3 space-y-3 pr-4">
                          {criterion.indicators.map((indicator) => (
                            <div key={indicator.id} className="border border-border rounded-lg">
                              <div
                                className="flex items-center justify-between p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                                onClick={() => toggleIndicator(criterion.id, indicator.id)}
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform ${indicator.isExpanded ? 'rotate-180' : ''}`} />
                                <div className="flex-1 text-right mr-3">
                                  <div className="flex items-center justify-end gap-2">
                                    {getStatusIcon(indicator.status)}
                                    <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                      {indicator.title}
                                    </span>
                                  </div>
                                  
                                  {/* Preview Summary when collapsed */}
                                  {!indicator.isExpanded && indicator.contentBlocks.length > 0 && (
                                    <div className="mt-1">
                                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-white text-muted-foreground">
                                        محتوى تمت إضافته
                                      </span>
                                      <p className="text-muted-foreground text-xs mt-0.5">{getPreviewSummary(indicator.contentBlocks)}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Indicator Content */}
                              {indicator.isExpanded && (
                                <div className={`p-4 ${indicator.viewMode === 'preview' ? 'bg-muted/5' : 'bg-white'}`}>
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                      مؤشر
                                    </span>
                                    {/* Edit/Preview Toggle */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleViewMode(criterion.id, indicator.id);
                                      }}
                                      className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted transition-colors"
                                      style={{ fontSize: 'var(--text-xs)' }}
                                    >
                                      {indicator.viewMode === 'edit' ? (
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

                                  {/* Content Blocks */}
                                  {indicator.contentBlocks.length > 0 ? (
                                    <div className="space-y-2 mb-4">
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
                                    <div className="text-center py-3 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                      لم يتم إضافة محتوى بعد
                                    </div>
                                  ) : null}

                                  {/* Add Content Buttons - Only in Edit Mode */}
                                  {indicator.viewMode === 'edit' && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addContentBlock(criterion.id, 'heading', indicator.id);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <Type className="w-4 h-4" />
                                        <span>عنوان</span>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addContentBlock(criterion.id, 'text', indicator.id);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <AlignLeft className="w-4 h-4" />
                                        <span>نص</span>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addContentBlock(criterion.id, 'list', indicator.id);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <List className="w-4 h-4" />
                                        <span>قائمة</span>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addContentBlock(criterion.id, 'table', indicator.id);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <Table2 className="w-4 h-4" />
                                        <span>جدول</span>
                                      </button>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  {indicator.contentBlocks.length > 0 && indicator.viewMode === 'edit' && (
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                                      <button
                                        onClick={(e) => handleShowPreview(indicator.contentBlocks, indicator.title, e)}
                                        className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>معاينة</span>
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toast.info(`تم حفظ ${indicator.title} كمسودة`);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg hover:bg-white transition-colors text-foreground bg-white"
                                        style={{ fontSize: 'var(--text-sm)' }}
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                        <span>حفظ كمسودة</span>
                                      </button>
                                      <button
                                        onClick={(e) => handleSaveIndicator(criterion.id, indicator.id, e)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors font-medium"
                                        style={{ 
                                          fontSize: 'var(--text-sm)',
                                          backgroundColor: 'var(--success)',
                                          color: 'white'
                                        }}
                                      >
                                        <Save className="w-3.5 h-3.5" />
                                        <span>حفظ</span>
                                      </button>
                                    </div>
                                  )}

                                  {/* Practices Section */}
                                  {indicator.practices.length > 0 && (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          togglePracticesSection(indicator.id);
                                        }}
                                        className="flex items-center justify-between w-full p-2 mt-3 hover:bg-muted/30 rounded-lg transition-colors"
                                      >
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showPractices[indicator.id] ? 'rotate-180' : ''}`} />
                                        <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                          تفاصيل الممارسات
                                        </span>
                                      </button>

                                      {showPractices[indicator.id] && (
                                        <div className="mt-2 space-y-2 pr-3">
                                          {indicator.practices.map((practice) => (
                                            <div key={practice.id} className="border border-border rounded-lg">
                                              <div
                                                className="flex items-center justify-between p-2 bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer rounded-lg"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  togglePractice(criterion.id, indicator.id, practice.id);
                                                }}
                                              >
                                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${practice.isExpanded ? 'rotate-180' : ''}`} />
                                                <div className="flex-1 text-right mr-2">
                                                  <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                                                    {practice.title}
                                                  </span>
                                                  
                                                  {/* Preview Summary */}
                                                  {!practice.isExpanded && practice.contentBlocks.length > 0 && (
                                                    <div className="mt-1">
                                                      <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-white text-muted-foreground">
                                                        محتوى تمت إضافته
                                                      </span>
                                                      <p className="text-muted-foreground text-xs mt-0.5">{getPreviewSummary(practice.contentBlocks)}</p>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>

                                              {/* Practice Content */}
                                              {practice.isExpanded && (
                                                <div className={`p-3 ${practice.viewMode === 'preview' ? 'bg-muted/5' : 'bg-white'}`}>
                                                  <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                      ممارسة
                                                    </span>
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleViewMode(criterion.id, indicator.id, practice.id);
                                                      }}
                                                      className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted transition-colors"
                                                      style={{ fontSize: 'var(--text-xs)' }}
                                                    >
                                                      {practice.viewMode === 'edit' ? (
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

                                                  {/* Content Blocks */}
                                                  {practice.contentBlocks.length > 0 ? (
                                                    <div className="space-y-2 mb-3">
                                                      {practice.contentBlocks.map((block, index) => (
                                                        <DraggableContentBlock
                                                          key={block.id}
                                                          block={block}
                                                          index={index}
                                                          criterionId={criterion.id}
                                                          indicatorId={indicator.id}
                                                          practiceId={practice.id}
                                                          isPreviewMode={practice.viewMode === 'preview'}
                                                          onUpdateContentBlock={updateContentBlock}
                                                          onDeleteContentBlock={deleteContentBlock}
                                                          onMoveContentBlock={moveContentBlock}
                                                        />
                                                      ))}
                                                    </div>
                                                  ) : practice.viewMode === 'preview' ? (
                                                    <div className="text-center py-2 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                                      لم يتم إضافة محتوى بعد
                                                    </div>
                                                  ) : null}

                                                  {/* Questions Section */}
                                                  <div className="mt-3 space-y-2">
                                                    {practice.questions.length > 0 && practice.questions.map((question) => (
                                                      <div key={question.id} className="border border-border rounded-lg">
                                                          <div
                                                            className="flex items-center justify-between p-2 bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer rounded-lg"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              toggleQuestion(criterion.id, indicator.id, practice.id, question.id);
                                                            }}
                                                          >
                                                            <ChevronDown className={`w-3 h-3 transition-transform ${question.isExpanded ? 'rotate-180' : ''}`} />
                                                            <div className="flex-1 text-right mr-2">
                                                              <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                                                {question.title}
                                                              </span>
                                                              
                                                              {/* Preview Summary */}
                                                              {!question.isExpanded && question.contentBlocks.length > 0 && (
                                                                <div className="mt-1">
                                                                  <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-white text-muted-foreground">
                                                                    محتوى تمت إضافته
                                                                  </span>
                                                                  <p className="text-muted-foreground text-xs mt-0.5">{getPreviewSummary(question.contentBlocks)}</p>
                                                                </div>
                                                              )}
                                                            </div>
                                                          </div>

                                                          {/* Question Content */}
                                                          {question.isExpanded && (
                                                            <div className={`p-3 ${question.viewMode === 'preview' ? 'bg-muted/5' : 'bg-white'}`}>
                                                              <div className="flex items-center gap-2 mb-2">
                                                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                                  سؤال
                                                                </span>
                                                                <button
                                                                  onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleViewMode(criterion.id, indicator.id, practice.id, question.id);
                                                                  }}
                                                                  className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted transition-colors"
                                                                  style={{ fontSize: 'var(--text-xs)' }}
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
                                                              </div>

                                                              {/* Content Blocks */}
                                                              {question.contentBlocks.length > 0 ? (
                                                                <div className="space-y-2 mb-3">
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
                                                                <div className="text-center py-2 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                                                                  لم يتم إضافة محتوى بعد
                                                                </div>
                                                              ) : null}

                                                              {/* Add Content Buttons */}
                                                              {question.viewMode === 'edit' && (
                                                                <div className="flex flex-wrap gap-1.5">
                                                                  <button
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      addContentBlock(criterion.id, 'heading', indicator.id, practice.id, question.id);
                                                                    }}
                                                                    className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                                                    style={{ fontSize: 'var(--text-xs)' }}
                                                                  >
                                                                    <Type className="w-3 h-3" />
                                                                    <span>عنوان</span>
                                                                  </button>
                                                                  <button
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      addContentBlock(criterion.id, 'text', indicator.id, practice.id, question.id);
                                                                    }}
                                                                    className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                                                    style={{ fontSize: 'var(--text-xs)' }}
                                                                  >
                                                                    <AlignLeft className="w-3 h-3" />
                                                                    <span>نص</span>
                                                                  </button>
                                                                  <button
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      addContentBlock(criterion.id, 'list', indicator.id, practice.id, question.id);
                                                                    }}
                                                                    className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                                                    style={{ fontSize: 'var(--text-xs)' }}
                                                                  >
                                                                    <List className="w-3 h-3" />
                                                                    <span>قائمة</span>
                                                                  </button>
                                                                  <button
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      addContentBlock(criterion.id, 'table', indicator.id, practice.id, question.id);
                                                                    }}
                                                                    className="flex items-center gap-1 px-2 py-1 border border-border rounded hover:bg-muted transition-colors text-foreground bg-white"
                                                                    style={{ fontSize: 'var(--text-xs)' }}
                                                                  >
                                                                    <Table2 className="w-3 h-3" />
                                                                    <span>جدول</span>
                                                                  </button>
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      ))}
                                                    
                                                    {/* Add Question Button */}
                                                    {practice.viewMode === 'edit' && (
                                                      <button
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          addQuestion(criterion.id, indicator.id, practice.id);
                                                        }}
                                                        className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg hover:bg-muted transition-colors text-foreground w-full justify-center"
                                                        style={{ fontSize: 'var(--text-sm)' }}
                                                      >
                                                        <Plus className="w-4 h-4" />
                                                        <span>إضافة سؤال</span>
                                                      </button>
                                                    )}
                                                    </div>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Modal */}
        {previewContent && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" 
            onClick={() => setPreviewContent(null)}
            dir="rtl"
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <button
                  onClick={() => setPreviewContent(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
                  {previewContent.title}
                </h2>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {renderPreviewContent(previewContent.blocks)}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-start gap-3 p-6 border-t border-border">
                <button
                  onClick={() => setPreviewContent(null)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-foreground"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
