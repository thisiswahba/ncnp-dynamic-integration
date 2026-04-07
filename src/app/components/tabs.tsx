interface TabsProps {
  activeTab: 'active' | 'inactive';
  onTabChange: (tab: 'active' | 'inactive') => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-start gap-4 border-b-[3px] border-border">
        <button
          onClick={() => onTabChange('active')}
          className={`px-4 py-4 relative ${
            activeTab === 'active'
              ? 'text-foreground font-bold'
              : 'text-muted-foreground font-medium'
          }`}
        >
          المحتوى النشط
          {activeTab === 'active' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          )}
        </button>
        
        <button
          onClick={() => onTabChange('inactive')}
          className={`px-4 py-4 relative ${
            activeTab === 'inactive'
              ? 'text-foreground font-bold'
              : 'text-muted-foreground font-medium'
          }`}
        >
          المحتوي الغير نشط
          {activeTab === 'inactive' && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          )}
        </button>
      </div>
    </div>
  );
}