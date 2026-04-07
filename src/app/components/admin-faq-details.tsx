import { ArrowRight, Edit2, Archive, Calendar, User, Building2, Layers, Tag, Users, FileText, CheckCircle, XCircle, Send, ArchiveRestore } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmationDialog } from './confirmation-dialog';

interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  owner: string;
  publishStatus: boolean;
  entityType: string;
  entitySize: string;
  classifications: string[];
  questionGroups: string[];
  audiences: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface AdminFAQDetailsProps {
  faq: AdminFAQ;
  onClose: () => void;
  onEdit?: (faqId: string) => void;
  onTogglePublish?: (faqId: string, currentStatus: boolean) => void;
  onToggleArchive?: (faqId: string, currentStatus: string) => void;
}

export function AdminFAQDetails({ faq, onClose, onEdit, onTogglePublish, onToggleArchive }: AdminFAQDetailsProps) {
  const [showConfirmPublish, setShowConfirmPublish] = useState(false);
  const [showConfirmArchive, setShowConfirmArchive] = useState(false);
  
  const handleTogglePublishClick = () => {
    setShowConfirmPublish(true);
  };

  const handleToggleArchiveClick = () => {
    setShowConfirmArchive(true);
  };

  const handleConfirmPublish = () => {
    if (onTogglePublish) {
      onTogglePublish(faq.id, faq.publishStatus);
    }
    
    // Show success toast
    if (faq.publishStatus) {
      toast.success('تم إلغاء نشر السؤال بنجاح');
    } else {
      toast.success('تم نشر السؤال بنجاح');
    }
    
    setShowConfirmPublish(false);
  };

  const handleConfirmArchive = () => {
    if (onToggleArchive) {
      onToggleArchive(faq.id, faq.status);
    }
    
    // Show success toast
    if (faq.status === 'archived') {
      toast.success('تم إلغاء أرشفة السؤال بنجاح');
    } else {
      toast.success('تم أرشفة السؤال بنجاح');
    }
    
    setShowConfirmArchive(false);
  };

  const handleCancelPublish = () => {
    setShowConfirmPublish(false);
  };

  const handleCancelArchive = () => {
    setShowConfirmArchive(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return { bg: 'var(--success-light)', color: 'var(--success)', text: 'منشور' };
      case 'draft':
        return { bg: 'var(--warning-light)', color: 'var(--warning)', text: 'مسودة' };
      case 'archived':
        return { bg: 'var(--muted)', color: 'var(--muted-foreground)', text: 'مؤرشف' };
      default:
        return { bg: 'var(--muted)', color: 'var(--muted-foreground)', text: status };
    }
  };

  const statusStyle = getStatusStyle(faq.status);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="px-8 py-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى القائمة</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  تفاصيل السؤال
                </h1>
                <span 
                  className="px-3 py-1 rounded-full"
                  style={{ 
                    fontSize: 'var(--text-xs)', 
                    fontWeight: 500,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color
                  }}
                >
                  {statusStyle.text}
                </span>
              </div>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                آخر تحديث: {faq.lastModified}
              </p>
            </div>

            <div className="flex gap-2">
              {faq.publishStatus ? (
                <button
                  onClick={handleTogglePublishClick}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <XCircle className="w-4 h-4" />
                  <span>إلغاء النشر</span>
                </button>
              ) : (
                <button
                  onClick={handleTogglePublishClick}
                  className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Send className="w-4 h-4" />
                  <span>نشر</span>
                </button>
              )}
              {faq.status !== 'archived' ? (
                <button
                  onClick={handleToggleArchiveClick}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <Archive className="w-4 h-4" />
                  <span>أرشفة</span>
                </button>
              ) : (
                <button
                  onClick={handleToggleArchiveClick}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/90 transition-colors"
                  style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                >
                  <ArchiveRestore className="w-4 h-4" />
                  <span>إلغاء الأرشفة</span>
                </button>
              )}
              <button
                onClick={() => onEdit && onEdit(faq.id)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
              >
                <Edit2 className="w-4 h-4" />
                <span>تعديل</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Question */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-start gap-3 mb-2">
              <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <h2 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                السؤال
              </h2>
            </div>
            <p className="text-foreground mr-8" style={{ fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
              {faq.question}
            </p>
          </div>

          {/* Answer */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-start gap-3 mb-2">
              <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <h2 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                الإجابة
              </h2>
            </div>
            <p className="text-foreground mr-8" style={{ fontSize: 'var(--text-base)', lineHeight: '1.8' }}>
              {faq.answer}
            </p>
          </div>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Owner */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  المالك
                </h3>
              </div>
              <p className="text-foreground mr-8" style={{ fontSize: 'var(--text-base)' }}>
                {faq.owner || '-'}
              </p>
            </div>

            {/* Publish Status */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                {faq.publishStatus ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                )}
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  حالة النشر
                </h3>
              </div>
              <span 
                className={`mr-8 px-3 py-1 rounded-full inline-block ${
                  faq.publishStatus ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                }`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {faq.publishStatus ? 'منشور' : 'غير منشور'}
              </span>
            </div>

            {/* Entity Type */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  نوع الجهة
                </h3>
              </div>
              <span 
                className="mr-8 px-3 py-1 bg-primary/10 text-primary rounded-full inline-block"
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              >
                {faq.entityType || '-'}
              </span>
            </div>

            {/* Entity Size */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  حجم الجهة
                </h3>
              </div>
              <p className="text-foreground mr-8" style={{ fontSize: 'var(--text-base)' }}>
                {faq.entitySize || '-'}
              </p>
            </div>
          </div>

          {/* Classifications */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                التصنيف
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mr-8">
              {faq.classifications.length > 0 ? (
                faq.classifications.map((classification, i) => (
                  <span 
                    key={i}
                    className="px-3 py-2 bg-muted text-foreground rounded-lg border border-border"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {classification}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لا يوجد تصنيفات
                </p>
              )}
            </div>
          </div>

          {/* Question Groups */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                مجموعة الاسئلة
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mr-8">
              {faq.questionGroups.length > 0 ? (
                faq.questionGroups.map((group, i) => (
                  <span 
                    key={i}
                    className="px-3 py-2 bg-primary/10 text-primary rounded-lg"
                    style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                  >
                    {group}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لا يوجد مجموعات
                </p>
              )}
            </div>
          </div>

          {/* Audiences */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                الجمهور
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mr-8">
              {faq.audiences.length > 0 ? (
                faq.audiences.map((audience, i) => (
                  <span 
                    key={i}
                    className="px-3 py-2 bg-muted text-foreground rounded-lg border border-border"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {audience}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لا يوجد جمهور محدد
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h3 className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                الوسوم
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mr-8">
              {faq.tags.length > 0 ? (
                faq.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-2 bg-muted text-foreground rounded-lg border border-border"
                    style={{ fontSize: 'var(--text-sm)' }}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  لا يوجد وسوم
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showConfirmPublish}
          title={faq.publishStatus ? 'تأكيد إلغاء النشر' : 'تأكيد النشر'}
          message={
            faq.publishStatus
              ? 'هل أنت متأكد من رغبتك في إلغاء نشر هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد الإلغاء.'
              : 'هل أنت متأكد من رغبتك في نشر هذا السؤال؟ سيتمكن المستخدمون من رؤية هذا السؤال بعد النشر.'
          }
          confirmText={faq.publishStatus ? 'إلغاء النشر' : 'نشر'}
          cancelText="إلغاء"
          type={faq.publishStatus ? 'warning' : 'success'}
          onConfirm={handleConfirmPublish}
          onCancel={handleCancelPublish}
        />

        <ConfirmationDialog
          isOpen={showConfirmArchive}
          title={faq.status === 'archived' ? 'تأكيد إلغاء الأرشفة' : 'تأكيد الأرشفة'}
          message={
            faq.status === 'archived'
              ? 'هل أنت متأكد من رغبتك في إلغاء أرشفة هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد إلغاء الأرشفة.'
              : 'هل أنت متأكد من رغبتك في أرشفة هذا السؤال؟ لن يتمكن المستخدمون من رؤية هذا السؤال بعد الأرشفة.'
          }
          confirmText={faq.status === 'archived' ? 'إلغاء الأرشفة' : 'أرشفة'}
          cancelText="إلغاء"
          type={faq.status === 'archived' ? 'warning' : 'success'}
          onConfirm={handleConfirmArchive}
          onCancel={handleCancelArchive}
        />
      </div>
    </div>
  );
}