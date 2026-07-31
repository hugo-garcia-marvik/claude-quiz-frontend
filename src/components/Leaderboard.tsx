import type { LeaderboardEntry } from "../types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading?: boolean;
  error?: string | null;
  onBack: () => void;
  onRefresh: () => void;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function Leaderboard({
  entries,
  loading,
  error,
  onBack,
  onRefresh,
}: LeaderboardProps) {
  return (
    <div className="card leaderboard-card">
      <header className="lb-header">
        <div>
          <p className="eyebrow">Ranking</p>
          <h1>Tabla de líderes</h1>
        </div>
        <div className="actions inline">
          <button type="button" className="btn ghost" onClick={onRefresh} disabled={loading}>
            Actualizar
          </button>
          <button type="button" className="btn secondary" onClick={onBack}>
            Volver
          </button>
        </div>
      </header>

      {loading && <p className="muted">Cargando ranking…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && entries.length === 0 && (
        <p className="empty">Aún no hay puntajes. ¡Sé el primero en completar el quiz!</p>
      )}

      {!loading && entries.length > 0 && (
        <div className="table-wrap">
          <p className="muted tiebreaker-note">Empates: gana el intento más reciente</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Puntaje</th>
                <th>%</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={`${e.rank}-${e.player_name}-${e.created_at}`}>
                  <td>
                    <span className={`rank rank-${e.rank <= 3 ? e.rank : "n"}`}>
                      {e.rank}
                    </span>
                  </td>
                  <td className="player">{e.player_name}</td>
                  <td>
                    {e.score}/{e.total}
                  </td>
                  <td>{e.percentage}%</td>
                  <td className="muted">{formatDate(e.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
