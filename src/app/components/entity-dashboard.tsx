import { useState } from 'react';
import { EntityHeader } from '@/app/components/entity-header';
import { OrganizationBanner } from '@/app/components/organization-banner';
import { EntityKnowledgeBase } from '@/app/components/entity-knowledge-base';
import { EntityContentDetail } from '@/app/components/entity-content-detail';
import { CalculatorModule } from '@/app/components/calculator-module';

export function EntityDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'calculator'>('list');
  const [activeNav, setActiveNav] = useState<'assessment-forms' | 'knowledge-base' | 'calculator'>('knowledge-base');

  const handleViewContent = () => {
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleNavigateToCalculator = () => {
    setCurrentView('calculator');
    setActiveNav('calculator');
  };

  const handleNavigateToKnowledgeBase = () => {
    setCurrentView('list');
    setActiveNav('knowledge-base');
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <EntityHeader 
        activeNav={activeNav} 
        onNavigateToCalculator={handleNavigateToCalculator}
        onNavigateToKnowledgeBase={handleNavigateToKnowledgeBase}
      />
      <OrganizationBanner />
      
      {currentView === 'list' ? (
        <EntityKnowledgeBase onViewContent={handleViewContent} />
      ) : currentView === 'calculator' ? (
        <CalculatorModule />
      ) : (
        <EntityContentDetail onCancel={handleBackToList} />
      )}
    </div>
  );
}
