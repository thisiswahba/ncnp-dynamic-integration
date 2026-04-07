import svgPaths from "./svg-7nt9wdw6h5";
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

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-end justify-center leading-[20px] relative shrink-0 text-[14px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Bold','Noto_Sans_Arabic:Bold',sans-serif] relative shrink-0 text-[#161616]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 700" }}>
        أحمد محمود
      </p>
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] relative shrink-0 text-[#64748b]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
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
      <Frame5 />
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
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Bold','Noto_Sans_Arabic:Bold',sans-serif] h-full items-start justify-between leading-[20px] relative shrink-0 text-[#161616] text-[14px]" data-name="Input Content">
      <p className="css-ew64yg relative shrink-0" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 700" }}>
        العربية
      </p>
      <p className="css-ew64yg relative shrink-0" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 700" }}>
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

function Frame4() {
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
      <Frame4 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <Component />
      <Notification />
      <div className="flex h-[26px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "21" } as React.CSSProperties}>
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

function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="more-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="more-vertical">
          <path d={svgPaths.p3d96f400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1a816e00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1116500} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 9L12 15L18 9" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-[50px]">
      <MoreVertical />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[3px] items-start justify-center relative shrink-0 w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        معيار ١: المعيار المالي
      </p>
    </div>
  );
}

function Elements4() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements4 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[378px]">
      <Frame18 />
      <Frame11 />
    </div>
  );
}

function TextQuestionCard() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-14.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[101px] translate-x-[-50%] w-[941px]" data-name="Text Question Card">
      <Frame20 />
      <Frame21 />
      <Frame16 />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 15L12 9L18 15" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-[50px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronDown1 />
        </div>
      </div>
    </div>
  );
}

function Plus1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[3px] items-start justify-center relative shrink-0 w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus1 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        معيار ١: المعيار المالي
      </p>
    </div>
  );
}

function Elements5() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid1() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements5 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[378px]">
      <Frame19 />
      <Frame12 />
    </div>
  );
}

function TextQuestionCard1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-14.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[763px] translate-x-[-50%] w-[941px]" data-name="Text Question Card">
      <Frame22 />
      <Frame23 />
      <Frame17 />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 15L12 9L18 15" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-[50px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function Plus2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[3px] items-start justify-center relative shrink-0 w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        معيار ١: المعيار المالي
      </p>
    </div>
  );
}

function Elements6() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid2() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements6 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid2 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[378px]">
      <Frame27 />
      <Frame13 />
    </div>
  );
}

function TextQuestionCard2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-14.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[871px] translate-x-[-50%] w-[941px]" data-name="Text Question Card">
      <Frame24 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d="M6 15L12 9L18 15" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-[50px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <ChevronDown3 />
        </div>
      </div>
    </div>
  );
}

function Plus3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[3px] items-start justify-center relative shrink-0 w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus3 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        معيار ١: المعيار المالي
      </p>
    </div>
  );
}

function Elements7() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid3() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements7 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid3 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[378px]">
      <Frame31 />
      <Frame14 />
    </div>
  );
}

function TextQuestionCard3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-14.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[979px] translate-x-[-50%] w-[941px]" data-name="Text Question Card">
      <Frame28 />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Plus4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex gap-[3px] items-start justify-center left-[310px] top-[340px] w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus4 />
    </div>
  );
}

function Plus5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex gap-[3px] items-start justify-center left-[310px] top-[448px] w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus5 />
    </div>
  );
}

function Plus6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[3px] items-start justify-center left-[66px] top-[581px] w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus6 />
    </div>
  );
}

function Plus7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex gap-[3px] items-start justify-center left-[66px] top-[681px] w-[143px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[24px] justify-center leading-[0] relative shrink-0 text-[#757575] text-[14px] text-center w-[118px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          إضافة محتوي
        </p>
      </div>
      <Plus7 />
    </div>
  );
}

function Elements8() {
  return (
    <div className="absolute inset-[5.21%_5.21%_5.2%_5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3335 14.3339">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p155c7e00} fill="var(--fill-0, #166A45)" fillRule="evenodd" />
            <path d={svgPaths.p1e70200} fill="var(--fill-0, #166A45)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Edit1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="edit-02">
      <Elements8 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center justify-center left-[340px] top-[232px] w-[106px]">
      <Edit1 />
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#02542d] text-[14px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-ew64yg leading-[20px]" dir="auto">
          عرض / تعديل
        </p>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        مؤشر ١: مؤشر مالي
      </p>
    </div>
  );
}

function Elements9() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid4() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements9 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid4 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[337px]">
      <Frame38 />
      <Frame15 />
    </div>
  );
}

function TextQuestionCard4() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] h-[76px] items-center justify-end left-[calc(50%+86px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[206px] translate-x-[-50%] w-[624px]" data-name="Text Question Card">
      <Frame37 />
    </div>
  );
}

function Elements10() {
  return (
    <div className="absolute inset-[17.71%_5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p289621c0} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3879f60} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function View() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="view">
      <Elements10 />
    </div>
  );
}

function Elements11() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.62%_-5.62%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8334 14.8334">
          <g>
            <path d="M0.75 0.75L14.0833 0.75" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3d5e4980} id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.pe180700} id="Vector_3" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p9923600} id="Vector_4" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DistributeVerticalTop() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="distribute-vertical-top">
      <Elements11 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] content-stretch flex items-center p-[4px] relative rounded-[12px] shrink-0 size-[24px]">
      <DistributeVerticalTop />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0 w-[510px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        سؤال ١: سؤال مالي
      </p>
      <Frame40 />
    </div>
  );
}

function McQuestionCardArabic() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%+52.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[314px] translate-x-[-50%] w-[543px]" data-name="MC Question Card Arabic">
      <View />
      <Frame39 />
    </div>
  );
}

function Elements12() {
  return (
    <div className="absolute inset-[17.71%_5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p289621c0} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3879f60} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function View1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="view">
      <Elements12 />
    </div>
  );
}

function Elements13() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.62%_-5.62%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8334 14.8334">
          <g>
            <path d="M0.75 0.75L14.0833 0.75" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3d5e4980} id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.pe180700} id="Vector_3" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p9923600} id="Vector_4" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DistributeVerticalTop1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="distribute-vertical-top">
      <Elements13 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] content-stretch flex items-center p-[4px] relative rounded-[12px] shrink-0 size-[24px]">
      <DistributeVerticalTop1 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0 w-[510px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        سؤال ١: سؤال مالي
      </p>
      <Frame42 />
    </div>
  );
}

function McQuestionCardArabic1() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-191.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[554px] translate-x-[-50%] w-[543px]" data-name="MC Question Card Arabic">
      <View1 />
      <Frame41 />
    </div>
  );
}

function Elements14() {
  return (
    <div className="absolute inset-[17.71%_5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p289621c0} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3879f60} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function View2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="view">
      <Elements14 />
    </div>
  );
}

function Elements15() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.62%_-5.62%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8334 14.8334">
          <g>
            <path d="M0.75 0.75L14.0833 0.75" id="Vector" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3d5e4980} id="Vector_2" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.pe180700} id="Vector_3" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p9923600} id="Vector_4" stroke="var(--stroke-0, #074D31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DistributeVerticalTop2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="distribute-vertical-top">
      <Elements15 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] content-stretch flex items-center p-[4px] relative rounded-[12px] shrink-0 size-[24px]">
      <DistributeVerticalTop2 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0 w-[510px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        سؤال ١: سؤال مالي
      </p>
      <Frame44 />
    </div>
  );
}

function McQuestionCardArabic2() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%-191.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[655px] translate-x-[-50%] w-[543px]" data-name="MC Question Card Arabic">
      <View2 />
      <Frame43 />
    </div>
  );
}

function Elements16() {
  return (
    <div className="absolute inset-[8.33%]" data-name="elements">
      <div className="absolute inset-[-5.63%_-5.63%_-5.63%_-5.62%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8333 14.8333">
          <g>
            <path d="M4.08333 0.75V14.0833" id="Vector" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M10.75 0.75V14.0833" id="Vector_2" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d={svgPaths.p355be00} id="Vector_3" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
            <path d="M14.0833 10.75L0.75 10.75" id="Vector_4" stroke="var(--stroke-0, #085D3A)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Grid5() {
  return (
    <div className="absolute left-[4px] overflow-clip size-[16px] top-[4px]" data-name="grid">
      <Elements16 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-[rgba(8,93,58,0.11)] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[12px] shrink-0 size-[24px]">
      <Grid5 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0 w-[510px]">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        ممارسة ١: ممارسة مالية
      </p>
      <Frame46 />
    </div>
  );
}

function McQuestionCardArabic3() {
  return (
    <div className="absolute bg-white content-stretch flex h-[76px] items-center justify-between left-[calc(50%+52.5px)] overflow-clip px-[16px] py-[26px] rounded-[12px] top-[422px] translate-x-[-50%] w-[543px]" data-name="MC Question Card Arabic">
      <Frame45 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#f8f9fa] h-[1093px] left-1/2 overflow-clip top-[269px] translate-x-[-50%] w-[1376px]">
      <p className="absolute css-ew64yg font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[54px] right-[391px] text-[#161616] text-[24px] top-[24px] translate-x-[100%]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        كل المعايير
      </p>
      <TextQuestionCard />
      <TextQuestionCard1 />
      <TextQuestionCard2 />
      <TextQuestionCard3 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
      <Frame35 />
      <Frame36 />
      <TextQuestionCard4 />
      <div className="absolute flex h-[117px] items-center justify-center left-[1094px] top-[131px] w-[100px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[117px] relative w-[100px]">
            <div className="absolute inset-[-0.43%_-0.5%_-3.15%_-0.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 121.182">
                <g>
                  <path d={svgPaths.p1f261880} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1c8c300} fill="var(--stroke-0, #085D3A)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[111px] items-center justify-center left-[1024px] top-[242px] w-[109px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[111px] relative w-[109px]">
            <div className="absolute inset-[-0.45%_-0.46%_-3.32%_-0.46%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 115.182">
                <g>
                  <path d={svgPaths.p1944b630} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p1be4da16} stroke="var(--stroke-0, #085D3A)" strokeDasharray="2 2" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[139px] items-center justify-center left-[1024px] top-[322px] w-[109px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[139px] relative w-[109px]">
            <div className="absolute inset-[-0.36%_-0.46%_-2.65%_-0.46%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 110 143.182">
                <path d={svgPaths.p10e33f00} fill="var(--stroke-0, #085D3A)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <McQuestionCardArabic />
      <McQuestionCardArabic1 />
      <McQuestionCardArabic2 />
      <McQuestionCardArabic3 />
      <div className="absolute flex h-[231px] items-center justify-center left-[777px] top-[458px] w-[269px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[231px] relative w-[269px]">
            <div className="absolute inset-[-0.22%_-0.19%_-1.59%_-0.19%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 235.182">
                <g>
                  <path d={svgPaths.p2d297680} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2f778780} stroke="var(--stroke-0, #085D3A)" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[134px] items-center justify-center left-[777px] top-[458px] w-[269px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[134px] relative w-[269px]">
            <div className="absolute inset-[-0.37%_-0.19%_-2.75%_-0.19%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 270 138.182">
                <g>
                  <path d={svgPaths.pd33e200} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2be12900} stroke="var(--stroke-0, #085D3A)" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Link">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#9da4ae] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        إضافة محتوي
      </p>
    </div>
  );
}

function OldChevronLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="old-chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="old-chevron-left">
          <path d="M10 12L6 8L10 4" id="Icon" stroke="var(--stroke-0, #9DA4AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbItem() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-end px-[4px] relative shrink-0 w-[46px]" data-name="_Breadcrumb Item">
      <Link />
      <OldChevronLeft />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Link">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#384250] text-[14px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        قائمة محتوي
      </p>
    </div>
  );
}

function BreadcrumbItem1() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-end pr-[4px] relative shrink-0 w-[62px]" data-name="_Breadcrumb Item">
      <Link1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center justify-end left-0 top-0 w-[215px]">
      <BreadcrumbItem />
      <BreadcrumbItem1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[215px]">
      <Frame10 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-[422px]" data-name="Frame">
      <p className="css-ew64yg font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[54px] relative shrink-0 text-[#161616] text-[36px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        إضافة محتوي لنموذج المخاطر المالية
      </p>
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#1f2a37] text-[14px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        مكتمل ذاتيًا
      </p>
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] relative rounded-[4px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#1f2a37] text-[14px] text-center" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        نموذج المخاطر
      </p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Tag />
      <Tag1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-[427px]">
      <Frame47 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col h-[131px] items-end justify-between relative shrink-0 w-full">
      <Frame9 />
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 px-[40px] py-[20px] top-0 w-[1408px]">
      <Frame2 />
    </div>
  );
}

function Elements17() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3335 14.3339">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p14453500} fill="var(--fill-0, #F3F4F6)" fillRule="evenodd" />
            <path d={svgPaths.p1e70200} fill="var(--fill-0, #F3F4F6)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Edit() {
  return (
    <div className="absolute inset-[16.67%]" data-name="edit-02">
      <Elements17 />
    </div>
  );
}

function TrailingIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Trailing icon">
      <Edit />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        تعديل اعدادات المحتوي
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] min-w-[160px] overflow-clip px-[16px] relative rounded-[4px] shrink-0" data-name="Button">
      <TrailingIcon />
      <TextWrapper />
    </div>
  );
}

function FooterActionsLeft() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[215px]" data-name="_footer-actions-left">
      <Button />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex gap-[18px] items-center left-[32px] top-[43px] w-[215px]">
      <FooterActionsLeft />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[125px] relative shrink-0 w-[1408px]">
      <Frame3 />
      <Frame48 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[151px] items-end left-[31px] top-[84px] w-[1408px]">
      <Frame6 />
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white" dir="auto">
        حفظ المحتوي المضاف
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] overflow-clip px-[16px] relative rounded-[4px] shrink-0 w-[181px]" data-name="Button">
      <TextWrapper1 />
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        إلغاء
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[40px] max-h-[40px] min-h-[40px] relative rounded-[4px] shrink-0 w-[135px]" data-name="Button">
      <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[inherit] min-h-[inherit] overflow-clip px-[16px] relative rounded-[inherit] size-full">
        <TextWrapper2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[63px] top-[1394px]">
      <Button1 />
      <Button2 />
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
      <Frame7 />
      <Frame8 />
      <Frame49 />
    </div>
  );
}