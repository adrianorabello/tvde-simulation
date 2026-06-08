import type { QuizResult } from '../types/quiz.types';

type DashboardCardsProps = {
  total: number;
  answered: number;
  result: QuizResult;
};

export function DashboardCards({ total, answered, result }: DashboardCardsProps) {
  const progressPercent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const hasValidated = result.correct + result.wrong > 0;
  const resultDisplay = hasValidated ? `${result.percentage}%` : '—';

  return (
    <div className="dash-cards">
      <div className="dash-card">
        <div className="dash-card__icon dash-card__icon--blue">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div className="dash-card__content">
          <span className="dash-card__value">{total}</span>
          <span className="dash-card__label">Total de Questões</span>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card__icon dash-card__icon--emerald">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="dash-card__content">
          <span className="dash-card__value">{answered}</span>
          <span className="dash-card__label">Respondidas</span>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card__icon dash-card__icon--amber">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div className="dash-card__content">
          <span className="dash-card__value">{progressPercent}%</span>
          <span className="dash-card__label">Progresso</span>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card__icon dash-card__icon--violet">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
        </div>
        <div className="dash-card__content">
          <span className="dash-card__value">{resultDisplay}</span>
          <span className="dash-card__label">Resultado Atual</span>
        </div>
      </div>
    </div>
  );
}
