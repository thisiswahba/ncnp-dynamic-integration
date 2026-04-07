import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'success';
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = 'warning'
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'var(--destructive-light)',
          iconColor: 'var(--destructive)',
          confirmBg: 'var(--destructive)',
          confirmHover: 'var(--destructive)/90'
        };
      case 'success':
        return {
          iconBg: 'var(--success-light)',
          iconColor: 'var(--success)',
          confirmBg: 'var(--success)',
          confirmHover: 'var(--success)/90'
        };
      case 'warning':
      default:
        return {
          iconBg: 'var(--warning-light)',
          iconColor: 'var(--warning)',
          confirmBg: 'var(--warning)',
          confirmHover: 'var(--warning)/90'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
            {title}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div 
              className="p-3 rounded-lg flex-shrink-0"
              style={{ backgroundColor: styles.iconBg }}
            >
              <AlertTriangle className="w-6 h-6" style={{ color: styles.iconColor }} />
            </div>
            <p className="text-foreground flex-1 mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              {message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/20">
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ 
              fontSize: 'var(--text-sm)', 
              fontWeight: 600,
              backgroundColor: styles.confirmBg
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
