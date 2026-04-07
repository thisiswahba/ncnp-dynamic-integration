import { Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import svgPaths from "@/imports/svg-6oa4eflfic";
import { AddContentModal } from './add-content-modal';

export function PageHeader({ onNavigateToFormBuilder }: { onNavigateToFormBuilder?: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleContentTypeSelect = (type: 'assessment' | 'guide') => {
    console.log('Selected content type:', type);
    setIsDropdownOpen(false);
    
    if (type === 'assessment') {
      setIsModalOpen(true);
    }
    // Add your navigation or content creation logic here for 'guide'
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    if (onNavigateToFormBuilder) {
      onNavigateToFormBuilder();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-foreground text-[36px]">
          قائمة المحتوى المتاح
        </h1>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 text-white rounded transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(27, 131, 84, 0.85)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            <Plus className="w-6 h-6" />
            <span>إضافة محتوى</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white rounded w-[208px] border border-border z-50" style={{ boxShadow: 'var(--elevation-sm), 0px 8px 8px -4px rgba(16,24,40,0.03)' }}>
              <div className="flex flex-col p-[8px]">
                {/* Assessment Form Option */}
                <button
                  onClick={() => handleContentTypeSelect('assessment')}
                  className="flex items-center justify-end gap-[8px] p-[8px] rounded hover:bg-muted transition-colors relative w-full"
                >
                  <div className="relative shrink-0 size-[20px]">
                    <div className="absolute inset-[21.88%_34.38%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75004 12.75">
                        <g>
                          <path d={svgPaths.p1163ad00} fill="#384250" stroke="#384250" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                    نموذج تقييم
                  </span>
                </button>

                <div className="h-px bg-border mx-[8px]" />

                {/* Guide Content Option */}
                <button
                  onClick={() => handleContentTypeSelect('guide')}
                  className="flex items-center justify-end gap-[8px] p-[8px] rounded hover:bg-muted transition-colors w-full"
                >
                  <div className="relative shrink-0 size-[20px]">
                    <div className="absolute inset-[21.88%_34.38%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75004 12.75">
                        <g>
                          <path d={svgPaths.p1163ad00} fill="#384250" stroke="#384250" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <span className="flex-1 text-foreground text-right" style={{ fontSize: 'var(--text-sm)', lineHeight: '20px' }}>
                    محتوى دليل
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddContentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}