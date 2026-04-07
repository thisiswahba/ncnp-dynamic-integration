import { useState } from 'react';
import svgPaths from "@/imports/svg-s8i19u32b";
import { X } from 'lucide-react';

interface GuideMetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (metadata: GuideMetadata) => void;
}

export interface GuideMetadata {
  contentName: string;
  entityTypes: string[];
  entitySize?: string;
  owner?: string;
  tags?: string[];
  audience?: string[];
}

export function GuideMetadataModal({ isOpen, onClose, onSubmit }: GuideMetadataModalProps) {
  const [contentName, setContentName] = useState('');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>([]);
  const [entitySize, setEntitySize] = useState('');
  const [owner, setOwner] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [audienceInput, setAudienceInput] = useState('');
  const [audience, setAudience] = useState<string[]>([]);
  
  const [isEntityTypesOpen, setIsEntityTypesOpen] = useState(false);
  const [isEntitySizeOpen, setIsEntitySizeOpen] = useState(false);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const entityTypes = ['جمعية', 'مؤسسة', 'شركة', 'منظمة غير ربحية'];
  const entitySizes = ['صغيرة', 'متوسطة', 'كبيرة'];

  const showEntitySize = selectedEntityTypes.includes('جمعية');

  const toggleEntityType = (type: string) => {
    setSelectedEntityTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    // Clear entity size if جمعية is deselected
    if (type === 'جمعية' && selectedEntityTypes.includes('جمعية')) {
      setEntitySize('');
    }
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!contentName.trim()) {
      newErrors.contentName = 'اسم المحتوى مطلوب';
    }

    if (selectedEntityTypes.length === 0) {
      newErrors.entityTypes = 'نوع الجهة مطلوب';
    }

    if (showEntitySize && !entitySize) {
      newErrors.entitySize = 'حجم الجهة مطلوب عند اختيار جمعية';
    }

    if (owner && owner.length > 200) {
      newErrors.owner = 'الحد الأقصى 200 حرف';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        contentName: contentName.trim(),
        entityTypes: selectedEntityTypes,
        entitySize: entitySize || undefined,
        owner: owner.trim() || undefined,
        tags: tags.length > 0 ? tags : undefined,
        audience: audience.length > 0 ? audience : undefined,
      });
    }
  };

  const isFormValid = contentName.trim() && selectedEntityTypes.length > 0 && (!showEntitySize || entitySize);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div 
        className="bg-white rounded-lg p-6 max-w-[600px] w-full max-h-[90vh] overflow-y-auto"
        style={{ 
          borderRadius: 'calc(var(--radius) * 2)',
          boxShadow: '0px 32px 64px -12px rgba(16,24,40,0.14)' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6">
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex flex-col gap-1 items-end flex-1">
            <h2 className="text-foreground text-right w-full font-semibold" style={{ fontSize: 'var(--text-lg)', lineHeight: '28px' }}>
              إضافة محتوى دليل
            </h2>
            <p className="text-muted-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              يرجى إدخال معلومات الدليل قبل البدء
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-5 items-end w-full mb-6">
          {/* Content Name Input - Required */}
          <div className="flex flex-col gap-2 items-end w-full">
            <label className="text-foreground text-right w-full flex items-center gap-1" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              <span className="text-destructive">*</span>
              <span>اسم المحتوى</span>
            </label>
            <input
              type="text"
              value={contentName}
              onChange={(e) => {
                setContentName(e.target.value);
                if (errors.contentName) {
                  setErrors({ ...errors, contentName: '' });
                }
              }}
              placeholder="أدخل اسم المحتوى"
              className={`bg-white h-10 rounded border ${errors.contentName ? 'border-destructive' : 'border-border'} w-full px-4 text-right transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20`}
              style={{ borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', lineHeight: '24px' }}
              dir="rtl"
            />
            {errors.contentName && (
              <span className="text-destructive text-right w-full" style={{ fontSize: 'var(--text-xs)' }}>
                {errors.contentName}
              </span>
            )}
          </div>

          {/* Entity Types Dropdown - Required, Multiple Selection */}
          <div className="flex flex-col gap-2 items-end w-full relative">
            <label className="text-foreground text-right w-full flex items-center gap-1" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              <span className="text-destructive">*</span>
              <span>نوع الجهة</span>
            </label>
            <button
              onClick={() => setIsEntityTypesOpen(!isEntityTypesOpen)}
              className={`bg-white h-10 rounded border ${errors.entityTypes ? 'border-destructive' : 'border-border'} w-full transition-colors`}
              style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--elevation-sm)' }}
            >
              <div className="flex items-center justify-between px-4 h-full gap-1">
                <span className={`flex-1 text-right ${selectedEntityTypes.length > 0 ? 'text-foreground' : 'text-muted-foreground'}`} style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
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
              {isEntityTypesOpen && <div className="absolute bg-accent bottom-0 h-0.5 left-0 right-0 rounded" style={{ borderRadius: 'var(--radius)' }} />}
            </button>

            {isEntityTypesOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10" style={{ borderRadius: 'var(--radius)', boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
                <div className="flex flex-col p-2">
                  {entityTypes.map((type, index) => (
                    <div key={type}>
                      <button
                        onClick={() => {
                          toggleEntityType(type);
                          if (errors.entityTypes) {
                            setErrors({ ...errors, entityTypes: '' });
                          }
                        }}
                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full relative"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <div className="relative shrink-0 size-5 text-primary" style={{ visibility: selectedEntityTypes.includes(type) ? 'visible' : 'hidden' }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g>
                              <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                        <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                          {type}
                        </span>
                      </button>
                      {index < entityTypes.length - 1 && (
                        <div className="h-px bg-border mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-muted-foreground text-right w-full" style={{ fontSize: 'var(--text-xs)', lineHeight: '18px' }}>
              يمكن اختيار جهة واحدة أو أكثر (مثل: جمعية، مؤسسة)
            </p>
            {errors.entityTypes && (
              <span className="text-destructive text-right w-full" style={{ fontSize: 'var(--text-xs)' }}>
                {errors.entityTypes}
              </span>
            )}
          </div>

          {/* Entity Size Dropdown - Conditional */}
          {showEntitySize && (
            <div className="flex flex-col gap-2 items-end w-full relative">
              <label className="text-foreground text-right w-full flex items-center gap-1" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                <span className="text-destructive">*</span>
                <span>حجم الجهة</span>
              </label>
              <button
                onClick={() => setIsEntitySizeOpen(!isEntitySizeOpen)}
                className={`bg-white h-10 rounded border ${errors.entitySize ? 'border-destructive' : 'border-border'} w-full transition-colors`}
                style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--elevation-sm)' }}
              >
                <div className="flex items-center justify-between px-4 h-full gap-1">
                  <span className={`flex-1 text-right ${entitySize ? 'text-foreground' : 'text-muted-foreground'}`} style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
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
                {isEntitySizeOpen && <div className="absolute bg-accent bottom-0 h-0.5 left-0 right-0 rounded" style={{ borderRadius: 'var(--radius)' }} />}
              </button>

              {isEntitySizeOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10" style={{ borderRadius: 'var(--radius)', boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
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
                          className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full relative"
                          style={{ borderRadius: 'var(--radius)' }}
                        >
                          <div className="relative shrink-0 size-5 text-foreground" style={{ visibility: entitySize === size ? 'visible' : 'hidden' }}>
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                              <g>
                                <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              </g>
                            </svg>
                          </div>
                          <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                            {size}
                          </span>
                        </button>
                        {index < entitySizes.length - 1 && (
                          <div className="h-px bg-border mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.entitySize && (
                <span className="text-destructive text-right w-full" style={{ fontSize: 'var(--text-xs)' }}>
                  {errors.entitySize}
                </span>
              )}
            </div>
          )}

          {/* Owner Input - Optional */}
          <div className="flex flex-col gap-2 items-end w-full">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              المالك
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setOwner(e.target.value);
                  if (errors.owner) {
                    setErrors({ ...errors, owner: '' });
                  }
                }
              }}
              placeholder="أدخل اسم المالك"
              className={`bg-white h-10 rounded border ${errors.owner ? 'border-destructive' : 'border-border'} w-full px-4 text-right transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20`}
              style={{ borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', lineHeight: '24px' }}
              dir="rtl"
              maxLength={200}
            />
            <p className="text-muted-foreground text-right w-full" style={{ fontSize: 'var(--text-xs)', lineHeight: '18px' }}>
              حقل داخلي (غير ظاهر للمستخدم النهائي) • {owner.length}/200
            </p>
            {errors.owner && (
              <span className="text-destructive text-right w-full" style={{ fontSize: 'var(--text-xs)' }}>
                {errors.owner}
              </span>
            )}
          </div>

          {/* Tags Input - Optional */}
          <div className="flex flex-col gap-2 items-end w-full">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              الوسوم
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="اكتب وسم واضغط Enter"
              className="bg-white h-10 rounded border border-border w-full px-4 text-right transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', lineHeight: '24px' }}
              dir="rtl"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full justify-end">
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
            <p className="text-muted-foreground text-right w-full" style={{ fontSize: 'var(--text-xs)', lineHeight: '18px' }}>
              تساعد في البحث والتصفية
            </p>
          </div>

          {/* Audience Input - Optional */}
          <div className="flex flex-col gap-2 items-end w-full">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              الجمهور
            </label>
            <input
              type="text"
              value={audienceInput}
              onChange={(e) => setAudienceInput(e.target.value)}
              onKeyDown={handleAddAudience}
              placeholder="اكتب جمهور واضغط Enter"
              className="bg-white h-10 rounded border border-border w-full px-4 text-right transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderRadius: 'var(--radius)', fontSize: 'var(--text-base)', lineHeight: '24px' }}
              dir="rtl"
            />
            {audience.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full justify-end">
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
            <p className="text-muted-foreground text-right w-full" style={{ fontSize: 'var(--text-xs)', lineHeight: '18px' }}>
              وسوم ظاهرة للمستخدم النهائي
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center w-full">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-4 h-10 rounded transition-colors ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)'
            }}
          >
            <span className="font-medium" style={{ fontSize: 'var(--text-base)' }}>إنشاء الدليل</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 h-10 rounded border border-border hover:bg-muted transition-colors"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-base)' }}>إلغاء</span>
          </button>
        </div>
      </div>
    </div>
  );
}
