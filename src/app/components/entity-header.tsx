import svgPaths from "@/imports/svg-nxarfkri94";
import imgImage from "figma:asset/ce11d6f1d697df202f437b9d02490f72fd15d5c5.png";
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';
import { LanguageSwitcher } from '@/app/components/language-switcher';

interface EntityHeaderProps {
  activeNav?: 'assessment-forms' | 'knowledge-base' | 'calculator';
  onNavigateToCalculator?: () => void;
  onNavigateToKnowledgeBase?: () => void;
}

export function EntityHeader({ activeNav = 'knowledge-base', onNavigateToCalculator, onNavigateToKnowledgeBase }: EntityHeaderProps) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <div className="bg-white border-b border-[#e6ecec] shadow-[0px_4px_16px_0px_rgba(16,24,40,0.06)]">
      <div className={`flex items-center justify-between px-8 py-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Left Side: User Actions */}
        <div className={`flex items-center gap-4 ${isRTL ? '' : 'order-2'}`}>
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notification */}
          <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5023 21.5">
                <path clipRule="evenodd" d={svgPaths.p249ec900} fill="#161616" fillRule="evenodd" />
              </svg>
            </div>
          </button>

          {/* User Profile */}
          <button className={`flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors ${isRTL ? 'text-center' : 'text-left'}`}>
            <div className="size-10 shrink-0">
              <img 
                alt={isRTL ? 'أحمد محمود' : 'Ahmed Mahmoud'}
                className="size-full object-cover rounded-full border-2 border-white" 
                src={imgImage} 
              />
            </div>
            <div className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }} className="text-[#161616] leading-tight">
                {isRTL ? 'أحمد محمود' : 'Ahmed Mahmoud'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#161616]" />
          </button>
        </div>

        {/* Right Side: Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="h-[58px] w-[134.316px] shrink-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134.316 58">
              <g clipPath="url(#clip0_132_1699)">
                <path d={svgPaths.p2d43f300} fill="#36B8A0" />
                <path d={svgPaths.p16d90c80} fill="#015363" />
                <path d={svgPaths.p3c318d00} fill="#3C7FCC" />
                <path d={svgPaths.p2fbc8d00} fill="#015363" />
                <path d={svgPaths.p228e0200} fill="#015363" />
                <path d={svgPaths.p146bd6c0} fill="#015363" />
                <path d={svgPaths.p163a5370} fill="#015363" />
                <path d={svgPaths.p1b66c700} fill="#015363" />
                <path d={svgPaths.p26533200} fill="#015363" />
                <path d={svgPaths.p10dc7300} fill="#015363" />
                <path d={svgPaths.p4050180} fill="#015363" />
                <path d={svgPaths.p279c0e80} fill="#015363" />
                <path d={svgPaths.p6304c0} fill="#015363" />
                <path d={svgPaths.pf1f5200} fill="#015363" />
                <path d={svgPaths.p16adf480} fill="#015363" />
                <path d={svgPaths.p2ad19780} fill="#015363" />
                <path d={svgPaths.p13354d00} fill="#015363" />
                <path d={svgPaths.pca62a00} fill="#015363" />
                <path d={svgPaths.p1b07b900} fill="#015363" />
                <path d={svgPaths.p4aee700} fill="#015363" />
                <path d={svgPaths.p4e70080} fill="#015363" />
                <path d={svgPaths.p135f5800} fill="#015363" />
                <path d={svgPaths.pb21e700} fill="#015363" />
                <path d={svgPaths.p3c868e00} fill="#015363" />
                <path d={svgPaths.p2c6a1e00} fill="#015363" />
                <path d={svgPaths.p6eef600} fill="#015363" />
                <path d={svgPaths.pa7d4280} fill="#015363" />
                <path d={svgPaths.p3cb57580} fill="#015363" />
                <path d={svgPaths.p2a3fbd00} fill="#015363" />
                <path d={svgPaths.p23c77600} fill="#015363" />
                <path d={svgPaths.p25958570} fill="#015363" />
                <path d={svgPaths.p7a9500} fill="#015363" />
                <path d={svgPaths.pc2df800} fill="#015363" />
                <path d={svgPaths.p8d16900} fill="#015363" />
                <path d={svgPaths.p1de0d300} fill="#015363" />
                <path d={svgPaths.p11107900} fill="#015363" />
                <path d={svgPaths.p2db35000} fill="#015363" />
                <path d={svgPaths.p1f083a80} fill="#015363" />
                <path d={svgPaths.p2e615d70} fill="#015363" />
                <path d={svgPaths.p2635dd00} fill="#015363" />
                <path d={svgPaths.p146d8940} fill="#015363" />
                <path d={svgPaths.p16e466c0} fill="#015363" />
                <path d={svgPaths.p2f14f680} fill="#015363" />
                <path d={svgPaths.p318dfd00} fill="#015363" />
                <path d={svgPaths.p29097000} fill="#015363" />
                <path d={svgPaths.p35cdf800} fill="#015363" />
                <path d={svgPaths.p32154400} fill="#015363" />
                <path d={svgPaths.p3a175880} fill="#015363" />
                <path d={svgPaths.p453d870} fill="#015363" />
                <path d={svgPaths.p128ed300} fill="#015363" />
                <path d={svgPaths.p2f822100} fill="#015363" />
                <path d={svgPaths.p4194d80} fill="#015363" />
                <path d={svgPaths.p1b052140} fill="#015363" />
                <path d={svgPaths.p4a83c00} fill="#015363" />
                <path d={svgPaths.p29fb5600} fill="#015363" />
                <path d={svgPaths.p33fd6400} fill="#015363" />
                <path d={svgPaths.p23a5e080} fill="#015363" />
                <path d={svgPaths.p3896900} fill="#015363" />
                <path d={svgPaths.p3e62f300} fill="#015363" />
                <path d={svgPaths.p38774400} fill="#015363" />
                <path d={svgPaths.p59dd100} fill="#015363" />
                <path d={svgPaths.p2aea8400} fill="#015363" />
                <path d={svgPaths.p7ddc700} fill="#015363" />
                <path d={svgPaths.p27e0bb80} fill="#015363" />
                <path d={svgPaths.p2cb1e888} fill="#015363" />
                <path d={svgPaths.p12919a00} fill="#015363" />
                <path d={svgPaths.p2fdc700} fill="#015363" />
                <path d={svgPaths.p1e839000} fill="#015363" />
                <path d={svgPaths.p9302280} fill="#015363" />
                <path d={svgPaths.p30689900} fill="#015363" />
                <path d={svgPaths.p24fe4a80} fill="#015363" />
              </g>
              <defs>
                <clipPath id="clip0_132_1699">
                  <rect fill="white" height="58" width="134.316" />
                </clipPath>
              </defs>
            </svg>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex items-center gap-2">
            {/* قاعدة المعرفة / Knowledge Base */}
            <a
              href="#knowledge-base"
              className={`relative px-4 py-6 rounded transition-colors ${
                activeNav === 'knowledge-base' 
                  ? 'bg-[#eaf2ee]' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={onNavigateToKnowledgeBase}
            >
              <span 
                style={{ fontSize: 'var(--text-base)', fontWeight: activeNav === 'knowledge-base' ? 600 : 500 }}
                className={activeNav === 'knowledge-base' ? 'text-[#015363]' : 'text-[#161616]'}
              >
                {t('nav.knowledgeBase')}
              </span>
              {activeNav === 'knowledge-base' && (
                <div className="absolute bottom-0 left-2 right-2 h-[6px] bg-[#1b8254] rounded-full" />
              )}
            </a>

            {/* نماذج التقييم / Assessment Forms */}
            <a
              href="#assessment-forms"
              className={`relative px-4 py-6 rounded transition-colors ${
                activeNav === 'assessment-forms' 
                  ? 'bg-[#eaf2ee]' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span 
                style={{ fontSize: 'var(--text-base)', fontWeight: activeNav === 'assessment-forms' ? 600 : 500 }}
                className={activeNav === 'assessment-forms' ? 'text-[#015363]' : 'text-[#161616]'}
              >
                {isRTL ? 'نماذج التقييم' : 'Assessment Forms'}
              </span>
              {activeNav === 'assessment-forms' && (
                <div className="absolute bottom-0 left-2 right-2 h-[6px] bg-[#1b8254] rounded-full" />
              )}
            </a>

            {/* الحاسبة المالية / Financial Calculator */}
            <a
              href="#calculator"
              className={`relative px-4 py-6 rounded transition-colors ${
                activeNav === 'calculator' 
                  ? 'bg-[#eaf2ee]' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={onNavigateToCalculator}
            >
              <span 
                style={{ fontSize: 'var(--text-base)', fontWeight: activeNav === 'calculator' ? 600 : 500 }}
                className={activeNav === 'calculator' ? 'text-[#015363]' : 'text-[#161616]'}
              >
                {t('nav.calculator')}
              </span>
              {activeNav === 'calculator' && (
                <div className="absolute bottom-0 left-2 right-2 h-[6px] bg-[#1b8254] rounded-full" />
              )}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}