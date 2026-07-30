import { useCallback, useState } from "react";
import { fetchLeaderboard, fetchQuiz, fetchWelcome, submitQuiz } from "./api";
import { Leaderboard } from "./components/Leaderboard";
import { Login } from "./components/Login";
import { Quiz } from "./components/Quiz";
import { Results } from "./components/Results";
import { Welcome } from "./components/Welcome";
import type {
  AnswerItem,
  LeaderboardEntry,
  Question,
  SubmitResponse,
  View,
} from "./types";
import "./App.css";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [playerName, setPlayerName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [returnView, setReturnView] = useState<View>("login");

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeaderboard(15);
      setLeaders(data.entries);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar líderes");
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleStart(name: string) {
    setLoading(true);
    setError(null);
    try {
      const welcome = await fetchWelcome(name);
      setPlayerName(welcome.player_name);
      setWelcomeMessage(welcome.message);
      setView("welcome");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar al backend");
    } finally {
      setLoading(false);
    }
  }

  async function handleStartQuiz() {
    setLoading(true);
    setError(null);
    try {
      const quiz = await fetchQuiz();
      setQuizTitle(quiz.title);
      setQuestions(quiz.questions);
      setResult(null);
      setView("quiz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el quiz");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(answers: AnswerItem[]) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitQuiz(playerName, answers);
      setResult(res);
      setView("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar respuestas");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOpenLeaderboard() {
    setReturnView(view);
    setView("leaderboard");
    await loadLeaderboard();
  }

  function handleHome() {
    setView("login");
    setPlayerName("");
    setWelcomeMessage("");
    setQuestions([]);
    setResult(null);
    setError(null);
  }

  return (
    <div className="app">
      <div className="bg-glow" aria-hidden />
      <header className="topbar">
        <button type="button" className="brand" onClick={handleHome}>
          <span className="brand-mark">C</span>
          <span>
            Claude Architect Quiz
            <small>Foundations practice</small>
          </span>
        </button>
        <nav>
          {view !== "login" && (
            <button type="button" className="nav-link" onClick={handleHome}>
              Inicio
            </button>
          )}
          <button type="button" className="nav-link" onClick={handleOpenLeaderboard}>
            Líderes
          </button>
        </nav>
      </header>

      <main className="main">
        {view === "login" && (
          <Login
            onStart={handleStart}
            onLeaderboard={handleOpenLeaderboard}
            loading={loading}
            error={error}
          />
        )}

        {view === "welcome" && (
          <Welcome
            playerName={playerName}
            message={welcomeMessage}
            onStartQuiz={handleStartQuiz}
            onLeaderboard={handleOpenLeaderboard}
          />
        )}

        {view === "quiz" && questions.length > 0 && (
          <Quiz
            title={quizTitle}
            questions={questions}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}

        {view === "results" && result && (
          <Results
            result={result}
            questions={questions}
            onRetry={handleStartQuiz}
            onLeaderboard={handleOpenLeaderboard}
            onHome={handleHome}
          />
        )}

        {view === "leaderboard" && (
          <Leaderboard
            entries={leaders}
            loading={loading}
            error={error}
            onBack={() => {
              setError(null);
              setView(returnView === "leaderboard" ? "login" : returnView);
            }}
            onRefresh={loadLeaderboard}
          />
        )}
      </main>

      <footer className="footer">
        Material de práctica no oficial · No afiliado a Anthropic
      </footer>
    </div>
  );
}
