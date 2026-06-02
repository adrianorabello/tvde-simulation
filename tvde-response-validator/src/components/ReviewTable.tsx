import type { Question, UserAnswers, ResultStatus } from '../types/quiz.types';
import { getResultStatus } from '../utils/quiz.utils';

type ReviewTableProps = {
  questions: Question[];
  userAnswers: UserAnswers;
};

const STATUS_CONFIG: Record<
  ResultStatus,
  { label: string; icon: string; className: string }
> = {
  correct: {
    label: 'Correta',
    icon: '✅',
    className: 'status-badge--correct',
  },
  wrong: {
    label: 'Errada',
    icon: '❌',
    className: 'status-badge--wrong',
  },
  'pending-answer-key': {
    label: 'Pendente',
    icon: '⏳',
    className: 'status-badge--pending',
  },
  unanswered: {
    label: 'Não respondida',
    icon: '⬜',
    className: 'status-badge--unanswered',
  },
};

export function ReviewTable({ questions, userAnswers }: ReviewTableProps) {
  return (
    <div className="review-table-container">
      <h2 className="review-table-container__title">Revisão de Respostas</h2>
      <div className="review-table-wrapper">
        <table className="review-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sua Resposta</th>
              <th scope="col">Resposta Correta</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              const userAnswer = userAnswers[question.questionNumber];
              const status = getResultStatus(question, userAnswer);
              const config = STATUS_CONFIG[status];

              return (
                <tr key={question.questionNumber}>
                  <td>{question.questionNumber}</td>
                  <td>{userAnswer || '—'}</td>
                  <td>{question.correctResponseLetter || '—'}</td>
                  <td>
                    <span className={`status-badge ${config.className}`}>
                      <span aria-hidden="true">{config.icon}</span>
                      {config.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
