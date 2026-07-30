import { useState, type FormEvent } from "react";

interface LoginProps {
  onStart: (name: string) => void;
  onLeaderboard: () => void;
  loading?: boolean;
  error?: string | null;
}

export function Login({ onStart, onLeaderboard, loading, error }: LoginProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onStart(trimmed);
  }

  return (
    <div className="card login-card">
      <div className="badge">CCA-F Practice</div>
      <h1>Claude Certified Architect</h1>
      <p className="subtitle">Foundations — Quiz de práctica</p>
      <p className="hint">
        10 preguntas sobre arquitectura agentic, MCP, Claude Code, prompts y
        fiabilidad. Ingresa tu nombre para comenzar.
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="player-name">Tu nombre</label>
        <input
          id="player-name"
          type="text"
          maxLength={80}
          placeholder="Ej. Hugo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          disabled={loading}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn primary" disabled={loading || !name.trim()}>
          {loading ? "Entrando…" : "Comenzar quiz"}
        </button>
      </form>

      <button type="button" className="btn ghost" onClick={onLeaderboard}>
        Ver tabla de líderes
      </button>
    </div>
  );
}
