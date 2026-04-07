export interface CalculatorInputs {
  generalExpenses: number;
  programExpenses: number;
  adminOnActivity: number;
  sustainabilityExpenses: number;
  fundraisingExpenses: number;
  sustainabilityRevenue: number;
  sustainabilityAssets: number;
  donationRevenue: number;
  cashInBanks: number;
  currentInvestments: number;
  currentLiabilities: number;
  restrictedNetAssets: number;
  estimatedAdminExpenses: number;
}

export interface AnalyticalIndicator {
  id: string;
  name: string;
  target: number;
  actual: number;
  weight: number;
  score: number;
  status: 'success' | 'warning' | 'risk';
}

export interface MainIndicator {
  id: string;
  name: string;
  weight: number;
  score: number;
  status: 'success' | 'warning' | 'risk';
  analyticalIndicators: AnalyticalIndicator[];
}

export interface CalculationResults {
  finalScore: number;
  mainIndicators: MainIndicator[];
  allAnalyticalIndicators: AnalyticalIndicator[];
}

// Scoring function based on target ranges
function calculateScore(actual: number, target: number, inverted: boolean = false): number {
  const ratio = actual / target;
  
  if (inverted) {
    // Lower is better (e.g., expenses)
    if (ratio <= 1) return 100;
    if (ratio <= 1.1) return 80;
    if (ratio <= 1.2) return 60;
    if (ratio <= 1.3) return 40;
    return 20;
  } else {
    // Higher is better (e.g., revenues)
    if (ratio >= 1) return 100;
    if (ratio >= 0.9) return 80;
    if (ratio >= 0.8) return 60;
    if (ratio >= 0.7) return 40;
    return 20;
  }
}

// Status determination
function getStatus(score: number): 'success' | 'warning' | 'risk' {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'risk';
}

export function calculateFinancialIndicators(inputs: CalculatorInputs): CalculationResults {
  // Calculate total expenses
  const totalExpenses = 
    inputs.generalExpenses + 
    inputs.programExpenses + 
    inputs.sustainabilityExpenses + 
    inputs.fundraisingExpenses;

  // INDICATOR 1: المصاريف الإدارية (20%)
  // 1.1 Ratio Admin / Total Expenses (80%)
  const ind1_1_actual = totalExpenses > 0 ? (inputs.generalExpenses / totalExpenses) * 100 : 0;
  const ind1_1_target = 15; // Target: 15%
  const ind1_1_score = calculateScore(ind1_1_actual, ind1_1_target, true);
  
  // 1.2 Sustainability Revenues / Admin (20%)
  const ind1_2_actual = inputs.generalExpenses > 0 ? (inputs.sustainabilityRevenue / inputs.generalExpenses) * 100 : 0;
  const ind1_2_target = 25; // Target: 25%
  const ind1_2_score = calculateScore(ind1_2_actual, ind1_2_target, false);

  const indicator1Score = (ind1_1_score * 0.8 + ind1_2_score * 0.2);

  // INDICATOR 2: البرامج والأنشطة (45%)
  // 2.1 Program / Total Expenses (60%)
  const ind2_1_actual = totalExpenses > 0 ? (inputs.programExpenses / totalExpenses) * 100 : 0;
  const ind2_1_target = 65; // Target: 65%
  const ind2_1_score = calculateScore(ind2_1_actual, ind2_1_target, false);
  
  // 2.2 Admin on Activity / Activity (40%)
  const ind2_2_actual = inputs.programExpenses > 0 ? (inputs.adminOnActivity / inputs.programExpenses) * 100 : 0;
  const ind2_2_target = 20; // Target: 20%
  const ind2_2_score = calculateScore(ind2_2_actual, ind2_2_target, true);

  const indicator2Score = (ind2_1_score * 0.6 + ind2_2_score * 0.4);

  // INDICATOR 3: الاستدامة المالية (10%)
  // 3.1 Sustainability Expenses / Total (30%)
  const ind3_1_actual = totalExpenses > 0 ? (inputs.sustainabilityExpenses / totalExpenses) * 100 : 0;
  const ind3_1_target = 5; // Target: 5%
  const ind3_1_score = calculateScore(ind3_1_actual, ind3_1_target, false);
  
  // 3.2 Sustainability Expenses / Revenues (30%)
  const ind3_2_actual = inputs.sustainabilityRevenue > 0 ? (inputs.sustainabilityExpenses / inputs.sustainabilityRevenue) * 100 : 0;
  const ind3_2_target = 30; // Target: 30%
  const ind3_2_score = calculateScore(ind3_2_actual, ind3_2_target, true);
  
  // 3.3 Revenues / Assets (40%)
  const ind3_3_actual = inputs.sustainabilityAssets > 0 ? (inputs.sustainabilityRevenue / inputs.sustainabilityAssets) * 100 : 0;
  const ind3_3_target = 8; // Target: 8%
  const ind3_3_score = calculateScore(ind3_3_actual, ind3_3_target, false);

  const indicator3Score = (ind3_1_score * 0.3 + ind3_2_score * 0.3 + ind3_3_score * 0.4);

  // INDICATOR 4: جمع الأموال (10%)
  // 4.1 Fundraising / Total (50%)
  const ind4_1_actual = totalExpenses > 0 ? (inputs.fundraisingExpenses / totalExpenses) * 100 : 0;
  const ind4_1_target = 10; // Target: 10%
  const ind4_1_score = calculateScore(ind4_1_actual, ind4_1_target, true);
  
  // 4.2 Fundraising / Donations (50%)
  const ind4_2_actual = inputs.donationRevenue > 0 ? (inputs.fundraisingExpenses / inputs.donationRevenue) * 100 : 0;
  const ind4_2_target = 15; // Target: 15%
  const ind4_2_score = calculateScore(ind4_2_actual, ind4_2_target, true);

  const indicator4Score = (ind4_1_score * 0.5 + ind4_2_score * 0.5);

  // INDICATOR 5: تغطية الالتزامات (15%)
  // 5.1 Cash / (Restricted + Endowment + Liabilities) (70%)
  const denominator5_1 = inputs.restrictedNetAssets + inputs.currentLiabilities;
  const ind5_1_actual = denominator5_1 > 0 ? (inputs.cashInBanks / denominator5_1) * 100 : 0;
  const ind5_1_target = 100; // Target: 100%
  const ind5_1_score = calculateScore(ind5_1_actual, ind5_1_target, false);
  
  // 5.2 Net Cash + Investments / Estimated Admin (30%)
  const netCash = inputs.cashInBanks + inputs.currentInvestments;
  const ind5_2_actual = inputs.estimatedAdminExpenses > 0 ? (netCash / inputs.estimatedAdminExpenses) : 0;
  const ind5_2_target = 3; // Target: 3 months coverage
  const ind5_2_score = calculateScore(ind5_2_actual, ind5_2_target, false);

  const indicator5Score = (ind5_1_score * 0.7 + ind5_2_score * 0.3);

  // Create analytical indicators
  const analyticalIndicators: AnalyticalIndicator[] = [
    {
      id: '1.1',
      name: 'نسبة المصاريف الإدارية إلى إجمالي المصاريف',
      target: ind1_1_target,
      actual: ind1_1_actual,
      weight: 16, // 20% * 80%
      score: ind1_1_score,
      status: getStatus(ind1_1_score)
    },
    {
      id: '1.2',
      name: 'نسبة عوائد الاستدامة إلى المصاريف الإدارية',
      target: ind1_2_target,
      actual: ind1_2_actual,
      weight: 4, // 20% * 20%
      score: ind1_2_score,
      status: getStatus(ind1_2_score)
    },
    {
      id: '2.1',
      name: 'نسبة مصاريف البرامج إلى إجمالي المصاريف',
      target: ind2_1_target,
      actual: ind2_1_actual,
      weight: 27, // 45% * 60%
      score: ind2_1_score,
      status: getStatus(ind2_1_score)
    },
    {
      id: '2.2',
      name: 'نسبة المصاريف الإدارية المحملة على البرامج',
      target: ind2_2_target,
      actual: ind2_2_actual,
      weight: 18, // 45% * 40%
      score: ind2_2_score,
      status: getStatus(ind2_2_score)
    },
    {
      id: '3.1',
      name: 'نسبة مصاريف الاستدامة إلى إجمالي المصاريف',
      target: ind3_1_target,
      actual: ind3_1_actual,
      weight: 3, // 10% * 30%
      score: ind3_1_score,
      status: getStatus(ind3_1_score)
    },
    {
      id: '3.2',
      name: 'نسبة مصاريف الاستدامة إلى عوائدها',
      target: ind3_2_target,
      actual: ind3_2_actual,
      weight: 3, // 10% * 30%
      score: ind3_2_score,
      status: getStatus(ind3_2_score)
    },
    {
      id: '3.3',
      name: 'نسبة عوائد الاستدامة إلى أصولها',
      target: ind3_3_target,
      actual: ind3_3_actual,
      weight: 4, // 10% * 40%
      score: ind3_3_score,
      status: getStatus(ind3_3_score)
    },
    {
      id: '4.1',
      name: 'نسبة مصاريف جمع الأموال إلى إجمالي المصاريف',
      target: ind4_1_target,
      actual: ind4_1_actual,
      weight: 5, // 10% * 50%
      score: ind4_1_score,
      status: getStatus(ind4_1_score)
    },
    {
      id: '4.2',
      name: 'نسبة مصاريف جمع الأموال إلى عوائد التبرعات',
      target: ind4_2_target,
      actual: ind4_2_actual,
      weight: 5, // 10% * 50%
      score: ind4_2_score,
      status: getStatus(ind4_2_score)
    },
    {
      id: '5.1',
      name: 'نسبة النقدية إلى الالتزامات والأصول المقيدة',
      target: ind5_1_target,
      actual: ind5_1_actual,
      weight: 10.5, // 15% * 70%
      score: ind5_1_score,
      status: getStatus(ind5_1_score)
    },
    {
      id: '5.2',
      name: 'نسبة تغطية المصاريف الإدارية التقديرية',
      target: ind5_2_target,
      actual: ind5_2_actual,
      weight: 4.5, // 15% * 30%
      score: ind5_2_score,
      status: getStatus(ind5_2_score)
    },
  ];

  // Create main indicators
  const mainIndicators: MainIndicator[] = [
    {
      id: '1',
      name: 'المصاريف الإدارية',
      weight: 20,
      score: indicator1Score,
      status: getStatus(indicator1Score),
      analyticalIndicators: analyticalIndicators.filter(a => a.id.startsWith('1.'))
    },
    {
      id: '2',
      name: 'مصاريف البرامج والأنشطة',
      weight: 45,
      score: indicator2Score,
      status: getStatus(indicator2Score),
      analyticalIndicators: analyticalIndicators.filter(a => a.id.startsWith('2.'))
    },
    {
      id: '3',
      name: 'الاستدامة المالية (الموارد واستخدامات)',
      weight: 10,
      score: indicator3Score,
      status: getStatus(indicator3Score),
      analyticalIndicators: analyticalIndicators.filter(a => a.id.startsWith('3.'))
    },
    {
      id: '4',
      name: 'جمع الأموال والتبرعات',
      weight: 10,
      score: indicator4Score,
      status: getStatus(indicator4Score),
      analyticalIndicators: analyticalIndicators.filter(a => a.id.startsWith('4.'))
    },
    {
      id: '5',
      name: 'قدرة الجمعية على تغطية التزاماتها القصيرة الأمد',
      weight: 15,
      score: indicator5Score,
      status: getStatus(indicator5Score),
      analyticalIndicators: analyticalIndicators.filter(a => a.id.startsWith('5.'))
    },
  ];

  // Calculate final weighted score
  const finalScore = Math.round(
    indicator1Score * 0.20 +
    indicator2Score * 0.45 +
    indicator3Score * 0.10 +
    indicator4Score * 0.10 +
    indicator5Score * 0.15
  );

  return {
    finalScore,
    mainIndicators,
    allAnalyticalIndicators: analyticalIndicators
  };
}