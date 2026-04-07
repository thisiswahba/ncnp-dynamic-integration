import { useState } from 'react';
import { 
  Type, 
  AlignLeft, 
  List, 
  Table2, 
  Image as ImageIcon, 
  FileText, 
  MessageCircle,
  Plus,
  ChevronDown,
  GripVertical,
  Trash2,
  Minus,
  Eye,
  Edit3
} from 'lucide-react';
import svgPaths from "@/imports/svg-agzaxq2frq";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ContentItem {
  id: number;
  type: string;
  data?: any;
}

interface ContentEditorModalProps {
  criterionId?: string;
  indicatorId?: string;
  onClose: () => void;
  onSave?: (content: ContentItem[]) => void;
  criterionTitle?: string;
  indicatorTitle?: string;
  questionTitle?: string;
  existingContent?: ContentItem[];
}

// Heading Card Component
function HeadingCard({ item, onUpdate, onDelete }: { item: ContentItem; onUpdate: (data: any) => void; onDelete: () => void }) {
  const [headingLevel, setHeadingLevel] = useState(item.data?.level || 'H2');
  const [headingText, setHeadingText] = useState(item.data?.text || '');
  const [showDropdown, setShowDropdown] = useState(false);

  const headingLevels = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  const handleLevelChange = (level: string) => {
    setHeadingLevel(level);
    setShowDropdown(false);
    onUpdate({ level, text: headingText });
  };

  const handleTextChange = (text: string) => {
    setHeadingText(text);
    onUpdate({ level: headingLevel, text });
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#d2d6db] p-[24px]">
      <div className="flex items-center justify-between mb-[16px]">
        <p className="text-[14px] text-[#64748b]">مستوى العنوان</p>
        <button onClick={onDelete} className="text-[#dc2626] hover:text-[#b91c1c]">
          <Trash2 className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* Heading Level Dropdown */}
      <div className="relative mb-[12px]">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full h-[44px] px-[16px] border border-[#d2d6db] rounded-[8px] flex items-center justify-between bg-white hover:bg-[#f9fafb] transition-colors"
        >
          <ChevronDown className="w-[20px] h-[20px] text-[#64748b]" />
          <span className="text-[14px] text-[#161616]">{headingLevel}</span>
        </button>
        {showDropdown && (
          <div className="absolute left-0 right-0 top-[48px] bg-white border border-[#d2d6db] rounded-[8px] shadow-lg z-10">
            {headingLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className="w-full h-[40px] px-[16px] text-right text-[14px] text-[#161616] hover:bg-[#f9fafb] transition-colors first:rounded-t-[8px] last:rounded-b-[8px]"
              >
                {level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Heading Text Input */}
      <input
        type="text"
        value={headingText}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="أدخل عنوان القسم"
        className="w-full h-[44px] px-[16px] border border-[#d2d6db] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b8354] focus:border-transparent"
      />
    </div>
  );
}

// Text Card Component
function TextCard({ item, onUpdate, onDelete }: { item: ContentItem; onUpdate: (data: any) => void; onDelete: () => void }) {
  const [text, setText] = useState(item.data?.text || '');

  const handleTextChange = (value: string) => {
    setText(value);
    onUpdate({ text: value });
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#d2d6db] p-[24px]">
      <div className="flex items-center justify-end mb-[16px]">
        <button onClick={onDelete} className="text-[#dc2626] hover:text-[#b91c1c] ml-auto">
          <Trash2 className="w-[18px] h-[18px]" />
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="أدخل النص التوضيحي المرتبط بهذا السؤال"
        className="w-full min-h-[150px] px-[16px] py-[12px] border border-[#d2d6db] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b8354] focus:border-transparent resize-none"
      />
    </div>
  );
}

// List Card Component
function ListCard({ item, onUpdate, onDelete }: { item: ContentItem; onUpdate: (data: any) => void; onDelete: () => void }) {
  const [listType, setListType] = useState<'bullets' | 'numbers'>(item.data?.listType || 'bullets');
  const [items, setItems] = useState<string[]>(item.data?.items || ['', '']);

  const handleListTypeChange = (type: 'bullets' | 'numbers') => {
    setListType(type);
    onUpdate({ listType: type, items });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    onUpdate({ listType, items: newItems });
  };

  const handleAddItem = () => {
    const newItems = [...items, ''];
    setItems(newItems);
    onUpdate({ listType, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      onUpdate({ listType, items: newItems });
    }
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#d2d6db] p-[24px]">
      <div className="flex items-center justify-end mb-[16px]">
        <button onClick={onDelete} className="text-[#dc2626] hover:text-[#b91c1c] ml-auto">
          <Trash2 className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* List Type Radio Buttons */}
      <div className="flex items-center gap-[24px] justify-end mb-[16px]">
        <label className="flex items-center gap-[8px] cursor-pointer">
          <span className="text-[14px] text-[#161616]">أرقام</span>
          <input
            type="radio"
            name={`list-type-${item.id}`}
            checked={listType === 'numbers'}
            onChange={() => handleListTypeChange('numbers')}
            className="w-[18px] h-[18px] text-[#1b8354] accent-[#1b8354] cursor-pointer"
          />
        </label>
        <label className="flex items-center gap-[8px] cursor-pointer">
          <span className="text-[14px] text-[#161616]">نقاط</span>
          <input
            type="radio"
            name={`list-type-${item.id}`}
            checked={listType === 'bullets'}
            onChange={() => handleListTypeChange('bullets')}
            className="w-[18px] h-[18px] text-[#1b8354] accent-[#1b8354] cursor-pointer"
          />
        </label>
      </div>

      {/* List Items */}
      <div className="space-y-[8px] mb-[16px]">
        {items.map((itemText, index) => (
          <div key={index} className="flex items-center gap-[12px]">
            <button
              onClick={() => handleRemoveItem(index)}
              className="text-[#dc2626] hover:text-[#b91c1c] opacity-0 hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-[16px] h-[16px]" />
            </button>
            <input
              type="text"
              value={itemText}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder="عنصر القائمة"
              className="flex-1 h-[44px] px-[16px] border border-[#d2d6db] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b8354] focus:border-transparent"
            />
            <div className="cursor-move text-[#9ca3af]">
              <GripVertical className="w-[20px] h-[20px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <button
        onClick={handleAddItem}
        className="w-full h-[44px] border border-dashed border-[#d2d6db] rounded-[8px] flex items-center justify-center gap-[8px] text-[14px] text-[#161616] hover:bg-[#f9fafb] transition-colors"
      >
        <span>إضافة عنصر</span>
        <Plus className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
}

// Table Card Component
function TableCard({ item, onUpdate, onDelete }: { item: ContentItem; onUpdate: (data: any) => void; onDelete: () => void }) {
  interface TableColumn {
    id: number;
    name: string;
    type: 'text' | 'attachment' | 'tag' | 'status';
  }

  interface TableRow {
    id: number;
    cells: { [key: number]: any };
  }

  const initialColumns: TableColumn[] = item.data?.columns || [
    { id: 1, name: '', type: 'text' },
    { id: 2, name: '', type: 'text' }
  ];

  const initialRows: TableRow[] = item.data?.rows || [
    { id: 1, cells: {} },
    { id: 2, cells: {} }
  ];

  const [columns, setColumns] = useState<TableColumn[]>(initialColumns);
  const [rows, setRows] = useState<TableRow[]>(initialRows);
  const [columnTypeDropdown, setColumnTypeDropdown] = useState<number | null>(null);

  const columnTypes = [
    { value: 'text', label: 'نص', icon: Type },
    { value: 'attachment', label: 'مرفق', icon: FileText },
    { value: 'tag', label: 'وسم', icon: MessageCircle },
    { value: 'status', label: 'حالة', icon: AlignLeft }
  ];

  const statusOptions = [
    { value: 'todo', label: 'قيد الانتظار', color: '#9ca3af', bgColor: '#f3f4f6' },
    { value: 'in-progress', label: 'قيد التنفيذ', color: '#2563eb', bgColor: '#dbeafe' },
    { value: 'done', label: 'مكتمل', color: '#16a34a', bgColor: '#dcfce7' },
    { value: 'blocked', label: 'محظور', color: '#dc2626', bgColor: '#fee2e2' }
  ];

  const tagOptions = [
    { value: 'important', label: 'مهم', color: '#dc2626', bgColor: '#fee2e2' },
    { value: 'urgent', label: 'عاجل', color: '#ea580c', bgColor: '#ffedd5' },
    { value: 'low-priority', label: 'أولوية منخفضة', color: '#16a34a', bgColor: '#dcfce7' },
    { value: 'review', label: 'مراجعة', color: '#9333ea', bgColor: '#f3e8ff' }
  ];

  const updateData = (newColumns: TableColumn[], newRows: TableRow[]) => {
    setColumns(newColumns);
    setRows(newRows);
    onUpdate({ columns: newColumns, rows: newRows });
  };

  const handleColumnNameChange = (columnId: number, name: string) => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, name } : col
    );
    updateData(newColumns, rows);
  };

  const handleColumnTypeChange = (columnId: number, type: 'text' | 'attachment' | 'tag' | 'status') => {
    const newColumns = columns.map(col => 
      col.id === columnId ? { ...col, type } : col
    );
    setColumnTypeDropdown(null);
    updateData(newColumns, rows);
  };

  const handleCellChange = (rowId: number, columnId: number, value: any) => {
    const newRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: { ...row.cells, [columnId]: value }
        };
      }
      return row;
    });
    updateData(columns, newRows);
  };

  const handleAddColumn = () => {
    const newColumn: TableColumn = {
      id: Date.now(),
      name: '',
      type: 'text'
    };
    updateData([...columns, newColumn], rows);
  };

  const handleRemoveColumn = (columnId: number) => {
    if (columns.length > 1) {
      const newColumns = columns.filter(col => col.id !== columnId);
      const newRows = rows.map(row => {
        const newCells = { ...row.cells };
        delete newCells[columnId];
        return { ...row, cells: newCells };
      });
      updateData(newColumns, newRows);
    }
  };

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: Date.now(),
      cells: {}
    };
    updateData(columns, [...rows, newRow]);
  };

  const handleRemoveRow = (rowId: number) => {
    if (rows.length > 1) {
      const newRows = rows.filter(row => row.id !== rowId);
      updateData(columns, newRows);
    }
  };

  // Render cell based on column type
  const renderCell = (row: TableRow, column: TableColumn) => {
    const value = row.cells[column.id];

    switch (column.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
            placeholder="قيمة الخلية"
            className="w-full h-[44px] px-[12px] bg-white text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b8354] focus:ring-inset"
          />
        );

      case 'attachment':
        return (
          <div className="w-full h-[44px] px-[12px] bg-white flex items-center">
            <label className="cursor-pointer flex items-center gap-[8px] text-[14px] text-[#64748b] hover:text-[#161616]">
              <FileText className="w-[16px] h-[16px]" />
              <span>{value ? value : 'رفع ملف'}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const fileName = e.target.files?.[0]?.name;
                  if (fileName) {
                    handleCellChange(row.id, column.id, fileName);
                  }
                }}
              />
            </label>
          </div>
        );

      case 'tag':
        return (
          <div className="w-full h-[44px] px-[12px] bg-white flex items-center">
            <select
              value={value || ''}
              onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
              className="w-full h-[28px] px-[8px] rounded-[4px] text-[12px] font-medium border-0 focus:outline-none"
              style={{
                backgroundColor: value ? tagOptions.find(t => t.value === value)?.bgColor : '#f9fafb',
                color: value ? tagOptions.find(t => t.value === value)?.color : '#64748b'
              }}
            >
              <option value="">اختر وسم</option>
              {tagOptions.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'status':
        return (
          <div className="w-full h-[44px] px-[12px] bg-white flex items-center">
            <select
              value={value || ''}
              onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
              className="w-full h-[28px] px-[8px] rounded-[4px] text-[12px] font-medium border-0 focus:outline-none"
              style={{
                backgroundColor: value ? statusOptions.find(s => s.value === value)?.bgColor : '#f9fafb',
                color: value ? statusOptions.find(s => s.value === value)?.color : '#64748b'
              }}
            >
              <option value="">اختر حالة</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-[8px] border border-[#d2d6db] p-[24px]">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-[16px]">
        <button
          onClick={onDelete}
          className="text-[#dc2626] hover:text-[#b91c1c]"
        >
          <Trash2 className="w-[18px] h-[18px]" />
        </button>
        <p className="text-[14px] text-[#64748b]">جدول</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-[16px]" dir="rtl">
        <div className="inline-block min-w-full">
          {/* Header Row */}
          <div className="flex border-b border-[#d2d6db]">
            {/* Row actions column - RIGHT SIDE */}
            <div className="w-[40px] flex-shrink-0 bg-[#f9fafb] border-r border-[#d2d6db] order-first"></div>
            
            {/* Column Headers */}
            {columns.map((column) => {
              const ColumnTypeIcon = columnTypes.find(t => t.value === column.type)?.icon || Type;
              return (
                <div key={column.id} className="flex-1 min-w-[180px] relative group">
                  <div className="flex flex-col h-[66px] bg-[#f9fafb] border-r border-[#d2d6db] first:border-r-0">
                    {/* Column Name */}
                    <div className="flex items-center h-[33px] border-b border-[#e5e7eb]">
                      <input
                        type="text"
                        value={column.name}
                        onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                        placeholder="اسم العمود"
                        className="w-full h-full px-[12px] bg-transparent text-[14px] font-medium text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#1b8354] focus:ring-inset text-right"
                      />
                      {columns.length > 1 && (
                        <button
                          onClick={() => handleRemoveColumn(column.id)}
                          className="absolute top-[2px] right-[2px] opacity-0 group-hover:opacity-100 transition-opacity p-[4px] bg-white rounded-[4px] shadow-sm border border-[#d2d6db] z-10"
                        >
                          <Trash2 className="w-[14px] h-[14px] text-[#dc2626]" />
                        </button>
                      )}
                    </div>
                    
                    {/* Column Type */}
                    <div className="flex items-center h-[33px] relative">
                      <button
                        onClick={() => setColumnTypeDropdown(columnTypeDropdown === column.id ? null : column.id)}
                        className="w-full h-full px-[12px] flex items-center justify-start gap-[6px] hover:bg-[#f3f4f6] transition-colors text-right"
                      >
                        <ChevronDown className="w-[14px] h-[14px] text-[#64748b]" />
                        <span className="text-[12px] text-[#64748b]">
                          {columnTypes.find(t => t.value === column.type)?.label}
                        </span>
                        <ColumnTypeIcon className="w-[14px] h-[14px] text-[#64748b]" />
                      </button>
                      
                      {/* Column Type Dropdown */}
                      {columnTypeDropdown === column.id && (
                        <div className="absolute top-full right-0 mt-[2px] bg-white border border-[#d2d6db] rounded-[8px] shadow-lg z-20 min-w-[160px]">
                          {columnTypes.map((type) => {
                            const TypeIcon = type.icon;
                            return (
                              <button
                                key={type.value}
                                onClick={() => handleColumnTypeChange(column.id, type.value as any)}
                                className="w-full h-[36px] px-[12px] flex items-center justify-end gap-[8px] hover:bg-[#f9fafb] transition-colors first:rounded-t-[8px] last:rounded-b-[8px]"
                              >
                                <span className="text-[12px] text-[#161616]">{type.label}</span>
                                <TypeIcon className="w-[14px] h-[14px] text-[#64748b]" />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Add Column Button - LEFT SIDE */}
            <div className="w-[44px] flex-shrink-0 bg-[#f9fafb] border-r border-[#d2d6db]">
              <button
                onClick={handleAddColumn}
                className="w-full h-[66px] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
              >
                <Plus className="w-[18px] h-[18px] text-[#161616]" />
              </button>
            </div>
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIndex) => (
            <div key={row.id} className="flex border-b border-[#d2d6db] last:border-b-0 group">
              {/* Row Actions Column - RIGHT SIDE */}
              <div className="w-[40px] flex-shrink-0 bg-[#fafafa] border-r border-[#d2d6db] flex items-center justify-center order-first">
                <div className="flex items-center gap-[4px]">
                  <button
                    onClick={() => handleRemoveRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={rows.length <= 1}
                  >
                    <Trash2 className="w-[14px] h-[14px] text-[#dc2626]" />
                  </button>
                </div>
              </div>

              {/* Row Cells */}
              {columns.map((column) => (
                <div key={column.id} className="flex-1 min-w-[180px] border-r border-[#d2d6db] first:border-r-0">
                  {renderCell(row, column)}
                </div>
              ))}

              {/* Empty cell for add column button column - LEFT SIDE */}
              <div className="w-[44px] flex-shrink-0 border-r border-[#d2d6db]"></div>
            </div>
          ))}

          {/* Add Row Button Row */}
          <div className="flex">
            {/* Plus button - RIGHT SIDE */}
            <div className="w-[40px] flex-shrink-0 bg-[#fafafa] border-r border-[#d2d6db] order-first">
              <button
                onClick={handleAddRow}
                className="w-full h-[40px] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
              >
                <Plus className="w-[16px] h-[16px] text-[#161616]" />
              </button>
            </div>
            
            {/* "صف جديد" text spans remaining width */}
            <div className="flex-1 h-[40px] bg-[#fafafa] flex items-center justify-center border-r border-[#d2d6db]">
              <button
                onClick={handleAddRow}
                className="flex items-center gap-[8px] text-[14px] text-[#64748b] hover:text-[#161616] transition-colors"
              >
                <span>صف جديد</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Draggable Content Item Wrapper
const DraggableContentItem = ({ 
  item, 
  index, 
  moveItem, 
  children 
}: { 
  item: ContentItem; 
  index: number; 
  moveItem: (dragIndex: number, hoverIndex: number) => void; 
  children: React.ReactNode;
}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CONTENT_ITEM',
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'CONTENT_ITEM',
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'} ${isOver ? 'border-t-2 border-[#1b8354]' : ''}`}
    >
      {/* Drag Handle */}
      <div className="absolute top-[12px] left-[-32px] cursor-move text-[#9ca3af] hover:text-[#161616] transition-colors">
        <GripVertical className="w-[20px] h-[20px]" />
      </div>
      {children}
    </div>
  );
};

export function ContentEditorModal({
  onClose,
  criterionId,
  indicatorId,
  onSave,
  criterionTitle = 'المعيار المالي ٢',
  indicatorTitle = 'المؤشر المالي ٢',
  questionTitle = 'السؤال المالي ٢',
  existingContent = []
}: ContentEditorModalProps) {
  const [contentItems, setContentItems] = useState<any[]>(existingContent);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const contentTypes = [
    { id: 'heading', label: 'عنوان', icon: Type },
    { id: 'text', label: 'نص', icon: AlignLeft },
    { id: 'list', label: 'قائمة', icon: List },
    { id: 'table', label: 'جدول', icon: Table2 },
    { id: 'image', label: 'صورة', icon: ImageIcon },
    { id: 'pdf', label: 'ملف PDF', icon: FileText },
    { id: 'qa', label: 'سؤال و جواب', icon: MessageCircle }
  ];

  const handleAddContentType = (typeId: string) => {
    // Add content type to the list
    setContentItems([...contentItems, { id: Date.now(), type: typeId }]);
  };

  const handleSave = () => {
    console.log('Saving content...');
    if (onSave) {
      onSave(contentItems);
    }
    onClose();
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newContentItems = [...contentItems];
    const [draggedItem] = newContentItems.splice(dragIndex, 1);
    newContentItems.splice(hoverIndex, 0, draggedItem);
    setContentItems(newContentItems);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" dir="rtl">
      <div className="bg-white rounded-[8px] w-[1440px] h-[959px] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#9da4ae]/[0.14] px-[36px] py-[40px]">
          <div className="flex items-center justify-between">
            {/* Right side: Title */}
            <h2 className="text-[36px] font-semibold text-[#161616] leading-[54px]">
              إضافة محتوي داعم
            </h2>

            {/* Left side: Buttons */}
            <div className="flex items-center gap-[9px]">
              {/* Preview Toggle Button */}
              {contentItems.length > 0 && (
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="px-[16px] py-[8px] border border-[#d2d6db] text-[#161616] rounded-[4px] hover:bg-[#f3f4f6] transition-colors h-[40px] text-[14px] font-medium flex items-center gap-[8px]"
                >
                  {isPreviewMode ? (
                    <>
                      <Edit3 className="w-[18px] h-[18px]" />
                      <span>تعديل</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-[18px] h-[18px]" />
                      <span>معاينة</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={handleSave}
                className="px-[12px] py-[8px] bg-[#1b8354] text-white rounded-[4px] hover:bg-[#166640] transition-colors min-w-[160px] h-[40px] text-[16px] font-medium"
              >
                حفظ
              </button>
              <button
                onClick={onClose}
                className="px-[16px] py-[8px] border border-[#d2d6db] text-[#161616] rounded-[4px] hover:bg-[#f3f4f6] transition-colors min-w-[64px] h-[40px] text-[16px] font-medium"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="px-[36px] py-[16px] grid grid-cols-3 gap-[4px]">
          {/* Criterion Tag */}
          <div className="flex items-center justify-end gap-[4px]">
            <div className="bg-[#ecfdf3] px-[8px] h-[24px] rounded-[9999px] flex items-center">
              <p className="text-[14px] font-medium text-[#085d3a] leading-[20px]">
                {criterionTitle}
              </p>
            </div>
            <p className="text-[16px] text-[#64748b] leading-[20px]">معيار :</p>
            <div className="relative size-[17px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.396 15.2292">
                <path clipRule="evenodd" d={svgPaths.pdf23000} fill="#6C737F" fillRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Indicator Tag */}
          <div className="flex items-center justify-end gap-[4px]">
            <div className="bg-[#ecfdf3] px-[8px] h-[24px] rounded-[9999px] flex items-center">
              <p className="text-[14px] font-medium text-[#085d3a] leading-[20px]">
                {indicatorTitle}
              </p>
            </div>
            <p className="text-[16px] text-[#64748b] leading-[20px]">مؤشر: </p>
            <div className="relative size-[18px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.625 14.625">
                <path clipRule="evenodd" d={svgPaths.p35e40ef0} fill="#6C737F" fillRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Question Tag */}
          <div className="flex items-center justify-end gap-[4px]">
            <div className="bg-[#ecfdf3] px-[8px] h-[24px] rounded-[9999px] flex items-center">
              <p className="text-[14px] font-medium text-[#085d3a] leading-[20px]">
                {questionTitle}
              </p>
            </div>
            <p className="text-[14px] text-[#64748b] leading-[20px]">سؤال: </p>
            <div className="relative size-[18px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
                <g>
                  <path d={svgPaths.p2d3db400} fill="#6C737F" />
                  <path d={svgPaths.p252100} fill="#6C737F" />
                  <path clipRule="evenodd" d={svgPaths.p30eb5a00} fill="#6C737F" fillRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Content Area */}
          <div className={`flex-1 bg-[#f8f9fa] p-[24px] overflow-auto ${isPreviewMode ? 'bg-white' : ''}`}>
            {contentItems.length === 0 ? (
              <div className="bg-[#f3f4f6] border border-dashed border-[#d2d6db] rounded-[4px] h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-[24px] p-[24px]">
                  <div className="relative size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4999 21.5">
                      <g>
                        <g>
                          <path d={svgPaths.p13287480} fill="#161616" />
                          <path d={svgPaths.p37048f00} fill="#161616" />
                          <path d={svgPaths.p2990b480} fill="#161616" />
                          <path d={svgPaths.p254ecc80} fill="#161616" />
                          <path d={svgPaths.p1667e480} fill="#161616" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[8px] items-center text-center">
                    <p className="text-[16px] font-medium text-[#1f2a37] leading-[24px]">
                      ابدأ بإضافة محتوي داعم لهذا السؤال
                    </p>
                    <p className="text-[12px] text-[#384250] leading-[18px]">
                      اختر نوع المحتوي من القائمة علي اليسار
                    </p>
                  </div>
                </div>
              </div>
            ) : isPreviewMode ? (
              // Preview Mode
              <div className="max-w-[900px] mx-auto bg-white p-[48px] rounded-[8px] shadow-sm space-y-[32px]">
                {contentItems.map((item) => {
                  let previewContent;
                  switch (item.type) {
                    case 'heading':
                      previewContent = <HeadingPreview item={item} />;
                      break;
                    case 'text':
                      previewContent = <TextPreview item={item} />;
                      break;
                    case 'list':
                      previewContent = <ListPreview item={item} />;
                      break;
                    case 'table':
                      previewContent = <TablePreview item={item} />;
                      break;
                    default:
                      previewContent = null;
                  }
                  return previewContent ? (
                    <div key={item.id}>
                      {previewContent}
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              // Edit Mode
              <DndProvider backend={HTML5Backend}>
                <div className="space-y-4 pr-[40px]">
                  {contentItems.map((item, index) => {
                    const onUpdate = (data: any) => {
                      const updatedItems = contentItems.map((i) => (i.id === item.id ? { ...i, data } : i));
                      setContentItems(updatedItems);
                    };

                    const onDelete = () => {
                      const updatedItems = contentItems.filter((i) => i.id !== item.id);
                      setContentItems(updatedItems);
                    };

                    let cardContent;
                    switch (item.type) {
                      case 'heading':
                        cardContent = <HeadingCard item={item} onUpdate={onUpdate} onDelete={onDelete} />;
                        break;
                      case 'text':
                        cardContent = <TextCard item={item} onUpdate={onUpdate} onDelete={onDelete} />;
                        break;
                      case 'list':
                        cardContent = <ListCard item={item} onUpdate={onUpdate} onDelete={onDelete} />;
                        break;
                      case 'table':
                        cardContent = <TableCard item={item} onUpdate={onUpdate} onDelete={onDelete} />;
                        break;
                      default:
                        cardContent = <div className="bg-white p-4 rounded-[4px] border border-[#e5e7eb]">
                          Content item: {item.type}
                        </div>;
                    }

                    return (
                      <DraggableContentItem
                        key={item.id}
                        item={item}
                        index={index}
                        moveItem={moveItem}
                      >
                        {cardContent}
                      </DraggableContentItem>
                    );
                  })}
                </div>
              </DndProvider>
            )}
          </div>

          {/* Right Sidebar - Content Types (Hidden in Preview Mode) */}
          {!isPreviewMode && (
            <div className="w-[320px] bg-white border-l border-[#d2d6db] order-first">
              <div className="bg-[#f8f9fa] px-[18px] py-[14px] h-[51px] flex items-center justify-start border-b border-[#d2d6db]">
                <p className="text-[16px] font-medium text-[#1e1e1e] leading-[20px]">
                  إضافة محتوي
                </p>
              </div>

              <div className="p-[19px] space-y-[8px]">
                {contentTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.id} className="relative">
                      <button
                        onClick={() => handleAddContentType(type.id)}
                        className="w-full bg-white border border-[#d2d6db] rounded-[8px] h-[46px] px-[19px] flex items-center justify-between hover:bg-[#f9fafb] transition-colors group"
                      >
                        {/* Right side: Icon and Label */}
                        <div className="flex items-center gap-[8px]">
                          <Icon className="w-[17px] h-[17px] text-[#161616]" strokeWidth={1.5} />
                          <span className="text-[12px] font-medium text-black leading-[16px] tracking-[0.5px]">
                            {type.label}
                          </span>
                        </div>

                        {/* Left side: Plus icon */}
                        <div className="relative size-[24px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
                            <g>
                              <path d={svgPaths.p38b7580} fill="#1B8354" />
                              <path clipRule="evenodd" d={svgPaths.p3032e272} fill="#1B8354" fillRule="evenodd" />
                            </g>
                          </svg>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Preview Components (Read-only versions)
function HeadingPreview({ item }: { item: ContentItem }) {
  const level = item.data?.level || 'H2';
  const text = item.data?.text || '';
  
  const getHeadingStyle = () => {
    switch (level) {
      case 'H1': return 'text-[32px] font-bold';
      case 'H2': return 'text-[28px] font-bold';
      case 'H3': return 'text-[24px] font-semibold';
      case 'H4': return 'text-[20px] font-semibold';
      case 'H5': return 'text-[18px] font-medium';
      case 'H6': return 'text-[16px] font-medium';
      default: return 'text-[28px] font-bold';
    }
  };

  if (!text) return null;

  return (
    <div className={`text-[#161616] ${getHeadingStyle()}`}>
      {text}
    </div>
  );
}

function TextPreview({ item }: { item: ContentItem }) {
  const text = item.data?.text || '';
  
  if (!text) return null;

  return (
    <div className="text-[14px] text-[#161616] leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  );
}

function ListPreview({ item }: { item: ContentItem }) {
  const listType = item.data?.listType || 'bullets';
  const items = item.data?.items || [];
  const filledItems = items.filter((i: string) => i.trim());

  if (filledItems.length === 0) return null;

  const ListTag = listType === 'numbers' ? 'ol' : 'ul';
  const listClass = listType === 'numbers' 
    ? 'list-decimal list-inside space-y-[8px]' 
    : 'list-disc list-inside space-y-[8px]';

  return (
    <ListTag className={listClass}>
      {filledItems.map((itemText: string, index: number) => (
        <li key={index} className="text-[14px] text-[#161616]">
          {itemText}
        </li>
      ))}
    </ListTag>
  );
}

function TablePreview({ item }: { item: ContentItem }) {
  interface TableColumn {
    id: number;
    name: string;
    type: 'text' | 'attachment' | 'tag' | 'status';
  }

  interface TableRow {
    id: number;
    cells: { [key: number]: any };
  }

  const columns: TableColumn[] = item.data?.columns || [];
  const rows: TableRow[] = item.data?.rows || [];

  const statusOptions = [
    { value: 'todo', label: 'قيد الانتظار', color: '#9ca3af', bgColor: '#f3f4f6' },
    { value: 'in-progress', label: 'قيد التنفيذ', color: '#2563eb', bgColor: '#dbeafe' },
    { value: 'done', label: 'مكتمل', color: '#16a34a', bgColor: '#dcfce7' },
    { value: 'blocked', label: 'محظور', color: '#dc2626', bgColor: '#fee2e2' }
  ];

  const tagOptions = [
    { value: 'important', label: 'مهم', color: '#dc2626', bgColor: '#fee2e2' },
    { value: 'urgent', label: 'عاجل', color: '#ea580c', bgColor: '#ffedd5' },
    { value: 'low-priority', label: 'أولوية منخفضة', color: '#16a34a', bgColor: '#dcfce7' },
    { value: 'review', label: 'مراجعة', color: '#9333ea', bgColor: '#f3e8ff' }
  ];

  if (columns.length === 0 || rows.length === 0) return null;

  const renderCellValue = (row: TableRow, column: TableColumn) => {
    const value = row.cells[column.id];

    switch (column.type) {
      case 'text':
        return <span className="text-[14px] text-[#161616]">{value || '-'}</span>;

      case 'attachment':
        return value ? (
          <div className="flex items-center gap-[8px]">
            <FileText className="w-[16px] h-[16px] text-[#64748b]" />
            <span className="text-[14px] text-[#161616]">{value}</span>
          </div>
        ) : <span className="text-[14px] text-[#9ca3af]">-</span>;

      case 'tag':
        const tag = tagOptions.find(t => t.value === value);
        return value && tag ? (
          <span
            className="inline-block px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium"
            style={{ backgroundColor: tag.bgColor, color: tag.color }}
          >
            {tag.label}
          </span>
        ) : <span className="text-[14px] text-[#9ca3af]">-</span>;

      case 'status':
        const status = statusOptions.find(s => s.value === value);
        return value && status ? (
          <span
            className="inline-block px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium"
            style={{ backgroundColor: status.bgColor, color: status.color }}
          >
            {status.label}
          </span>
        ) : <span className="text-[14px] text-[#9ca3af]">-</span>;

      default:
        return <span className="text-[14px] text-[#9ca3af]">-</span>;
    }
  };

  return (
    <div className="overflow-x-auto" dir="rtl">
      <table className="min-w-full border-collapse border border-[#d2d6db]">
        <thead>
          <tr className="bg-[#f9fafb]">
            {columns.map((column) => (
              <th
                key={column.id}
                className="border border-[#d2d6db] px-[12px] py-[10px] text-right text-[14px] font-semibold text-[#161616]"
              >
                {column.name || 'عمود'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-[#f9fafb]">
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="border border-[#d2d6db] px-[12px] py-[10px]"
                >
                  {renderCellValue(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}