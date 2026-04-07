import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const showEllipsis = totalPages > 5;
  
  const getVisiblePages = () => {
    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Show first page, current page, and some surrounding pages
    const pages: (number | string)[] = [];
    
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="flex items-center justify-center gap-2" dir="ltr">
      {/* Previous button (pointing left in LTR for RTL UI) */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Page numbers */}
      {getVisiblePages().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted-foreground">
              ...
            </span>
          );
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[40px] px-3 py-2 rounded transition-colors ${
              isActive
                ? 'bg-foreground text-background font-semibold'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      {/* Next button (pointing right in LTR for RTL UI) */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}