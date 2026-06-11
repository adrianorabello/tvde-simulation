import { useState, useRef, useEffect } from 'react';
import type { Question } from '../types/quiz.types';

type QuestionsListProps = {
  questions: Question[];
  showCorrectAnswers: boolean;
};

export function QuestionsList({ questions, showCorrectAnswers }: QuestionsListProps) {
  const [visibleCount, setVisibleCount] = useState(20);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, questions.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [questions.length]);

  return (
    <div className="questions-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {questions.slice(0, visibleCount).map((q) => (
        <article key={q.questionNumber} className="question-card" style={{ padding: '20px', flex: 'initial', overflowY: 'visible' }}>
          <div className="question-card__meta" style={{ marginBottom: '10px' }}>
            <span className="question-card__number">
              Pergunta {q.questionNumber}
            </span>
            <span className="question-card__group" style={{ marginLeft: '10px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
              {q.group}
            </span>
          </div>

          {q.imageUrl && (
             <div className="question-image-wrapper" style={{ marginBottom: '15px' }}>
               <img
                 src={q.imageUrl}
                 alt={`Imagem da pergunta ${q.questionNumber}`}
                 className="question-image"
                 style={{ maxHeight: '200px' }}
               />
             </div>
          )}

          <p className="question-card__text" style={{ fontWeight: 600, marginBottom: '15px' }}>
            {q.question}
          </p>

          <div className="question-card__options" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(q.options).map(([letter, text]) => (
              <div
                key={letter}
                style={{
                  padding: '10px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: showCorrectAnswers && q.correctResponseLetter === letter ? 'var(--color-correct-light)' : 'var(--color-surface)',
                  borderColor: showCorrectAnswers && q.correctResponseLetter === letter ? 'var(--color-correct)' : 'var(--color-border)'
                }}
              >
                <strong style={{ marginRight: '8px' }}>{letter})</strong> {text}
              </div>
            ))}
          </div>
        </article>
      ))}
      
      {visibleCount < questions.length && (
        <div ref={observerTarget} style={{ height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>A carregar mais questões...</span>
        </div>
      )}
    </div>
  );
}
