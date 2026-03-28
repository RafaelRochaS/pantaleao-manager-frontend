"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Dice5, Plus, Puzzle, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Game {
  id: number;
  title: string;
  genre: string;
  expansions: string[];
  matchesPlayed: number;
}

const INITIAL_GAMES: Game[] = [
  {
    id: 1,
    title: "7 Wonders Duel",
    genre: "Estratégia",
    expansions: ["Pantheon", "Agora"],
    matchesPlayed: 24,
  },
  {
    id: 2,
    title: "Santorini",
    genre: "Abstrato",
    expansions: ["Golden Fleece"],
    matchesPlayed: 18,
  },
  {
    id: 3,
    title: "Azul",
    genre: "Puzzle",
    expansions: [],
    matchesPlayed: 31,
  },
];

const GENRE_ICON: Record<string, React.ReactNode> = {
  Estratégia: <Swords className="size-4" />,
  Abstrato: <Dice5 className="size-4" />,
  Puzzle: <Puzzle className="size-4" />,
};

function GameCard({ game }: { game: Game }) {
  return (
    <Card className="border-border/60 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{game.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0 gap-1">
            {GENRE_ICON[game.genre]}
            {game.genre}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Expansões
          </p>
          {game.expansions.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {game.expansions.map((exp) => (
                <Badge key={exp} variant="outline" className="text-xs">
                  {exp}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm italic text-muted-foreground">
              Nenhuma
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <Dice5 className="mr-1.5 size-4" />
        <span className="text-sm">
          {game.matchesPlayed} partida{game.matchesPlayed !== 1 && "s"}
        </span>
      </CardFooter>
    </Card>
  );
}

function AddGameDialog({
  onAdd,
}: {
  onAdd: (game: Omit<Game, "id" | "matchesPlayed">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [expansions, setExpansions] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !genre.trim()) return;

    onAdd({
      title: title.trim(),
      genre: genre.trim(),
      expansions: expansions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    setTitle("");
    setGenre("");
    setExpansions("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="lg" className="gap-1.5">
            <Plus className="size-4" />
            Adicionar Jogo
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Jogo</DialogTitle>
          <DialogDescription>
            Preencha as informações do jogo de tabuleiro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Catan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Gênero</Label>
            <Input
              id="genre"
              placeholder="Ex: Estratégia"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expansions">Expansões</Label>
            <Input
              id="expansions"
              placeholder="Separadas por vírgula"
              value={expansions}
              onChange={(e) => setExpansions(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);

  function handleAddGame(data: Omit<Game, "id" | "matchesPlayed">) {
    setGames((prev) => [
      ...prev,
      { ...data, id: Date.now(), matchesPlayed: 0 },
    ]);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-4 gap-1">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </Link>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jogos</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie sua coleção de jogos de tabuleiro.
          </p>
        </div>
        <AddGameDialog onAdd={handleAddGame} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
