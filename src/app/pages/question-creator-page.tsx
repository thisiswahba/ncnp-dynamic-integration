import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import {
  ChevronRight,
  Pencil,
  Plus,
  Type as TypeIcon,
  ListChecks,
  Sparkles,
  MoreVertical,
  CircleCheck,
  Paperclip,
  Trash2,
  Copy,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { useLanguage } from '@/app/contexts/language-context';
import {
  QuestionSettingsSheet,
  type QuestionDraft,
} from '@/app/components/question-settings-sheet';
import {
  AnswerSettingsSheet,
  type AnswerDraft,
} from '@/app/components/answer-settings-sheet';
import type {
  Question,
  Answer,
  QuestionType,
} from '@/app/types/question-creator';

let idCounter = 100;
const nextId = (prefix: string) => `${prefix}-${++idCounter}`;

// Configure-from-scratch flow: canvas starts empty.
// 1. user adds the first question via the empty-state CTA
// 2. for multiple-choice, the question card is rendered with zero answers
//    and only the "+ Add new option" affordance
// 3. clicking that opens the answer settings sheet for the first answer
// 4. each subsequent answer follows the same one-at-a-time flow
const seedQuestions: Question[] = [];

export function QuestionCreatorPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>(seedQuestions);

  // Sheets
  const [qSheet, setQSheet] = useState<{ open: boolean; initial: QuestionDraft | null; parentAnswerId: string | null }>({
    open: false,
    initial: null,
    parentAnswerId: null,
  });
  const [aSheet, setASheet] = useState<{ open: boolean; questionId: string; initial: AnswerDraft | null }>({
    open: false,
    questionId: '',
    initial: null,
  });

  // Tree helpers
  const rootQuestions = useMemo(() => questions.filter((q) => q.parentAnswerId === null), [questions]);
  const subQuestionByAnswer = useMemo(() => {
    const map: Record<string, Question> = {};
    for (const q of questions) if (q.parentAnswerId) map[q.parentAnswerId] = q;
    return map;
  }, [questions]);

  // ── Actions ─────────────────────────────────────────────────────────────────
  const openCreateRootQuestion = () =>
    setQSheet({ open: true, initial: null, parentAnswerId: null });

  const openEditQuestion = (q: Question) =>
    setQSheet({
      open: true,
      initial: {
        id: q.id,
        title: q.title,
        type: q.type,
        category: q.category,
        dataSource: q.dataSource,
        attachmentPolicy: q.attachmentPolicy,
        textAllowAttachment: q.textAllowAttachment ?? false,
      },
      parentAnswerId: q.parentAnswerId,
    });

  const openCreateSubQuestion = (parentAnswerId: string) =>
    setQSheet({ open: true, initial: null, parentAnswerId });

  const openCreateAnswer = (questionId: string) =>
    setASheet({ open: true, questionId, initial: null });

  const openEditAnswer = (questionId: string, a: Answer) =>
    setASheet({
      open: true,
      questionId,
      initial: {
        id: a.id,
        text: a.text,
        answerType: a.answerType,
        riskType: a.riskType,
        scorePercentage: a.scorePercentage,
        hasActions: a.hasActions,
        actionType: a.actionType,
        actionDetails: a.actionDetails,
        actionReason: a.actionReason,
        actionUrl: a.actionUrl,
        requireAttachment: a.requireAttachment,
      },
    });

  const handleSaveQuestion = (draft: QuestionDraft, parentAnswerId: string | null) => {
    setQuestions((prev) => {
      if (draft.id) {
        return prev.map((q) =>
          q.id === draft.id
            ? {
                ...q,
                title: draft.title,
                type: draft.type,
                category: draft.category,
                dataSource: draft.dataSource,
                attachmentPolicy: draft.attachmentPolicy,
                textAllowAttachment: draft.textAllowAttachment,
                answers: q.type !== draft.type ? [] : q.answers, // reset answers if type changed
              }
            : q
        );
      }
      const newQ: Question = {
        id: nextId('q'),
        title: draft.title,
        type: draft.type,
        parentAnswerId,
        category: draft.category,
        dataSource: draft.dataSource,
        attachmentPolicy: draft.attachmentPolicy,
        textAllowAttachment: draft.textAllowAttachment,
        // Start with no answers — the user configures them one at a time
        // via the answer settings side sheet (see Bug 102680 flow).
        answers: [],
      };
      return [...prev, newQ];
    });
    toast.success(t('questionCreator.toast.saved'));
    // For multiple-choice questions, nudge the user to configure the first
    // answer right away — the canvas already shows the dashed "+ Add new
    // option" affordance, but a one-shot follow-up sheet keeps momentum.
    if (!draft.id && draft.type === 'choice') {
      // Defer one tick so the new question lands in state before the sheet
      // tries to read it.
      setTimeout(() => {
        setQuestions((curr) => {
          const last = [...curr]
            .reverse()
            .find((q) => q.title === draft.title && q.type === 'choice');
          if (last) {
            setASheet({ open: true, questionId: last.id, initial: null });
          }
          return curr;
        });
      }, 200);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => {
      // remove the question and any sub-questions hanging off its answers (recursive)
      const toRemove = new Set<string>([questionId]);
      let changed = true;
      while (changed) {
        changed = false;
        for (const q of prev) {
          if (toRemove.has(q.id)) continue;
          const parent = q.parentAnswerId;
          if (!parent) continue;
          const parentQ = prev.find((x) => x.answers.some((a) => a.id === parent));
          if (parentQ && toRemove.has(parentQ.id)) {
            toRemove.add(q.id);
            changed = true;
          }
        }
      }
      return prev.filter((q) => !toRemove.has(q.id));
    });
  };

  const handleSaveAnswer = (questionId: string, draft: AnswerDraft) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        if (draft.id) {
          return {
            ...q,
            answers: q.answers.map((a) => (a.id === draft.id ? { ...a, ...draft } : a)),
          };
        }
        return {
          ...q,
          answers: [...q.answers, { ...draft, id: nextId('a') }],
        };
      })
    );
    toast.success(t('questionCreator.toast.saved'));
  };

  const handleDeleteAnswer = (questionId: string, answerId: string) => {
    setQuestions((prev) => {
      const removeSubFor = new Set<string>([answerId]);
      const filtered = prev.map((q) => {
        if (q.id !== questionId) return q;
        return { ...q, answers: q.answers.filter((a) => a.id !== answerId) };
      });
      // also remove any sub-question pinned to this answer
      return filtered.filter((q) => !(q.parentAnswerId && removeSubFor.has(q.parentAnswerId)));
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#f7f8f9]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1240px] mx-auto px-8 py-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="min-w-0">
            {/* Breadcrumb */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-3 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <span>{t('questionCreator.breadcrumb.all')}</span>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-foreground/60">{t('questionCreator.breadcrumb.create')}</span>
            </button>
            <div className="flex items-baseline gap-3">
              <span
                className="uppercase text-emerald-700 font-semibold"
                style={{ fontSize: '10px', letterSpacing: '0.18em' }}
              >
                {t('qs.eyebrow')}
              </span>
              <span className="h-px w-12 bg-emerald-200" aria-hidden />
            </div>
            <h1
              className="text-foreground mt-1"
              style={{ fontSize: '38px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              {t('questionCreator.title')}
            </h1>
          </div>

          <div className={`flex items-center gap-3 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="outline"
              onClick={() => toast.success(t('questionCreator.toast.draftSaved'))}
              className="h-10 px-4 bg-white border-border"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
            >
              <span>{t('questionCreator.saveDraft')}</span>
              <Pencil className="w-4 h-4 ms-2" />
            </Button>
            <Button
              onClick={() => toast.success(t('questionCreator.toast.sentForReview'))}
              className="h-10 px-5 bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {t('questionCreator.sendForReview')}
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="qc-canvas relative rounded-3xl border border-border/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_48px_-32px_rgba(15,23,42,0.18)] overflow-hidden">
          {/* Top meta bar */}
          <div className="flex items-center justify-between px-7 py-3 border-b border-border/50 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span
                className="text-foreground/70"
                style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.04em' }}
              >
                {t('questionCreator.breadcrumb.create')}
              </span>
            </div>
            <span
              className="text-muted-foreground tabular-nums"
              style={{ fontSize: '11px', fontWeight: 500 }}
              dir="ltr"
            >
              {questions.length} nodes · {questions.filter((q) => q.type !== 'text').length} branches
            </span>
          </div>

          {rootQuestions.length === 0 ? (
            <EmptyCanvas onAdd={openCreateRootQuestion} t={t} isRTL={isRTL} />
          ) : (
            <div className="px-10 pt-12 pb-16">
              <div className="flex flex-col items-center">
                {rootQuestions.map((q, idx) => (
                  <div key={q.id} className="flex flex-col items-center w-full">
                    {idx > 0 && <div className="h-10" aria-hidden />}
                    <QuestionBranch
                      question={q}
                      isFirst={idx === 0}
                      subQuestionByAnswer={subQuestionByAnswer}
                      isRTL={isRTL}
                      t={t}
                      onEditQuestion={openEditQuestion}
                      onDeleteQuestion={handleDeleteQuestion}
                      onAddAnswer={openCreateAnswer}
                      onEditAnswer={openEditAnswer}
                      onDeleteAnswer={handleDeleteAnswer}
                      onAddSubQuestion={openCreateSubQuestion}
                    />
                  </div>
                ))}

                {/* Add another root question */}
                <div className="qc-trunk mt-2" aria-hidden />
                <GhostAdd
                  label={t('questionCreator.addQuestion')}
                  onClick={openCreateRootQuestion}
                  size="lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <QuestionSettingsSheet
        open={qSheet.open}
        onOpenChange={(o) => setQSheet((s) => ({ ...s, open: o }))}
        initial={qSheet.initial}
        onSave={(draft) => handleSaveQuestion(draft, qSheet.parentAnswerId)}
      />

      <AnswerSettingsSheet
        open={aSheet.open}
        onOpenChange={(o) => setASheet((s) => ({ ...s, open: o }))}
        initial={aSheet.initial}
        question={questions.find((q) => q.id === aSheet.questionId) ?? null}
        onSave={(draft) => handleSaveAnswer(aSheet.questionId, draft)}
        onDelete={() =>
          aSheet.initial?.id && handleDeleteAnswer(aSheet.questionId, aSheet.initial.id)
        }
      />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function EmptyCanvas({ onAdd, t }: { onAdd: () => void; t: (k: string) => string; isRTL: boolean }) {
  return (
    <div className="min-h-[440px] flex items-center justify-center px-6">
      <button
        type="button"
        onClick={onAdd}
        className="qc-empty-card group"
        aria-label={t('questionCreator.empty.cta')}
      >
        <Plus
          className="qc-empty-icon"
          strokeWidth={2}
        />
        <span className="qc-empty-label">
          {t('questionCreator.empty.cta')}
        </span>
      </button>
    </div>
  );
}

interface BranchProps {
  question: Question;
  isFirst: boolean;
  subQuestionByAnswer: Record<string, Question>;
  isRTL: boolean;
  t: (k: string) => string;
  onEditQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onAddAnswer: (questionId: string) => void;
  onEditAnswer: (questionId: string, a: Answer) => void;
  onDeleteAnswer: (questionId: string, answerId: string) => void;
  onAddSubQuestion: (parentAnswerId: string) => void;
}

function QuestionBranch({
  question,
  subQuestionByAnswer,
  isRTL,
  t,
  onEditQuestion,
  onDeleteQuestion,
  onAddAnswer,
  onEditAnswer,
  onDeleteAnswer,
  onAddSubQuestion,
}: BranchProps) {
  const showAnswers = question.type !== 'text';
  const cellCount = question.answers.length + 1; // + add-option ghost
  const posFor = (idx: number, total: number) => {
    if (total === 1) return 'only';
    if (idx === 0) return 'first';
    if (idx === total - 1) return 'last';
    return 'middle';
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Question card */}
      <QuestionCard
        question={question}
        t={t}
        isRTL={isRTL}
        onEdit={onEditQuestion}
        onDelete={onDeleteQuestion}
      />

      {showAnswers && (
        <>
          {/* Trunk: question → branch row */}
          <div className="qc-trunk" aria-hidden />

          {/* Branch row with L-shape connectors */}
          <div className="qc-branches">
            {question.answers.map((a, idx) => (
              <div
                key={a.id}
                className="qc-cell"
                data-pos={posFor(idx, cellCount)}
              >
                <AnswerColumn
                  question={question}
                  answer={a}
                  subQuestion={subQuestionByAnswer[a.id]}
                  subQuestionByAnswer={subQuestionByAnswer}
                  isRTL={isRTL}
                  t={t}
                  onEditAnswer={onEditAnswer}
                  onDeleteAnswer={onDeleteAnswer}
                  onAddSubQuestion={onAddSubQuestion}
                  onEditQuestion={onEditQuestion}
                  onDeleteQuestion={onDeleteQuestion}
                  onAddAnswer={onAddAnswer}
                />
              </div>
            ))}

            {/* + Add new option as last cell with dashed connector */}
            <div
              className="qc-cell"
              data-pos={posFor(cellCount - 1, cellCount)}
              data-dashed="true"
            >
              <GhostAdd
                label={t('questionCreator.addOption')}
                onClick={() => onAddAnswer(question.id)}
                size="sm"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface AnswerColumnProps extends Omit<BranchProps, 'question' | 'isFirst'> {
  question: Question;
  answer: Answer;
  subQuestion: Question | undefined;
}

function AnswerColumn({
  question,
  answer,
  subQuestion,
  subQuestionByAnswer,
  isRTL,
  t,
  onEditAnswer,
  onDeleteAnswer,
  onAddSubQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onAddAnswer,
}: AnswerColumnProps) {
  const isAttachmentRequired =
    question.attachmentPolicy === 'all' ||
    (question.attachmentPolicy === 'per-answer' && answer.requireAttachment);

  return (
    <div className="flex flex-col items-center min-w-[148px] w-full">
      {/* Answer pill */}
      <button
        type="button"
        onClick={() => onEditAnswer(question.id, answer)}
        className="qc-answer-pill group flex items-center gap-2.5 border border-border/70 rounded-xl ps-3 pe-4 py-2.5 hover:border-emerald-300"
      >
        <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
          <CircleCheck className="w-3.5 h-3.5" />
        </span>
        <span
          className="text-foreground whitespace-nowrap"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {answer.text || t('questionCreator.untitledQuestion')}
        </span>
        {isAttachmentRequired && (
          <span
            className="ms-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
            title={t('questionCreator.attachmentBadge.some')}
          >
            <Paperclip className="w-2.5 h-2.5" />
          </span>
        )}
      </button>

      {/* Sub-question entry */}
      {subQuestion ? (
        <div className="flex flex-col items-center w-full">
          <div className="qc-trunk-sub" aria-hidden />
          <QuestionBranch
            question={subQuestion}
            isFirst={false}
            subQuestionByAnswer={subQuestionByAnswer}
            isRTL={isRTL}
            t={t}
            onEditQuestion={onEditQuestion}
            onDeleteQuestion={onDeleteQuestion}
            onAddAnswer={onAddAnswer}
            onEditAnswer={onEditAnswer}
            onDeleteAnswer={onDeleteAnswer}
            onAddSubQuestion={onAddSubQuestion}
          />
        </div>
      ) : (
        answer.hasActions &&
        answer.actionType === 'sub-question' && (
          <div className="flex flex-col items-center">
            <div className="qc-trunk-sub" aria-hidden />
            <GhostAdd
              label={t('questionCreator.addQuestion')}
              onClick={() => onAddSubQuestion(answer.id)}
              size="sm"
            />
          </div>
        )
      )}
    </div>
  );
}

function QuestionCard({
  question,
  t,
  isRTL,
  onEdit,
  onDelete,
}: {
  question: Question;
  t: (k: string) => string;
  isRTL: boolean;
  onEdit: (q: Question) => void;
  onDelete: (id: string) => void;
}) {
  const Icon = iconForType(question.type);
  const isSub = !!question.parentAnswerId;
  const policyBadge =
    question.type === 'choice' && question.attachmentPolicy === 'all'
      ? t('questionCreator.attachmentBadge.all')
      : question.type === 'choice' && question.attachmentPolicy === 'per-answer'
        ? t('questionCreator.attachmentBadge.some')
        : null;
  const typeLabel =
    question.type === 'text'
      ? t('qs.type.text')
      : question.type === 'automated'
        ? t('qs.type.automated')
        : t('qs.type.choice');

  return (
    <div
      className={`qc-question-card group w-[560px] max-w-full rounded-2xl border ${
        isSub ? 'border-emerald-300/70' : 'border-border/70'
      }`}
      data-sub={isSub ? 'true' : undefined}
    >
      <div className={`flex items-center gap-3 px-5 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Icon medallion */}
        <span
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
            isSub ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          <Icon className="w-[18px] h-[18px]" />
        </span>

        {/* Title + meta */}
        <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-2 mb-0.5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span
              className="uppercase text-emerald-700"
              style={{ fontSize: '9.5px', fontWeight: 600, letterSpacing: '0.14em' }}
            >
              {typeLabel}
            </span>
            {question.type === 'automated' && (
              <>
                <span className="w-1 h-1 rounded-full bg-emerald-300" />
                <span
                  className="inline-flex items-center gap-1 text-blue-700"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  {t('questionCreator.automatedBadge')}
                </span>
              </>
            )}
            {policyBadge && (
              <>
                <span className="w-1 h-1 rounded-full bg-emerald-300" />
                <span
                  className="inline-flex items-center gap-1 text-amber-700"
                  style={{ fontSize: '10px', fontWeight: 600 }}
                >
                  <Paperclip className="w-2.5 h-2.5" />
                  {policyBadge}
                </span>
              </>
            )}
          </div>
          <p
            className="text-foreground truncate"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 500, lineHeight: 1.4 }}
          >
            {question.title || t('questionCreator.untitledQuestion')}
          </p>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="shrink-0 w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors opacity-60 group-hover:opacity-100"
              aria-label="Question menu"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="w-48">
            <DropdownMenuItem onClick={() => onEdit(question)}>
              <Pencil className="w-4 h-4 me-2" />
              {t('questionCreator.menu.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Copy className="w-4 h-4 me-2" />
              {t('questionCreator.menu.duplicate')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(question.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 me-2" />
              {t('questionCreator.menu.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Reusable ghost-add affordance (used both for "+ Add new question" and "+ Add new option")
function GhostAdd({
  label,
  onClick,
  size = 'sm',
}: {
  label: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
}) {
  const dim = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  return (
    <button
      type="button"
      onClick={onClick}
      className="qc-ghost flex flex-col items-center gap-1.5 group"
    >
      <span
        className={`qc-ghost-circle ${dim} rounded-full border border-dashed border-slate-300 bg-white/60 flex items-center justify-center transition-colors`}
      >
        <Plus className="qc-ghost-icon w-4 h-4 text-muted-foreground" />
      </span>
      <span
        className="qc-ghost-label text-muted-foreground transition-colors whitespace-nowrap"
        style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.01em' }}
      >
        {label}
      </span>
    </button>
  );
}

function iconForType(type: QuestionType) {
  if (type === 'text') return TypeIcon;
  if (type === 'automated') return Sparkles;
  return ListChecks;
}
