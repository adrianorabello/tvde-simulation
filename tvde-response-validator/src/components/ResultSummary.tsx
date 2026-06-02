import type { QuizResult } from '../types/quiz.types';

type ResultSummaryProps = {
  result: QuizResult;
};

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <section
      className="result-summary"
      role="region"
      aria-label="Resultado do teste"
    >
      <div className="result-summary__score">{result.percentage}%</div>
      <div className="result-summary__label">Pontuação Final</div>

      <div className="result-summary__grid">
        <div className="result-summary__item">
          <div className="result-summary__item-value">{result.total}</div>
          <div className="result-summary__item-label">Total</div>
        </div>

        <div className="result-summary__item">
          <div className="result-summary__item-value">{result.answered}</div>
          <div className="result-summary__item-label">Respondidas</div>
        </div>

        <div className="result-summary__item result-summary__item--correct">
          <div className="result-summary__item-value">{result.correct}</div>
          <div className="result-summary__item-label">Corretas</div>
        </div>

        <div className="result-summary__item result-summary__item--wrong">
          <div className="result-summary__item-value">{result.wrong}</div>
          <div className="result-summary__item-label">Erradas</div>
        </div>

        <div className="result-summary__item result-summary__item--pending">
          <div className="result-summary__item-value">{result.pending}</div>
          <div className="result-summary__item-label">Pendentes</div>
        </div>

        <div className="result-summary__item result-summary__item--unanswered">
          <div className="result-summary__item-value">{result.unanswered}</div>
          <div className="result-summary__item-label">Não respondidas</div>
        </div>
      </div>
    </section>
  );
}
