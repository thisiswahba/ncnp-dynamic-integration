import { Calculator } from 'lucide-react';

interface CalculatorLandingProps {
  onStartCalculation: () => void;
}

export function CalculatorLanding({ onStartCalculation }: CalculatorLandingProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-8 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-primary/10 rounded-full">
            <Calculator className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-foreground mb-4" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          الحاسبة المالية
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto" style={{ fontSize: 'var(--text-lg)' }}>
          احسب المؤشرات المالية الرئيسية بناءً على بيانات منظمتك
        </p>

        {/* CTA Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={onStartCalculation}
            className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl flex items-center gap-3"
            style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}
          >
            <Calculator className="w-5 h-5" />
            بدء الحساب
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="p-6 bg-white rounded-lg border border-border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
              حسابات دقيقة
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              نتائج مبنية على معايير محاسبية معتمدة
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
              سهل وسريع
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
              احصل على نتائج فورية في دقائق
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
