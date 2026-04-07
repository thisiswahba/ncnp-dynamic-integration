import { useState } from 'react';
import { ArrowRight, X, Plus, Send, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationDialog } from './confirmation-dialog';

interface AdminFAQFormProps {
  onCancel?: () => void;
  onSave?: () => void;
  faqId?: string; // For editing existing FAQ
}

// Tag input component with inline tags
function TagInput({ 
  label, 
  tags, 
  onAddTag, 
  onRemoveTag 
}: { 
  label: string; 
  tags: string[]; 
  onAddTag: (tag: string) => void; 
  onRemoveTag: (tag: string) => void;
}) {
  const [input, setInput] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim() && !tags.includes(input.trim())) {
        onAddTag(input.trim());
        setInput('');
      }
    }
  };

  return (
    <div>
      <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        {label}
      </label>
      <div className="relative border border-primary rounded-lg px-3 py-2 min-h-[48px] flex items-center flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-muted border border-border rounded text-foreground"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {tag}
            <button
              onClick={() => onRemoveTag(tag)}
              className="hover:text-destructive transition-colors"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-foreground"
          style={{ fontSize: 'var(--text-sm)' }}
          placeholder={tags.length === 0 ? 'اكتب واضغط Enter' : ''}
        />
      </div>
    </div>
  );
}

export function AdminFAQForm({ onCancel, onSave, faqId }: AdminFAQFormProps) {
  const isEditMode = !!faqId;
  
  // Form state
  const [question, setQuestion] = useState(
    isEditMode ? 'ما هي معايير الحوكمة المطلوبة للجهات الحكومية؟' : ''
  );
  const [answer, setAnswer] = useState(
    isEditMode 
      ? 'معايير الحوكمة المطلوبة تشمل الشفافية في الإفصاح المالي، المساءلة الإدارية، وضوح الأدوار والمسؤوليات، تطبيق معايير الأداء، وآليات الرقابة الداخلية. يجب على جميع الجهات الحكومية الالتزام بهذه المعايير وفقاً للائحة التنفيذية الصادرة من الجهات الرقابية.' 
      : ''
  );
  const [owner, setOwner] = useState('');
  const [publishStatus, setPublishStatus] = useState(true);
  const [entityType, setEntityType] = useState('');
  const [entitySize, setEntitySize] = useState('');
  const [classifications, setClassifications] = useState<string[]>(['جمهور 1', 'جمهور 1', 'جمهور 1']);
  const [questionGroups, setQuestionGroups] = useState<string[]>(['وسم 1', 'وسم 1', 'وسم 1']);
  const [audiences, setAudiences] = useState<string[]>(['جمهور 1', 'جمهور 1', 'جمهور 1']);
  const [tags, setTags] = useState<string[]>(['وسم 1', 'وسم 1', 'وسم 1']);

  // Confirmation dialog state
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);

  const handleSave = () => {
    // Validate required fields
    if (!question.trim() || !answer.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    console.log('Saving FAQ:', {
      question,
      answer,
      owner,
      publishStatus,
      entityType,
      entitySize,
      classifications,
      questionGroups,
      audiences,
      tags
    });

    if (onSave) {
      onSave();
    }
  };

  const handleTogglePublishClick = () => {
    setShowConfirmPublish(true);
  };

  const handleConfirmPublish = () => {
    setPublishStatus(!publishStatus);
    
    // Show success toast
    if (publishStatus) {
      toast.success('تم إلغاء نشر السؤال بنجاح');
    } else {
      toast.success('تم نشر السؤال بنجاح');
    }
    
    setShowConfirmPublish(false);
  };

  const handleCancelPublish = () => {
    setShowConfirmPublish(false);
  };

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto" dir="rtl">
      {/* Page Header */}
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          {isEditMode ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
        </h1>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Question Field */}
        <div>
          <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            السؤال
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder=""
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            style={{ fontSize: 'var(--text-base)' }}
          />
        </div>

        {/* Answer Field */}
        <div>
          <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            الاجابة
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder=""
            rows={6}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
            style={{ fontSize: 'var(--text-base)' }}
          />
        </div>

        {/* Owner and Publish Status Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Owner */}
          <div>
            <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              المالك
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              style={{ fontSize: 'var(--text-base)' }}
            />
          </div>

          {/* Publish Status Buttons */}
          <div>
            <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              حالة النشر
            </label>
            <div className="flex items-center justify-end h-[48px] gap-2">
              {publishStatus ? (
                <button
                  type="button"
                  onClick={handleTogglePublishClick}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <XCircle className="w-4 h-4" />
                  <span>إلغاء النشر</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleTogglePublishClick}
                  className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                  <span>نشر</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Entity Type and Size Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Entity Type */}
          <div>
            <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              نوع الجهة
            </label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground appearance-none bg-white"
              style={{ fontSize: 'var(--text-base)' }}
            >
              <option value=""></option>
              <option value="government">جهة حكومية</option>
              <option value="private">جهة خاصة</option>
              <option value="nonprofit">جمعية غير ربحية</option>
            </select>
          </div>

          {/* Entity Size */}
          <div>
            <label className="block text-foreground mb-2 text-right" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              حجم الجهة
            </label>
            <select
              value={entitySize}
              onChange={(e) => setEntitySize(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground appearance-none bg-white"
              style={{ fontSize: 'var(--text-base)' }}
            >
              <option value=""></option>
              <option value="small">صغيرة</option>
              <option value="medium">متوسطة</option>
              <option value="large">كبيرة</option>
            </select>
          </div>
        </div>

        {/* Classification and Question Group Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Classification */}
          <TagInput
            label="التصنيف"
            tags={classifications}
            onAddTag={(tag) => setClassifications([...classifications, tag])}
            onRemoveTag={(tag) => setClassifications(classifications.filter(t => t !== tag))}
          />

          {/* Question Group */}
          <TagInput
            label="مجموعة الاسئلة"
            tags={questionGroups}
            onAddTag={(tag) => setQuestionGroups([...questionGroups, tag])}
            onRemoveTag={(tag) => setQuestionGroups(questionGroups.filter(t => t !== tag))}
          />
        </div>

        {/* Audience and Tags Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Audience */}
          <TagInput
            label="الجمهور"
            tags={audiences}
            onAddTag={(tag) => setAudiences([...audiences, tag])}
            onRemoveTag={(tag) => setAudiences(audiences.filter(t => t !== tag))}
          />

          {/* Tags */}
          <TagInput
            label="الوسوم"
            tags={tags}
            onAddTag={(tag) => setTags([...tags, tag])}
            onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
          />
        </div>
      </div>

      {/* Action Buttons - Enhanced */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-md"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <Plus className="w-5 h-5" />
          <span>{isEditMode ? 'حفظ التعديلات' : 'إضافة'}</span>
        </button>

        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-8 py-3 bg-white border border-border text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-all"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          <X className="w-5 h-5" />
          <span>إغلاق</span>
        </button>
      </div>

      {/* Confirmation Dialog for Publish Status */}
      <ConfirmationDialog
        isOpen={showConfirmPublish}
        title={publishStatus ? 'تأكيد إلغاء النشر' : 'تأكيد النشر'}
        message={
          publishStatus
            ? 'هل أنت متأكد من رغبتك في إلغاء نشر هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد الإلغاء.'
            : 'هل أنت متأكد من رغبتك في نشر هذا السؤال؟ سيتمكن المستخدمون من رؤية هذا السؤال بعد النشر.'
        }
        confirmText={publishStatus ? 'إلغاء النشر' : 'نشر'}
        cancelText="إلغاء"
        type={publishStatus ? 'warning' : 'success'}
        onConfirm={handleConfirmPublish}
        onCancel={handleCancelPublish}
      />
    </div>
  );
}