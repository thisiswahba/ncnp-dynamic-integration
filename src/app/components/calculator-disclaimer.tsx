import { useState } from 'react';
import { X } from 'lucide-react';

interface CalculatorDisclaimerProps {
  onAccept: () => void;
}

export function CalculatorDisclaimer({ onAccept }: CalculatorDisclaimerProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground" style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
            إقرار الاستخدام
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-900" style={{ fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                <strong>تنبيه هام:</strong> هذه الحاسبة المالية مصممة لتقديم تقييم استرشادي للمؤشرات المالية للمنظمات غير الربحية.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                يرجى العلم بالنقاط التالية:
              </p>
              
              <ul className="space-y-2 mr-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground flex-1" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    جميع البيانات المُدخلة هي مسؤولية الجهة المستخدمة بالكامل
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground flex-1" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    النتائج المحسوبة هي نتائج استرشادية ولا تعتبر بديلاً عن التدقيق المالي المعتمد
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground flex-1" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    يجب التأكد من دقة جميع البيانات المالية قبل إدخالها في الحاسبة
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground flex-1" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    المنصة غير مخصصة لجمع بيانات شخصية حساسة أو معلومات سرية
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground flex-1" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                    المؤشرات المحسوبة تعتمد على المعايير المحددة في دليل الاستخدام
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-900" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                باستخدام هذه الحاسبة، فإنك توافق على أن جميع البيانات المدخلة صحيحة ودقيقة وفقاً لسجلاتك المالية الرسمية.
              </p>
            </div>

            {/* Consent Checkbox */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 border-2 border-border rounded cursor-pointer
                      checked:bg-primary checked:border-primary
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                </div>
                <span className="text-foreground flex-1 select-none" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  أقر بصحة البيانات المدخلة وأوافق على الشروط المذكورة أعلاه
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-end">
          <button
            onClick={onAccept}
            disabled={!agreed}
            className={`px-8 py-3 rounded-lg transition-colors ${
              agreed
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
          >
            متابعة
          </button>
        </div>
      </div>
    </div>
  );
}
