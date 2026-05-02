export type QuestionType = 'text' | 'choice' | 'automated';
export type AnswerType = 'short-text' | 'link' | 'number';
export type AttachmentPolicy = 'none' | 'all' | 'per-answer';
export type ActionType = 'sub-question' | 'corrective';

export interface Answer {
  id: string;
  text: string;
  // Multiple choice fields
  riskType?: string;
  scorePercentage?: number;
  hasActions?: boolean;
  actionType?: ActionType;
  actionDetails?: string;
  actionReason?: string;
  actionUrl?: string;
  // Per-answer attachment requirement (Bug 102680)
  requireAttachment?: boolean;
  // Free-text answer settings
  answerType?: AnswerType;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  parentAnswerId: string | null;
  /** Business category (Compliance, Operations, Finance, …). */
  category?: string;
  /** Multiple-choice only: data source feeding the predefined answers. */
  dataSource?: string;
  /**
   * Multiple choice attachment policy:
   * - none      → no attachment ever required
   * - all       → every answer enforces attachment (master switch)
   * - per-answer → respect Answer.requireAttachment flag (Bug 102680)
   */
  attachmentPolicy: AttachmentPolicy;
  /** For free-text questions: whether the user must upload an attachment with their answer. */
  textAllowAttachment?: boolean;
  answers: Answer[];
}
