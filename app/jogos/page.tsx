"use client";

import { useState } from "react";
import { Dice5, Plus, Puzzle, Swords, Trash2 } from "lucide-react";
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
import { useGames } from "@/hooks/useGames";
import type { Game, ScoreCategory } from "@/types/game";

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
            Pontuação
          </p>
          {game.scoringType === "categories" ? (
            <div className="mt-1 flex flex-wrap gap-1">
              {game.scoreCategories.map((cat) => (
                <Badge key={cat.name} variant="outline" className="text-xs">
                  {cat.emoji} {cat.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">Pontuação simples</p>
          )}
        </div>
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

const EMPTY_CATEGORY: ScoreCategory = { name: "", emoji: "" };

function AddGameDialog({
  onAdd,
}: {
  onAdd: (game: Omit<Game, "id" | "matchesPlayed">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [expansions, setExpansions] = useState("");
  const [scoringType, setScoringType] = useState<"simple" | "categories">("simple");
  const [categories, setCategories] = useState<ScoreCategory[]>([{ ...EMPTY_CATEGORY }]);

  function resetForm() {
    setTitle("");
    setGenre("");
    setExpansions("");
    setScoringType("simple");
    setCategories([{ ...EMPTY_CATEGORY }]);
  }

  function updateCategory(index: number, field: keyof ScoreCategory, value: string) {
    setCategories((prev) =>
      prev.map((cat, i) => (i === index ? { ...cat, [field]: value } : cat))
    );
  }

  function addCategoryRow() {
    setCategories((prev) => [...prev, { ...EMPTY_CATEGORY }]);
  }

  function removeCategoryRow(index: number) {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !genre.trim()) return;

    const scoreCategories =
      scoringType === "categories"
        ? categories.filter((c) => c.name.trim() && c.emoji.trim())
        : [];

    onAdd({
      title: title.trim(),
      genre: genre.trim(),
      expansions: expansions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      scoringType,
      scoreCategories,
    });

    resetForm();
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
      <DialogContent className="sm:max-w-md">
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
          <div className="space-y-2">
            <Label>Tipo de Pontuação</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={scoringType === "simple" ? "default" : "outline"}
                size="sm"
                onClick={() => setScoringType("simple")}
              >
                Simples
              </Button>
              <Button
                type="button"
                variant={scoringType === "categories" ? "default" : "outline"}
                size="sm"
                onClick={() => setScoringType("categories")}
              >
                Categorias
              </Button>
            </div>
          </div>
          {scoringType === "categories" && (
            <div className="space-y-3">
              <Label>Categorias de Pontuação</Label>
              <div className="space-y-2">
                {categories.map((cat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      className="w-16 shrink-0 text-center"
                      placeholder="🎯"
                      value={cat.emoji}
                      onChange={(e) => updateCategory(index, "emoji", e.target.value)}
                    />
                    <Input
                      className="flex-1"
                      placeholder="Nome da categoria"
                      value={cat.name}
                      onChange={(e) => updateCategory(index, "name", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={categories.length <= 1}
                      onClick={() => removeCategoryRow(index)}
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1"
                onClick={addCategoryRow}
              >
                <Plus className="size-3.5" />
                Adicionar Categoria
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function GamesPage() {
  const { games, addGame } = useGames();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jogos</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie sua coleção de jogos de tabuleiro.
          </p>
        </div>
        <AddGameDialog onAdd={addGame} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
