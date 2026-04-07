import svgPaths from "./svg-6oa4eflfic";

function Elements() {
  return (
    <div className="absolute inset-[21.88%_34.38%]" data-name="elements">
      <div className="absolute inset-[-6.67%_-12%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75004 12.75">
          <g>
            <path d={svgPaths.p1163ad00} fill="var(--fill-0, #384250)" id="Icon" stroke="var(--stroke-0, #384250)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check">
      <Elements />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        نموذج تقييم
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center justify-center left-0 mix-blend-multiply px-[8px] right-0 rounded-[4px]" data-name="Divider">
      <div className="bg-[#d2d6db] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Line" />
    </div>
  );
}

function DropdownListItem() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Check />
          <Text />
          <Divider />
        </div>
      </div>
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[21.88%_34.38%]" data-name="elements">
      <div className="absolute inset-[-6.67%_-12%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.75004 12.75">
          <g>
            <path d={svgPaths.p1163ad00} fill="var(--fill-0, #384250)" id="Icon" stroke="var(--stroke-0, #384250)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check">
      <Elements1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans:Regular','Noto_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px relative text-[#161616] text-[14px] text-right" dir="auto" style={{ fontVariationSettings: "'wdth' 100, 'wght' 400" }}>
        محتوى دليل
      </p>
    </div>
  );
}

function DropdownListItem1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Check1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <DropdownListItem />
        <DropdownListItem1 />
      </div>
    </div>
  );
}

function ListSectionsArabic1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-[208px]" data-name="List Sections Arabic">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Section />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]" />
    </div>
  );
}

export default function ListSectionsArabic() {
  return (
    <div className="bg-white relative rounded-[4px] size-full" data-name="List Sections Arabic">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ListSectionsArabic1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]" />
    </div>
  );
}