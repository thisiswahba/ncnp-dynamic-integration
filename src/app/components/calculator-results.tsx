import { Edit } from 'lucide-react';
import type { MainIndicator, AnalyticalIndicator } from '../utils/calculator-engine';

interface CalculatorResultsProps {
  score: number;
  mainIndicators: MainIndicator[];
  analyticalIndicators: AnalyticalIndicator[];
  onEdit: () => void;
  onSave: () => void;
  onExportPDF: () => void;
  onLinkToAssessment?: () => void;
}

// Circular Progress Indicator Component
function CircularProgress({ value, size = 40 }: { value: number; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  
  const getColor = (val: number) => {
    if (val >= 80) return '#1B8354'; // primary color
    if (val >= 60) return '#EAB308'; // warning
    return '#B42318'; // destructive
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(229, 231, 235, 1)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      {/* Value text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-foreground" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
          {Math.round(value)}
        </span>
      </div>
    </div>
  );
}

export function CalculatorResults({ 
  score, 
  mainIndicators,
  analyticalIndicators,
  onEdit, 
}: CalculatorResultsProps) {
  // Group analytical indicators by main indicator
  const groupedIndicators = mainIndicators.map(main => ({
    ...main,
    analyticalIndicators: analyticalIndicators.filter(
      analytical => analytical.id.startsWith(main.id.toString())
    )
  }));

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-8" dir="rtl">
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          نتائج الحساب
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            <Edit className="w-4 h-4" />
            تعديل البيانات
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-[280px_1fr] gap-6">
        {/* Left Panel - Final Score */}
        <div className="bg-white rounded-lg border border-border p-6 h-fit">
          <h2 className="text-foreground mb-8 text-center" style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
            النتيجة النهائية
          </h2>
          
          {/* Large Circular Score */}
          <div className="flex items-center justify-center">
            <div className="relative" style={{ width: 180, height: 180 }}>
              <svg width="180" height="180" className="-rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  fill="none"
                  stroke="rgba(229, 231, 235, 1)"
                  strokeWidth="14"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="75"
                  fill="none"
                  stroke={score >= 80 ? '#1B8354' : score >= 60 ? '#EAB308' : '#B42318'}
                  strokeWidth="14"
                  strokeDasharray={`${(score / 100) * 471.24} 471.24`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-foreground" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
                  {Math.round(score)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Indicators Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_120px_100px_100px] gap-4 bg-muted px-6 py-4 border-b border-border">
            <div className="text-right">
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                المؤشر
              </span>
            </div>
            <div className="text-center">
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                الوزن
              </span>
            </div>
            <div className="text-center">
              <span className="text-foreground text-center block" style={{ fontSize: 'var(--text-xs)', fontWeight: 700, lineHeight: 1.3 }}>
                المستهدف للمؤشر التحليلي
              </span>
            </div>
            <div className="text-center">
              <span className="text-foreground text-center block" style={{ fontSize: 'var(--text-xs)', fontWeight: 700, lineHeight: 1.3 }}>
                النسبة المحققة للمؤشر التحليلي
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border max-h-[calc(100vh-300px)] overflow-y-auto">
            {groupedIndicators.map((mainIndicator) => (
              <div key={mainIndicator.id}>
                {/* Main Indicator Header */}
                <div className="bg-muted/50 px-6 py-3">
                  <h3 className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>
                    {mainIndicator.name}
                  </h3>
                </div>
                
                {/* Analytical Indicators Rows */}
                {mainIndicator.analyticalIndicators.map((indicator) => (
                  <div 
                    key={indicator.id}
                    className="grid grid-cols-[1fr_120px_100px_100px] gap-4 px-6 py-4 hover:bg-muted/30 transition-colors items-center"
                  >
                    {/* Indicator Name */}
                    <div className="text-right">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {indicator.name}
                      </span>
                    </div>
                    
                    {/* Weight */}
                    <div className="text-center">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {indicator.weight.toFixed(1)}٪
                      </span>
                    </div>
                    
                    {/* Target Circle */}
                    <div className="flex justify-center">
                      <CircularProgress value={100} size={50} />
                    </div>
                    
                    {/* Actual Circle */}
                    <div className="flex justify-center">
                      <CircularProgress value={indicator.score} size={50} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}