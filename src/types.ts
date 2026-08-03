export interface Question {
  id: number;
  domain: string;
  question: string;
  options: string[];
}

export interface Quiz {
  title: string;
  total: number;
  questions: Question[];
}

export interface AnswerItem {
  question_id: number;
  selected_index: number;
}

export interface AnswerResult {
  question_id: number;
  correct: boolean;
  correct_index: number;
  explanation: string;
}

export interface SubmitResponse {
  player_name: string;
  score: number;
  total: number;
  percentage: number;
  results: AnswerResult[];
  message: string;
}

export interface LeaderboardEntry {
  rank: number;
  player_name: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  pass_threshold?: number;
  created_at: string;
}

export interface Leaderboard {
  entries: LeaderboardEntry[];
}

export interface Welcome {
  message: string;
  player_name: string;
}

export type View = "login" | "welcome" | "quiz" | "results" | "leaderboard";
