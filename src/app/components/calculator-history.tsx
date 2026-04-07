import { Calendar, Eye, Trash2 } from 'lucide-react';

interface CalculationHistory {
  id: string;
  date: string;
  organization: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement';
}

interface CalculatorHistoryProps {
  onBack: () => void;
  onViewResult: (id: string) => void;
}

export function CalculatorHistory({ onBack, onViewResult }: CalculatorHistoryProps) {
  // Load history from localStorage
  const loadHistory = (): CalculationHistory[] => {
    const stored = localStorage.getItem('calculatorHistory');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        date: '2024-02-05',
        organization: 'جمعية الخير',
        score: 85,
        status: 'excellent'
      },
      {
        id: '2',
        date: '2024-01-28',
        organization: 'جمعية الخير',
        score: 72,
        status: 'good'
      },
      {
        id: '3',
        date: '2024-01-15',
        organization: 'جمعية الخير',
        score: 58,
        status: 'needs-improvement'
      }
    ];
  };

  const history = loadHistory();

  const deleteCalculation = (id: string) => {
    const filtered = history.filter(h => h.id !== id);
    localStorage.setItem('calculatorHistory', JSON.stringify(filtered));
    window.location.reload();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { color: 'bg-green-100 text-green-700', label: 'ممتاز' };
    if (score >= 60) return { color: 'bg-yellow-100 text-yellow-700', label: 'جيد' };
    return { color: 'bg-red-100 text-red-700', label: 'يحتاج تحسين' };
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-foreground" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
          الحسابات السابقة
        </h1>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
          style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
        >
          رجوع
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-foreground mb-2" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
            لا توجد حسابات سابقة
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            ابدأ بإنشاء حساب جديد لعرضه هنا
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full" dir="rtl">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-4 text-right">
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                    التاريخ
                  </span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                    الجهة
                  </span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                    النتيجة
                  </span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                    الحالة
                  </span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                    الإجراءات
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((item) => {
                const badge = getScoreBadge(item.score);
                return (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground" style={{ fontSize: 'var(--text-base)', fontWeight: 500 }}>
                        {item.organization}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getScoreColor(item.score)} style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                        {item.score}
                      </span>
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                        {' '}/ 100
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-3 py-1 rounded-full ${badge.color}`}
                        style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewResult(item.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                        >
                          <Eye className="w-4 h-4" />
                          عرض
                        </button>
                        <button
                          onClick={() => deleteCalculation(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
