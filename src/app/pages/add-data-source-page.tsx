import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Upload, FileCode, Edit3, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

interface FormData {
  systemName: string;
  businessDomain: string;
  securityKey: string;
  configMethod: 'upload' | 'manual' | '';
  file?: File;
  apiName: string;
  baseUrl: string;
  apiVersion: string;
  description: string;
}

export function AddDataSourcePage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    systemName: '',
    businessDomain: '',
    securityKey: '',
    configMethod: 'upload',
    apiName: '',
    baseUrl: '',
    apiVersion: '',
    description: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const requiredMsg = isRTL ? 'هذا الحقل مطلوب' : 'This field is required';
    
    if (!formData.systemName.trim()) {
      newErrors.systemName = requiredMsg;
    }
    if (!formData.businessDomain) {
      newErrors.businessDomain = requiredMsg;
    }
    if (!formData.securityKey.trim()) {
      newErrors.securityKey = requiredMsg;
    }
    if (!formData.configMethod) {
      newErrors.configMethod = requiredMsg;
    }

    // Additional validation for config method
    if (formData.configMethod === 'upload' && !formData.file) {
      newErrors.file = requiredMsg;
    } else if (formData.configMethod === 'manual') {
      if (!formData.apiName.trim()) {
        newErrors.apiName = requiredMsg;
      }
      if (!formData.baseUrl.trim()) {
        newErrors.baseUrl = requiredMsg;
      }
      if (!formData.apiVersion.trim()) {
        newErrors.apiVersion = requiredMsg;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      // Move to step 2 - Navigate to configure endpoints page
      navigate('/admin/data-sources/configure-endpoints');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      setFileName(file.name);
      setErrors({ ...errors, file: undefined });
    }
  };

  const isFormValid = () => {
    if (!formData.systemName.trim() || !formData.businessDomain || !formData.securityKey.trim() || !formData.configMethod) {
      return false;
    }

    if (formData.configMethod === 'upload' && !formData.file) {
      return false;
    }

    if (formData.configMethod === 'manual') {
      if (!formData.apiName.trim() || !formData.baseUrl.trim() || !formData.apiVersion.trim()) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="px-8 py-6 max-w-6xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {isRTL ? 'إضافة مصدر بيانات جديد' : 'Add New Data Source'}
        </h1>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {isRTL ? 'تفاصيل مصدر البيانات' : 'Data Source Details'}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-8">
        {/* Step 1 */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep === 1
                ? 'bg-primary text-white'
                : 'bg-muted text-foreground'
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            1
          </div>
          <span
            className="text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: currentStep === 1 ? 600 : 400 }}
          >
            {isRTL ? 'تفاصيل مصدر البيانات' : 'Data Source Details'}
          </span>
        </div>

        {/* Separator */}
        <ChevronRight className="w-5 h-5 text-muted-foreground" />

        {/* Step 2 */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep === 2
                ? 'bg-primary text-white'
                : 'bg-muted text-foreground'
            }`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            2
          </div>
          <span
            className="text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: currentStep === 2 ? 600 : 400 }}
          >
            {isRTL ? 'تكوين النقاط النهائية' : 'Configure Endpoints'}
          </span>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white border border-border rounded-lg shadow-sm">
        <div className="p-8">
          {/* Section 1: Data Source Details */}
          <div className="mb-10">
            <h2 className="text-foreground mb-6" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
              {isRTL ? 'تفاصيل مصدر البيانات' : 'Data Source Details'}
            </h2>

            <div className="space-y-6">
              {/* System Name */}
              <div>
                <label htmlFor="systemName" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'اسم مصدر البيانات' : 'Data Source Name'} <span className="text-destructive">*</span>
                </label>
                <input
                  id="systemName"
                  type="text"
                  value={formData.systemName}
                  onChange={(e) => {
                    setFormData({ ...formData, systemName: e.target.value });
                    setErrors({ ...errors, systemName: undefined });
                  }}
                  placeholder={isRTL ? 'أدخل اسم النظام' : 'Enter system name'}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${
                    errors.systemName ? 'border-destructive' : 'border-border'
                  }`}
                  style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.systemName && (
                  <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                    {errors.systemName}
                  </p>
                )}
              </div>

              {/* Business Domain */}
              <div>
                <label htmlFor="businessDomain" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'مجال الأعمال' : 'Business Domain'} <span className="text-destructive">*</span>
                </label>
                <select
                  id="businessDomain"
                  value={formData.businessDomain}
                  onChange={(e) => {
                    setFormData({ ...formData, businessDomain: e.target.value });
                    setErrors({ ...errors, businessDomain: undefined });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white ${
                    errors.businessDomain ? 'border-destructive' : 'border-border'
                  }`}
                  style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <option value="">{isRTL ? 'اختر مجال الأعمال' : 'Select business domain'}</option>
                  <option value="crm">{isRTL ? 'إدارة علاقات العملاء' : 'CRM'}</option>
                  <option value="finance">{isRTL ? 'المالية' : 'Finance'}</option>
                  <option value="operations">{isRTL ? 'العمليات' : 'Operations'}</option>
                  <option value="bi">{isRTL ? 'تحليل البيانات' : 'BI'}</option>
                  <option value="communication">{isRTL ? 'الاتصالات' : 'Communication'}</option>
                </select>
                {errors.businessDomain && (
                  <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                    {errors.businessDomain}
                  </p>
                )}
              </div>

              {/* Security Key */}
              <div>
                <label htmlFor="securityKey" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'مفتاح الأمان' : 'Security Key'} <span className="text-destructive">*</span>
                </label>
                <input
                  id="securityKey"
                  type="password"
                  value={formData.securityKey}
                  onChange={(e) => {
                    setFormData({ ...formData, securityKey: e.target.value });
                    setErrors({ ...errors, securityKey: undefined });
                  }}
                  placeholder={isRTL ? 'أدخل مفتاح الأمان' : 'Enter security key'}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${
                    errors.securityKey ? 'border-destructive' : 'border-border'
                  }`}
                  style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.securityKey && (
                  <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                    {errors.securityKey}
                  </p>
                )}
              </div>

              {/* Status (Read-only) */}
              <div>
                <label className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'الحالة' : 'Status'}
                </label>
                <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-600" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'غير نشط' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: API Configuration Method */}
          <div className="mb-10 pb-8 border-b border-border">
            <h3 className="text-foreground mb-6" style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
              {isRTL ? 'تفاصيل واجهة البرمجة' : 'API Details'}
            </h3>

            {/* Configuration Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Upload Option Card */}
              <div
                onClick={() => {
                  setFormData({ ...formData, configMethod: 'upload' });
                  setErrors({ ...errors, configMethod: undefined });
                }}
                className={`relative cursor-pointer border-2 rounded-lg p-6 transition-all hover:border-primary ${
                  formData.configMethod === 'upload'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white'
                }`}
              >
                {formData.configMethod === 'upload' && (
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                <FileCode className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  {isRTL ? 'رفع ملف YAML' : 'YAML file upload'}
                </h4>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? 'رفع ملف OpenAPI YAML مع جميع التعريفات' : 'Upload OpenAPI YAML file with all definitions'}
                </p>
              </div>

              {/* Manual Entry Option Card */}
              <div
                onClick={() => {
                  setFormData({ ...formData, configMethod: 'manual' });
                  setErrors({ ...errors, configMethod: undefined });
                }}
                className={`relative cursor-pointer border-2 rounded-lg p-6 transition-all hover:border-primary ${
                  formData.configMethod === 'manual'
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white'
                }`}
              >
                {formData.configMethod === 'manual' && (
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                <Edit3 className="w-10 h-10 text-primary mb-4" />
                <h4 className="text-foreground mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
                  {isRTL ? 'إدخال يدوي' : 'Enter Manual'}
                </h4>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  {isRTL ? 'إدخال تفاصيل API يدوياً' : 'Enter API details manually'}
                </p>
              </div>
            </div>

            {errors.configMethod && (
              <p className="text-destructive mb-4" style={{ fontSize: 'var(--text-xs)' }}>
                {errors.configMethod}
              </p>
            )}

            {/* Conditional Content Based on Selection */}
            {formData.configMethod === 'upload' && (
              <div className="mt-6 space-y-2">
                <label htmlFor="file" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {isRTL ? 'تحميل الملف' : 'Upload File'} <span className="text-destructive">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    errors.file ? 'border-destructive bg-destructive/5' : 'border-border hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <input
                    id="file"
                    type="file"
                    accept=".yaml,.yml"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    {fileName ? (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FileCode className="w-5 h-5 text-primary" />
                        <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                          {fileName}
                        </p>
                      </div>
                    ) : (
                      <p className="text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {isRTL ? 'انقر لتحميل الملف أو اسحبه هنا' : 'Click to upload or drag and drop'}
                      </p>
                    )}
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                      {isRTL ? 'يتم قبول ملفات YAML و YML فقط' : 'YAML and YML files only'}
                    </p>
                  </label>
                </div>
                {errors.file && (
                  <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                    {errors.file}
                  </p>
                )}
              </div>
            )}

            {formData.configMethod === 'manual' && (
              <div className="mt-6 space-y-6 bg-muted/30 border border-border rounded-lg p-6">
                {/* API Name */}
                <div>
                  <label htmlFor="apiName" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    API Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="apiName"
                    type="text"
                    value={formData.apiName}
                    onChange={(e) => {
                      setFormData({ ...formData, apiName: e.target.value });
                      setErrors({ ...errors, apiName: undefined });
                    }}
                    placeholder="Enter API name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white ${
                      errors.apiName ? 'border-destructive' : 'border-border'
                    }`}
                    style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.apiName && (
                    <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                      {errors.apiName}
                    </p>
                  )}
                </div>

                {/* API Version */}
                <div>
                  <label htmlFor="apiVersion" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    API Version <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="apiVersion"
                    type="text"
                    value={formData.apiVersion}
                    onChange={(e) => {
                      setFormData({ ...formData, apiVersion: e.target.value });
                      setErrors({ ...errors, apiVersion: undefined });
                    }}
                    placeholder="Enter API version"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white ${
                      errors.apiVersion ? 'border-destructive' : 'border-border'
                    }`}
                    style={{ fontSize: 'var(--text-base)', textAlign: 'left' }}
                    dir="ltr"
                  />
                  {errors.apiVersion && (
                    <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                      {errors.apiVersion}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter a description for the data source"
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white resize-none"
                    style={{ fontSize: 'var(--text-base)', textAlign: isRTL ? 'right' : 'left' }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Base URL */}
                <div>
                  <label htmlFor="baseUrl" className="block text-foreground mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    Base URL <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="baseUrl"
                    type="text"
                    value={formData.baseUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, baseUrl: e.target.value });
                      setErrors({ ...errors, baseUrl: undefined });
                    }}
                    placeholder="Enter base URL"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-white ${
                      errors.baseUrl ? 'border-destructive' : 'border-border'
                    }`}
                    style={{ fontSize: 'var(--text-base)', textAlign: 'left' }}
                    dir="ltr"
                  />
                  {errors.baseUrl && (
                    <p className="text-destructive mt-2" style={{ fontSize: 'var(--text-xs)' }}>
                      {errors.baseUrl}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => navigate('/admin/data-sources')}
              className="px-6 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {isRTL ? 'السابق' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              disabled={!isFormValid()}
              className={`px-6 py-3 rounded-lg text-white transition-colors ${
                isFormValid()
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {isRTL ? 'التالي' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}