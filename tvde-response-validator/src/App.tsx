import { useState, useEffect, useMemo } from 'react';
import questionsData from './data/questions.json';
import type { Question, OptionLetter, UserAnswers } from './types/quiz.types';
import {
  calculateResult,
  saveAnswers,
  loadAnswers,
  clearAnswers,
} from './utils/quiz.utils';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultSummary } from './components/ResultSummary';
import { ReviewTable } from './components/ReviewTable';

const questions: Question[] = questionsData as Question[];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(() => {
    return loadAnswers() ?? {};
  });
  const [isFinished, setIsFinished] = useState(false);

  // Auto-save answers to localStorage on every change
  useEffect(() => {
    saveAnswers(userAnswers);
  }, [userAnswers]);

  // Calculate results (memoized)
  const result = useMemo(
    () => calculateResult(questions, userAnswers),
    [userAnswers],
  );

  const currentQuestion = questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(userAnswers).length;

  function handleSelectAnswer(letter: OptionLetter) {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.questionNumber]: letter,
    }));
  }

  function handlePrevious() {
    if (!isFirstQuestion) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleNext() {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleFinish() {
    setIsFinished(true);
  }

  function handleReset() {
    const confirmed = window.confirm(
      'Tem a certeza que deseja recomeçar o teste? Todo o progresso será perdido.',
    );
    if (confirmed) {
      setUserAnswers({});
      setCurrentIndex(0);
      setIsFinished(false);
      clearAnswers();
    }
  }

  function handleBackToQuiz() {
    setIsFinished(false);
    setCurrentIndex(0);
  }

  // Results screen
  if (isFinished) {
    return (
      <Layout>
        <Header />
        <ResultSummary result={result} />
        <ReviewTable questions={questions} userAnswers={userAnswers} />
        <div className="results-actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleBackToQuiz}
          >
            ← Rever Teste
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={handleReset}
          >
            Recomeçar
          </button>
        </div>
      </Layout>
    );
  }

  // Quiz screen
  return (
    <Layout>
      <Header />
      <ProgressBar answered={answeredCount} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestion.questionNumber]}
        onSelectAnswer={handleSelectAnswer}
      />

      <nav className="navigation" aria-label="Navegação entre perguntas">
        <div className="navigation__group">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            ← Anterior
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleNext}
            disabled={isLastQuestion}
          >
            Seguinte →
          </button>
        </div>
        <div className="navigation__group">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleFinish}
          >
            Terminar Teste
          </button>
        </div>
      </nav>
    </Layout>
  );
}

export default App;
