import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Header } from '@/app/components/simple-header';
import { NavDrawer } from '@/app/components/nav-drawer';
import { PageHeader } from '@/app/components/simple-page-header';
import { Tabs } from '@/app/components/simple-tabs';
import { SearchAndFilters, FilterState } from '@/app/components/simple-search-and-filters';
import { DataTable } from '@/app/components/simple-data-table';
import { Pagination } from '@/app/components/simple-pagination';
import { FormBuilder } from '@/app/components/form-builder-readonly-structure';
import { GuideContentEditor } from '@/app/components/guide-content-editor';
import { LoadingScreen } from '@/app/components/loading-screen';
import { ContentPreviewPage } from '@/app/components/content-preview-page';
import { GuideMetadata } from '@/app/components/guide-metadata-modal';
import { EntityDashboard } from '@/app/components/entity-dashboard';
import { AdminFAQListing } from '@/app/components/admin-faq-listing';
import { AdminFAQForm } from '@/app/components/admin-faq-form';
import { QuestionLinkingIntegration } from '@/app/components/question-linking-integration';
import { ArchivedContentListing } from '@/app/components/archived-content-listing';
import { AssessmentFormPage } from '@/app/components/assessment-form-page';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/contexts/language-context';

export function KnowledgeBaseApp() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  // Route between 'admin' and 'entity' personas
  const [persona, setPersona] = useState<'admin' | 'entity'>('admin');
  
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const [currentView, setCurrentView] = useState<'list' | 'assessment' | 'guide' | 'preview' | 'faq-list' | 'faq-form' | 'question-linking' | 'assessment-form'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guideMetadata, setGuideMetadata] = useState<GuideMetadata | undefined>(undefined);
  const [editingFAQId, setEditingFAQId] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<FilterState | undefined>(undefined);
  const totalPages = 10;

  const handleNavigateToFormBuilder = (contentType: 'assessment' | 'guide', metadata?: GuideMetadata) => {
    setIsLoading(true);
    
    if (contentType === 'guide' && metadata) {
      setGuideMetadata(metadata);
    }
    
    // Simulate loading time
    setTimeout(() => {
      setCurrentView(contentType);
      setIsLoading(false);
    }, 800);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setGuideMetadata(undefined);
  };

  const handlePreview = () => {
    setCurrentView('preview');
  };

  const handleSave = () => {
    toast.success(t('content_added_successfully'));
    setCurrentView('list');
  };

  // Entity Dashboard (End User View)
  if (persona === 'entity') {
    return (
      <>
        <EntityDashboard />
        
        {/* Persona Switcher - For Demo Purposes */}
        <button
          onClick={() => setPersona('admin')}
          className="fixed bottom-8 left-8 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors z-50"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {t('switch_to_admin_view')}
        </button>
        
        <Toaster 
          dir={isRTL ? 'rtl' : 'ltr'}
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: 'IBM Plex Sans Arabic, sans-serif',
              fontSize: 'var(--text-sm)',
              direction: isRTL ? 'rtl' : 'ltr',
            },
            className: 'toast-rtl',
          }}
        />
      </>
    );
  }

  // Admin Dashboard (Content Manager View)
  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header isSideNavOpen={isSideNavOpen} />
      <NavDrawer 
        isOpen={isSideNavOpen} 
        onNavigateToFAQ={() => setCurrentView('faq-list')}
        onNavigateToQuestionLinking={() => setCurrentView('question-linking')}
        onNavigateToAssessmentForm={() => setCurrentView('assessment-form')}
      />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSideNavOpen ? (isRTL ? 'mr-64' : 'ml-64') : (isRTL ? 'mr-0' : 'ml-0')}`}>
        {/* Menu Toggle Button */}
        <div className="px-8 py-4 border-b border-border bg-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin/data-sources')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {isRTL ? 'مصادر البيانات (Data Sources)' : 'Data Sources'}
            </button>
            <button
              onClick={() => setIsSideNavOpen(!isSideNavOpen)}
              className="p-2 hover:bg-muted rounded transition-colors"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingScreen />
        ) : currentView === 'list' ? (
          <div className="px-8 py-6 space-y-6">
            <PageHeader onNavigateToFormBuilder={handleNavigateToFormBuilder} />
            
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'active' ? (
              <>
                <SearchAndFilters onFilterChange={setFilters} />
                
                <div className="bg-white rounded-lg border border-border">
                  <DataTable onPreview={handlePreview} filters={filters} />
                </div>
                
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            ) : (
              <ArchivedContentListing onViewContent={handlePreview} />
            )}
          </div>
        ) : currentView === 'preview' ? (
          <ContentPreviewPage onCancel={handleBackToList} />
        ) : currentView === 'assessment' ? (
          <div className="px-8 py-6">
            <FormBuilder onCancel={handleBackToList} onPreview={handlePreview} onSave={handleSave} />
          </div>
        ) : currentView === 'faq-list' ? (
          <AdminFAQListing 
            onAddFAQ={() => {
              setEditingFAQId(undefined);
              setCurrentView('faq-form');
            }}
            onEditFAQ={(faqId) => {
              setEditingFAQId(faqId);
              setCurrentView('faq-form');
            }}
          />
        ) : currentView === 'faq-form' ? (
          <AdminFAQForm 
            onCancel={() => {
              setEditingFAQId(undefined);
              setCurrentView('faq-list');
            }} 
            onSave={() => {
              toast.success('تم حفظ السؤال بنجاح');
              setEditingFAQId(undefined);
              setCurrentView('faq-list');
            }} 
            faqId={editingFAQId} 
          />
        ) : currentView === 'question-linking' ? (
          <QuestionLinkingIntegration />
        ) : currentView === 'assessment-form' ? (
          <AssessmentFormPage onBack={handleBackToList} onSave={handleSave} />
        ) : (
          <GuideContentEditor onCancel={handleBackToList} onSave={handleSave} metadata={guideMetadata} />
        )}
      </main>
      
      {/* Persona Switcher - For Demo Purposes */}
      <button
        onClick={() => setPersona('entity')}
        className="fixed bottom-8 left-8 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors z-50"
        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
      >
        {t('switch_to_entity_view')}
      </button>
      
      <Toaster 
        dir={isRTL ? 'rtl' : 'ltr'}
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'IBM Plex Sans Arabic, sans-serif',
            fontSize: 'var(--text-sm)',
            direction: isRTL ? 'rtl' : 'ltr',
          },
          className: 'toast-rtl',
        }}
      />
    </div>
  );
}