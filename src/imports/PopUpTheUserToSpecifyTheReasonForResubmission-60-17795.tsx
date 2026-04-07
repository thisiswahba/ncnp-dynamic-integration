import svgPaths from "./svg-s8i19u32b";

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-full" data-name="Text and supporting text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:SemiBold',sans-serif] leading-[28px] min-h-px min-w-px not-italic relative text-[#1f2a37] text-[18px] text-right" dir="auto">
        إضافة محتوي جديد
      </p>
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="_Modal Header">
      <TextAndSupportingText />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Label">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-right" dir="auto">
        اسم النموذج
      </p>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Label">
      <Label1 />
    </div>
  );
}

function Elements() {
  return (
    <div className="absolute inset-[34.38%_21.88%_34.37%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2499 6.25">
        <g>
          <path d={svgPaths.p3b3a1a80} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Chevron">
      <Elements />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px]" dir="auto">
        &nbsp;
      </p>
    </div>
  );
}

function IconTextStack() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-end px-[16px] relative size-full">
          <Chevron />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]" data-name="Contents">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <IconTextStack />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function DropdownField() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-end min-w-[200px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Dropdown Field">
      <Contents />
    </div>
  );
}

function DropdownInput() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end min-h-[40px] min-w-[200px] relative shrink-0 w-full" data-name="Dropdown Input">
      <Label />
      <DropdownField />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Label">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-right" dir="auto">
        الجمهور
      </p>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Label">
      <Label3 />
    </div>
  );
}

function Elements1() {
  return (
    <div className="absolute inset-[34.37%_21.87%_34.38%_21.88%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2499 6.25002">
        <g>
          <path d={svgPaths.p3f085972} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative size-[20px]" data-name="Chevron">
      <Elements1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px]" dir="auto">
        جمهور ١
      </p>
    </div>
  );
}

function IconTextStack1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-end px-[16px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <Chevron1 />
            </div>
          </div>
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Contents1() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]" data-name="Contents">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <IconTextStack1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function DropdownField1() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-end min-w-[200px] overflow-clip relative rounded-[4px] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] shrink-0 w-full" data-name="Dropdown Field">
      <Contents1 />
      <div className="absolute bg-[#0d121c] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thin underline" />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Check">
          <path d={svgPaths.p32ddfd00} id="Icon" stroke="var(--stroke-0, #161616)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        جمهور ١
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
          <Text2 />
          <Divider />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        جمهور ٢
      </p>
    </div>
  );
}

function DropdownListItem1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Text3 />
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

function ListSections() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="List Sections">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Section />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]" />
    </div>
  );
}

function DropdownInput1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end min-h-[40px] min-w-[200px] relative shrink-0 w-full" data-name="Dropdown Input">
      <Label2 />
      <DropdownField1 />
      <ListSections />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex gap-[4px] items-end relative shrink-0" data-name="Label">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px] text-right" dir="auto">
        الوسوم
      </p>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Label">
      <Label5 />
    </div>
  );
}

function Elements2() {
  return (
    <div className="absolute inset-[34.37%_21.87%_34.38%_21.88%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2499 6.25002">
        <g>
          <path d={svgPaths.p3f085972} fill="var(--fill-0, #161616)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative size-[20px]" data-name="Chevron">
      <Elements2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#6c737f] text-[16px]" dir="auto">
        وسم ١
      </p>
    </div>
  );
}

function IconTextStack2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Icon-Text-stack">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-end px-[16px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <Chevron2 />
            </div>
          </div>
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Contents2() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]" data-name="Contents">
      <div className="content-stretch flex items-center justify-end overflow-clip relative rounded-[inherit] size-full">
        <IconTextStack2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#9da4ae] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function DropdownField2() {
  return (
    <div className="content-stretch flex h-[40px] items-start justify-end min-w-[200px] overflow-clip relative rounded-[4px] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] shrink-0 w-full" data-name="Dropdown Field">
      <Contents2 />
      <div className="absolute bg-[#0d121c] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thin underline" />
    </div>
  );
}

function Check1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Check">
          <path d={svgPaths.p32ddfd00} id="Icon" stroke="var(--stroke-0, #161616)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        وسم ١
      </p>
    </div>
  );
}

function Divider1() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center justify-center left-0 mix-blend-multiply px-[8px] right-0 rounded-[4px]" data-name="Divider">
      <div className="bg-[#d2d6db] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Line" />
    </div>
  );
}

function DropdownListItem2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Check1 />
          <Text5 />
          <Divider1 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        وسم ٢
      </p>
    </div>
  );
}

function Divider2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center justify-center left-0 mix-blend-multiply px-[8px] right-0 rounded-[4px]" data-name="Divider">
      <div className="bg-[#d2d6db] flex-[1_0_0] h-px min-h-px min-w-px" data-name="Line" />
    </div>
  );
}

function DropdownListItem3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Text6 />
          <Divider2 />
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Text">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] h-[21px] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        وسم٣
      </p>
    </div>
  );
}

function DropdownListItem4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Dropdown List Item">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-end p-[8px] relative w-full">
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start p-[8px] relative w-full">
        <DropdownListItem2 />
        <DropdownListItem3 />
        <DropdownListItem4 />
      </div>
    </div>
  );
}

function ListSections1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="List Sections">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Section1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]" />
    </div>
  );
}

function DropdownInput2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end min-h-[40px] min-w-[200px] relative shrink-0 w-full" data-name="Dropdown Input">
      <Label4 />
      <DropdownField2 />
      <ListSections1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-end justify-center relative shrink-0 w-full">
      <DropdownInput />
      <DropdownInput1 />
      <DropdownInput2 />
    </div>
  );
}

function Elements3() {
  return (
    <div className="absolute inset-[5.21%_11.45%_5.2%_11.46%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.501 21.5015">
        <g>
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p15d5cc00} fill="var(--fill-0, #161616)" fillRule="evenodd" />
            <path d={svgPaths.p351b9b00} fill="var(--fill-0, #161616)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FileUpload() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="file-upload">
      <Elements3 />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full" data-name="Text wrapper">
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] relative shrink-0 text-[#1f2a37] text-[16px] w-full" dir="auto">
        اسحب و أفلت الملفات هنا للرفع
      </p>
      <p className="css-4hzbpn font-['IBM_Plex_Sans_Arabic:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#384250] text-[12px] w-full">Maximum file size allowed is 2MB, supported file formats include.pdf.</p>
    </div>
  );
}

function TextWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#161616] text-[14px]" dir="auto">
        تصفح الملفات
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex gap-[4px] h-[32px] items-center justify-center max-h-[32px] min-h-[32px] overflow-clip px-[12px] py-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <TextWrapper1 />
    </div>
  );
}

function DropZone() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[4px] shrink-0 w-full" data-name="_Drop Zone">
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center p-[24px] relative w-full">
          <FileUpload />
          <TextWrapper />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Elements4() {
  return (
    <div className="absolute inset-[21.88%_21.87%_21.87%_21.87%]" data-name="elements">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
        <g>
          <path clipRule="evenodd" d={svgPaths.p1e8c1c0} fill="var(--fill-0, #161616)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function MultiplicationSign() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="multiplication-sign">
      <Elements4 />
    </div>
  );
}

function ButtonClose() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button-Close">
      <MultiplicationSign />
    </div>
  );
}

function TrailWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Trail wrapper">
      <ButtonClose />
    </div>
  );
}

function FeedbackIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Feedback Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Feedback Icon">
          <path clipRule="evenodd" d={svgPaths.p5300400} fill="var(--fill-0, white)" fillRule="evenodd" id="bg" />
          <path clipRule="evenodd" d={svgPaths.p20802f80} fill="var(--fill-0, #067647)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function TextWrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Text wrapper">
      <p className="css-4hzbpn flex-[1_0_0] font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[20px] min-h-px min-w-px not-italic relative text-[#161616] text-[14px] text-right" dir="auto">
        اسم الملف.csv
      </p>
      <FeedbackIcon />
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

function File() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[4px] shrink-0 w-full" data-name="File 1">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <IndicatorFileNameRemove />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Files() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Files">
      <File />
    </div>
  );
}

function FileUploadMultiple() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="File Upload / Multiple">
      <DropZone />
      <Files />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="css-4hzbpn font-['Roboto:Medium','Noto_Sans_Arabic:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#1f2a37] text-[18px] text-right tracking-[0.15px] w-full" dir="auto" style={{ fontVariationSettings: "'wdth' 100" }}>
        تحميل دليل شامل
      </p>
      <FileUploadMultiple />
    </div>
  );
}

function TextWrapper3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-white" dir="auto">
        التالي
      </p>
    </div>
  );
}

function PrimaryAction() {
  return (
    <div className="bg-[#1b8354] content-stretch flex gap-[4px] h-[40px] items-center justify-center max-h-[40px] min-h-[40px] overflow-clip px-[16px] relative rounded-[4px] shrink-0 w-[51px]" data-name="Primary Action">
      <TextWrapper3 />
    </div>
  );
}

function TextWrapper4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text wrapper">
      <p className="css-ew64yg font-['IBM_Plex_Sans_Arabic:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#161616] text-[16px]" dir="auto">
        إلغاء
      </p>
    </div>
  );
}

function SecondaryAction() {
  return (
    <div className="h-[40px] max-h-[40px] min-h-[40px] relative rounded-[4px] shrink-0" data-name="Secondary Action">
      <div className="content-stretch flex gap-[4px] h-full items-center justify-center max-h-[inherit] min-h-[inherit] overflow-clip px-[16px] relative rounded-[inherit]">
        <TextWrapper4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d2d6db] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function ModalActions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Modal Actions">
      <PrimaryAction />
      <SecondaryAction />
    </div>
  );
}

export default function PopUpTheUserToSpecifyTheReasonForResubmission() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-end justify-center overflow-clip p-[24px] relative rounded-[8px] shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.14)] size-full" data-name="PopUp -  the user to specify the reason for Resubmission.">
      <ModalHeader />
      <Frame />
      <Frame1 />
      <ModalActions />
    </div>
  );
}