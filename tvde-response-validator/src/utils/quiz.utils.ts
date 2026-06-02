import type {
  Question,
  UserAnswers,
  OptionLetter,
  ResultStatus,
  QuizResult,
} from '../types/quiz.types';

const STORAGE_KEY = 'tvde-validator-answers';

/**
 * Determines the result status of a single question based on the user's answer.
 *
 * Evaluation order:
 * 1. If the user did not answer → "unanswered"
 * 2. If the answer key is empty → "pending-answer-key"
 * 3. If the answer matches → "correct"
 * 4. If the answer differs → "wrong"
 */
export function getResultStatus(
  question: Question,
  userAnswer?: OptionLetter,
): ResultStatus {
  if (!userAnswer) {
    return 'unanswered';
  }

  if (question.correctResponseLetter === '') {
    return 'pending-answer-key';
  }

  if (userAnswer === question.correctResponseLetter) {
    return 'correct';
  }

  return 'wrong';
}

/**
 * Calculates the overall quiz result from all questions and user answers.
 *
 * Score percentage is based only on valid questions (correct + wrong).
 * Pending and unanswered questions are excluded from the percentage calculation.
 */
export function calculateResult(
  questions: Question[],
  userAnswers: UserAnswers,
): QuizResult {
  let correct = 0;
  let wrong = 0;
  let pending = 0;
  let unanswered = 0;

  for (const question of questions) {
    const status = getResultStatus(
      question,
      userAnswers[question.questionNumber],
    );

    switch (status) {
      case 'correct':
        correct++;
        break;
      case 'wrong':
        wrong++;
        break;
      case 'pending-answer-key':
        pending++;
        break;
      case 'unanswered':
        unanswered++;
        break;
    }
  }

  const validQuestions = correct + wrong;
  const percentage =
    validQuestions > 0 ? Math.round((correct / validQuestions) * 100) : 0;

  return {
    total: questions.length,
    answered: correct + wrong + pending,
    correct,
    wrong,
    pending,
    unanswered,
    percentage,
  };
}

/**
 * Saves user answers to localStorage.
 */
export function saveAnswers(answers: UserAnswers): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    console.warn('Failed to save answers to localStorage.');
  }
}

/**
 * Loads previously saved user answers from localStorage.
 * Returns null if no saved data exists or if the data is corrupted.
 */
export function loadAnswers(): UserAnswers | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserAnswers;
  } catch {
    console.warn('Failed to load answers from localStorage.');
    return null;
  }
}

/**
 * Removes saved user answers from localStorage.
 */
export function clearAnswers(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.warn('Failed to clear answers from localStorage.');
  }
}
