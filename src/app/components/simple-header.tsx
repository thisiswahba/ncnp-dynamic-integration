import { Bell, ChevronDown } from 'lucide-react';
import Logo from '@/imports/Logo';
import { useLanguage } from '@/app/contexts/language-context';
import { useLocation } from 'react-router';

interface HeaderProps {
  isSideNavOpen?: boolean;
}

export function Header({ isSideNavOpen = false }: HeaderProps) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const location = useLocation();

  // Determine page context based on route
  const getPageContext = () => {
    if (location.pathname.includes('/data-sources')) {
      return {
        title: t('dataSources.title'),
        subtitle: t('dataSources.headerSubtitle') || (isRTL ? 'إدارة وتكوين مصادر البيانات الخارجية' : 'Manage and configure external data sources')
      };
    }
    return null;
  };

  const pageContext = getPageContext();

  return (
    <header className="bg-white border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Right side - Logo */}
          <div className="flex items-center">
            <div className="h-14 w-32">
              <Logo />
            </div>
          </div>

          {/* Center - Page Context (if available) */}
          {pageContext && (
            <div className={`flex-1 px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            </div>
          )}

          {/* Left side - User and notifications */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pr-4 border-r border-border">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <div className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? 'محمد أحمد' : 'Mohammed Ahmed'}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  {isRTL ? 'مدير النظام' : 'System Administrator'}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-foreground font-bold">{isRTL ? 'م' : 'M'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}