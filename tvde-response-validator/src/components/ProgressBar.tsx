type ProgressBarProps = {
  answered: number;
  total: number;
};

export function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="progress" role="region" aria-label="Progresso do teste">
      <div className="progress__info">
        <span>
          {answered} de {total} respondidas
        </span>
        <span>{percentage}%</span>
      </div>
      <div
        className="progress__bar"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% completo`}
      >
        <div className="progress__fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
