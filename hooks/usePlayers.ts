"use client";

import { useState } from "react";
import type { Player } from "@/types/player";

const INITIAL_PLAYERS: Player[] = [
  {
    id: "1",
    name: "Rafa",
    avatar: "🧔",
    gamesPlayed: 42,
    totalWins: 250,
  },
  {
    id: "2",
    name: "Pati",
    avatar: "👩",
    gamesPlayed: 42,
    totalWins: 2,
  },
];

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

  function addPlayer(name: string, avatar: string) {
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
      avatar,
      gamesPlayed: 0,
      totalWins: 0,
    };
    setPlayers((prev) => [...prev, newPlayer]);
  }

  return { players, addPlayer };
}
