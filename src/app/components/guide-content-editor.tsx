import { useState, useRef } from 'react';
import { Eye, Edit2, Type, AlignLeft, List, Table2, Trash2, Save, ChevronRight, GripVertical } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';
import { GuideMetadata } from './guide-metadata-modal';

interface ContentBlock {
  id: string;
  type: 'heading' | 'text' | 'list' | 'table';
  data: any;
}

type ViewMode = 'edit' | 'preview';

// Draggable Content Block Component
interface DraggableContentBlockProps {
  block: ContentBlock;
  index: number;
  isPreviewMode?: boolean;
  onUpdateContentBlock: (blockId: string, data: any) => void;
  onDeleteContentBlock: (blockId: string) => void;
  onMoveContentBlock: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableContentBlock({
  block,
  index,
  isPreviewMode = false,
  onUpdateContentBlock,
  onDeleteContentBlock,
  onMoveContentBlock,
}: DraggableContentBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'contentBlock',
    item: { index },
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

      onMoveContentBlock(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  if (!isPreviewMode) {
    drag(drop(ref));
  }

  // Preview mode rendering
  if (isPreviewMode) {
    return (
      <div className="mb-4">
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
          <ul className={`text-right space-y-1.5 ${block.data.listType === 'bullet' ? 'list-disc' : 'list-decimal'} pr-6`} dir="rtl">
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
          onClick={() => onDeleteContentBlock(block.id)}
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
                  onChange={(e) => onUpdateContentBlock(block.id, { ...block.data, level: Number(e.target.value) })}
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
                  onChange={(e) => onUpdateContentBlock(block.id, { ...block.data, text: e.target.value })}
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
                onChange={(e) => onUpdateContentBlock(block.id, { text: e.target.value })}
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
                    onClick={() => onUpdateContentBlock(block.id, { ...block.data, listType: 'bullet' })}
                    className={`px-2 py-1 rounded ${block.data.listType === 'bullet' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    نقاط
                  </button>
                  <button
                    onClick={() => onUpdateContentBlock(block.id, { ...block.data, listType: 'number' })}
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
                        onUpdateContentBlock(block.id, { ...block.data, items: newItems });
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
                          onUpdateContentBlock(block.id, { ...block.data, items: newItems });
                        }}
                        className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  const newItems = [...block.data.items, ''];
                  onUpdateContentBlock(block.id, { ...block.data, items: newItems });
                }}
                className="text-primary hover:text-primary/80 font-medium"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                + إضافة عنصر
              </button>
            </div>
          )}

          {/* Table Block - Simplified */}
          {block.type === 'table' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-muted-foreground" />
                <span style={{ fontSize: 'var(--text-xs)' }} className="text-muted-foreground">جدول</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-lg" dir="rtl">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="px-3 py-2 text-right border-b border-border bg-muted/50">
                        <button
                          onClick={() => {
                            const newColumns = [...block.data.columns, { name: 'عمود جديد', type: 'text' }];
                            const newRows = block.data.rows.map((row: string[]) => [...row, '']);
                            onUpdateContentBlock(block.id, { ...block.data, columns: newColumns, rows: newRows });
                          }}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
                          style={{ fontSize: 'var(--text-xs)' }}
                        >
                          <span>+ إضافة عمود</span>
                        </button>
                      </th>
                      {block.data.columns.map((col: any, colIndex: number) => (
                        <th key={colIndex} className="px-3 py-2 text-right border-b border-border">
                          <input
                            type="text"
                            value={col.name}
                            onChange={(e) => {
                              const newColumns = [...block.data.columns];
                              newColumns[colIndex] = { ...col, name: e.target.value };
                              onUpdateContentBlock(block.id, { ...block.data, columns: newColumns });
                            }}
                            className="w-full px-2 py-1 border border-border rounded text-right focus:outline-none focus:ring-2 focus:ring-primary"
                            style={{ fontSize: 'var(--text-xs)' }}
                            placeholder="اسم العمود"
                            dir="rtl"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.rows.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex} className="hover:bg-muted/10">
                        <td className="px-3 py-2 text-center border-b border-border bg-muted/10 text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                          {rowIndex + 1}
                        </td>
                        {row.map((cell: string, cellIndex: number) => (
                          <td key={cellIndex} className="px-3 py-2 text-right border-b border-border">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => {
                                const newRows = [...block.data.rows];
                                newRows[rowIndex][cellIndex] = e.target.value;
                                onUpdateContentBlock(block.id, { ...block.data, rows: newRows });
                              }}
                              className="w-full px-2 py-1 border border-border rounded text-right focus:outline-none focus:ring-2 focus:ring-primary"
                              style={{ fontSize: 'var(--text-xs)' }}
                              placeholder="محتوى الخلية"
                              dir="rtl"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => {
                  const newRows = [...block.data.rows, new Array(block.data.columns.length).fill('')];
                  onUpdateContentBlock(block.id, { ...block.data, rows: newRows });
                }}
                className="text-primary hover:text-primary/80 font-medium w-full text-center py-2 border border-dashed border-border rounded hover:bg-muted/30 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                + إضافة صف
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GuideContentEditor({ onCancel, onSave, metadata }: { onCancel: () => void; onSave: () => void; metadata?: GuideMetadata }) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');

  const addContentBlock = (type: ContentBlock['type']) => {
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

    setContentBlocks(prev => [...prev, newBlock]);
  };

  const updateContentBlock = (blockId: string, data: any) => {
    setContentBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, data } : block
    ));
  };

  const deleteContentBlock = (blockId: string) => {
    setContentBlocks(prev => prev.filter(block => block.id !== blockId));
  };

  const moveContentBlock = (dragIndex: number, hoverIndex: number) => {
    setContentBlocks(prev => {
      const newBlocks = [...prev];
      const [removed] = newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, removed);
      return newBlocks;
    });
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'edit' ? 'preview' : 'edit');
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
                  <span className="text-foreground">محتوى دليل</span>
                </div>
                <h1 className="font-bold text-foreground" style={{ fontSize: 'var(--text-2xl)' }}>
                  {metadata?.contentName || 'دليل الإرشادات المالية'}
                </h1>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                    محتوى حر بدون مستويات أو تقييمات • مقالة معرفية
                  </p>
                  {metadata?.entityTypes && metadata.entityTypes.length > 0 && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex gap-1">
                        {metadata.entityTypes.map((type, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {type}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {metadata?.entitySize && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {metadata.entitySize}
                      </span>
                    </>
                  )}
                </div>
                {metadata?.audience && metadata.audience.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>الجمهور:</span>
                    <div className="flex gap-1 flex-wrap">
                      {metadata.audience.map((aud, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                    toast.success('تم حفظ محتوى الدليل بنجاح');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    backgroundColor: 'var(--success)',
                    color: 'white'
                  }}
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ محتوى الدليل</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg border-2 border-border shadow-sm p-6">
            {/* Content Editor Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                {viewMode === 'edit' ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>معاينة المحتوى</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    <span>تعديل المحتوى</span>
                  </>
                )}
              </button>
              <h2 className="font-bold text-foreground" style={{ fontSize: 'var(--text-xl)' }}>
                محتوى الدليل
              </h2>
            </div>

            {/* Content Blocks */}
            {contentBlocks.length > 0 ? (
              <div className={`${viewMode === 'edit' ? 'space-y-3' : 'space-y-4'} mb-6`}>
                {contentBlocks.map((block, index) => (
                  <DraggableContentBlock
                    key={block.id}
                    block={block}
                    index={index}
                    isPreviewMode={viewMode === 'preview'}
                    onUpdateContentBlock={updateContentBlock}
                    onDeleteContentBlock={deleteContentBlock}
                    onMoveContentBlock={moveContentBlock}
                  />
                ))}
              </div>
            ) : viewMode === 'preview' ? (
              <div className="text-center py-12 text-muted-foreground bg-muted/10 rounded-lg border border-dashed border-border" style={{ fontSize: 'var(--text-base)' }}>
                لم يتم إضافة محتوى الدليل بعد
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground bg-muted/10 rounded-lg border border-dashed border-border mb-6" style={{ fontSize: 'var(--text-base)' }}>
                لم يتم إضافة محتوى الدليل بعد
              </div>
            )}

            {/* Add Content Block Buttons */}
            {viewMode === 'edit' && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addContentBlock('heading')}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white hover:border-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <Type className="w-5 h-5" />
                  <span className="font-medium">عنوان</span>
                </button>
                <button
                  onClick={() => addContentBlock('text')}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white hover:border-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <AlignLeft className="w-5 h-5" />
                  <span className="font-medium">نص</span>
                </button>
                <button
                  onClick={() => addContentBlock('list')}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white hover:border-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <List className="w-5 h-5" />
                  <span className="font-medium">قائمة</span>
                </button>
                <button
                  onClick={() => addContentBlock('table')}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors text-foreground bg-white hover:border-primary"
                  style={{ fontSize: 'var(--text-sm)' }}
                >
                  <Table2 className="w-5 h-5" />
                  <span className="font-medium">جدول</span>
                </button>
              </div>
            )}
          </div>

          {/* Help Text */}
          {viewMode === 'edit' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                💡 هذا محتوى حر بدون هيكل تقييمي. يمكنك إضافة المحتوى بحرية باستخدام الكتل أعلاه.
              </p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}