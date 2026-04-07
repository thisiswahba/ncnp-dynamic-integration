import { useState } from 'react';
import { Outlet } from 'react-router';
import { Menu, Languages } from 'lucide-react';
import { Header } from '@/app/components/simple-header';
import { NavDrawer } from '@/app/components/nav-drawer';
import { useLanguage } from '@/app/contexts/language-context';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Header isSideNavOpen={isSidebarOpen} />
      
      {/* Green Sidebar Navigation */}
      <NavDrawer isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 pt-[97px] ${
          isSidebarOpen 
            ? isRTL ? 'mr-64' : 'ml-64' 
            : 'ml-0 mr-0'
        }`}
      >
        {/* Menu Toggle Button */}
        <div className="px-8 py-4 border-b border-border bg-white">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
}