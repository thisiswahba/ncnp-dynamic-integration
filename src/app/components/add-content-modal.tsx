import { useState, useRef } from 'react';
import svgPaths from "@/imports/svg-s8i19u32b";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function AddContentModal({ isOpen, onClose, onSubmit }: AddContentModalProps) {
  const [formName, setFormName] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('جمهور ٢');
  const [selectedTags, setSelectedTags] = useState<string[]>(['وسم ٢']);
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isFormNameOpen, setIsFormNameOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const audiences = ['جمهور ٢', 'جمهور ٣'];
  const tags = ['وسم ٢', 'وسم ٣', 'وسم ٤'];
  const formNames = ['نموذج تقييم ٢', 'نموذج تقييم ٣', 'نموذج تقييم ٤'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { formName, selectedAudience, selectedTags, uploadedFile });
    if (onSubmit) {
      onSubmit();
    } else {
      onClose();
    }
  };

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
        <div className="flex flex-col gap-2 items-end w-full mb-6">
          <h2 className="text-foreground text-right w-full font-semibold" style={{ fontSize: 'var(--text-lg)', lineHeight: '28px' }}>
            إضافة محتوي جديد
          </h2>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-2.5 items-end w-full mb-6">
          {/* Form Name Input */}
          <div className="flex flex-col gap-2 items-end w-full relative">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              اسم النموذج
            </label>
            <button
              onClick={() => setIsFormNameOpen(!isFormNameOpen)}
              className="bg-white h-10 rounded border border-border w-full transition-colors"
              style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--elevation-sm)' }}
            >
              <div className="flex items-center justify-between px-4 h-full gap-1">
                <span className="flex-1 text-muted-foreground text-right" style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
                  {formName || 'اختر اسم النموذج'}
                </span>
                <div className={`relative shrink-0 size-5 transition-transform text-foreground ${isFormNameOpen ? 'rotate-180 scale-y-[-100%]' : ''}`}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g>
                      <path d={svgPaths.p3f085972} fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </div>
              {isFormNameOpen && <div className="absolute bg-accent bottom-0 h-0.5 left-0 right-0 rounded" style={{ borderRadius: 'var(--radius)' }} />}
            </button>

            {isFormNameOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10" style={{ borderRadius: 'var(--radius)', boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
                <div className="flex flex-col p-2">
                  {formNames.map((name, index) => (
                    <div key={name}>
                      <button
                        onClick={() => {
                          setFormName(name);
                          setIsFormNameOpen(false);
                        }}
                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full relative"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <div className="relative shrink-0 size-5 text-foreground" style={{ visibility: formName === name ? 'visible' : 'hidden' }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g>
                              <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                        <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                          {name}
                        </span>
                      </button>
                      {index < formNames.length - 1 && (
                        <div className="h-px bg-border mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Audience Dropdown */}
          <div className="flex flex-col gap-2 items-end w-full relative">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              الجمهور
            </label>
            <button
              onClick={() => setIsAudienceOpen(!isAudienceOpen)}
              className="bg-white h-10 rounded border border-border w-full transition-colors"
              style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--elevation-sm)' }}
            >
              <div className="flex items-center justify-between px-4 h-full gap-1">
                <span className="flex-1 text-muted-foreground text-right" style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
                  {selectedAudience}
                </span>
                <div className={`relative shrink-0 size-5 transition-transform text-foreground ${isAudienceOpen ? 'rotate-180 scale-y-[-100%]' : ''}`}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g>
                      <path d={svgPaths.p3f085972} fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </div>
              {isAudienceOpen && <div className="absolute bg-accent bottom-0 h-0.5 left-0 right-0 rounded" style={{ borderRadius: 'var(--radius)' }} />}
            </button>

            {isAudienceOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10" style={{ borderRadius: 'var(--radius)', boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
                <div className="flex flex-col p-2">
                  {audiences.map((audience, index) => (
                    <div key={audience}>
                      <button
                        onClick={() => {
                          setSelectedAudience(audience);
                          setIsAudienceOpen(false);
                        }}
                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full relative"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <div className="relative shrink-0 size-5 text-foreground" style={{ visibility: selectedAudience === audience ? 'visible' : 'hidden' }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g>
                              <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                        <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                          {audience}
                        </span>
                      </button>
                      {index < audiences.length - 1 && (
                        <div className="h-px bg-border mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags Dropdown */}
          <div className="flex flex-col gap-2 items-end w-full relative">
            <label className="text-foreground text-right w-full" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
              الوسوم
            </label>
            <button
              onClick={() => setIsTagsOpen(!isTagsOpen)}
              className="bg-white h-10 rounded border border-border w-full transition-colors"
              style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--elevation-sm)' }}
            >
              <div className="flex items-center justify-between px-4 h-full gap-1">
                <span className="flex-1 text-muted-foreground text-right" style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
                  {selectedTags.join(', ')}
                </span>
                <div className={`relative shrink-0 size-5 transition-transform text-foreground ${isTagsOpen ? 'rotate-180 scale-y-[-100%]' : ''}`}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g>
                      <path d={svgPaths.p3f085972} fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </div>
              {isTagsOpen && <div className="absolute bg-accent bottom-0 h-0.5 left-0 right-0 rounded" style={{ borderRadius: 'var(--radius)' }} />}
            </button>

            {isTagsOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded border border-border z-10" style={{ borderRadius: 'var(--radius)', boxShadow: '0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
                <div className="flex flex-col p-2">
                  {tags.map((tag, index) => (
                    <div key={tag}>
                      <button
                        onClick={() => toggleTag(tag)}
                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-muted transition-colors w-full relative"
                        style={{ borderRadius: 'var(--radius)' }}
                      >
                        <div className="relative shrink-0 size-5 text-foreground" style={{ visibility: selectedTags.includes(tag) ? 'visible' : 'hidden' }}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                            <g>
                              <path d={svgPaths.p32ddfd00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                        <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                          {tag}
                        </span>
                      </button>
                      {index < tags.length - 1 && (
                        <div className="h-px bg-border mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col gap-4 items-start w-full mb-6">
          <p className="font-medium text-foreground text-right w-full" style={{ fontSize: 'var(--text-lg)', lineHeight: '24px' }}>
            تحميل دليل شامل
          </p>
          
          {/* Drop Zone */}
          <div 
            className="bg-muted rounded border border-dashed border-border w-full"
            style={{ borderRadius: 'var(--radius)' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center p-6 gap-6">
              <div className="relative shrink-0 size-6 text-foreground">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p15d5cc00} fill="currentColor" fillRule="evenodd" />
                    <path d={svgPaths.p351b9b00} fill="currentColor" />
                  </g>
                </svg>
              </div>
              
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <p className="font-medium text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: '24px' }}>
                  اسحب و أفلت الملفات هنا للرفع
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', lineHeight: '18px' }}>
                  Maximum file size allowed is 2MB, supported file formats include.pdf.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-muted px-3 py-0.5 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-border transition-colors"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <span className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                  تصفح الملفات
                </span>
              </label>
            </div>
          </div>

          {/* Uploaded File */}
          {uploadedFile && (
            <div className="bg-muted rounded border border-border w-full" style={{ borderRadius: 'var(--radius)' }}>
              <div className="flex items-center p-2 gap-2">
                <button
                  onClick={removeFile}
                  className="flex items-center justify-center p-2 rounded hover:bg-border transition-colors shrink-0"
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <div className="relative shrink-0 size-4 text-foreground">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g>
                        <path clipRule="evenodd" d={svgPaths.p1e8c1c0} fill="currentColor" fillRule="evenodd" />
                      </g>
                    </svg>
                  </div>
                </button>
                
                <div className="flex items-center gap-2 flex-1">
                  <p className="flex-1 font-medium text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                    {uploadedFile.name}
                  </p>
                  <div className="relative shrink-0 size-5">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g>
                        <path clipRule="evenodd" d={svgPaths.p5300400} fill="white" fillRule="evenodd" />
                        <path clipRule="evenodd" d={svgPaths.p20802f80} fill="#067647" fillRule="evenodd" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center w-full">
          <button
            onClick={handleSubmit}
            className="px-4 h-10 rounded transition-colors"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)'
            }}
          >
            <span className="font-medium" style={{ fontSize: 'var(--text-base)' }}>التالي</span>
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
