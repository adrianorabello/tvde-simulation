export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export type Question = {
  questionNumber: number;
  questionId: string;
  page: number;
  group: string;
  question: string;
  options: Partial<Record<OptionLetter, string>>;
  correctResponseLetter: OptionLetter | '';
  correctResponseText: string;
  imageUrl?: string;
};

export type UserAnswers = Record<number, OptionLetter>;

export type ResultStatus =
  | 'correct'
  | 'wrong'
  | 'pending-answer-key'
  | 'unanswered';

export type QuizResult = {
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  pending: number;
  unanswered: number;
  percentage: number;
};
