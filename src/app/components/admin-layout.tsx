import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Menu, Languages } from 'lucide-react';
import { Header } from '@/app/components/simple-header';
import { NavDrawer } from '@/app/components/nav-drawer';
import { useLanguage } from '@/app/contexts/language-context';
import { useIsMobile } from '@/app/components/ui/use-mobile';

export function AdminLayout() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'ar';

  // Sync default to viewport: closed on mobile, open on desktop.
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // On mobile the drawer overlays the content; on desktop it pushes it.
  const overlayMode = isMobile;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header isSideNavOpen={isSidebarOpen && !overlayMode} />

      <NavDrawer isOpen={isSidebarOpen} />

      {overlayMode && isSidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      <main
        className={`transition-all duration-300 pt-[97px] ${
          isSidebarOpen && !overlayMode
            ? isRTL ? 'mr-64' : 'ml-64'
            : 'ml-0 mr-0'
        }`}
      >
        {/* Menu Toggle */}
        <div className="px-4 md:px-8 py-3 md:py-4 border-b border-border bg-white">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 hover:bg-muted rounded-lg transition-colors text-foreground ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
            >
              <Languages className="w-5 h-5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
