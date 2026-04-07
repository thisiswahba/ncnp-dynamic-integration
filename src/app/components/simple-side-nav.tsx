import { useState } from 'react';
import { Home, ChevronDown, ChevronUp } from 'lucide-react';

interface SideNavProps {
  isOpen: boolean;
}

export function SideNav({ isOpen }: SideNavProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1']));

  if (!isOpen) return null;

  return (
    <aside className="fixed right-0 top-[73px] w-64 h-[calc(100vh-73px)] bg-white border-l border-border shadow-lg overflow-y-auto z-40">
      <nav className="p-4">
        <div className="space-y-1">
          <div className="mb-4">
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span style={{ fontSize: 'var(--text-sm)' }} className="font-medium">الرئيسية</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
