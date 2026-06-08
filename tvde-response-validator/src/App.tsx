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
import { DashboardCards } from './components/DashboardCards';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultSummary } from './components/ResultSummary';
import { ReviewTable } from './components/ReviewTable';
import { NameModal } from './components/NameModal';

const questions: Question[] = questionsData as Question[];

function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('tvde_username') || '');
  const [activePage, setActivePage] = useState('simulados');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(() => {
    return loadAnswers() ?? {};
  });
  const [isFinished, setIsFinished] = useState(false);

  // Auto-save answers to localStorage on every change
  useEffect(() => {
    saveAnswers(userAnswers);
  }, [userAnswers]);

  const handleSaveName = (name: string) => {
    setUserName(name);
    localStorage.setItem('tvde_username', name);
  };

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

  // Render placeholder for non-implemented pages
  const renderPlaceholder = () => (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h2>Página em construção</h2>
      <p>A secção de {activePage} estará disponível em breve.</p>
    </div>
  );

  return (
    <>
      <NameModal isOpen={!userName} onSave={handleSaveName} />
      
      <Layout activePage={activePage} userName={userName} onChangePage={setActivePage}>
        <DashboardCards
          total={questions.length}
          answered={answeredCount}
          result={result}
        />

        {activePage !== 'simulados' ? (
          renderPlaceholder()
        ) : isFinished ? (
          <>
            <ResultSummary result={result} />
            <ReviewTable questions={questions} userAnswers={userAnswers} />
            <div className="results-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleBackToQuiz}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
                Rever Teste
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={handleReset}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Recomeçar
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-section">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                  </svg>
                  Anterior
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleNext}
                  disabled={isLastQuestion}
                >
                  Seguinte
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              <div className="navigation__group">
                <button
                  type="button"
                  className="btn btn--finish"
                  onClick={handleFinish}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Terminar Teste
                </button>
              </div>
            </nav>
          </div>
        )}
      </Layout>
    </>
  );
}

export default App;
