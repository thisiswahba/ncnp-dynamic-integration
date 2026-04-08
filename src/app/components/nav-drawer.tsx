import { useState } from 'react';
import svgPaths from '@/imports/svg-xfywb401kf';
import { Home, FileText, Settings, Users, BarChart3, HelpCircle, Link2, Database, Search, History, Zap, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/contexts/language-context';

interface NavDrawerProps {
  isOpen: boolean;
  onNavigateToFAQ?: () => void;
  onNavigateToQuestionLinking?: () => void;
  onNavigateToAssessmentForm?: () => void;
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 5">
          <path d={svgPaths.p21905800} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <div className="absolute inset-[34.37%_21.87%_34.38%_21.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 5.00004">
          <path d={svgPaths.p15574280} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p1a29ec00} fill="currentColor" />
        <path clipRule="evenodd" d={svgPaths.p16490200} fill="currentColor" fillRule="evenodd" />
      </svg>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isExpanded?: boolean;
  hasChildren?: boolean;
  isChild?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  isRTL?: boolean;
}

function NavItem({ icon, label, isExpanded, hasChildren, isChild, isActive, onClick, isRTL = true }: NavItemProps) {
  const baseClasses = "relative rounded-[4px] shrink-0 w-full transition-all duration-200";
  const hoverClasses = "hover:bg-[rgba(255,255,255,0.1)]";
  const activeClasses = isActive ? "bg-[rgba(255,255,255,0.15)]" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${activeClasses}`} onClick={onClick}>
      <div className="flex items-center size-full cursor-pointer">
        <div 
          className={`flex gap-[8px] items-center py-[8px] w-full cursor-pointer ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          } ${
            isChild ? (isRTL ? 'pr-[16px] pl-[40px]' : 'pl-[40px] pr-[16px]') : 'px-[16px]'
          }`}
        >
          {!isChild && (
            <div className="text-white shrink-0">
              {icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <p 
              className={`text-white leading-[20px] ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: isActive || (hasChildren && !isChild) ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)'
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {label}
            </p>
          </div>
          
          {hasChildren && (
            <div className="text-white shrink-0">
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="bg-[rgba(255,255,255,0.3)] flex-[1_0_0] h-px min-h-px min-w-px" />
        </div>
      </div>
    </div>
  );
}

export function NavDrawer({ isOpen, onNavigateToFAQ, onNavigateToQuestionLinking, onNavigateToAssessmentForm }: NavDrawerProps) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string>('data-sources');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  if (!isOpen) return null;

  return (
    <aside 
      className="fixed top-[73px] w-64 h-[calc(100vh-73px)] overflow-y-auto z-40 shadow-lg transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--sidebar-primary)',
        [isRTL ? 'right' : 'left']: 0
      }}
    >
      <div className="content-stretch flex flex-col isolate relative size-full">
        <div className="relative shrink-0 w-full z-[1]">
          <div className="flex flex-col size-full">
            <div className="flex flex-col gap-[4px] pb-[80px] px-[16px] pt-[32px] w-full">
              
              {/* مصادر البيانات - Data Sources Section */}
              <NavItem
                icon={<Database className="w-4 h-4" />}
                label={isRTL ? 'مصادر البيانات' : 'Data Sources'}
                isActive={activeItem === 'data-sources'}
                onClick={() => {
                  handleItemClick('data-sources');
                  navigate('/admin/data-sources');
                }}
                isRTL={isRTL}
              />

              {/* أتمتة الأسئلة - Question Automation */}
              <NavItem
                icon={<Zap className="w-4 h-4" />}
                label={isRTL ? 'أتمتة الأسئلة' : 'Question Automation'}
                isActive={activeItem === 'questions'}
                onClick={() => {
                  handleItemClick('questions');
                  navigate('/admin/questions');
                }}
                isRTL={isRTL}
              />

              {/* المخاطر المحددة - Defined Risks */}
              <NavItem
                icon={<ShieldAlert className="w-4 h-4" />}
                label={isRTL ? 'المخاطر المحددة' : 'Defined Risks'}
                isActive={activeItem === 'risks'}
                onClick={() => {
                  handleItemClick('risks');
                  navigate('/admin/risks');
                }}
                isRTL={isRTL}
              />

              {/* الاستعلامات - Queries Section */}
              <NavItem
                icon={<Search className="w-4 h-4" />}
                label={isRTL ? 'الاستعلامات' : 'Queries'}
                isActive={activeItem === 'queries'}
                onClick={() => {
                  handleItemClick('queries');
                  navigate('/admin/queries');
                }}
                isRTL={isRTL}
              />

            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}