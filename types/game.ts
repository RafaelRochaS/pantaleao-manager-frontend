export interface ScoreCategory {
  name: string;
  emoji: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  expansions: string[];
  matchesPlayed: number;
  scoringType: "simple" | "categories";
  scoreCategories: ScoreCategory[];
}
