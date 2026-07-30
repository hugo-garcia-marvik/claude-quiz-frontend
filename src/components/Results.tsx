import type { Question, SubmitResponse } from "../types";

interface ResultsProps {
  result: SubmitResponse;
  questions: Question[];
  onRetry: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
}

export function Results({
  result,
  questions,
  onRetry,
  onLeaderboard,
  onHome,
}: ResultsProps) {
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]));

  return (
    <div className="card results-card">
      <div className="score-ring" data-score={result.percentage >= 70 ? "good" : "mid"}>
        <strong>
          {result.score}/{result.total}
        </strong>
        <span>{result.percentage}%</span>
      </div>
      <h1>Resultados de {result.player_name}</h1>
      <p className="message">{result.message}</p>

      <div className="actions">
        <button type="button" className="btn primary" onClick={onRetry}>
          Reintentar
        </button>
        <button type="button" className="btn secondary" onClick={onLeaderboard}>
          Ver líderes
        </button>
        <button type="button" className="btn ghost" onClick={onHome}>
          Inicio
        </button>
      </div>

      <div className="review-list">
        <h3>Revisión</h3>
        {result.results.map((r) => {
          const q = byId[r.question_id];
          if (!q) return null;
          return (
            <article
              key={r.question_id}
              className={`review-item ${r.correct ? "correct" : "wrong"}`}
            >
              <header>
                <span className="review-badge">
                  {r.correct ? "Correcta" : "Incorrecta"}
                </span>
                <span className="domain-chip small">{q.domain}</span>
              </header>
              <p className="question-text">{q.question}</p>
              <p className="answer-line">
                <strong>Respuesta correcta:</strong>{" "}
                {String.fromCharCode(65 + r.correct_index)}.{" "}
                {q.options[r.correct_index]}
              </p>
              <p className="explanation">{r.explanation}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
