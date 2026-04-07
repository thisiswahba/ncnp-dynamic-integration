import { useState } from 'react';
import { toast } from 'sonner';
import { CalculatorLanding } from '@/app/components/calculator-landing';
import { CalculatorWizard } from '@/app/components/calculator-wizard';
import { CalculatorResults } from '@/app/components/calculator-results';
import { CalculatorHistory } from '@/app/components/calculator-history';
import { CalculatorDisclaimer } from '@/app/components/calculator-disclaimer';
import { calculateFinancialIndicators, type CalculatorInputs, type CalculationResults } from '@/app/utils/calculator-engine';

interface CalculatorData {
  generalExpenses: string;
  programExpenses: string;
  adminOnActivity: string;
  sustainabilityExpenses: string;
  fundraisingExpenses: string;
  sustainabilityRevenue: string;
  sustainabilityAssets: string;
  donationRevenue: string;
  cashInBanks: string;
  currentInvestments: string;
  currentLiabilities: string;
  restrictedNetAssets: string;
  estimatedAdminExpenses: string;
}

type ViewState = 'landing' | 'disclaimer' | 'wizard' | 'results' | 'history';

export function CalculatorModule() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const [savedInputData, setSavedInputData] = useState<CalculatorData | null>(null);

  const handleStartCalculation = () => {
    // Show disclaimer before starting
    setCurrentView('disclaimer');
  };

  const handleAcceptDisclaimer = () => {
    setCurrentView('wizard');
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleCompleteCalculation = (data: CalculatorData) => {
    // Save input data for potential editing
    setSavedInputData(data);

    // Convert string inputs to numbers
    const inputs: CalculatorInputs = {
      generalExpenses: parseFloat(data.generalExpenses) || 0,
      programExpenses: parseFloat(data.programExpenses) || 0,
      adminOnActivity: parseFloat(data.adminOnActivity) || 0,
      sustainabilityExpenses: parseFloat(data.sustainabilityExpenses) || 0,
      fundraisingExpenses: parseFloat(data.fundraisingExpenses) || 0,
      sustainabilityRevenue: parseFloat(data.sustainabilityRevenue) || 0,
      sustainabilityAssets: parseFloat(data.sustainabilityAssets) || 0,
      donationRevenue: parseFloat(data.donationRevenue) || 0,
      cashInBanks: parseFloat(data.cashInBanks) || 0,
      currentInvestments: parseFloat(data.currentInvestments) || 0,
      currentLiabilities: parseFloat(data.currentLiabilities) || 0,
      restrictedNetAssets: parseFloat(data.restrictedNetAssets) || 0,
      estimatedAdminExpenses: parseFloat(data.estimatedAdminExpenses) || 0,
    };

    // Calculate results using the engine
    const results = calculateFinancialIndicators(inputs);
    setCalculationResults(results);
    setCurrentView('results');
  };

  const handleEditInputs = () => {
    setCurrentView('wizard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleCancelWizard = () => {
    setCurrentView('landing');
  };

  const handleViewHistoryResult = (id: string) => {
    // Load the saved result from history
    const history = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
    const entry = history.find((item: any) => item.id === id);
    
    if (entry && entry.results) {
      setCalculationResults(entry.results);
      setSavedInputData(entry.data);
      setCurrentView('results');
    } else {
      toast.error('لم يتم العثور على النتيجة المحفوظة');
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-background">
      {currentView === 'landing' && (
        <CalculatorLanding 
          onStartCalculation={handleStartCalculation}
        />
      )}

      {currentView === 'disclaimer' && (
        <CalculatorDisclaimer 
          onAccept={handleAcceptDisclaimer}
        />
      )}

      {currentView === 'wizard' && (
        <CalculatorWizard 
          onComplete={handleCompleteCalculation}
          onCancel={handleCancelWizard}
        />
      )}

      {currentView === 'results' && calculationResults && (
        <CalculatorResults 
          score={calculationResults.finalScore}
          mainIndicators={calculationResults.mainIndicators}
          analyticalIndicators={calculationResults.allAnalyticalIndicators}
          onEdit={handleEditInputs}
          onSave={() => {}}
          onExportPDF={() => {}}
        />
      )}

      {currentView === 'history' && (
        <CalculatorHistory 
          onBack={handleBackToLanding}
          onViewResult={handleViewHistoryResult}
        />
      )}
    </div>
  );
}