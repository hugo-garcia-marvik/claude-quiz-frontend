interface WelcomeProps {
  playerName: string;
  message: string;
  onStartQuiz: () => void;
  onLeaderboard: () => void;
}

export function Welcome({
  playerName,
  message,
  onStartQuiz,
  onLeaderboard,
}: WelcomeProps) {
  return (
    <div className="card welcome-card">
      <div className="avatar">{playerName.charAt(0).toUpperCase()}</div>
      <h1>¡Hola, {playerName}!</h1>
      <p className="message">{message}</p>

      <div className="domains">
        <h3>Dominios del examen</h3>
        <ul>
          <li>
            <span>Agentic Architecture & Orchestration</span>
            <strong>27%</strong>
          </li>
          <li>
            <span>Tool Design & MCP Integration</span>
            <strong>18%</strong>
          </li>
          <li>
            <span>Claude Code Configuration & Workflows</span>
            <strong>20%</strong>
          </li>
          <li>
            <span>Prompt Engineering & Structured Output</span>
            <strong>20%</strong>
          </li>
          <li>
            <span>Context Management & Reliability</span>
            <strong>15%</strong>
          </li>
        </ul>
      </div>

      <div className="actions">
        <button type="button" className="btn primary" onClick={onStartQuiz}>
          Empezar las 10 preguntas
        </button>
        <button type="button" className="btn ghost" onClick={onLeaderboard}>
          Ver líderes
        </button>
      </div>
    </div>
  );
}
