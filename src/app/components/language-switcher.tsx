import { Globe } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-muted transition-colors"
      style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}
