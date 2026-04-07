import { useLanguage } from '@/app/contexts/language-context';

interface TabsProps {
  activeTab: 'active' | 'archived';
  onTabChange: (tab: 'active' | 'archived') => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <div className="border-b border-border">
      <div className="flex gap-8">
        <button
          onClick={() => onTabChange('active')}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'active'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {isRTL ? 'المحتوى النشط' : 'Active Content'}
          {activeTab === 'active' && (
            <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary"></div>
          )}
        </button>
        
        <button
          onClick={() => onTabChange('archived')}
          className={`pb-4 px-2 font-medium transition-colors relative ${
            activeTab === 'archived'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {isRTL ? 'المحتوى المؤرشف' : 'Archived Content'}
          {activeTab === 'archived' && (
            <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-primary"></div>
          )}
        </button>
      </div>
    </div>
  );
}