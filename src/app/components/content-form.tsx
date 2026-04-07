import { useState } from 'react';
import { X, Save, FileText, BookOpen, AlertCircle } from 'lucide-react';
import svgPaths from "@/imports/svg-s8i19u32b";

interface ContentFormData {
  title: string;
  type: 'faq' | 'guideline';
  entityTypes: string[];
  entitySize?: string;
  audience?: string[];
  tags?: string[];
  content: string;
}

interface ContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ContentFormData, saveAs: 'draft' | 'published') => void;
  initialData?: Partial<ContentFormData>;
  mode: 'create' | 'edit';
}

export function ContentForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode = 'create',
}: ContentFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [type, setType] = useState<'faq' | 'guideline'>(initialData?.type || 'faq');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>(initialData?.entityTypes || []);
  const [entitySize, setEntitySize] = useState(initialData?.entitySize || '');
  const [audienceInput, setAudienceInput] = useState('');
  const [audience, setAudience] = useState<string[]>(initialData?.audience || []);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [content, setContent] = useState(initialData?.content || '');
  
  const [isEntityTypesOpen, setIsEntityTypesOpen] = useState(false);
  const [isEntitySizeOpen, setIsEntitySizeOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const entityTypes = ['جمعية', 'مؤسسة', 'شركة', 'منظمة غير ربحية'];
  const entitySizes = ['صغيرة', 'متوسطة', 'كبيرة'];
  const showEntitySize = selectedEntityTypes.includes('جمعية');

  const toggleEntityType = (entityType: string) => {
    setSelectedEntityTypes(prev => 
      prev.includes(entityType) 
        ? prev.filter(t => t !== entityType)
        : [...prev, entityType]
    );
    if (entityType === 'جمعية' && selectedEntityTypes.includes('جمعية')) {
      setEntitySize('');
    }
  };

  const handleAddAudience = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && audienceInput.trim() && audience.length < 10) {
      e.preventDefault();
      if (!audience.includes(audienceInput.trim())) {
        setAudience([...audience, audienceInput.trim()]);
      }
      setAudienceInput('');
    }
  };

  const removeAudience = (audienceToRemove: string) => {
    setAudience(audience.filter(aud => aud !== audienceToRemove));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'العنوان مطلوب';
    }

    if (selectedEntityTypes.length === 0) {
      newErrors.entityTypes = 'نوع الجهة مطلوب';
    }

    if (showEntitySize && !entitySize) {
      newErrors.entitySize = 'حجم الجهة مطلوب عند اختيار جمعية';
    }

    if (!content.trim()) {
      newErrors.content = 'المحتوى مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (saveAs: 'draft' | 'published') => {
    if (validateForm()) {
      onSave({
        title: title.trim(),
        type,
        entityTypes: selectedEntityTypes,
        entitySize: entitySize || undefined,
        audience: audience.length > 0 ? audience : undefined,
        tags: tags.length > 0 ? tags : undefined,
        content: content.trim(),
      }, saveAs);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div 
        className="bg-white rounded-lg w-full max-w-[800px] max-h-[90vh] overflow-y-auto"
        style={{ 
          borderRadius: 'calc(var(--radius) * 2)',
          boxShadow: '0px 32px 64px -12px rgba(16,24,40,0.14)' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-start justify-between z-10" style={{ borderTopLeftRadius: 'calc(var(--radius) * 2)', borderTopRightRadius: 'calc(var(--radius) * 2)' }}>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 mr-4">
            <h2 className="text-foreground text-right w-full font-bold" style={{ fontSize: 'var(--text-xl)' }}>
              {mode === 'create' ? 'إضافة محتوى جديد' : 'تعديل المحتوى'}
            </h2>
            <p className="text-muted-foreground text-right w-full mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              {mode === 'create' ? 'إنشاء سؤال شائع أو محتوى دليل جديد' : 'تعديل المحتوى الحالي'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-5">
          {/* Content Type Selection */}
          <div className="space-y-2">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              نوع المحتوى <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setType('faq')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  type === 'faq' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <FileText className={`w-6 h-6 ${type === 'faq' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${type === 'faq' ? 'text-primary' : 'text-foreground'}`} style={{ fontSize: 'var(--text-sm)' }}>
                    سؤال شائع
                  </span>
                </div>
              </button>
              <button
                onClick={() => setType('guideline')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  type === 'guideline' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className={`w-6 h-6 ${type === 'guideline' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${type === 'guideline' ? 'text-primary' : 'text-foreground'}`} style={{ fontSize: 'var(--text-sm)' }}>
                    محتوى دليل
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              العنوان <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors({ ...errors, title: '' });
                }
              }}
              placeholder="أدخل عنوان المحتوى"
              className={`w-full h-10 px-4 bg-white border ${errors.title ? 'border-destructive' : 'border-border'} rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20`}
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-destructive text-right">
                <span style={{ fontSize: 'var(--text-xs)' }}>{errors.title}</span>
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Entity Types */}
          <div className="space-y-2 relative">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              نوع الجهة <span className="text-destructive">*</span>
            </label>
            <button
              onClick={() => setIsEntityTypesOpen(!isEntityTypesOpen)}
              className={`w-full h-10 px-4 bg-white border ${errors.entityTypes ? 'border-destructive' : 'border-border'} rounded-lg text-right transition-colors`}
            >
              <div className="flex items-center justify-between">
                <span className={selectedEntityTypes.length > 0 ? 'text-foreground' : 'text-muted-foreground'} style={{ fontSize: 'var(--text-base)' }}>
                  {selectedEntityTypes.length > 0 ? selectedEntityTypes.join(', ') : 'اختر نوع الجهة'}
                </span>
                <div className={`relative shrink-0 size-5 transition-transform text-foreground ${isEntityTypesOpen ? 'rotate-180 scale-y-[-100%]' : ''}`}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g>
                      <path d={svgPaths.p3f085972} fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </div>
            </button>

            {isEntityTypesOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10 shadow-lg">
                <div className="flex flex-col p-2">
                  {entityTypes.map((entityType, index) => (
                    <div key={entityType}>
                      <button
                        onClick={() => {
                          toggleEntityType(entityType);
                          if (errors.entityTypes) {
                            setErrors({ ...errors, entityTypes: '' });
                          }
                        }}
                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full"
                      >
                        <div className="relative shrink-0 size-5 text-primary" style={{ visibility: selectedEntityTypes.includes(entityType) ? 'visible' : 'hidden' }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g>
                              <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                        <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                          {entityType}
                        </span>
                      </button>
                      {index < entityTypes.length - 1 && <div className="h-px bg-border mx-2" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.entityTypes && (
              <div className="flex items-center gap-2 text-destructive text-right">
                <span style={{ fontSize: 'var(--text-xs)' }}>{errors.entityTypes}</span>
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Entity Size (Conditional) */}
          {showEntitySize && (
            <div className="space-y-2 relative">
              <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
                حجم الجهة <span className="text-destructive">*</span>
              </label>
              <button
                onClick={() => setIsEntitySizeOpen(!isEntitySizeOpen)}
                className={`w-full h-10 px-4 bg-white border ${errors.entitySize ? 'border-destructive' : 'border-border'} rounded-lg text-right transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <span className={entitySize ? 'text-foreground' : 'text-muted-foreground'} style={{ fontSize: 'var(--text-base)' }}>
                    {entitySize || 'اختر حجم الجهة'}
                  </span>
                  <div className={`relative shrink-0 size-5 transition-transform text-foreground ${isEntitySizeOpen ? 'rotate-180 scale-y-[-100%]' : ''}`}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g>
                        <path d={svgPaths.p3f085972} fill="currentColor" />
                      </g>
                    </svg>
                  </div>
                </div>
              </button>

              {isEntitySizeOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10 shadow-lg">
                  <div className="flex flex-col p-2">
                    {entitySizes.map((size, index) => (
                      <div key={size}>
                        <button
                          onClick={() => {
                            setEntitySize(size);
                            setIsEntitySizeOpen(false);
                            if (errors.entitySize) {
                              setErrors({ ...errors, entitySize: '' });
                            }
                          }}
                          className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full"
                        >
                          <div className="relative shrink-0 size-5 text-foreground" style={{ visibility: entitySize === size ? 'visible' : 'hidden' }}>
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <g>
                                <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                            {size}
                          </span>
                        </button>
                        {index < entitySizes.length - 1 && <div className="h-px bg-border mx-2" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.entitySize && (
                <div className="flex items-center gap-2 text-destructive text-right">
                  <span style={{ fontSize: 'var(--text-xs)' }}>{errors.entitySize}</span>
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
            </div>
          )}

          {/* Content Text Area */}
          <div className="space-y-2">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              المحتوى <span className="text-destructive">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) {
                  setErrors({ ...errors, content: '' });
                }
              }}
              placeholder="اكتب محتوى السؤال الشائع أو الدليل"
              rows={8}
              className={`w-full px-4 py-3 bg-white border ${errors.content ? 'border-destructive' : 'border-border'} rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none`}
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            />
            {errors.content && (
              <div className="flex items-center gap-2 text-destructive text-right">
                <span style={{ fontSize: 'var(--text-xs)' }}>{errors.content}</span>
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Audience Tags */}
          <div className="space-y-2">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              الجمهور (اختياري)
            </label>
            <input
              type="text"
              value={audienceInput}
              onChange={(e) => setAudienceInput(e.target.value)}
              onKeyDown={handleAddAudience}
              placeholder="اكتب جمهور واضغط Enter"
              className="w-full h-10 px-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            />
            {audience.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {audience.map((aud, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-primary"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <button
                      onClick={() => removeAudience(aud)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {aud}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
              الوسوم (اختياري)
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="اكتب وسم واضغط Enter"
              className="w-full h-10 px-4 bg-white border border-border rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ fontSize: 'var(--text-base)' }}
              dir="rtl"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-foreground"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4 flex gap-3">
          <button
            onClick={() => handleSave('published')}
            className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: 'var(--success)',
              color: 'white',
              fontSize: 'var(--text-sm)'
            }}
          >
            <span>نشر</span>
            <Save className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleSave('draft')}
            className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <span className="text-foreground">حفظ كمسودة</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <span className="text-foreground">إلغاء</span>
          </button>
        </div>
      </div>
    </div>
  );
}
