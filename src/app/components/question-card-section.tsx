// This is the updated question rendering section to replace in form-builder-readonly-structure.tsx
// Lines approximately 1817-1846

{/* Question Header */}
<div className="flex items-start justify-between mb-2">
  <div className="flex items-center gap-1">
    <button 
      onClick={() => toggleQuestion(criterion.id, indicator.id, practice.id, question.id)}
      className="p-0.5 hover:bg-white rounded transition-colors"
    >
      {question.isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
    </button>
    <button
      onClick={() => handleQuestionClick(criterion.id, indicator.id, practice.id, question.id)}
      className="p-0.5 hover:bg-primary/10 rounded transition-colors group"
      title="عرض تفاصيل السؤال"
    >
      <ExternalLink className="w-3 h-3 text-primary group-hover:text-primary/80" />
    </button>
  </div>
  <div className="flex-1 text-right mr-2">
    <div className="flex items-center gap-1 justify-end mb-1 flex-wrap">
      <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-purple-200 text-purple-900">
        المستوى 4: السؤال
      </span>
      {/* Linked Content Status Badge */}
      {question.linkedContent && question.linkedContent.length > 0 && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
          ✅ مرتبط بـ {question.linkedContent.length} عناصر
        </span>
      )}
      {/* Override Status Badge */}
      {question.isOverridden && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
          ✏️ معدّل يدوياً
        </span>
      )}
      {/* No Linked Content Badge */}
      {(!question.linkedContent || question.linkedContent.length === 0) && (
        <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-700">
          ⚠️ بدون محتوى مرتبط
        </span>
      )}
    </div>
    <button
      onClick={() => handleQuestionClick(criterion.id, indicator.id, practice.id, question.id)}
      className="font-medium text-foreground text-xs hover:text-primary transition-colors text-right w-full"
    >
      {question.title}
    </button>
    
    {!question.isExpanded && question.contentBlocks.length > 0 && (
      <div className="mt-1">
        <span className="inline-block px-1.5 py-0.5 rounded text-xs bg-white/60 text-muted-foreground">
          محتوى تمت إضافته
        </span>
        <p className="text-muted-foreground text-xs mt-0.5">
          {getPreviewSummary(question.contentBlocks)}
        </p>
      </div>
    )}
  </div>
</div>
