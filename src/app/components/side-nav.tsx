import { useState } from 'react';
import { Home, ChevronDown, ChevronLeft } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon?: boolean;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: '1',
    label: 'لوحة التحكم',
    icon: true,
    children: [
      { id: '1-1', label: 'نظرة عامة' },
      { id: '1-2', label: 'الإحصائيات' },
      { id: '1-3', label: 'التقارير' },
    ],
  },
  {
    id: '2',
    label: 'إدارة المحتوى',
    icon: true,
  },
  {
    id: '3',
    label: 'إدارة المستخدمين',
    icon: true,
  },
];

interface SideNavProps {
  isOpen: boolean;
  onToggle?: () => void;
}

export function SideNav({ isOpen }: SideNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1']));

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <aside
      className={`fixed right-0 h-[calc(100vh-72px)] text-white transition-all duration-300 z-40 top-[72px] ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
      style={{ backgroundColor: 'var(--primary)' }}
      dir="rtl"
    >
      <nav className="flex flex-col h-full pt-6 pb-6 px-4 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <div key={item.id} className="mb-2">
            {/* Main nav item */}
            <button
              onClick={() => item.children && item.children.length > 0 && toggleItem(item.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded hover:bg-white/10 transition-colors text-right"
            >
              <div className="flex items-center gap-2">
                {item.children && item.children.length > 0 && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    {expandedItems.has(item.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
                {item.icon && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                )}
              </div>
            </button>

            {/* Children items */}
            {item.children && item.children.length > 0 && expandedItems.has(item.id) && (
              <div className="pr-12 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    className="w-full flex items-center justify-end gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors text-right"
                  >
                    <span className="text-sm whitespace-nowrap">{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}