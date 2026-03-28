"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { usePlayers } from "@/hooks/usePlayers";
import type { Player } from "@/types/player";

const AVATAR_OPTIONS = ["🧔", "👩", "🧑", "👦", "👧", "🎲", "🃏", "♟️"];

function PlayerRow({ player }: { player: Player }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border/60 bg-card px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-xl">
        {player.avatar}
      </span>
      <div className="flex-1">
        <p className="font-medium">{player.name}</p>
        <div className="mt-0.5 flex gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Gamepad2 className="size-3.5" />
            {player.gamesPlayed} partida{player.gamesPlayed !== 1 && "s"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Trophy className="size-3.5" />
            {player.totalWins} vitória{player.totalWins !== 1 && "s"}
          </span>
        </div>
      </div>
    </div>
  );
}

function AddPlayerDialog({
  onAdd,
}: {
  onAdd: (name: string, avatar: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd(name.trim(), selectedAvatar);
    setName("");
    setSelectedAvatar(AVATAR_OPTIONS[0]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="lg" className="gap-1.5">
            <Plus className="size-4" />
            Adicionar Jogador
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Jogador</DialogTitle>
          <DialogDescription>
            Escolha um nome e um avatar para o jogador.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="player-name">Nome</Label>
            <Input
              id="player-name"
              placeholder="Ex: João"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`flex size-10 items-center justify-center rounded-lg border text-xl transition-colors ${
                    selectedAvatar === emoji
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PlayersPage() {
  const { players, addPlayer } = usePlayers();

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
          <h1 className="text-3xl font-bold tracking-tight">Jogadores</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os jogadores da mesa.
          </p>
        </div>
        <AddPlayerDialog onAdd={addPlayer} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos os Jogadores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
