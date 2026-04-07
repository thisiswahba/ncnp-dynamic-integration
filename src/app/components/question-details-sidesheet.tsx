import { useState } from 'react';
import { X, ExternalLink, Upload, RotateCcw, Save, AlertCircle, FileText, BookOpen, Link as LinkIcon } from 'lucide-react';

interface LinkedContent {
  id: string;
  title: string;
  type: 'faq' | 'guideline';
  source: string;
}

interface QuestionDetailsSidesheetProps {
  isOpen: boolean;
  onClose: () => void;
  questionTitle: string;
  linkedContent: LinkedContent[];
  aiScore?: number;
  currentScore?: number;
  overrideReason?: string;
  isOverridden?: boolean;
  onSave: (data: { score: number; reason: string; attachment?: File }) => void;
}

export function QuestionDetailsSidesheet({
  isOpen,
  onClose,
  questionTitle,
  linkedContent,
  aiScore,
  currentScore,
  overrideReason: initialReason,
  isOverridden: initialOverridden = false,
  onSave,
}: QuestionDetailsSidesheetProps) {
  const [manualScore, setManualScore] = useState<string>(currentScore?.toString() || '');
  const [reason, setReason] = useState(initialReason || '');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isOverridden, setIsOverridden] = useState(initialOverridden);
  const [errors, setErrors] = useState<{ score?: string; reason?: string }>({});

  if (!isOpen) return null;

  const handleReset = () => {
    if (aiScore !== undefined) {
      setManualScore(aiScore.toString());
      setReason('');
      setAttachment(null);
      setIsOverridden(false);
      setErrors({});
    }
  };

  const handleSave = () => {
    const newErrors: { score?: string; reason?: string } = {};

    if (!manualScore.trim()) {
      newErrors.score = 'النتيجة مطلوبة';
    }

    const scoreValue = parseFloat(manualScore);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      newErrors.score = 'يجب أن تكون النتيجة بين 0 و 100';
    }

    if (isOverridden && !reason.trim()) {
      newErrors.reason = 'السبب مطلوب عند التعديل اليدوي';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave({
        score: scoreValue,
        reason: reason.trim(),
        attachment: attachment || undefined,
      });
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setAttachment(null);
  };

  const handleContentClick = (contentId: string) => {
    console.log('Navigate to content:', contentId);
    // This would open the content details in another side sheet or navigate to it
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Side Sheet */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-start justify-between z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 mr-4">
            <h2 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-lg)' }}>
              تفاصيل السؤال
            </h2>
            <p className="text-muted-foreground text-right mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              {questionTitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Evidence & Sources Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-base)' }}>
                الأدلة والمصادر
              </h3>
              <LinkIcon className="w-4 h-4 text-muted-foreground" />
            </div>

            {linkedContent.length > 0 ? (
              <div className="space-y-2">
                {linkedContent.map((content) => (
                  <button
                    key={content.id}
                    onClick={() => handleContentClick(content.id)}
                    className="w-full p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-colors text-right group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {content.type === 'faq' ? (
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-primary shrink-0" />
                          )}
                          <span className="font-medium text-foreground text-right" style={{ fontSize: 'var(--text-sm)' }}>
                            {content.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: content.type === 'faq' ? 'var(--blue-50)' : 'var(--green-50)',
                              color: content.type === 'faq' ? 'var(--blue-700)' : 'var(--green-700)',
                            }}
                          >
                            {content.type === 'faq' ? 'سؤال شائع' : 'محتوى دليل'}
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            •
                          </span>
                          <span className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                            {content.source}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-muted/20 rounded-lg border border-dashed border-border text-center">
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لا توجد مصادر مرتبطة بهذا السؤال
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Manual Override Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-right" style={{ fontSize: 'var(--text-base)' }}>
                التعديل اليدوي
              </h3>
              {isOverridden && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  معدّل يدوياً
                </span>
              )}
            </div>

            {/* AI Score Display */}
            {aiScore !== undefined && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      اقتراح الذكاء الاصطناعي
                    </span>
                  </div>
                  <span className="font-bold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>
                    {aiScore}
                  </span>
                </div>
              </div>
            )}

            {/* Score Input */}
            <div className="space-y-2">
              <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
                النتيجة <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={manualScore}
                onChange={(e) => {
                  setManualScore(e.target.value);
                  setIsOverridden(true);
                  if (errors.score) {
                    setErrors({ ...errors, score: undefined });
                  }
                }}
                placeholder="أدخل النتيجة (0-100)"
                className={`w-full h-10 px-4 bg-white border ${errors.score ? 'border-destructive' : 'border-border'} rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20`}
                style={{ fontSize: 'var(--text-base)' }}
                dir="rtl"
              />
              {errors.score && (
                <div className="flex items-center gap-2 text-destructive text-right">
                  <span style={{ fontSize: 'var(--text-xs)' }}>{errors.score}</span>
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Reason Input */}
            <div className="space-y-2">
              <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
                سبب التعديل {isOverridden && <span className="text-destructive">*</span>}
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (errors.reason) {
                    setErrors({ ...errors, reason: undefined });
                  }
                }}
                placeholder="اكتب سبب التعديل اليدوي للنتيجة"
                rows={4}
                className={`w-full px-4 py-3 bg-white border ${errors.reason ? 'border-destructive' : 'border-border'} rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none`}
                style={{ fontSize: 'var(--text-base)' }}
                dir="rtl"
              />
              {errors.reason && (
                <div className="flex items-center gap-2 text-destructive text-right">
                  <span style={{ fontSize: 'var(--text-xs)' }}>{errors.reason}</span>
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              <p className="text-muted-foreground text-right" style={{ fontSize: 'var(--text-xs)' }}>
                السبب مطلوب عند التعديل اليدوي للنتيجة
              </p>
            </div>

            {/* Attachment Upload */}
            <div className="space-y-2">
              <label className="text-foreground text-right block" style={{ fontSize: 'var(--text-sm)' }}>
                مرفق داعم (اختياري)
              </label>
              
              {!attachment ? (
                <label className="block">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <div className="p-4 bg-muted/20 hover:bg-muted/30 rounded-lg border border-dashed border-border cursor-pointer transition-colors">
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        رفع مرفق
                      </span>
                      <Upload className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </label>
              ) : (
                <div className="p-3 bg-muted/30 rounded-lg border border-border flex items-center justify-between">
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                  <span className="flex-1 text-foreground text-right mx-3" style={{ fontSize: 'var(--text-sm)' }}>
                    {attachment.name}
                  </span>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--success)',
                color: 'white',
                fontSize: 'var(--text-sm)'
              }}
            >
              <span>حفظ وتطبيق</span>
              <Save className="w-4 h-4" />
            </button>
            
            {aiScore !== undefined && (
              <button
                onClick={handleReset}
                className="px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <span className="text-foreground font-medium">إعادة تعيين</span>
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
