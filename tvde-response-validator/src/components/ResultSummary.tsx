import { useEffect, useState } from 'react';
import type { QuizResult } from '../types/quiz.types';

type ResultSummaryProps = {
  result: QuizResult;
};

const PASS_THRESHOLD = 75;

function getScoreColor(percentage: number, hasValidated: boolean): string {
  if (!hasValidated) return 'var(--color-pending-dark)';
  if (percentage >= PASS_THRESHOLD) return 'var(--color-correct)';
  if (percentage >= 50) return 'var(--color-pending-dark)';
  return 'var(--color-wrong)';
}

function getGradeEmoji(percentage: number, hasValidated: boolean): string {
  if (!hasValidated) return '⏳';
  if (percentage >= 90) return '🏆';
  if (percentage >= PASS_THRESHOLD) return '✅';
  if (percentage >= 50) return '⚠️';
  return '❌';
}

function getGradeMessage(
  percentage: number,
  hasValidated: boolean,
  pending: number,
): string {
  if (!hasValidated) {
    return `${pending} perguntas aguardam gabarito`;
  }
  if (percentage >= 90) return 'Excelente! Resultado brilhante!';
  if (percentage >= PASS_THRESHOLD) return 'Aprovado! Bom trabalho!';
  if (percentage >= 50) return 'Quase lá! Continue a estudar.';
  return 'Reprovado. Mais estudo é necessário.';
}

export function ResultSummary({ result }: ResultSummaryProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const hasValidated = result.correct + result.wrong > 0;
  const scoreColor = getScoreColor(result.percentage, hasValidated);

  // Animate score on mount
  useEffect(() => {
    const target = hasValidated ? result.percentage : 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPercentage(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [result.percentage, hasValidated]);

  // SVG circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const displayPercentage = hasValidated ? animatedPercentage : 0;
  const strokeDashoffset =
    circumference - (displayPercentage / 100) * circumference;

  const passed = hasValidated && result.percentage >= PASS_THRESHOLD;

  return (
    <section
      className="result-summary"
      role="region"
      aria-label="Resultado do teste"
    >
      {/* Score Ring */}
      <div className="result-summary__ring-container">
        <svg
          className="result-summary__ring"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="12"
            opacity="0.3"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            className="result-summary__ring-progress"
          />
        </svg>
        <div className="result-summary__ring-content">
          <div
            className="result-summary__score"
            style={{ color: scoreColor }}
          >
            {hasValidated ? `${animatedPercentage}%` : '—'}
          </div>
          <div className="result-summary__score-label">
            {hasValidated ? 'Pontuação' : 'Sem gabarito'}
          </div>
        </div>
      </div>

      {/* Pass/Fail Badge */}
      <div
        className={`result-summary__badge ${
          hasValidated
            ? passed
              ? 'result-summary__badge--pass'
              : 'result-summary__badge--fail'
            : 'result-summary__badge--pending'
        }`}
      >
        <span className="result-summary__badge-emoji">
          {getGradeEmoji(result.percentage, hasValidated)}
        </span>
        <span className="result-summary__badge-text">
          {hasValidated
            ? passed
              ? 'APROVADO'
              : 'REPROVADO'
            : 'PENDENTE'}
        </span>
      </div>

      <p className="result-summary__message">
        {getGradeMessage(result.percentage, hasValidated, result.pending)}
      </p>

      {hasValidated && (
        <p className="result-summary__threshold">
          Mínimo para aprovação: {PASS_THRESHOLD}%
        </p>
      )}

      {/* Stats Grid */}
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
          <div className="result-summary__item-value">
            {result.unanswered}
          </div>
          <div className="result-summary__item-label">Não respondidas</div>
        </div>
      </div>
    </section>
  );
}
