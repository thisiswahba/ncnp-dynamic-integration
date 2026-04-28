import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Type as TypeIcon,
  Link2,
  Hash,
  Check,
  Paperclip,
  Lock,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { HwToggle } from '@/app/components/ui/hw-toggle';
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
        className="sm:max-w-[460px] w-full p-0 grid grid-rows-[auto_1fr_auto] gap-0"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-border/60 bg-muted/30">
          <p
            className={`text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {t('as.eyebrow')}
          </p>
          <h2
            className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: '20px', lineHeight: 1.2, fontWeight: 600 }}
          >
            {t('as.title')}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto">
          <div className="px-6 py-6 space-y-5">
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

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-between gap-2`}
        >
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={handleDelete}
              className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {t('as.delete')}
            </button>
          ) : (
            <span />
          )}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-9 px-4 font-medium"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {t('as.cancel')}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!canSave}
              className="h-9 px-5 font-medium bg-primary hover:bg-primary/90 text-white"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {t('as.save')}
            </Button>
          </div>
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
          style={{ fontSize: 'var(--text-sm)' }}
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
      <div className="border-t border-border/60 pt-5">
        <label
          className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
        >
          <Checkbox
            checked={!!draft.requireAttachment}
            onCheckedChange={(v) => update('requireAttachment', !!v)}
          />
          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
            {t('as.allowAttachment')}
          </span>
        </label>
      </div>
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
      className={`w-full rounded-xl border px-4 py-3 transition-all ${
        selected
          ? 'border-emerald-300 bg-emerald-50/40'
          : 'border-border bg-white hover:border-border/80 hover:bg-muted/40'
      }`}
    >
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span
          className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
            selected ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'
          }`}
        >
          <Icon className="w-4.5 h-4.5" />
        </span>
        <span
          className={`flex-1 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {label}
        </span>
        {selected && (
          <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-3 h-3" />
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
      {/* Label */}
      <div>
        <input
          type="text"
          value={draft.text}
          onChange={(e) => update('text', e.target.value)}
          placeholder={t('as.field.labelPlaceholder')}
          autoFocus
          className={`w-full h-11 bg-muted/40 border-0 rounded-lg px-4 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </div>

      {/* Risk type */}
      <div>
        <label
          className={`block mb-2 text-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {t('as.field.riskType')}
        </label>
        <div className="relative">
          <select
            value={draft.riskType ?? ''}
            onChange={(e) => update('riskType', e.target.value || undefined)}
            className={`w-full h-11 px-4 pr-10 rounded-lg border border-border bg-white text-foreground appearance-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${isRTL ? 'text-right pl-10 pr-4' : 'text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <option value="">{t('as.field.riskTypePlaceholder')}</option>
            {RISK_TYPES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}
          />
        </div>
      </div>

      {/* Score % */}
      <div>
        <label
          className={`block mb-2 text-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-sm)' }}
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
            className={`w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground/70 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${isRTL ? 'text-right pl-10' : 'text-left pr-10'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? 'left-4' : 'right-4'}`}
            style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
          >
            %
          </span>
        </div>
      </div>

      {/* Per-answer attachment (Bug 102680) */}
      {showPerAnswerAttachment && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 px-4 py-3">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="shrink-0 w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              {lockedByAll ? <Lock className="w-4 h-4" /> : <Paperclip className="w-4 h-4" />}
            </span>
            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                {t('as.requireAttachment')}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)' }}>
                {lockedByAll ? t('as.requireAttachment.lockedAll') : t('as.requireAttachment.desc')}
              </p>
            </div>
            <HwToggle
              checked={lockedByAll ? true : !!draft.requireAttachment}
              disabled={lockedByAll}
              onCheckedChange={(v) => update('requireAttachment', !!v)}
            />
          </div>
        </div>
      )}

      {/* Are there actions */}
      <div className="border-t border-border/60 pt-5 space-y-3">
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
          <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>
            {t('as.hasActions')}
          </span>
        </label>

        {draft.hasActions && (
          <div className="ps-6 grid gap-2">
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
              <div className="grid gap-2 mt-2">
                <input
                  type="text"
                  value={draft.actionDetails ?? ''}
                  onChange={(e) => update('actionDetails', e.target.value)}
                  placeholder={t('as.action.detailsPlaceholder')}
                  className={`w-full h-10 px-4 rounded-lg bg-muted/40 border-0 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <input
                  type="text"
                  value={draft.actionReason ?? ''}
                  onChange={(e) => update('actionReason', e.target.value)}
                  placeholder={t('as.action.reasonPlaceholder')}
                  className={`w-full h-10 px-4 rounded-lg bg-muted/40 border-0 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                  style={{ fontSize: 'var(--text-sm)' }}
                />
                <input
                  type="text"
                  value={draft.actionUrl ?? ''}
                  onChange={(e) => update('actionUrl', e.target.value)}
                  placeholder={t('as.action.urlPlaceholder')}
                  dir="ltr"
                  className={`w-full h-10 px-4 rounded-lg bg-muted/40 border-0 text-foreground placeholder:text-muted-foreground/70 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors text-left`}
                  style={{ fontSize: 'var(--text-sm)' }}
                />
              </div>
            )}
          </div>
        )}
      </div>
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
        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          selected ? 'border-primary' : 'border-border'
        }`}
      >
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </span>
      <span
        className="text-foreground"
        style={{ fontSize: 'var(--text-sm)', fontWeight: selected ? 500 : 400 }}
      >
        {label}
      </span>
    </button>
  );
}
