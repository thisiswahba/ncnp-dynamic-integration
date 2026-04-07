import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <div className="flex items-center justify-center gap-2" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
      
      {/* Page numbers */}
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[40px] px-3 py-2 rounded transition-colors ${
            page === currentPage
              ? 'bg-foreground text-background font-semibold'
              : 'hover:bg-muted text-foreground'
          }`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  );
}