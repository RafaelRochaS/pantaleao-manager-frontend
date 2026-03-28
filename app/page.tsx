import Link from "next/link";
import { Dice5, ScrollText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <Dice5 className="size-16 text-primary" />
      <h1 className="text-4xl font-bold tracking-tight">
        Pantaleão Manager
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Gerencie seus jogos de tabuleiro, pontuações e estatísticas para
        partidas a dois.
      </p>
      <div className="flex gap-3">
        <Link href="/jogos">
          <Button size="lg" className="gap-1.5">
            <Dice5 className="size-4" />
            Jogos
          </Button>
        </Link>
        <Link href="/jogadores">
          <Button size="lg" variant="outline" className="gap-1.5">
            <Users className="size-4" />
            Jogadores
          </Button>
        </Link>
        <Link href="/sessoes">
          <Button size="lg" variant="outline" className="gap-1.5">
            <ScrollText className="size-4" />
            Sessões
          </Button>
        </Link>
      </div>
    </main>
  );
}
