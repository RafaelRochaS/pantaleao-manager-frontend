export type SimpleScore = number;

export type CategoryScore = Record<string, number>;

export type PlayerScore = SimpleScore | CategoryScore;

export interface Session {
  id: string;
  gameId: string;
  date: string;
  scores: Record<string, PlayerScore>;
}
