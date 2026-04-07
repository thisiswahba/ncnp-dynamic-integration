import { Outlet, useLocation } from 'react-router';
import { LanguageProvider } from '@/app/contexts/language-context';

export function RootLayout() {
  const location = useLocation();
  const module = location.pathname.startsWith('/admin') ? 'admin' : 'entity';
  
  return (
    <LanguageProvider module={module}>
      <Outlet />
    </LanguageProvider>
  );
}