"use client";

import { useState } from "react";
import type { Session, PlayerScore } from "@/types/session";

const INITIAL_SESSIONS: Session[] = [
  {
    id: "s1",
    gameId: "3",
    date: "2026-03-20",
    scores: { "1": 72, "2": 65 },
  },
  {
    id: "s2",
    gameId: "1",
    date: "2026-03-22",
    scores: {
      "1": {
        Civil: 14,
        Científico: 10,
        Militar: 6,
        Comercial: 8,
        Guilda: 4,
        Maravilha: 12,
        Progresso: 5,
        Moedas: 3,
      },
      "2": {
        Civil: 18,
        Científico: 4,
        Militar: 2,
        Comercial: 12,
        Guilda: 6,
        Maravilha: 10,
        Progresso: 8,
        Moedas: 5,
      },
    },
  },
];

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);

  function addSession(
    gameId: string,
    date: string,
    scores: Record<string, PlayerScore>
  ) {
    const newSession: Session = {
      id: crypto.randomUUID(),
      gameId,
      date,
      scores,
    };
    setSessions((prev) => [...prev, newSession]);
  }

  return { sessions, addSession };
}
