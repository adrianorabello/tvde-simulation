import { useState } from 'react';
import type { Question, OptionLetter } from '../types/quiz.types';
import { OptionButton } from './OptionButton';

type QuestionCardProps = {
  question: Question;
  selectedAnswer?: OptionLetter;
  onSelectAnswer: (letter: OptionLetter) => void;
};

function getQuestionImageUrl(questionNumber: number): string {
  return `/images/question_${questionNumber.toString().padStart(3, '0')}.png`;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  const [prevQuestionNumber, setPrevQuestionNumber] = useState(question.questionNumber);
  const [imageError, setImageError] = useState(false);

  if (question.questionNumber !== prevQuestionNumber) {
    setPrevQuestionNumber(question.questionNumber);
    setImageError(false);
  }

  const optionEntries = Object.entries(question.options) as [
    OptionLetter,
    string,
  ][];

  const imageUrl =
    question.imageUrl || getQuestionImageUrl(question.questionNumber);

  return (
    <article className="question-card">
      <div className="question-card__meta">
        <span className="question-card__number">
          Pergunta {question.questionNumber}
        </span>
        <span className="question-card__group">{question.group}</span>
      </div>

      {imageUrl && !imageError ? (
        <div className="question-image-wrapper">
          <img
            src={imageUrl}
            alt={`Imagem da pergunta ${question.questionNumber}: ${question.question}`}
            className="question-image"
            onError={() => setImageError(true)}
          />
        </div>
      ) : imageError ? (
        <div className="question-image-error" role="alert">
          Image not available
        </div>
      ) : null}

      <p className="question-card__text">{question.question}</p>

      <div
        className="question-card__options"
        role="group"
        aria-label="Opções de resposta"
      >
        {optionEntries.map(([letter, text]) => (
          <OptionButton
            key={letter}
            letter={letter}
            text={text}
            isSelected={selectedAnswer === letter}
            onClick={() => onSelectAnswer(letter)}
          />
        ))}
      </div>
    </article>
  );
}
