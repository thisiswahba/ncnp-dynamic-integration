import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface CalculatorData {
  // Section 1: المصروفات
  generalExpenses: string;
  programExpenses: string;
  adminOnActivity: string;
  sustainabilityExpenses: string;
  fundraisingExpenses: string;
  // Section 2: الإيرادات
  sustainabilityRevenue: string;
  sustainabilityAssets: string;
  donationRevenue: string;
  // Section 3: النقدية
  cashInBanks: string;
  currentInvestments: string;
  currentLiabilities: string;
  restrictedNetAssets: string;
  // Section 4: المصروفات التقديرية
  estimatedAdminExpenses: string;
}

interface CalculatorWizardProps {
  onComplete: (data: CalculatorData) => void;
  onCancel: () => void;
}

export function CalculatorWizard({ onComplete, onCancel }: CalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<CalculatorData>({
    generalExpenses: '',
    programExpenses: '',
    adminOnActivity: '',
    sustainabilityExpenses: '',
    fundraisingExpenses: '',
    sustainabilityRevenue: '',
    sustainabilityAssets: '',
    donationRevenue: '',
    cashInBanks: '',
    currentInvestments: '',
    currentLiabilities: '',
    restrictedNetAssets: '',
    estimatedAdminExpenses: '',
  });

  const updateField = (field: keyof CalculatorData, value: string) => {
    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    // Allow only numbers and decimal point
    if (value && !/^\d*\.?\d{0,2}$/.test(value)) {
      return;
    }

    setData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // المصروفات
      if (!data.generalExpenses) newErrors.generalExpenses = 'هذا الحقل مطلوب';
      if (!data.programExpenses) newErrors.programExpenses = 'هذا الحقل مطلوب';
      if (!data.adminOnActivity) newErrors.adminOnActivity = 'هذا الحقل مطلوب';
      if (!data.sustainabilityExpenses) newErrors.sustainabilityExpenses = 'هذا الحقل مطلوب';
      if (!data.fundraisingExpenses) newErrors.fundraisingExpenses = 'هذا الحقل مطلوب';
    } else if (step === 2) {
      // الإيرادات
      if (!data.sustainabilityRevenue) newErrors.sustainabilityRevenue = 'هذا الحقل مطلوب';
      if (!data.sustainabilityAssets) newErrors.sustainabilityAssets = 'هذا الحقل مطلوب';
      if (!data.donationRevenue) newErrors.donationRevenue = 'هذا الحقل مطلوب';
    } else if (step === 3) {
      // النقدية
      if (!data.cashInBanks) newErrors.cashInBanks = 'هذا الحقل مطلوب';
      if (!data.currentInvestments) newErrors.currentInvestments = 'هذا الحقل مطلوب';
      if (!data.currentLiabilities) newErrors.currentLiabilities = 'هذا الحقل مطلوب';
      if (!data.restrictedNetAssets) newErrors.restrictedNetAssets = 'هذا الحقل مطلوب';
    } else if (step === 4) {
      // المصروفات التقديرية
      if (!data.estimatedAdminExpenses) newErrors.estimatedAdminExpenses = 'هذا الحقل مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCalculate = () => {
    if (validateStep(currentStep)) {
      onComplete(data);
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const steps = [
    { number: 1, label: 'المصروفات', completed: currentStep > 1 },
    { number: 2, label: 'الإيرادات', completed: currentStep > 2 },
    { number: 3, label: 'النقدية', completed: currentStep > 3 },
    { number: 4, label: 'المصروفات التقديرية', completed: currentStep > 4 },
  ];

  const renderInput = (
    field: keyof CalculatorData,
    label: string,
    placeholder: string = 'أدخل القيمة'
  ) => (
    <div>
      <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={data[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white border ${
          errors[field] ? 'border-red-500' : 'border-border'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground`}
        style={{ fontSize: 'var(--text-base)' }}
        dir="rtl"
      />
      {errors[field] && (
        <p className="mt-1 text-red-500" style={{ fontSize: 'var(--text-xs)' }}>
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Mobile Progress - Horizontal at top */}
      <div className="lg:hidden mb-8">
        <div className="flex flex-row-reverse items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center" style={{ flex: index > 0 ? '1' : '0' }}>
              {step.number > 1 && (
                <div className={`h-1 mx-2 flex-1 ${
                  currentStep >= step.number ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                step.completed ? 'bg-primary text-white' : 
                currentStep === step.number ? 'bg-primary text-white' : 
                'border-2 border-muted text-muted-foreground'
              }`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {step.completed ? <Check className="w-5 h-5" /> : step.number}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
            الخطوة {currentStep} من 4
          </p>
        </div>
      </div>

      {/* Desktop Layout with Vertical Progress Sidebar */}
      <div className="flex gap-6">
        {/* Vertical Progress Sidebar - Right Side (RTL) */}
        <aside className="hidden lg:block w-[200px] shrink-0" aria-label="تقدم الخطوات">
          <div className="sticky top-8">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <button
                    onClick={() => handleStepClick(step.number)}
                    disabled={step.number > currentStep}
                    className={`w-full text-right flex items-center gap-3 transition-colors ${
                      step.number < currentStep ? 'cursor-pointer hover:opacity-80' : 
                      step.number === currentStep ? '' : 
                      'cursor-not-allowed opacity-50'
                    }`}
                    aria-current={currentStep === step.number ? 'step' : undefined}
                    aria-label={`الخطوة ${step.number}: ${step.label}${step.completed ? ' - مكتملة' : ''}${currentStep === step.number ? ' - الخطوة الحالية' : ''}`}
                  >
                    {/* Step Circle */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${
                      step.completed ? 'bg-primary text-white' : 
                      currentStep === step.number ? 'bg-primary text-white' : 
                      'border-2 border-muted text-muted-foreground bg-white'
                    }`} style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                      {step.completed ? <Check className="w-6 h-6" /> : step.number}
                    </div>

                    {/* Step Label */}
                    <div className="text-right flex-1">
                      <p className={`${
                        currentStep === step.number ? 'text-foreground' : 'text-muted-foreground'
                      }`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, lineHeight: 1.4 }}>
                        {step.label}
                      </p>
                    </div>
                  </button>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`absolute right-[23px] top-[48px] w-[2px] h-[24px] ${
                        step.completed || currentStep > step.number ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Form Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border border-border p-8">
            {/* Step 1: المصروفات */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  المصروفات
                </h2>
                <div className="space-y-6">
                  {renderInput('generalExpenses', 'المصاريف العمومية والإدارية')}
                  {renderInput('programExpenses', 'مصاريف البرامج والأنشطة')}
                  {renderInput('adminOnActivity', 'المصاريف العمومية والإدارية المحملة على النشاط')}
                  {renderInput('sustainabilityExpenses', 'مصاريف الاستدامة المالية')}
                  {renderInput('fundraisingExpenses', 'مصاريف جمع الأموال')}
                </div>
              </div>
            )}

            {/* Step 2: الإيرادات */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  الإيرادات
                </h2>
                <div className="space-y-6">
                  {renderInput('sustainabilityRevenue', 'عوائد الاستدامة')}
                  {renderInput('sustainabilityAssets', 'أصول الاستدامة')}
                  {renderInput('donationRevenue', 'عوائد جمع التبرعات')}
                </div>
              </div>
            )}

            {/* Step 3: النقدية */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  النقدية
                </h2>
                <div className="space-y-6">
                  {renderInput('cashInBanks', 'النقدية في البنوك والصناديق')}
                  {renderInput('currentInvestments', 'الاستثمارات المتداولة')}
                  {renderInput('currentLiabilities', 'الالتزامات المتداولة')}
                  {renderInput('restrictedNetAssets', 'صافي الأصول المقيدة ونقدية الأوقاف')}
                </div>
              </div>
            )}

            {/* Step 4: المصروفات التقديرية */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                  المصروفات التقديرية
                </h2>
                <div className="space-y-6">
                  {renderInput('estimatedAdminExpenses', 'المصاريف الإدارية التقديرية')}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                    style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                    السابق
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="px-6 py-3 bg-white border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                  style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
                >
                  إلغاء
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
                  >
                    التالي
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleCalculate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}
                  >
                    احسب
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
