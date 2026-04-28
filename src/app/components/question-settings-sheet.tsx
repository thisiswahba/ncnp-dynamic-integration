import { useEffect, useState } from 'react';
import {
  Type as TypeIcon,
  ListChecks,
  Plus,
  X,
  ChevronDown,
  Paperclip,
  CircleSlash,
  Check,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { HwToggle } from '@/app/components/ui/hw-toggle';
import { useLanguage } from '@/app/contexts/language-context';
import type {
  AttachmentPolicy,
  QuestionType,
} from '@/app/types/question-creator';

export interface QuestionDraft {
  id?: string;
  title: string;
  type: QuestionType;
  category?: string;
  dataSource?: string;
  attachmentPolicy: AttachmentPolicy;
  textAllowAttachment: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: QuestionDraft | null;
  onSave: (draft: QuestionDraft) => void;
}

const CATEGORY_OPTIONS = [
  { id: 'compliance', label: 'Compliance' },
  { id: 'finance', label: 'Finance' },
  { id: 'operations', label: 'Operations' },
  { id: 'governance', label: 'Governance' },
];

const DATA_SOURCE_OPTIONS = [
  { id: 'tax-agency', label: 'Tax Agency' },
  { id: 'mfa', label: 'MFA' },
  { id: 'ncnp', label: 'NCNP' },
];

export function QuestionSettingsSheet({ open, onOpenChange, initial, onSave }: Props) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const isEditing = !!initial?.id;

  // Which pill is expanded — controls the type of question being authored.
  const [expanded, setExpanded] = useState<'text' | 'choice' | null>(null);

  // Free-text fields
  const [textTitle, setTextTitle] = useState('');
  const [textCategory, setTextCategory] = useState('');
  const [textAllowAttachment, setTextAllowAttachment] = useState(false);

  // Multiple-choice fields
  const [choiceTitle, setChoiceTitle] = useState('');
  const [choiceCategory, setChoiceCategory] = useState('');
  const [choiceDataSource, setChoiceDataSource] = useState('');
  const [attachmentPolicy, setAttachmentPolicy] = useState<AttachmentPolicy>('none');

  useEffect(() => {
    if (!open) return;
    if (initial) {
      const isText = initial.type === 'text';
      setExpanded(isText ? 'text' : 'choice');
      if (isText) {
        setTextTitle(initial.title ?? '');
        setTextCategory(initial.category ?? '');
        setTextAllowAttachment(!!initial.textAllowAttachment);
        setChoiceTitle('');
        setChoiceCategory('');
        setChoiceDataSource('');
        setAttachmentPolicy('none');
      } else {
        setChoiceTitle(initial.title ?? '');
        setChoiceCategory(initial.category ?? '');
        setChoiceDataSource(initial.dataSource ?? '');
        setAttachmentPolicy(initial.attachmentPolicy ?? 'none');
        setTextTitle('');
        setTextCategory('');
        setTextAllowAttachment(false);
      }
    } else {
      // Add mode → start collapsed; user picks the type by expanding a pill.
      setExpanded('choice');
      setTextTitle('');
      setTextCategory('');
      setTextAllowAttachment(false);
      setChoiceTitle('');
      setChoiceCategory('');
      setChoiceDataSource('');
      setAttachmentPolicy('none');
    }
  }, [open, initial]);

  const togglePill = (which: 'text' | 'choice') => {
    setExpanded((curr) => (curr === which ? null : which));
  };

  const handleAddText = () => {
    if (!textTitle.trim()) return;
    onSave({
      id: initial?.id,
      title: textTitle.trim(),
      type: 'text',
      category: textCategory || undefined,
      attachmentPolicy: 'none',
      textAllowAttachment,
    });
    onOpenChange(false);
  };

  const handleAddChoice = () => {
    if (!choiceTitle.trim()) return;
    onSave({
      id: initial?.id,
      title: choiceTitle.trim(),
      type: 'choice',
      category: choiceCategory || undefined,
      dataSource: choiceDataSource || undefined,
      attachmentPolicy,
      textAllowAttachment: false,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRTL ? 'left' : 'right'}
        className="sm:max-w-[480px] w-full p-0 grid grid-rows-[auto_1fr] gap-0"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-border/60 bg-muted/30">
          <h2
            className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: '20px', lineHeight: 1.2, fontWeight: 600 }}
          >
            {isEditing ? t('qs.sheetTitleEdit') : t('qs.sheetTitle')}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto">
          <div className="px-6 py-6 space-y-3">
            {/* Free Question pill */}
            <PillCard
              expanded={expanded === 'text'}
              onToggle={() => togglePill('text')}
              Icon={TypeIcon}
              label={t('qs.pill.free')}
              isRTL={isRTL}
              disabledToggle={isEditing && initial?.type !== 'text'}
            >
              <FreeQuestionForm
                title={textTitle}
                setTitle={setTextTitle}
                category={textCategory}
                setCategory={setTextCategory}
                allowAttachment={textAllowAttachment}
                setAllowAttachment={setTextAllowAttachment}
                isRTL={isRTL}
                isEditing={isEditing}
                t={t}
                onAdd={handleAddText}
              />
            </PillCard>

            {/* Multiple Choice pill */}
            <PillCard
              expanded={expanded === 'choice'}
              onToggle={() => togglePill('choice')}
              Icon={ListChecks}
              label={t('qs.pill.choice')}
              isRTL={isRTL}
              disabledToggle={isEditing && initial?.type === 'text'}
            >
              <MultipleChoiceForm
                title={choiceTitle}
                setTitle={setChoiceTitle}
                category={choiceCategory}
                setCategory={setChoiceCategory}
                dataSource={choiceDataSource}
                setDataSource={setChoiceDataSource}
                attachmentPolicy={attachmentPolicy}
                setAttachmentPolicy={setAttachmentPolicy}
                isRTL={isRTL}
                isEditing={isEditing}
                t={t}
                onAdd={handleAddChoice}
              />
            </PillCard>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Pill card (accordion item) ────────────────────────────────────────────────

function PillCard({
  expanded,
  onToggle,
  Icon,
  label,
  isRTL,
  disabledToggle,
  children,
}: {
  expanded: boolean;
  onToggle: () => void;
  Icon: typeof TypeIcon;
  label: string;
  isRTL: boolean;
  disabledToggle?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border transition-colors ${
        expanded ? 'border-emerald-300/80 bg-white' : 'border-border bg-white'
      }`}
    >
      <button
        type="button"
        onClick={() => !disabledToggle && onToggle()}
        disabled={disabledToggle}
        className={`w-full flex items-center gap-3 px-4 py-3.5 ${
          isRTL ? 'flex-row-reverse text-right' : 'text-left'
        } ${disabledToggle ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
      >
        <span
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
            expanded ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          <Icon className="w-4.5 h-4.5" />
        </span>
        <span
          className="flex-1 text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
        >
          {label}
        </span>
        <span className="shrink-0 text-emerald-700">
          {expanded ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      {expanded && <div className="px-4 pb-4 pt-1">{children}</div>}
    </div>
  );
}

// ── Free Question form ────────────────────────────────────────────────────────

function FreeQuestionForm({
  title,
  setTitle,
  category,
  setCategory,
  allowAttachment,
  setAllowAttachment,
  isRTL,
  isEditing,
  t,
  onAdd,
}: {
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  allowAttachment: boolean;
  setAllowAttachment: (v: boolean) => void;
  isRTL: boolean;
  isEditing: boolean;
  t: (k: string) => string;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-4">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('qs.field.questionPlaceholder')}
        rows={3}
        autoFocus
        className={`w-full bg-muted/40 rounded-xl border-0 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200 transition-colors resize-none ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ fontSize: 'var(--text-sm)' }}
      />

      <DropdownField
        label={t('qs.field.category')}
        value={category}
        setValue={setCategory}
        options={CATEGORY_OPTIONS}
        placeholder={t('qs.field.option')}
        isRTL={isRTL}
        t={t}
      />

      {/* Allow attachment row (Bug 102680 — free text behaviour preserved) */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
            {t('qs.attachment.text')}
          </p>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
            {t('qs.attachment.text.desc')}
          </p>
        </div>
        <HwToggle checked={allowAttachment} onCheckedChange={setAllowAttachment} />
      </div>

      <Button
        onClick={onAdd}
        disabled={!title.trim()}
        className="h-10 px-6 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20"
        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
      >
        {isEditing ? t('qs.update') : t('qs.add')}
      </Button>
    </div>
  );
}

// ── Multiple Choice form ──────────────────────────────────────────────────────

function MultipleChoiceForm({
  title,
  setTitle,
  category,
  setCategory,
  dataSource,
  setDataSource,
  attachmentPolicy,
  setAttachmentPolicy,
  isRTL,
  isEditing,
  t,
  onAdd,
}: {
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  dataSource: string;
  setDataSource: (v: string) => void;
  attachmentPolicy: AttachmentPolicy;
  setAttachmentPolicy: (v: AttachmentPolicy) => void;
  isRTL: boolean;
  isEditing: boolean;
  t: (k: string) => string;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-4">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('qs.field.questionPlaceholder')}
        rows={3}
        autoFocus
        className={`w-full bg-muted/40 rounded-xl border-0 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-200 transition-colors resize-none ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ fontSize: 'var(--text-sm)' }}
      />

      <DropdownField
        label={t('qs.field.category')}
        value={category}
        setValue={setCategory}
        options={CATEGORY_OPTIONS}
        placeholder={t('qs.field.option')}
        isRTL={isRTL}
        t={t}
      />

      <DropdownField
        label={t('qs.field.dataSource')}
        value={dataSource}
        setValue={setDataSource}
        options={DATA_SOURCE_OPTIONS}
        placeholder={t('qs.field.option')}
        isRTL={isRTL}
        t={t}
      />

      {/* Attachment policy (Bug 102680) */}
      <div className="space-y-2 pt-1">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p
            className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
          >
            {t('qs.attachment.section')}
          </p>
          <span className="shrink-0 w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Paperclip className="w-3.5 h-3.5" />
          </span>
        </div>
        <p
          className={`text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-xs)' }}
        >
          {t('qs.attachment.helper')}
        </p>

        <div className="grid gap-2 mt-1">
          <PolicyOption
            selected={attachmentPolicy === 'none'}
            Icon={CircleSlash}
            label={t('qs.attachment.none')}
            desc={t('qs.attachment.none.desc')}
            onClick={() => setAttachmentPolicy('none')}
            isRTL={isRTL}
          />
          <PolicyOption
            selected={attachmentPolicy === 'all'}
            Icon={Paperclip}
            label={t('qs.attachment.all')}
            desc={t('qs.attachment.all.desc')}
            onClick={() => setAttachmentPolicy('all')}
            isRTL={isRTL}
          />
          <PolicyOption
            selected={attachmentPolicy === 'per-answer'}
            Icon={Paperclip}
            label={t('qs.attachment.perAnswer')}
            desc={t('qs.attachment.perAnswer.desc')}
            onClick={() => setAttachmentPolicy('per-answer')}
            isRTL={isRTL}
          />
        </div>
      </div>

      <Button
        onClick={onAdd}
        disabled={!title.trim()}
        className="h-10 px-6 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20"
        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
      >
        {isEditing ? t('qs.update') : t('qs.add')}
      </Button>
    </div>
  );
}

// ── Shared bits ───────────────────────────────────────────────────────────────

function DropdownField({
  label,
  value,
  setValue,
  options,
  placeholder,
  isRTL,
  t,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: { id: string; label: string }[];
  placeholder: string;
  isRTL: boolean;
  t: (k: string) => string;
}) {
  return (
    <div>
      <label
        className={`block mb-1.5 text-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ fontSize: 'var(--text-sm)' }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground appearance-none outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-colors ${isRTL ? 'text-right pl-10 pr-4' : 'text-left pr-10'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}
        />
      </div>
    </div>
  );
}

function PolicyOption({
  selected,
  Icon,
  label,
  desc,
  onClick,
  isRTL,
}: {
  selected: boolean;
  Icon: typeof TypeIcon;
  label: string;
  desc: string;
  onClick: () => void;
  isRTL: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border px-3 py-2.5 transition-all ${
        selected
          ? 'border-amber-300 bg-amber-50/50'
          : 'border-border bg-white hover:bg-muted/40'
      }`}
    >
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
            selected ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>
            {label}
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: '11px', lineHeight: 1.4 }}
          >
            {desc}
          </p>
        </div>
        {selected ? (
          <span className="shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center">
            <Check className="w-3 h-3" />
          </span>
        ) : (
          <span className="shrink-0 w-5 h-5 rounded-full border-2 border-border" />
        )}
      </div>
    </button>
  );
}
