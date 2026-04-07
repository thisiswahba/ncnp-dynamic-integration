import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
        جاري التحميل...
      </p>
    </div>
  );
}
