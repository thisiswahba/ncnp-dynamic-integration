import { Plus, ChevronDown, FileText, HelpCircle, BookOpen, ClipboardList } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AddContentModal } from './add-content-modal';
import { GuideMetadataModal, GuideMetadata } from './guide-metadata-modal';
import { useLanguage } from '@/app/contexts/language-context';

interface PageHeaderProps {
  onNavigateToFormBuilder?: (contentType: 'assessment' | 'guide', metadata?: GuideMetadata) => void;
}

export function PageHeader({ onNavigateToFormBuilder }: PageHeaderProps) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contentTypes = [
    { 
      id: 'assessment', 
      label: isRTL ? 'نموذج تقييم' : 'Assessment Form', 
      icon: ClipboardList 
    },
    { 
      id: 'guide', 
      label: isRTL ? 'محتوى دليل' : 'Guide Content', 
      icon: BookOpen 
    },
  ];

  const handleContentTypeSelect = (typeId: string) => {
    setIsDropdownOpen(false);
    if (typeId === 'assessment') {
      setIsAssessmentModalOpen(true);
    } else if (typeId === 'guide') {
      setIsGuideModalOpen(true);
    }
  };

  const handleAssessmentModalSubmit = () => {
    setIsAssessmentModalOpen(false);
    if (onNavigateToFormBuilder) {
      onNavigateToFormBuilder('assessment');
    }
  };

  const handleGuideModalSubmit = (metadata: GuideMetadata) => {
    setIsGuideModalOpen(false);
    if (onNavigateToFormBuilder) {
      onNavigateToFormBuilder('guide', metadata);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-bold" style={{ fontSize: 'var(--text-2xl)' }}>
            {isRTL ? 'قاعدة المعرفة' : 'Knowledge Base'}
          </h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
            {isRTL ? 'إدارة ومتابعة محتوى قاعدة المعرفة' : 'Manage and maintain knowledge base content'}
          </p>
        </div>
        
        {onNavigateToFormBuilder && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-sm hover:shadow-md"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              <span>{isRTL ? 'إضافة محتوى' : 'Add Content'}</span>
              <Plus className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
              <div 
                className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-64 bg-white rounded-lg shadow-lg border border-border overflow-hidden z-50`}
                style={{ top: '100%' }}
              >
                <div className="py-2">
                  {contentTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleContentTypeSelect(type.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <span className={`flex-1 text-foreground ${isRTL ? 'text-right' : 'text-left'}`} style={{ fontSize: 'var(--text-sm)' }}>
                          {type.label}
                        </span>
                        <IconComponent className="w-5 h-5 text-primary" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AddContentModal 
        isOpen={isAssessmentModalOpen} 
        onClose={() => setIsAssessmentModalOpen(false)}
        onSubmit={handleAssessmentModalSubmit}
      />

      <GuideMetadataModal 
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSubmit={handleGuideModalSubmit}
      />
    </>
  );
}