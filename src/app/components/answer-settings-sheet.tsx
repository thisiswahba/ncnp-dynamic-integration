import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Type as TypeIcon,
  Link2,
  Hash,
  Check,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useLanguage } from '@/app/contexts/language-context';
import type {
  AnswerType,
  Question,
  ActionType,
} from '@/app/types/question-creator';

export interface AnswerDraft {
  id?: string;
  text: string;
  // Multiple choice
  riskType?: string;
  scorePercentage?: number;
  hasActions?: boolean;
  actionType?: ActionType;
  actionDetails?: string;
  actionReason?: string;
  actionUrl?: string;
  requireAttachment?: boolean;
  // Text
  answerType?: AnswerType;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: AnswerDraft | null;
  question: Question | null;
  onSave: (draft: AnswerDraft) => void;
  onDelete?: () => void;
}

const RISK_TYPES = [
  { id: 'financial', label: 'Financial' },
  { id: 'operational', label: 'Operational' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'reputational', label: 'Reputational' },
];

export function AnswerSettingsSheet({ open, onOpenChange, initial, question, onSave, onDelete }: Props) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const isEditing = !!initial?.id;
  const isText = question?.type === 'text';

  const [draft, setDraft] = useState<AnswerDraft>({ text: '' });

  useEffect(() => {
    if (!open) return;
    setDraft(
      initial ?? {
        text: '',
        answerType: isText ? 'short-text' : undefined,
        scorePercentage: 0,
        hasActions: false,
      }
    );
  }, [open, initial, isText]);

  const update = <K extends keyof AnswerDraft>(key: K, value: AnswerDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const canSave = useMemo(() => {
    if (isText) return true; // text only needs answer type which has a default
    return draft.text.trim().length > 0;
  }, [isText, draft.text]);

  const handleSave = () => {
    if (!canSave) return;
    onSave(draft);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete?.();
    onOpenChange(false);
  };

  // Bug 102680: per-answer attachment flag UX behaviour
  const policyAll = question?.attachmentPolicy === 'all';
  const policyPerAnswer = question?.attachmentPolicy === 'per-answer';
  const showPerAnswerAttachment = !isText && (policyAll || policyPerAnswer);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRTL ? 'left' : 'right'}
        className="sm:max-w-[360px] w-full p-0 grid grid-rows-[auto_1fr_auto] gap-0 rounded-none"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header — flat gray bar matching Figma */}
        <div className="px-4 h-[51px] flex items-center bg-[#f8f9fa] border-b border-border/40">
          <h2
            className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: '16px', lineHeight: '20px', fontWeight: 500 }}
          >
            {t('as.title')}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {isText ? (
              <TextAnswerForm
                draft={draft}
                update={update}
                isRTL={isRTL}
                t={t}
              />
            ) : (
              <ChoiceAnswerForm
                draft={draft}
                update={update}
                isRTL={isRTL}
                t={t}
                showPerAnswerAttachment={showPerAnswerAttachment}
                lockedByAll={policyAll}
              />
            )}
          </div>
        </div>

        {/* Footer — Delete (red text) + Save button matching Figma */}
        <div
          className={`px-4 py-4 flex items-center justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-[#b42318] hover:text-[#9a1c14] font-medium transition-colors"
              style={{ fontSize: '14px', lineHeight: '19px' }}
            >
              {t('as.delete')}
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`h-8 w-[122px] rounded text-white font-medium transition-opacity ${
              canSave ? 'bg-primary hover:opacity-90' : 'bg-primary opacity-50 cursor-not-allowed'
            }`}
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
          >
            {t('as.save')}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Text answer form ──────────────────────────────────────────────────────────

function TextAnswerForm({
  draft,
  update,
  isRTL,
  t,
}: {
  draft: AnswerDraft;
  update: <K extends keyof AnswerDraft>(k: K, v: AnswerDraft[K]) => void;
  isRTL: boolean;
  t: (k: string) => string;
}) {
  return (
    <>
      {/* Answer type */}
      <div>
        <label
          className={`block mb-2 text-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '14px', lineHeight: '20px' }}
        >
          {t('as.field.answerType')}
        </label>
        <div className="grid gap-2">
          <AnswerTypeRow
            selected={draft.answerType === 'short-text'}
            Icon={TypeIcon}
            label={t('as.answerType.short')}
            onClick={() => update('answerType', 'short-text')}
            isRTL={isRTL}
          />
          <AnswerTypeRow
            selected={draft.answerType === 'link'}
            Icon={Link2}
            label={t('as.answerType.link')}
            onClick={() => update('answerType', 'link')}
            isRTL={isRTL}
          />
          <AnswerTypeRow
            selected={draft.answerType === 'number'}
            Icon={Hash}
            label={t('as.answerType.number')}
            onClick={() => update('answerType', 'number')}
            isRTL={isRTL}
          />
        </div>
      </div>

      {/* Allow attachment */}
      <div className="border-t border-border/60 pt-4">
        <label
          className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
        >
          <Checkbox
            checked={!!draft.requireAttachment}
            onCheckedChange={(v) => update('requireAttachment', !!v)}
          />
          <span
            className="text-black"
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
          >
            {t('as.allowAttachment')}
          </span>
        </label>
      </div>
      <div className="border-t border-border/60" />
    </>
  );
}

function AnswerTypeRow({
  selected,
  Icon,
  label,
  onClick,
  isRTL,
}: {
  selected: boolean;
  Icon: typeof TypeIcon;
  label: string;
  onClick: () => void;
  isRTL: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-[#d2d6db] bg-white px-2 h-[46px] hover:border-border transition-colors"
    >
      <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="shrink-0 w-6 h-6 rounded-full bg-[rgba(8,93,58,0.11)] text-emerald-700 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </span>
        <span
          className={`flex-1 text-black ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '12px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' }}
        >
          {label}
        </span>
        {selected && (
          <span className={`shrink-0 text-primary ${isRTL ? 'me-2' : 'ms-2'}`}>
            <Check className="w-4 h-4" strokeWidth={2.5} />
          </span>
        )}
      </div>
    </button>
  );
}

// ── Multiple choice answer form ───────────────────────────────────────────────

function ChoiceAnswerForm({
  draft,
  update,
  isRTL,
  t,
  showPerAnswerAttachment,
  lockedByAll,
}: {
  draft: AnswerDraft;
  update: <K extends keyof AnswerDraft>(k: K, v: AnswerDraft[K]) => void;
  isRTL: boolean;
  t: (k: string) => string;
  showPerAnswerAttachment: boolean;
  lockedByAll: boolean;
}) {
  return (
    <>
      {/* Label — flat gray bg matching Figma */}
      <div>
        <input
          type="text"
          value={draft.text}
          onChange={(e) => update('text', e.target.value)}
          placeholder={t('as.field.labelPlaceholder')}
          autoFocus
          className={`w-full h-[45px] bg-[#f8f9fa] border border-[#f8f9fa] rounded-lg px-4 text-foreground placeholder:text-[#b3b3b3] outline-none focus:bg-white focus:border-border transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '12px' }}
        />
      </div>

      {/* Risk type */}
      <div>
        <label
          className={`block mb-2 text-foreground font-medium ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '14px', lineHeight: '20px' }}
        >
          {t('as.field.riskType')}
        </label>
        <div className="relative">
          <select
            value={draft.riskType ?? ''}
            onChange={(e) => update('riskType', e.target.value || undefined)}
            className={`w-full h-10 px-4 ${isRTL ? 'pl-10' : 'pr-10'} rounded border border-[#9da4ae] bg-white text-foreground appearance-none outline-none focus:border-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: '14px' }}
          >
            <option value="">{t('as.field.riskTypePlaceholder')}</option>
            {RISK_TYPES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-foreground pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}
          />
        </div>
      </div>

      {/* Score % */}
      <div>
        <label
          className={`block mb-2 text-foreground font-medium ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: '14px', lineHeight: '20px' }}
        >
          {t('as.field.scorePct')}
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            max={100}
            value={draft.scorePercentage ?? ''}
            onChange={(e) =>
              update(
                'scorePercentage',
                e.target.value === '' ? undefined : Math.max(0, Math.min(100, Number(e.target.value)))
              )
            }
            placeholder={t('as.field.scorePctPlaceholder')}
            className={`w-full h-10 px-4 rounded border border-[#9da4ae] bg-white text-foreground placeholder:text-[#d2d6db] outline-none focus:border-primary transition-colors ${isRTL ? 'text-right pl-10' : 'text-left pr-10'}`}
            style={{ fontSize: '14px' }}
          />
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-[#161616] ${isRTL ? 'left-4' : 'right-4'}`}
            style={{ fontSize: '14px', fontWeight: 700 }}
          >
            %
          </span>
        </div>
      </div>

      {/* Are there actions */}
      <div className="border-t border-border/60 pt-4 space-y-3">
        <label
          className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
        >
          <Checkbox
            checked={!!draft.hasActions}
            onCheckedChange={(v) => {
              update('hasActions', !!v);
              if (!v) update('actionType', undefined);
            }}
          />
          <span
            className="text-black"
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
          >
            {t('as.hasActions')}
          </span>
        </label>

        {draft.hasActions && (
          <div className={`grid gap-2 ${isRTL ? 'pe-7' : 'ps-7'}`}>
            <ActionRadio
              selected={draft.actionType === 'sub-question'}
              label={t('as.action.subQuestion')}
              onClick={() => update('actionType', 'sub-question')}
              isRTL={isRTL}
            />
            <ActionRadio
              selected={draft.actionType === 'corrective'}
              label={t('as.action.corrective')}
              onClick={() => update('actionType', 'corrective')}
              isRTL={isRTL}
            />

            {draft.actionType === 'corrective' && (
              <div className="grid gap-2 mt-1">
                <input
                  type="text"
                  value={draft.actionDetails ?? ''}
                  onChange={(e) => update('actionDetails', e.target.value)}
                  placeholder={t('as.action.detailsPlaceholder')}
                  className={`w-full h-[45px] bg-[#f8f9fa] border border-[#f8f9fa] rounded-lg px-3 text-foreground placeholder:text-[#b3b3b3] outline-none focus:bg-white focus:border-border transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  style={{ fontSize: '12px' }}
                />
                <input
                  type="text"
                  value={draft.actionReason ?? ''}
                  onChange={(e) => update('actionReason', e.target.value)}
                  placeholder={t('as.action.reasonPlaceholder')}
                  className={`w-full h-[45px] bg-[#f8f9fa] border border-[#f8f9fa] rounded-lg px-3 text-foreground placeholder:text-[#b3b3b3] outline-none focus:bg-white focus:border-border transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  style={{ fontSize: '12px' }}
                />
                <input
                  type="text"
                  value={draft.actionUrl ?? ''}
                  onChange={(e) => update('actionUrl', e.target.value)}
                  placeholder={t('as.action.urlPlaceholder')}
                  dir="ltr"
                  className="w-full h-[45px] bg-[#f8f9fa] border border-[#f8f9fa] rounded-lg px-3 text-foreground placeholder:text-[#b3b3b3] outline-none focus:bg-white focus:border-border transition-colors text-left"
                  style={{ fontSize: '12px' }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border/60" />

      {/* Per-answer attachment (Bug 102680) — simple checkbox style matching Figma text-form treatment */}
      {showPerAnswerAttachment && (
        <label
          className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse justify-end' : ''} ${lockedByAll ? 'opacity-70' : ''}`}
        >
          <Checkbox
            checked={lockedByAll ? true : !!draft.requireAttachment}
            disabled={lockedByAll}
            onCheckedChange={(v) => update('requireAttachment', !!v)}
          />
          <span
            className="text-black"
            style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}
          >
            {lockedByAll ? t('as.requireAttachment.lockedAll') : t('as.allowAttachment')}
          </span>
        </label>
      )}
    </>
  );
}

function ActionRadio({
  selected,
  label,
  onClick,
  isRTL,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  isRTL: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
    >
      <span
        className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
          selected ? 'border-primary' : 'border-[#6c737f]'
        }`}
      >
        {selected && <span className="w-3 h-3 rounded-full bg-primary" />}
      </span>
      <span
        className="text-[#161616]"
        style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 400 }}
      >
        {label}
      </span>
    </button>
  );
}
