import svgPaths from "./svg-x0yq85zhec";

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-end leading-[0] right-[283px] text-right text-white top-[40px] w-[142px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-end w-full relative shrink-0 text-[14px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px] text-right" dir="auto">
          نوع المنظمة
        </p>
      </div>
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:SemiBold','Noto_Sans_Arabic:SemiBold',sans-serif] justify-end w-full relative shrink-0 text-[18px]" style={{ fontVariationSettings: "'wdth' 100, 'wght' 600" }}>
        <p className="css-ew64yg leading-[20px] text-right" dir="auto">
          اسم المنظمة
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#1b8254] h-[90px] left-0 overflow-clip top-0 w-full">
      <Frame1 />
    </div>
  );
}

function LogoAgsLogo() {
  return (
    <div className="absolute h-[32px] right-[163px] overflow-clip top-[74px] w-[75px]" data-name="LogoAGS logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 32">
        <g id="Group">
          <path d={svgPaths.p2e78dc80} fill="var(--fill-0, #1A171B)" id="Vector" />
          <path d={svgPaths.p49efc00} fill="var(--fill-0, #1A171B)" id="Vector_2" />
          <path d={svgPaths.pbb62b80} fill="var(--fill-0, #1A171B)" id="Vector_3" />
          <path d={svgPaths.p3b42d500} fill="var(--fill-0, #1A171B)" id="Vector_4" />
          <path d={svgPaths.p1277c680} fill="var(--fill-0, #1A171B)" id="Vector_5" />
          <path d={svgPaths.pfb2d900} fill="var(--fill-0, #1A171B)" id="Vector_6" />
          <path d={svgPaths.p318bd200} fill="var(--fill-0, #1A171B)" id="Vector_7" />
          <path d={svgPaths.p2fa39b80} fill="var(--fill-0, #1A171B)" id="Vector_8" />
          <path d={svgPaths.p26e46300} fill="var(--fill-0, #1A171B)" id="Vector_9" />
          <path d={svgPaths.p160103f0} fill="var(--fill-0, #1A171B)" id="Vector_10" />
          <path d={svgPaths.p3ef10700} fill="var(--fill-0, #1A171B)" id="Vector_11" />
          <path d={svgPaths.pa4be80} fill="var(--fill-0, #1A171B)" id="Vector_12" />
          <path d={svgPaths.p356fda00} fill="var(--fill-0, #1A171B)" id="Vector_13" />
          <path d={svgPaths.p3ee90580} fill="var(--fill-0, #1A171B)" id="Vector_14" />
          <path d={svgPaths.p2b2a2a80} fill="var(--fill-0, #1A171B)" id="Vector_15" />
          <path d={svgPaths.p96ebd00} fill="var(--fill-0, #1A171B)" id="Vector_16" />
          <path d={svgPaths.p1984cf00} fill="var(--fill-0, #878889)" id="Vector_17" />
          <path d={svgPaths.p1f66a000} fill="var(--fill-0, #878889)" id="Vector_18" />
          <path d={svgPaths.p313580} fill="var(--fill-0, #878889)" id="Vector_19" />
          <path d={svgPaths.p34cbf480} fill="var(--fill-0, #1A171B)" id="Vector_20" />
          <path d={svgPaths.p2eeb8ec0} fill="var(--fill-0, #009EE0)" id="Vector_21" />
          <path d={svgPaths.p1f320dc0} fill="var(--fill-0, #E2001A)" id="Vector_22" />
          <path d={svgPaths.p26210300} fill="var(--fill-0, #1A171B)" id="Vector_23" />
          <path d={svgPaths.p36d26b00} fill="var(--fill-0, #E2001A)" id="Vector_24" />
          <path d={svgPaths.p3acb7000} fill="var(--fill-0, #1A171B)" id="Vector_25" />
          <path d={svgPaths.p13271b00} fill="var(--fill-0, #FFE400)" id="Vector_26" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col items-end leading-[0] right-[9px] text-right top-[4px] w-[138px]">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] justify-end relative shrink-0 text-[#6c737f] text-[12px] w-full" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        <p className="css-4hzbpn leading-[20px]" dir="auto">
          الرقم الوطني للمنظمة
        </p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-end not-italic relative shrink-0 text-[#161616] text-[14px] w-full">
        <p className="css-4hzbpn leading-[20px]">123234243424324</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute right-[283px] top-[102px] h-[45px] w-[156px]">
      <div className="absolute bg-white border border-[#d2d6db] border-solid h-full w-full rounded-[8px]" data-name="Background" />
      <Frame2 />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Frame />
      <div className="absolute bg-white border border-[#d2d6db] border-solid h-[113px] right-[141px] rounded-[8px] top-[34px] w-[123px]" />
      <LogoAgsLogo />
      <Group />
    </div>
  );
}