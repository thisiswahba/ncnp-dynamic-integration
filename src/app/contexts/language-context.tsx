import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Module = 'admin' | 'entity';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  module: Module;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Module, Record<Language, Record<string, string>>> = {
  admin: {
    ar: {
      // Header & Navigation
      'app.title': 'إدارة المحتوى',
      'nav.contentManagement': 'إدارة المحتوى',
      'nav.faq': 'الأسئلة الشائعة',
      'nav.dataSources': 'مصادر البيانات',
      'nav.queries': 'الاستعلامات',
      'nav.analytics': 'التحليلات',
      'nav.settings': 'الإعدادات',
      'nav.documentation': 'التوثيق',
      'nav.support': 'الدعم',
      
      // Content Management List
      'content.title': 'إدارة المحتوى',
      'content.subtitle': 'إدارة المحتوى المتاح للجهات',
      'content.addContent': 'إضافة محتوى',
      'content.tabs.active': 'المحتوى النشط',
      'content.tabs.archived': 'المحتوى المؤرشف',
      'content.search.placeholder': 'ابحث عن محتوى',
      'content.filter.contentType': 'نوع المحتوى',
      'content.filter.entityType': 'نوع الجهة',
      'content.filter.branch': 'الفرع',
      'content.filter.status': 'حالة النشر',
      'content.filter.dateRange': 'نطاق التاريخ',
      'content.filter.all': 'الكل',
      'content.filter.guide': 'دليل',
      'content.filter.assessment': 'تقييم',
      'content.filter.published': 'منشور',
      'content.filter.draft': 'مسودة',
      'content.filter.apply': 'تطبيق',
      'content.filter.reset': 'إعادة تعيين',
      
      // Table Headers
      'table.contentName': 'اسم المحتوى',
      'table.contentType': 'نوع المحتوى',
      'table.branch': 'الفرع',
      'table.targetEntity': 'الجهة المستهدفة',
      'table.publishStatus': 'حالة النشر',
      'table.lastUpdate': 'آخر تحديث',
      'table.actions': 'الإجراءات',
      'table.view': 'عرض',
      'table.edit': 'تعديل',
      'table.delete': 'حذف',
      
      // FAQ Management
      'faq.title': 'إدارة الأسئلة الشائعة',
      'faq.subtitle': 'إدارة الأسئلة الشائعة للجهات',
      'faq.addFAQ': 'إضافة سؤال',
      'faq.tabs.all': 'الكل',
      'faq.tabs.published': 'منشور',
      'faq.tabs.notPublished': 'غير منشور',
      'faq.question': 'السؤال',
      'faq.answer': 'الإجابة',
      'faq.category': 'التصنيف',
      'faq.tags': 'الوسوم',
      'faq.enablePublishing': 'تفعيل النشر',
      'faq.disablePublishing': 'إيقاف النشر',
      'faq.save': 'حفظ',
      'faq.cancel': 'إلغاء',
      
      // Common
      'common.back': 'رجوع',
      'common.save': 'حفظ',
      'common.cancel': 'إلغاء',
      'common.delete': 'حذف',
      'common.edit': 'تعديل',
      'common.view': 'عرض',
      'common.search': 'بحث',
      'common.filter': 'فلترة',
      'common.export': 'تصدير',
      'common.import': 'استيراد',
      'common.loading': 'جاري التحميل...',
      'common.noData': 'لا توجد بيانات',
      'common.success': 'نجح',
      'common.error': 'خطأ',
      'common.switchToEntity': 'التبديل إلى واجهة المستخدم',
      'common.switchToAdmin': 'التبديل إلى واجهة المسؤول',
      'content_added_successfully': 'تمت إضافة المحتوى بنجاح',
      'switch_to_admin_view': 'التبديل إلى واجهة المسؤول',
      'switch_to_entity_view': 'التبديل إلى واجهة الجة',
      
      // Pagination
      'pagination.showing': 'عرض',
      'pagination.to': 'إلى',
      'pagination.of': 'من',
      'pagination.results': 'نتيجة',
      'pagination.previous': 'السابق',
      'pagination.next': 'التالي',
      
      // Data Sources
      'dataSources.title': 'مصادر البيانات',
      'dataSources.subtitle': '',
      'dataSources.headerSubtitle': 'إدارة وتكوين مصادر البيانات الخارجية',
      'dataSources.search': 'البحث عن مصدر بيانات...',
      'dataSources.add': 'إضافة مصدر بيانات جديد',
      'dataSources.systemName': 'اسم مصدر البيانات',
      'dataSources.businessDomain': 'مجال الأعمال',
      'dataSources.apiVersion': 'إصدار API',
      'dataSources.endpointsCount': 'عدد النقاط الطرفية',
      'dataSources.status': 'الحالة',
      'dataSources.actions': 'الإجراءات',
      'dataSources.active': 'نشط',
      'dataSources.inactive': 'غير نشط',
      'dataSources.manageEndpoints': 'إدارة النقاط الطرفية',
      'dataSources.viewDetails': 'عرض',
      'dataSources.edit': 'تعديل',
      'dataSources.deactivate': 'تعطيل',
      'dataSources.activate': 'تفعيل',
      'dataSources.pagination.showing': 'عرض',
      'dataSources.pagination.to': 'إلى',
      'dataSources.pagination.of': 'من',
      'dataSources.pagination.results': 'نتيجة',
      'dataSources.pagination.previous': 'السابق',
      'dataSources.pagination.next': 'التالي',
      'dataSources.empty.title': 'لا توجد بيانات',
      'dataSources.empty.description': '',
      'addDataSource.step1': 'تفاصيل مصدر البيانات',
      'addDataSource.step2': 'تكوين النقاط النهائية',
      'addDataSource.back': 'السابق',

      // Queries
      'queries.title': 'الاستعلامات',
      'queries.subtitle': 'إدارة وإنشاء الاستعلامات على مصادر البيانات',
      'queries.headerSubtitle': 'إدارة وإنشاء الاستعلامات على مصادر البيانات',
      'queries.search': 'البحث عن استعلام...',
      'queries.create': 'إنشاء استعلام',
      'queries.queryName': 'اسم الاستعلام',
      'queries.dataSource': 'مصدر البيانات',
      'queries.endpoint': 'النقطة الطرفية',
      'queries.method': 'الطريقة',
      'queries.status': 'الحالة',
      'queries.actions': 'الإجراءات',
      'queries.active': 'مفعّل',
      'queries.inactive': 'غير نشط',
      'queries.edit': 'تعديل',
      'queries.delete': 'حذف',
      'queries.test': 'اختبار',
      'queries.empty.title': 'لا توجد استعلامات',
      'queries.empty.description': 'ابدأ بإنشاء استعلام جديد للوصول إلى البيانات من مصادر البيانات',
      
      // Query Management
      'queries.listTitle': 'قائمة الاستعلامات',
      'queries.listSubtitle': '',
      'queries.createButton': 'إنشاء استعلام',
      'queries.searchPlaceholder': 'البحث برقم الاستعلام أو العنصر المرتبط',
      'queries.queryId': 'رقم الاستعلام',
      'queries.linkedItem': 'السؤال/المخاطر المرتبط',
      'queries.businessDomain': 'المجال التجاري',
      'queries.lastUpdated': 'آخر تحديث',
      'queries.draft': 'مسودة',
      'queries.disabled': 'معطّل',
      'queries.view': 'عرض',
      'queries.activate': 'تفعيل',
      'queries.deactivate': 'تعطيل',
      'queries.noQueries': 'لا توجد بيانات',
      'queries.noQueriesDescription': '',
      'queries.viewQueryDetails': 'عرض تفاصيل الاستعلام',
      'queries.editQueryDetails': 'تعديل تفاصيل الاستعلام',
      'queries.activateQuery': 'تفعيل الاستعلام',
      'queries.deactivateQuery': 'تعطيل الاستعلام',
      'queries.navigateToLinkedItem': 'الانتقال إلى العنصر المرتبط',
      
      // Query Details
      'queries.detailsTitle': 'تفاصيل الاستعلام',
      'queries.description': 'الوصف',
      'queries.createdAt': 'تاريخ الإنشاء',
      'queries.lastExecution': 'آخر تنفيذ',
      'queries.rulesSection': 'قواعد الاستعلام',
      'queries.field': 'الحقل',
      'queries.operator': 'المعامل',
      'queries.value': 'القيمة',
      'queries.editQuery': 'تعديل الاستعلام',
      'queries.runQuery': 'تشغيل الاستعلام',
      
      // Query Preview/Execution
      'queries.previewTitle': 'معاينة الاستعلام',
      'queries.previewSubtitle': 'تشغيل الاستعلام على البيانات الحالية لمراجعة النتائج',
      'queries.executeQuery': 'تشغيل الاستعلام',
      'queries.entity': 'الكيان',
      'queries.result': 'النتيجة',
      'queries.pass': 'نجاح',
      'queries.fail': 'فشل',
      'queries.noResults': 'لا توجد نتائج',
      'queries.noResultsMessage': 'لم يتم العثور على نتائج لهذا الاستعلام',
      
      // Query History
      'queries.historyTitle': 'سجل تنفيذ الاستعلامات',
      'queries.date': 'التاريخ',
      'queries.resultsCount': 'عدد النتائج',
      'queries.success': 'نجاح',
      'queries.viewResults': 'عرض النتائج',
      
      // Execution Results
      'queries.executionResultsTitle': 'تفاصيل نتائج التنفيذ',
      'queries.source': 'المصدر',
      'queries.filterBySource': 'تصفية حسب المصدر',
      'queries.allSources': 'جميع المصادر',
      
      // Query Form
      'queries.form.queryInfo': 'معلومات الاستعلام',
      'queries.form.queryName': 'اسم الاستعلام',
      'queries.form.queryNameLabel': 'اسم الاستعلام',
      'queries.form.queryNamePlaceholder': 'أدخل اسم الاستعلام',
      'queries.form.status': 'الحالة',
      'queries.form.statusLabel': 'الحالة',
      'queries.form.description': 'الوصف',
      'queries.form.descriptionLabel': 'الوصف',
      'queries.form.descriptionPlaceholder': 'أدخل وصف الاستعلام',
      'queries.form.queryRules': 'قواعد الاستعلام',
      'queries.form.rulesTitle': 'قواعد الاستعلام',
      'queries.form.rulesDescription': 'أضف شروط متعددة لتحديد منطق الاستعلام',
      'queries.form.addCondition': 'إضافة شرط',
      'queries.form.dataSourcePlaceholder': 'مصدر البيانات',
      'queries.form.fieldPlaceholder': 'الحقل',
      'queries.form.operatorPlaceholder': 'المعامل',
      'queries.form.valuePlaceholder': 'القيمة',
      'queries.form.cancel': 'إلغاء',
      'queries.form.saveQuery': 'حفظ الاستعلام',
      'queries.form.saveAndActivate': 'حفظ وتفعيل',
      'queries.form.saveActivate': 'حفظ وتفعيل',
      
      // Success Messages
      'queries.success.saved': 'تم حفظ الاستعلام بنجاح',
      'queries.success.activated': 'تم تفعيل الاستعلام',
      'queries.success.executed': 'تم تشغيل الاستعلام بنجاح',

      // Question Automation
      'questionAutomation.title': 'أتمتة الأسئلة',
      'questionAutomation.searchPlaceholder': 'البحث برقم السؤال أو النص',
      'questionAutomation.questionId': 'رقم السؤال',
      'questionAutomation.questionText': 'نص السؤال',
      'questionAutomation.answerType': 'نوع الإجابة',
      'questionAutomation.automationStatus': 'حالة الأتمتة',
      'questionAutomation.businessDomain': 'المجال التجاري',
      'questionAutomation.actions': 'الإجراءات',
      'questionAutomation.status.manual': 'يدوي',
      'questionAutomation.status.automated': 'مؤتمت',
      'questionAutomation.status.pending': 'قيد المعالجة',
      'questionAutomation.configureAutomation': 'تكوين الأتمتة',
      'questionAutomation.viewQuery': 'عرض الاستعلام',
      'questionAutomation.editQuery': 'تعديل الاستعلام',
      'questionAutomation.deactivate': 'تعطيل',
      'questionAutomation.noData': 'لا توجد بيانات',

      // Configure Automation
      'configureAutomation.title': 'تكوين الأتمتة',
      'configureAutomation.back': 'رجوع',
      'configureAutomation.questionDetails': 'تفاصيل السؤال',
      'configureAutomation.queryBuilder': 'منشئ الاستعلام',
      'configureAutomation.metadataElements': 'عناصر البيانات الوصفية',
      'configureAutomation.queryWorkspace': 'مساحة عمل الاستعلام',
      'configureAutomation.addCondition': 'إضافة شرط',
      'configureAutomation.selectElement': 'اختر العنصر',
      'configureAutomation.selectOperator': 'اختر المعامل',
      'configureAutomation.enterValue': 'أدخل القيمة',
      'configureAutomation.validateExecute': 'التحقق والتنفيذ',
      'configureAutomation.save': 'حفظ',
      'configureAutomation.cancel': 'إلغاء',
      'configureAutomation.status.unvalidated': 'غير محقق',
      'configureAutomation.status.valid': 'صالح',
      'configureAutomation.status.saved': 'محفوظ',
      'configureAutomation.noConditions': 'لا توجد شروط بعد. أضف شرطًا للبدء.',
    },
    en: {
      // Header & Navigation
      'app.title': 'Content Management',
      'nav.contentManagement': 'Content Management',
      'nav.faq': 'FAQs',
      'nav.dataSources': 'Data Sources',
      'nav.queries': 'Queries',
      'nav.analytics': 'Analytics',
      'nav.settings': 'Settings',
      'nav.documentation': 'Documentation',
      'nav.support': 'Support',
      
      // Content Management List
      'content.title': 'Content Management',
      'content.subtitle': 'Manage available content for entities',
      'content.addContent': 'Add Content',
      'content.tabs.active': 'Active Content',
      'content.tabs.archived': 'Archived Content',
      'content.search.placeholder': 'Search for content',
      'content.filter.contentType': 'Content Type',
      'content.filter.entityType': 'Entity Type',
      'content.filter.branch': 'Branch',
      'content.filter.status': 'Publish Status',
      'content.filter.dateRange': 'Date Range',
      'content.filter.all': 'All',
      'content.filter.guide': 'Guide',
      'content.filter.assessment': 'Assessment',
      'content.filter.published': 'Published',
      'content.filter.draft': 'Draft',
      'content.filter.apply': 'Apply',
      'content.filter.reset': 'Reset',
      
      // Table Headers
      'table.contentName': 'Content Name',
      'table.contentType': 'Content Type',
      'table.branch': 'Branch',
      'table.targetEntity': 'Target Entity',
      'table.publishStatus': 'Publish Status',
      'table.lastUpdate': 'Last Updated',
      'table.actions': 'Actions',
      'table.view': 'View',
      'table.edit': 'Edit',
      'table.delete': 'Delete',
      
      // FAQ Management
      'faq.title': 'FAQ Management',
      'faq.subtitle': 'Manage frequently asked questions for entities',
      'faq.addFAQ': 'Add Question',
      'faq.tabs.all': 'All',
      'faq.tabs.published': 'Published',
      'faq.tabs.notPublished': 'Not Published',
      'faq.question': 'Question',
      'faq.answer': 'Answer',
      'faq.category': 'Category',
      'faq.tags': 'Tags',
      'faq.enablePublishing': 'Enable Publishing',
      'faq.disablePublishing': 'Disable Publishing',
      'faq.save': 'Save',
      'faq.cancel': 'Cancel',
      
      // Common
      'common.back': 'Back',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.export': 'Export',
      'common.import': 'Import',
      'common.loading': 'Loading...',
      'common.noData': 'No Data',
      'common.success': 'Success',
      'common.error': 'Error',
      'common.switchToEntity': 'Switch to User View',
      'common.switchToAdmin': 'Switch to Admin View',
      'content_added_successfully': 'Content added successfully',
      'switch_to_admin_view': 'Switch to Admin View',
      'switch_to_entity_view': 'Switch to Entity View',
      
      // Pagination
      'pagination.showing': 'Showing',
      'pagination.to': 'to',
      'pagination.of': 'of',
      'pagination.results': 'results',
      'pagination.previous': 'Previous',
      'pagination.next': 'Next',
      
      // Data Sources
      'dataSources.title': 'List of Sources',
      'dataSources.subtitle': '',
      'dataSources.headerSubtitle': 'Manage and configure external data sources',
      'dataSources.search': 'Search for data source...',
      'dataSources.add': 'Add New Data Source',
      'dataSources.systemName': 'Data Source Name',
      'dataSources.businessDomain': 'Business Domain',
      'dataSources.apiVersion': 'API Version',
      'dataSources.endpointsCount': 'Endpoints Count',
      'dataSources.status': 'Status',
      'dataSources.actions': 'Actions',
      'dataSources.active': 'Active',
      'dataSources.inactive': 'Inactive',
      'dataSources.manageEndpoints': 'Manage Endpoints',
      'dataSources.viewDetails': 'View',
      'dataSources.edit': 'Edit',
      'dataSources.deactivate': 'Deactivate',
      'dataSources.activate': 'Activate',
      'dataSources.pagination.showing': 'Showing',
      'dataSources.pagination.to': 'to',
      'dataSources.pagination.of': 'of',
      'dataSources.pagination.results': 'results',
      'dataSources.pagination.previous': 'Previous',
      'dataSources.pagination.next': 'Next',
      'dataSources.empty.title': 'No Data',
      'dataSources.empty.description': '',
      'addDataSource.step1': 'Data Source Details',
      'addDataSource.step2': 'Configure Endpoints',
      'addDataSource.back': 'Back',

      // Queries
      'queries.title': 'Queries',
      'queries.subtitle': 'Manage and create queries on data sources',
      'queries.headerSubtitle': 'Manage and create queries on data sources',
      'queries.search': 'Search for a query...',
      'queries.create': 'Create Query',
      'queries.queryName': 'Query Name',
      'queries.dataSource': 'Data Source',
      'queries.endpoint': 'Endpoint',
      'queries.method': 'Method',
      'queries.status': 'Status',
      'queries.actions': 'Actions',
      'queries.active': 'Activated',
      'queries.inactive': 'Inactive',
      'queries.edit': 'Edit',
      'queries.delete': 'Delete',
      'queries.test': 'Test',
      'queries.empty.title': 'No Queries',
      'queries.empty.description': 'Start by creating a new query to access data from data sources',
      
      // Query Management
      'queries.listTitle': 'List of Queries',
      'queries.listSubtitle': '',
      'queries.createButton': 'Create Query',
      'queries.searchPlaceholder': 'Search by Query ID or Linked Item',
      'queries.linkedItem': 'Linked Question/Risk',
      'queries.queryId': 'Query ID',
      'queries.businessDomain': 'Business Domain',
      'queries.lastUpdated': 'Last Updated',
      'queries.draft': '',
      'queries.disabled': 'Deactivated',
      'queries.view': 'View',
      'queries.activate': 'Activate',
      'queries.deactivate': 'Deactivate',
      'queries.noQueries': 'No Data',
      'queries.noQueriesDescription': '',
      'queries.viewQueryDetails': 'View Query Details',
      'queries.editQueryDetails': 'Edit Query Details',
      'queries.activateQuery': 'Activate Query',
      'queries.deactivateQuery': 'Deactivate Query',
      'queries.navigateToLinkedItem': 'Navigate to Linked Item',
      
      // Query Details
      'queries.detailsTitle': 'Query Details',
      'queries.description': 'Description',
      'queries.createdAt': 'Created At',
      'queries.lastExecution': 'Last Execution',
      'queries.rulesSection': 'Query Rules',
      'queries.field': 'Field',
      'queries.operator': 'Operator',
      'queries.value': 'Value',
      'queries.editQuery': 'Edit Query',
      'queries.runQuery': 'Run Query',
      
      // Query Preview/Execution
      'queries.previewTitle': 'Query Preview',
      'queries.previewSubtitle': 'Run the query on current data to review results',
      'queries.executeQuery': 'Execute Query',
      'queries.entity': 'Entity',
      'queries.result': 'Result',
      'queries.pass': 'Pass',
      'queries.fail': 'Fail',
      'queries.noResults': 'No Results',
      'queries.noResultsMessage': 'No results were found for this query',
      
      // Query History
      'queries.historyTitle': 'Query Execution History',
      'queries.date': 'Date',
      'queries.resultsCount': 'Results Count',
      'queries.success': 'Success',
      'queries.viewResults': 'View Results',
      
      // Execution Results
      'queries.executionResultsTitle': 'Execution Results Details',
      'queries.source': 'Source',
      'queries.filterBySource': 'Filter by source',
      'queries.allSources': 'All Sources',
      
      // Query Form
      'queries.form.queryInfo': 'Query Information',
      'queries.form.queryNameLabel': 'Query Name',
      'queries.form.queryNamePlaceholder': 'Enter query name',
      'queries.form.statusLabel': 'Status',
      'queries.form.descriptionLabel': 'Description',
      'queries.form.descriptionPlaceholder': 'Enter query description',
      'queries.form.rulesTitle': 'Query Rules',
      'queries.form.rulesDescription': 'Add multiple conditions to define query logic',
      'queries.form.addCondition': 'Add Condition',
      'queries.form.dataSourcePlaceholder': 'Data Source',
      'queries.form.fieldPlaceholder': 'Field',
      'queries.form.operatorPlaceholder': 'Operator',
      'queries.form.valuePlaceholder': 'Value',
      'queries.form.cancel': 'Cancel',
      'queries.form.saveQuery': 'Save Query',
      'queries.form.saveAndActivate': 'Save & Activate',
      
      // Success Messages
      'queries.success.saved': 'Query saved successfully',
      'queries.success.activated': 'Query activated',
      'queries.success.executed': 'Query executed successfully',

      // Question Automation
      'questionAutomation.title': 'Question Automation',
      'questionAutomation.searchPlaceholder': 'Search by Question ID or Text',
      'questionAutomation.questionId': 'Question ID',
      'questionAutomation.questionText': 'Question Text',
      'questionAutomation.answerType': 'Answer Type',
      'questionAutomation.automationStatus': 'Automation Status',
      'questionAutomation.businessDomain': 'Business Domain',
      'questionAutomation.actions': 'Actions',
      'questionAutomation.status.manual': 'Manual',
      'questionAutomation.status.automated': 'Automated',
      'questionAutomation.status.pending': 'Pending',
      'questionAutomation.configureAutomation': 'Configure Automation',
      'questionAutomation.viewQuery': 'View Query',
      'questionAutomation.editQuery': 'Edit Query',
      'questionAutomation.deactivate': 'Deactivate',
      'questionAutomation.noData': 'No Data',

      // Configure Automation
      'configureAutomation.title': 'Configure Automation',
      'configureAutomation.back': 'Back',
      'configureAutomation.questionDetails': 'Question Details',
      'configureAutomation.queryBuilder': 'Query Builder',
      'configureAutomation.metadataElements': 'Metadata Elements',
      'configureAutomation.queryWorkspace': 'Query Workspace',
      'configureAutomation.addCondition': 'Add Condition',
      'configureAutomation.selectElement': 'Select Element',
      'configureAutomation.selectOperator': 'Select Operator',
      'configureAutomation.enterValue': 'Enter Value',
      'configureAutomation.validateExecute': 'Validate & Execute',
      'configureAutomation.save': 'Save',
      'configureAutomation.cancel': 'Cancel',
      'configureAutomation.status.unvalidated': 'Unvalidated',
      'configureAutomation.status.valid': 'Valid',
      'configureAutomation.status.saved': 'Saved',
      'configureAutomation.noConditions': 'No conditions yet. Add a condition to get started.',
    }
  },
  entity: {
    ar: {
      // Header
      'app.title': 'قاعدة المعرفة',
      'header.welcome': 'مرحباً بك',
      'header.entityName': 'جهة حكومية - الرياض',
      
      // Navigation
      'nav.knowledgeBase': 'قاعدة المعرفة',
      'nav.calculator': 'الحاسبة المالية',
      'nav.profile': 'الملف الشخصي',
      'nav.notifications': 'الإشعارات',
      'nav.settings': 'الإعدادات',
      
      // Knowledge Base
      'kb.title': 'قاعدة المعرفة',
      'kb.subtitle': 'استعرض المحتوى والموارد المتاحة',
      'kb.tabs.available': 'المحتوى المتاح',
      'kb.tabs.faq': 'الاسئلة الشائعة',
      'kb.tabs.favorites': 'المحتوى المفضل',
      'kb.subTabs.content': 'المحتوى',
      'kb.subTabs.faq': 'الأسئلة الشائعة',
      'kb.search.placeholder': 'ابحث في المحتوى',
      'kb.filter.contentType': 'نوع المحتوى',
      'kb.filter.all': 'الكل',
      'kb.filter.guide': 'دليل',
      'kb.filter.assessment': 'تقييم',
      'kb.noFavorites': 'لا يوجد محتوى مفضل',
      'kb.noFavoritesDesc': 'لم تقم بإضافة أي محتوى إلى المفضلة بعد. ابدأ بتصفح المحتوى المتاح وأضف ما يهمك.',
      'kb.browseContent': 'تصفح المحتوى المتاح',
      'kb.view': 'عرض',
      'kb.publishDate': 'تاريخ النشر',
      'kb.lastUpdate': 'آخر تحديث',
      'kb.markAsRead': 'تعليم كمقروء',
      'kb.markAsUnread': 'تعليم كغير مقروء',
      
      // FAQ
      'faq.title': 'الأسئلة الشائعة',
      'faq.subtitle': 'الأسئلة المتكررة والإجابات',
      'faq.search.placeholder': 'ابحث في الأسئلة',
      'faq.category': 'التصنيف',
      'faq.allCategories': 'جميع التصنيفات',
      'faq.noResults': 'لا توجد نتائج',
      'faq.noResultsDesc': 'لم نجد أي أسئلة تطابق بحثك. حاول استخدام كلمات مختلفة.',
      
      // Calculator
      'calc.title': 'الحاسبة المالية',
      'calc.description': 'احسب المؤشرات المالية الرئيسية بناءً على بيانات منظمتك',
      'calc.startCalculation': 'بدء الحساب',
      'calc.features.accurate': 'حسابات دقيقة',
      'calc.features.accurateDesc': 'نتائج مبنية على معايير محاسبية معتمدة',
      'calc.features.fast': 'سهل وسريع',
      'calc.features.fastDesc': 'احصل على نتائج فورية في دقائق',
      
      // Common
      'common.back': 'رجوع',
      'common.save': 'حفظ',
      'common.cancel': 'إلغاء',
      'common.view': 'عرض',
      'common.search': 'بحث',
      'common.filter': 'فلترة',
      'common.loading': 'جاري التحميل...',
      'common.noData': 'لا توجد بيانات',
      'common.switchToAdmin': 'التبديل إلى واجهة المسؤول',
    },
    en: {
      // Header
      'app.title': 'Knowledge Base',
      'header.welcome': 'Welcome',
      'header.entityName': 'Government Entity - Riyadh',
      
      // Navigation
      'nav.knowledgeBase': 'Knowledge Base',
      'nav.calculator': 'Financial Calculator',
      'nav.profile': 'Profile',
      'nav.notifications': 'Notifications',
      'nav.settings': 'Settings',
      
      // Knowledge Base
      'kb.title': 'Knowledge Base',
      'kb.subtitle': 'Browse available content and resources',
      'kb.tabs.available': 'Available Content',
      'kb.tabs.faq': 'FAQs',
      'kb.tabs.favorites': 'Favorites',
      'kb.subTabs.content': 'Content',
      'kb.subTabs.faq': 'FAQs',
      'kb.search.placeholder': 'Search content',
      'kb.filter.contentType': 'Content Type',
      'kb.filter.all': 'All',
      'kb.filter.guide': 'Guide',
      'kb.filter.assessment': 'Assessment',
      'kb.noFavorites': 'No favorite content',
      'kb.noFavoritesDesc': 'You haven\'t added any content to favorites yet. Start browsing available content and add what interests you.',
      'kb.browseContent': 'Browse Available Content',
      'kb.view': 'View',
      'kb.publishDate': 'Publish Date',
      'kb.lastUpdate': 'Last Updated',
      'kb.markAsRead': 'Mark as Read',
      'kb.markAsUnread': 'Mark as Unread',
      
      // FAQ
      'faq.title': 'Frequently Asked Questions',
      'faq.subtitle': 'Common questions and answers',
      'faq.search.placeholder': 'Search questions',
      'faq.category': 'Category',
      'faq.allCategories': 'All Categories',
      'faq.noResults': 'No results found',
      'faq.noResultsDesc': 'We couldn\'t find any questions matching your search. Try using different keywords.',
      
      // Calculator
      'calc.title': 'Financial Calculator',
      'calc.description': 'Calculate key financial indicators based on your organization\'s data',
      'calc.startCalculation': 'Start Calculation',
      'calc.features.accurate': 'Accurate Calculations',
      'calc.features.accurateDesc': 'Results based on approved accounting standards',
      'calc.features.fast': 'Easy and Fast',
      'calc.features.fastDesc': 'Get instant results in minutes',
      
      // Common
      'common.back': 'Back',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.view': 'View',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.loading': 'Loading...',
      'common.noData': 'No data available',
      'common.switchToAdmin': 'Switch to Admin View',
    }
  }
};

export function LanguageProvider({ children, module = 'admin' }: { children: ReactNode; module?: Module }) {
  const [language, setLanguage] = useState<Language>(module === 'admin' ? 'en' : 'ar');

  const t = (key: string): string => {
    return translations[module][language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, module, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}