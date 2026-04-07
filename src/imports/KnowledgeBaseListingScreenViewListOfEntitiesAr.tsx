import svgPaths from "./svg-idbkmjhdzm";
import imgImage from "figma:asset/ce11d6f1d697df202f437b9d02490f72fd15d5c5.png";

function Elements() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.38%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99999">
        <g>
          <path d={svgPaths.p32800680} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDown1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-down-01">
      <Elements />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center leading-[20px] not-italic relative shrink-0 text-[14px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Bold',sans-serif] relative shrink-0 text-[#161616]" dir="auto">
        أحمد محمود
      </p>
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] relative shrink-0 text-[#64748b]" dir="auto">
        مدير النظام
      </p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Avatar">
      <div className="absolute bg-white inset-0 rounded-[9999px]" data-name="bg">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[10001px]" />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[9999px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[9999px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] rounded-[10001px]" />
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Component 360">
      <ArrowDown1 />
      <Frame3 />
      <Avatar />
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[5.21%_7.28%_5.21%_7.29%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5023 21.5">
        <g>
          <path clipRule="evenodd" d={svgPaths.p249ec900} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Notification() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="notification-02">
      <Elements1 />
    </div>
  );
}

function Elements2() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.38%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 4.99999">
        <g>
          <path d={svgPaths.p32800680} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="arrow-down-01">
      <Elements2 />
    </div>
  );
}

function InputContent() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Bold',sans-serif] h-full items-start justify-between leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px]" data-name="Input Content">
      <p className="css-ew64yg relative shrink-0" dir="auto">
        العربية
      </p>
      <p className="css-ew64yg relative shrink-0" dir="auto">
        العربية
      </p>
    </div>
  );
}

function Elements3() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5006">
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

function LanguageSkill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="language-skill">
      <Elements3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0">
      <InputContent />
      <LanguageSkill />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center pl-[12px] pr-[8px] py-[8px] relative rounded-[7px] shrink-0" data-name="Input">
      <ArrowDown />
      <Frame2 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <Component />
      <Notification />
      <div className="flex h-[26px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "203.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
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

function Logo() {
  return (
    <div className="h-[58px] relative shrink-0 w-[134.316px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134.316 58">
        <g clipPath="url(#clip0_2_56197)" id="Logo">
          <path d={svgPaths.p2d43f300} fill="var(--fill-0, #36B8A0)" id="Vector" />
          <path d={svgPaths.p16d90c80} fill="var(--fill-0, #015363)" id="Vector_2" />
          <path d={svgPaths.p3c318d00} fill="var(--fill-0, #3C7FCC)" id="Vector_3" />
          <path d={svgPaths.p2fbc8d00} fill="var(--fill-0, #015363)" id="Vector_4" />
          <path d={svgPaths.p228e0200} fill="var(--fill-0, #015363)" id="Vector_5" />
          <path d={svgPaths.p146bd6c0} fill="var(--fill-0, #015363)" id="Vector_6" />
          <path d={svgPaths.p163a5370} fill="var(--fill-0, #015363)" id="Vector_7" />
          <path d={svgPaths.p1b66c700} fill="var(--fill-0, #015363)" id="Vector_8" />
          <path d={svgPaths.p26533200} fill="var(--fill-0, #015363)" id="Vector_9" />
          <path d={svgPaths.p10dc7300} fill="var(--fill-0, #015363)" id="Vector_10" />
          <path d={svgPaths.p4050180} fill="var(--fill-0, #015363)" id="Vector_11" />
          <path d={svgPaths.p279c0e80} fill="var(--fill-0, #015363)" id="Vector_12" />
          <path d={svgPaths.p6304c0} fill="var(--fill-0, #015363)" id="Vector_13" />
          <path d={svgPaths.pf1f5200} fill="var(--fill-0, #015363)" id="Vector_14" />
          <path d={svgPaths.p16adf480} fill="var(--fill-0, #015363)" id="Vector_15" />
          <path d={svgPaths.p2ad19780} fill="var(--fill-0, #015363)" id="Vector_16" />
          <path d={svgPaths.p13354d00} fill="var(--fill-0, #015363)" id="Vector_17" />
          <path d={svgPaths.pca62a00} fill="var(--fill-0, #015363)" id="Vector_18" />
          <path d={svgPaths.p1b07b900} fill="var(--fill-0, #015363)" id="Vector_19" />
          <path d={svgPaths.p4aee700} fill="var(--fill-0, #015363)" id="Vector_20" />
          <path d={svgPaths.p4e70080} fill="var(--fill-0, #015363)" id="Vector_21" />
          <path d={svgPaths.p135f5800} fill="var(--fill-0, #015363)" id="Vector_22" />
          <path d={svgPaths.pb21e700} fill="var(--fill-0, #015363)" id="Vector_23" />
          <path d={svgPaths.p3c868e00} fill="var(--fill-0, #015363)" id="Vector_24" />
          <path d={svgPaths.p2c6a1e00} fill="var(--fill-0, #015363)" id="Vector_25" />
          <path d={svgPaths.p6eef600} fill="var(--fill-0, #015363)" id="Vector_26" />
          <path d={svgPaths.pa7d4280} fill="var(--fill-0, #015363)" id="Vector_27" />
          <path d={svgPaths.p3cb57580} fill="var(--fill-0, #015363)" id="Vector_28" />
          <path d={svgPaths.p2a3fbd00} fill="var(--fill-0, #015363)" id="Vector_29" />
          <path d={svgPaths.p23c77600} fill="var(--fill-0, #015363)" id="Vector_30" />
          <path d={svgPaths.p25958570} fill="var(--fill-0, #015363)" id="Vector_31" />
          <path d={svgPaths.p7a9500} fill="var(--fill-0, #015363)" id="Vector_32" />
          <path d={svgPaths.pc2df800} fill="var(--fill-0, #015363)" id="Vector_33" />
          <path d={svgPaths.p8d16900} fill="var(--fill-0, #015363)" id="Vector_34" />
          <path d={svgPaths.p1de0d300} fill="var(--fill-0, #015363)" id="Vector_35" />
          <path d={svgPaths.p11107900} fill="var(--fill-0, #015363)" id="Vector_36" />
          <path d={svgPaths.p2db35000} fill="var(--fill-0, #015363)" id="Vector_37" />
          <path d={svgPaths.p1f083a80} fill="var(--fill-0, #015363)" id="Vector_38" />
          <path d={svgPaths.p2e615d70} fill="var(--fill-0, #015363)" id="Vector_39" />
          <path d={svgPaths.p2635dd00} fill="var(--fill-0, #015363)" id="Vector_40" />
          <path d={svgPaths.p146d8940} fill="var(--fill-0, #015363)" id="Vector_41" />
          <path d={svgPaths.p16e466c0} fill="var(--fill-0, #015363)" id="Vector_42" />
          <path d={svgPaths.p2f14f680} fill="var(--fill-0, #015363)" id="Vector_43" />
          <path d={svgPaths.p318dfd00} fill="var(--fill-0, #015363)" id="Vector_44" />
          <path d={svgPaths.p29097000} fill="var(--fill-0, #015363)" id="Vector_45" />
          <path d={svgPaths.p35cdf800} fill="var(--fill-0, #015363)" id="Vector_46" />
          <path d={svgPaths.p32154400} fill="var(--fill-0, #015363)" id="Vector_47" />
          <path d={svgPaths.p3a175880} fill="var(--fill-0, #015363)" id="Vector_48" />
          <path d={svgPaths.p453d870} fill="var(--fill-0, #015363)" id="Vector_49" />
          <path d={svgPaths.p128ed300} fill="var(--fill-0, #015363)" id="Vector_50" />
          <path d={svgPaths.p2f822100} fill="var(--fill-0, #015363)" id="Vector_51" />
          <path d={svgPaths.p4194d80} fill="var(--fill-0, #015363)" id="Vector_52" />
          <path d={svgPaths.p1b052140} fill="var(--fill-0, #015363)" id="Vector_53" />
          <path d={svgPaths.p4a83c00} fill="var(--fill-0, #015363)" id="Vector_54" />
          <path d={svgPaths.p29fb5600} fill="var(--fill-0, #015363)" id="Vector_55" />
          <path d={svgPaths.p33fd6400} fill="var(--fill-0, #015363)" id="Vector_56" />
          <path d={svgPaths.p23a5e080} fill="var(--fill-0, #015363)" id="Vector_57" />
          <path d={svgPaths.p3896900} fill="var(--fill-0, #015363)" id="Vector_58" />
          <path d={svgPaths.p3e62f300} fill="var(--fill-0, #015363)" id="Vector_59" />
          <path d={svgPaths.p38774400} fill="var(--fill-0, #015363)" id="Vector_60" />
          <path d={svgPaths.p59dd100} fill="var(--fill-0, #015363)" id="Vector_61" />
          <path d={svgPaths.p2aea8400} fill="var(--fill-0, #015363)" id="Vector_62" />
          <path d={svgPaths.p7ddc700} fill="var(--fill-0, #015363)" id="Vector_63" />
          <path d={svgPaths.p27e0bb80} fill="var(--fill-0, #015363)" id="Vector_64" />
          <path d={svgPaths.p2cb1e888} fill="var(--fill-0, #015363)" id="Vector_65" />
          <path d={svgPaths.p12919a00} fill="var(--fill-0, #015363)" id="Vector_66" />
          <path d={svgPaths.p2fdc700} fill="var(--fill-0, #015363)" id="Vector_67" />
          <path d={svgPaths.p1e839000} fill="var(--fill-0, #015363)" id="Vector_68" />
          <path d={svgPaths.p9302280} fill="var(--fill-0, #015363)" id="Vector_69" />
          <path d={svgPaths.p30689900} fill="var(--fill-0, #015363)" id="Vector_70" />
          <path d={svgPaths.p24fe4a80} fill="var(--fill-0, #015363)" id="Vector_71" />
        </g>
        <defs>
          <clipPath id="clip0_2_56197">
            <rect fill="white" height="58" width="134.316" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoMenuItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-end min-h-px min-w-px relative" data-name="Logo & Menu Items">
      <Logo />
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

function NavHeaderNew() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[32px] py-[7px] relative w-[1440px]" data-name="Nav Header New">
      <div aria-hidden="true" className="absolute border-[#e6ecec] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_16px_-2px_rgba(16,24,40,0.06)]" />
      <HeaderContent />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[72px] items-center justify-center relative w-[1440px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e6ecec] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <NavHeaderNew />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[54px] items-end justify-center relative w-[908px]">
      <div className="flex flex-col font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] h-[55px] justify-center leading-[0] not-italic relative shrink-0 text-[#161616] text-[36px] text-right w-[299px]">
        <p className="css-4hzbpn leading-[13px]" dir="auto">
          قائمة المحتوى المتاح
        </p>
      </div>
    </div>
  );
}

function Elements4() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p11e0ea00} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trailing icon">
      <Elements4 />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white" dir="auto">
        إضافة محتوى
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[4px]" data-name="Button">
      <TrailingIcon />
      <TextWrapper />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex h-[54px] items-center justify-between relative shrink-0 w-full">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Frame />
        </div>
      </div>
      <div className="flex items-center justify-center max-h-[40px] min-h-[40px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Button />
        </div>
      </div>
    </div>
  );
}

function TabTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#384250] text-[14px] text-right">
        <p className="css-ew64yg leading-[20px]" dir="auto">
          المحتوي الغير نشط
        </p>
      </div>
    </div>
  );
}

function HorizontalTab() {
  return (
    <div className="content-stretch flex gap-[4px] h-[52px] items-center justify-center p-[16px] relative rounded-[4px] shrink-0" data-name="Horizontal Tab">
      <TabTitle />
    </div>
  );
}

function TabTitle1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Bold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#161616] text-[14px] text-right">
        <p className="css-ew64yg leading-[20px]" dir="auto">
          المحتوى النشط
        </p>
      </div>
    </div>
  );
}

function SelectionIndicator() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0" data-name="Selection indicator">
      <div className="bg-[#1b8354] h-[3px] rounded-[9999px] shrink-0 w-full" data-name="Selector" />
    </div>
  );
}

function HorizontalTab1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center p-[16px] relative rounded-[4px] shrink-0" data-name="Horizontal Tab">
      <TabTitle1 />
      <SelectionIndicator />
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 z-[2]" data-name="Tabs">
      <HorizontalTab />
      <HorizontalTab1 />
    </div>
  );
}

function HorizontalTabList() {
  return (
    <div className="content-stretch flex isolate items-center justify-end relative w-[1120px]" data-name="Horizontal Tab List">
      <Tabs />
      <div className="absolute bg-[#d2d6db] bottom-0 h-[3px] left-[3px] right-0 rounded-[9999px] z-[1]" data-name="Divider" />
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        تصفية
      </p>
    </div>
  );
}

function Elements5() {
  return (
    <div className="absolute inset-[9.37%_9.38%_9.35%_9.38%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5054">
        <g>
          <path clipRule="evenodd" d={svgPaths.p38cd2200} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function LeadingIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Leading Icon">
      <Elements5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] overflow-clip px-[16px] relative rounded-[4px] shrink-0 w-[130px]" data-name="Button">
      <TextWrapper1 />
      <LeadingIcon />
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        بحث
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <TextWrapper2 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px]" dir="auto">
        بحث باسم الكيان، رقم التسجيل
      </p>
    </div>
  );
}

function Elements6() {
  return (
    <div className="relative size-full" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
        <g>
          <path clipRule="evenodd" d={svgPaths.p1b34000} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function LeadingIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
      <div className="absolute flex inset-[5.21%] items-center justify-center">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] size-[17.917px]">
          <Elements6 />
        </div>
      </div>
    </div>
  );
}

function IconTextStack() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pl-[8px] pr-[16px] relative size-full">
          <Text />
          <LeadingIcon1 />
        </div>
      </div>
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Input Field">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <IconTextStack />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end overflow-clip relative w-full" data-name="Text Input">
      <InputField />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative w-full">
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function AdvancedFilters() {
  return (
    <div className="content-stretch flex gap-[16px] h-[37px] items-start justify-end relative w-[1104px]" data-name="Advanced Filters">
      <Button1 />
      <Button2 />
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[532px] items-center justify-end relative w-full">
      <div className="flex flex-col font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] relative shrink-0 text-[#161616] text-[0px] text-right w-[240px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        <p className="css-4hzbpn text-[14px]" dir="auto">
          <span className="leading-[20px]">عدد السجلات في الجدول:</span>
          <span className="font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[20px] text-[#1b8354]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>{` 300`}</span>
        </p>
      </div>
    </div>
  );
}

function TextWrapper3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        اسم المحتوى
      </p>
    </div>
  );
}

function CellContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper3 />
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[180px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent />
    </div>
  );
}

function TextWrapper4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right" dir="auto">
        اسم مستوى المحتوى
      </p>
    </div>
  );
}

function CellContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper4 />
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent1 />
    </div>
  );
}

function TextWrapper5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        نوع الجهة
      </p>
    </div>
  );
}

function CellContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper5 />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[130px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent2 />
    </div>
  );
}

function TextWrapper6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right" dir="auto">
        حجم الجهة
      </p>
    </div>
  );
}

function CellContent3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper6 />
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent3 />
    </div>
  );
}

function TextWrapper7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        فرع المحتوى
      </p>
    </div>
  );
}

function CellContent4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper7 />
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[135px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent4 />
    </div>
  );
}

function TextWrapper8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        الجمهور
      </p>
    </div>
  );
}

function CellContent5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper8 />
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[125px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent5 />
    </div>
  );
}

function TextWrapper9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        تاريخ الأرشفة
      </p>
    </div>
  );
}

function CellContent6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper9 />
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[125px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent6 />
    </div>
  );
}

function TextWrapper10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#384250] text-[12px] text-right w-full" dir="auto">
        الإجراء
      </p>
    </div>
  );
}

function CellContent7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper10 />
    </div>
  );
}

function TableHeaderCell7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative w-[134px]" data-name="Table Header Cell">
      <div className="absolute bg-[#d2d6db] bottom-0 left-0 top-0 w-px" data-name="Col divider" />
      <CellContent7 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#f3f4f6] relative shrink-0 w-full" data-name="Table Header">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell1 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell2 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell3 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell4 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell5 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell6 />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <TableHeaderCell7 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d2d6db] border-b border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function TextWrapper11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper11 />
    </div>
  );
}

function TableRowCell() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent8 />
    </div>
  );
}

function TextWrapper12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper12 />
    </div>
  );
}

function TableRowCell1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent9 />
    </div>
  );
}

function TextWrapper13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper13 />
    </div>
  );
}

function TableRowCell2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent10 />
    </div>
  );
}

function StatusTag() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent11() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag />
    </div>
  );
}

function TableRowCell3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent11 />
    </div>
  );
}

function TextWrapper14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper14 />
    </div>
  );
}

function TableRowCell4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent12 />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent13() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag />
    </div>
  );
}

function TableRowCell5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent13 />
    </div>
  );
}

function TextWrapper15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper15 />
    </div>
  );
}

function TableRowCell6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent14 />
    </div>
  );
}

function Elements7() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements7 />
    </div>
  );
}

function TextWrapper16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon1 />
      <TextWrapper16 />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction />
    </div>
  );
}

function CellContent15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons />
    </div>
  );
}

function TableRowCell7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent15 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell1 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell2 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell3 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell4 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell5 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell6 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell7 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper17 />
    </div>
  );
}

function TableRowCell8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent16 />
    </div>
  );
}

function TextWrapper18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper18 />
    </div>
  );
}

function TableRowCell9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent17 />
    </div>
  );
}

function TextWrapper19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper19 />
    </div>
  );
}

function TableRowCell10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent18 />
    </div>
  );
}

function StatusTag1() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent19() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag1 />
    </div>
  );
}

function TableRowCell11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent19 />
    </div>
  );
}

function TextWrapper20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper20 />
    </div>
  );
}

function TableRowCell12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent20 />
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent21() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag1 />
    </div>
  );
}

function TableRowCell13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent21 />
    </div>
  );
}

function TextWrapper21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper21 />
    </div>
  );
}

function TableRowCell14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent22 />
    </div>
  );
}

function Elements8() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements8 />
    </div>
  );
}

function TextWrapper22() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction1() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon2 />
      <TextWrapper22 />
    </div>
  );
}

function ActionButtons1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction1 />
    </div>
  );
}

function CellContent23() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons1 />
    </div>
  );
}

function TableRowCell15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent23 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell8 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell9 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell10 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell11 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell12 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell13 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell14 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell15 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper23 />
    </div>
  );
}

function TableRowCell16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent24 />
    </div>
  );
}

function TextWrapper24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper24 />
    </div>
  );
}

function TableRowCell17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent25 />
    </div>
  );
}

function TextWrapper25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper25 />
    </div>
  );
}

function TableRowCell18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent26 />
    </div>
  );
}

function StatusTag2() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent27() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag2 />
    </div>
  );
}

function TableRowCell19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent27 />
    </div>
  );
}

function TextWrapper26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper26 />
    </div>
  );
}

function TableRowCell20() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent28 />
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent29() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag2 />
    </div>
  );
}

function TableRowCell21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent29 />
    </div>
  );
}

function TextWrapper27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper27 />
    </div>
  );
}

function TableRowCell22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent30 />
    </div>
  );
}

function Elements9() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements9 />
    </div>
  );
}

function TextWrapper28() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction2() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon3 />
      <TextWrapper28 />
    </div>
  );
}

function ActionButtons2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction2 />
    </div>
  );
}

function CellContent31() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons2 />
    </div>
  );
}

function TableRowCell23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent31 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell16 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell17 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell18 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell19 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell20 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell21 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell22 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell23 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper29 />
    </div>
  );
}

function TableRowCell24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent32 />
    </div>
  );
}

function TextWrapper30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper30 />
    </div>
  );
}

function TableRowCell25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent33 />
    </div>
  );
}

function TextWrapper31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper31 />
    </div>
  );
}

function TableRowCell26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent34 />
    </div>
  );
}

function StatusTag3() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent35() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag3 />
    </div>
  );
}

function TableRowCell27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent35 />
    </div>
  );
}

function TextWrapper32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper32 />
    </div>
  );
}

function TableRowCell28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent36 />
    </div>
  );
}

function Tag3() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent37() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag3 />
    </div>
  );
}

function TableRowCell29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent37 />
    </div>
  );
}

function TextWrapper33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper33 />
    </div>
  );
}

function TableRowCell30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent38 />
    </div>
  );
}

function Elements10() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements10 />
    </div>
  );
}

function TextWrapper34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction3() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon4 />
      <TextWrapper34 />
    </div>
  );
}

function ActionButtons3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction3 />
    </div>
  );
}

function CellContent39() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons3 />
    </div>
  );
}

function TableRowCell31() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent39 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell24 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell25 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell26 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell27 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell28 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell29 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell30 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell31 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper35 />
    </div>
  );
}

function TableRowCell32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent40 />
    </div>
  );
}

function TextWrapper36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper36 />
    </div>
  );
}

function TableRowCell33() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent41 />
    </div>
  );
}

function TextWrapper37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper37 />
    </div>
  );
}

function TableRowCell34() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent42 />
    </div>
  );
}

function StatusTag4() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent43() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag4 />
    </div>
  );
}

function TableRowCell35() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent43 />
    </div>
  );
}

function TextWrapper38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper38 />
    </div>
  );
}

function TableRowCell36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent44 />
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent45() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag4 />
    </div>
  );
}

function TableRowCell37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent45 />
    </div>
  );
}

function TextWrapper39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper39 />
    </div>
  );
}

function TableRowCell38() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent46 />
    </div>
  );
}

function Elements11() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements11 />
    </div>
  );
}

function TextWrapper40() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction4() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon5 />
      <TextWrapper40 />
    </div>
  );
}

function ActionButtons4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction4 />
    </div>
  );
}

function CellContent47() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons4 />
    </div>
  );
}

function TableRowCell39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent47 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell32 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell33 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell34 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell35 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell36 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell37 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell38 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell39 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper41 />
    </div>
  );
}

function TableRowCell40() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent48 />
    </div>
  );
}

function TextWrapper42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper42 />
    </div>
  );
}

function TableRowCell41() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent49 />
    </div>
  );
}

function TextWrapper43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper43 />
    </div>
  );
}

function TableRowCell42() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent50 />
    </div>
  );
}

function StatusTag5() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent51() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag5 />
    </div>
  );
}

function TableRowCell43() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent51 />
    </div>
  );
}

function TextWrapper44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper44 />
    </div>
  );
}

function TableRowCell44() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent52 />
    </div>
  );
}

function Tag5() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent53() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag5 />
    </div>
  );
}

function TableRowCell45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent53 />
    </div>
  );
}

function TextWrapper45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper45 />
    </div>
  );
}

function TableRowCell46() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent54 />
    </div>
  );
}

function Elements12() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements12 />
    </div>
  );
}

function TextWrapper46() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction5() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon6 />
      <TextWrapper46 />
    </div>
  );
}

function ActionButtons5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction5 />
    </div>
  );
}

function CellContent55() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons5 />
    </div>
  );
}

function TableRowCell47() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent55 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell40 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell41 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell42 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell43 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell44 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell45 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell46 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell47 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper47 />
    </div>
  );
}

function TableRowCell48() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent56 />
    </div>
  );
}

function TextWrapper48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper48 />
    </div>
  );
}

function TableRowCell49() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent57 />
    </div>
  );
}

function TextWrapper49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper49 />
    </div>
  );
}

function TableRowCell50() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent58 />
    </div>
  );
}

function StatusTag6() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent59() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag6 />
    </div>
  );
}

function TableRowCell51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent59 />
    </div>
  );
}

function TextWrapper50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent60() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper50 />
    </div>
  );
}

function TableRowCell52() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent60 />
    </div>
  );
}

function Tag6() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent61() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag6 />
    </div>
  );
}

function TableRowCell53() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent61 />
    </div>
  );
}

function TextWrapper51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper51 />
    </div>
  );
}

function TableRowCell54() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent62 />
    </div>
  );
}

function Elements13() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements13 />
    </div>
  );
}

function TextWrapper52() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction6() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon7 />
      <TextWrapper52 />
    </div>
  );
}

function ActionButtons6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction6 />
    </div>
  );
}

function CellContent63() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons6 />
    </div>
  );
}

function TableRowCell55() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent63 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell48 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell49 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell50 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell51 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell52 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell53 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell54 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell55 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper53 />
    </div>
  );
}

function TableRowCell56() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent64 />
    </div>
  );
}

function TextWrapper54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper54 />
    </div>
  );
}

function TableRowCell57() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent65 />
    </div>
  );
}

function TextWrapper55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper55 />
    </div>
  );
}

function TableRowCell58() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent66 />
    </div>
  );
}

function StatusTag7() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent67() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag7 />
    </div>
  );
}

function TableRowCell59() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent67 />
    </div>
  );
}

function TextWrapper56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper56 />
    </div>
  );
}

function TableRowCell60() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent68 />
    </div>
  );
}

function Tag7() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent69() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag7 />
    </div>
  );
}

function TableRowCell61() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent69 />
    </div>
  );
}

function TextWrapper57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper57 />
    </div>
  );
}

function TableRowCell62() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent70 />
    </div>
  );
}

function Elements14() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements14 />
    </div>
  );
}

function TextWrapper58() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction7() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon8 />
      <TextWrapper58 />
    </div>
  );
}

function ActionButtons7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction7 />
    </div>
  );
}

function CellContent71() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons7 />
    </div>
  );
}

function TableRowCell63() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent71 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell56 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell57 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell58 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell59 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell60 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell61 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell62 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell63 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        محتوى جديد
      </p>
    </div>
  );
}

function CellContent72() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper59 />
    </div>
  );
}

function TableRowCell64() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[180px]" data-name="Table Row Cell">
      <CellContent72 />
    </div>
  );
}

function TextWrapper60() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        مستوى أول
      </p>
    </div>
  );
}

function CellContent73() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper60 />
    </div>
  );
}

function TableRowCell65() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[145px]" data-name="Table Row Cell">
      <CellContent73 />
    </div>
  );
}

function TextWrapper61() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        جمعية خيرية
      </p>
    </div>
  );
}

function CellContent74() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper61 />
    </div>
  );
}

function TableRowCell66() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent74 />
    </div>
  );
}

function StatusTag8() {
  return (
    <div className="bg-[#fffaeb] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#93370d] text-[14px] text-right" dir="auto">
        متوسطة
      </p>
      <div className="relative shrink-0 size-[10px]" data-name="Status indicator">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(147, 55, 13, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <circle cx="5" cy="5" fill="var(--fill-0, #93370D)" id="Status indicator" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CellContent75() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <StatusTag8 />
    </div>
  );
}

function TableRowCell67() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[130px]" data-name="Table Row Cell">
      <CellContent75 />
    </div>
  );
}

function TextWrapper62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right w-full" dir="auto">
        نموذج تقييم
      </p>
    </div>
  );
}

function CellContent76() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper62 />
    </div>
  );
}

function TableRowCell68() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[8px] relative w-[135px]" data-name="Table Row Cell">
      <CellContent76 />
    </div>
  );
}

function Tag8() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[24px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1f2a37] text-[12px] text-center" dir="auto">
        وسم
      </p>
    </div>
  );
}

function CellContent77() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Cell content">
      <Tag8 />
    </div>
  );
}

function TableRowCell69() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative" data-name="Table Row Cell">
      <CellContent77 />
    </div>
  );
}

function TextWrapper63() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px] text-right" dir="auto">
        11/1/2026
      </p>
    </div>
  );
}

function CellContent78() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-h-px min-w-px relative" data-name="Cell content">
      <TextWrapper63 />
    </div>
  );
}

function TableRowCell70() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[125px]" data-name="Table Row Cell">
      <CellContent78 />
    </div>
  );
}

function Elements15() {
  return (
    <div className="absolute inset-[23.75%_33.71%_3.75%_53.67%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.52461 14.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p1a88f100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p21f43980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p757ef00} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrailingIcon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Trailing icon">
      <Elements15 />
    </div>
  );
}

function TextWrapper64() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-white" dir="auto">
        إجراء
      </p>
    </div>
  );
}

function Component1stAction8() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="1st action">
      <TrailingIcon9 />
      <TextWrapper64 />
    </div>
  );
}

function ActionButtons8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action buttons">
      <Component1stAction8 />
    </div>
  );
}

function CellContent79() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Cell content">
      <ActionButtons8 />
    </div>
  );
}

function TableRowCell71() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end overflow-clip px-[16px] py-[8px] relative w-[139px]" data-name="Table Row Cell">
      <CellContent79 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell64 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell65 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell66 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell67 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell68 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[120px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell69 />
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[48px] min-w-[100px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell70 />
        </div>
      </div>
      <div className="absolute bg-[#d2d6db] bottom-0 h-px left-0 right-0" data-name="Row divider" />
      <div className="flex items-center justify-center min-h-[48px] relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <TableRowCell71 />
        </div>
      </div>
    </div>
  );
}

function Table1() {
  return (
    <div className="absolute left-0 rounded-[8px] top-0 w-[1104px]" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <TableHeader />
        <TableRow />
        <TableRow1 />
        <TableRow2 />
        <TableRow3 />
        <TableRow4 />
        <TableRow5 />
        <TableRow6 />
        <TableRow7 />
        <TableRow8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[576px] overflow-clip relative rounded-[8px] shrink-0 w-full" data-name="Table">
      <Table1 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-[671px] relative w-full" data-name="Main Content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center px-[40px] py-[32px] relative size-full">
          <Frame1 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <HorizontalTabList />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <AdvancedFilters />
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 w-full">
            <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
              <Frame5 />
            </div>
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[982px] items-start left-0 top-[72px] w-[1184px]">
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

function Elements16() {
  return (
    <div className="absolute inset-[21.88%_34.38%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.24999 11.2499">
        <g>
          <path d={svgPaths.p4034740} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function LeadingIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
      <Elements16 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <LeadingIcon2 />
    </div>
  );
}

function PaginationItem() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[32px]" data-name="_PaginationItem">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]">60</p>
    </div>
  );
}

function PaginationItem1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[32px]" data-name="_PaginationItem">
      <div aria-hidden="true" className="absolute border border-[#161616] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]">...</p>
    </div>
  );
}

function PaginationItem2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[32px]" data-name="_PaginationItem">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]">3</p>
    </div>
  );
}

function PaginationItem3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[32px]" data-name="_PaginationItem">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]">2</p>
    </div>
  );
}

function PaginationItem4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[6px] relative rounded-[4px] shrink-0 size-[32px]" data-name="_PaginationItem">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]">1</p>
      <div className="absolute bg-[#1b8354] h-[3px] left-[4px] rounded-[9999px] top-[26.5px] w-[24px]" data-name="Selector" />
    </div>
  );
}

function Elements17() {
  return (
    <div className="relative size-full" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3271 6.39003">
        <g>
          <path d={svgPaths.p25580b80} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function LeadingIcon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Leading Icon">
      <div className="absolute flex inset-[21.48%_33.66%_21.49%_33.68%] items-center justify-center">
        <div className="flex-none h-[6.39px] rotate-[269.284deg] w-[11.327px]">
          <Elements17 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] overflow-clip px-[12px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <LeadingIcon3 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[456px] top-[955px]" data-name="Pagination">
      <Button3 />
      <PaginationItem />
      <PaginationItem1 />
      <PaginationItem2 />
      <PaginationItem3 />
      <PaginationItem4 />
      <Button4 />
    </div>
  );
}

function Elements18() {
  return (
    <div className="absolute inset-[34.37%_21.87%_34.38%_21.88%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 5.00004">
        <g>
          <path d={svgPaths.p15574280} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <Elements18 />
    </div>
  );
}

function TextWrapper65() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <g id="Icon_2">
            <path d={svgPaths.p1a29ec00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p16490200} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NavDrawerItem() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <Chevron />
          <TextWrapper65 />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function TextWrapper66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function NavDrawerItem1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pl-[16px] pr-[40px] py-[8px] relative w-full">
          <TextWrapper66 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function NavDrawerItem2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pl-[16px] pr-[40px] py-[8px] relative w-full">
          <TextWrapper67 />
        </div>
      </div>
    </div>
  );
}

function TextWrapper68() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function NavDrawerItem3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end pl-[16px] pr-[40px] py-[8px] relative w-full">
          <TextWrapper68 />
        </div>
      </div>
    </div>
  );
}

function Elements19() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 5">
        <g>
          <path d={svgPaths.p21905800} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <Elements19 />
    </div>
  );
}

function TextWrapper69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <g id="Icon_2">
            <path d={svgPaths.p1a29ec00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p16490200} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NavDrawerItem4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <Chevron1 />
          <TextWrapper69 />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function NavDrawerItem5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="bg-[rgba(255,255,255,0.3)] flex-[1_0_0] h-px min-h-px min-w-px" />
        </div>
      </div>
    </div>
  );
}

function Elements20() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99992 5">
        <g>
          <path d={svgPaths.p21905800} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <Elements20 />
    </div>
  );
}

function TextWrapper70() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-h-px min-w-px relative" data-name="Text wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] justify-end leading-[0] min-h-px min-w-px relative text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          رابط
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <g id="Icon_2">
            <path d={svgPaths.p1a29ec00} fill="var(--fill-0, white)" />
            <path clipRule="evenodd" d={svgPaths.p16490200} fill="var(--fill-0, white)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NavDrawerItem6() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end px-[16px] py-[8px] relative w-full">
          <Chevron2 />
          <TextWrapper70 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function NavDrawerItem7() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Nav Drawer Item">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative w-full">
          <div className="bg-[rgba(255,255,255,0.3)] flex-[1_0_0] h-px min-h-px min-w-px" />
        </div>
      </div>
    </div>
  );
}

function DrawerItems() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Drawer Items">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col items-end pb-[80px] pt-[16px] px-[16px] relative w-full">
          <NavDrawerItem />
          <NavDrawerItem1 />
          <NavDrawerItem2 />
          <NavDrawerItem3 />
          <NavDrawerItem4 />
          <NavDrawerItem5 />
          <NavDrawerItem6 />
          <NavDrawerItem7 />
        </div>
      </div>
    </div>
  );
}

function NavDrawer() {
  return (
    <div className="absolute bg-[#074d31] content-stretch flex flex-col h-[982px] isolate items-end left-[1184px] overflow-clip top-[72px] w-[256px]" data-name="Nav Drawer">
      <DrawerItems />
    </div>
  );
}

export default function KnowledgeBaseListingScreenViewListOfEntitiesAr() {
  return (
    <div className="bg-white relative size-full" data-name="Knowledge Base- Listing screen - View list of entities - AR">
      <div className="absolute flex h-[72px] items-center justify-center left-0 top-0 w-[1440px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Header />
        </div>
      </div>
      <Frame6 />
      <Pagination />
      <NavDrawer />
    </div>
  );
}