import { Search, SlidersHorizontal } from 'lucide-react';

export function SearchAndFilters() {
  return (
    <div className="flex items-center gap-4">
      {/* Search input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="بحث باسم الكيان، رقم التسجيل"
          className="w-full px-4 py-2.5 pl-12 border border-border rounded text-right bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
      </div>
      
      {/* Search button */}
      <button className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors">
        <span>بحث</span>
      </button>
      
      {/* Filter button */}
      <button className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded hover:bg-muted/80 transition-colors min-w-[130px]">
        <SlidersHorizontal className="w-6 h-6" />
        <span>تصفية</span>
      </button>
    </div>
  );
}