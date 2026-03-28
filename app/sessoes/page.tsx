"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGames } from "@/hooks/useGames";
import { usePlayers } from "@/hooks/usePlayers";
import { useSessions } from "@/hooks/useSessions";
import type { Game } from "@/types/game";
import type { Player } from "@/types/player";
import type { CategoryScore, PlayerScore } from "@/types/session";

function computeTotal(score: CategoryScore): number {
  return Object.values(score).reduce((sum, v) => sum + (v || 0), 0);
}

function SimpleScoreInputs({
  players,
  scores,
  onChange,
}: {
  players: Player[];
  scores: Record<string, number>;
  onChange: (playerId: string, value: number) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {players.map((player) => (
        <div key={player.id} className="space-y-2">
          <Label>
            {player.avatar} {player.name}
          </Label>
          <Input
            type="number"
            placeholder="Pontuação"
            value={scores[player.id] ?? ""}
            onChange={(e) =>
              onChange(player.id, e.target.value === "" ? 0 : Number(e.target.value))
            }
          />
        </div>
      ))}
    </div>
  );
}

function CategoryScoreInputs({
  game,
  players,
  scores,
  onChange,
}: {
  game: Game;
  players: Player[];
  scores: Record<string, CategoryScore>;
  onChange: (playerId: string, category: string, value: number) => void;
}) {
  return (
    <div className="space-y-6">
      {players.map((player) => {
        const playerScore = scores[player.id] ?? {};
        const total = computeTotal(playerScore);

        return (
          <Card key={player.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {player.avatar} {player.name}
                </CardTitle>
                <Badge variant="secondary" className="text-sm font-semibold">
                  Total: {total}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {game.scoreCategories.map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {cat.emoji} {cat.name}
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={playerScore[cat.name] ?? ""}
                      onChange={(e) =>
                        onChange(
                          player.id,
                          cat.name,
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-end text-sm font-medium">
              Soma: {total} pontos
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

function SessionHistory({
  games,
  players,
}: {
  games: Game[];
  players: Player[];
}) {
  const { sessions } = useSessions();
  const gamesById = useMemo(
    () => new Map(games.map((g) => [g.id, g])),
    [games]
  );
  const playersById = useMemo(
    () => new Map(players.map((p) => [p.id, p])),
    [players]
  );

  if (sessions.length === 0) return null;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-bold tracking-tight">Histórico</h2>
      <div className="space-y-3">
        {[...sessions].reverse().map((session) => {
          const game = gamesById.get(session.gameId);
          if (!game) return null;

          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{game.title}</CardTitle>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {session.date}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(session.scores).map(([playerId, score]) => {
                    const player = playersById.get(playerId);
                    if (!player) return null;

                    const total =
                      typeof score === "number"
                        ? score
                        : computeTotal(score);

                    return (
                      <div key={playerId} className="text-sm">
                        <span className="font-medium">
                          {player.avatar} {player.name}
                        </span>
                        :{" "}
                        <span className="font-semibold">{total} pts</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function SessionsPage() {
  const { games } = useGames();
  const { players } = usePlayers();
  const { addSession } = useSessions();

  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [simpleScores, setSimpleScores] = useState<Record<string, number>>({});
  const [categoryScores, setCategoryScores] = useState<
    Record<string, CategoryScore>
  >({});
  const [saved, setSaved] = useState(false);

  const selectedGame = games.find((g) => g.id === selectedGameId);

  function handleGameChange(gameId: string | null) {
    setSelectedGameId(gameId ?? "");
    setSimpleScores({});
    setCategoryScores({});
    setSaved(false);
  }

  function handleSimpleChange(playerId: string, value: number) {
    setSimpleScores((prev) => ({ ...prev, [playerId]: value }));
  }

  function handleCategoryChange(
    playerId: string,
    category: string,
    value: number
  ) {
    setCategoryScores((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], [category]: value },
    }));
  }

  function handleSave() {
    if (!selectedGame) return;

    const scores: Record<string, PlayerScore> =
      selectedGame.scoringType === "simple"
        ? { ...simpleScores }
        : { ...categoryScores };

    addSession(selectedGame.id, date, scores);

    setSimpleScores({});
    setCategoryScores({});
    setSelectedGameId("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const canSave =
    selectedGame &&
    players.every((p) => {
      if (selectedGame.scoringType === "simple") {
        return simpleScores[p.id] !== undefined;
      }
      const cs = categoryScores[p.id];
      return (
        cs &&
        selectedGame.scoreCategories.some((cat) => cs[cat.name] !== undefined)
      );
    });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Nova Sessão</h1>
        <p className="mt-1 text-muted-foreground">
          Registre o resultado de uma partida.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Jogo</Label>
            <Select value={selectedGameId} onValueChange={handleGameChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um jogo" />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game.id} value={game.id}>
                    {game.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-date">Data</Label>
            <Input
              id="session-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {selectedGame && (
          <>
            <div className="rounded-lg border border-border/60 bg-card p-4">
              <p className="mb-1 text-sm font-medium">
                {selectedGame.title}
              </p>
              <Badge variant="outline" className="text-xs">
                {selectedGame.scoringType === "simple"
                  ? "Pontuação simples"
                  : `${selectedGame.scoreCategories.length} categorias`}
              </Badge>
            </div>

            {selectedGame.scoringType === "simple" ? (
              <SimpleScoreInputs
                players={players}
                scores={simpleScores}
                onChange={handleSimpleChange}
              />
            ) : (
              <CategoryScoreInputs
                game={selectedGame}
                players={players}
                scores={categoryScores}
                onChange={handleCategoryChange}
              />
            )}

            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="gap-1.5"
                disabled={!canSave}
                onClick={handleSave}
              >
                <Save className="size-4" />
                Salvar Sessão
              </Button>
              {saved && (
                <span className="text-sm font-medium text-green-700">
                  ✓ Sessão salva!
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <SessionHistory games={games} players={players} />
    </main>
  );
}
