import { useMemo, useState } from "react";
import type { AnswerItem, Question } from "../types";

interface QuizProps {
  title: string;
  questions: Question[];
  onSubmit: (answers: AnswerItem[]) => void;
  submitting?: boolean;
  error?: string | null;
}

export function Quiz({
  title,
  questions,
  onSubmit,
  submitting,
  error,
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[current];
  const progress = useMemo(
    () => Math.round(((current + 1) / questions.length) * 100),
    [current, questions.length],
  );
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  function selectOption(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  }

  function goNext() {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
  }

  function goPrev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function handleSubmit() {
    if (!allAnswered) return;
    const payload: AnswerItem[] = questions.map((q) => ({
      question_id: q.id,
      selected_index: answers[q.id],
    }));
    onSubmit(payload);
  }

  return (
    <div className="card quiz-card">
      <header className="quiz-header">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>
            Pregunta {current + 1}{" "}
            <span className="muted">/ {questions.length}</span>
          </h2>
        </div>
        <div className="progress-meta">
          {answeredCount}/{questions.length} respondidas
        </div>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="domain-chip">{question.domain}</div>
      <p className="question-text">{question.question}</p>

      <div className="options" role="radiogroup" aria-label="Opciones">
        {question.options.map((opt, idx) => {
          const selected = answers[question.id] === idx;
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`option ${selected ? "selected" : ""}`}
              onClick={() => selectOption(idx)}
            >
              <span className="option-letter">{letter}</span>
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="quiz-nav">
        <button
          type="button"
          className="btn ghost"
          onClick={goPrev}
          disabled={current === 0 || submitting}
        >
          Anterior
        </button>

        <div className="dots">
          {questions.map((q, i) => (
            <button
              key={q.id}
              type="button"
              className={`dot ${i === current ? "active" : ""} ${
                answers[q.id] !== undefined ? "answered" : ""
              }`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a pregunta ${i + 1}`}
            />
          ))}
        </div>

        {current < questions.length - 1 ? (
          <button
            type="button"
            className="btn primary"
            onClick={goNext}
            disabled={answers[question.id] === undefined || submitting}
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            className="btn primary"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
          >
            {submitting ? "Enviando…" : "Finalizar quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
