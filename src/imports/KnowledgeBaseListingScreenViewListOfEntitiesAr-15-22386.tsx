import svgPaths from "./svg-agzaxq2frq";
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

function Component1() {
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
      <Component1 />
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

function Elements4() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.4999 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p13287480} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p37048f00} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p2990b480} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p254ecc80} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p1667e480} fill="var(--fill-0, #161616)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function BubbleChatUpload() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="bubble-chat-upload">
      <Elements4 />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#1f2a37] text-[16px] w-full" dir="auto">
        ابدأ بإضافة محتوي داعم لهذا السؤال
      </p>
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#384250] text-[12px] w-full">اختر نوع المحتوي من القائمة علي اليسار</p>
    </div>
  );
}

function DropZone() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-full" data-name="_Drop Zone">
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center p-[24px] relative size-full">
          <BubbleChatUpload />
          <TextWrapper />
        </div>
      </div>
    </div>
  );
}

function FileUploadMultiple() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full" data-name="File Upload / Multiple">
      <DropZone />
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[456px] items-start left-[calc(50%-0.5px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[940px]">
      <FileUploadMultiple />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#f8f9fa] h-[650px] left-[calc(50%-173.5px)] overflow-clip top-[309px] translate-x-[-50%] w-[1009px]">
      <Frame45 />
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-white" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        حفظ
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] min-w-[160px] overflow-clip px-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <TextWrapper1 />
    </div>
  );
}

function FooterActionsRight() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[159px]" data-name="_footer-actions-right">
      <Button />
    </div>
  );
}

function ButtonLabelWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button label wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        إغلاق
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] min-w-[64px] px-[16px] relative rounded-[4px] shrink-0 w-[114px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ButtonLabelWrapper />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-[282px]">
      <FooterActionsRight />
      <Button1 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[282px]">
      <Frame8 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[602px]">
      <p className="css-4hzbpn font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] leading-[54px] relative shrink-0 text-[#161616] text-[36px] text-right w-[578px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        إضافة محتوي داعم
      </p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[36px] top-[40px] w-[1351px]">
      <Frame44 />
      <Frame43 />
    </div>
  );
}

function TitleHeader() {
  return (
    <div className="absolute h-[142px] left-[15px] top-[72px] w-[1409px]" data-name="Title Header">
      <Frame42 />
      <div className="absolute flex h-0 items-center justify-center left-1/2 top-[calc(50%+71px)] translate-x-[-50%] translate-y-[-50%] w-[1441px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[1441px]">
            <div className="absolute inset-[-2px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1441 4">
                <path d="M0 2H1441" id="Line 1" stroke="var(--stroke-0, #9DA4AE)" strokeOpacity="0.14" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusTag() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#085d3a] text-[14px] text-right" dir="auto">
        المؤشر المالي ١
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex isolate items-start justify-end relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] text-right w-[43px] z-[1]">
        <p className="css-4hzbpn leading-[20px]" dir="auto">{`مؤشر: `}</p>
      </div>
    </div>
  );
}

function Elements5() {
  return (
    <div className="absolute inset-[9.38%_13.54%_9.38%_5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.625 14.625">
        <g>
          <path clipRule="evenodd" d={svgPaths.p35e40ef0} fill="var(--fill-0, #6C737F)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ChartLineData() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="chart-line-data-02">
      <Elements5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ChartLineData />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <StatusTag />
      <Paragraph />
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="col-[2] content-stretch css-uwkwlr flex items-center justify-end relative row-[1] self-start shrink-0 w-[440px]" data-name="Container">
      <Frame49 />
    </div>
  );
}

function StatusTag1() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#085d3a] text-[14px] text-right" dir="auto">
        السؤال المالي ١
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex isolate items-start justify-end relative shrink-0" data-name="Paragraph">
      <div className="flex flex-col font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] text-right w-[39px] z-[1]">
        <p className="css-4hzbpn leading-[20px]" dir="auto">{`سؤال: `}</p>
      </div>
    </div>
  );
}

function Elements6() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
        <g>
          <g id="Icon">
            <path d={svgPaths.p2d3db400} fill="var(--fill-0, #6C737F)" />
            <path d={svgPaths.p252100} fill="var(--fill-0, #6C737F)" />
            <path clipRule="evenodd" d={svgPaths.p30eb5a00} fill="var(--fill-0, #6C737F)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="help-circle">
      <Elements6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <HelpCircle />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <StatusTag1 />
      <Paragraph1 />
      <Container3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-[1] content-stretch css-uwkwlr flex items-center justify-end relative row-[1] self-start shrink-0 w-[440px]" data-name="Container">
      <Frame50 />
    </div>
  );
}

function StatusTag2() {
  return (
    <div className="bg-[#ecfdf3] content-stretch flex gap-[8px] h-[24px] items-center justify-end px-[8px] relative rounded-[9999px] shrink-0" data-name="Status Tag">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#085d3a] text-[14px] text-right" dir="auto">
        المعيار المالي ١
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex isolate items-start justify-end relative shrink-0 w-[37px]" data-name="Paragraph">
      <div className="flex flex-col font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[16px] text-right w-[44px] z-[2]">
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          معيار :
        </p>
      </div>
    </div>
  );
}

function Elements7() {
  return (
    <div className="absolute inset-[5.21%_13.54%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.396 15.2292">
        <g>
          <path clipRule="evenodd" d={svgPaths.pdf23000} fill="var(--fill-0, #6C737F)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Bookmark() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="bookmark-02">
      <Elements7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Bookmark />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <StatusTag2 />
      <Paragraph2 />
      <Container5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="col-[3] content-stretch css-uwkwlr flex items-center justify-end relative row-[1] self-start shrink-0 w-[440px]" data-name="Container">
      <Frame51 />
    </div>
  );
}

function HelperText() {
  return (
    <div className="absolute grid-cols-[repeat(3,_fit-content(100%))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[37.5px] inline-grid left-1/2 py-[4px] top-[238px] translate-x-[-50%]" data-name="Helper Text">
      <Container />
      <Container2 />
      <Container4 />
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute bg-[#f8f9fa] content-stretch flex h-[51px] items-center justify-end left-px px-[18px] py-[14px] top-0 w-[319px]" data-name="Header">
      <p className="css-ew64yg font-['IBM_Plex_Sans:Medium','Noto_Sans_Arabic:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#1e1e1e] text-[16px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}>
        إضافة محتوي
      </p>
    </div>
  );
}

function Frame11() {
  return <div className="h-[46px] shrink-0 w-[283px]" />;
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[19px] top-[76px] w-[283px]">
      <Frame11 />
    </div>
  );
}

function Check() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements8() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check />
      <PlusSignCircle />
    </div>
  );
}

function Elements9() {
  return (
    <div className="absolute inset-[13.54%_21.88%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.5625 12.3959">
        <g>
          <path d={svgPaths.p1e892080} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="heading">
      <Elements9 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[213px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        عنوان
      </p>
      <Heading />
    </div>
  );
}

function Frame14() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[247px] rounded-[12px] size-[26px] top-[8px]" />;
}

function Frame7() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame3 />
      <Frame46 />
      <Frame14 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame7 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame13 />
    </div>
  );
}

function Check1() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements10() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle1() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements10 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check1 />
      <PlusSignCircle1 />
    </div>
  );
}

function Elements11() {
  return (
    <div className="absolute inset-[9.38%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8125 13.8125">
        <g>
          <g id="Icon">
            <path d={svgPaths.p3f61ae00} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p2d4c0500} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p21babe00} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p3c8f5a00} fill="var(--fill-0, #161616)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TextAlignRight() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="text-align-right">
      <Elements11 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <TextAlignRight />
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[220px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        نص
      </p>
      <Frame52 />
    </div>
  );
}

function Frame17() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[246px] rounded-[12px] size-[26px] top-[7px]" />;
}

function Frame9() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame4 />
      <Frame47 />
      <Frame17 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame9 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame16 />
    </div>
  );
}

function Check2() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements12() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle2() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements12 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check2 />
      <PlusSignCircle2 />
    </div>
  );
}

function Elements13() {
  return (
    <div className="absolute inset-[17.71%_13.54%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3958 10.9792">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38129f80} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p150d0b80} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p12956a00} fill="var(--fill-0, #161616)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="menu-01">
      <Elements13 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[213px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        قائمة
      </p>
      <Menu />
    </div>
  );
}

function Frame21() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[245px] rounded-[12px] size-[26px] top-[8px]" />;
}

function Frame20() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame5 />
      <Frame53 />
      <Frame21 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame20 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame19 />
    </div>
  );
}

function Check3() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements14() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle3() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements14 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check3 />
      <PlusSignCircle3 />
    </div>
  );
}

function Elements15() {
  return (
    <div className="absolute inset-[7.29%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.521 14.5209">
        <g>
          <path clipRule="evenodd" d={svgPaths.p1eae1c80} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function GridTable() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="grid-table">
      <Elements15 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[210px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        جدول
      </p>
      <GridTable />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame6 />
      <Frame54 />
    </div>
  );
}

function Frame25() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[245px] rounded-[12px] size-[26px] top-[9px]" />;
}

function Frame23() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame23 />
    </div>
  );
}

function Check4() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements16() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle4() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements16 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check4 />
      <PlusSignCircle4 />
    </div>
  );
}

function Elements17() {
  return (
    <div className="absolute inset-[7.29%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.521 14.5209">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p2093fd80} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2197da00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="image-01">
      <Elements17 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[212px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        صورة
      </p>
      <Image />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame30 />
      <Frame55 />
    </div>
  );
}

function Frame31() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[245px] rounded-[12px] size-[26px] top-[8px]" />;
}

function Frame28() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame29 />
      <Frame31 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame28 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame27 />
    </div>
  );
}

function Check5() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements18() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle5() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements18 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check5 />
      <PlusSignCircle5 />
    </div>
  );
}

function Pdf() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="pdf-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="pdf-02">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p26cfdf00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p30830a00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path d={svgPaths.p3fe38400} fill="var(--fill-0, #161616)" />
            <path clipRule="evenodd" d={svgPaths.p103baf00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[189px] top-[12px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        ملف PDF
      </p>
      <Pdf />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame35 />
      <Frame56 />
    </div>
  );
}

function Frame36() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[246px] rounded-[12px] size-[26px] top-[9px]" />;
}

function Frame33() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame34 />
      <Frame36 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame33 />
    </div>
  );
}

function Check6() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="check" />
      </svg>
    </div>
  );
}

function Elements19() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <g>
          <g id="Icon">
            <path d={svgPaths.p38b7580} fill="var(--fill-0, #1B8354)" />
            <path clipRule="evenodd" d={svgPaths.p3032e272} fill="var(--fill-0, #1B8354)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PlusSignCircle6() {
  return (
    <div className="absolute left-[-4px] size-[24px] top-[-4px]" data-name="plus-sign-circle">
      <Elements19 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute h-[16px] left-[19px] top-1/2 translate-y-[-50%] w-[253px]">
      <Check6 />
      <PlusSignCircle6 />
    </div>
  );
}

function Elements20() {
  return (
    <div className="absolute inset-[5.21%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2293 15.2292">
        <g>
          <g id="Icon">
            <path d={svgPaths.p215900} fill="var(--fill-0, #161616)" />
            <path d={svgPaths.p26458700} fill="var(--fill-0, #161616)" />
            <path clipRule="evenodd" d={svgPaths.p3494ae00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HelpCircle1() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="help-circle">
      <Elements20 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[167px] top-[13px]">
      <p className="css-ew64yg font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] text-black text-center tracking-[0.5px]" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        سؤال و جواب
      </p>
      <HelpCircle1 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="absolute bg-white border border-[#d2d6db] border-solid h-[46px] left-0 overflow-clip rounded-[8px] top-0 w-[283px]">
      <Frame40 />
      <Frame57 />
    </div>
  );
}

function Frame41() {
  return <div className="absolute bg-[rgba(8,93,58,0.11)] left-[244px] rounded-[12px] size-[26px] top-[9px]" />;
}

function Frame38() {
  return (
    <div className="h-[46px] relative shrink-0 w-[283px]">
      <Frame39 />
      <Frame41 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[283px]">
      <Frame38 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[19px] top-[72px] w-[283px]">
      <Frame12 />
      <Frame15 />
      <Frame18 />
      <Frame22 />
      <Frame26 />
      <Frame32 />
      <Frame37 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white h-[550px] left-[1078px] overflow-clip rounded-[12px] top-[309px] w-[320px]" data-name="قائمة">
      <Header1 />
      <Frame10 />
      <Frame48 />
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
      <Frame2 />
      <TitleHeader />
      <HelperText />
      <Component />
    </div>
  );
}