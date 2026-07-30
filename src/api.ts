import type {
  Leaderboard,
  Quiz,
  SubmitResponse,
  Welcome,
  AnswerItem,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      /* ignore */
    }
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }

  return res.json() as Promise<T>;
}

export function fetchWelcome(playerName: string): Promise<Welcome> {
  return request(`/api/welcome/${encodeURIComponent(playerName)}`);
}

export function fetchQuiz(): Promise<Quiz> {
  return request("/api/quiz");
}

export function submitQuiz(
  playerName: string,
  answers: AnswerItem[],
): Promise<SubmitResponse> {
  return request("/api/quiz/submit", {
    method: "POST",
    body: JSON.stringify({ player_name: playerName, answers }),
  });
}

export function fetchLeaderboard(limit = 10): Promise<Leaderboard> {
  return request(`/api/leaderboard?limit=${limit}`);
}
