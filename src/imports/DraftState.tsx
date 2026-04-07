import svgPaths from "./svg-ltjlvwpz7j";
import imgImage from "figma:asset/ce11d6f1d697df202f437b9d02490f72fd15d5c5.png";

function Group() {
  return (
    <div className="absolute contents left-[24px] top-[228px]">
      <div className="absolute bg-[#eee] h-[826px] left-[24px] rounded-[40px] top-[228px] w-[7px]" />
      <div className="-translate-y-1/2 absolute bg-[#1b8354] h-[378.911px] left-[24px] rounded-[40px] top-[calc(50%+194.34px)] w-[7px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[32px] items-end justify-center pr-[16px] relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1b8354] text-[16px] text-right" dir="auto">
        الاسم المعياري
      </p>
    </div>
  );
}

function Cricle() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[32px]" data-name="Cricle">
      <div aria-hidden="true" className="absolute border-2 border-[#1b8354] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#1b8354] text-[16px]">1</p>
    </div>
  );
}

function Step() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Step">
      <div className="content-stretch flex items-start relative shrink-0" data-name="_StepperBase">
        <Cricle />
      </div>
      <div className="bg-[#d2d6db] h-[238px] shrink-0 w-[2px]" />
      <div className="-translate-x-1/2 absolute bg-[#1b8354] h-[86px] left-1/2 top-[32px] w-[2px]" />
    </div>
  );
}

function ProgressIndicator() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[271px] items-start justify-center left-[135px] overflow-clip top-[156px]" data-name="Progress Indicator">
      <Text />
      <Step />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-end justify-center left-[117px] top-[289px]" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#878889] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 500" }}>
        اسم الممارسة ١
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-end justify-center left-[117px] top-[248px]" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#1b8354] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 500" }}>
        اسم الممارسة ١
      </p>
    </div>
  );
}

function Elements() {
  return (
    <div className="absolute inset-[34.18%_13.89%_30%_13.89%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5567 5.73167">
        <g>
          <path d={svgPaths.p266cc500} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, #161616)" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[24px] left-[21px] top-0 w-[73px]" data-name="Text">
      <p className="-translate-x-full absolute font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[24px] left-[73px] text-[#1f2a37] text-[16px] text-right top-0" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 600" }}>
        اسم المؤشر
      </p>
    </div>
  );
}

function Step1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-end justify-center left-[110px] top-0" data-name="Step">
      <div className="content-stretch flex h-[24px] items-center justify-end relative shrink-0 w-[32px]" data-name="_StepperBase">
        <div className="relative shrink-0 size-[16px]" data-name="Dot">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Dot" r="6" stroke="var(--stroke-0, #1B8354)" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProgressIndicator1() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-[142px]" data-name="Progress Indicator">
      <Text3 />
      <Step1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[26px] top-[208px] w-[249px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <div className="relative size-[16px]" data-name="arrow-down-01-round">
            <Elements />
          </div>
        </div>
      </div>
      <ProgressIndicator1 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[32px] items-end justify-center pr-[16px] relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px] text-right" dir="auto">
        الاسم المعياري
      </p>
    </div>
  );
}

function Cricle1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[32px]" data-name="Cricle">
      <div aria-hidden="true" className="absolute border-2 border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#d2d6db] text-[16px]">2</p>
    </div>
  );
}

function Step2() {
  return (
    <div className="content-stretch flex flex-col h-[128px] items-center relative shrink-0" data-name="Step">
      <div className="content-stretch flex items-start relative shrink-0" data-name="_StepperBase">
        <Cricle1 />
      </div>
      <div className="bg-[#d2d6db] flex-[1_0_0] min-h-px min-w-px w-[2px]" />
    </div>
  );
}

function ProgressIndicator2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[69px] items-start justify-end left-[148px] overflow-clip top-[424px]" data-name="Progress Indicator">
      <Text4 />
      <Step2 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[32px] items-start justify-center pr-[16px] relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px]" dir="auto">
        الاسم المعياري
      </p>
    </div>
  );
}

function Cricle2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[32px]" data-name="Cricle">
      <div aria-hidden="true" className="absolute border-2 border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#d2d6db] text-[16px]">3</p>
    </div>
  );
}

function Step3() {
  return (
    <div className="content-stretch flex flex-col h-[128px] items-center relative shrink-0" data-name="Step">
      <div className="content-stretch flex items-start relative shrink-0" data-name="_StepperBase">
        <Cricle2 />
      </div>
    </div>
  );
}

function ProgressIndicator3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[69px] items-start justify-center left-[148px] overflow-clip top-[493px]" data-name="Progress Indicator">
      <Text5 />
      <Step3 />
    </div>
  );
}

function CellContent() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center px-[8px] relative rounded-[9999px] shrink-0" data-name="Tag">
        <p className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#93370d] text-[14px] text-center" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 500" }}>
          تقديم نموذج تجريبي
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end justify-center relative shrink-0 w-[422px]" data-name="Frame">
      <CellContent />
      <p className="font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] leading-[54px] not-italic relative shrink-0 text-[#161616] text-[21px]" dir="auto">
        نموذج تقييم المخاطر المالية
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start justify-end left-0 top-[38px] w-[279px]">
      <Frame />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center pr-[16px] relative shrink-0" data-name="Text">
      <p className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#6c737f] text-[16px] text-right" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 500" }}>
        اسم المؤشر
      </p>
    </div>
  );
}

function Step4() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-end relative shrink-0" data-name="Step">
      <div className="content-stretch flex h-[24px] items-center justify-end relative shrink-0 w-[32px]" data-name="_StepperBase">
        <div className="relative shrink-0 size-[16px]" data-name="Dot">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Dot" r="7" stroke="var(--stroke-0, #D2D6DB)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProgressIndicator4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center justify-end left-[146px] overflow-clip top-[368px] w-[129px]" data-name="Progress Indicator">
      <Text6 />
      <Step4 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[#f8f9fa] h-[980px] overflow-clip right-0 top-[74px] w-[332px]">
      <div className="absolute bg-[rgba(27,131,84,0.1)] h-[26px] left-[26px] rounded-bl-[8px] rounded-tl-[8px] top-[248px] w-[240px]" />
      <ProgressIndicator />
      <Text1 />
      <Text2 />
      <p className="-translate-x-full absolute font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] left-[200px] text-[#878889] text-[14px] text-right top-[328px]" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 500" }}>
        اسم الممارسة ٢
      </p>
      <Frame13 />
      <ProgressIndicator2 />
      <ProgressIndicator3 />
      <Frame2 />
      <ProgressIndicator4 />
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.38%_21.87%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99999">
        <g>
          <path d={svgPaths.p21905800} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center leading-[20px] relative shrink-0 text-[14px]">
      <p className="font-['IBM_Plex_Sans:Bold','Noto_Sans_Arabic:Bold',sans-serif] relative shrink-0 text-[#161616]" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 700" }}>
        أحمد محمود
      </p>
      <p className="font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] relative shrink-0 text-[#64748b]" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        مدير النظام
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Component 360">
      <div className="relative shrink-0 size-[16px]" data-name="arrow-down-01">
        <Elements1 />
      </div>
      <Frame4 />
      <div className="relative shrink-0 size-[40px]" data-name="Avatar">
        <div className="absolute bg-white inset-0 rounded-[9999px]" data-name="bg">
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[9999px]" data-name="Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgImage} />
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
        </div>
      </div>
    </div>
  );
}

function Elements2() {
  return (
    <div className="absolute inset-[5.21%_7.28%_5.21%_7.29%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5023 21.5">
        <g>
          <path clipRule="evenodd" d={svgPaths.p249ec900} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Elements3() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.38%_21.87%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99999">
        <g>
          <path d={svgPaths.p32800680} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function InputContent() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Bold','Noto_Sans_Arabic:Bold',sans-serif] h-full items-start justify-between leading-[20px] relative shrink-0 text-[#161616] text-[14px]" data-name="Input Content">
      <p className="relative shrink-0" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 700" }}>
        العربية
      </p>
      <p className="relative shrink-0" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 700" }}>
        العربية
      </p>
    </div>
  );
}

function Elements4() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5006">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p273e8cb1} fill="var(--fill-0, #384250)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p260ca180} fill="var(--fill-0, #384250)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p371c5f00} fill="var(--fill-0, #384250)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p567ef70} fill="var(--fill-0, #384250)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0">
      <InputContent />
      <div className="relative shrink-0 size-[24px]" data-name="language-skill">
        <Elements4 />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center pl-[12px] pr-[8px] py-[8px] relative rounded-[7px] shrink-0" data-name="Input">
      <div className="relative shrink-0 size-[16px]" data-name="arrow-down-01">
        <Elements3 />
      </div>
      <Frame3 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <Component />
      <div className="relative shrink-0 size-[24px]" data-name="notification-02">
        <Elements2 />
      </div>
      <div className="flex h-[26px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[26px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 2">
                <line id="Line 57" stroke="var(--stroke-0, #59595C)" strokeWidth="2" x2="26" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Input />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <Actions1 />
    </div>
  );
}

function LogoMenuItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-end min-h-px min-w-px relative" data-name="Logo & Menu Items">
      <div className="h-[58px] overflow-clip relative shrink-0 w-[134.316px]" data-name="Logo">
        <div className="absolute inset-[22.21%_16.86%_36.83%_69.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6067 23.7567">
            <path d={svgPaths.p1d75d900} fill="var(--fill-0, #36B8A0)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[48.05%_0.57%_0.79%_84.79%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6635 29.6746">
            <path d={svgPaths.p22c54c00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[0.29%_0_60%_84.81%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.4024 23.0286">
            <path d={svgPaths.pff8000} fill="var(--fill-0, #3C7FCC)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[23.46%_98.55%_74.45%_0.57%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.19216 1.21367">
            <path d={svgPaths.p302ca9c0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_82.6%_63.88%_0]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3741 7.89881">
            <path d={svgPaths.p23b50500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[23.43%_97.17%_74.45%_1.95%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.18681 1.23357">
            <path d={svgPaths.p29aac80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[37.18%_95.22%_60.73%_3.86%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.22704 1.21373">
            <path d={svgPaths.pea7ca80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[37.15%_93.84%_60.72%_5.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16665 1.23357">
            <path d={svgPaths.pdaf8900} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.18%_87.43%_73.69%_11.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.27263 1.23357">
            <path d={svgPaths.p3e171dc0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.22%_85.79%_73.69%_13.3%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.22704 1.21367">
            <path d={svgPaths.p2711cc40} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.22%_84.41%_73.69%_14.72%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16672 1.21367">
            <path d={svgPaths.p5ecfa80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_47.73%_60.2%_44.82%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99719 10.0314">
            <path d={svgPaths.p30974500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.22%_53.15%_73.69%_45.89%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.2876 1.21367">
            <path d={svgPaths.peb4a00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_38.52%_60.17%_52.46%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1135 10.0513">
            <path d={svgPaths.p167d4380} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_36.35%_64.32%_62.68%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.30714 7.64548">
            <path d={svgPaths.padcca00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[47.99%_83.84%_42.06%_0.15%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5034 5.77293">
            <path d={svgPaths.p1e9fe500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[59.24%_98.08%_38.8%_1.06%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.15193 1.13411">
            <path d={svgPaths.p12198b00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[59.24%_96.69%_38.8%_2.46%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.14657 1.13411">
            <path d={svgPaths.p4279b00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[58.01%_84.41%_39.9%_14.64%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.27261 1.21367">
            <path d={svgPaths.p20ccc80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.25%_79.17%_39.38%_16.41%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.93792 10.0713">
            <path d={svgPaths.p1626d100} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.29%_77%_43.54%_22.02%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32759 7.64019">
            <path d={svgPaths.p15d13600} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[58.01%_69.18%_39.89%_29.94%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.1868 1.22147">
            <path d={svgPaths.p29c8f780} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[58.01%_70.56%_39.9%_28.53%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.22704 1.21367">
            <path d={svgPaths.p3c19a380} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[44.11%_63.16%_53.76%_35.91%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.24718 1.23363">
            <path d={svgPaths.p349fe500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[48.06%_62.19%_39.42%_24.81%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.464 7.26588">
            <path d={svgPaths.p374a0dc0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[48.09%_56.27%_38.94%_39.99%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.02884 7.52083">
            <path d={svgPaths.p39c2d100} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[44.18%_42.7%_53.69%_56.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.22715 1.23357">
            <path d={svgPaths.p3d05500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[44.18%_41.32%_53.69%_57.81%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16672 1.23357">
            <path d={svgPaths.p32f7a870} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.22%_38.52%_43.5%_44.76%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4487 7.69983">
            <path d={svgPaths.p154f1660} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.29%_36.35%_43.5%_62.68%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.30714 7.66009">
            <path d={svgPaths.p133c9700} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.59%_95.68%_21.51%_0.06%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.71591 7.48102">
            <path d={svgPaths.p901a00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.57%_91.49%_21.41%_5.18%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.46944 5.80971">
            <path d={svgPaths.p2c98b980} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[66.58%_88.32%_21.38%_8.94%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.68117 6.98357">
            <path d={svgPaths.p3c2e4d00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.74%_86.63%_21.51%_12.37%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34774 5.65054">
            <path d={svgPaths.p3fa0af80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.21%_86.61%_32.6%_12.36%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.38797 1.27337">
            <path d={svgPaths.p3cfb0000} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.61%_82.12%_21.35%_14.24%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.88806 5.81966">
            <path d={svgPaths.pb630400} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.57%_77.79%_21.52%_18.72%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.68689 5.75">
            <path d={svgPaths.p1c6cc600} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.57%_73.64%_21.45%_23%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.50967 5.7898">
            <path d={svgPaths.p360adf80} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.31%_71.77%_21.51%_27.23%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34774 7.64018">
            <path d={svgPaths.p34765b00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.42%_66.03%_21.41%_30.46%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.70951 7.64019">
            <path d={svgPaths.p26389900} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.6%_61.84%_21.38%_34.55%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.85083 5.81344">
            <path d={svgPaths.p16a91900} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.57%_57.51%_21.51%_38.98%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.70697 5.75529">
            <path d={svgPaths.p6325680} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[66.58%_54.28%_21.38%_42.98%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.68117 6.98357">
            <path d={svgPaths.p2c3d7000} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.6%_50.11%_21.38%_46.27%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8506 5.81344">
            <path d={svgPaths.p132892f0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.61%_47.07%_21.52%_50.72%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.95678 5.73016">
            <path d={svgPaths.p30b7be00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[24.22%_71.65%_73.69%_27.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.28742 1.21367">
            <path d={svgPaths.p1d58c00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_59.19%_60.21%_35.36%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.32198 10.0277">
            <path d={svgPaths.p312bca00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.5%_57%_64.32%_42.02%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.3075 7.64548">
            <path d={svgPaths.p25d26300} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[38.42%_77.09%_59.63%_22.05%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16672 1.13405">
            <path d={svgPaths.pc506900} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[22.57%_65.42%_62.78%_19.68%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0179 8.49875">
            <path d={svgPaths.p1a4b400} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[38.45%_78.49%_59.59%_20.64%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.16672 1.13411">
            <path d={svgPaths.p15894e00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[65.11%_42.88%_21.52%_54.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.66863 7.75955">
            <path d={svgPaths.p2209fd00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.61%_38.93%_21.35%_57.43%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.88848 5.81966">
            <path d={svgPaths.p2cc65400} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[68.61%_35.89%_21.52%_61.93%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.93724 5.73016">
            <path d={svgPaths.p2b1f6e00} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[85.89%_95.76%_1.17%_0]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.6958 7.50474">
            <path d={svgPaths.p94f7500} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.88%_91.21%_1.07%_5.17%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.86791 5.82961">
            <path d={svgPaths.p1bb26600} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.84%_86.87%_1.28%_9.64%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.68689 5.73016">
            <path d={svgPaths.pdc02080} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[92.56%_80.8%_5.49%_14.26%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.64125 1.12728">
            <path d={svgPaths.p2e830cf0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[85.76%_75.45%_1.21%_20.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.60033 7.56063">
            <path d={svgPaths.p13c94600} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.88%_72.52%_1.28%_25.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.93688 5.71025">
            <path d={svgPaths.p3c4dd680} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.89%_68.58%_1.08%_27.78%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.88806 5.81969">
            <path d={svgPaths.p13767900} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[85.38%_65.55%_1.24%_31.73%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.64878 7.75961">
            <path d={svgPaths.p3a41c380} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[89.02%_63.88%_1.24%_35.13%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32765 5.65061">
            <path d={svgPaths.p2b037100} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[85.48%_63.85%_12.32%_35.12%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.38797 1.27338">
            <path d={svgPaths.p22ff1200} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[86.92%_60.46%_1.04%_36.8%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.6811 6.98363">
            <path d={svgPaths.pd0a3100} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[85.79%_54.13%_1.03%_42.11%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.05296 7.64318">
            <path d={svgPaths.p3fb4a2f2} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.91%_49.78%_1.07%_46.57%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.89089 5.81276">
            <path d={svgPaths.p2f8f1800} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.88%_46.23%_1.07%_50.9%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.84995 5.82961">
            <path d={svgPaths.p3a48e100} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[86.92%_43.02%_1.07%_54.24%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.68086 6.96372">
            <path d={svgPaths.p2fc4eff0} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.89%_38.93%_1.08%_57.43%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.88848 5.81969">
            <path d={svgPaths.p32a44780} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[88.88%_35.89%_1.28%_61.93%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.93724 5.71025">
            <path d={svgPaths.p132d6400} fill="var(--fill-0, #015363)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header Content">
      <Actions />
      <LogoMenuItems />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[72px] items-center justify-center relative w-[1440px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e6ecec] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-white content-stretch flex flex-col items-center justify-center px-[32px] py-[7px] relative w-[1440px]" data-name="Nav Header New">
            <div aria-hidden="true" className="absolute border-[#e6ecec] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_16px_0px_rgba(16,24,40,0.06)]" />
            <HeaderContent />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right whitespace-pre-wrap" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        نعم
      </p>
    </div>
  );
}

function RadioElements() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Radio elements">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute border border-[#1b8354] border-solid left-1/2 rounded-[9999px] size-[24px] top-1/2" data-name="_RadioBase">
        <div className="absolute inset-[calc(18.75%-0.63px)]" data-name="Inner Circle">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <circle cx="7.5" cy="7.5" fill="var(--fill-0, #1B8354)" id="Inner Circle" r="7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RadioLabel() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Radio & Label">
      <RadioElements />
    </div>
  );
}

function SwitchLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[382px]" data-name="Switch & Label">
      <TextWrapper />
      <div className="content-stretch flex flex-col items-start relative shrink-0 size-[32px]" data-name="Radio">
        <RadioLabel />
      </div>
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right whitespace-pre-wrap" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        لا، لم يتم انتخاب مجلسًا أو عضوًا جديدًا
      </p>
    </div>
  );
}

function RadioElements1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Radio elements">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute border border-[#6c737f] border-solid cursor-pointer left-1/2 rounded-[9999px] size-[24px] top-1/2" data-name="_RadioBase" role="button" tabIndex="0" />
    </div>
  );
}

function RadioLabel1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Radio & Label">
      <RadioElements1 />
    </div>
  );
}

function SwitchLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[382px]" data-name="Switch & Label">
      <TextWrapper1 />
      <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0 size-[32px]" data-name="Radio">
        <RadioLabel1 />
      </button>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-[320px]" data-name="Label">
      <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Label">
        <p className="font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[20px] relative shrink-0 text-[#161616] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 600" }}>
          تبرير الإجابة (اختياري)
        </p>
      </div>
    </div>
  );
}

function Bar() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Bar">
      <div aria-hidden="true" className="absolute border-[#9da4ae] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[4px] relative size-full">
          <div className="bg-[#d2d6db] h-[40px] rounded-[9999px] shrink-0 w-full" data-name="Bar" />
        </div>
      </div>
    </div>
  );
}

function Spacer() {
  return <div className="h-[16px] shrink-0 w-full" data-name="Spacer" />;
}

function Text7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-start justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-full leading-[24px] min-h-px min-w-px not-italic relative text-[#161616] text-[16px] text-right whitespace-pre-wrap" dir="auto">
        النص المُدخل
      </p>
    </div>
  );
}

function IconTextStack() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex items-start justify-end px-[16px] py-[12px] relative size-full">
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="bg-white h-[96px] relative rounded-[4px] shrink-0 w-full" data-name="Contents">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#f3f4f6] content-stretch flex flex-col h-full items-center mix-blend-multiply relative shrink-0 w-[16px]" data-name="_Textarea-Scrollbar">
          <div aria-hidden="true" className="absolute border-[#9da4ae] border-l border-solid inset-0 pointer-events-none" />
          <Bar />
          <Spacer />
        </div>
        <IconTextStack />
        <div className="absolute bottom-[2px] flex items-center justify-center left-[2px] size-[12px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="overflow-clip relative size-[12px]" data-name=".Resize handler">
              <div className="absolute flex items-center justify-center left-[2px] size-[7.778px] top-[2px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                <div className="-rotate-45 flex-none">
                  <div className="h-px relative w-[10px]" data-name="Vector 1 (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                      <path clipRule="evenodd" d="M10 1H0V0H10V1Z" fill="var(--fill-0, #0D121C)" fillRule="evenodd" id="Vector 1 (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-[5.28px] size-[4.95px] top-[5.21px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                <div className="-rotate-45 flex-none">
                  <div className="h-px relative w-[6px]" data-name="Vector 2 (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
                      <path clipRule="evenodd" d="M6 1H0V0L6 4.37114e-08V1Z" fill="var(--fill-0, #0D121C)" fillRule="evenodd" id="Vector 2 (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex gap-[4px] items-end justify-end relative shrink-0 w-full" data-name="Label">
        <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
          رفع المرفقات
        </p>
      </div>
      <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-full whitespace-pre-wrap" dir="auto">
        Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
      </p>
    </div>
  );
}

function Elements5() {
  return (
    <div className="absolute inset-[21.88%_21.87%_21.87%_21.87%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g>
          <path clipRule="evenodd" d={svgPaths.p1e8c1c0} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function TrailWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Trail wrapper">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[20px]" data-name="Button-Close">
        <div className="relative shrink-0 size-[16px]" data-name="multiplication-sign">
          <Elements5 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right whitespace-pre-wrap" dir="auto">
        اسم الملف.csv
      </p>
      <div className="relative shrink-0 size-[20px]" data-name="Feedback Icon">
        <div className="absolute inset-[4.17%]" data-name="bg">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path clipRule="evenodd" d={svgPaths.p166ff400} fill="var(--fill-0, white)" fillRule="evenodd" id="bg" />
          </svg>
        </div>
        <div className="absolute inset-[4.17%]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path clipRule="evenodd" d={svgPaths.p3c5b6b00} fill="var(--fill-0, #067647)" fillRule="evenodd" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IndicatorFileNameRemove() {
  return (
    <div className="relative shrink-0 w-full" data-name="Indicator + file name + remove">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <TrailWrapper />
          <TextWrapper2 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[20px] relative shrink-0 text-[#1b8354] text-[14px]" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 600" }}>
        أحكام الجمعية العمومية
      </p>
      <div className="content-stretch flex flex-col h-[32px] items-end relative rounded-[4px] shrink-0 w-full" data-name="Radio Label">
        <SwitchLabel />
      </div>
      <div className="content-stretch flex flex-col h-[32px] items-end relative rounded-[4px] shrink-0 w-full" data-name="Radio Label">
        <SwitchLabel1 />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-end min-h-[96px] min-w-[200px] overflow-clip relative shrink-0 w-full" data-name="Textarea">
        <Label />
        <Contents />
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="File Upload / Single">
        <Header1 />
        <div className="bg-[#f3f4f6] relative rounded-[4px] shrink-0 w-full" data-name="_File">
          <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
            <IndicatorFileNameRemove />
          </div>
          <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[479px] items-end left-[333px] top-[48px] w-[590px]">
      <Frame11 />
    </div>
  );
}

function TextWrapper3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right whitespace-pre-wrap" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        نعم
      </p>
    </div>
  );
}

function RadioElements2() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Radio elements">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute border border-[#1b8354] border-solid left-1/2 rounded-[9999px] size-[24px] top-1/2" data-name="_RadioBase">
        <div className="absolute inset-[calc(18.75%-0.63px)]" data-name="Inner Circle">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <circle cx="7.5" cy="7.5" fill="var(--fill-0, #1B8354)" id="Inner Circle" r="7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RadioLabel2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Radio & Label">
      <RadioElements2 />
    </div>
  );
}

function SwitchLabel2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[382px]" data-name="Switch & Label">
      <TextWrapper3 />
      <div className="content-stretch flex flex-col items-start relative shrink-0 size-[32px]" data-name="Radio">
        <RadioLabel2 />
      </div>
    </div>
  );
}

function TextWrapper4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right whitespace-pre-wrap" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        لا، لم يتم انتخاب مجلسًا أو عضوًا جديدًا
      </p>
    </div>
  );
}

function RadioElements3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Radio elements">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute border border-[#6c737f] border-solid cursor-pointer left-1/2 rounded-[9999px] size-[24px] top-1/2" data-name="_RadioBase" role="button" tabIndex="0" />
    </div>
  );
}

function RadioLabel3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Radio & Label">
      <RadioElements3 />
    </div>
  );
}

function SwitchLabel3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[382px]" data-name="Switch & Label">
      <TextWrapper4 />
      <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0 size-[32px]" data-name="Radio">
        <RadioLabel3 />
      </button>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-[320px]" data-name="Label">
      <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Label">
        <p className="font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[20px] relative shrink-0 text-[#161616] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 600" }}>
          تبرير الإجابة (اختياري)
        </p>
      </div>
    </div>
  );
}

function Bar1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Bar">
      <div aria-hidden="true" className="absolute border-[#9da4ae] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[4px] relative size-full">
          <div className="bg-[#d2d6db] h-[40px] rounded-[9999px] shrink-0 w-full" data-name="Bar" />
        </div>
      </div>
    </div>
  );
}

function Spacer1() {
  return <div className="h-[16px] shrink-0 w-full" data-name="Spacer" />;
}

function Text8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-start justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-full leading-[24px] min-h-px min-w-px not-italic relative text-[#161616] text-[16px] text-right whitespace-pre-wrap" dir="auto">
        النص المُدخل
      </p>
    </div>
  );
}

function IconTextStack1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row justify-end size-full">
        <div className="content-stretch flex items-start justify-end px-[16px] py-[12px] relative size-full">
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="bg-white h-[96px] relative rounded-[4px] shrink-0 w-full" data-name="Contents">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#f3f4f6] content-stretch flex flex-col h-full items-center mix-blend-multiply relative shrink-0 w-[16px]" data-name="_Textarea-Scrollbar">
          <div aria-hidden="true" className="absolute border-[#9da4ae] border-l border-solid inset-0 pointer-events-none" />
          <Bar1 />
          <Spacer1 />
        </div>
        <IconTextStack1 />
        <div className="absolute bottom-[2px] flex items-center justify-center left-[2px] size-[12px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="overflow-clip relative size-[12px]" data-name=".Resize handler">
              <div className="absolute flex items-center justify-center left-[2px] size-[7.778px] top-[2px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                <div className="-rotate-45 flex-none">
                  <div className="h-px relative w-[10px]" data-name="Vector 1 (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
                      <path clipRule="evenodd" d="M10 1H0V0H10V1Z" fill="var(--fill-0, #0D121C)" fillRule="evenodd" id="Vector 1 (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-[5.28px] size-[4.95px] top-[5.21px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                <div className="-rotate-45 flex-none">
                  <div className="h-px relative w-[6px]" data-name="Vector 2 (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1">
                      <path clipRule="evenodd" d="M6 1H0V0L6 4.37114e-08V1Z" fill="var(--fill-0, #0D121C)" fillRule="evenodd" id="Vector 2 (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0 w-full" data-name="Label">
        <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
          رفع المرفقات
        </p>
      </div>
      <p className="font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#64748b] text-[12px] text-right w-full whitespace-pre-wrap" dir="auto">
        Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.
      </p>
    </div>
  );
}

function TextWrapper5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        تصفح الملفات
      </p>
    </div>
  );
}

function Elements6() {
  return (
    <div className="absolute inset-[15.63%_13.54%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5834 13.75">
        <g>
          <g id="Icon">
            <path d={svgPaths.p284da700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p28e82e00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full">
      <p className="font-['Inter:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] tracking-[-0.3125px]" dir="auto">
        الأسئلة• هل تم إبراء ذمة محاسب الإدارة السابق أو أحد أعضائه في الاجتماع الأول بعد تغير الأعضاء؟
      </p>
      <div className="content-stretch flex flex-col h-[32px] items-end relative rounded-[4px] shrink-0 w-full" data-name="Radio Label">
        <SwitchLabel2 />
      </div>
      <div className="content-stretch flex flex-col h-[32px] items-end relative rounded-[4px] shrink-0 w-full" data-name="Radio Label">
        <SwitchLabel3 />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-end min-h-[96px] min-w-[200px] overflow-clip relative shrink-0 w-full" data-name="Textarea">
        <Label1 />
        <Contents1 />
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-end justify-end relative shrink-0 w-full" data-name="File Upload / Single">
        <Header2 />
        <div className="bg-[#1b8354] h-[32px] max-h-[32px] min-h-[32px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
          <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[12px] relative size-full">
              <TextWrapper5 />
              <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
                <Elements6 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[333px] top-[448px] w-[590px]">
      <Frame12 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute h-[850px] left-[90px] overflow-x-clip overflow-y-auto top-[204px] w-[958px]">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Loading() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Loading">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_197_18075)" id="Loading">
          <path d={svgPaths.p220bef80} fill="var(--fill-0, #F3F4F6)" id="Track" />
          <path d={svgPaths.p14586b80} fill="var(--fill-0, #1B8354)" id="Tail" />
        </g>
        <defs>
          <clipPath id="clip0_197_18075">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-full" data-name="Frame">
      <p className="font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[0] relative shrink-0 text-[#384250] text-[0px] text-[14px]" dir="auto" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
        <span className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] text-[#1b8354]" style={{ fontVariationSettings: "\'wdth\' 100, \'wght\' 400" }}>
          16/
        </span>
        <span className="leading-[20px]">16 الأسئلة المكتملة</span>
      </p>
      <Loading />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-end left-[699px] top-[108px] w-[312px]">
      <p className="font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] leading-[54px] not-italic relative shrink-0 text-[#161616] text-[24px] text-right" dir="auto">
        قم بتعبئة الأسئلة التالية
      </p>
      <Frame1 />
    </div>
  );
}

function Elements7() {
  return (
    <div className="absolute inset-[5.21%_5.21%_5.2%_5.21%]" data-name="elements">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3339">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.pfe93580} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path d={svgPaths.p13ab7f00} fill="var(--fill-0, #161616)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TextWrapper6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        احفظ كمسودة
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex items-center left-[60px] top-[108px]">
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[160px]" data-name="_footer-actions-left">
        <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] min-w-[160px] overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
          <div className="relative shrink-0 size-[32px]" data-name="Trailing icon">
            <div className="absolute inset-[16.67%]" data-name="edit-02">
              <Elements7 />
            </div>
          </div>
          <TextWrapper6 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper7() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white" dir="auto">
        التالي
      </p>
    </div>
  );
}

export default function DraftState() {
  return (
    <div className="bg-white relative size-full" data-name="Draft State">
      <Group />
      <Frame6 />
      <div className="absolute flex h-[72px] items-center justify-center left-0 top-0 w-[1440px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <Header />
        </div>
      </div>
      <Frame10 />
      <Frame7 />
      <Frame5 />
      <div className="absolute bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] overflow-clip px-[16px] right-[1244px] rounded-[4px] top-[1158px] w-[140px]" data-name="Button">
        <TextWrapper7 />
      </div>
    </div>
  );
}