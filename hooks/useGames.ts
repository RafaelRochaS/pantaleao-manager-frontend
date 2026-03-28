"use client";

import { useState } from "react";
import type { Game } from "@/types/game";

const INITIAL_GAMES: Game[] = [
  {
    id: "1",
    title: "7 Wonders Duel",
    genre: "Estratégia",
    expansions: ["Pantheon", "Agora"],
    matchesPlayed: 24,
    scoringType: "categories",
    scoreCategories: [
      { name: "Civil", emoji: "🏛️" },
      { name: "Científico", emoji: "🧪" },
      { name: "Militar", emoji: "🎖️" },
      { name: "Comercial", emoji: "💰" },
      { name: "Guilda", emoji: "🏰" },
      { name: "Maravilha", emoji: "🌍" },
      { name: "Progresso", emoji: "📜" },
      { name: "Moedas", emoji: "🪙" },
    ],
  },
  {
    id: "2",
    title: "Santorini",
    genre: "Abstrato",
    expansions: ["Golden Fleece"],
    matchesPlayed: 18,
    scoringType: "simple",
    scoreCategories: [],
  },
  {
    id: "3",
    title: "Azul",
    genre: "Puzzle",
    expansions: [],
    matchesPlayed: 31,
    scoringType: "simple",
    scoreCategories: [],
  },
];

export function useGames() {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);

  function addGame(data: Omit<Game, "id" | "matchesPlayed">) {
    const newGame: Game = {
      ...data,
      id: crypto.randomUUID(),
      matchesPlayed: 0,
    };
    setGames((prev) => [...prev, newGame]);
  }

  return { games, addGame };
}
