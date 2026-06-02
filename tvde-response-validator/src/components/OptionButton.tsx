import type { OptionLetter } from '../types/quiz.types';

type OptionButtonProps = {
  letter: OptionLetter;
  text: string;
  isSelected: boolean;
  onClick: () => void;
};

export function OptionButton({
  letter,
  text,
  isSelected,
  onClick,
}: OptionButtonProps) {
  const className = [
    'option-button',
    isSelected ? 'option-button--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`Opção ${letter}: ${text}`}
    >
      <span className="option-button__letter">{letter})</span>
      <span className="option-button__text">{text}</span>
    </button>
  );
}
