import svgPaths from "./svg-nxarfkri94";
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

function Frame1() {
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
      <Frame1 />
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

function Frame() {
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
      <Frame />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <Component />
      <Notification />
      <div className="flex h-[26px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "300", "--transform-inner-height": "203.5" } as React.CSSProperties}>
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

function Elements4() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2499 6.25">
        <g>
          <path d={svgPaths.p315d7300} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron">
      <Elements4 />
    </div>
  );
}

function TabTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#161616] text-[16px] text-right">
        <p className="css-ew64yg leading-[24px]" dir="auto">
          تبويب
        </p>
      </div>
    </div>
  );
}

function HeaderMenuItem() {
  return (
    <div className="content-stretch flex gap-[4px] h-[72px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Header Menu Item">
      <Chevron />
      <TabTitle />
    </div>
  );
}

function Elements5() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2499 6.25">
        <g>
          <path d={svgPaths.p315d7300} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron">
      <Elements5 />
    </div>
  );
}

function TabTitle1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#161616] text-[16px] text-right">
        <p className="css-ew64yg leading-[24px]" dir="auto">
          تبويب
        </p>
      </div>
    </div>
  );
}

function HeaderMenuItem1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[72px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Header Menu Item">
      <Chevron1 />
      <TabTitle1 />
    </div>
  );
}

function TabTitle2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#161616] text-[16px] text-right">
        <p className="css-ew64yg leading-[24px]" dir="auto">
          تبويب
        </p>
      </div>
    </div>
  );
}

function HeaderMenuItem2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[72px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Header Menu Item">
      <TabTitle2 />
    </div>
  );
}

function TabTitle3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#161616] text-[16px] text-right">
        <p className="css-ew64yg leading-[24px]" dir="auto">
          نماذج الإفصاح
        </p>
      </div>
    </div>
  );
}

function HeaderMenuItem3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[72px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Header Menu Item">
      <TabTitle3 />
    </div>
  );
}

function TabTitle4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Tab title">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#015363] text-[16px] text-right">
        <p className="css-ew64yg leading-[24px]" dir="auto">
          القوائم المالية
        </p>
      </div>
    </div>
  );
}

function SelectionIndicator() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 px-[8px] right-[-3px] top-[66px]" data-name="Selection indicator">
      <div className="bg-[#1b8254] h-[6px] rounded-[9999px] shrink-0 w-full" data-name="Selector" />
    </div>
  );
}

function HeaderMenuItem4() {
  return (
    <div className="bg-[#eaf2ee] content-stretch flex gap-[4px] h-[72px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Header Menu Item">
      <TabTitle4 />
      <SelectionIndicator />
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Menu Items">
      <HeaderMenuItem />
      <HeaderMenuItem1 />
      <HeaderMenuItem2 />
      <HeaderMenuItem3 />
      <HeaderMenuItem4 />
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[58px] relative shrink-0 w-[134.316px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134.316 58">
        <g clipPath="url(#clip0_132_1699)" id="Logo">
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
          <clipPath id="clip0_132_1699">
            <rect fill="white" height="58" width="134.316" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoMenuItems() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[32px] items-center justify-end min-h-px min-w-px relative" data-name="Logo & Menu Items">
      <MenuItems />
      <Logo />
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1376px]" data-name="Header Content">
      <Actions />
      <LogoMenuItems />
    </div>
  );
}

export default function NavHeaderNew() {
  return (
    <div className="bg-white content-stretch flex flex-col items-end justify-between px-[32px] py-[7px] relative size-full" data-name="Nav Header New">
      <div aria-hidden="true" className="absolute border-[#e6ecec] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_16px_0px_rgba(16,24,40,0.06)]" />
      <HeaderContent />
    </div>
  );
}