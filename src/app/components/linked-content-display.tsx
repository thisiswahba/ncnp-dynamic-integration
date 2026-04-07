import { BookOpen, HelpCircle, FileText, ExternalLink } from 'lucide-react';
import type { LinkedContent } from './question-linking-modal';

interface LinkedContentDisplayProps {
  linkedItems: LinkedContent[];
  onViewContent?: (item: LinkedContent) => void;
}

export function LinkedContentDisplay({ linkedItems, onViewContent }: LinkedContentDisplayProps) {
  if (linkedItems.length === 0) {
    return null;
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'rules-guidelines':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'evaluation-forms':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'rules-guidelines':
        return 'دليل';
      case 'evaluation-forms':
        return 'نموذج';
      case 'faq':
        return 'س.ش';
      default:
        return '';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'rules-guidelines':
        return 'bg-blue-50 border-blue-200';
      case 'evaluation-forms':
        return 'bg-purple-50 border-purple-200';
      case 'faq':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        المحتوى المرجعي المرتبط
      </h4>
      
      <div className="space-y-2">
        {linkedItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewContent?.(item)}
            className={`w-full text-right flex items-start gap-3 p-3 border rounded-lg hover:shadow-sm transition-all ${getBgColor(item.contentType)}`}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {getContentIcon(item.contentType)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-foreground"
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                >
                  {getContentTypeLabel(item.contentType)}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                  •
                </span>
                <span className="text-foreground truncate" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  {item.contentName}
                </span>
              </div>

              {/* Levels breadcrumb */}
              {(item.level1 || item.level2 || item.level3) && (
                <div className="flex items-center gap-1 text-muted-foreground mb-1" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.level1 && <span className="truncate max-w-[120px]">{item.level1}</span>}
                  {item.level2 && (
                    <>
                      <span>{'>'}</span>
                      <span className="truncate max-w-[120px]">{item.level2}</span>
                    </>
                  )}
                  {item.level3 && (
                    <>
                      <span>{'>'}</span>
                      <span className="truncate max-w-[120px]">{item.level3}</span>
                    </>
                  )}
                </div>
              )}

              {/* Question title */}
              {item.questionTitle && (
                <p className="text-muted-foreground truncate" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.questionTitle}
                </p>
              )}
            </div>

            {/* External link icon */}
            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
